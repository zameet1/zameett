import Link from "next/link";
import styles from "./AbayaTechPackAuthority.module.css";

const decisions = [
  ["01", "Length and proportion", "Garment length, hem shape, ease and overall proportion are documented around the intended silhouette and size scope."],
  ["02", "Openings and closures", "Open or closed fronts, plackets, snaps, zips, ties and overlap are clarified instead of left to supplier interpretation."],
  ["03", "Sleeves and movement", "Sleeve shape, cuff construction, reach and layering requirements are called out where they affect fit and coverage."],
  ["04", "Fabric and drape", "Main fabric, lining and interfacing decisions are recorded with the weight, opacity and drape direction required for development."],
  ["05", "Embellishment placement", "Embroidery, beadwork, crystals, trims and prints are positioned with scale, artwork and application notes where scoped."],
  ["06", "Measurement control", "Points of measurement and technical sizing information create a traceable reference for sampling and supplier questions."],
];

const guides = [
  ["Build the right document", "How to Create a Tech Pack for Abayas", "/blog/how-to-create-a-tech-pack-for-abayas"],
  ["Understand the complete structure", "What Is a Fashion Tech Pack?", "/blog/what-is-a-tech-pack"],
  ["Review a production-ready layout", "Tech Pack Example Guide", "/blog/tech-pack-example"],
  ["Control every material", "Bill of Materials in Fashion", "/blog/bill-of-materials-fashion"],
];

export default function AbayaTechPackAuthority() {
  return (
    <section className={styles.section} id="abaya-tech-pack-specialist" aria-labelledby="abaya-tech-pack-specialist-title">
      <div className="inner">
        <div className={`${styles.heading} reveal`}>
          <div>
            <p className={styles.eyebrow}>Specialist abaya technical development</p>
            <h2 id="abaya-tech-pack-specialist-title">The details your manufacturer should not have to guess.</h2>
          </div>
          <p>
            An abaya tech pack needs more than a front and back drawing. It should communicate the decisions that
            control coverage, movement, drape, opening construction and decorative placement for the approved style.
          </p>
        </div>

        <div className={styles.decisionGrid}>
          {decisions.map(([number, title, description], index) => (
            <article className={`${styles.decisionCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className={`${styles.handoff} reveal`}>
          <div>
            <span>Clear output</span>
            <h2>One controlled reference for quotation, sampling and revision.</h2>
          </div>
          <div className={styles.handoffCopy}>
            <p>
              The final scope confirms the included pages, source files, measurement information, colourways,
              revision rounds and delivery estimate before payment.
            </p>
            <div>
              <Link href="/pricing#package-design-techpack-starter">Compare packages from $95</Link>
              <Link href="/contact?service=abaya-tech-pack-designer#get-in-touch">Send your abaya brief <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
        </div>

        <div className={styles.guides} aria-labelledby="abaya-tech-pack-guides-title">
          <div className={`${styles.guidesHeading} reveal`}>
            <p className={styles.eyebrow}>Research before you brief</p>
            <h2 id="abaya-tech-pack-guides-title">Useful technical guides.</h2>
          </div>
          <div className={styles.guideGrid}>
            {guides.map(([label, title, href], index) => (
              <Link className={`${styles.guideCard} reveal`} style={{ "--reveal-delay": `${index * 55}ms` }} href={href} key={href}>
                <span>{label}</span>
                <h3>{title}</h3>
                <b>Read guide <i aria-hidden="true">&rarr;</i></b>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
