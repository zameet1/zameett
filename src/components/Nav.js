"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiUser } from "react-icons/fi";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

const SERVICE_LINKS = [
  {
    href: "/services/fashion-tech-packs",
    label: "Design & Tech Packs",
    description: "Concepts, technical drawings and production-ready files.",
  },
  {
    href: "/services/custom-textile-patterns",
    label: "Textile Print Design",
    description: "Original repeats, placements and supplier-ready artwork.",
  },
  {
    href: "/solutions/fashion-sampling-services",
    label: "Sampling & Fit Review",
    description: "Prototype development, fit decisions and corrections.",
  },
  {
    href: "/services/clothing-manufacturing",
    label: "Modest-Wear Manufacturing",
    description: "Project-scoped support for abayas and modest collections.",
  },
];

const RESOURCE_LINKS = [
  { href: "/blog", label: "Blog & Guides", description: "Practical fashion-development guidance." },
  {
    href: "/resources/fashion-development-brief-checklist",
    label: "Free Project Checklist",
    description: "Prepare a clearer brief before requesting a quote.",
  },
  { href: "/faq", label: "FAQ", description: "Scope, payment, timing and process answers." },
  { href: "/about", label: "About Zameett", description: "Our focus, founders and way of working." },
];

const DESKTOP_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-it-works", label: "Process" },
  { href: "/pricing", label: "Pricing" },
];

const MOBILE_GROUPS = [
  {
    key: "services",
    label: "Services",
    links: [{ href: "/services", label: "All Services" }, ...SERVICE_LINKS],
  },
  {
    key: "resources",
    label: "Guides & Company",
    links: RESOURCE_LINKS,
  },
];

function InternalLink({ href, children, ...props }) {
  return <Link href={href} {...props}>{children}</Link>;
}

