import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import ScrollTopLink from "@/components/ScrollTopLink";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Zameett for design-only enquiries or full manufacturing — fill in the form and we'll respond within 24 hours.",
};

export default function Contact() {
  return (
    <>
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; Contact</p>
          <h1>Let&rsquo;s bring your <em>collection to life.</em></h1>
          <p>
            Fill in the form and we will get back to you within 24 hours. Tell us as much or as
            little as you like — design only, full manufacturing, or anything in between. We will
            take it from there.
          </p>
        </div>
      </header>

      {/* CONTACT FORM */}
      <section className="contact-section">
        <div className="inner">
          <div className="reveal">
            <p className="s-tag">Get In Touch</p>
            <h2 className="s-title">Talk to a <em>modest wear specialist.</em></h2>
            <p className="s-body" style={{ marginBottom: 40 }}>
              No pressure and no commitment on the first call. We will listen to your vision and
              walk you through the right next steps for your brand.
            </p>
            <div className="contact-info-col">
              <div className="contact-detail">
                <span>Email</span>
                <a href="mailto:hello@zameett.com">hello@zameett.com</a>
              </div>
              <div className="contact-detail">
                <span>WhatsApp</span>
                <a href="#">+92 — Add Your Number</a>
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
                  <a href="#" className="social-btn">📸</a>
                  <a href="#" className="social-btn">💼</a>
                  <a href="#" className="social-btn">💬</a>
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
      <section className="faq">
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
              <ScrollTopLink className="btn btn-burg">Ask Us Directly →</ScrollTopLink>
            </div>
            <FaqAccordion />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
