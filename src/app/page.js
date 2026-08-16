import Footer from "@/components/Footer";
import AutoReviews from "@/components/AutoReviews";
import CoverImage from "@/components/CoverImage";
import WorkShowcase from "@/components/WorkShowcase";
import ProjectBriefPanel from "@/components/ProjectBriefPanel";
import HomePricingHighlight from "@/components/HomePricingHighlight";
import { getPricingPackage } from "@/data/pricing";

export const metadata = {
  title: { absolute: "Fashion Design, Tech Packs & Modest-Wear Development | Zameett" },
  description: "Zameett helps fashion brands develop original designs, technical flats, production-ready tech packs, textile prints and specialist modest-wear projects from Pakistan.",
  alternates: { canonical: "/" },
};

const PREMIUM_PRINTED_PACKAGE = getPricingPackage("design-techpack-print-premium-collection");

const WORK_PATHS = [
  { number: "01", title: "Design & Development", text: "Original concepts, technical flats, production-ready tech packs, textile prints and measurement documentation for multiple apparel categories.", href: "/services/fashion-tech-packs" },
  { number: "02", title: "Sampling", text: "Prototype development, fit review, material decisions and documented corrections before any approved production route.", href: "/solutions/fashion-sampling-services" },
  { number: "03", title: "Modest-Wear Manufacturing", text: "Reviewed sourcing, private labels, production checkpoints and dispatch for abayas, kaftans, modest dresses and coordinated collections.", href: "/services/clothing-manufacturing" },
];


