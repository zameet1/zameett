import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import OrderCelebration from "@/components/OrderCelebration";
import { decodeFreeOrders, FREE_ORDERS_COOKIE } from "@/lib/freeOrders";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Order complete",
  description: "Your Zameett digital-product order is complete.",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function CheckoutSuccess({ searchParams }) {
  const params = await searchParams;
  const freeOrderId = params?.free_order;
  const cookieStore = await cookies();
  const rawFreeOrder = freeOrderId
    ? decodeFreeOrders(cookieStore.get(FREE_ORDERS_COOKIE)?.value).find((order) => order.id === freeOrderId)
    : null;

  let freeOrder = null;
  if (rawFreeOrder) {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user?.id === rawFreeOrder.userId) freeOrder = rawFreeOrder;
  }

  const complete = Boolean(freeOrder);

  return (
    <>
      <section className="services checkout-result">
        <div className="inner checkout-result-card">
          <OrderCelebration active={complete} />
          <p className="s-tag">{freeOrder ? "Test order complete" : "Order verification"}</p>
          <h1 className="s-title">{complete ? "Your order is ready in Profile." : "We could not verify this order."}</h1>
          {freeOrder ? (
            <p className="s-body">Your free test order for {freeOrder.name} was completed successfully. No payment was taken, and the order is now saved in your Profile.</p>
          ) : (
            <p className="s-body">This order link is no longer valid. Return to pricing to review the currently available packages.</p>
          )}
          <div className="gig-actions">
            {complete && <a href="/account" className="btn btn-burg">Open Profile</a>}
            <a href="/pricing" className={complete ? "btn btn-outline" : "btn btn-burg"}>View pricing</a>
            {!complete && <a href="mailto:hello@zameett.com" className="btn btn-outline">Contact support</a>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
