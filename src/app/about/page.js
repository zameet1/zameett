import Link from "next/link";
import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";

export const metadata = {
  title: "About",
  description:
    "Zameett is a Pakistan-based design and manufacturing partner built for modest fashion brands, independent designers and boutique owners — design only or full concept-to-doorstep service.",
};

export default function About() {
  return (
    <>
      {/* PAGE HERO */}
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; About</p>
          <h1>We speak <em>modest fashion</em> fluently.</h1>
          <p>
            Zameett is a Pakistan-based design and manufacturing partner built specifically for
            modest fashion brands, independent designers and boutique owners who refuse to
            compromise on their vision.
          </p>
        </div>
      </header>

      {/* ABOUT */}
      <section className="about">
        <div className="inner">
          <div className="reveal">
            <p className="s-tag">About Zameett</p>
            <h2 className="s-title">Specialists, <em>not generalists.</em></h2>
            <p className="s-body" style={{ marginBottom: 18 }}>
              We specialise in modest wear — abayas, bias cuts, scarves, embellished formal pieces
              — and nothing else. That specialisation is our greatest strength. We understand the
              silhouettes, fabrics, construction methods and cultural standards that make modest
              fashion what it is.
            </p>
            <p className="s-body" style={{ marginBottom: 0 }}>
              From your first sketch to your customer&rsquo;s door — or just the design stage —
              Zameett is built to serve you at every level of your brand&rsquo;s journey.
            </p>
            <div className="values">
              <div className="val"><h4>Flexible Services</h4><p>Design only or full manufacturing — you choose your level of involvement.</p></div>
              <div className="val"><h4>Culturally Rooted</h4><p>We understand modest fashion aesthetically, technically and culturally.</p></div>
              <div className="val"><h4>Transparent Process</h4><p>Updated at every stage. No surprises. No hidden costs. No confusion.</p></div>
              <div className="val"><h4>Flexible MOQs</h4><p>Small brands and growing labels are equally welcome here.</p></div>
            </div>
          </div>
          <div className="about-grid reveal">
            <div className="about-ph"><CoverImage src="/images/30.jpeg" objectPosition="center 30%" alt="Fabric swatch library" sizes="(max-width: 960px) 50vw, 25vw" /></div>
            <div className="about-ph"><CoverImage src="/images/26.jpeg" objectPosition="center 20%" alt="Hand embellishment detail" sizes="(max-width: 960px) 50vw, 25vw" /></div>
            <div className="about-ph wide"><CoverImage src="/images/27.jpeg" objectPosition="center 30%" alt="Finished collection on the rail" sizes="(max-width: 960px) 100vw, 50vw" /></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="inner">
          <div className="stat"><div className="stat-num">50+</div><div className="stat-lbl">Clients Served</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">100%</div><div className="stat-lbl">End-to-End Capable</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">5+</div><div className="stat-lbl">Years Experience</div></div>
          <div className="stat-sep"></div>
          <div className="stat"><div className="stat-num">🌍</div><div className="stat-lbl">Worldwide Delivery</div></div>
        </div>
      </div>

      {/* EXPERIENCE / OUR STORY */}
      <section className="experience">
        <div className="inner">
          <div className="exp-photos reveal">
            <div className="exp-ph tall"><CoverImage src="/images/13.jpeg" objectPosition="center 35%" alt="Zameett production floor" sizes="(max-width: 960px) 50vw, 25vw" /></div>
            <div className="exp-ph"><CoverImage src="/images/14.jpeg" objectPosition="center 30%" alt="Digital tech pack" sizes="(max-width: 960px) 50vw, 25vw" /></div>
            <div className="exp-ph"><CoverImage src="/images/31.jpeg" objectPosition="center 30%" alt="Design and embroidery development" sizes="(max-width: 960px) 50vw, 25vw" /></div>
          </div>
          <div className="reveal">
            <p className="s-tag">Our Story</p>
            <h2 className="s-title">We&rsquo;ve seen what happens when <em>manufacturers don&rsquo;t understand.</em></h2>
            <p className="s-body" style={{ marginBottom: 18 }}>
              Over the years we have worked with many clients — small brands, independent
              designers, boutique owners — who came to us for designs and tech packs and then took
              those files to their own manufacturers.
            </p>
            <p className="s-body" style={{ marginBottom: 18 }}>
              In too many cases, the manufacturer simply did not understand modest wear
              construction. The drape was wrong. The proportions were off. Cultural construction
              details were ignored entirely. Clients returned devastated — designs ruined, seasons
              delayed, budgets gone.
            </p>
            <blockquote>
              <p>&ldquo;They handed my tech pack to a manufacturer who had never made an abaya before. The entire collection came back wrong. We had to start everything over from scratch.&rdquo;</p>
            </blockquote>
            <p className="s-body" style={{ marginBottom: 40 }}>
              This is exactly why Zameett offers both paths. Come for designs and tech packs only —
              we build files any good factory can follow. Or let us handle manufacturing too, so
              your vision is never lost in translation.
            </p>
            <Link href="/contact" className="btn btn-burg">Let&rsquo;s Talk About Your Project →</Link>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="clients">
        <div className="inner">
          <div className="reveal">
            <p className="s-tag">Who We Serve</p>
            <h2 className="s-title">Built for <em>every stage</em> of your modest fashion journey.</h2>
            <p className="s-body">
              We work with businesses and creatives at every level — from first-collection
              launchers to established scaling labels. What matters to us is your vision, your
              standards and your commitment to the craft of modest fashion.
            </p>
          </div>
          <div className="c-list reveal">
            <div className="c-item">
              <div className="c-dot">✦</div>
              <div><h4>Small Modest Fashion Brands</h4><p>Launching your first collection? We support small MOQs and guide you through every step from idea to finished product.</p></div>
            </div>
            <div className="c-item">
              <div className="c-dot">✏️</div>
              <div><h4>Independent Designers</h4><p>Need designs and tech packs only? We create complete production-ready files you can hand to any manufacturer, anywhere.</p></div>
            </div>
            <div className="c-item">
              <div className="c-dot">🏪</div>
              <div><h4>Boutique Owners</h4><p>Custom-manufactured modest wear with your own branding and label — exclusive to your boutique, built to your standards.</p></div>
            </div>
            <div className="c-item">
              <div className="c-dot">📈</div>
              <div><h4>Growing Labels</h4><p>Ready to scale your production? We handle larger volumes without ever compromising on quality, accuracy or brand identity.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO BREAK */}
      <div className="photo-break">
        <CoverImage src="/images/28.jpeg" objectPosition="center 35%" alt="Zameett collection moodboard" />
        <div className="pb-overlay">
          <div className="pb-content">
            <p className="pb-tag">Our Philosophy</p>
            <h2 className="pb-h">&ldquo;Your vision, executed with precision and cultural understanding.&rdquo;</h2>
            <p className="pb-p">Crafted from Pakistan and delivered to the world — modest wear made by people who understand it.</p>
            <Link href="/portfolio" className="btn btn-gold">See Our Work →</Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta">
        <p className="s-tag">Work With Us</p>
        <h2 className="s-title">A partner that <em>understands your craft.</em></h2>
        <p className="cta-sub">
          Design only or the full journey — tell us your vision and we will make it a reality.
          Pakistan-crafted, world-delivered.
        </p>
        <div className="cta-btns">
          <Link href="/contact" className="btn btn-gold">Start Your Project →</Link>
          <Link href="/services" className="btn btn-outline-ivory">View Services</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
