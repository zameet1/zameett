import "server-only";

import { redirect } from "next/navigation";
import { PRODUCTS } from "@/app/shop/products";
import { POSTS } from "@/app/blog/posts";
import { GIGS } from "@/app/services/gigs";
import { SOLUTIONS } from "@/app/solutions/solutions";
import { getAllClientProjects } from "@/lib/clientProjects";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { SUPABASE_URL } from "@/lib/supabase/config";

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const ACTIVITY_RESET_AT = Date.parse("2026-07-25T23:42:28.3881311Z");

function isoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function parseDateOnly(value, endOfDay = false) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = Date.parse(`${value}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}Z`);
  return Number.isNaN(parsed) ? null : parsed;
}

function normalizeDateRange(input = {}) {
  const now = new Date();
  const defaultFrom = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
  const defaultTo = Date.now();
  let fromMs = parseDateOnly(input.from) ?? defaultFrom;
  let toMs = parseDateOnly(input.to, true) ?? defaultTo;

  if (fromMs > toMs) {
    const originalFrom = fromMs;
    fromMs = Date.parse(`${isoDate(toMs)}T00:00:00.000Z`);
    toMs = Date.parse(`${isoDate(originalFrom)}T23:59:59.999Z`);
  }

  const from = isoDate(fromMs);
  const to = isoDate(toMs);
  const formatter = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return {
    from,
    to,
    fromMs,
    toMs,
    label: `${formatter.format(new Date(fromMs))} to ${formatter.format(new Date(toMs))}`,
  };
}

function isWithinRange(value, range) {
  const timestamp = dateValue(value);
  return Boolean(timestamp && timestamp >= range.fromMs && timestamp <= range.toMs);
}

function safeName(user) {
  const metadata = user?.user_metadata || {};
  return metadata.full_name || metadata.name || user?.email?.split("@")[0] || "Customer";
}

function dateValue(value) {
  const parsed = new Date(value || 0);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function daysSince(value) {
  const timestamp = dateValue(value);
  if (!timestamp) return null;
  return Math.max(0, Math.floor((Date.now() - timestamp) / 86400000));
}

function activityLevel(value) {
  const days = daysSince(value);
  if (days === null) return { key: "unknown", label: "No activity", days: null };
  if (days <= 0) return { key: "today", label: "Active today", days };
  if (days <= 7) return { key: "week", label: "Active this week", days };
  if (days <= 30) return { key: "month", label: "Active this month", days };
  return { key: "inactive", label: "Inactive", days };
}

export async function requireAdmin() {
  if (!ADMIN_EMAIL) redirect("/account?admin=unavailable");
  if (!hasSupabaseConfig()) redirect("/sign-in?next=/admin");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (error || !user?.email) redirect("/sign-in?next=/admin");
  if (user.email.trim().toLowerCase() !== ADMIN_EMAIL) redirect("/account?admin=denied");

  return {
    id: user.id,
    email: user.email,
    name: safeName(user),
    lastSignInAt: user.last_sign_in_at || null,
  };
}

async function getSupabaseCustomers() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return { connected: false, customers: [], projectUpdatesByEmail: {}, message: "Add SUPABASE_SERVICE_ROLE_KEY to show all registered customers." };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=1000`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Supabase admin request failed (${response.status})`);

    const payload = await response.json();
    const projectUpdatesByEmail = {};
    const customers = (payload.users || []).map((user) => {
      const metadata = user.user_metadata || {};
      const normalizedEmail = String(user.email || "").trim().toLowerCase();
      const projectUpdates = user.app_metadata?.zameett_project_updates;
      if (normalizedEmail && projectUpdates && typeof projectUpdates === "object") {
        projectUpdatesByEmail[normalizedEmail] = projectUpdates;
      }
      const provider = user.app_metadata?.provider === "google" ? "Google" : "Email";
      const activity = activityLevel(user.last_sign_in_at);
      return {
        id: user.id,
        email: user.email || "No email",
        name: safeName(user),
        provider,
        joinedAt: user.created_at || null,
        lastSignInAt: user.last_sign_in_at || null,
        verified: Boolean(user.email_confirmed_at || user.confirmed_at),
        activity,
        source: metadata.acquisition_source || (provider === "Google" ? "Google sign-in" : "Direct / unknown"),
        medium: metadata.acquisition_medium || "Not recorded",
        campaign: metadata.acquisition_campaign || "Not recorded",
        referrer: metadata.acquisition_referrer || "Not recorded",
        landingPage: metadata.first_landing_page || "Not recorded",
        device: metadata.visitor_device || "Unknown",
        timezone: metadata.visitor_timezone || "Unknown",
        language: metadata.visitor_language || "Unknown",
      };
    }).sort((a, b) => dateValue(b.joinedAt) - dateValue(a.joinedAt));

    return { connected: true, customers, projectUpdatesByEmail, message: "Live Supabase customer data connected." };
  } catch (error) {
    return { connected: false, customers: [], projectUpdatesByEmail: {}, message: error instanceof Error ? error.message : "Supabase customer data is unavailable." };
  }
}

