import Link from "next/link";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import TrackedDownloadLink from "@/components/TrackedDownloadLink";
import { ORGANIZATION_ID, WEBSITE_ID, absoluteUrl, createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

const pagePath = "/resources/fashion-development-brief-checklist";
const pdfPath = "/resources/fashion-development-brief-checklist.pdf";
const pdfDownloadPath = `${pdfPath}?v=20261022`;
const title = "Fashion Product Development Brief Checklist | Free PDF";
const description = "Plan garment categories, materials, technical files, sample approvals, quantities, timing and destination before requesting fashion product-development support.";

export const metadata = createPageMetadata({
  title,
  description,
  path: pagePath,
  image: { url: "/images/techpack.jpeg", width: 896, height: 1195, alt: "Zameett fashion development planning resource" },
});

const coverage = [
  ["01", "Brand and project basics", "Record the contact, brand direction, target customer and the type of support you are considering."],
  ["02", "Collection outline", "List the intended garment categories, style count and which products need design, technical or physical development."],
  ["03", "Product decisions", "Capture known silhouette, fit, coverage, size range, construction and embellishment requirements."],
  ["04", "Materials and finishes", "Organise fabric, colour, print, trim, label, packaging and supplier information already available."],
  ["05", "References and files", "Prepare sketches, inspiration, logos, artwork, measurements or supplier notes that can clarify your direction."],
  ["06", "Commercial checkpoints", "Note quantities, destination, target timing and approvals so they can be reviewed in the written scope."],
];

const routes = [
  ["Fashion design & tech packs", "Turn an approved garment direction into structured technical documentation.", "/services/fashion-tech-packs"],
  ["Custom textile prints", "Develop an original repeat or placement artwork around the intended product.", "/services/custom-textile-patterns"],
  ["Fashion sampling", "Review the prototype, fit and correction route before any approved production step.", "/solutions/fashion-sampling-services"],
  ["Modest-wear development", "Discuss project-specific sampling and production support for abayas and modest garments.", "/services/clothing-manufacturing"],
];

const saudiConsiderations = [
  ["01", "Customer, city and channel", "Name the Saudi customer, sales channel and intended city or destination instead of treating the whole market as one audience."],
  ["02", "Climate and wearing context", "Separate outdoor heat, air-conditioned interiors, daily wear, occasion wear and seasonal launch needs before choosing fabric or lining."],
  ["03", "Coverage, opacity and movement", "Record garment length, sleeve reach, opening coverage, layering, opacity, movement and closure expectations for the actual product."],
  ["04", "Sizes and length strategy", "Use approved measurements, representative samples or customer evidence. Do not assume one generic size or length route fits every Saudi brand."],
  ["05", "Labels and product information", "Name who will confirm Arabic and English product information, fibre, care, country-of-origin, packaging and other market requirements."],
  ["06", "Landed cost and approvals", "Record the SAR retail target, sample and revision owner, importer, freight, duties, final destination and launch-window assumptions."],
];

const resourceSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: absoluteUrl(pagePath),
  inLanguage: "en",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: {
    "@type": "CreativeWork",
    "@id": absoluteUrl(pdfPath) + "#resource",
    name: "Zameett Fashion Product Development Brief Checklist",
    description: "A free planning checklist for fashion product development, technical documentation, sampling and project-quotation preparation, including Saudi Arabia and GCC market prompts.",
    url: absoluteUrl(pdfPath),
    encodingFormat: "application/pdf",
    isAccessibleForFree: true,
    provider: { "@id": ORGANIZATION_ID },
  },
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Resources", path: "/blog" },
  { name: "Fashion Product Development Brief Checklist", path: pagePath },
]);

