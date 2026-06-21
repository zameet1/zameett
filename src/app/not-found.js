import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <section className="cta" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p className="s-tag">Error 404</p>
        <h1 className="s-title">This page took a <em>different path.</em></h1>
        <p className="cta-sub">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get
          you back to something beautiful.
        </p>
        <div className="cta-btns">
          <a href="/" className="btn btn-gold">Back to Home →</a>
          <a href="/portfolio" className="btn btn-outline-ivory">View Portfolio</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
