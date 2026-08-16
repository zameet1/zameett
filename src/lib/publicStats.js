import "server-only";

export const CLIENT_COUNT_BASELINE = 0;
const CLIENT_COUNT_START_AT = Date.parse("2026-07-26T00:00:00.000Z") / 1000;

export async function getLiveClientCount() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return CLIENT_COUNT_BASELINE;

  try {
    const params = new URLSearchParams({ limit: "100", "created[gte]": String(CLIENT_COUNT_START_AT) });
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions?${params}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Stripe-Version": "2025-09-30.clover",
      },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return CLIENT_COUNT_BASELINE;

    const payload = await response.json();
    const verifiedClients = new Set(
      (payload.data || [])
        .filter((session) => session.payment_status === "paid")
        .map((session) => (session.customer_details?.email || session.customer_email || session.id).trim().toLowerCase())
    );
    return CLIENT_COUNT_BASELINE + verifiedClients.size;
  } catch {
    return CLIENT_COUNT_BASELINE;
  }
}
