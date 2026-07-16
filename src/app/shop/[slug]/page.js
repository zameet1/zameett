import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GigGallery from "@/components/GigGallery";
import { PRODUCTS, getProduct } from "../products";
import { FaBolt, FaEnvelope, FaLock, FaShieldHalved } from "react-icons/fa6";

const siteUrl = "https://zameett.com";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: {
      title: `${p.name} | Zameett`,
      description: p.tagline,
      url: `/shop/${p.slug}`,
      images: [{ url: p.cover, width: 1200, height: 630, alt: p.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} | Zameett`,
      description: p.tagline,
      images: [p.cover],
    },
  };
}

export default async function ProductPage({ params, searchParams }) {
  const { slug } = await params;
  const checkout = (await searchParams)?.checkout;
  const p = getProduct(slug);
  if (!p) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.tagline,
    image: `${siteUrl}${p.cover}`,
    brand: { "@type": "Brand", name: "Zameett" },
    offers: {
      "@type": "Offer",
      price: p.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/shop/${p.slug}`,
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${siteUrl}/shop/${p.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="gig-detail">
        <div className="inner">
          <p className="crumb">
            <a href="/">Home</a> &nbsp;/&nbsp; <a href="/shop">Shop</a> &nbsp;/&nbsp; {p.short}
          </p>

          <div className="gig-top">
            <GigGallery images={p.gallery} alt={p.name} />

            <div className="gig-info">
              <p className="s-tag">Digital Product</p>
              <h1 className="gig-title">{p.name}</h1>
              <p className="gig-tagline">{p.tagline}</p>

              <p className="prod-price-lg">{p.price} <span>· instant digital download</span></p>

              <ul className="gig-highlights">
                {p.list.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="gig-actions">
                <form action="/api/stripe/checkout" method="POST">
                  <input type="hidden" name="slug" value={p.slug} />
                  <button type="submit" className="btn btn-burg">
                    Buy securely with Stripe →
                  </button>
                </form>
                <a href="/contact#get-in-touch" className="btn btn-outline">
                  Ask a Question
                </a>
              </div>
              <div className="checkout-trust-panel" aria-label="Secure checkout benefits">
                <div><FaShieldHalved aria-hidden="true" /><span><strong>Stripe protected</strong>Industry-standard secure checkout</span></div>
                <div><FaBolt aria-hidden="true" /><span><strong>Instant access</strong>No shipping or waiting required</span></div>
                <div><FaEnvelope aria-hidden="true" /><span><strong>Email delivery</strong>Files sent to your checkout email</span></div>
              </div>
              <p className="checkout-secure-note"><FaLock aria-hidden="true" /> Your payment details never touch our servers.</p>
              {checkout === "cancelled" && (
                <p className="checkout-message">Checkout was cancelled. You have not been charged.</p>
              )}
              {checkout === "unavailable" && (
                <p className="checkout-message checkout-error">Secure checkout is being configured. Please try again shortly.</p>
              )}
              {checkout === "error" && (
                <p className="checkout-message checkout-error">Checkout could not start. Please try again or contact us.</p>
              )}
            </div>
          </div>

          <div className="gig-body">
            <div className="gig-desc">
              {p.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <h2>{p.listTitle}</h2>
              <ul className="gig-list">
                {p.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="gig-note">{p.note}</p>

              <form action="/api/stripe/checkout" method="POST">
                <input type="hidden" name="slug" value={p.slug} />
                <button type="submit" className="btn btn-gold gig-cta">
                  Get this template securely — {p.price} →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
