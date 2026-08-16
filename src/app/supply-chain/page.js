import Image from "next/image";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const siteUrl = "https://zameett.com";

export const metadata = {
  title: "Supply Chain & Quality Control",
  description: "How Zameett manages modest-fashion sourcing, sampling, production approvals, quality checkpoints, packing and worldwide shipment from Pakistan.",
  alternates: { canonical: "/supply-chain" },
  openGraph: {
    title: "Zameett Supply Chain & Quality Control",
    description: "A transparent look at material sourcing, sample approval, production control and shipment readiness for modest-fashion collections.",
    url: "/supply-chain",
    images: [{ url: "/services/manufacturing-2.jpeg", width: 1200, height: 630, alt: "Zameett modest-fashion supply chain" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Modest fashion supply chain and production support",
  url: `${siteUrl}/supply-chain`,
  provider: { "@type": "Organization", name: "Zameett", url: siteUrl },
  areaServed: "Worldwide",
  serviceType: ["Fabric sourcing", "Garment sampling", "Production management", "Quality control"],
};

const STAGES = [
  ["01", "Technical readiness", "We review the design, measurements, BOM, artwork, labels and open decisions before a supplier is asked to quote or sample."],
  ["02", "Material route", "Fabric and trims are considered against opacity, drape, use, care, target price, supplier MOQ and lead time."],
  ["03", "Prototype approval", "A sample is checked for measurements, movement, coverage, construction, finishing and compatibility with the intended materials."],
  ["04", "Production controls", "Approved files and samples become the reference while milestones, changes and supplier questions are kept in one controlled workflow."],
  ["05", "Quality checkpoints", "The relevant incoming-material, first-piece, in-line and final checks are agreed around the product and order risk."],
  ["06", "Packing & shipment", "Quantity, labels, finishing, packing and delivery documents are reviewed before the order is released for its agreed route."],
];

const SUPPLIER_CHECKS = [
  ["01 · Product fit", "Category & technique", "We match the garment, construction, embellishment and expected finish to a supplier with relevant capability, not simply the lowest quote."],
  ["02 · Commercial fit", "MOQ, capacity & timing", "Minimums, size and colour splits, current capacity, sample timing and bulk lead time are checked against the actual collection plan."],
  ["03 · Risk fit", "Quality & documentation", "The quote, approved sample, specification files, quality checkpoints and relevant compliance evidence form one traceable decision record."],
  ["04 · Working fit", "Communication & ownership", "Responsibilities, approvals, change control and escalation routes are agreed before production so questions do not disappear inside chat threads."],
];
export default function SupplyChainPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <header className="page-hero supply-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Supply Chain</p>
          <h1>Keep materials, suppliers and <em>delivery under control.</em></h1>
          <p>Zameett records product decisions, approvals and quality expectations in one place. Your collection does not have to rely on scattered messages or supplier assumptions.</p>
          <div className="page-hero-proof"><span>Pakistan based</span><span>Modest-wear specialist</span><span>Worldwide projects</span></div>
        </div>
      </header>

      <main>
        <section className="supply-intro premium-section">
          <div className="inner supply-intro-grid">
            <div className="reveal"><p className="s-tag">Our Standard</p><h2 className="s-title">Transparency before <em>production speed.</em></h2><p className="s-body">We do not publish invented factory certifications or one universal MOQ. Capabilities, minimums, material terms and relevant compliance documents are confirmed for the actual supplier and project before approval.</p></div>
            <div className="supply-intro-image reveal"><Image src="/services/manufacturing-1.jpeg" alt="Modest fashion garment development at Zameett" fill sizes="(max-width: 800px) 100vw, 46vw" /></div>
          </div>
        </section>

        <section className="supply-stages premium-section" id="quality-process">
          <div className="inner">
            <div className="svc-head reveal"><div><p className="s-tag">Six Control Stages</p><h2 className="s-title">Six stages, each with <em>a clear approval.</em></h2></div><p className="s-body">The inspection plan changes by garment and quantity. We record each decision from the first file to the packed order.</p></div>
            <div className="supply-stage-grid">
              {STAGES.map(([number, title, text]) => <article className="reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="supply-capabilities">
          <div className="inner supply-capability-grid">
            <div className="reveal"><p className="s-tag">Specialist Capabilities</p><h2 className="s-title">Built for the details that make <em>modest wear different.</em></h2></div>
            <div className="reveal supply-capability-list">
              <span>Abayas, kaftans and modest dresses</span><span>Bias-cut and layered silhouettes</span><span>Embroidery and placement artwork</span><span>Textile prints and colourways</span><span>Private labels and care labels</span><span>Small-batch and scalable production</span>
            </div>
          </div>
        </section>

        <section className="supplier-check premium-section" id="supplier-check">
          <div className="inner">
            <div className="svc-head reveal">
              <div><p className="s-tag">How We Check Suppliers</p><h2 className="s-title">Four checks before a supplier <em>works on your order.</em></h2></div>
              <p className="s-body">A supplier is assessed for the specific product and order. Zameett does not promise one factory, one MOQ or one compliance answer for every collection.</p>
            </div>
            <div className="supplier-check-grid reveal">
              {SUPPLIER_CHECKS.map(([label, title, text]) => (
                <article className="supplier-check-card reveal" key={title}>
                  <span>{label}</span><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="services supply-links premium-section">
          <div className="inner">
            <div className="svc-head reveal"><div><p className="s-tag">Choose the Support</p><h2 className="s-title">Use one service or combine <em>the stages you need.</em></h2></div></div>
            <div className="svc-grid reveal">
              <a className="svc-card" href="/solutions/fabric-sourcing-modest-fashion#solution-overview"><div className="svc-num">01</div><h3>Fabric & Trim Sourcing</h3><p>Material choices documented against product, price and supplier constraints.</p></a>
              <a className="svc-card featured" href="/solutions/fashion-sampling-services#solution-overview"><span className="svc-badge">Approve first</span><div className="svc-num">02</div><h3>Sampling & Fitting</h3><p>Prototype, modesty checks and consolidated technical revisions before bulk.</p></a>
              <a className="svc-card" href="/solutions/fashion-production-management#solution-overview"><div className="svc-num">03</div><h3>Production Management</h3><p>Critical-path, supplier, approval, quality and shipment coordination.</p></a>
            </div>
          </div>
        </section>

        <section className="cta page-cta">
          <p className="s-tag">Build a Safer Production Plan</p>
          <h2 className="s-title">Tell us what is ready. <em>Show us where it is stuck.</em></h2>
          <p className="cta-sub">We will recommend the smallest useful scope, from a material or sample review to complete production support.</p>
          <div className="cta-btns"><a href="/contact#get-in-touch" className="btn btn-gold">Discuss Your Project →</a><a href="/pricing#pricing-guide" className="btn btn-outline-ivory">View Pricing Guide</a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
