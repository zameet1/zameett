"use client";

import { useState } from "react";
import { SiAmericanexpress, SiApplepay, SiMastercard, SiVisa } from "react-icons/si";
import { WHATSAPP_URL } from "@/lib/contactLinks";
import SocialLinks from "./SocialLinks";

const GROUPS = [
  { title: "Explore", links: [
    { label: "Services", href: "/services" }, { label: "Portfolio", href: "/portfolio" },
    { label: "How It Works", href: "/how-it-works" }, { label: "Pricing", href: "/pricing" },
    { label: "About Zameett", href: "/about" },
  ] },
  { title: "Resources", links: [
    { label: "Blog & Guides", href: "/blog" }, { label: "Digital Shop", href: "/shop" },
    { label: "FAQ", href: "/faq" }, { label: "Supply Chain & QC", href: "/supply-chain" },
  ] },
  { title: "Policies", links: [
    { label: "Terms of Service", href: "/terms" }, { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund & Cancellation", href: "/refund-cancellation" }, { label: "Digital Product Licence", href: "/digital-product-licence" },
    { label: "Shipping & Delivery", href: "/shipping-delivery" }, { label: "All Policies", href: "/legal" },
  ] },
  { title: "Get in Touch", links: [
    { label: "hello@zameett.com", href: "mailto:hello@zameett.com" },
    { label: "WhatsApp", href: WHATSAPP_URL, external: true },
    { label: "Request a Quote", href: "/contact#get-in-touch" },
  ] },
];

export default function Footer() {
  const [openTitle, setOpenTitle] = useState(null);
  return <footer><div className="footer-inner"><div className="footer-top">
    <div className="footer-brand"><a href="/" className="footer-logo">Zamee<span>tt</span></a><p className="footer-desc">Fashion design and product-development support across apparel categories, with specialist modest-wear sampling and manufacturing from Pakistan.</p><p className="footer-location">Pakistan based <span>·</span> Working worldwide</p><div className="footer-social"><SocialLinks className="f-social-btn" only={["Instagram", "Pinterest"]} /></div></div>
    <div className="footer-cols">{GROUPS.map((group) => { const open = openTitle === group.title; return <div key={group.title} className={`footer-col${open ? " open" : ""}`}><button type="button" className="footer-col-head" aria-expanded={open} onClick={() => setOpenTitle(open ? null : group.title)}><h2>{group.title}</h2><span className="footer-col-toggle" aria-hidden="true" /></button><ul>{group.links.map((link) => <li key={link.label}>{link.external ? <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a> : <a href={link.href}>{link.label}</a>}</li>)}</ul></div>; })}</div>
  </div><div className="footer-bottom"><p>© 2026 Zameett. All rights reserved.</p><div className="footer-payment-methods" aria-label="Accepted payment methods"><small>We accept</small><div className="footer-payment-icons"><span className="payment-visa" title="Visa"><SiVisa aria-label="Visa" /></span><span className="payment-mastercard" title="Mastercard"><SiMastercard aria-label="Mastercard" /></span><span className="payment-amex" title="American Express"><SiAmericanexpress aria-label="American Express" /></span><span className="payment-apple" title="Apple Pay"><SiApplepay aria-label="Apple Pay" /></span></div></div><p className="footer-legal"><a href="/privacy">Privacy</a><span>·</span><a href="/terms">Terms</a><span>·</span><a href="/legal">Policies</a></p></div></div></footer>;
}
