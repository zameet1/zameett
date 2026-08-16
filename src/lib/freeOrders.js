import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const FREE_ORDERS_COOKIE = "zameett_free_orders";

function signingKey() {
  return process.env.FREE_ORDER_COOKIE_SECRET || process.env.STRIPE_SECRET_KEY || "";
}
function signature(payload) {
  const key = signingKey();
  if (!key) throw new Error("Free-order cookie signing secret is not configured.");
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function decodeFreeOrders(value) {
  if (!value || !signingKey()) return [];
  try {
    const [payload, suppliedSignature, extra] = value.split(".");
    if (!payload || !suppliedSignature || extra) return [];
    const expected = Buffer.from(signature(payload));
    const supplied = Buffer.from(suppliedSignature);
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return [];
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return Array.isArray(parsed) ? parsed.slice(0, 10) : [];
  } catch {
    return [];
  }
}

export function encodeFreeOrders(orders) {
  const payload = Buffer.from(JSON.stringify(orders.slice(0, 10)), "utf8").toString("base64url");
  return payload + "." + signature(payload);
}