export default function HomePage() {
  return (
    <>
      <main className="home">
        <section className="hero">
          <div className="hero-bg"><CoverImage src="/images/21.jpeg" alt="Zameett fashion design and modest-wear development" priority /></div>
          <div className="hero-inner"><div className="hero-content">
            <p className="hero-eyebrow">Fashion Design & Product Development · Pakistan</p>
            <h1 className="hero-h1 home-hero-title">Launch Your Fashion Collection—<em>From Design to Production Support.</em></h1>
            <p className="hero-sub">From original fashion concepts and technical flats to production-ready tech packs, textile prints and specialist modest-wear development, Zameett helps brands build clearer and more professional collections.</p>
            <div className="hero-btns"><a href="#get-a-quote" className="btn btn-gold">Start Your Project →</a><a href="/portfolio#portfolio-gallery" className="btn btn-outline-ivory">View Our Work</a><a href="/pricing" className="btn btn-pricing-hero">View Pricing</a></div>
            <a href="/pricing#package-design-techpack-print-premium-collection" className="home-hero-price-card" aria-label={`View the recommended Zameett ${PREMIUM_PRINTED_PACKAGE.name}`}>
              <span>Recommended premium package</span>
              <strong>${PREMIUM_PRINTED_PACKAGE.price.toLocaleString("en-US")} <i>USD</i></strong>
              <small>{PREMIUM_PRINTED_PACKAGE.collectionSize} original designs, {PREMIUM_PRINTED_PACKAGE.collectionSize} professional tech packs and {PREMIUM_PRINTED_PACKAGE.collectionSize} custom textile prints for the most complete creative scope.</small>
              <b>View recommended package <i aria-hidden="true">&rarr;</i></b>
            </a>
          </div></div>
        </section>

        <section className="home-trust-bar" aria-label="Zameett service assurances"><div className="inner">
          <a href="/pricing">Packages from $60 USD →</a><span>Modest-Wear Specialists</span><span>Design-Only Available</span><span>Sample Before Bulk</span><span>Worldwide Projects</span><span>NDA Available</span>
        </div></section>

        <section className="services home-services" id="ways-to-work"><div className="inner">
          <div className="svc-head reveal"><div><p className="s-tag">Three Ways To Work With Zameett</p><h2 className="s-title">Start with the stage <em>you need.</em></h2></div><p className="s-body">Every proposal confirms scope, formats, revisions, timing and commercial assumptions before work begins.</p></div>
          <div className="svc-grid svc-grid-paths reveal">{WORK_PATHS.map((path) => <article className={`svc-card${path.number === "01" ? " featured" : ""}`} key={path.title}>{path.number === "01" && <span className="svc-badge">Standalone Available</span>}<div className="svc-num">{path.number}</div><h2>{path.title}</h2><p>{path.text}</p><a className="svc-link" href={path.href}>{path.number === "01" ? "Explore Fashion Tech Pack Services" : path.number === "02" ? "Explore Sampling Support" : "Explore Modest-Wear Manufacturing"} →</a></article>)}</div>
        </div></section>

        <HomePricingHighlight />

        <WorkShowcase />

        <section className="why home-why"><div className="inner">
          <div className="why-head reveal"><div><p className="s-tag">Why Zameett</p><h2 className="s-title">Development decisions that remain <em>clear and controlled.</em></h2></div><p className="why-body">Design support is available across apparel categories. Our core sampling and production specialisation remains modest wear.</p></div>
          <div className="why-grid reveal">
            <article className="why-card"><div className="w-icon">01</div><h3>Specialist modest-wear knowledge</h3><p>Coverage, proportion, drape, layering and embellishment placement are considered during technical development.</p></article>
            <article className="why-card"><div className="w-icon">02</div><h3>Design-only is welcome</h3><p>Commission defined design or technical files without committing to Zameett manufacturing.</p></article>
            <article className="why-card"><div className="w-icon">03</div><h3>Written approval gates</h3><p>Bulk production begins after written sample approval and confirmation of the approved specification.</p></article>
            <article className="why-card"><div className="w-icon">04</div><h3>Documented quality checkpoints</h3><p>Every accepted production project follows documented quality checkpoints before dispatch.</p></article>
          </div>
        </div></section>

        <section className="process home-process" id="process"><div className="inner">
          <p className="s-tag">How It Works</p><h2 className="s-title">A visible path from brief <em>to handover.</em></h2>
          <div className="p-row">
            <div className="p-step"><div className="p-circle"><span>1</span></div><h3>Brief</h3><p>We review category, scope, quantity, destination and target timing.</p></div>
            <div className="p-step"><div className="p-circle"><span>2</span></div><h3>Proposal</h3><p>Deliverables, revisions, fees, assumptions and exclusions are documented.</p></div>
            <div className="p-step"><div className="p-circle"><span>3</span></div><h3>Development</h3><p>Designs, technical files or samples are prepared against the agreed brief.</p></div>
            <div className="p-step"><div className="p-circle"><span>4</span></div><h3>Approval</h3><p>The approved version and any open conditions are confirmed in writing.</p></div>
            <div className="p-step"><div className="p-circle"><span>5</span></div><h3>Handover</h3><p>Approved files or goods move to the agreed delivery or dispatch route.</p></div>
          </div><div className="sig-foot reveal"><a href="/how-it-works#workflow" className="btn btn-outline">View the complete workflow →</a></div>
        </div></section>

        <section className="testimonials home-testimonials"><div className="inner"><div className="t-head reveal"><p className="s-tag">Client Feedback</p><h2 className="s-title">Independent feedback, <em>shown with its source where available.</em></h2></div><AutoReviews variant="home" /></div></section>

        <section className="home-trust-section"><div className="inner"><div className="reveal"><p className="s-tag">Transparent Project Structure</p><h2 className="s-title">Know who is responsible <em>before work begins.</em></h2></div><div className="home-trust-copy reveal"><p>Your proposal identifies the services delivered directly by Zameett and any work performed by reviewed third-party suppliers. Capability, MOQ, sample, production, shipping and confidentiality requirements are confirmed for the specific project.</p><p>Files, approvals, revisions and supplier responsibilities are documented around the agreed scope so every project has a clearer decision trail.</p></div></div></section>

        <section className="contact-section home-quote" id="get-a-quote"><div className="inner"><div className="home-quote-intro reveal"><p className="s-tag">Start Your Project</p><h2 className="s-title">Send a clear brief.<br /><em>Receive a scoped next step.</em></h2><p className="s-body">Use the same secure three-step brief as our Get a Quote page. We aim to respond within one business day; MOQ, delivery and production options are confirmed for the product and destination.</p><div className="home-quote-assurances" aria-label="Project enquiry assurances"><span>No first-call commitment</span><span>Files stay private</span><span>Worldwide enquiries</span></div></div><ProjectBriefPanel /></div></section>
      </main>
      <Footer />
    </>
  );
}
