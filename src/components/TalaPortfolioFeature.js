import Image from "next/image";
import Link from "next/link";
import { TALA_MAHJ_REFERENCE } from "@/data/caseStudies";
import styles from "./TalaPortfolioFeature.module.css";

export default function TalaPortfolioFeature() {
  const reference = TALA_MAHJ_REFERENCE;

  return (
    <section className={styles.section} aria-labelledby="tala-portfolio-feature">
      <div className={`inner ${styles.inner}`}>
        <div className={styles.media}>
          <Image
            src={reference.heroImage.src}
            alt={reference.heroImage.alt}
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            draggable={false}
          />
          <span className={styles.badge}>Client-approved reference</span>
        </div>
        <div className={styles.copy}>
          <p className="s-tag">{reference.eyebrow}</p>
          <h2 id="tala-portfolio-feature">
            Tala <em>luxury mahjong textiles.</em>
          </h2>
          <p className={styles.description}>{reference.description}</p>
          <dl className={styles.proof}>
            <div>
              <dt>Permission</dt>
              <dd>Confirmed for portfolio display</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>Traceable public source links</dd>
            </div>
            <div>
              <dt>Protection</dt>
              <dd>Permanent watermarked derivatives</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Link className="btn btn-gold" href={reference.path}>
              View the portfolio feature <span aria-hidden="true">→</span>
            </Link>
            <a
              className={styles.sourceLink}
              href={reference.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View public source <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
