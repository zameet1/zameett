import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQS } from "@/components/faqData";
import ScrollTopLink from "@/components/ScrollTopLink";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import JsonLd from "@/components/JsonLd";

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
    "Get in touch with Zameett for a modest fashion design or manufacturing quote — fill in the form and we'll respond within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Zameett | Get a Modest Fashion Design & Manufacturing Quote",
    description:
      "Design only or full manufacturing — tell us your vision and we'll respond within 24 hours with a clear path and quote.",
    url: "/contact",
    images: [{ url: "/images/26.jpeg", width: 1200, height: 630, alt: "Hand embellishment detail on a Zameett modest wear piece" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Zameett | Get a Modest Fashion Design & Manufacturing Quote",
    description: "Design only or full manufacturing — tell us your vision and we'll respond within 24 hours.",
    images: ["/images/26.jpeg"],
  },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Contact</p>
          <h1>Let&rsquo;s bring your <em>collection to life.</em></h1>
          <p>
            Fill in the form and we will get back to you within 24 hours. Tell us as much or as
            little as you like — design only, full manufacturing, or anything in between. We will
            take it from there.
          </p>
        </div>
      </header>

      {/* CONTACT FORM */}
      <section className="contact-section" id="get-in-touch">
        <div className="inner">
          <div className="reveal">
            <p className="s-tag">Get In Touch</p>
            <h2 className="s-title">Talk to a <em>modest wear specialist.</em></h2>
            <p className="s-body" style={{ marginBottom: 24 }}>
              No pressure and no commitment on the first call. We will listen to your vision and
              walk you through the right next steps for your brand.
            </p>
            <div className="contact-quick">
              <a
                href="https://wa.me/923246599699"
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
              <span aria-hidden="true">⚡</span> Average reply time — within 24 hours
            </p>
            <div className="contact-info-col">
              <div className="contact-detail">
                <span>Email</span>
                <a href="mailto:hello@zameett.com">hello@zameett.com</a>
              </div>
              <div className="contact-detail">
                <span>WhatsApp</span>
                <a href="https://wa.me/923246599699" target="_blank" rel="noopener noreferrer">+92 324 6599699</a>
              </div>
              <div className="contact-detail">
                <span>Based In</span>
                <p>Pakistan — Shipping Worldwide</p>
              </div>
              <div className="contact-detail">
                <span>Specialisation</span>
                <p>Modest Fashion, Abayas &amp; Modest Wear</p>
              </div>
              <div className="contact-detail">
                <span>Response Time</span>
                <p>Within 24 hours, every enquiry</p>
              </div>
              <div className="contact-detail">
                <span>Follow Us</span>
                <div className="social-row">
                  <SocialLinks className="social-btn" />
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="inner">
          <div className="faq-layout">
            <div>
              <p className="s-tag">FAQ</p>
              <h2 className="s-title">Questions we <em>always hear.</em></h2>
              <p className="s-body" style={{ marginBottom: 32 }}>
                Honest answers to the most common questions from our clients. Still have something
                on your mind? Reach out directly — we are always happy to talk through your
                specific situation.
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
