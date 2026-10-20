import { decodeFreeOrders, FREE_ORDERS_COOKIE } from "@/lib/freeOrders";
import { sendCustomerOrderEmail, sendOwnerOrderEmail } from "@/lib/orderEmails";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
const sentConfirmations = globalThis.__zameettSentOrderConfirmations || new Set();
globalThis.__zameettSentOrderConfirmations = sentConfirmations;

function isAllowedOrigin(request) {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  return origin === "https://zameett.com" || origin === "https://www.zameett.com";
}
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}
async function freeOrder(request, orderId) {
  const order = decodeFreeOrders(request.cookies.get(FREE_ORDERS_COOKIE)?.value).find((item) => item?.id === orderId);
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
  if (!process.env.HOSTINGER_MAIL_API_TOKEN) return Response.json({ error: "Email service is not configured." }, { status: 503 });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const id = String(payload?.id || "");
  const kind = payload?.kind;
  const order = kind === "free" ? await freeOrder(request, id) : null;
  if (!order || !isEmail(order.customerEmail)) return Response.json({ error: "Order could not be verified." }, { status: 400 });

  const notificationKey = kind + ":" + order.id;
  if (sentConfirmations.has(notificationKey)) return Response.json({ success: true, duplicate: true });

  try {
    await Promise.all([
      sendCustomerOrderEmail({ ...order, type: "Free test order" }),
      sendOwnerOrderEmail({ ...order, type: "Free test order" }),
    ]);
    sentConfirmations.add(notificationKey);
    if (sentConfirmations.size > 500) sentConfirmations.delete(sentConfirmations.values().next().value);
  } catch (error) {
    console.error("Order email delivery failed:", error);
    return Response.json({ error: "Email could not be sent." }, { status: 502 });
  }
  return Response.json({ success: true });
}
