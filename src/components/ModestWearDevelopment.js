import Link from "next/link";
import styles from "./ModestWearDevelopment.module.css";

const categories = [
  ["01", "Abayas", "Open and closed abayas, everyday styles, occasion pieces and embellished designs with controlled length, drape and coverage."],
  ["02", "Kaftans & modest dresses", "Fluid, structured, layered or occasion silhouettes developed around movement, opacity, construction and finish."],
  ["03", "Scarves & layering pieces", "Coordinated scarves, capes, kimono layers and modest separates reviewed as products or within a collection."],
  ["04", "Private-label collections", "Original or adapted modest-wear capsules with labels, trims, packaging and colourways scoped for the intended market."],
];

const deliverables = [
  "Design direction, technical flats or tech packs where scoped",
  "Fabric, trim, colour and embellishment review",
  "Supplier-ready development information",
  "Prototype or pre-production sample route",
  "Consolidated fit, construction and finish comments",
  "Approved product references and production checkpoints",
  "Project-specific MOQ, quotation and schedule",
  "Packing, dispatch and destination assumptions where relevant",
];

const process = [
  ["01", "Brief & feasibility", "We review styles, quantities, target market, price position, references and required services. Missing decisions and capability constraints are identified before scope."],
  ["02", "Development plan", "The proposal defines deliverables, materials route, sample stages, revision limits, dependencies, quotation basis and a project-specific timeline before payment."],
  ["03", "Sample & approve", "The product is developed against the agreed documents. Fit, coverage, drape, construction and finish feedback is consolidated before written approval."],
  ["04", "Production control", "When manufacturing is included, MOQ and bulk terms are confirmed for the approved product, followed by agreed quality, packing and dispatch checkpoints."],
];

export const MODEST_WEAR_FAQS = [
  { question: "What does modest wear product development include?", answer: "The scope can include design refinement, technical flats or tech packs, textile artwork, material and trim sourcing, sampling, written sample corrections and production coordination. The exact deliverables and exclusions are confirmed in the proposal before payment." },
  { question: "Which garments are suitable for this service?", answer: "Zameett's physical-development specialisation is mainly abayas, kaftans, modest dresses, scarves, layering pieces and coordinated modest-wear collections. Other garments can be reviewed, while design and technical-development services remain available across apparel categories." },
  { question: "What is the manufacturing MOQ?", answer: "MOQ is project-specific. It depends on the garment, fabric, colour split, embellishment, trims, labels, packaging and supplier requirements. A workable quantity is confirmed only after the product and sourcing route have been reviewed." },
  { question: "How long does development and manufacturing take?", answer: "There is no single timeline for every project. Timing depends on design readiness, number of styles, material availability, sample rounds, approvals, embellishment, production capacity and delivery destination. The proposal sets out the expected stages and dependencies for the actual brief." },
  { question: "Can I request development without manufacturing?", answer: "Yes. Design, technical-development and textile-design services can be scoped separately. Sampling and manufacturing are quoted only where requested and suitable for the reviewed project." },
  { question: "What do you need to prepare a quotation?", answer: "Share the garment categories, number of styles, reference images or technical files, intended quantities, size and colour split, fabric preferences, embellishment, labels, packaging, target timing and delivery country. If information is missing, Zameett will identify what must be decided before a reliable scope is issued." },
];

export default function ModestWearDevelopment() {
  return (
    <section className={styles.section} id="modest-wear-development" aria-labelledby="modest-wear-development-title">
      <div className="inner">
        <div className={`${styles.heading} reveal`}>
          <div><p className={styles.eyebrow}>From concept to approved product</p><h2 id="modest-wear-development-title">A controlled route for developing modest wear.</h2></div>
          <p>Use one stage or build a connected route from design through sampling and production. Each project is scoped around what is ready, what still needs development and which approvals protect the final garment.</p>
        </div>

        <div className={styles.categoryGrid}>
          {categories.map(([number, title, description], index) => <article className={`${styles.categoryCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>

        <div className={`${styles.scopePanel} reveal`}>
          <div><p className={styles.eyebrow}>Possible project deliverables</p><h2>Defined around the product—not a generic package.</h2><p>Only the deliverables named in your written proposal are included. Physical sampling, manufacturing, material purchasing, freight and duties are separate unless explicitly quoted.</p></div>
          <ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>

        <div className={styles.process} id="development-process">
          <div className={`${styles.processHeading} reveal`}><p className={styles.eyebrow}>Four-step process</p><h2>Decide, develop, approve, then produce.</h2></div>
          <div className={styles.processGrid}>{process.map(([number, title, description], index) => <article className={`${styles.processCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>

        <div className={`${styles.quote} reveal`}>
          <div><span>Project-specific quotation</span><h2>Your timeline and MOQ follow the approved scope.</h2></div>
          <div><p>Send your styles, intended quantities, size and colour split, materials, embellishment, packaging, target date and destination. We will review feasibility and confirm the scope before payment.</p><div><Link href="/services/fashion-tech-packs">Explore technical development</Link><Link href="/solutions/fashion-sampling-services">Explore sampling support</Link><Link href="/pricing">Review design pricing</Link><Link href="/portfolio">View selected work</Link><Link href="/contact?service=clothing-manufacturing#get-in-touch">Request a project review <span aria-hidden="true">&rarr;</span></Link></div></div>
        </div>
      </div>
    </section>
  );
}
