import Link from "next/link";
import styles from "./FashionBriefChecklistPromo.module.css";

const checklistSections = [
  ["01", "Collection", "Product types and style count"],
  ["02", "Product", "Design, fit and construction direction"],
  ["03", "Materials", "Fabric, trims and finish decisions"],
  ["04", "Commercial", "Quantity, destination and target timing"],
];

export default function FashionBriefChecklistPromo() {
  return (
    <section className={styles.promo} aria-labelledby="fashion-brief-checklist-promo-title">
      <div className={`inner ${styles.layout}`}>
        <div className={`${styles.copy} reveal`}>
          <p className={styles.eyebrow}>Free fashion-development resource</p>
          <h2 id="fashion-brief-checklist-promo-title">
            Turn scattered ideas into a <em>clearer project brief.</em>
          </h2>
          <p>
            Use Zameett&apos;s free checklist to organise your garment direction, references,
            materials, quantities and approval requirements before requesting design, tech-pack,
            sampling or modest-wear production support.
          </p>
          <div className={styles.actions}>
            <Link href="/resources/fashion-development-brief-checklist">
              Use the free checklist <span aria-hidden="true">&rarr;</span>
            </Link>
            <a href="/resources/fashion-development-brief-checklist.pdf" download>
              Download PDF <span aria-hidden="true">&darr;</span>
            </a>
          </div>
          <small>No sign-up required. Complete only what you know; missing details can be reviewed during scope confirmation.</small>
        </div>

        <div className={`${styles.preview} reveal`} style={{ "--reveal-delay": "90ms" }} role="img" aria-label="Checklist contents preview">
          <div className={styles.previewTop}>
            <span>Zameett project resource</span>
            <strong>Brief Checklist</strong>
          </div>
          <div className={styles.previewBody}>
            {checklistSections.map(([number, title, detail]) => (
              <div className={styles.previewRow} key={title}>
                <span>{number}</span>
                <div><strong>{title}</strong><small>{detail}</small></div>
                <i aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className={styles.previewFoot}><span>PDF · 2 pages</span><span>Free download</span></div>
        </div>
      </div>
    </section>
  );
}
