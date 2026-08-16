"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronDown, FiUser } from "react-icons/fi";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

const DESKTOP_LINKS = [

  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

const MOBILE_GROUPS = [
  {
    key: "services",
    label: "Services",
    links: [
      { href: "/services", label: "All Services" },
      { href: "/services/fashion-tech-packs", label: "Design & Tech Packs" },
      { href: "/services/custom-textile-patterns", label: "Textile & Print Design" },
      { href: "/solutions/fashion-sampling-services", label: "Sampling" },
      { href: "/services/clothing-manufacturing", label: "Modest-Wear Manufacturing" },
      { href: "/supply-chain", label: "Supply Chain & Quality" },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    links: [
      { href: "/blog", label: "Blog & Guides" },
      { href: "/shop", label: "Digital Shop" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

function InternalLink({ href, children, ...props }) {
  return <Link href={href} {...props}>{children}</Link>;
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [user, setUser] = useState(null);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/services") return pathname.startsWith("/services") || pathname.startsWith("/solutions") || pathname.startsWith("/supply-chain");
    return pathname.startsWith(href.split("#")[0]);
  };

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setOpen(false);
      setOpenGroup(null);
    }, 0);
    return () => window.clearTimeout(closeTimer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!hasSupabaseConfig()) return undefined;
    const supabase = createClient();
    let active = true;
    supabase.auth.getUser().then(({ data }) => active && setUser(data.user || null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  const accountHref = user ? "/account" : "/sign-in";
  const accountLabel = user ? "Profile" : "Sign In";
  const accountActive = pathname.startsWith("/sign-in") || pathname.startsWith("/account") || pathname.startsWith("/admin");

  return (
    <>
      <nav aria-label="Primary navigation">
        <InternalLink href="/" className="logo" aria-label="Zameett home">Zamee<span>tt</span></InternalLink>
        <ul className="nav-links">
          <li className="nav-resources nav-services">
            <button type="button" className={pathname.startsWith("/services") || pathname.startsWith("/solutions") || pathname.startsWith("/supply-chain") ? "active" : ""} aria-haspopup="true">
              Services <FiChevronDown aria-hidden="true" />
            </button>
            <div className="nav-resources-menu">
              <a href="/services">All Services</a>
              <a href="/services/fashion-tech-packs">Fashion Design &amp; Tech Packs</a>
              <a href="/services/custom-textile-patterns">Custom Textile Prints</a>
              <a href="/solutions/fashion-sampling-services">Sampling</a>
              <a href="/services/clothing-manufacturing">Modest-Wear Manufacturing</a>
              <a href="/supply-chain">Supply Chain &amp; Quality</a>
            </div>
          </li>
          {DESKTOP_LINKS.map((link) => {
            const active = isActive(link.href);
            return <li key={link.href}><InternalLink href={link.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{link.label}</InternalLink></li>;
          })}
          <li className="nav-resources">
            <button type="button" className={pathname.startsWith("/blog") || pathname.startsWith("/shop") ? "active" : ""} aria-haspopup="true">Resources <FiChevronDown aria-hidden="true" /></button>
            <div className="nav-resources-menu">
              <a href="/blog">Blog & Guides</a>
              <a href="/shop">Digital Shop</a>
              <a href="/faq">FAQ</a>
            </div>
          </li>
          <li><InternalLink href={accountHref} className={`nav-account${accountActive ? " active" : ""}`}><FiUser aria-hidden="true" /><span>{accountLabel}</span></InternalLink></li>
          <li><InternalLink href="/contact#get-in-touch" className="nav-cta btn">Get a Quote <span aria-hidden="true">→</span></InternalLink></li>
        </ul>
        <button type="button" className={`nav-toggle${open ? " open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((current) => !current)}><span /><span /><span /></button>
      </nav>
      <button type="button" className={`mobile-menu-backdrop${open ? " open" : ""}`} aria-label="Close menu" onClick={() => setOpen(false)} />
      <div id="mobile-navigation" className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <span className="mobile-menu-label">Navigate</span>
        <InternalLink href="/" className={pathname === "/" ? "active mobile-menu-direct" : "mobile-menu-direct"} onClick={() => setOpen(false)}>Home</InternalLink>
        {MOBILE_GROUPS.map((group) => {
          const expanded = openGroup === group.key;
          const groupActive = group.links.some((link) => isActive(link.href));
          const panelId = `mobile-${group.key}-links`;
          return <div className={`mobile-nav-group${expanded ? " open" : ""}`} key={group.key}>
            <button type="button" className={`mobile-nav-group-head${groupActive ? " active" : ""}`} aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpenGroup(expanded ? null : group.key)}><span>{group.label}</span><FiChevronDown aria-hidden="true" /></button>
            <div id={panelId} className="mobile-nav-submenu">{group.links.map((link) => <InternalLink key={link.href} href={link.href} className={isActive(link.href) ? "active" : ""} onClick={() => setOpen(false)}>{link.label}</InternalLink>)}</div>
          </div>;
        })}
        {[{ href: "/portfolio", label: "Portfolio" }, { href: "/how-it-works", label: "How It Works" }, { href: "/pricing", label: "Pricing" }, { href: "/about", label: "About" }].map((link) => <InternalLink key={link.href} href={link.href} className={isActive(link.href) ? "active mobile-menu-direct" : "mobile-menu-direct"} onClick={() => setOpen(false)}>{link.label}</InternalLink>)}
        <InternalLink href={accountHref} className="mobile-account-link" onClick={() => setOpen(false)}><FiUser aria-hidden="true" /> {accountLabel}</InternalLink>
        <InternalLink href="/contact#get-in-touch" className="mobile-quote-link" onClick={() => setOpen(false)}>Get a Quote <span aria-hidden="true">→</span></InternalLink>
      </div>
    </>
  );
}
