import Footer from "@/components/Footer";

export const metadata = {
  title: "Payment received",
  description: "Your Zameett digital-product payment was received.",
  robots: { index: false, follow: false },
};

async function verifyPayment(sessionId) {
  if (!/^cs_(test_|live_)/.test(sessionId || "") || !process.env.STRIPE_SECRET_KEY) return null;

  try {
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const session = await response.json();
    return session.payment_status === "paid" && session.metadata?.product_type === "digital"
      ? session
      : null;
  } catch {
    return null;
  }
}

export default async function CheckoutSuccess({ searchParams }) {
  const { session_id: sessionId } = await searchParams;
  const payment = await verifyPayment(sessionId);

  return (
    <>
      <section className="services checkout-result">
        <div className="inner checkout-result-card">
          <p className="s-tag">{payment ? "Payment received" : "Payment verification"}</p>
          <h1 className="s-title">
            {payment ? "Thank you for your purchase." : "We could not verify this payment."}
          </h1>
          {payment ? (
            <p className="s-body">
              Stripe has sent your payment receipt by email. We will send the editable digital files
              to that same email address. If you need help, contact hello@zameett.com.
            </p>
          ) : (
            <p className="s-body">
              Return to the shop and try checkout again. If your card was charged, contact us and
              include the email address used at checkout.
            </p>
          )}
          <div className="gig-actions">
            <a href="/shop" className="btn btn-burg">Return to the shop</a>
            <a href="mailto:hello@zameett.com" className="btn btn-outline">Contact support</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
