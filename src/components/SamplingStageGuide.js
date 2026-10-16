import Link from "next/link";
import styles from "./SamplingStageGuide.module.css";

const stages = [
  ["01", "Prototype sample", "Tests the first physical interpretation of the silhouette and construction. Any substitute fabric, trim or unresolved detail is recorded so the sample is not approved for a purpose it cannot prove."],
  ["02", "Fit sample", "Reviews the agreed size against measurements, balance, ease and movement. For modest garments, the check can also cover length, sleeve reach, openings, layering and coverage."],
  ["03", "Size-set review", "Checks selected sizes and proportions where this stage is included. The reviewed sizes, reference chart and unresolved points are named; grading is not advertised as a standalone service."],
  ["04", "Pre-production sample", "Where required, confirms the agreed construction, materials, trims, branding and finish before a separate written bulk-production decision."],
];

const approvalChecks = [
  ["Measure", "Record points of measure, tolerance basis and the conditions used for the review."],
  ["Move", "Check reach, sitting, walking, coverage, closures and layering for the intended wearer."],
  ["Inspect", "Compare fabric, lining, trims, construction, finish and embellishment with approved references."],
  ["Decide", "Approve only the named stage or issue one consolidated correction record for the next round."],
];

export default function SamplingStageGuide() {
  return (
    <section className={styles.section} id="sampling-stages" aria-labelledby="sampling-stages-title">
      <div className="inner">
        <div className={`${styles.heading} reveal`}>
          <div>
            <p className={styles.eyebrow}>Choose the sample by its purpose</p>
            <h2 id="sampling-stages-title">Each stage should answer a different question.</h2>
          </div>
          <p>Sample terminology can vary between suppliers. Zameett defines the intended purpose, material status, checks and approval route in the written scope before payment.</p>
        </div>

        <div className={styles.stageGrid}>
          {stages.map(([number, title, description], index) => (
            <article className={`${styles.stageCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={`${styles.approval} reveal`}>
          <div className={styles.approvalIntro}>
            <p className={styles.eyebrow}>One controlled review record</p>
            <h2>Measure, move, inspect and decide.</h2>
            <p>A physical sample is useful when comments are tied to the current file version, sample stage and approved reference—not scattered across separate messages.</p>
          </div>
          <div className={styles.checkGrid}>
            {approvalChecks.map(([title, description]) => (
              <div key={title}><strong>{title}</strong><p>{description}</p></div>
            ))}
          </div>
          <div className={styles.actions}>
            <Link href="/blog/types-of-garment-samples">Compare garment sample types</Link>
            <Link href="/services/fashion-tech-packs">Prepare the technical brief</Link>
            <Link href="/contact?service=fashion-sampling-services#get-in-touch">Request a sampling review <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
