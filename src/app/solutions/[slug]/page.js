import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SOLUTIONS, getSolution } from "../solutions";

const siteUrl = "https://zameett.com";

export function generateStaticParams() {
  return SOLUTIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return {
    title: solution.keyword,
    description: solution.description,
    keywords: [solution.keyword, "modest fashion Pakistan", "Zameett"],
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

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="intent-page">
        <header className="intent-hero">
          <div className="inner intent-hero-grid">
            <div className="intent-hero-copy">
              <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/services">Services</a> &nbsp;/&nbsp; {solution.keyword}</p>
              <p className="s-tag">{solution.eyebrow}</p>
              <h1>{solution.title}</h1>
              <p className="intent-lead">{solution.description}</p>
              <div className="intent-actions">
                <a href={quoteHref} className="btn btn-gold">Get a Quote →</a>
                <a href="#portfolio" className="btn btn-outline-ivory">View Relevant Work</a>
              </div>
              <div className="intent-trust" aria-label="Service highlights">
                <span>Worldwide clients</span><span>Sample approval first</span><span>Clear project scope</span>
              </div>
            </div>
            <div className="intent-hero-image">
              <Image src={solution.cover} alt={solution.title} fill priority sizes="(max-width: 900px) 100vw, 44vw" />
            </div>
          </div>
        </header>

        <section className="intent-overview">
          <div className="inner intent-overview-grid">
            <div>
              <p className="s-tag">Built Around Your Brand</p>
              <h2 className="s-title">Specialist support, without the <em>production guesswork.</em></h2>
              <p className="s-body">{solution.fit}</p>
            </div>
            <div className="intent-facts">
              <article><span>Estimated timeline</span><p>{solution.timeline}</p></article>
              <article><span>MOQ information</span><p>{solution.moq}</p></article>
            </div>
          </div>
        </section>

        <section className="intent-deliverables">
          <div className="inner">
            <p className="s-tag">What You Receive</p>
            <h2 className="s-title">A clear scope from <em>brief to handoff.</em></h2>
            <div className="intent-card-grid">
              {solution.deliverables.map((item, index) => (
                <article key={item} className="intent-card"><span>0{index + 1}</span><h3>{item}</h3></article>
              ))}
            </div>
          </div>
        </section>

        <section className="intent-portfolio" id="portfolio">
          <div className="inner">
            <div className="intent-section-head">
              <div><p className="s-tag">Relevant Portfolio</p><h2 className="s-title">Work made for <em>real production.</em></h2></div>
              <a href="/portfolio" className="btn btn-outline">Explore Full Portfolio →</a>
            </div>
            <div className="intent-gallery">
              {solution.gallery.map((image, index) => (
                <div className="intent-gallery-item" key={image}>
                  <Image src={image} alt={`${solution.keyword} portfolio example ${index + 1}`} fill sizes="(max-width: 700px) 100vw, 33vw" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="intent-process">
          <div className="inner">
            <p className="s-tag">The Process</p>
            <h2 className="s-title">Four steps. <em>One accountable team.</em></h2>
            <div className="intent-process-grid">
              {solution.process.map((step, index) => (
                <article key={step}><span>{index + 1}</span><p>{step}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="intent-faq">
          <div className="inner intent-faq-grid">
            <div><p className="s-tag">Frequently Asked Questions</p><h2 className="s-title">Useful answers before you <em>request a quote.</em></h2></div>
            <div className="intent-faq-list">
              {solution.faqs.map(([question, answer]) => (
                <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <p className="s-tag">Tell Us What You Are Building</p>
          <h2 className="s-title">Get a tailored scope, timeline and <em>honest MOQ.</em></h2>
          <p className="cta-sub">Share your designs, quantity and destination. We will review the details and respond with the clearest next step.</p>
          <div className="cta-btns"><a href={quoteHref} className="btn btn-gold">Get a Quote →</a><a href="/services" className="btn btn-outline-ivory">View All Services</a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
