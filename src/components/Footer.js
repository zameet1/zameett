import Link from "next/link";

export default function Footer({ variant = "default" }) {
  const isShop = variant === "shop";

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-logo">
              Zamee<span>tt</span>
            </Link>
            <p className="footer-desc">
              Full-service modest fashion design and manufacturing from Pakistan. Design only, or
              complete concept-to-doorstep service. We serve brands, designers and boutiques
              worldwide.
            </p>
            <div className="footer-social">
              <a href="#" className="f-social-btn">📸</a>
              <a href="#" className="f-social-btn">💼</a>
              <a href="#" className="f-social-btn">💬</a>
              <a href="#" className="f-social-btn">📌</a>
            </div>
          </div>

          {isShop ? (
            <div className="footer-col">
              <h5>Shop</h5>
              <ul>
                <li><Link href="/digital">Tech Pack Template</Link></li>
                <li><Link href="/digital">Abaya Block Patterns</Link></li>
                <li><Link href="/digital">Sourcing Guide</Link></li>
                <li><Link href="/digital">Flat Sketch Library</Link></li>
                <li><Link href="/digital">Starter Kit Bundle</Link></li>
              </ul>
            </div>
          ) : (
            <div className="footer-col">
              <h5>Services</h5>
              <ul>
                <li><Link href="/services">Design Only</Link></li>
                <li><Link href="/services">Tech Packs</Link></li>
                <li><Link href="/services">Design Concept</Link></li>
                <li><Link href="/services">Embroidery &amp; Prints</Link></li>
                <li><Link href="/services">Full Manufacturing</Link></li>
              </ul>
            </div>
          )}

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About Zameett</Link></li>
              {!isShop && <li><Link href="/about">Our Story</Link></li>}
              <li><Link href="/portfolio">Portfolio</Link></li>
              {isShop && <li><Link href="/services">Services</Link></li>}
              <li><Link href="/services">How We Work</Link></li>
              <li><Link href="/contact">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@zameett.com">hello@zameett.com</a></li>
              <li><Link href="/contact">WhatsApp</Link></li>
              <li><a href="#">Instagram</a></li>
              <li><Link href="/contact">Get a Quote</Link></li>
              <li><Link href="/contact">Design-Only Enquiry</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Zameett. All rights reserved.</p>
          <p>Modest Fashion Design &amp; Manufacturing · Based in Pakistan · Serving the World</p>
        </div>
      </div>
    </footer>
  );
}
