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
          specifically included in a written Zameett proposal.
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
