import Image from "next/image";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { TALA_MAHJ_REFERENCE } from "@/data/caseStudies";
import {
  ORGANIZATION_ID,
  SITE_URL,
  absoluteUrl,
  createPageMetadata,
} from "@/lib/seo";
import styles from "./talaMahj.module.css";

const reference = TALA_MAHJ_REFERENCE;
const displayedImages = [reference.heroImage, ...reference.gallery];

export const metadata = createPageMetadata({
  title: "Tala Luxury Mahjong Textile Portfolio Reference",
  description:
    "Explore a client-approved Tala luxury mahjong textile portfolio feature with five protected, watermarked visuals and clear evidence boundaries.",
  path: reference.path,
  image: {
    url: reference.heroImage.src,
    width: reference.heroImage.width,
    height: reference.heroImage.height,
    alt: reference.heroImage.alt,
  },
});

const referenceSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}${reference.path}#webpage`,
  url: `${SITE_URL}${reference.path}`,
  name: reference.title,
  description: reference.description,
  inLanguage: "en",
  dateModified: "2026-10-29",
  isPartOf: {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/portfolio#webpage`,
    url: `${SITE_URL}/portfolio`,
    name: "Zameett Portfolio",
  },
  publisher: { "@id": ORGANIZATION_ID },
  about: {
    "@type": "Brand",
    name: reference.clientName,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: absoluteUrl(reference.heroImage.src),
    caption: reference.heroImage.caption,
    creditText: "Tala; displayed by Zameett with client permission.",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: displayedImages.length,
    itemListElement: displayedImages.map((image, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "ImageObject",
        contentUrl: absoluteUrl(image.src),
        name: image.title,
        caption: image.caption,
        creditText: "Tala; displayed by Zameett with client permission.",
      },
    })),
  },
};

