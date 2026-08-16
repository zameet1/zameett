import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import { PRODUCTS, getProduct } from "../../products";
import { FaBolt, FaEnvelope, FaLock, FaShieldHalved } from "react-icons/fa6";
import { Suspense } from "react";
import CheckoutStatusMessage from "@/components/CheckoutStatusMessage";

export const dynamicParams = false;

export function generateStaticParams() { return PRODUCTS.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const product = getProduct(slug); if (!product) return {}; return { title: `Secure Checkout — ${product.short}`, description: `Review the included formats and complete your Zameett order for ${product.name}.`, robots: { index: false, follow: false } }; }
export default async function CheckoutPage({ params }) {
  const { slug } = await params; const product = getProduct(slug); if (!product) notFound();
  return <><section className="premium-checkout" id="checkout"><div className="inner premium-checkout-shell">
    <div className="checkout-intro"><p className="checkout-eyebrow">Zameett digital studio</p><h1>Review the files.<br /><em>Then purchase securely.</em></h1><p className="checkout-lead">This is an editable template, not a completed custom tech pack, pattern or validated measurement specification.</p><div className="checkout-product-preview"><Image src={product.cover} alt="" width={232} height={184} sizes="(max-width:560px) 88px,116px" /><div><small>Your selection</small><h2>{product.short}</h2><p>{product.specs.formats}</p></div></div><a className="checkout-back" href={`/shop/${product.slug}#product-details`}>← Review full product details</a></div>
    <aside className="checkout-card" aria-label="Order summary"><Suspense fallback={null}><CheckoutStatusMessage context="checkout" /></Suspense><div className="checkout-card-head"><div><small>Order summary</small><h2>{product.short}</h2></div><span className="checkout-card-price">{product.price}</span></div><div className="checkout-total-row"><span>Total due today</span><strong>{product.price} USD</strong></div><div className="checkout-delivery"><FaEnvelope /><span><strong>Instant email delivery</strong><br />Editable source and reference files will be sent to your checkout email.</span></div>
      <p className="digital-refund-alert"><strong>Non-refundable after delivery.</strong> Digital purchases cannot be refunded once access or download has been delivered.</p>
      <form className="checkout-pay-form" action="/api/stripe/checkout" method="POST"><input type="hidden" name="slug" value={product.slug} /><label className="checkout-consent"><input type="checkbox" name="digital_terms_accepted" value="yes" required /><span>I agree to the <a href="/digital-product-licence" target="_blank" rel="noopener noreferrer">Digital Product Licence</a>, <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a> and <a href="/digital-product-refund" target="_blank" rel="noopener noreferrer">non-refundable digital-product policy</a>.</span></label><button type="submit" className="btn btn-burg"><FaLock /> Continue to secure payment</button></form>
      <p className="checkout-microcopy">Encrypted payment processing by Stripe</p><div className="checkout-assurances"><span><FaShieldHalved /> Secure checkout</span><span><FaBolt /> Instant access</span><span><FaEnvelope /> Email delivery</span></div>
    </aside>
  </div></section><Footer /></>;
}
