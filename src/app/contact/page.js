import ProjectBriefPanel from "@/components/ProjectBriefPanel";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/components/faqData";
import ScrollTopLink from "@/components/ScrollTopLink";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import JsonLd from "@/components/JsonLd";
import { GIGS } from "@/app/services/gigs";
import { SOLUTIONS } from "@/app/solutions/solutions";
import { getPricingPackage } from "@/data/pricing";
import { WHATSAPP_URL } from "@/lib/contactLinks";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Zameett for fashion design, technical development, sampling or modest-wear manufacturing. We aim to respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Zameett | Get a Modest Fashion Design & Manufacturing Quote",
    description:
      "Share your project brief and we will review the most suitable design, sampling or production route.",
    url: "/contact",
    images: [{ url: "/images/26.jpeg", width: 1200, height: 630, alt: "Hand embellishment detail on a Zameett modest wear piece" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zameett | Get a Modest Fashion Design & Manufacturing Quote",
    description: "Fashion design, technical development and reviewed modest-wear production support.",
    images: ["/images/26.jpeg"],
  },
};

function firstParam(value) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Contact({ searchParams }) {
  const params = await searchParams;
  const requestedPackage = firstParam(params?.package);
  const requestedService = firstParam(params?.service);
  const pricingPackage = getPricingPackage(requestedPackage);

  let initialService = "";
  let initialPackageParam = "";

  if (pricingPackage) {
    initialService = pricingPackage.name;
    initialPackageParam = pricingPackage.contactParam;
  } else if (requestedPackage === "production-review") {
    initialService = "Production Review";
    initialPackageParam = "production-review";
  } else if (requestedService) {
    const gig = GIGS.find((item) => item.slug === requestedService);
    const solution = SOLUTIONS.find((item) => item.slug === requestedService);
    initialService = gig?.serviceValue || solution?.contactValue || "";
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <header className="page-hero contact-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Contact</p>
          <h1>Tell us about <em>your collection.</em></h1>
          <p>
            Share your brief and we aim to respond within one business day. Tell us as much or as
            little as you like. We provide design and technical support across apparel categories, plus reviewed modest-wear sampling and manufacturing. We will ask for any missing details and
            recommend the next step.
          </p>
          <div className="page-hero-proof"><span>Aim: one business day</span><span>No first-call commitment</span><span>Worldwide enquiries</span></div>
        </div>
      </header>

      {/* CONTACT FORM */}
      <section className="contact-section contact-premium" id="get-in-touch">
        <div className="inner">
          <div className="reveal">
            <p className="s-tag">Get In Touch</p>
            <h2 className="s-title">Talk to a <em>fashion-development specialist.</em></h2>
            <p className="s-body" style={{ marginBottom: 24 }}>
              We use the first conversation to understand your brief. After reviewing it, we will
              explain the practical next steps for your brand.
            </p>
            <div className="contact-quick">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-burg"
              >
                Chat on WhatsApp →
              </a>
              <a href="mailto:hello@zameett.com" className="btn btn-outline">
                Email Us
              </a>
            </div>
            <p className="contact-reply">
              <span aria-hidden="true">⚡</span> Response target: one business day
            </p>
            <div className="contact-info-col">
              <div className="contact-detail">
                <span>Email</span>
                <a href="mailto:hello@zameett.com">hello@zameett.com</a>
              </div>
              <div className="contact-detail">
                <span>WhatsApp</span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">+92 324 6599699</a>
              </div>
              <div className="contact-detail">
                <span>Based In</span>
                <p>Pakistan, shipping worldwide</p>
              </div>
              <div className="contact-detail">
                <span>Specialisation</span>
                <p>Multi-category design · Modest-wear production specialty</p>
              </div>
              <div className="contact-detail">
                <span>Response Time</span>
                <p>We aim to reply within one business day</p>
              </div>
              <div className="contact-detail">
                <span>Online</span>
                <div className="social-row">
                  <SocialLinks className="social-btn" only={["Instagram", "Pinterest"]} />
                </div>
              </div>
            </div>
          </div>

          <ProjectBriefPanel initialService={initialService} initialPackageParam={initialPackageParam} />
        </div>
      </section>

      <section className="contact-steps">
        <div className="inner">
          <p className="s-tag">What Happens Next</p>
          <div className="contact-step-grid reveal">
            <article><span>01</span><div><h3>We review your brief</h3><p>A specialist checks your product type, service needs, quantity and timing.</p></div></article>
            <article><span>02</span><div><h3>We clarify the details</h3><p>We ask only the questions needed to recommend the right development route.</p></div></article>
            <article><span>03</span><div><h3>We send the next steps</h3><p>We outline the scope, expected timeline and the next practical step for your collection.</p></div></article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq contact-faq" id="faq">
        <div className="inner">
          <div className="faq-layout">
            <div>
              <p className="s-tag">FAQ</p>
              <h2 className="s-title">Questions we <em>always hear.</em></h2>
              <p className="s-body" style={{ marginBottom: 32 }}>
                Honest answers to the most common questions from our clients. Still have something
                on your mind? Contact us and we can discuss your specific situation.
              </p>
              <ScrollTopLink className="btn btn-burg" targetId="get-in-touch">Ask Us Directly →</ScrollTopLink>
            </div>
            <FaqAccordion />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
