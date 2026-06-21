import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service",
  description: "The terms governing the use of the Zameett website and services.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <>
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Terms of Service</p>
          <h1>Terms of <em>Service</em></h1>
          <p>Last updated: June 2026</p>
        </div>
      </header>

      <section className="services">
        <div className="inner" style={{ maxWidth: 760 }}>
          <p className="s-body" style={{ marginBottom: 18 }}>
            By using zameett.com and engaging our services, you agree to the following terms.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Services</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            Zameett provides modest fashion design and manufacturing services, including design and
            tech packs, sampling, production, and digital products. Specific scope, pricing,
            timelines and minimum order quantities are agreed per project before work begins.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Orders &amp; payment</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            Placing an order through the site is a request, not a completed sale. We will confirm
            availability and send a secure payment link to complete your purchase. Production begins
            only after payment and, where applicable, sample approval.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Digital products</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            Digital products (tech-pack templates, patterns, guides) are licensed for your own
            brand use and may not be resold or redistributed. Due to their nature, digital products
            are non-refundable once delivered.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Intellectual property</h2>
          <p className="s-body" style={{ marginBottom: 18 }}>
            Designs we create for you become yours on full payment. Website content, branding and
            imagery remain the property of Zameett.
          </p>

          <h2 className="s-title" style={{ fontSize: 24, marginTop: 32 }}>Contact</h2>
          <p className="s-body">
            Questions about these terms? Email{" "}
            <a href="mailto:hello@zameett.com" style={{ color: "var(--gold)" }}>hello@zameett.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
