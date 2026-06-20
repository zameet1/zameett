import Link from "next/link";
import PortfolioGallery from "@/components/PortfolioGallery";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Zameett — Portfolio",
};

export default function Portfolio() {
  return (
    <>
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; Portfolio</p>
          <h1>The <em>lookbook.</em></h1>
          <p>
            A curated archive of modest wear we have designed, sampled and manufactured — abayas,
            velvet kaftans, bias-cut pieces, embellished formals and printed capsules, delivered to
            brands and boutiques worldwide.
          </p>
        </div>
      </header>

      {/* FEATURED */}
      <section className="pf-feature">
        <div className="inner">
          <div className="pff-media">
            <span className="pff-badge">Featured Collection</span>
            <img src="/images/18.jpeg" alt="Maroon velvet caftan gown" />
          </div>
          <div className="pff-copy">
            <p className="s-tag">Autumn Atelier</p>
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
      <section className="pf-section">
        <div className="inner">
          <PortfolioGallery />
        </div>
      </section>

      {/* FEATURED CASE PHOTO BREAK */}
      <div className="photo-break">
        <img src="/images/13.jpeg" style={{ objectPosition: "center 30%" }} alt="Zameett atelier" />
        <div className="pb-overlay">
          <div className="pb-content">
            <p className="pb-tag">Inside the Atelier</p>
            <h2 className="pb-h">&ldquo;Every piece in this archive was cut, stitched and finished by our own team.&rdquo;</h2>
            <p className="pb-p">Design only or full production — what you see here is what we can build for your label, from a single sample to a full collection.</p>
            <Link href="/contact" className="btn btn-gold">Start Your Project →</Link>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL STRIP */}
      <section className="testimonials">
        <div className="inner">
          <div className="t-head reveal">
            <p className="s-tag">In Their Words</p>
            <h2 className="s-title">Behind every collection, <em>a happy brand.</em></h2>
          </div>
          <div className="t-grid reveal">
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;The abaya capsule they produced for us sold out in our first drop. The construction and drape were exactly what we designed — nothing lost in translation.&rdquo;</p>
              <div className="t-name">Sarah A.</div>
              <div className="t-role">Modest Fashion Brand — Dubai</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;They rebuilt my ruined collection and took over manufacturing. The results were genuinely stunning — better than my original vision.&rdquo;</p>
              <div className="t-name">Fatima K.</div>
              <div className="t-role">Independent Designer — UK</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;A custom collection my customers absolutely loved, with my own label and branding. Professional, on time, and beautiful quality throughout.&rdquo;</p>
              <div className="t-name">Nadia R.</div>
              <div className="t-role">Boutique Owner — Canada</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <p className="s-tag">Your Collection Next</p>
        <h2 className="s-title">Let&rsquo;s add your brand <em>to this page.</em></h2>
        <p className="cta-sub">
          Design only or the full journey — tell us your vision and we will make it a reality.
          Pakistan-crafted, world-delivered.
        </p>
        <div className="cta-btns">
          <Link href="/contact" className="btn btn-gold">Start Your Project →</Link>
          <Link href="/services" className="btn btn-outline-ivory">View Services</Link>
        </div>
      </section>
      <Footer variant="shop" />
    </>
  );
}
