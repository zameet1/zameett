import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import { PRODUCTS, getProduct } from "../../products";
import { FaBolt, FaEnvelope, FaLock, FaShieldHalved } from "react-icons/fa6";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.priceCents === 0 ? "Free Test Order" : "Secure Checkout"} — ${product.short}`,
    description: `Complete your Zameett order for ${product.name}.`,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({ params, searchParams }) {
  const { slug } = await params;
  const status = (await searchParams)?.checkout;
  const product = getProduct(slug);
  if (!product) notFound();
  const isFree = product.priceCents === 0;

  return (
    <>
      <section className="premium-checkout" id="checkout">
        <div className="inner premium-checkout-shell">
          <div className="checkout-intro">
            <p className="checkout-eyebrow">Zameett digital studio</p>
            <h1>{isFree ? <>Test your profile <em>order flow.</em></> : <>Designed to move your idea <em>forward.</em></>}</h1>
            <p className="checkout-lead">
              {isFree
                ? "Place this free test order to check the complete customer journey. No card or payment is required."
                : "You are one secure step away from a professional, editable fashion resource made for real-world production."}
            </p>
            <div className="checkout-product-preview">
              <Image src={product.cover} alt="" width={232} height={184} sizes="(max-width: 560px) 88px, 116px" />
              <div>
                <small>Your selection</small>
                <h2>{product.short}</h2>
                <p>Editable files · Digital product</p>
              </div>
            </div>
            <a className="checkout-back" href={`/shop/${product.slug}#product-details`}>← Back to product details</a>
          </div>

          <aside className="checkout-card" aria-label="Order summary">
            {status === "cancelled" && (
              <p className="checkout-message">Payment cancelled — you have not been charged.</p>
            )}
            <div className="checkout-card-head">
              <div><small>Order summary</small><h2>{product.short}</h2></div>
              <span className="checkout-card-price">{product.price}</span>
            </div>
            <div className="checkout-total-row"><span>Total due today</span><strong>{product.price} USD</strong></div>
            <div className="checkout-delivery">
              <FaEnvelope aria-hidden="true" />
              <span><strong>{isFree ? "Profile test order" : "Instant email delivery"}</strong><br />{isFree ? "The completed order will appear in your Profile." : "Your editable files and receipt will be sent to your checkout email."}</span>
            </div>
            <form className="checkout-pay-form" action={isFree ? "/api/free-order" : "/api/stripe/checkout"} method="POST">
              <input type="hidden" name="slug" value={product.slug} />
              <button type="submit" className="btn btn-burg"><FaLock aria-hidden="true" /> {isFree ? "Place free test order" : "Continue to secure payment"}</button>
            </form>
            <p className="checkout-microcopy">{isFree ? "No card details or payment required" : "Encrypted payment processing by Stripe"}</p>
            <div className="checkout-assurances">
              <span><FaShieldHalved /> {isFree ? "Login protected" : "Secure checkout"}</span>
              <span><FaBolt /> Instant access</span>
              <span><FaEnvelope /> Profile history</span>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}