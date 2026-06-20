
export default function Footer({ variant = "default" }) {
  const isShop = variant === "shop";

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <a href="/" className="footer-logo">
              Zamee<span>tt</span>
            </a>
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
                <li><a href="/digital">Tech Pack Template</a></li>
                <li><a href="/digital">Abaya Block Patterns</a></li>
                <li><a href="/digital">Sourcing Guide</a></li>
                <li><a href="/digital">Flat Sketch Library</a></li>
                <li><a href="/digital">Starter Kit Bundle</a></li>
              </ul>
            </div>
          ) : (
            <div className="footer-col">
              <h5>Services</h5>
              <ul>
                <li><a href="/services">Design Only</a></li>
                <li><a href="/services">Tech Packs</a></li>
                <li><a href="/services">Design Concept</a></li>
                <li><a href="/services">Embroidery &amp; Prints</a></li>
                <li><a href="/services">Full Manufacturing</a></li>
              </ul>
            </div>
          )}

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About Zameett</a></li>
              {!isShop && <li><a href="/about">Our Story</a></li>}
              <li><a href="/portfolio">Portfolio</a></li>
              {isShop && <li><a href="/services">Services</a></li>}
              <li><a href="/services">How We Work</a></li>
              <li><a href="/contact">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@zameett.com">hello@zameett.com</a></li>
              <li><a href="/contact">WhatsApp</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="/contact">Get a Quote</a></li>
              <li><a href="/contact">Design-Only Enquiry</a></li>
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
