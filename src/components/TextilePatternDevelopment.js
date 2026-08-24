import Link from "next/link";
import styles from "./ModestWearDevelopment.module.css";

const categories = [
  ["01", "Seamless repeats", "Continuous artwork for printed yardage, developed with a controlled repeat tile, physical scale and garment use in mind."],
  ["02", "Placement prints", "Artwork positioned for a defined front, back, sleeve, border or other garment panel, with dimensions agreed for the intended product."],
  ["03", "Scarves & accessories", "Square, rectangular or border-led compositions for scarves and coordinated fashion accessories, reviewed at their intended proportions."],
  ["04", "Collection colourways", "Approved palette variations and coordinated print directions for capsules that need a consistent visual language across products."],
];

const deliverables = [
  "Original motif and composition development",
  "Seamless repeat tile or defined placement artwork",
  "Agreed physical scale and artwork dimensions",
  "Approved colour references and scoped colourways",
  "Production preview or placement reference",
  "Final export files in the agreed supplier format",
  "Layered source files where named in the proposal",
  "Revision and final-approval record",
];

const process = [
  ["01", "Brief & print route", "We review the product, brand direction, references, fabric, print method, target scale, colour needs and supplier requirements. A seamless repeat or placement route is then confirmed."],
  ["02", "Concept direction", "The written scope defines concept count, complexity, colourways, revision rounds, delivery schedule, source files and exclusions before payment."],
  ["03", "Develop & review", "Motifs, composition, repeat or placement and colour are developed against the approved direction. Feedback is supplied as consolidated revision rounds."],
  ["04", "Prepare handoff", "After artwork approval, scale, repeat or placement references and agreed files are prepared for the selected workflow. The printer remains responsible for strike-off and production validation."],
];

export const TEXTILE_PATTERN_FAQS = [
  { question: "What types of textile artwork can Zameett create?", answer: "Projects can include seamless repeat patterns, placement or engineered artwork for defined garment panels, scarf and border compositions, and approved colourway variations. The appropriate route is confirmed from the intended product and print workflow." },
  { question: "Which fashion products are suitable for this service?", answer: "The service can support printed abayas, dresses, kaftans, shirts, coordinates, scarves, accessories and other apparel products. Garment construction and tech-pack development are separate unless they are explicitly included in a combined scope." },
  { question: "What do I need to provide before the project starts?", answer: "Share your brand direction, product category, references, intended fabric, print method if known, target colours, physical dimensions or scale, required colourways and the printer's file specification when available. Missing production decisions are identified during scope review." },
  { question: "How long does custom textile pattern design take?", answer: "Published package schedules apply to standard-complexity artwork after a complete brief and written scope are approved. Collections, intricate motifs, additional colourways, supplier changes or incomplete production information require a project-specific schedule." },
  { question: "Are fabric printing and strike-offs included?", answer: "No. The listed artwork packages do not include physical fabric printing, strike-offs, laboratory testing, garment sampling, manufacturing or shipping. These are separate supplier or production stages unless a written proposal explicitly says otherwise." },
  { question: "Will the colours look identical on fabric?", answer: "Digital colour references do not guarantee an identical physical result. Fabric composition, pretreatment, ink, print method, finishing and the supplier's colour workflow all affect output. A physical strike-off should be approved before production." },
  { question: "Do I receive editable source files?", answer: "Layered or editable source files are supplied only when they are named in the written proposal. Final file format, colour setup, resolution and repeat or placement structure are confirmed for the intended handoff before payment." },
];

export default function TextilePatternDevelopment() {
  return (
    <section className={styles.section} id="textile-pattern-development" aria-labelledby="textile-pattern-development-title">
      <div className="inner">
        <div className={`${styles.heading} reveal`}>
          <div><p className={styles.eyebrow}>Artwork built for a real product</p><h2 id="textile-pattern-development-title">Choose the right print structure before drawing begins.</h2></div>
          <p>A strong textile concept must also work at physical scale, repeat cleanly or sit correctly on a garment panel, and move into the selected supplier workflow without avoidable ambiguity.</p>
        </div>

        <div className={styles.categoryGrid}>
          {categories.map(([number, title, description], index) => <article className={`${styles.categoryCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>

        <div className={`${styles.scopePanel} reveal`}>
          <div><p className={styles.eyebrow}>Possible artwork deliverables</p><h2>Defined for the repeat, placement and supplier handoff.</h2><p>Only deliverables stated in the written proposal are included. Garment design, tech packs, physical printing, strike-offs, sampling and manufacturing remain separate unless explicitly quoted.</p></div>
          <ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>

        <div className={styles.process} id="textile-design-process">
          <div className={`${styles.processHeading} reveal`}><p className={styles.eyebrow}>Four-step process</p><h2>Brief, direct, refine, then prepare the files.</h2></div>
          <div className={styles.processGrid}>{process.map(([number, title, description], index) => <article className={`${styles.processCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>

        <div className={`${styles.quote} reveal`}>
          <div><span>Published packages or custom quotation</span><h2>Complexity and handoff requirements define the scope.</h2></div>
          <div><p>Use a published package for standard-complexity artwork with a complete brief. For a coordinated collection, complex engineered placement, extra colourways or unusual supplier requirements, request a tailored review before payment.</p><div><Link href="/pricing#pricing-tab-custom-print">Review textile pricing</Link><Link href="/portfolio">View selected work</Link><Link href="/contact?service=custom-textile-patterns#get-in-touch">Request an artwork review <span aria-hidden="true">&rarr;</span></Link></div></div>
        </div>
      </div>
    </section>
  );
}
