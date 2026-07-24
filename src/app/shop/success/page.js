import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import { decodeFreeOrders, FREE_ORDERS_COOKIE } from "@/lib/freeOrders";

export const metadata = {
  title: "Order complete",
  description: "Your Zameett digital-product order is complete.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

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
  const params = await searchParams;
  const sessionId = params?.session_id;
  const freeOrderId = params?.free_order;
  const cookieStore = await cookies();
  const freeOrder = freeOrderId
    ? decodeFreeOrders(cookieStore.get(FREE_ORDERS_COOKIE)?.value).find((order) => order.id === freeOrderId)
    : null;
  const payment = freeOrder ? null : await verifyPayment(sessionId);
  const complete = Boolean(freeOrder || payment);

  return (
    <>
      <section className="services checkout-result">
        <div className="inner checkout-result-card">
          <p className="s-tag">{freeOrder ? "Test order complete" : payment ? "Payment received" : "Order verification"}</p>
          <h1 className="s-title">
            {complete ? "Your order is ready in Profile." : "We could not verify this order."}
          </h1>
          {freeOrder ? (
            <p className="s-body">
              Your free test order for {freeOrder.name} was completed successfully. No payment was taken, and the order is now saved in your Profile.
            </p>
          ) : payment ? (
            <p className="s-body">
              Stripe has sent your payment receipt by email. We will send the editable digital files to that same email address. If you need help, contact hello@zameett.com.
            </p>
          ) : (
            <p className="s-body">
              Return to the shop and try again. If your card was charged, contact us and include the email address used at checkout.
            </p>
          )}
          <div className="gig-actions">
            {complete && <a href="/account" className="btn btn-burg">Open Profile</a>}
            <a href="/shop#digital-products" className={complete ? "btn btn-outline" : "btn btn-burg"}>Return to shop</a>
            {!complete && <a href="mailto:hello@zameett.com" className="btn btn-outline">Contact support</a>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}