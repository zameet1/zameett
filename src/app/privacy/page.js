import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "How Zameett collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <>
      <header className="page-hero legal-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Privacy Policy</p>
          <h1>Privacy <em>Policy</em></h1>
          <p>Last updated: July 2026</p>
        </div>
      </header>

      <section className="services legal-page">
        <div className="inner" style={{ maxWidth: 760 }}>
          <p className="s-body" style={{ marginBottom: 18 }}>
            This Privacy Policy explains how Zameett (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
            uses and protects the information you provide when you use{" "}
            <a href="https://zameett.com" style={{ color: "var(--gold-deep)", textDecoration: "underline" }}>zameett.com</a>.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Information we collect</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            When you submit our contact or checkout forms, we collect the details you provide —
            such as your name, email address, phone/WhatsApp number, country and any message or
            order details. We also collect anonymous usage data (pages visited, device/browser
            type) through Google Analytics to understand how the site is used.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>How we use it</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            We use your information only to respond to your enquiry, process and follow up on
            orders (including sending a payment link), and improve our website and services. We do
            not sell or rent your personal information to anyone.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Third-party services</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            Form submissions are delivered to us via Web3Forms, analytics are provided by Google
            Analytics, and digital-product payments are processed securely by Stripe. These
            providers process data on our behalf according to their own privacy policies. We do
            not receive or store your full card details on our servers.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Cookies</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            We use essential cookies for the site to function and analytics cookies to measure
            traffic. You can disable cookies in your browser settings at any time.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Your rights</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            You may request access to, correction of, or deletion of the personal information we
            hold about you at any time by emailing{" "}
            <a href="mailto:hello@zameett.com" style={{ color: "var(--gold-deep)", textDecoration: "underline" }}>hello@zameett.com</a>.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Contact</h2>
          <p className="s-body">
            Questions about this policy? Email{" "}
            <a href="mailto:hello@zameett.com" style={{ color: "var(--gold-deep)", textDecoration: "underline" }}>hello@zameett.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
