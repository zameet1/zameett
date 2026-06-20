import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";

export const metadata = {
  title: "Digital Products",
  description:
    "Ready-made tech-pack templates, graded patterns, sourcing guides and motif packs for modest fashion brands — instant download, production-grade, fully editable.",
};

export default function Digital() {
  return (
    <>
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; Digital Products</p>
          <h1>Launch faster with <em>ready-made design tools.</em></h1>
          <p>
            Tech-pack templates, graded patterns, sourcing guides and motif packs — the same
            professional files we build for our clients, available to download instantly and use
            with any manufacturer.
          </p>
        </div>
      </header>

      {/* PRODUCTS */}
      <section className="services">
        <div className="inner">
          <div className="svc-head reveal">
            <div>
              <p className="s-tag">The Shop</p>
              <h2 className="s-title">Digital products for <em>modest fashion brands.</em></h2>
            </div>
            <p className="s-body">
              Built for designers and founders who want a head start. Every file is
              production-grade, fully editable, and made specifically for modest wear. Instant
              download — yours forever.
            </p>
          </div>

          <div className="dp-grid reveal">
            <div className="dp-card">
              <div className="dp-thumb">
                <div className="dp-formats"><span className="dp-fmt">PDF</span><span className="dp-fmt">AI</span></div>
                <span className="dp-instant">Instant Download</span>
                <CoverImage src="/images/14.jpeg" objectPosition="center 40%" alt="Tech pack template" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="dp-body">
                <div className="dp-cat">Tech Packs</div>
                <h3>Modest Wear <em>Tech Pack Template</em></h3>
                <p>A fully editable, factory-ready tech-pack template designed around modest silhouettes — drop in your own flats and specs.</p>
                <ul className="dp-incl">
                  <li>Editable spec, BOM &amp; measurement sheets</li>
                  <li>Construction &amp; stitch-detail pages</li>
                  <li>Sample tech pack + how-to guide</li>
                </ul>
                <div className="dp-foot">
                  <div className="dp-price"><span className="now">$49</span><span className="was">$69</span></div>
                  <AddToCartButton className="dp-buy" name="Tech Pack Template" price={49}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>

            <div className="dp-card">
              <div className="dp-thumb">
                <div className="dp-formats"><span className="dp-fmt">PDF</span><span className="dp-fmt">DXF</span></div>
                <span className="dp-instant">Instant Download</span>
                <CoverImage src="/images/31.jpeg" objectPosition="center 30%" alt="Abaya block patterns" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="dp-body">
                <div className="dp-cat">Patterns</div>
                <h3>Abaya <em>Block Pattern Set</em></h3>
                <p>Graded base blocks for open and closed abayas — a tested starting point you can adapt into your own styles.</p>
                <ul className="dp-incl">
                  <li>Sizes XS–XXL, print &amp; plotter ready</li>
                  <li>Open abaya + closed abaya blocks</li>
                  <li>Seam allowance &amp; grading notes</li>
                </ul>
                <div className="dp-foot">
                  <div className="dp-price"><span className="now">$39</span></div>
                  <AddToCartButton className="dp-buy" name="Abaya Block Pattern Set" price={39}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>

            <div className="dp-card">
              <div className="dp-thumb">
                <div className="dp-formats"><span className="dp-fmt">PDF</span></div>
                <span className="dp-instant">Instant Download</span>
                <CoverImage src="/images/30.jpeg" objectPosition="center 35%" alt="Fabric sourcing guide" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="dp-body">
                <div className="dp-cat">Sourcing</div>
                <h3>Fabric &amp; Trims <em>Sourcing Guide</em></h3>
                <p>Our working reference for modest-wear fabrics — weights, drape, best uses and the colour families we run most.</p>
                <ul className="dp-incl">
                  <li>Crepe, silk, nida, chiffon &amp; satin breakdown</li>
                  <li>Colour family &amp; finish reference</li>
                  <li>Questions to ask any fabric supplier</li>
                </ul>
                <div className="dp-foot">
                  <div className="dp-price"><span className="now">$29</span></div>
                  <AddToCartButton className="dp-buy" name="Fabric & Trims Sourcing Guide" price={29}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>

            <div className="dp-card">
              <div className="dp-thumb">
                <div className="dp-formats"><span className="dp-fmt">AI</span><span className="dp-fmt">PNG</span></div>
                <span className="dp-instant">Instant Download</span>
                <CoverImage src="/images/28.jpeg" objectPosition="center 30%" alt="Flat sketch CAD library" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="dp-body">
                <div className="dp-cat">Flats &amp; CADs</div>
                <h3>Modest Silhouette <em>Flat Sketch Library</em></h3>
                <p>100+ editable vector flats — abayas, kaftans, kimonos, slips and shawls — to build tech packs and line sheets fast.</p>
                <ul className="dp-incl">
                  <li>100+ front &amp; back vector flats</li>
                  <li>Fully recolourable &amp; resizable</li>
                  <li>Organised by garment category</li>
                </ul>
                <div className="dp-foot">
                  <div className="dp-price"><span className="now">$59</span><span className="was">$89</span></div>
                  <AddToCartButton className="dp-buy" name="Flat Sketch Library" price={59}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>

            <div className="dp-card">
              <div className="dp-thumb">
                <div className="dp-formats"><span className="dp-fmt">PNG</span><span className="dp-fmt">AI</span></div>
                <span className="dp-instant">Instant Download</span>
                <CoverImage src="/images/03.jpeg" objectPosition="center 18%" alt="Print and embroidery motif pack" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="dp-body">
                <div className="dp-cat">Prints &amp; Embroidery</div>
                <h3>Print &amp; <em>Embroidery Motif Pack</em></h3>
                <p>Original florals, geometrics and border motifs — print-ready repeats and embroidery placements for your collections.</p>
                <ul className="dp-incl">
                  <li>30+ seamless repeats &amp; placements</li>
                  <li>Layered, recolourable artwork</li>
                  <li>Commercial licence included</li>
                </ul>
                <div className="dp-foot">
                  <div className="dp-price"><span className="now">$35</span></div>
                  <AddToCartButton className="dp-buy" name="Print & Embroidery Motif Pack" price={35}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>

            <div className="dp-card">
              <div className="dp-thumb">
                <div className="dp-formats"><span className="dp-fmt">PDF</span></div>
                <span className="dp-instant">Instant Download</span>
                <CoverImage src="/images/27.jpeg" objectPosition="center 30%" alt="Launch planner" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="dp-body">
                <div className="dp-cat">Planning</div>
                <h3>Collection <em>Launch Planner</em></h3>
                <p>A step-by-step workbook to take a modest collection from concept to launch — timelines, costings and checklists.</p>
                <ul className="dp-incl">
                  <li>Range plan &amp; costing templates</li>
                  <li>Production timeline &amp; checklist</li>
                  <li>Tech-pack &amp; sampling tracker</li>
                </ul>
                <div className="dp-foot">
                  <div className="dp-price"><span className="now">$25</span></div>
                  <AddToCartButton className="dp-buy" name="Collection Launch Planner" price={25}>Add to Cart</AddToCartButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BUNDLE */}
      <section className="bundle">
        <div className="inner">
          <div className="bundle-media reveal">
            <div className="b-img tall"><CoverImage src="/images/14.jpeg" objectPosition="center 40%" alt="Tech packs" sizes="(max-width: 960px) 50vw, 25vw" /></div>
            <div className="b-img"><CoverImage src="/images/30.jpeg" objectPosition="center 35%" alt="Swatches" sizes="(max-width: 960px) 50vw, 25vw" /></div>
            <div className="b-img"><CoverImage src="/images/31.jpeg" objectPosition="center 30%" alt="Design development" sizes="(max-width: 960px) 50vw, 25vw" /></div>
          </div>
          <div className="reveal">
            <p className="s-tag">Best Value · Save 40%</p>
            <h2 className="s-title">The Modest Brand <em>Starter Kit.</em></h2>
            <p className="why-body" style={{ color: "rgba(250,247,242,.6)" }}>
              Everything you need to launch a modest label professionally — all six digital
              products bundled together at one price.
            </p>
            <ul className="bundle-list">
              <li>Tech Pack Template</li>
              <li>Abaya Block Patterns</li>
              <li>Sourcing Guide</li>
              <li>Flat Sketch Library</li>
              <li>Motif Pack</li>
              <li>Launch Planner</li>
            </ul>
            <div className="bundle-cta">
              <div className="bundle-price"><span className="now">$129</span><span className="was">$236</span></div>
              <AddToCartButton
                className="dp-buy"
                style={{ padding: "15px 32px" }}
                name="The Modest Brand Starter Kit"
                price={129}
              >
                Get the Bundle →
              </AddToCartButton>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="inside">
        <div className="inner">
          <div className="inside-media reveal"><CoverImage src="/images/31.jpeg" objectPosition="center 30%" alt="Inside a tech pack" sizes="(max-width: 960px) 100vw, 50vw" /></div>
          <div className="reveal">
            <p className="s-tag">Made Properly</p>
            <h2 className="s-title">What goes into <em>every file.</em></h2>
            <ul className="inside-checks">
              <li><span className="ic-n">01</span><div><h4>Factory-Ready Detail</h4><p>The same level of spec we hand our own production floor — nothing left to guesswork.</p></div></li>
              <li><span className="ic-n">02</span><div><h4>Fully Editable</h4><p>Open files you can adapt to your own styles, branding and measurements.</p></div></li>
              <li><span className="ic-n">03</span><div><h4>Modest-Wear Specific</h4><p>Built around abayas, kaftans and modest silhouettes — not generic fashion blocks.</p></div></li>
              <li><span className="ic-n">04</span><div><h4>Guided &amp; Documented</h4><p>Each product includes a how-to guide so you know exactly how to use it.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW DELIVERY WORKS */}
      <section className="deliver">
        <div className="inner">
          <div className="t-head reveal" style={{ textAlign: "center" }}>
            <p className="s-tag" style={{ justifyContent: "center" }}>Simple &amp; Instant</p>
            <h2 className="s-title">How it <em>works.</em></h2>
          </div>
          <div className="dl-row reveal">
            <div className="dl-step"><div className="dl-ico">1</div><h4>Choose &amp; Checkout</h4><p>Pick a single product or the full bundle and check out securely in minutes.</p></div>
            <div className="dl-step"><div className="dl-ico">2</div><h4>Download Instantly</h4><p>Your files are delivered straight to your inbox the moment payment clears.</p></div>
            <div className="dl-step"><div className="dl-ico">3</div><h4>Build &amp; Launch</h4><p>Use them with any manufacturer — or bring them back to us to produce.</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <p className="s-tag">Need Something Custom?</p>
        <h2 className="s-title">Want a tech pack made <em>just for your design?</em></h2>
        <p className="cta-sub">Our digital products are a head start — but we also build bespoke designs and tech packs from scratch. Tell us what you need.</p>
        <div className="cta-btns">
          <Link href="/contact" className="btn btn-gold">Request Custom Work →</Link>
          <Link href="/services" className="btn btn-outline-ivory">View Services</Link>
        </div>
      </section>
      <Footer variant="shop" />
    </>
  );
}