export default function TalaMahjPortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: "Tala", path: reference.path },
        ]}
      />
      <JsonLd data={referenceSchema} />
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={`inner ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/portfolio">Portfolio</Link>
                <span aria-hidden="true">/</span>
                Tala
              </p>
              <p className={styles.eyebrow}>{reference.eyebrow}</p>
              <h1>
                Tala—luxury mahjong <em>textile reference.</em>
              </h1>
              <p className={styles.intro}>{reference.description}</p>
              <div className={styles.heroMeta} aria-label="Portfolio evidence">
                <span>Client permission</span>
                <span>Five approved visuals</span>
                <span>Protected imagery</span>
              </div>
              <div className={styles.heroActions}>
                <a className="btn btn-gold" href="#published-visuals">
                  View published visuals <span aria-hidden="true">↓</span>
                </a>
                <Link
                  className="btn btn-outline-ivory"
                  href="/contact?service=custom-textile-patterns#get-in-touch"
                >
                  Discuss a textile project
                </Link>
              </div>
            </div>

            <figure className={styles.heroMedia}>
              <Image
                src={reference.heroImage.src}
                alt={reference.heroImage.alt}
                width={reference.heroImage.width}
                height={reference.heroImage.height}
                sizes="(max-width: 900px) 100vw, 48vw"
                preload
                draggable={false}
              />
              <figcaption>
                <span>{reference.heroImage.title}</span>
                <strong>Client-approved display</strong>
              </figcaption>
            </figure>
          </div>
        </header>

        <section className={styles.evidenceSection} aria-labelledby="verified-evidence">
          <div className={`inner ${styles.evidenceGrid}`}>
            <div className="reveal">
              <p className="s-tag">Verified Evidence</p>
              <h2 className="s-title" id="verified-evidence">
                Clear proof, <em>careful claims.</em>
              </h2>
              <p className={styles.sectionIntro}>
                This feature records a real, permission-cleared client reference while
                keeping private commercial details out of the public page.
              </p>
            </div>
            <div className={styles.factGrid}>
              <article className="reveal">
                <span>01</span>
                <h3>Named client</h3>
                <p>
                  Tala is identified by name with client approval. Direct profile,
                  post and contact links are intentionally not published.
                </p>
              </article>
              <article className="reveal">
                <span>02</span>
                <h3>Client permission</h3>
                <p>{reference.permissionNote}</p>
              </article>
              <article className="reveal">
                <span>03</span>
                <h3>Evidence boundary</h3>
                <p>{reference.scopeNote}</p>
              </article>
            </div>
          </div>
        </section>

        <section
          className={styles.visualSection}
          id="published-visuals"
          aria-labelledby="published-visuals-heading"
        >
          <div className="inner">
            <div className={styles.sectionHeader}>
              <div>
                <p className="s-tag">Published Visual Set</p>
                <h2 className="s-title" id="published-visuals-heading">
                  Pattern direction <em>in use.</em>
                </h2>
              </div>
              <p>
                Only lower-resolution, permanently watermarked web derivatives are
                stored on Zameett. Original files are not offered for download.
              </p>
            </div>

            <div className={styles.visualGrid}>
              {reference.gallery.map((image) => (
                <figure className={styles.visualCard} key={image.src}>
                  <div className={styles.visualImage}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 700px) 100vw, 42vw"
                      draggable={false}
                    />
                  </div>
                  <figcaption>
                    <span>{image.publishedDate}</span>
                    <h3>{image.title}</h3>
                    <p>{image.caption}</p>
                    <strong className={styles.displayNote}>
                      Client-approved portfolio display
                    </strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sourcesSection} aria-labelledby="portfolio-record-heading">
          <div className="inner">
            <div className={styles.sectionHeader}>
              <div>
                <p className="s-tag">Portfolio Record</p>
                <h2 className="s-title" id="portfolio-record-heading">
                  Client proof, <em>protected carefully.</em>
                </h2>
              </div>
              <p>
                The visual evidence remains inspectable on this page while direct client
                contact routes and private commercial details stay unpublished.
              </p>
            </div>
            <div className={styles.sourceGrid}>
              <article>
                <span>Permission</span>
                <h3>Client-approved display</h3>
                <p>
                  Zameett recorded the client&apos;s approval to include this named
                  project reference in the portfolio.
                </p>
              </article>
              <article>
                <span>Evidence</span>
                <h3>Five supplied visuals</h3>
                <p>
                  All five supplied visual references are represented as protected,
                  permanently watermarked web derivatives.
                </p>
              </article>
              <article>
                <span>Protection</span>
                <h3>Direct links withheld</h3>
                <p>
                  Client account, post and contact links are intentionally omitted
                  while the Tala name remains visible as approved proof.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.nextSection} aria-labelledby="related-textile-support">
          <div className={`inner ${styles.nextGrid}`}>
            <div>
              <p className="s-tag">Relevant Zameett Support</p>
              <h2 className="s-title" id="related-textile-support">
                Building a print-led <em>product collection?</em>
              </h2>
              <p className={styles.nextCopy}>
                Explore Zameett&apos;s current textile artwork scope, production-preparation
                guidance and project process. These links describe Zameett&apos;s published
                services; they do not expand the private Tala project scope.
              </p>
              <div className={styles.nextActions}>
                <Link className="btn btn-burg" href="/services/custom-textile-patterns">
                  Explore textile print design
                </Link>
                <Link
                  className="btn btn-outline"
                  href="/contact?service=custom-textile-patterns#get-in-touch"
                >
                  Send your brief
                </Link>
              </div>
            </div>
            <nav className={styles.resourceLinks} aria-label="Related textile resources">
              <Link href="/blog/seamless-repeat-pattern">
                <span>Guide</span>
                <strong>How seamless repeat patterns work</strong>
                <b aria-hidden="true">→</b>
              </Link>
              <Link href="/blog/prepare-textile-print-for-production">
                <span>Production guide</span>
                <strong>Prepare textile artwork for fabric production</strong>
                <b aria-hidden="true">→</b>
              </Link>
              <Link href="/how-it-works">
                <span>Process</span>
                <strong>Review the Zameett development workflow</strong>
                <b aria-hidden="true">→</b>
              </Link>
              <Link href="/portfolio">
                <span>Portfolio</span>
                <strong>Return to all selected development work</strong>
                <b aria-hidden="true">→</b>
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