async function getStripeOrders() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { connected: false, orders: [], message: "Stripe secret key is not configured." };
  }

  try {
    const params = new URLSearchParams({ limit: "100" });
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions?${params}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Stripe-Version": "2025-09-30.clover",
      },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Stripe request failed (${response.status})`);

    const payload = await response.json();
    const orders = (payload.data || []).map((session) => ({
      id: session.id,
      email: session.customer_details?.email || session.customer_email || "Not provided",
      customerName: session.customer_details?.name || session.customer_details?.email?.split("@")[0] || "Customer",
      product: session.metadata?.product_slug || "Digital product",
      amount: session.amount_total || 0,
      currency: (session.currency || "usd").toUpperCase(),
      paymentStatus: session.payment_status || "unpaid",
      checkoutStatus: session.status || "unknown",
      createdAt: session.created ? new Date(session.created * 1000).toISOString() : null,
    })).filter((order) => dateValue(order.createdAt) >= ACTIVITY_RESET_AT)
      .sort((a, b) => dateValue(b.createdAt) - dateValue(a.createdAt));

    return { connected: true, orders, message: "Live Stripe checkout data connected." };
  } catch (error) {
    return { connected: false, orders: [], message: error instanceof Error ? error.message : "Stripe order data is unavailable." };
  }
}

export async function getAdminDashboardData(dateRange = {}) {
  const range = normalizeDateRange(dateRange);
  const [customerData, stripeData] = await Promise.all([
    getSupabaseCustomers(),
    getStripeOrders(),
  ]);
  const projects = getAllClientProjects(customerData.projectUpdatesByEmail);
  const customers = customerData.customers.filter((customer) => isWithinRange(customer.joinedAt, range));
  const activeCustomers = customerData.customers.filter((customer) => isWithinRange(customer.lastSignInAt, range));
  const orders = stripeData.orders.filter((order) => isWithinRange(order.createdAt, range));
  const paidOrders = orders.filter((order) => order.paymentStatus === "paid");
  const revenueCents = paidOrders.reduce((sum, order) => sum + order.amount, 0);
  const sourceMap = new Map();
  customers.forEach((customer) => sourceMap.set(customer.source, (sourceMap.get(customer.source) || 0) + 1));
  const sources = [...sourceMap.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  const activity = [
    ...orders.map((order) => ({
      type: "order",
      title: `${order.customerName} · ${order.product}`,
      detail: `${order.paymentStatus} · ${(order.amount / 100).toFixed(2)} ${order.currency}`,
      date: order.createdAt,
    })),
    ...customers.filter((customer) => {
      const email = customer.email.toLowerCase();
      return email !== ADMIN_EMAIL && dateValue(customer.joinedAt) >= ACTIVITY_RESET_AT;
    }).map((customer) => ({
      type: "customer",
      title: customer.name,
      detail: `New ${customer.provider} account · ${customer.email}`,
      date: customer.joinedAt,
    })),
    ...projects.map((project) => ({
      type: "project",
      title: project.title,
      detail: `${project.status} · ${project.email}`,
      date: project.updatedAt,
    })).filter((item) => isWithinRange(item.date, range)),
  ].sort((a, b) => dateValue(b.date) - dateValue(a.date)).slice(0, 12);

  return {
    generatedAt: new Date().toISOString(),
    range,
    stats: {
      customers: customerData.connected ? customerData.customers.length : null,
      newCustomers: customerData.connected ? customers.length : null,
      activeCustomers: customerData.connected ? activeCustomers.length : null,
      orders: stripeData.connected ? orders.length : null,
      paidOrders: stripeData.connected ? paidOrders.length : null,
      revenueCents: stripeData.connected ? revenueCents : null,
      activeProjects: projects.filter((project) => project.status.toLowerCase() !== "completed").length,
    },
    customerInsights: {
      sources,
      trackedSources: sources.filter((source) => !source.name.toLowerCase().includes("unknown")).reduce((sum, source) => sum + source.count, 0),
    },
    customers,
    allCustomers: customerData.customers,
    orders,
    projects,
    activity,
    inventory: {
      products: PRODUCTS.map((product) => ({ slug: product.slug, name: product.short, price: product.price })),
      blogPosts: POSTS.length,
      services: GIGS.length,
      solutions: SOLUTIONS.length,
    },
    connections: [
      { name: "Website authentication", connected: hasSupabaseConfig(), detail: "Supabase sign-in and customer sessions" },
      { name: "Customer directory", connected: customerData.connected, detail: customerData.message },
      { name: "Stripe orders", connected: stripeData.connected, detail: stripeData.message },
      { name: "Google Analytics", connected: true, detail: process.env.NEXT_PUBLIC_GA_ID || "G-VCR2ENVVJ5 tracking installed" },
      { name: "Google Ads", connected: true, detail: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18258289518 tracking installed" },
      { name: "Google Reviews", connected: Boolean(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID), detail: process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID ? "Automatic Google Maps review sync active" : "Add Places API key and Google Place ID to enable automatic reviews" },
      { name: "Order email", connected: Boolean(process.env.HOSTINGER_MAIL_API_TOKEN), detail: "Hostinger Mail notifications" },
    ],
  };
}