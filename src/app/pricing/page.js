import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import PricingExplorer from "@/components/PricingExplorer";
import {
  IMPORTANT_INFORMATION,
  OPTIONAL_ADDONS,
  PACKAGE_CATEGORIES,
  PRICING_FAQS,
  PRICING_PACKAGES,
  PRODUCTION_QUOTE_SERVICES,
  getPackagesByCategory,
  getPricingPackage,
} from "@/data/pricing";
import styles from "./pricing.module.css";

const siteUrl = "https://zameett.com";

export const metadata = {
  title: "Fashion Design & Tech Pack Pricing",
  description:
    "Compare Zameett fashion design, professional tech-pack and custom textile-print packages. Sampling and modest-wear manufacturing are quoted per project.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Fashion Design & Tech Pack Pricing | Zameett",
    description:
      "Fixed-scope design packages from $60 USD, with transparent deliverables, revisions, exclusions and project-specific production quotes.",
    url: "/pricing",
    images: [{ url: "/services/abaya-1.jpeg", width: 1600, height: 1132, alt: "Zameett fashion design and product-development pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Design & Tech Pack Pricing | Zameett",
    description: "Compare fixed-scope fashion design, tech-pack and textile-print packages.",
    images: ["/services/abaya-1.jpeg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: siteUrl + "/pricing" },
  ],
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Zameett fashion design and technical-development packages",
  description:
    "Fixed-scope fashion design, production-ready tech-pack and custom textile-print services for fashion brands worldwide.",
  provider: { "@type": "Organization", name: "Zameett", url: siteUrl },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Zameett fixed-scope development packages",
    itemListElement: PRICING_PACKAGES.map((pricingPackage) => ({
      "@type": "Offer",
      price: pricingPackage.price,
      priceCurrency: "USD",
      url: siteUrl + "/contact?package=" + pricingPackage.contactParam,
      itemOffered: {
        "@type": "Service",
        name: pricingPackage.name,
        description: pricingPackage.subtitle,
      },
    })),
  },
};

const comparisonRows = [
  {
    label: "Published packages",
    values: PACKAGE_CATEGORIES.map((category) =>
      getPackagesByCategory(category.id).map((item) => item.name).join(" · "),
    ),
  },
  {
    label: "Starting prices",
    values: PACKAGE_CATEGORIES.map((category) =>
      getPackagesByCategory(category.id).map((item) => "$" + item.price).join(" · "),
    ),
  },
  {
    label: "Core output",
    values: [
      "Original garment design plus an individual professional tech pack",
      "Garment design, individual tech pack and original textile artwork",
      "Original seamless-repeat or placement textile artwork",
    ],
  },
  {
    label: "Physical production",
    values: [
      "Quoted separately",
      "Quoted separately",
      "Physical printing and testing quoted separately",
    ],
  },
];

const PREMIUM_PRINTED_PACKAGE = getPricingPackage("design-techpack-print-premium-collection");

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, pricingSchema]} />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span>Pricing</span>
            </nav>
            <p className={styles.heroEyebrow}>Transparent Service Pricing</p>
            <h1>Choose the right scope. <em>See exactly what you receive.</em></h1>
            <p className={styles.heroLead}>
              Compare fashion design, professional tech-pack and textile-print packages without
              the guesswork. Every enquiry is reviewed before payment so the scope fits your project.
            </p>
            <div className={styles.heroActions}>
              <a href="#packages">Compare packages <span aria-hidden="true">↓</span></a>
              <a href="/contact#get-in-touch">Help me choose</a>
            </div>
            <ul className={styles.trustList}>
              <li>Prices in USD</li>
              <li>Scope confirmed first</li>
              <li>Editable files where stated</li>
              <li>No payment at enquiry</li>
            </ul>
          </div>

          <aside className={styles.heroAside} aria-label="Recommended package">
            <div className={styles.heroAsideTop}>
              <span>Recommended</span>
              <small>Most complete creative scope</small>
            </div>
            <div className={styles.heroPrice}>
              <p>{PREMIUM_PRINTED_PACKAGE.name}</p>
              <div><strong>{"$"}{PREMIUM_PRINTED_PACKAGE.price.toLocaleString("en-US")}</strong><small>USD</small></div>
            </div>
            <div className={styles.heroMetrics}>
              <div><strong>{PREMIUM_PRINTED_PACKAGE.collectionSize}</strong><span>Designs</span></div>
              <div><strong>{PREMIUM_PRINTED_PACKAGE.collectionSize}</strong><span>Tech packs</span></div>
              <div><strong>{PREMIUM_PRINTED_PACKAGE.collectionSize}</strong><span>Prints</span></div>
            </div>
            <p className={styles.heroAsideNote}>
              A coordinated premium route for a seven-style printed collection. Package fit is
              confirmed before payment.
            </p>
            <div className={styles.heroAsideActions}>
              <a href="#package-design-techpack-print-premium-collection">View recommended package <span aria-hidden="true">→</span></a>
              <a href="/contact#get-in-touch">Ask for guidance</a>
            </div>
          </aside>
        </div>
      </header>

      <section className={styles.valueRail} aria-label="How Zameett pricing works">
        <div className={styles.sectionInner}>
          <div className="reveal" style={{ "--reveal-delay": "0ms" }}><span>01</span><p><strong>Choose a route</strong>Design, garment plus print, or artwork only.</p></div>
          <div className="reveal" style={{ "--reveal-delay": "55ms" }}><span>02</span><p><strong>Compare the level</strong>See price, delivery, revisions and outputs.</p></div>
          <div className="reveal" style={{ "--reveal-delay": "110ms" }}><span>03</span><p><strong>Send your brief</strong>Your package carries into the enquiry form.</p></div>
          <div className="reveal" style={{ "--reveal-delay": "165ms" }}><span>04</span><p><strong>We confirm fit</strong>No payment until the scope is reviewed.</p></div>
        </div>
      </section>

      <main>
        <PricingExplorer />

        <section className={styles.comparisonSection} aria-labelledby="comparison-title">
          <div className={styles.sectionInner}>
            <header className={styles.comparisonHeader + " reveal"}>
              <div><p className={styles.eyebrow}>At A Glance</p><h2 id="comparison-title">Compare the three service routes.</h2></div>
              <p>Use this overview when you know the output you need but are still deciding which route fits.</p>
            </header>
            <div className={styles.tableWrap + " reveal"} tabIndex="0">
              <table className={styles.comparisonTable}>
                <caption>Package-family comparison. Scroll horizontally on smaller screens.</caption>
                <thead>
                  <tr><th scope="col">Compare</th>{PACKAGE_CATEGORIES.map((category) => <th scope="col" key={category.id}>{category.label}</th>)}</tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => <td key={row.label + "-" + PACKAGE_CATEGORIES[index].id}>{value}</td>)}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Next step</th>
                    {PACKAGE_CATEGORIES.map((category) => <td key={category.id}><a href={"#pricing-tab-" + category.id}>Review this route</a></td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.productionSection} aria-labelledby="production-title">
          <div className={styles.sectionInner + " " + styles.productionLayout}>
            <div className={styles.productionCopy + " reveal"}>
              <p className={styles.eyebrow}>Project-Specific Quotes</p>
              <h2 id="production-title">Sampling and production need a real product review.</h2>
              <p>MOQ, sample route, materials, unit cost, quality checkpoints and delivery options are confirmed according to the garment and destination.</p>
              <a className={styles.sectionCta} href="/contact?package=production-review#get-in-touch">Request a production review <span aria-hidden="true">→</span></a>
            </div>
            <ol className={styles.productionServices}>
              {PRODUCTION_QUOTE_SERVICES.map((service, index) => (
                <li className="reveal" style={{ "--reveal-delay": (index % 2) * 60 + "ms" }} key={service.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span><div><h3>{service.title}</h3><p>{service.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.addonsSection} aria-labelledby="addons-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading + " reveal"}>
              <div><p className={styles.eyebrow}>Optional Add-ons</p><h2 id="addons-title">Extend only what your project needs.</h2></div>
              <p>Add-ons are quoted after review because complexity and quantity vary. Nothing is added without approval.</p>
            </div>
            <div className={styles.addonGrid}>
              {OPTIONAL_ADDONS.map((item, index) => (
                <article className={styles.addonCard + " reveal"} style={{ "--reveal-delay": (index % 3) * 45 + "ms" }} key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{item}</h3><a className={styles.addonLink} href="/contact?package=production-review#get-in-touch">Request quote →</a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.informationSection} aria-labelledby="important-title">
          <div className={styles.sectionInner + " " + styles.informationLayout}>
            <div className={styles.informationIntro + " reveal"}>
              <p className={styles.eyebrow}>Important Information</p>
              <h2 id="important-title">Clear terms before work begins.</h2>
              <p>Review the practical details behind every package. Your written proposal confirms the final scope, formats, payment schedule and timing.</p>
            </div>
            <details className={styles.informationDisclosure + " reveal"}>
              <summary><span>Review package terms</span><strong>{IMPORTANT_INFORMATION.length} essential points</strong><i aria-hidden="true">+</i></summary>
              <ul className={styles.informationList}>{IMPORTANT_INFORMATION.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="pricing-faq-title">
          <div className={styles.sectionInner + " " + styles.faqLayout}>
            <div className={styles.faqIntro + " reveal"}>
              <p className={styles.eyebrow}>Pricing FAQ</p>
              <h2 id="pricing-faq-title">Questions to settle before you choose.</h2>
              <p>For a project-specific answer, send the brief and references you currently have.</p>
            </div>
            <div className={styles.faqList}>
              {PRICING_FAQS.map((item) => (
                <details className={styles.faqItem + " reveal"} key={item.question}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.sectionInner + " reveal"}>
            <p className={styles.eyebrow}>Ready When You Are</p>
            <h2>Choose a package or let us recommend the right route.</h2>
            <p>Send what you know now. We aim to respond within one business day with the questions needed to confirm scope.</p>
            <div className={styles.finalActions}>
              <a className={styles.sectionCta} href="/contact#get-in-touch">Start your project <span aria-hidden="true">→</span></a>
              <a className={styles.sectionCta + " " + styles.secondaryCta} href="/services">Explore services</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}