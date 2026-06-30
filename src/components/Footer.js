"use client";
import { useState } from "react";
import SocialLinks from "./SocialLinks";

// Link groups. On mobile each is a tap-to-open dropdown; on desktop they are
// always-open columns (controlled purely by CSS, so the toggle is inert there).
const GROUPS = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Shop", href: "/shop" },
      { label: "Blog", href: "/blog" },
      { label: "About Zameett", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Featured Services", href: "/services#featured" },
      { label: "How We Work", href: "/services#how-we-work" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "Get a Quote", href: "/contact#get-in-touch" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "hello@zameett.com", href: "mailto:hello@zameett.com" },
      { label: "WhatsApp", href: "https://wa.me/923246599699", external: true },
      { label: "Design-Only Enquiry", href: "/contact?service=fashion-tech-packs" },
    ],
  },
];

export default function Footer() {
  const [openTitle, setOpenTitle] = useState(null);

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              Zamee<span>tt</span>
            </a>
            <p className="footer-desc">
              Full-service modest fashion design and manufacturing from Pakistan — design only, or
              complete concept-to-doorstep service for brands, designers and boutiques worldwide.
            </p>
            <div className="footer-social">
              <SocialLinks className="f-social-btn" />
            </div>
          </div>

          <div className="footer-cols">
            {GROUPS.map((group) => {
              const open = openTitle === group.title;
              return (
                <div key={group.title} className={`footer-col${open ? " open" : ""}`}>
                  <button
                    type="button"
                    className="footer-col-head"
                    aria-expanded={open}
                    onClick={() => setOpenTitle(open ? null : group.title)}
                  >
                    <h2>{group.title}</h2>
                    <span className="footer-col-toggle" aria-hidden="true" />
                  </button>
                  <ul>
                    {group.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        ) : (
                          <a href={link.href}>{link.label}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Zameett. All rights reserved.</p>
          <p className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <span>·</span>
            <a href="/terms">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
