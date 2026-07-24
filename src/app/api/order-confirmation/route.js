import { getProduct } from "@/app/shop/products";
import { decodeFreeOrders, FREE_ORDERS_COOKIE } from "@/lib/freeOrders";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAILBOX_RESOURCE_ID = "AC327b2a2cee33b211206845f7ab5b";
const MAIL_API_URL = `https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_RESOURCE_ID}/send`;

function isAllowedOrigin(request) {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  return origin === "https://zameett.com" || origin === "https://www.zameett.com";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function emailHtml(order) {
  const name = escapeHtml(order.customerName);
  const orderId = escapeHtml(order.id);
  const product = escapeHtml(order.product);
  const amount = escapeHtml(order.amount);

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f6f0eb;font-family:Arial,Helvetica,sans-serif;color:#3f0b20">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f0eb;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fffaf6;border:1px solid #decbbd">
          <tr><td style="background:#4b0823;padding:30px 36px;text-align:center">
            <div style="font-family:Georgia,serif;font-size:30px;letter-spacing:.06em;color:#fffaf6">Zameett</div>
            <div style="margin-top:8px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#c9a24f">Order confirmation</div>
          </td></tr>
          <tr><td style="padding:36px">
            <h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:30px;line-height:1.2;font-weight:500;color:#4b0823">Thank you, ${name}.</h1>
            <p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:#6b4b57">Your order has been received successfully. You can review its details below and find it anytime in your Zameett Profile.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #decbbd">
              <tr><td style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Order ID</td><td align="right" style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:14px;color:#4b0823">${orderId}</td></tr>
              <tr><td style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Product</td><td align="right" style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:14px;color:#4b0823">${product}</td></tr>
              <tr><td style="padding:13px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Amount</td><td align="right" style="padding:13px 16px;font-size:14px;font-weight:700;color:#4b0823">${amount}</td></tr>
            </table>
            <div style="padding-top:28px;text-align:center"><a href="https://zameett.com/account" style="display:inline-block;background:#4b0823;color:#fffaf6;text-decoration:none;padding:14px 28px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">View your profile</a></div>
            <p style="margin:28px 0 0;font-size:13px;line-height:1.7;color:#806773">If you need help, simply reply to this email or contact <a href="mailto:hello@zameett.com" style="color:#4b0823">hello@zameett.com</a>.</p>
          </td></tr>
          <tr><td style="padding:20px 36px;background:#efe3db;text-align:center;font-size:11px;line-height:1.6;color:#806773">Zameett · Modest Fashion Design &amp; Manufacturing</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function emailText(order) {
  return [
    `Thank you, ${order.customerName}.`,
    "",
    "Your Zameett order has been received successfully.",
    `Order ID: ${order.id}`,
    `Product: ${order.product}`,
    `Amount: ${order.amount}`,
    "",
    "View your profile: https://zameett.com/account",
    "Need help? Reply to this email or contact hello@zameett.com.",
  ].join("\n");
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });

  const token = process.env.HOSTINGER_MAIL_API_TOKEN;
  if (!token) return Response.json({ error: "Email service is not configured." }, { status: 503 });

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

  const response = await fetch(MAIL_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      to: [order.customerEmail],
      displayName: "Zameett",
      subject: `Your Zameett order is confirmed — ${order.id}`,
      text: emailText(order),
      html: emailHtml(order),
    }),
    cache: "no-store",
  });

  if (!response.ok) return Response.json({ error: "Email could not be sent." }, { status: 502 });
  return Response.json({ success: true });
}