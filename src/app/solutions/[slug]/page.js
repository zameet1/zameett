import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import ServicePricingHighlight from "@/components/ServicePricingHighlight";
import AbayaTechPackAuthority from "@/components/AbayaTechPackAuthority";
import { getPackagesByCategory } from "@/data/pricing";
import { SOLUTIONS, getSolution } from "../solutions";

export const dynamicParams = false;

const siteUrl = "https://zameett.com";

export function generateStaticParams() {
  return SOLUTIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return {
    title: solution.seoTitle || solution.keyword,
    description: solution.description,
    keywords: solution.keywords || [solution.keyword, "modest fashion Pakistan", "Zameett"],
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: `${solution.title} | Zameett`,
      description: solution.description,
      url: `/solutions/${solution.slug}`,
      images: [{ url: solution.cover, width: 1200, height: 630, alt: solution.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.title} | Zameett`,
      description: solution.description,
      images: [solution.cover],
    },
  };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const solutionPricingCategory = ["fashion-tech-pack-design-service", "abaya-tech-pack-designer"].includes(solution.slug)
    ? "design-techpack"
    : solution.slug === "custom-textile-pattern-designer"
      ? "custom-print"
      : null;
  const solutionPackages = solutionPricingCategory ? getPackagesByCategory(solutionPricingCategory) : [];
  const solutionStartingPrice = solutionPackages.length ? Math.min(...solutionPackages.map((item) => item.price)) : null;

  const pageUrl = `${siteUrl}/solutions/${solution.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.keyword,
    description: solution.description,
    url: pageUrl,
    image: `${siteUrl}${solution.cover}`,
    provider: { "@type": "Organization", name: "Zameett", url: siteUrl },
    areaServed: "Worldwide",
    availableChannel: { "@type": "ServiceChannel", serviceUrl: `${siteUrl}/contact` },
    serviceType: solution.keyword,
    ...(solutionPackages.length ? {
      offers: solutionPackages.map((item) => ({
        "@type": "Offer",
        price: item.price,
        priceCurrency: "USD",
        url: `${siteUrl}/contact?package=${encodeURIComponent(item.contactParam)}`,
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.subtitle,
        },
      })),
    } : {}),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: solution.keyword, item: pageUrl },
    ],
  };

  const quoteHref = `/contact?service=${solution.slug}#get-in-touch`;
  const titleLead = solution.title.slice(0, -solution.titleAccent.length);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className={`intent-page${solution.slug === "fashion-sampling-services" ? " intent-page-sampling" : ""}`}>
        <header className="intent-hero">
          <div className="inner intent-hero-grid">
            <div className="intent-hero-copy">
              <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/services">Services</a> &nbsp;/&nbsp; {solution.keyword}</p>
              <p className="s-tag">{solution.eyebrow}</p>
              <h1>{titleLead}<em>{solution.titleAccent}</em></h1>
              <p className="intent-lead">{solution.description}</p>
              <div className="intent-actions">
                <a href={quoteHref} className="btn btn-gold">Request a Project Review &rarr;</a>
                <a href="#solution-overview" className="btn btn-outline-ivory">Explore the Service</a>
              </div>
              <div className="intent-trust" aria-label="Service commitments">
                {(solution.trustPoints || ["Project-specific scope", "Documented approvals", "Worldwide enquiries"]).map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="intent-hero-image">
              <Image
                src={solution.cover}
                alt={`${solution.keyword} by Zameett`}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 38vw"
              />
            </div>
          </div>
        </header>
        <section className="intent-overview" id="solution-overview">
          <div className="inner intent-overview-grid">
            <div className="reveal">
              <p className="s-tag">Who This Service Is For</p>
              <h2 className="s-title">Support matched to <em>your product and brief.</em></h2>
              <p className="s-body">{solution.fit}</p>
            </div>
            <div className="intent-facts">
              <article className="reveal"><span>Estimated timeline</span><p>{solution.timeline}</p></article>
              <article className="reveal"><span>MOQ information</span><p>{solution.moq}</p></article>
              <article className="reveal"><span>Pricing approach</span><p>{solutionStartingPrice !== null ? `Published packages start at $${solutionStartingPrice} USD, with scope confirmed before payment.` : "Custom work is priced from the approved scope, not a generic package that hides material or production variables."}</p><a className="intent-fact-link" href="#service-pricing">{solutionStartingPrice !== null ? "View related packages" : "Review the quote route"} →</a></article>
            </div>
          </div>
        </section>
        {solution.slug === "abaya-tech-pack-designer" && <AbayaTechPackAuthority />}

        <ServicePricingHighlight
          packages={solutionPackages}
          sectionId="service-pricing"
          eyebrow={solutionPackages.length ? "Related Published Packages" : "Transparent Quote Route"}
          title={solutionPackages.length ? `Packages related to ${solution.keyword}.` : `Pricing for ${solution.keyword}.`}
          description={solutionPackages.length ? "Compare defined creative scopes and starting prices before sending your brief." : "This service is quoted from the reviewed product, quantity, materials, complexity, timeline and destination."}
          quoteHref={quoteHref}
          customTitle={`${solution.keyword} project quote`}
          customDescription="We review the actual requirements, confirm capability and provide written scope, timing, assumptions and commercial terms before commitment."
        />
        <section className="services intent-deliverables">
          <div className="inner">
            <div className="svc-head reveal">
              <div>
                <p className="s-tag">What You Receive</p>
                <h2 className="s-title">What is included <em>in your project.</em></h2>
              </div>
              <p className="s-body">We agree every deliverable before work begins, so you know what is included and what you will receive.</p>
            </div>
            <div className="svc-grid intent-receive-grid">
              {solution.deliverables.map((item, index) => (
                <article key={item} className="svc-card reveal">
                  <div className="svc-num" aria-hidden="true">0{index + 1}</div>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="intent-portfolio" id="portfolio">
          <div className="inner">
            <div className="intent-section-head reveal">
              <div><p className="s-tag">Relevant Portfolio</p><h2 className="s-title">Work made for <em>real production.</em></h2></div>
              <a href="/portfolio#portfolio-gallery" className="btn btn-outline">Explore Full Portfolio →</a>
            </div>
            <div className="intent-gallery">
              {solution.gallery.map((image, index) => (
                <div className="intent-gallery-item reveal" key={image}>
                  <Image src={image} alt={`${solution.keyword} portfolio example ${index + 1}`} fill sizes="(max-width: 700px) 100vw, 33vw" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intent-process">
          <div className="inner">
            <div className="reveal">
              <p className="s-tag">The Process</p>
              <h2 className="s-title">Four steps. <em>One agreed process.</em></h2>
            </div>
            <div className="intent-process-grid">
              {solution.process.map((step, index) => (
                <article key={step} className="reveal"><span>{index + 1}</span><p>{step}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="intent-faq">
          <div className="inner intent-faq-grid">
            <div className="reveal"><p className="s-tag">Frequently Asked Questions</p><h2 className="s-title">Useful answers before you <em>request a quote.</em></h2></div>
            <div className="reveal"><FaqAccordion items={solution.faqs} /></div>
          </div>
        </section>

        <section className="cta reveal">
          <p className="s-tag">Tell Us What You Are Building</p>
          <h2 className="s-title">Get a project-specific scope, timeline and <em>MOQ.</em></h2>
          <p className="cta-sub">Share your designs, quantity and destination. We will review the details and tell you what we recommend next.</p>
          <div className="cta-btns"><a href={quoteHref} className="btn btn-gold">Get a Quote →</a><a href="/services#service-paths" className="btn btn-outline-ivory">View All Services</a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
