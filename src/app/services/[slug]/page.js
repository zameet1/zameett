import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GigGallery from "@/components/GigGallery";
import ServicePricingHighlight from "@/components/ServicePricingHighlight";
import TechPackServiceExperience from "@/components/TechPackServiceExperience";
import ModestWearDevelopment, { MODEST_WEAR_FAQS } from "@/components/ModestWearDevelopment";
import TextilePatternDevelopment, { TEXTILE_PATTERN_FAQS } from "@/components/TextilePatternDevelopment";
import { createPageMetadata } from "@/lib/seo";
import { PRICING_FAQS, getPackagesByCategory } from "@/data/pricing";
import { GIGS, getGig } from "../gigs";
import styles from "../services.module.css";

export const dynamicParams = false;

const siteUrl = "https://zameett.com";

export function generateStaticParams() {
  return GIGS.map((gig) => ({ slug: gig.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gig = getGig(slug);
  if (!gig) return {};
  return createPageMetadata({ title: gig.title, description: gig.tagline, path: "/services/" + gig.slug, image: { url: gig.cover, width: 1600, height: 1132, alt: gig.title } });
}

export default async function GigPage({ params }) {
  const { slug } = await params;
  const gig = getGig(slug);
  if (!gig) notFound();

  const category = gig.slug === "fashion-tech-packs" ? "design-techpack" : gig.slug === "custom-textile-patterns" ? "custom-print" : null;
  const packages = category ? getPackagesByCategory(category) : [];
  const startingPrice = packages.length ? Math.min(...packages.map((item) => item.price)) : null;
  const learningLinks = {
    "fashion-tech-packs": [
      ["What is a tech pack?", "/blog/what-is-a-tech-pack"],
      ["How much does a tech pack cost?", "/blog/tech-pack-cost"],
      ["See a production-ready tech pack structure", "/blog/tech-pack-example"],
      ["Understand the fashion BOM", "/blog/bill-of-materials-fashion"],
    ],
    "custom-textile-patterns": [
      ["What is a seamless repeat pattern?", "/blog/seamless-repeat-pattern"],
      ["Placement print vs all-over print", "/blog/placement-print-vs-all-over-print"],
      ["Prepare textile artwork for production", "/blog/prepare-textile-print-for-production"],
    ],
    "clothing-manufacturing": [
      ["Private-label abaya manufacturing guide", "/blog/private-label-abaya-manufacturing"],
      ["How abaya MOQ works", "/blog/abaya-manufacturer-moq"],
      ["Embroidered and beaded abaya production", "/blog/embroidered-abaya-manufacturing"],
    ],
  }[gig.slug] || [];
  const visibleFaqs = gig.slug === "clothing-manufacturing" ? MODEST_WEAR_FAQS : gig.slug === "custom-textile-patterns" ? TEXTILE_PATTERN_FAQS : PRICING_FAQS.slice(0, 5);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: gig.title,
    description: gig.tagline,
    url: siteUrl + "/services/" + gig.slug,
    provider: { "@type": "Organization", name: "Zameett", url: siteUrl },
    areaServed: "Worldwide",
    serviceType: gig.slug === "clothing-manufacturing" ? "Modest wear product development, sampling and manufacturing support" : gig.slug === "custom-textile-patterns" ? "Custom textile pattern design, seamless repeats and placement artwork" : "Fashion design and product development",
    image: siteUrl + gig.cover,
    ...(packages.length ? {
      offers: packages.map((item) => ({
        "@type": "Offer",
        price: item.price,
        priceCurrency: "USD",
        url: siteUrl + "/contact?package=" + item.contactParam,
        itemOffered: { "@type": "Service", name: item.name, description: item.subtitle },
      })),
    } : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
      { "@type": "ListItem", position: 2, name: "Services", item: siteUrl + "/services" },
      { "@type": "ListItem", position: 3, name: gig.title, item: siteUrl + "/services/" + gig.slug },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema, faqSchema]} />
      <main>
        <section className={`gig-detail premium-detail-page${gig.slug === "clothing-manufacturing" ? " modest-wear-detail-page" : gig.slug === "custom-textile-patterns" ? " textile-pattern-detail-page" : ""}`} id="service-details">
          <div className="inner">
            <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/services">Services</Link> &nbsp;/&nbsp; {gig.short}</p>
            <div className="gig-top reveal">
              <GigGallery images={gig.gallery} alt={gig.title} />
              <div className="gig-info">
                <p className="s-tag">Featured Service</p>
                <h1 className="gig-title">{gig.title}</h1>
                <p className="gig-tagline">{gig.tagline}</p>
                {startingPrice !== null && (
                  <div className={styles.detailPriceSignal} aria-label="Published package summary">
                    <div><span>Packages from</span><strong>{"$" + startingPrice + " USD"}</strong></div>
                    <div><span>Package choices</span><strong>{packages.length} clear scopes</strong></div>
                    <div><span>Pricing</span><strong>Confirmed before payment</strong></div>
                  </div>
                )}
                <ul className="gig-highlights">{gig.list.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="gig-actions">
                  <Link href={"/contact?service=" + gig.slug + "#get-in-touch"} className="btn btn-burg">Send Enquiry <span aria-hidden="true">&rarr;</span></Link>
                  {startingPrice !== null && <a href="#service-packages" className="btn btn-outline">{"View Packages From $" + startingPrice}</a>}
                  {gig.pdf && <a href={gig.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-outline">View Portfolio PDF</a>}
                </div>
                {gig.pdf && <a className="gig-pdf-dl" href={gig.pdf} download>&#8681; Download portfolio (PDF)</a>}
              </div>
            </div>
            {gig.slug === "fashion-tech-packs" && <TechPackServiceExperience />}
            <div className="gig-body">
              <div className="gig-desc reveal">
                {gig.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <h2>{gig.listTitle}</h2>
                <ul className="gig-list">{gig.list.map((item) => <li key={item}>{item}</li>)}</ul>
                <h2>{gig.whyTitle}</h2>
                <ul className="gig-list">{gig.why.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="gig-note">{gig.note}</p>
                <Link href={"/contact?service=" + gig.slug + "#get-in-touch"} className="btn btn-gold gig-cta">Start Your Project <span aria-hidden="true">&rarr;</span></Link>
              </div>
            </div>
          </div>
        </section>

        {gig.slug === "clothing-manufacturing" && <ModestWearDevelopment />}
        {gig.slug === "custom-textile-patterns" && <TextilePatternDevelopment />}

        <ServicePricingHighlight
          packages={packages}
          sectionId="service-packages"
          eyebrow={packages.length ? "Published Service Packages" : "Project-Specific Pricing"}
          title={packages.length ? `Choose the right ${gig.short.toLowerCase()} scope.` : "Review the product before pricing production."}
          description={packages.length ? "See the price, key outputs, delivery and revision scope together. Your brief is reviewed before payment." : "Sampling and manufacturing costs depend on the actual garment, materials, quantity, embellishment, packaging and destination."}
          quoteHref={`/contact?service=${gig.slug}#get-in-touch`}
          customTitle="Modest-wear sampling and manufacturing quote"
          customDescription="We confirm capability, workable MOQ, sample route, materials, production checkpoints and delivery assumptions for the actual project."
        />
        <section className="service-learning-section" aria-labelledby="service-learning-title">
          <div className="inner">
            <div className="svc-head reveal"><div><p className="s-tag">Learn Before You Brief</p><h2 className="s-title" id="service-learning-title">Useful guides for a <em>clearer project.</em></h2></div><p className="s-body">Understand the decisions, files and supplier questions behind this service before requesting a scope.</p></div>
            <div className="service-learning-grid">{learningLinks.map(([label, href]) => <Link className="reveal" key={href} href={href}>{label}<span aria-hidden="true">&rarr;</span></Link>)}</div>
          </div>
        </section>
        <section className="service-faq-section" aria-labelledby="service-faq-title">
          <div className="inner">
            <div className="reveal"><p className="s-tag">Before You Enquire</p><h2 className="s-title" id="service-faq-title">Scope questions, <em>answered clearly.</em></h2></div>
            <div className="service-faq-list">
              {visibleFaqs.map((item) => <details className="reveal" key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
