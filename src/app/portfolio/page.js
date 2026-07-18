import PortfolioGallery from "@/components/PortfolioGallery";
import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";
import JsonLd from "@/components/JsonLd";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://zameett.com/" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://zameett.com/portfolio" },
  ],
};

export const metadata = {
  title: "Portfolio",
  description:
    "Modest fashion portfolio and abaya design examples from Zameett — a curated lookbook of abayas, velvet kaftans, bias-cut pieces, embellished formals and printed capsules.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Modest Fashion Portfolio & Abaya Design Examples | Zameett",
    description:
      "A curated lookbook of modest wear designed, sampled and manufactured by Zameett — abayas, velvet kaftans, bias-cut pieces and embellished formals.",
    url: "/portfolio",
    images: [{ url: "/images/velvet-caftan.jpeg", width: 1200, height: 630, alt: "Maroon velvet caftan gown from the Zameett portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modest Fashion Portfolio & Abaya Design Examples | Zameett",
    description:
      "A curated lookbook of abayas, velvet kaftans, bias-cut pieces and embellished formals designed and manufactured by Zameett.",
    images: ["/images/velvet-caftan.jpeg"],
  },
};

export default function Portfolio() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <header className="page-hero portfolio-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Portfolio</p>
          <h1>The <em>lookbook.</em></h1>
          <p>
            A curated archive of modest wear we have designed, sampled and manufactured — abayas,
            velvet kaftans, bias-cut pieces, embellished formals and printed capsules, delivered to
            brands and boutiques worldwide.
          </p>
          <div className="page-hero-proof"><span>Original design</span><span>Atelier sampling</span><span>Production ready</span></div>
        </div>
      </header>

      {/* FEATURED */}
      <section className="pf-feature portfolio-feature">
        <div className="inner">
          <div className="pff-media">
            <span className="pff-badge">Featured Collection</span>
            <CoverImage src="/images/velvet-caftan.jpeg" alt="Maroon velvet caftan gown" objectPosition="center 22%" sizes="(max-width: 960px) 100vw, 55vw" priority />
          </div>
          <div className="pff-copy">
            <p className="s-tag">Signature Atelier</p>
            <h2>Maroon <em>Velvet Caftan</em> Gown</h2>
            <p>
              A deep velvet caftan with hand-applied metallic gota borders and a softly belted
              waist — designed, sampled and produced end-to-end in our atelier.
            </p>
            <p>
              From the first sketch to the final pressed garment, this piece moved through every
              stage of the Zameett house: design, fabric sourcing, embroidery, sampling and
              finishing.
            </p>
            <div className="pff-meta">
              <div className="m"><b>14</b><span>Days to sample</span></div>
              <div className="m"><b>Velvet</b><span>Primary fabric</span></div>
              <div className="m"><b>Full</b><span>Manufacturing</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="pf-section portfolio-gallery-section">
        <div className="inner">
          <PortfolioGallery />
        </div>
      </section>

      {/* FEATURED CASE PHOTO BREAK */}
      <div className="photo-break">
        <CoverImage src="/images/13.jpeg" objectPosition="center 30%" alt="Zameett atelier" />
        <div className="pb-overlay">
          <div className="pb-content">
            <p className="pb-tag">Inside the Atelier</p>
            <h2 className="pb-h">&ldquo;Every piece in this archive was cut, stitched and finished by our own team.&rdquo;</h2>
            <p className="pb-p">Design only or full production — what you see here is what we can build for your label, from a single sample to a full collection.</p>
            <a href="/contact#get-in-touch" className="btn btn-gold">Start Your Project →</a>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL STRIP */}
      <section className="testimonials portfolio-testimonials">
        <div className="inner">
          <div className="t-head reveal">
            <p className="s-tag">In Their Words</p>
            <h2 className="s-title">Behind every collection, <em>a happy brand.</em></h2>
          </div>
          <div className="t-grid reveal">
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;First time working with Zameett — and I&rsquo;ll be returning for more projects. Exactly the partner we were looking for.&rdquo;</p>
              <div className="t-name">dorien21</div>
              <div className="t-role">Verified Client — United States</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;Always good. Reliable quality and a smooth process every single time we work together.&rdquo;</p>
              <div className="t-name">renlaykeef</div>
              <div className="t-role">Verified Client — United Kingdom</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;Even when I was slow to respond, Zameett was prompt to reply and understanding throughout. Truly professional.&rdquo;</p>
              <div className="t-name">sajanreddy</div>
              <div className="t-role">Verified Client — United States</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta page-cta">
        <p className="s-tag">Your Collection Next</p>
        <h2 className="s-title">Let&rsquo;s add your brand <em>to this page.</em></h2>
        <p className="cta-sub">
          Design only or the full journey — tell us your vision and we will make it a reality.
          Pakistan-crafted, world-delivered.
        </p>
        <div className="cta-btns">
          <a href="/contact#get-in-touch" className="btn btn-gold">Start Your Project →</a>
          <a href="/services" className="btn btn-outline-ivory">View Services</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
