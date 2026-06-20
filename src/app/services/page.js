import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";

export const metadata = {
  title: "Services",
  description:
    "Design and tech packs only, design plus sampling, or full manufacturing from concept to worldwide delivery — explore Zameett's modest fashion service paths.",
};

export default function Services() {
  return (
    <>
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Services</p>
          <h1>Design only, full manufacturing, or <em>everything in between.</em></h1>
          <p>
            Zameett is built around flexibility. Take our designs to your own factory, or let us
            carry your collection from the first sketch all the way to your customer&rsquo;s
            doorstep. You choose your level of involvement.
          </p>
        </div>
      </header>

      {/* SERVICE PATHS */}
      <section className="services" style={{ paddingBottom: 48 }}>
        <div className="inner">
          <div className="svc-head reveal">
            <div>
              <p className="s-tag">Three Ways To Work With Us</p>
              <h2 className="s-title">Pick the path that fits <em>your brand today.</em></h2>
            </div>
            <p className="s-body">
              Whether you are launching your first capsule or scaling an established label, there
              is a route designed for exactly where you are right now — and room to grow into the
              others later.
            </p>
          </div>
          <div className="svc-grid reveal" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <div className="svc-card featured">
              <span className="svc-badge">Most Popular</span>
              <div className="svc-num">A</div>
              <h3>Design &amp; Tech Packs Only</h3>
              <p>We create complete design concepts and manufacturer-ready tech packs. You take the files to any factory in the world. No production commitment required.</p>
            </div>
            <div className="svc-card">
              <div className="svc-num">B</div>
              <h3>Design + Sampling</h3>
              <p>Designs, tech packs and a physical prototype sample produced and shipped to you — so you can approve fit and finish before committing to a full run.</p>
            </div>
            <div className="svc-card">
              <div className="svc-num">C</div>
              <h3>Full Manufacturing</h3>
              <p>The complete journey — design, sourcing, sampling, production, quality control and worldwide delivery, all handled under one roof.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="services" style={{ paddingTop: 24 }}>
        <div className="inner">
          <div className="svc-head reveal">
            <div>
              <p className="s-tag">What We Offer</p>
              <h2 className="s-title">Every capability your<br />modest collection needs.</h2>
            </div>
            <p className="s-body">Engage us for a single service or combine several. The team, the quoting transparency and the accountability stay exactly the same.</p>
          </div>
          <div className="svc-grid reveal">
            <div className="svc-card featured">
              <span className="svc-badge">Most Popular</span>
              <div className="svc-num">01</div>
              <h3>Design &amp; Tech Packs Only</h3>
              <p>Complete design concepts, construction notes, measurements and specs — everything your factory needs to execute your vision perfectly. No manufacturing commitment required.</p>
            </div>
            <div className="svc-card">
              <div className="svc-num">02</div>
              <h3>Design Concept &amp; Styling</h3>
              <p>From mood boards to final design illustrations — abayas, bias cuts, scarves, modest formal and casual wear. Designed with cultural understanding and commercial precision.</p>
            </div>
            <div className="svc-card">
              <div className="svc-num">03</div>
              <h3>Embroidery &amp; Textile Prints</h3>
              <p>Custom embroidery patterns, textile prints and embellishment placement designed to match your brand&rsquo;s aesthetic. Standalone files or applied during full production.</p>
            </div>
            <div className="svc-card">
              <div className="svc-num">04</div>
              <h3>Textile Sourcing</h3>
              <p>We source the right fabrics for modest wear — from lightweight linens to heavy embellished formals — from trusted suppliers at competitive prices that protect your margins.</p>
            </div>
            <div className="svc-card">
              <div className="svc-num">05</div>
              <h3>Sampling &amp; Production</h3>
              <p>A prototype sample is made and sent for your full approval before any production run begins. We never move forward until you are completely satisfied.</p>
            </div>
            <div className="svc-card">
              <div className="svc-num">06</div>
              <h3>Delivery to Doorstep</h3>
              <p>Finished, quality-checked and packaged — shipped worldwide directly to you or your customers. The most complete end-to-end service for modest fashion brands.</p>
            </div>
          </div>
          <div className="design-banner reveal">
            <div>
              <h3>Just need designs? <em>That is perfectly fine.</em></h3>
              <p>Many of our clients come to Zameett only for design concepts and tech packs — they have their own manufacturer or are still building their production setup. We create production-ready files that any factory in the world can follow. No manufacturing commitment needed, ever.</p>
            </div>
            <a href="/contact" className="btn btn-burg">Design-Only Enquiry →</a>
          </div>
        </div>
      </section>

      {/* PHOTO BREAK */}
      <div className="photo-break">
        <CoverImage src="/images/14.jpeg" objectPosition="center 40%" alt="Technical package on tablet" />
        <div className="pb-overlay">
          <div className="pb-content">
            <p className="pb-tag">Design to Delivery</p>
            <h2 className="pb-h">&ldquo;From your first design sketch to your customer&rsquo;s door.&rdquo;</h2>
            <p className="pb-p">Design only, sampling, full manufacturing, or worldwide delivery — Zameett handles whichever part of the journey you need.</p>
            <a href="/portfolio" className="btn btn-outline-gold">See Our Work →</a>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <section className="process">
        <div className="inner">
          <p className="s-tag">How We Work</p>
          <h2 className="s-title">A clear process. <em>Zero guesswork.</em></h2>
          <div className="p-row">
            <div className="p-step">
              <div className="p-circle"><span>1</span></div>
              <h4>Consultation</h4>
              <p>We understand your brand, budget, timeline, and whether you need design only or full production.</p>
            </div>
            <div className="p-step">
              <div className="p-circle"><span>2</span></div>
              <h4>Design &amp; Tech Pack</h4>
              <p>Designs and manufacturer-ready tech packs created from your approved creative brief.</p>
            </div>
            <div className="p-step">
              <div className="p-circle"><span>3</span></div>
              <h4>Fabric &amp; Materials</h4>
              <p>Fabric options presented for approval — or files handed off if you are producing elsewhere.</p>
            </div>
            <div className="p-step">
              <div className="p-circle"><span>4</span></div>
              <h4>Sample &amp; Approval</h4>
              <p>Prototype created and sent to you. Full production only begins after your complete approval.</p>
            </div>
            <div className="p-step">
              <div className="p-circle"><span>5</span></div>
              <h4>Production &amp; Delivery</h4>
              <p>Full production run, strict quality control, and worldwide delivery to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="inner">
          <div>
            <p className="s-tag">The Real Problem</p>
            <h2 className="s-title">Building a modest fashion brand is <em>harder than it looks.</em></h2>
            <p className="s-body" style={{ color: "rgba(250,247,242,0.5)" }}>
              Most modest fashion designers and boutique owners face the same painful reality.
              Zameett was built to solve it entirely — whether you need design support only, or a
              trusted partner for the full journey from sketch to delivery.
            </p>
          </div>
          <div className="pain-list">
            <div className="pain-item">
              <div className="pain-n">01</div>
              <div><h4>Too Many Vendors</h4><p>One for fabric, one for design, one for embroidery, one for production. The coordination alone eats your time, budget and sanity.</p></div>
            </div>
            <div className="pain-item">
              <div className="pain-n">02</div>
              <div><h4>Manufacturers Ruin Designs</h4><p>You invest in beautiful tech packs — then a factory that doesn&rsquo;t understand modest wear construction ruins everything. Wrong drape, wrong proportions, wasted season.</p></div>
            </div>
            <div className="pain-item">
              <div className="pain-n">03</div>
              <div><h4>No Modest Wear Expertise</h4><p>Generic manufacturers don&rsquo;t understand the cultural nuance, modesty standards or silhouette precision behind an abaya or bias-cut scarf.</p></div>
            </div>
            <div className="pain-item">
              <div className="pain-n">04</div>
              <div><h4>No End-to-End Support</h4><p>You are left alone to manage logistics, quality control and delivery — on top of running your entire brand and creative direction.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <p className="s-tag">Ready to Begin?</p>
        <h2 className="s-title">Tell us what you&rsquo;re making.<br /><em>We&rsquo;ll map the route.</em></h2>
        <p className="cta-sub">Share your project and we will come back with a clear path, timeline and quote within 24 hours.</p>
        <div className="cta-btns">
          <a href="/contact" className="btn btn-gold">Request a Quote →</a>
          <a href="/portfolio" className="btn btn-outline-ivory">View Portfolio</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
