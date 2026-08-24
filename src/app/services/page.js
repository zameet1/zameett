import Link from "next/link";
import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";
import JsonLd from "@/components/JsonLd";
import { getPackagesByCategory } from "@/data/pricing";
import styles from "./services.module.css";

const TECH_PACK_PACKAGES = getPackagesByCategory("design-techpack");
const PRINT_PACKAGES = getPackagesByCategory("custom-print");

const SERVICE_ROUTES = [
  {
    number: "01",
    mark: "TP",
    label: "From $95 USD",
    title: "Fashion Design & Tech Packs",
    text: "Original garment concepts, technical flats and structured production documentation for sampling, factory quotation or production planning.",
    facts: ["1, 5 or 7 styles", "AI + PDF where stated", "3-15 business days"],
    outcome: "Original design plus factory-ready technical documentation",
    href: "/services/fashion-tech-packs#service-details",
    link: "Explore Tech Pack Service",
    featured: true,
  },
  {
    number: "02",
    mark: "PR",
    label: "From $60 USD",
    title: "Custom Textile Prints",
    text: "Original seamless repeats and placement artwork developed around your garment, brand direction and intended production use.",
    facts: ["Repeat or placement", "Editable source file", "3-7 business days"],
    outcome: "Original artwork prepared for supplier review",
    href: "/services/custom-textile-patterns#service-details",
    link: "Explore Textile Print Service",
  },
  {
    number: "03",
    mark: "SP",
    label: "Project quote",
    title: "Fashion Sampling",
    text: "Prototype development, fit review, material decisions and documented correction rounds before an approved production route.",
    facts: ["Capability review", "Fit checkpoints", "Written corrections"],
    outcome: "A reviewed prototype route before bulk production",
    href: "/solutions/fashion-sampling-services#solution-overview",
    link: "Explore Sampling Support",
  },
  {
    number: "04",
    mark: "MW",
    label: "Project quote",
    title: "Modest-Wear Manufacturing",
    text: "Reviewed sourcing, private labels, production checkpoints and dispatch for abayas, kaftans, modest dresses and coordinated collections.",
    facts: ["Flexible reviewed MOQ", "Sample before bulk", "Worldwide coordination"],
    outcome: "A controlled modest-wear production plan",
    href: "/services/clothing-manufacturing#service-details",
    link: "Explore Manufacturing",
  },
];

const ADDITIONAL_ROUTES = [
  {
    number: "01",
    title: "Garment + Custom Print",
    price: "From $210 USD",
    text: "One coordinated package for the fashion design, professional tech pack and original textile artwork.",
    href: "/pricing#pricing-tab-design-techpack-print",
    link: "Compare printed-garment packages",
  },
  {
    number: "02",
    title: "Textile Artwork Only",
    price: "From $60 USD",
    text: "Choose artwork only when your product direction is already defined and you need an original repeat or placement print.",
    href: "/services/custom-textile-patterns#service-packages",
    link: "View print packages",
  },
  {
    number: "03",
    title: "Physical Sample",
    price: "Custom quote",
    text: "Sampling is reviewed against construction, pattern status, materials, fit requirements and delivery destination.",
    href: "/solutions/fashion-sampling-services#solution-overview",
    link: "Review sampling process",
  },
  {
    number: "04",
    title: "Production Support",
    price: "Custom quote",
    text: "MOQ, material terms, quality checkpoints, unit cost and dispatch options are confirmed for the actual garment.",
    href: "/contact?package=production-review#get-in-touch",
    link: "Request production review",
  },
];

export const metadata = {
  title: "Fashion Design, Tech Pack Services & Modest-Wear Production",
  description:
    "Explore Zameett fashion design and professional tech-pack packages from $95 USD, custom textile prints from $60, sampling and modest-wear manufacturing support.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Fashion Design & Tech Pack Services | Zameett",
    description:
      "Clear service paths, published tech-pack pricing and project-specific sampling and modest-wear production support.",
    url: "/services",
    images: [{ url: "/images/techpack.jpeg", width: 1600, height: 1067, alt: "Zameett fashion design and tech-pack services" }],
  },
  twitter: { card: "summary_large_image", title: "Fashion Design & Tech Pack Services | Zameett", description: "Clear service paths, published tech-pack pricing and project-specific sampling and modest-wear production support.", images: ["/images/techpack.jpeg"] },
};

const servicesSchema = SERVICE_ROUTES.map((route) => {
  const routePackages = route.number === "01" ? TECH_PACK_PACKAGES : route.number === "02" ? PRINT_PACKAGES : [];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: route.title,
    description: route.text,
    provider: { "@type": "Organization", name: "Zameett", url: "https://zameett.com" },
    areaServed: "Worldwide",
    ...(routePackages.length
      ? {
          offers: routePackages.map((item) => ({
            "@type": "Offer",
            price: item.price,
            priceCurrency: "USD",
            url: "https://zameett.com/contact?package=" + item.contactParam,
            itemOffered: { "@type": "Service", name: item.name, description: item.subtitle },
          })),
        }
      : {}),
  };
});

