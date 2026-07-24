import { getProduct } from "@/app/shop/products";
import { decodeFreeOrders, FREE_ORDERS_COOKIE } from "@/lib/freeOrders";
import { sendOrderEmails } from "@/lib/orderEmails";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function isAllowedOrigin(request) {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  return origin === "https://zameett.com" || origin === "https://www.zameett.com";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

async function paidOrder(sessionId) {
  if (!/^cs_(test_|live_)/.test(sessionId || "") || !process.env.STRIPE_SECRET_KEY) return null;

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      cache: "no-store",
    },
  );
  if (!response.ok) return null;

  const session = await response.json();
  if (session.payment_status !== "paid" || session.metadata?.product_type !== "digital") return null;

  const product = getProduct(session.metadata?.product_slug);
  return {
    id: session.id,
    product: product?.short || "Digital product",
    amount: `${((session.amount_total || 0) / 100).toFixed(2)} ${(session.currency || "usd").toUpperCase()}`,
    customerName: session.customer_details?.name || session.customer_details?.email?.split("@")[0] || "Customer",
    customerEmail: session.customer_details?.email || session.customer_email,
  };
}

async function freeOrder(request, orderId) {
  const order = decodeFreeOrders(request.cookies.get(FREE_ORDERS_COOKIE)?.value)
    .find((item) => item?.id === orderId);
  if (!order) return null;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  if (error || !user || user.id !== order.userId) return null;

  const metadata = user.user_metadata || {};
  return {
    id: order.id,
    product: order.name,
    amount: "$0 USD",
    customerName: metadata.full_name || metadata.name || user.email?.split("@")[0] || "Customer",
    customerEmail: user.email,
  };
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  if (!process.env.HOSTINGER_MAIL_API_TOKEN) {
    return Response.json({ error: "Email service is not configured." }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const order = payload?.kind === "paid"
    ? await paidOrder(String(payload.id || ""))
    : payload?.kind === "free"
      ? await freeOrder(request, String(payload.id || ""))
      : null;

  if (!order || !isEmail(order.customerEmail)) {
    return Response.json({ error: "Order could not be verified." }, { status: 400 });
  }

  try {
    await sendOrderEmails({
      ...order,
      type: payload.kind === "paid" ? "Paid Stripe order" : "Free test order",
    });
  } catch (error) {
    console.error("Order email delivery failed:", error);
    return Response.json({ error: "Email could not be sent." }, { status: 502 });
  }

  return Response.json({ success: true });
}