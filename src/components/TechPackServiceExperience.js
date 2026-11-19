import Link from "next/link";
import styles from "./TechPackServiceExperience.module.css";

const inputs = [
  "A sketch or reference images",
  "Brand, customer and product direction",
  "Known measurements, artwork or supplier notes",
];

const deliverables = [
  ["01", "Technical flats", "Clear front, back and required detail views that describe the garment without relying on illustration alone."],
  ["02", "Construction notes", "Seams, stitching, finishes, closures and important assembly details documented for the agreed product."],
  ["03", "Bill of materials", "Fabric, lining, trims, labels, hardware and relevant supplier references organised in one specification."],
  ["04", "Measurement specification", "Points of measurement and sizing information prepared within the scope confirmed for your project."],
  ["05", "Artwork placement", "Print, embroidery, logo and embellishment position, scale and colour direction where required."],
  ["06", "Handover files", "Final PDF plus editable source files where stated in the selected package and written scope."],
];

const steps = [
  ["01", "Brief review", "We check the garment, references, intended customer and the information already available."],
  ["02", "Scope confirmation", "Pages, formats, delivery estimate, revision rounds and exclusions are confirmed before payment."],
  ["03", "Design and documentation", "The approved direction is developed into technical drawings and an organised specification."],
  ["04", "Review and handover", "Consolidated feedback is applied, final files are checked and the approved package is delivered."],
];

export const TECH_PACK_FAQS = [
  {
    question: "What can a Zameett fashion tech pack include?",
    answer: "A scoped pack can include technical flats, construction call-outs, a bill of materials, measurements and points of measure, colourways, artwork placement, labels, packaging notes and revision control. The exact pages and file formats are confirmed for the garment before payment.",
  },
  {
    question: "Can a UK clothing brand use the files with its own manufacturer?",
    answer: "Yes. Zameett is Pakistan-based and works remotely with UK and international brands. The approved files can be handed to a nominated UK or overseas manufacturer, but any supplier-specific template, measurement method or export requirement should be shared before final delivery.",
  },
  {
    question: "What should I send before requesting a tech-pack quotation?",
    answer: "Share the garment category, sketches or references, intended customer, size range, known materials, artwork, branding, target market and any supplier requirements. Missing decisions can be identified during the brief review instead of being guessed.",
  },
  {
    question: "Does a tech-pack package include sampling or manufacturing?",
    answer: "Not unless those stages are explicitly included in a written proposal. Physical sampling, pattern development, grading, sourcing and manufacturing are separate services and decisions.",
  },
  {
    question: "Does Zameett sell sewing patterns or grading as standalone services?",
    answer: "No. Zameett does not advertise sewing-pattern development or grading as standalone services. Where they are relevant to a wider approved development route, responsibilities and deliverables must be confirmed in writing.",
  },
  {
    question: "How are revisions and final file formats handled?",
    answer: "The proposal states the included revision rounds, feedback route, final PDF and any editable source files. Consolidated feedback is applied against the current version so the handover does not mix superseded instructions.",
  },
];

export default function TechPackServiceExperience() {
  return (
    <section className={styles.experience} aria-labelledby="tech-pack-service-experience-title">
      <div className={`${styles.intro} reveal`}>
        <div>
          <p className={styles.eyebrow}>From idea to a clearer factory conversation</p>
          <h2 id="tech-pack-service-experience-title">Know exactly what this service does.</h2>
        </div>
        <p>
          Zameett turns an approved garment direction into structured technical documentation for sampling,
          supplier quotation and production planning. The exact pages are matched to your product instead of
          forcing every garment into the same template.
        </p>
      </div>

      <div className={styles.exchange}>
        <article className={`${styles.briefCard} reveal`}>
          <span className={styles.cardLabel}>You can start with</span>
          <h3>You do not need a finished tech pack to begin.</h3>
          <ul>{inputs.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>Missing information is identified during the brief review before the scope is confirmed.</p>
          <Link href="/contact?service=fashion-tech-packs#get-in-touch">
            Send your brief <span aria-hidden="true">&rarr;</span>
          </Link>
        </article>

        <div className={styles.deliverableGrid} aria-label="Typical fashion tech pack deliverables">
          {deliverables.map(([number, title, description], index) => (
            <article className={`${styles.deliverableCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={`${styles.scopeNote} reveal`}>
        <strong>A clear boundary protects your project.</strong>
        <p>
          Sewing-pattern development, grading, physical samples and manufacturing are separate unless they are
          specifically included in a written Zameett proposal. For an abaya-specific completed pack, review the
          {" "}<Link href="/solutions/abaya-tech-pack-designer">abaya tech-pack design service</Link>. For a reusable
          internal framework instead, review the {" "}
          <Link href="/solutions/editable-fashion-tech-pack-template">custom editable template service</Link>.
        </p>
        <p>
          For a UK or international supplier handover, share the nominated manufacturer&apos;s current template,
          measurement method and file requirements before final export. The completed pack documents the approved
          product; the receiving supplier remains responsible for confirming its own capability and quotation.
        </p>
      </div>

      <div className={styles.process}>
        <div className={`${styles.processHeading} reveal`}>
          <p className={styles.eyebrow}>A controlled four-step workflow</p>
          <h2>Simple for the client. Structured for production.</h2>
        </div>
        <div className={styles.processGrid}>
          {steps.map(([number, title, description], index) => (
            <article className={`${styles.processCard} reveal`} style={{ "--reveal-delay": `${index * 65}ms` }} key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
