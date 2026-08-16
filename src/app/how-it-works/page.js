import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const siteUrl = "https://zameett.com";

export const metadata = {
  title: "How Zameett Works",
  description: "A transparent fashion-development workflow for design, tech packs, sourcing, sampling, reviewed production management and dispatch.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Zameett Works | Design to Delivery",
    description: "See the stages, approvals and responsibilities behind a Zameett modest-fashion project.",
    url: "/how-it-works",
    images: [{ url: "/services/manufacturing-1.jpeg", width: 1200, height: 630, alt: "Zameett modest-fashion development workflow" }],
  },
};

const MODELS = [
  ["Flexible support", "On-demand development", "Use Zameett for one defined need: a concept, tech pack, print, material route, sample review or production problem. The scope stays focused and transparent."],
  ["Launch support", "Concept-to-sample project", "Build the technical foundation for a new capsule through coordinated design, documentation, sourcing and sample approval before bulk decisions."],
  ["Ongoing support", "Managed production", "Keep milestones, supplier communication, approvals, quality checkpoints and shipment readiness under one accountable workflow."],
];

const STAGES = [
  ["01", "Discovery & feasibility", "We clarify the customer, product, target price, quantity, destination and launch date before recommending a scope."],
  ["02", "Creative direction", "Silhouettes, references, colour, modesty requirements and collection logic become one approved direction."],
  ["03", "Technical development", "Flats, construction, measurements, BOMs, artwork, labels and open decisions are documented for quotation and sampling."],
  ["04", "Material & supplier route", "Fabric, trims, techniques, MOQ, capacity and timing are checked against the actual style, not a generic promise."],
  ["05", "Sampling & fitting", "The prototype is reviewed for fit, movement, coverage, construction and finish. Corrections are recorded in one revision trail."],
  ["06", "Production controls", "Only approved files and references move into bulk. Changes, milestones and quality checks remain visible."],
  ["07", "Packing & delivery", "Quantity, labels, finishing, packaging and shipment documents are checked before release to the confirmed project-specific delivery route."],
];

const READY = [
  "Reference images, sketches or an existing tech pack",
  "Target customer, size range and intended selling price",
  "Estimated styles, colours and units",
  "Preferred launch date and delivery country",
  "Known fabric, trim, branding or packaging requirements",
  "What is already approved and what is still uncertain",
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How a Zameett fashion-development project works",
  description: "A seven-stage design-to-dispatch workflow with controlled approvals.",
  step: STAGES.map(([number, name, text], index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: `${number} ${name}`,
    text,
    url: `${siteUrl}/how-it-works#workflow`,
  })),
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={howToSchema} />
      <header className="page-hero workflow-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; How It Works</p>
          <h1>See how your project <em>moves forward.</em></h1>
          <p>Start with one technical task or use the complete process from concept to delivery. We show what each stage includes and what needs approval before work continues.</p>
          <div className="page-hero-proof"><span>Flexible scope</span><span>Sample before bulk</span><span>Visible milestones</span></div>
        </div>
      </header>

      <main>
        <section className="premium-section">
          <div className="inner">
            <div className="svc-head reveal">
              <div><p className="s-tag">Three Ways to Work Together</p><h2 className="s-title">Choose the support model that fits <em>your brand today.</em></h2></div>
              <p className="s-body">The biggest package is not always the right one. We recommend the smallest useful scope, then add stages only when the project is ready.</p>
            </div>
            <div className="workflow-model-grid reveal">
              {MODELS.map(([label, title, text]) => <article className="workflow-model-card reveal" key={title}><span>{label}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="premium-section" id="workflow">
          <div className="inner">
            <div className="svc-head reveal">
              <div><p className="s-tag">Seven Controlled Stages</p><h2 className="s-title">What happens from brief <em>to shipment.</em></h2></div>
              <p className="s-body">Timelines change with product complexity, materials and quantity. The approval logic stays consistent.</p>
            </div>
            <div className="workflow-stage-grid reveal">
              {STAGES.map(([number, title, text]) => <article className="workflow-stage-card reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
            <div className="workflow-decision reveal">
              <div><h2>We confirm the details before moving forward.</h2><p>Before bulk production, the commercial terms, approved sample, current specification, colour and material references, quantity breakdown and relevant quality plan are confirmed.</p></div>
              <a className="btn btn-gold" href="/supply-chain#quality-process">See quality controls →</a>
            </div>
          </div>
        </section>

        <section className="premium-section">
          <div className="inner workflow-checklist">
            <div className="reveal"><p className="s-tag">Prepare for Discovery</p><h2 className="s-title">Send what you have. <em>We will check what is missing.</em></h2><p className="s-body">You do not need a perfect brief. These details help us recommend a realistic starting point and price the correct scope.</p><div style={{ marginTop: 26 }}><a className="btn btn-burg" href="/contact#get-in-touch">Start your brief →</a></div></div>
            <ul className="reveal">{READY.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="cta page-cta">
          <p className="s-tag">Start with Clarity</p>
          <h2 className="s-title">Tell us where the collection is <em>right now.</em></h2>
          <p className="cta-sub">We will recommend design-only, development, sampling or managed production support based on the real next decision.</p>
          <div className="cta-btns"><a href="/contact#get-in-touch" className="btn btn-gold">Discuss your project →</a><a href="/pricing#pricing-guide" className="btn btn-outline-ivory">View pricing guide</a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
