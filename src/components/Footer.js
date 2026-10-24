"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCheck, FiMail, FiMessageCircle } from "react-icons/fi";
import { WHATSAPP_URL } from "@/lib/contactLinks";
import SocialLinks from "./SocialLinks";
import TrackedContactLink from "./TrackedContactLink";

const GROUPS = [
  {
    title: "Services",
    links: [
      { label: "Design & Tech Packs", href: "/services/fashion-tech-packs" },
      { label: "Textile Print Design", href: "/services/custom-textile-patterns" },
      { label: "Sampling & Fit Review", href: "/solutions/fashion-sampling-services" },
      { label: "Modest-Wear Manufacturing", href: "/services/clothing-manufacturing" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "About Zameett", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free Project Checklist", href: "/resources/fashion-development-brief-checklist" },
      { label: "Blog & Guides", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Supply Chain & Quality", href: "/supply-chain" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@zameett.com", href: "mailto:hello@zameett.com", contactChannel: "email" },
      { label: "WhatsApp", href: WHATSAPP_URL, external: true, contactChannel: "whatsapp" },
      { label: "Start Your Brief", href: "/contact#get-in-touch" },
    ],
  },
];

function FooterLink({ link }) {
  if (link.contactChannel) {
    return (
      <TrackedContactLink
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        channel={link.contactChannel}
        eventLocation="footer"
      >
        {link.label}
      </TrackedContactLink>
    );
  }
  return <Link href={link.href}>{link.label}</Link>;
}

export default function Footer() {
  const [openTitle, setOpenTitle] = useState(null);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <section className="footer-project-panel" aria-labelledby="footer-project-title">
          <div>
            <span>Not sure where to start?</span>
            <h2 id="footer-project-title">Tell us what you are building.</h2>
            <p>We review your brief, then confirm the suitable route, scope, timing and price before payment.</p>
          </div>
          <div className="footer-project-actions">
            <Link href="/contact#get-in-touch" className="footer-project-primary">Start Your Brief <FiArrowRight aria-hidden="true" /></Link>
            <TrackedContactLink href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" channel="whatsapp" eventLocation="footer_project_panel" className="footer-project-secondary"><FiMessageCircle aria-hidden="true" /> WhatsApp</TrackedContactLink>
          </div>
        </section>

        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="Zameett home">Zamee<span>tt</span></Link>
            <p className="footer-desc">Fashion design and technical development across apparel categories, with specialist modest-wear sampling and manufacturing support.</p>
            <ul className="footer-trust-list" aria-label="Project assurances">
              <li><FiCheck aria-hidden="true" /> Design-only projects welcome</li>
              <li><FiCheck aria-hidden="true" /> Sample before approved production</li>
              <li><FiCheck aria-hidden="true" /> Project-specific MOQ</li>
            </ul>
            <p className="footer-location">Pakistan based <span>·</span> Working worldwide</p>
            <div className="footer-contact-shortcuts">
              <TrackedContactLink href="mailto:hello@zameett.com" channel="email" eventLocation="footer_brand" aria-label="Email Zameett"><FiMail aria-hidden="true" /></TrackedContactLink>
              <SocialLinks className="f-social-btn" only={["Instagram", "Pinterest"]} />
            </div>
          </div>

          <div className="footer-cols">
            {GROUPS.map((group) => {
              const open = openTitle === group.title;
              const panelId = `footer-${group.title.toLowerCase()}-links`;
              return (
                <div key={group.title} className={`footer-col${open ? " open" : ""}`}>
                  <h2 className="footer-col-desktop-title">{group.title}</h2>
                  <button
                    type="button"
                    className="footer-col-head"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenTitle(open ? null : group.title)}
                  >
                    <span>{group.title}</span>
                    <span className="footer-col-toggle" aria-hidden="true" />
                  </button>
                  <div id={panelId} className="footer-col-panel">
                    <ul>{group.links.map((link) => <li key={link.label}><FooterLink link={link} /></li>)}</ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Zameett. All rights reserved.</p>
          <p className="footer-scope-note">Scope is confirmed before payment.</p>
          <p className="footer-legal"><Link href="/privacy">Privacy</Link><span>·</span><Link href="/terms">Terms</Link><span>·</span><Link href="/legal">All Policies</Link></p>
        </div>
      </div>
    </footer>
  );
}
