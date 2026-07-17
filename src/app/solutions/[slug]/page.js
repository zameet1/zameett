import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
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
  const titleLead = solution.title.slice(0, -solution.titleAccent.length);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="intent-page">
        <header className="page-hero intent-page-hero">
          <div className="inner">
            <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/services">Services</a> &nbsp;/&nbsp; {solution.keyword}</p>
            <h1>{titleLead}<em>{solution.titleAccent}</em></h1>
            <p>{solution.description}</p>
          </div>
        </header>
        <section className="intent-overview">
          <div className="inner intent-overview-grid">
            <div className="reveal">
              <p className="s-tag">Built Around Your Brand</p>
              <h2 className="s-title">Specialist support, without the <em>production guesswork.</em></h2>
              <p className="s-body">{solution.fit}</p>
            </div>
            <div className="intent-facts">
              <article className="reveal"><span>Estimated timeline</span><p>{solution.timeline}</p></article>
              <article className="reveal"><span>MOQ information</span><p>{solution.moq}</p></article>
            </div>
          </div>
        </section>

        <section className="services intent-deliverables">
          <div className="inner">
            <div className="svc-head reveal">
              <div>
                <p className="s-tag">What You Receive</p>
                <h2 className="s-title">A clear scope from <em>brief to handoff.</em></h2>
              </div>
              <p className="s-body">Every deliverable is agreed before work begins, so you know exactly what is included and what moves your collection forward.</p>
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
              <a href="/portfolio" className="btn btn-outline">Explore Full Portfolio →</a>
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
              <h2 className="s-title">Four steps. <em>One accountable team.</em></h2>
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
          <h2 className="s-title">Get a tailored scope, timeline and <em>honest MOQ.</em></h2>
          <p className="cta-sub">Share your designs, quantity and destination. We will review the details and respond with the clearest next step.</p>
          <div className="cta-btns"><a href={quoteHref} className="btn btn-gold">Get a Quote →</a><a href="/services" className="btn btn-outline-ivory">View All Services</a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