export default function FashionDevelopmentBriefChecklistPage() {
  return (
    <>
      <JsonLd data={[resourceSchema, breadcrumbSchema]} />
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={`inner ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} reveal`}>
              <p className={styles.crumb}><Link href="/">Home</Link> <span>/</span> Free Resource</p>
              <p className={styles.eyebrow}>Free fashion-development resource</p>
              <h1>Prepare a clearer brief <em>before the project begins.</em></h1>
              <p className={styles.lede}>
                Organise the information a fashion designer, technical developer, sampling team or
                reviewed supplier route may need. Complete what you know now, use the checklist to
                identify open decisions and review the optional Saudi Arabia and GCC planning module.
              </p>
              <div className={styles.heroActions}>
                <TrackedDownloadLink
                  className="btn btn-gold"
                  href={pdfDownloadPath}
                  linkLocation="resource_hero"
                  resourceName="fashion_development_brief_checklist"
                >
                  Download Free PDF <span aria-hidden="true">&darr;</span>
                </TrackedDownloadLink>
                <Link className="btn btn-outline-ivory" href="/contact#get-in-touch">Send Your Brief</Link>
              </div>
              <div className={styles.heroNotes} role="list" aria-label="Resource details"><span role="listitem">No sign-up</span><span role="listitem">Three-page PDF</span><span role="listitem">Worldwide projects</span></div>
            </div>

            <div className={`${styles.document} reveal`} style={{ "--reveal-delay": "90ms" }} role="img" aria-label="Fashion Product Development Brief Checklist preview">
              <div className={styles.documentHeader}><small>Zameett project resource</small><strong>Fashion Product Development<br />Brief Checklist</strong></div>
              <div className={styles.documentRows}>
                {["Brand & contact", "Collection outline", "Product decisions", "Materials & trims", "Files to share", "Commercial checkpoints"].map((item, index) => (
                  <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true" /></div>
                ))}
              </div>
              <div className={styles.documentFooter}><span>PDF</span><span>Complete only what you know</span></div>
            </div>
          </div>
        </header>

        <section className={styles.coverage} aria-labelledby="checklist-coverage-title">
          <div className="inner">
            <div className={`${styles.sectionHeading} reveal`}>
              <div><p className={styles.eyebrow}>What the checklist covers</p><h2 id="checklist-coverage-title">Six parts of a <em>useful project brief.</em></h2></div>
              <p>You do not need every answer before making an enquiry. The checklist helps separate confirmed information from decisions that still need professional review.</p>
            </div>
            <div className={styles.coverageGrid}>
              {coverage.map(([number, heading, text], index) => (
                <article className="reveal" style={{ "--reveal-delay": `${index * 50}ms` }} key={heading}>
                  <span>{number}</span><h3>{heading}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.use} aria-labelledby="checklist-use-title">
          <div className={`inner ${styles.useGrid}`}>
            <div className="reveal"><p className={styles.eyebrow}>How to use it</p><h2 id="checklist-use-title">Complete, attach, then <em>review together.</em></h2></div>
            <ol className={styles.steps}>
              <li className="reveal"><span>01</span><div><strong>Complete the known details</strong><p>Add the products, references, quantities and timing information already decided.</p></div></li>
              <li className="reveal"><span>02</span><div><strong>Attach useful references</strong><p>Include sketches, inspiration, measurements, artwork or supplier notes that explain the product.</p></div></li>
              <li className="reveal"><span>03</span><div><strong>Send it with your enquiry</strong><p>Zameett reviews the requested service and confirms missing questions before any payment.</p></div></li>
            </ol>
          </div>
        </section>

        <section className={styles.saudi} id="saudi-arabia-projects" aria-labelledby="saudi-projects-title">
          <div className={`inner ${styles.saudiGrid}`}>
            <div className={`${styles.saudiIntro} reveal`}>
              <p className={styles.eyebrow}>Saudi Arabia &amp; GCC planning module</p>
              <h2 id="saudi-projects-title">Prepare for the market, <em>not only the garment.</em></h2>
              <p>
                Zameett is based in Pakistan and works with international projects. For a collection
                intended for Saudi Arabia, the brief should identify the customer, climate, modest-wear
                requirements, commercial route and final destination before sampling or production is scoped.
              </p>
              <div className={styles.saudiLinks}>
                <Link href="/solutions/abaya-tech-pack-designer">Review abaya tech-pack requirements <span aria-hidden="true">&rarr;</span></Link>
                <Link href="/solutions/fashion-sampling-services">Plan a garment sampling route <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </div>
            <div className={styles.saudiCards}>
              {saudiConsiderations.map(([number, heading, text], index) => (
                <article className="reveal" style={{ "--reveal-delay": `${index * 45}ms` }} key={heading}>
                  <span>{number}</span><div><h3>{heading}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className={`inner ${styles.saudiNote} reveal`}>
            <strong>Market requirements must be verified for the actual route.</strong>
            <p>This planning module is not regulatory, customs or legal advice. The brand and its importer should confirm current Saudi import, textile, labelling, consumer, tax and product-information requirements with the relevant authorities and qualified advisers before sale.</p>
          </div>
        </section>

        <section className={styles.next} aria-labelledby="checklist-next-title">
          <div className="inner">
            <div className={`${styles.sectionHeading} reveal`}><div><p className={styles.eyebrow}>Choose the closest next step</p><h2 id="checklist-next-title">Use the brief with the <em>right service route.</em></h2></div><p>Every project is scoped around its actual garment, files, materials and intended outcome.</p></div>
            <div className={styles.routeGrid}>
              {routes.map(([heading, text, href], index) => (
                <Link className="reveal" style={{ "--reveal-delay": `${index * 55}ms` }} href={href} key={href}>
                  <span>{String(index + 1).padStart(2, "0")}</span><h3>{heading}</h3><p>{text}</p><strong>Explore service <i aria-hidden="true">&rarr;</i></strong>
                </Link>
              ))}
            </div>
            <div className={`${styles.scopeNote} reveal`}>
              <strong>The checklist is a planning tool, not a quotation.</strong>
              <p>Final scope, deliverables, formats, revisions, capability, MOQ, costs, responsibilities and timeline are confirmed in writing for the specific project before payment.</p>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className="inner reveal"><p className={styles.eyebrow}>Ready when your brief is</p><h2>Download it now, then send the details <em>when you are ready.</em></h2><div><TrackedDownloadLink className="btn btn-gold" href={pdfDownloadPath} linkLocation="resource_final_cta" resourceName="fashion_development_brief_checklist">Download Free PDF</TrackedDownloadLink><Link className="btn btn-outline-ivory" href="/contact#get-in-touch">Start Your Project</Link></div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