export default function Services() {
  return (
    <>
      {servicesSchema.map((schema) => <JsonLd key={schema.name} data={schema} />)}
      <main>
        <header className={styles.hero + " page-hero service-hero"}>
          <div className={styles.heroGrid + " inner"}>
            <div className={styles.heroCopy + " reveal"}>
              <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; Services</p>
              <p className="s-tag">Fashion Design & Technical Development</p>
              <h1>Fashion design and tech packs <em>for real production.</em></h1>
              <p>
                Choose a defined creative package or request a reviewed sampling and production route.
                Prices, core deliverables and next steps are visible before you send a brief.
              </p>
              <div className={styles.heroProof} aria-label="Service benefits">
                <span>Clear starting prices</span><span>Written scope first</span><span>No payment at enquiry</span>
              </div>
              <div className={styles.heroActions}>
                <Link className="btn btn-gold" href="#tech-pack-pricing">View Tech Pack Prices <span aria-hidden="true">&rarr;</span></Link>
                <Link className="btn btn-outline-ivory" href="/contact#get-in-touch">Send Your Brief</Link>
              </div>
            </div>
            <aside className={styles.heroPanel + " reveal"} aria-label="Tech pack service summary" style={{ "--reveal-delay": "90ms" }}>
              <span className={styles.heroPanelLabel}>Most requested service</span>
              <h2>Fashion Design + Professional Tech Pack</h2>
              <p>One complete product starts with an original design and its own structured technical document.</p>
              <div className={styles.heroPanelPrice}><small>Packages start at</small><strong>$95 <i>USD</i></strong></div>
              <dl className={styles.heroPanelFacts}>
                <div><dt>Scope</dt><dd>1, 5 or 7 styles</dd></div>
                <div><dt>Delivery</dt><dd>From 3 business days</dd></div>
                <div><dt>Files</dt><dd>PDF + editable AI where stated</dd></div>
              </dl>
              <Link href="/services/fashion-tech-packs#service-details">See exactly what a tech pack includes <span aria-hidden="true">&rarr;</span></Link>
            </aside>
          </div>
        </header>

        <div className={styles.jumpRail} role="navigation" aria-label="Services page sections">
          <div className="inner">
            <Link href="#service-routes"><span>01</span>All Services</Link>
            <Link href="#tech-pack-pricing"><span>02</span>Tech Pack Pricing</Link>
            <Link href="#additional-services"><span>03</span>Other Pricing</Link>
            <Link href="#how-we-work"><span>04</span>How It Works</Link>
          </div>
        </div>

        <section className={styles.routesSection} id="service-routes" aria-labelledby="service-routes-title">
          <div className="inner">
            <div className={styles.sectionHeading + " reveal"}>
              <div><p className="s-tag">Choose Your Starting Point</p><h2 className="s-title" id="service-routes-title">See the service, price route and <em>next step together.</em></h2></div>
              <p className="s-body">Creative services have published starting prices. Physical sampling and manufacturing receive a project-specific quote after the garment, quantity and destination are reviewed.</p>
            </div>
            <div className={styles.routeGrid}>
              {SERVICE_ROUTES.map((route, index) => (
                <article
                  className={[styles.routeCard, route.featured ? styles.featuredRoute : "", "reveal"].filter(Boolean).join(" ")}
                  style={{ "--reveal-delay": index * 65 + "ms" }}
                  key={route.title}
                >
                  <div className={styles.routeTop}><span>{route.number}</span><small>{route.label}</small></div>
                  <span className={styles.routeVisual} aria-hidden="true">{route.mark}</span>
                  <h3>{route.title}</h3>
                  <p>{route.text}</p>
                  <ul>{route.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                  <p className={styles.routeOutcome}><span>Project outcome</span>{route.outcome}</p>
                  <Link href={route.href}>{route.link} <span aria-hidden="true">&rarr;</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pricingSection} id="tech-pack-pricing" aria-labelledby="tech-pack-pricing-title">
          <div className="inner">
            <div className={styles.pricingHeading}>
              <div className="reveal">
                <p className="s-tag">Published Tech Pack Packages</p>
                <h2 className="s-title" id="tech-pack-pricing-title">Choose one style, a capsule or a <em>complete collection.</em></h2>
                <p className="s-body">Each package combines original fashion design with an individual professional tech pack for every stated garment.</p>
              </div>
              <aside className={styles.techPackDefinition + " reveal"} style={{ "--reveal-delay": "80ms" }}>
                <small>What is a tech pack?</small>
                <p>A controlled reference containing technical flats, materials, construction details, measurements and placement information for sampling or manufacturer review.</p>
                <span>Patterns, grading, physical samples and manufacturing are separate unless included in a written proposal.</span>
              </aside>
            </div>

            <div className={styles.packageGrid}>
              {TECH_PACK_PACKAGES.map((item, index) => (
                <article
                  className={[styles.packageCard, item.featured ? styles.featuredPackage : "", item.recommended ? styles.recommendedPackage : "", "reveal"].filter(Boolean).join(" ")}
                  style={{ "--reveal-delay": index * 75 + "ms" }}
                  key={item.slug}
                >
                  {item.recommended ? <span className={styles.recommendedBadge}>Recommended</span> : item.featured && <span className={styles.popularBadge}>Most popular</span>}
                  <div className={styles.packageIndex}>0{index + 1} / {index === 0 ? "One style" : index === 1 ? "Capsule" : "Full collection"}</div>
                  <h3>{item.name}</h3>
                  <p className={styles.packageSubtitle}>{item.subtitle}</p>
                  <div className={styles.packagePrice}><small>{item.priceQualifier}</small><strong>{"$" + item.price.toLocaleString("en-US")}</strong><i>USD</i></div>
                  <p className={styles.packageDescription}>{item.description}</p>
                  <dl className={styles.packageFacts}>
                    <div><dt>Delivery</dt><dd>{item.delivery}</dd></div>
                    <div><dt>Revisions</dt><dd>{item.revisions}</dd></div>
                  </dl>
                  <div className={styles.includedLabel}>Key deliverables</div>
                  <ul className={styles.packageList}>{item.included.slice(0, 6).map((included) => <li key={included}>{included}</li>)}</ul>
                  <Link className={styles.packageCta} href={"/contact?package=" + item.contactParam + "#get-in-touch"}>
                    {item.ctaLabel} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.pricingFooter + " reveal"}>
              <p><strong>Before payment:</strong> we review complexity, confirm the exact pages and formats, and issue a written scope. Published prices cover standard-complexity work matching the listed package.</p>
              <Link className="btn btn-outline-gold" href="/pricing#packages">Compare All Pricing & Deliverables <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.additionalSection} id="additional-services" aria-labelledby="additional-services-title">
          <div className="inner">
            <div className={styles.sectionHeading + " reveal"}>
              <div><p className="s-tag">More Ways To Work Together</p><h2 className="s-title" id="additional-services-title">Need artwork, a sample or <em>production support?</em></h2></div>
              <p className="s-body">Choose the closest route. Your enquiry form will carry the selected package or production-review request into the brief.</p>
            </div>
            <div className={styles.offerGrid}>
              {ADDITIONAL_ROUTES.map((route, index) => (
                <article className={styles.offerCard + " reveal"} style={{ "--reveal-delay": (index % 4) * 60 + "ms" }} key={route.title}>
                  <div><span>{route.number}</span><small>{route.price}</small></div>
                  <h3>{route.title}</h3>
                  <p>{route.text}</p>
                  <Link href={route.href}>{route.link} <span aria-hidden="true">&rarr;</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.photoBreak + " photo-break"}>
          <CoverImage src="/images/techpack.jpeg" objectPosition="center 40%" alt="Zameett fashion technical package development" />
          <div className="pb-overlay"><div className="pb-content reveal"><p className="pb-tag">Controlled Development</p><h2 className="pb-h">One approved reference at every stage.</h2><p className="pb-p">Brief, technical documents, materials, samples and production decisions are recorded so the next step stays clear.</p><Link href="/how-it-works#workflow" className="btn btn-outline-gold">View How It Works <span aria-hidden="true">&rarr;</span></Link></div></div>
        </div>

        <section className={styles.processSection + " process services-process"} id="how-we-work" aria-labelledby="services-process-title">
          <div className="inner">
            <div className="reveal"><p className="s-tag">How We Work</p><h2 className="s-title" id="services-process-title">Define. Develop. <em>Approve.</em></h2></div>
            <div className="p-row">
              <div className="p-step"><div className="p-circle"><span>1</span></div><h3>Scope</h3><p>Product, deliverables, revisions, commercial assumptions and timing are confirmed.</p></div>
              <div className="p-step"><div className="p-circle"><span>2</span></div><h3>Develop</h3><p>Designs, specifications or a physical sample are prepared against the agreed brief.</p></div>
              <div className="p-step"><div className="p-circle"><span>3</span></div><h3>Review</h3><p>Feedback is collected in one controlled revision or sample-correction round.</p></div>
              <div className="p-step"><div className="p-circle"><span>4</span></div><h3>Approve</h3><p>Written approval identifies the version that controls the next project stage.</p></div>
              <div className="p-step"><div className="p-circle"><span>5</span></div><h3>Deliver</h3><p>Approved files or goods move to the agreed handover or dispatch route.</p></div>
            </div>
          </div>
        </section>

        <section className={styles.finalCta + " cta page-cta"}>
          <div className="reveal">
            <p className="s-tag">Start With A Clear Brief</p>
            <h2 className="s-title">Know what you need?<br /><em>Let us confirm the right scope.</em></h2>
            <p className="cta-sub">We aim to respond within one business day with the questions needed for an accurate proposal.</p>
            <div className="cta-btns"><Link href="/contact#get-in-touch" className="btn btn-gold">Start Your Project <span aria-hidden="true">&rarr;</span></Link><Link href="/pricing" className="btn btn-outline-ivory">View Full Pricing</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
