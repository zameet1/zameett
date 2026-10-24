import Footer from "@/components/Footer";
import AutoReviews from "@/components/AutoReviews";
import CoverImage from "@/components/CoverImage";
import WorkShowcase from "@/components/WorkShowcase";
import ProjectBriefPanel from "@/components/ProjectBriefPanel";
import HomePricingHighlight from "@/components/HomePricingHighlight";
import { createPageMetadata } from "@/lib/seo";

const homeTitle = "Fashion Design, Tech Packs & Modest-Wear Development | Zameett";
const homeDescription = "Fashion design, fashion technical drawings, production-ready tech packs, textile print design and specialist modest-wear manufacturing support from Zameett.";
export const metadata = { ...createPageMetadata({ title: homeTitle, description: homeDescription, path: "/" }), title: { absolute: homeTitle } };

const CLIENT_ROUTES = [
  {
    title: "Design & Tech Packs",
    text: "Original fashion design, technical drawings and production-ready tech packs for one product or a collection.",
    price: "From $95 USD",
    href: "/services/fashion-tech-packs",
  },
  {
    title: "Textile Print Design",
    text: "Original repeat or placement artwork, colourways and editable files prepared for supplier review.",
    price: "From $60 USD",
    href: "/services/custom-textile-patterns",
  },
  {
    title: "Sampling & Fit Review",
    text: "Prototype development, material decisions, fit review and documented corrections before production.",
    price: "Project quotation",
    href: "/solutions/fashion-sampling-services",
  },
  {
    title: "Modest-Wear Manufacturing",
    text: "Project-scoped support for abayas, kaftans and modest dresses, with MOQ confirmed after review.",
    price: "Project quotation",
    href: "/services/clothing-manufacturing",
  },
];


export default function HomePage() {
  return (
    <>
      <main className="home">
        <section className="hero">
          <div className="hero-bg"><CoverImage src="/images/21.jpeg" alt="Zameett fashion design and modest-wear development" priority /></div>
          <div className="hero-inner"><div className="hero-content">
            <p className="hero-eyebrow">Fashion Design & Product Development · Pakistan</p>
            <h1 className="hero-h1 home-hero-title">Build Your Fashion Collection.<em>Know Exactly What Comes Next.</em></h1>
            <p className="hero-sub">Start with original fashion design, technical drawings, tech packs or textile prints. For modest wear and abayas, Zameett can also support sampling and manufacturing after reviewing your brief.</p>
            <div className="hero-btns"><a href="#ways-to-work" className="btn btn-gold">Choose Your Service →</a><a href="/portfolio#portfolio-gallery" className="btn btn-outline-ivory">View Portfolio</a></div>
            <a href="/pricing" className="home-hero-quiet-link">Compare packages from $60 USD <span aria-hidden="true">→</span></a>
          </div></div>
        </section>

        <section className="home-trust-bar" aria-label="Zameett service assurances"><div className="inner">
          <a href="/pricing">Packages from $60 USD →</a><span>Design-Only Available</span><span>Sample Before Bulk</span><span>Project-Specific MOQ</span>
        </div></section>

        <section className="home-core-services" id="ways-to-work" aria-labelledby="home-core-services-title"><div className="inner">
          <div className="home-core-services-head reveal">
            <p className="s-tag">Choose Your Next Step</p>
            <h2 className="s-title" id="home-core-services-title">What does your collection <em>need now?</em></h2>
            <p className="s-body">Choose the closest route. We review your brief and confirm scope, timing and price before payment.</p>
          </div>
          <nav className="home-core-services-grid reveal" aria-label="Choose a fashion development service">
            {CLIENT_ROUTES.map((service, index) => (
              <a href={service.href} key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service.title}</strong>
                <small>{service.text}</small>
                <em>{service.price}</em>
                <b aria-hidden="true">→</b>
              </a>
            ))}
          </nav>
          <p className="home-core-services-note">Not sure which route fits? <a href="#get-a-quote">Send your brief</a> and we will recommend the right starting point. Design and technical-development services are available across apparel categories; sampling and manufacturing specialisation is primarily modest wear and abayas.</p>
        </div></section>

        <HomePricingHighlight />

        <WorkShowcase />

        <section className="why home-why"><div className="inner">
          <div className="why-head reveal"><div><p className="s-tag">Why Zameett</p><h2 className="s-title">Make each development decision <em>with the right information.</em></h2></div><p className="why-body">Design support is available across apparel categories. Our core sampling and production specialisation remains modest wear.</p></div>
          <div className="why-grid reveal">
            <article className="why-card"><div className="w-icon">01</div><h3>Specialist modest-wear knowledge</h3><p>Coverage, proportion, drape, layering and embellishment placement are considered during technical development.</p></article>
            <article className="why-card"><div className="w-icon">02</div><h3>Design-only is welcome</h3><p>Commission defined design or technical files without committing to Zameett manufacturing.</p></article>
            <article className="why-card"><div className="w-icon">03</div><h3>Written approval gates</h3><p>Bulk production begins after written sample approval and confirmation of the approved specification.</p></article>
            <article className="why-card"><div className="w-icon">04</div><h3>Clear responsibilities and checks</h3><p>Your proposal identifies Zameett and supplier responsibilities, with project checkpoints recorded before dispatch.</p></article>
          </div>
        </div></section>

        <section className="process home-process" id="process"><div className="inner">
          <p className="s-tag">How It Works</p><h2 className="s-title">See what happens <em>after you send your brief.</em></h2>
          <div className="p-row">
            <div className="p-step"><div className="p-circle"><span>1</span></div><h3>Brief</h3><p>We review category, scope, quantity, destination and target timing.</p></div>
            <div className="p-step"><div className="p-circle"><span>2</span></div><h3>Proposal</h3><p>Deliverables, revisions, fees, assumptions and exclusions are documented.</p></div>
            <div className="p-step"><div className="p-circle"><span>3</span></div><h3>Development</h3><p>Designs, technical files or samples are prepared against the agreed brief.</p></div>
            <div className="p-step"><div className="p-circle"><span>4</span></div><h3>Approval</h3><p>The approved version and any open conditions are confirmed in writing.</p></div>
            <div className="p-step"><div className="p-circle"><span>5</span></div><h3>Handover</h3><p>Approved files or goods move to the agreed delivery or dispatch route.</p></div>
          </div><div className="sig-foot reveal"><a href="/how-it-works#workflow" className="btn btn-outline">View the complete workflow →</a></div>
        </div></section>

        <section className="testimonials home-testimonials"><div className="inner"><div className="t-head reveal"><p className="s-tag">Trust & Evidence</p><h2 className="s-title">Start with proof <em>you can inspect.</em></h2></div><AutoReviews /></div></section>

        <section className="contact-section home-quote" id="get-a-quote"><div className="inner"><div className="home-quote-intro reveal"><p className="s-tag">Start Your Project</p><h2 className="s-title">Send a clear brief.<br /><em>Receive a scoped next step.</em></h2><p className="s-body">Use the same secure three-step brief as our Get a Quote page. We aim to respond within one business day; MOQ, delivery and production options are confirmed for the product and destination.</p><div className="home-quote-assurances" aria-label="Project enquiry assurances"><span>No first-call commitment</span><span>Files stay private</span><span>Worldwide enquiries</span></div></div><ProjectBriefPanel /></div></section>
      </main>
      <Footer />
    </>
  );
}
