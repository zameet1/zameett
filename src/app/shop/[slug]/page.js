import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GigGallery from "@/components/GigGallery";
import { PRODUCTS, getProduct, buyLink } from "../products";

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

export default async function ProductPage({ params }) {
  const { slug } = await params;
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
                <a href={buyLink(p)} target="_blank" rel="noopener noreferrer" className="btn btn-burg">
                  Buy on WhatsApp →
                </a>
                <a href="/contact#get-in-touch" className="btn btn-outline">
                  Ask a Question
                </a>
              </div>
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

              <a href={buyLink(p)} target="_blank" rel="noopener noreferrer" className="btn btn-gold gig-cta">
                Get this template — {p.price} →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
