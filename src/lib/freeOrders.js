export const FREE_ORDERS_COOKIE = "zameett_free_orders";

export function decodeFreeOrders(value) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function encodeFreeOrders(orders) {
  return Buffer.from(JSON.stringify(orders), "utf8").toString("base64url");
}