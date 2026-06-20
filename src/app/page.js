import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";

export default function Home() {
  return (
    <>
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <CoverImage src="/images/21.jpeg" alt="Zameett modest wear collection" priority />
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-eyebrow">Modest Fashion · Pakistan</p>
            <h1 className="hero-h1">
              Design.
              <br />
              Develop.
              <br />
              <em>Deliver.</em>
            </h1>
            <p className="hero-sub">
              From design concepts and tech packs to full manufacturing and worldwide delivery.
              Come to us for design only — or let us handle the entire journey from sketch to
              doorstep.
            </p>
            <div className="hero-pills">
              <span className="pill">Design Only</span>
              <span className="pill">Tech Packs</span>
              <span className="pill">Abayas</span>
              <span className="pill">Modest Wear</span>
              <span className="pill">Full Manufacturing</span>
            </div>
            <div className="hero-btns">
              <Link href="/contact" className="btn btn-gold">Start Your Project</Link>
              <Link href="/services" className="btn btn-outline-ivory">Our Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {Array.from({ length: 2 }).flatMap((_, rep) =>
            [
              "Design Concept",
              "Tech Packs",
              "Textile Sourcing",
              "Embroidery & Prints",
              "Abayas",
              "Bias Cut Styles",
              "Modest Formal Wear",
              "Sampling",
              "Production",
              "Worldwide Delivery",
            ].map((t, i) => (
              <span key={`${rep}-${i}`}>
                <span>{t}</span>
                <span className="dot">◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="inner">
          <div className="stat"><div className="stat-num">50+</div><div className="stat-lbl">Clients Served</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">100%</div><div className="stat-lbl">End-to-End Capable</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">3</div><div className="stat-lbl">Service Paths</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">5+</div><div className="stat-lbl">Years Experience</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">🌍</div><div className="stat-lbl">Worldwide Delivery</div></div>
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <section className="services">
        <div className="inner">
          <div className="svc-head reveal">
            <div>
              <p className="s-tag">What We Offer</p>
              <h2 className="s-title">
                Everything your brand needs,
                <br />
                <em>under one roof.</em>
              </h2>
            </div>
            <p className="s-body">
              Choose your path — designs and tech packs only, or full manufacturing from concept to
              worldwide delivery. Zameett is built so you never have to compromise on quality or
              vision.
            </p>
          </div>
          <div className="svc-grid reveal">
            <div className="svc-card featured">
              <span className="svc-badge">Most Popular</span>
              <div className="svc-num">01</div>
              <h3>Design &amp; Tech Packs Only</h3>
              <p>
                Professional designs and manufacturer-ready tech packs — everything your factory
                needs to execute your vision perfectly. No manufacturing commitment required.
              </p>
              <Link href="/services" className="svc-link">Learn more →</Link>
            </div>
            <div className="svc-card">
              <div className="svc-num">02</div>
              <h3>Design Concept &amp; Styling</h3>
              <p>
                From mood boards to final illustrations — abayas, bias cuts, scarves, modest formal
                and casual wear, designed with cultural understanding.
              </p>
              <Link href="/services" className="svc-link">Learn more →</Link>
            </div>
            <div className="svc-card">
              <div className="svc-num">03</div>
              <h3>Embroidery &amp; Textile Prints</h3>
              <p>
                Custom embroidery patterns, textile prints and embellishment placement matched to
                your brand&rsquo;s aesthetic and quality standards.
              </p>
              <Link href="/services" className="svc-link">Learn more →</Link>
            </div>
            <div className="svc-card">
              <div className="svc-num">04</div>
              <h3>Textile Sourcing</h3>
              <p>
                The right fabrics for modest wear — from lightweight linens to heavy embellished
                formals — at competitive prices that protect your margins.
              </p>
              <Link href="/services" className="svc-link">Learn more →</Link>
            </div>
            <div className="svc-card">
              <div className="svc-num">05</div>
              <h3>Sampling &amp; Production</h3>
              <p>
                A prototype is approved before any production run begins. We never move forward
                until you are completely satisfied — no wasted budgets.
              </p>
              <Link href="/services" className="svc-link">Learn more →</Link>
            </div>
            <div className="svc-card">
              <div className="svc-num">06</div>
              <h3>Delivery to Doorstep</h3>
              <p>
                Finished, quality-checked and packaged — shipped worldwide directly to you or your
                customers. Truly end-to-end.
              </p>
              <Link href="/services" className="svc-link">Learn more →</Link>
            </div>
          </div>
          <div className="design-banner reveal">
            <div>
              <h3>Just need designs? <em>That is perfectly fine.</em></h3>
              <p>
                Many clients come to Zameett only for design concepts and tech packs — they have
                their own manufacturer or are still building their setup. We create
                production-ready files any factory in the world can follow. No manufacturing
                commitment, ever.
              </p>
            </div>
            <Link href="/contact" className="btn btn-burg">Design-Only Enquiry →</Link>
          </div>
        </div>
      </section>

      {/* PHOTO BREAK */}
      <div className="photo-break">
        <CoverImage src="/images/19.jpeg" objectPosition="center 22%" alt="Modest fashion" />
        <div className="pb-overlay">
          <div className="pb-content">
            <p className="pb-tag">Our Philosophy</p>
            <h2 className="pb-h">&ldquo;Your vision, executed with precision and cultural understanding.&rdquo;</h2>
            <p className="pb-p">
              We specialise in modest wear — abayas, bias cuts, scarves and formal modest
              collections — crafted from Pakistan and delivered to the world.
            </p>
            <Link href="/about" className="btn btn-gold">Our Story →</Link>
          </div>
        </div>
      </div>

      {/* SIGNATURE PIECES */}
      <section className="sig">
        <div className="inner">
          <div className="svc-head reveal">
            <div>
              <p className="s-tag">Selected Work</p>
              <h2 className="s-title">Signature <em>pieces.</em></h2>
            </div>
            <p className="s-body">
              A glimpse of recent modest wear we&rsquo;ve designed and manufactured — from velvet
              kaftans to embroidered abayas. Explore the full archive in our lookbook.
            </p>
          </div>
          <div className="sig-grid reveal">
            <Link href="/portfolio" className="sig-card">
              <CoverImage src="/images/09.jpeg" objectPosition="center 16%" alt="Ivory pearl-trim abaya" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Abayas</div><h4>Ivory Pearl-Trim Abaya</h4></div>
            </Link>
            <Link href="/portfolio" className="sig-card">
              <CoverImage src="/images/16.jpeg" objectPosition="center 16%" alt="Plum and sage velvet caftan" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Formal</div><h4>Plum &amp; Sage Velvet</h4></div>
            </Link>
            <Link href="/portfolio" className="sig-card">
              <CoverImage src="/images/02.jpeg" objectPosition="center 16%" alt="Rosewood belted maxi" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Bias Cut</div><h4>Rosewood Belted Maxi</h4></div>
            </Link>
            <Link href="/portfolio" className="sig-card">
              <CoverImage src="/images/08.jpeg" objectPosition="center 16%" alt="Terracotta tribal kimono" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Embroidery</div><h4>Terracotta Tribal Kimono</h4></div>
            </Link>
          </div>
          <div className="sig-foot reveal">
            <Link href="/portfolio" className="btn btn-outline">View Full Lookbook →</Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="inner">
          <div className="why-head reveal">
            <div>
              <p className="s-tag">Why Zameett</p>
              <h2 className="s-title">The partner your brand <em>deserves.</em></h2>
            </div>
            <p className="why-body">
              We are not a generalist manufacturer. We specialise exclusively in modest fashion —
              which means every service, every decision, every stitch is made with your specific
              industry in mind.
            </p>
          </div>
          <div className="why-grid reveal">
            <div className="why-card">
              <div className="w-icon">🪡</div>
              <h4>Modest Wear Specialists</h4>
              <p>We only do modest fashion. Every design and production decision is made with deep cultural and technical industry understanding.</p>
            </div>
            <div className="why-card">
              <div className="w-icon">🎨</div>
              <h4>Design-Only Welcome</h4>
              <p>No manufacturing commitment needed. Come for designs and tech packs and take them to any factory you choose. We never lock you in.</p>
            </div>
            <div className="why-card">
              <div className="w-icon">📦</div>
              <h4>Truly End-to-End</h4>
              <p>Design to delivery under one roof when you need it. No coordinating multiple vendors. No miscommunications. No lost vision.</p>
            </div>
            <div className="why-card">
              <div className="w-icon">✅</div>
              <h4>Quality Guaranteed</h4>
              <p>Every piece goes through strict quality control before dispatch. We do not ship anything we would not be proud to wear ourselves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP HIGHLIGHT */}
      <section className="shop-hl">
        <div className="inner">
          <div className="svc-head reveal">
            <div>
              <p className="s-tag">From the Shop</p>
              <h2 className="s-title">Digital products to <em>launch faster.</em></h2>
            </div>
            <p className="s-body">
              Ready-made tech packs, patterns and design tools — the same professional files we
              build for clients, available to download instantly.{" "}
              <Link href="/digital" style={{ color: "var(--gold)", fontWeight: 500 }}>Browse all products →</Link>
            </p>
          </div>
          <div className="shop-grid reveal">
            <div className="shl-card">
              <div className="shl-thumb">
                <span className="shl-fmt">PDF · AI</span>
                <CoverImage src="/images/14.jpeg" objectPosition="center 40%" alt="Tech pack template" sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="shl-body">
                <div className="shl-cat">Tech Packs</div>
                <h3>Modest Wear <em>Tech Pack Template</em></h3>
                <p>A factory-ready, fully editable tech-pack template built around modest silhouettes.</p>
                <div className="shl-foot">
                  <div className="shl-price">$49<span className="was">$69</span></div>
                  <AddToCartButton className="shl-buy" name="Tech Pack Template" price={49}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>
            <div className="shl-card">
              <div className="shl-thumb">
                <span className="shl-fmt">AI · PNG</span>
                <CoverImage src="/images/28.jpeg" objectPosition="center 30%" alt="Flat sketch library" sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="shl-body">
                <div className="shl-cat">Flats &amp; CADs</div>
                <h3>Modest Silhouette <em>Flat Sketch Library</em></h3>
                <p>100+ editable vector flats to build tech packs and line sheets fast.</p>
                <div className="shl-foot">
                  <div className="shl-price">$59<span className="was">$89</span></div>
                  <AddToCartButton className="shl-buy" name="Flat Sketch Library" price={59}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>
            <div className="shl-card">
              <div className="shl-thumb">
                <span className="shl-fmt">Bundle</span>
                <CoverImage src="/images/31.jpeg" objectPosition="center 30%" alt="Starter kit bundle" sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="shl-body">
                <div className="shl-cat">Best Value · Save 40%</div>
                <h3>The Modest <em>Brand Starter Kit</em></h3>
                <p>All six digital products bundled together — everything to launch a label.</p>
                <div className="shl-foot">
                  <div className="shl-price">$129<span className="was">$236</span></div>
                  <AddToCartButton className="shl-buy" name="The Modest Brand Starter Kit" price={129}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>
          </div>
          <div className="shop-foot reveal">
            <Link href="/digital" className="btn btn-burg">Visit the Shop →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="inner">
          <div className="t-head reveal">
            <p className="s-tag">Client Stories</p>
            <h2 className="s-title">What our clients <em>have to say.</em></h2>
          </div>
          <div className="t-grid reveal">
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;Zameett completely transformed how I launch collections. They built my tech packs so professionally that even my new manufacturer understood everything perfectly. Zero revisions needed.&rdquo;</p>
              <div className="t-name">Sarah A.</div>
              <div className="t-role">Modest Fashion Brand — Dubai</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;I came to them after a nightmare experience where my previous manufacturer ruined my entire abaya collection. Zameett rebuilt everything and took over production. The results were stunning.&rdquo;</p>
              <div className="t-name">Fatima K.</div>
              <div className="t-role">Independent Designer — UK</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;As a boutique owner I needed someone who truly understood modest wear. Zameett delivered a custom collection my customers absolutely loved. Professional, on time, and beautiful quality.&rdquo;</p>
              <div className="t-name">Nadia R.</div>
              <div className="t-role">Boutique Owner — Canada</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <p className="s-tag">Ready to Begin?</p>
        <h2 className="s-title">Your next collection starts <em>right here.</em></h2>
        <p className="cta-sub">
          Design only or the full journey — tell us your vision and we will make it a reality.
          Pakistan-crafted, world-delivered.
        </p>
        <div className="cta-btns">
          <Link href="/contact" className="btn btn-gold">Start Your Project →</Link>
          <Link href="/services" className="btn btn-outline-ivory">View Services</Link>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
