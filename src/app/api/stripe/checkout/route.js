import { NextResponse } from "next/server";
import { getProduct } from "@/app/shop/products";

export const runtime = "nodejs";

function productUrl(request, slug, status) {
  const configuredSite = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const requestOrigin = request.nextUrl.origin;
  const isPublicOrigin = !/https?:\/\/(?:0\.0\.0\.0|127\.0\.0\.1|localhost)(?::\d+)?$/i.test(requestOrigin);
  const baseUrl = configuredSite || (isPublicOrigin ? requestOrigin : "https://zameett.com");
  const url = new URL(`/shop/${slug}`, baseUrl);
  if (status) url.searchParams.set("checkout", status);
  return url;
}

export async function POST(request) {
  const formData = await request.formData();
  const slug = String(formData.get("slug") || "");
  const product = getProduct(slug);

  // Only products in the digital shop allow-list can create a Checkout Session.
  if (!product || !Number.isInteger(product.priceCents)) {
    return NextResponse.json({ error: "Invalid digital product." }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.redirect(productUrl(request, slug, "unavailable"), 303);
  }

  const successBaseUrl = new URL("/shop/success", productUrl(request, slug)).toString();

  const body = new URLSearchParams({
    mode: "payment",
    submit_type: "pay",
    customer_creation: "always",
    billing_address_collection: "auto",
    success_url: `${successBaseUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: productUrl(request, slug, "cancelled").toString(),
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(product.priceCents),
    "line_items[0][price_data][product_data][name]": product.name,
    "line_items[0][price_data][product_data][description]": product.tagline,
    "line_items[0][price_data][product_data][images][0]": new URL(product.cover, successBaseUrl).toString(),
    "branding_settings[display_name]": "Zameett",
    "branding_settings[background_color]": "#FFFDF9",
    "branding_settings[button_color]": "#4A0E2B",
    "branding_settings[border_style]": "rounded",
    "branding_settings[font_family]": "lora",
    "branding_settings[logo][type]": "url",
    "branding_settings[logo][url]": new URL("/icon.png", successBaseUrl).toString(),
    "branding_settings[icon][type]": "url",
    "branding_settings[icon][url]": new URL("/icon.png", successBaseUrl).toString(),
    "wallet_options[link][display]": "never",
    "custom_text[submit][message]": "Secure payment for an instant Zameett digital product. Your editable files will be delivered to the email used at checkout.",
    "custom_text[after_submit][message]": "Thank you for choosing Zameett. Please check your email for your receipt and digital delivery details.",
    "metadata[product_slug]": product.slug,
    "metadata[product_type]": "digital",
    "payment_intent_data[metadata][product_slug]": product.slug,
    "payment_intent_data[metadata][product_type]": "digital",
  });

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Stripe-Version": "2025-09-30.clover",
      },
      body,
      cache: "no-store",
    });
    const session = await response.json();

    if (!response.ok || !session.url) {
      console.error("Stripe Checkout session creation failed", response.status);
      return NextResponse.redirect(productUrl(request, slug, "error"), 303);
    }

    return NextResponse.redirect(session.url, 303);
  } catch {
    return NextResponse.redirect(productUrl(request, slug, "error"), 303);
  }
}
