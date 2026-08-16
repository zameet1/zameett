import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/components/faqData";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about Zameett fashion design, tech packs, textile prints, sampling, modest-wear manufacturing, timelines and project scope.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Zameett Frequently Asked Questions",
    description: "Clear answers about fashion development, technical documentation, sampling and modest-wear production support.",
    url: "/faq",
    images: [{ url: "/services/abaya-1.jpeg", width: 1600, height: 1132, alt: "Zameett fashion development" }],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zameett.com/" },
      { "@type": "ListItem", position: 2, name: "Frequently Asked Questions", item: "https://zameett.com/faq" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main>
        <header className="page-hero">
          <div className="inner">
            <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; FAQ</p>
            <p className="s-tag">Clear Answers</p>
            <h1>Plan your project with <em>fewer unknowns.</em></h1>
            <p>Learn what Zameett provides, what is quoted separately and what information helps us recommend the right fashion-development route.</p>
          </div>
        </header>
        <section className="faq premium-section" aria-labelledby="faq-title">
          <div className="inner faq-layout">
            <div>
              <p className="s-tag">Frequently Asked Questions</p>
              <h2 className="s-title" id="faq-title">The essentials before <em>you enquire.</em></h2>
              <p className="s-body" style={{ marginBottom: 30 }}>Every proposal confirms the agreed deliverables, timing, revisions, exclusions and payment terms for that specific project.</p>
              <a className="btn btn-burg" href="/contact#get-in-touch">Discuss Your Project →</a>
            </div>
            <FaqAccordion />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
