import { NextResponse } from "next/server";
import { getProduct } from "@/app/shop/products";
import { createClient } from "@/lib/supabase/server";
import {
  decodeFreeOrders,
  encodeFreeOrders,
  FREE_ORDERS_COOKIE,
} from "@/lib/freeOrders";

export const runtime = "nodejs";

function siteOrigin(request) {
  return process.env.NODE_ENV === "production"
    ? "https://zameett.com"
    : new URL(request.url).origin;
}

export async function POST(request) {
  const formData = await request.formData();
  const slug = String(formData.get("slug") || "");
  const product = getProduct(slug);
  const origin = siteOrigin(request);

  if (!product || product.priceCents !== 0) {
    return NextResponse.redirect(new URL("/shop?order=invalid", origin), 303);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId) {
    const signInUrl = new URL("/sign-in", origin);
    signInUrl.searchParams.set("next", `/shop/${product.slug}/checkout`);
    return NextResponse.redirect(signInUrl, 303);
  }

  const existing = decodeFreeOrders(request.cookies.get(FREE_ORDERS_COOKIE)?.value)
    .filter((order) => order?.userId === userId)
    .slice(0, 9);
  const order = {
    id: `ZT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    userId,
    slug: product.slug,
    name: product.short,
    amount: 0,
    currency: "USD",
    status: "Test order complete",
    createdAt: new Date().toISOString(),
  };
  const orders = [order, ...existing];
  const successUrl = new URL("/shop/success", origin);
  successUrl.searchParams.set("free_order", order.id);
  const response = NextResponse.redirect(successUrl, 303);

  response.cookies.set(FREE_ORDERS_COOKIE, encodeFreeOrders(orders), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}