import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";
import JsonLd from "@/components/JsonLd";
import { PRODUCTS } from "./products";

const siteUrl = "https://zameett.com";

export const metadata = {
  title: "Shop — Digital Tech Pack Templates",
  description:
    "Editable, industry-standard fashion tech pack templates — instant digital downloads for brands, designers and startups. BOM, size charts, colourways and technical drawing pages included.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Digital Tech Pack Templates | Zameett Shop",
    description:
      "Editable, factory-ready tech pack templates for fashion brands — instant digital downloads.",
    url: "/shop",
    images: [{ url: "/digital/p2-1.jpeg", width: 1200, height: 630, alt: "Zameett digital tech pack templates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Tech Pack Templates | Zameett Shop",
    description: "Editable, factory-ready tech pack templates — instant digital downloads.",
    images: ["/digital/p2-1.jpeg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
  ],
};

const productsSchema = PRODUCTS.map((p) => ({
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
}));

export default function Shop() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {productsSchema.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      <header className="page-hero shop-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Shop</p>
          <h1>Digital templates, <em>ready to download.</em></h1>
          <p>
            Editable, industry-standard tech pack templates — built by our studio so you can create
            polished, factory-ready spec sheets in minutes. Instant delivery, no subscription.
          </p>
          <div className="page-hero-proof"><span>Instant download</span><span>Fully editable</span><span>Factory ready</span></div>
        </div>
      </header>

      <section className="shop shop-premium">
        <div className="inner">
          <div className="svc-head reveal">
            <div>
              <p className="s-tag">Digital Products</p>
              <h2 className="s-title">Tech pack templates that <em>do the heavy lifting.</em></h2>
            </div>
            <p className="s-body">
              Each template is fully editable and laid out to industry standards — technical
              drawings, bill of materials, size charts, colourways and fabric pages, all included.
            </p>
          </div>

          <div className="gig-grid shop-product-grid reveal">
            {PRODUCTS.map((p) => (
              <a key={p.slug} href={`/shop/${p.slug}`} className="gig-card prod-card">
                <div className="gig-card-img">
                  {p.badge && <span className="prod-badge">{p.badge}</span>}
                  <CoverImage src={p.cover} alt={p.name} sizes="(max-width: 900px) 100vw, 33vw" />
                </div>
                <div className="gig-card-body">
                  <h3>{p.name}</h3>
                  <p>{p.tagline}</p>
                  <div className="prod-foot">
                    <span className="prod-price">{p.price}</span>
                    <span className="gig-card-link">View &amp; buy →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-benefits">
        <div className="inner">
          <div className="svc-head reveal">
            <div><p className="s-tag">Built for Real Production</p><h2 className="s-title">More than a template. <em>A clearer factory handoff.</em></h2></div>
            <p className="s-body">Every file follows the same practical structure our studio uses to communicate garments, materials and revisions with production teams.</p>
          </div>
          <div className="shop-benefit-grid reveal">
            <article><span>01</span><h3>Edit with confidence</h3><p>Structured pages keep drawings, measurements, BOMs, colourways and notes organised.</p></article>
            <article><span>02</span><h3>Brief factories clearly</h3><p>Reduce repeated questions by giving suppliers one complete, easy-to-follow source of truth.</p></article>
            <article><span>03</span><h3>Reuse for every style</h3><p>Duplicate the editable system for future products and build a consistent development library.</p></article>
          </div>
        </div>
      </section>

      <section className="cta page-cta shop-cta">
        <p className="s-tag">Need Something Custom?</p>
        <h2 className="s-title">Prefer us to build the tech pack <em>for you?</em></h2>
        <p className="cta-sub">Share your garment direction and our technical design team can prepare a complete factory-ready pack around your product.</p>
        <div className="cta-btns"><a href="/contact?service=fashion-tech-packs#get-in-touch" className="btn btn-gold">Request Custom Tech Pack →</a><a href="/services/fashion-tech-packs" className="btn btn-outline-ivory">View Service</a></div>
      </section>
      <Footer />
    </>
  );
}
