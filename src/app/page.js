import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";
import FeaturedGigs from "@/components/FeaturedGigs";

export default function Home() {
  return (
    <>
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <CoverImage src="/images/21.jpeg" alt="Zameett modest wear collection" priority quality={68} />
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
              <a href="/contact#get-in-touch" className="btn btn-gold">Start Your Project</a>
              <a href="/services" className="btn btn-outline-ivory">Our Services</a>
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
          <div className="stat"><div className="stat-num">350+</div><div className="stat-lbl">Clients Worldwide</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">100%</div><div className="stat-lbl">End-to-End Capable</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">3</div><div className="stat-lbl">Service Paths</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">6+</div><div className="stat-lbl">Years Team Experience</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">🌍</div><div className="stat-lbl">Worldwide Delivery</div></div>
        </div>
        <p className="stats-note">Figures reflect our team&rsquo;s combined experience in modest fashion design and manufacturing.</p>
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
              <div className="svc-num" aria-hidden="true">01</div>
              <h3>Design &amp; Tech Packs Only</h3>
              <p>
                Professional designs and manufacturer-ready tech packs — everything your factory
                needs to execute your vision perfectly. No manufacturing commitment required.
              </p>
              <a href="/services" className="svc-link">Learn more →</a>
            </div>
            <div className="svc-card">
              <div className="svc-num" aria-hidden="true">02</div>
              <h3>Design Concept &amp; Styling</h3>
              <p>
                From mood boards to final illustrations — abayas, bias cuts, scarves, modest formal
                and casual wear, designed with cultural understanding.
              </p>
              <a href="/services" className="svc-link">Learn more →</a>
            </div>
            <div className="svc-card">
              <div className="svc-num" aria-hidden="true">03</div>
              <h3>Embroidery &amp; Textile Prints</h3>
              <p>
                Custom embroidery patterns, textile prints and embellishment placement matched to
                your brand&rsquo;s aesthetic and quality standards.
              </p>
              <a href="/services" className="svc-link">Learn more →</a>
            </div>
            <div className="svc-card">
              <div className="svc-num" aria-hidden="true">04</div>
              <h3>Textile Sourcing</h3>
              <p>
                The right fabrics for modest wear — from lightweight linens to heavy embellished
                formals — at competitive prices that protect your margins.
              </p>
              <a href="/services" className="svc-link">Learn more →</a>
            </div>
            <div className="svc-card">
              <div className="svc-num" aria-hidden="true">05</div>
              <h3>Sampling &amp; Production</h3>
              <p>
                A prototype is approved before any production run begins. We never move forward
                until you are completely satisfied — no wasted budgets.
              </p>
              <a href="/services" className="svc-link">Learn more →</a>
            </div>
            <div className="svc-card">
              <div className="svc-num" aria-hidden="true">06</div>
              <h3>Delivery to Doorstep</h3>
              <p>
                Finished, quality-checked and packaged — shipped worldwide directly to you or your
                customers. Truly end-to-end.
              </p>
              <a href="/services" className="svc-link">Learn more →</a>
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
            <a href="/contact?service=fashion-tech-packs#get-in-touch" className="btn btn-burg">Design-Only Enquiry →</a>
          </div>
        </div>
      </section>

      {/* FEATURED GIGS */}
      <FeaturedGigs />

      {/* PHOTO BREAK */}
      <div className="photo-break">
        <CoverImage src="/images/19.jpeg" objectPosition="center 22%" alt="Zameett modest wear collection — abayas and modest formal pieces crafted in Pakistan" />
        <div className="pb-overlay">
          <div className="pb-content">
            <p className="pb-tag">Our Philosophy</p>
            <h2 className="pb-h">&ldquo;Your vision, executed with precision and cultural understanding.&rdquo;</h2>
            <p className="pb-p">
              We specialise in modest wear — abayas, bias cuts, scarves and formal modest
              collections — crafted from Pakistan and delivered to the world.
            </p>
            <a href="/about" className="btn btn-gold">Our Story →</a>
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
            <a href="/portfolio" className="sig-card">
              <CoverImage src="/images/09.jpeg" objectPosition="center 16%" alt="Ivory pearl-trim abaya" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Abayas</div><h3>Ivory Pearl-Trim Abaya</h3></div>
            </a>
            <a href="/portfolio" className="sig-card">
              <CoverImage src="/images/16.jpeg" objectPosition="center 16%" alt="Ivory protea-print silk gown" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Prints</div><h3>Ivory Protea Print</h3></div>
            </a>
            <a href="/portfolio" className="sig-card">
              <CoverImage src="/images/02.jpeg" objectPosition="center 16%" alt="Rosewood belted maxi" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Bias Cut</div><h3>Rosewood Belted Maxi</h3></div>
            </a>
            <a href="/portfolio" className="sig-card">
              <CoverImage src="/images/08.jpeg" objectPosition="center 16%" alt="Terracotta tribal kimono" sizes="(max-width: 900px) 50vw, 25vw" />
              <div className="sig-cap"><div className="c">Embroidery</div><h3>Terracotta Tribal Kimono</h3></div>
            </a>
          </div>
          <div className="sig-foot reveal">
            <a href="/portfolio" className="btn btn-outline">View Full Lookbook →</a>
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
              <h3>Modest Wear Specialists</h3>
              <p>We only do modest fashion. Every design and production decision is made with deep cultural and technical industry understanding.</p>
            </div>
            <div className="why-card">
              <div className="w-icon">🎨</div>
              <h3>Design-Only Welcome</h3>
              <p>No manufacturing commitment needed. Come for designs and tech packs and take them to any factory you choose. We never lock you in.</p>
            </div>
            <div className="why-card">
              <div className="w-icon">📦</div>
              <h3>Truly End-to-End</h3>
              <p>Design to delivery under one roof when you need it. No coordinating multiple vendors. No miscommunications. No lost vision.</p>
            </div>
            <div className="why-card">
              <div className="w-icon">✅</div>
              <h3>Quality Guaranteed</h3>
              <p>Every piece goes through strict quality control before dispatch. We do not ship anything we would not be proud to wear ourselves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="inner">
          <div className="t-head reveal">
            <p className="s-tag">Client Stories</p>
            <h2 className="s-title">What our clients <em>have to say.</em></h2>
            <p className="t-rating">★ 4.7 average from verified client reviews</p>
          </div>
          <div className="t-grid reveal">
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;Zameett is kind, understanding and handled multiple revisions with ease. The quality of work was very high and I love the print they made — I&rsquo;ll definitely work with them again. True dedication to customer satisfaction.&rdquo;</p>
              <div className="t-name">dylani760</div>
              <div className="t-role">Verified Client — United States</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;Fast, clear and excellent communication. They took my feedback quickly and adjusted everything fast — exactly the kind of partner a growing brand needs.&rdquo;</p>
              <div className="t-name">aloosha123</div>
              <div className="t-role">Verified Client — United Arab Emirates</div>
            </div>
            <div className="t-card">
              <div className="t-stars">★★★★★</div>
              <p>&ldquo;Great job! The team took the time to add everything I needed and were patient with me throughout. Exactly what we needed for our collection.&rdquo;</p>
              <div className="t-name">hassatabey</div>
              <div className="t-role">Verified Client — United States</div>
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
          <a href="/contact#get-in-touch" className="btn btn-gold">Start Your Project →</a>
          <a href="/services" className="btn btn-outline-ivory">View Services</a>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