function DropdownLinks({ links, pathname, isActive }) {
  return links.map((link) => {
    const current = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
    return (
      <InternalLink
        href={link.href}
        className={`nav-menu-item${isActive(link.href) ? " active" : ""}`}
        aria-current={current ? "page" : undefined}
        key={link.href}
      >
        <span>{link.label}</span>
        <small>{link.description}</small>
      </InternalLink>
    );
  });
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [user, setUser] = useState(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const serviceTriggerRef = useRef(null);
  const resourceTriggerRef = useRef(null);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/services") {
      return pathname.startsWith("/services") || pathname.startsWith("/solutions") || pathname.startsWith("/supply-chain");
    }
    return pathname.startsWith(href.split("#")[0]);
  };

  const servicesActive = isActive("/services");
  const resourcesActive = RESOURCE_LINKS.some((link) => isActive(link.href));

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setOpen(false);
      setOpenGroup(null);
      setDesktopMenu(null);
    }, 0);
    return () => window.clearTimeout(closeTimer);
  }, [pathname]);

  useEffect(() => {
    function closeDesktopMenu(event) {
      if (navRef.current && !navRef.current.contains(event.target)) setDesktopMenu(null);
    }
    function closeDesktopMenuOnScroll() {
      setDesktopMenu(null);
    }
    document.addEventListener("pointerdown", closeDesktopMenu);
    window.addEventListener("scroll", closeDesktopMenuOnScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", closeDesktopMenu);
      window.removeEventListener("scroll", closeDesktopMenuOnScroll);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1121px)");
    function closeMobileMenuAtDesktop(event) {
      if (!event.matches) return;
      setOpen(false);
      setOpenGroup(null);
    }
    closeMobileMenuAtDesktop(desktopQuery);
    desktopQuery.addEventListener("change", closeMobileMenuAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeMobileMenuAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const menu = mobileMenuRef.current;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      menu?.querySelector("a, button")?.focus();
    });

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const focusable = [...menu.querySelectorAll("a, button:not([disabled])")]
        .filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!desktopMenu) return undefined;
    function onKeyDown(event) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      const trigger = desktopMenu === "services" ? serviceTriggerRef.current : resourceTriggerRef.current;
      setDesktopMenu(null);
      trigger?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [desktopMenu]);

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

  function closeMobileMenu({ restoreFocus = false } = {}) {
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => toggleRef.current?.focus());
  }

  return (
    <>
      <nav ref={navRef} className="site-header" aria-label="Primary navigation">
        <InternalLink href="/" className="header-brand" aria-label="Zameett home">
          <span className="logo">Zamee<span>tt</span></span>
          <small>Fashion development studio</small>
        </InternalLink>
        <ul className="nav-links">
          <li
            className={`nav-resources nav-services${desktopMenu === "services" ? " open" : ""}`}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setDesktopMenu(null);
            }}
          >
            <button
              ref={serviceTriggerRef}
              type="button"
              className={`nav-menu-trigger${servicesActive ? " active" : ""}`}
              aria-haspopup="true"
              aria-expanded={desktopMenu === "services"}
              aria-controls="desktop-services-menu"
              onClick={() => setDesktopMenu((current) => current === "services" ? null : "services")}
            >
              Services <FiChevronDown aria-hidden="true" />
            </button>
            <div id="desktop-services-menu" className="nav-resources-menu nav-services-menu">
              <div className="nav-menu-intro">
                <small>Choose your starting point</small>
                <strong>What does your collection need now?</strong>
              </div>
              <div className="nav-menu-grid">
                <DropdownLinks links={SERVICE_LINKS} pathname={pathname} isActive={isActive} />
              </div>
              <InternalLink href="/services" className="nav-menu-footer">View all services <span aria-hidden="true">→</span></InternalLink>
            </div>
          </li>
          {DESKTOP_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <InternalLink href={link.href} className={`nav-direct-link${active ? " active" : ""}`} aria-current={active ? "page" : undefined}>{link.label}</InternalLink>
              </li>
            );
          })}
          <li
            className={`nav-resources${desktopMenu === "resources" ? " open" : ""}`}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setDesktopMenu(null);
            }}
          >
            <button
              ref={resourceTriggerRef}
              type="button"
              className={`nav-menu-trigger${resourcesActive ? " active" : ""}`}
              aria-haspopup="true"
              aria-expanded={desktopMenu === "resources"}
              aria-controls="desktop-resources-menu"
              onClick={() => setDesktopMenu((current) => current === "resources" ? null : "resources")}
            >
              Guides <FiChevronDown aria-hidden="true" />
            </button>
            <div id="desktop-resources-menu" className="nav-resources-menu nav-guides-menu">
              <div className="nav-menu-intro compact">
                <small>Plan with clarity</small>
                <strong>Guides, answers and Zameett information.</strong>
              </div>
              <div className="nav-menu-grid">
                <DropdownLinks links={RESOURCE_LINKS} pathname={pathname} isActive={isActive} />
              </div>
            </div>
          </li>
          <li>
            <InternalLink href={accountHref} className={`nav-account${accountActive ? " active" : ""}`} aria-label={accountLabel}>
              <FiUser aria-hidden="true" /><span>{accountLabel}</span>
            </InternalLink>
          </li>
          <li><InternalLink href="/contact#get-in-touch" className="nav-cta btn">Start Your Brief <span aria-hidden="true">→</span></InternalLink></li>
        </ul>
        <button
          ref={toggleRef}
          type="button"
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        ><span /><span /><span /></button>
      </nav>
      <button type="button" className={`mobile-menu-backdrop${open ? " open" : ""}`} aria-hidden="true" tabIndex={-1} onClick={() => closeMobileMenu({ restoreFocus: true })} />
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`mobile-menu${open ? " open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-menu-intro">
          <span className="mobile-menu-label">Menu</span>
          <strong>Choose what you need now.</strong>
          <p>Start with a service, review our work, or send your brief.</p>
        </div>
        <InternalLink href="/" className={pathname === "/" ? "active mobile-menu-direct" : "mobile-menu-direct"} aria-current={pathname === "/" ? "page" : undefined} onClick={() => closeMobileMenu()}>Home</InternalLink>
        {MOBILE_GROUPS.map((group) => {
          const expanded = openGroup === group.key;
          const groupActive = group.links.some((link) => isActive(link.href));
          const panelId = `mobile-${group.key}-links`;
          return (
            <div className={`mobile-nav-group${expanded ? " open" : ""}`} key={group.key}>
              <button type="button" className={`mobile-nav-group-head${groupActive ? " active" : ""}`} aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpenGroup(expanded ? null : group.key)}><span>{group.label}</span><FiChevronDown aria-hidden="true" /></button>
              <div id={panelId} className="mobile-nav-submenu" aria-hidden={!expanded} inert={!expanded}>
                {group.links.map((link) => {
                  const current = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                  return <InternalLink key={link.href} href={link.href} className={isActive(link.href) ? "active" : ""} aria-current={current ? "page" : undefined} onClick={() => closeMobileMenu()}>{link.label}</InternalLink>;
                })}
              </div>
            </div>
          );
        })}
        {DESKTOP_LINKS.map((link) => {
          const active = isActive(link.href);
          return <InternalLink key={link.href} href={link.href} className={active ? "active mobile-menu-direct" : "mobile-menu-direct"} aria-current={active ? "page" : undefined} onClick={() => closeMobileMenu()}>{link.label}</InternalLink>;
        })}
        <InternalLink href={accountHref} className="mobile-account-link" onClick={() => closeMobileMenu()}><FiUser aria-hidden="true" /> {accountLabel}</InternalLink>
        <InternalLink href="/contact#get-in-touch" className="mobile-quote-link" onClick={() => closeMobileMenu()}>Start Your Brief <span aria-hidden="true">→</span></InternalLink>
        <p className="mobile-menu-note">Scope, timing and price are confirmed before payment.</p>
      </div>
    </>
  );
}
