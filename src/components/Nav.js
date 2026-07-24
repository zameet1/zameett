"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/services") {
      return pathname.startsWith("/services") || pathname.startsWith("/solutions");
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (!hasSupabaseConfig()) return;

    const supabase = createClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const accountHref = user ? "/account" : "/sign-in";
  const accountLabel = user ? "Profile" : "Sign In";
  const accountActive = pathname.startsWith("/sign-in") || pathname.startsWith("/account");

  return (
    <>
      <nav aria-label="Primary navigation">
        <a href="/" className="logo" aria-label="Zameett home">
          Zamee<span>tt</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <a href={link.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <a href={accountHref} className={`nav-account${accountActive ? " active" : ""}`}>
              <FiUser aria-hidden="true" /> <span>{accountLabel}</span>
            </a>
          </li>
          <li>
            <a href="/contact#get-in-touch" className="nav-cta btn">
              Get a Quote <span aria-hidden="true">&rarr;</span>
            </a>
          </li>
        </ul>
        <button
          type="button"
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <button
        type="button"
        className={`mobile-menu-backdrop${open ? " open" : ""}`}
        aria-label="Close menu"
        onClick={() => setOpen(false)}
      />
      <div id="mobile-navigation" className={`mobile-menu${open ? " open" : ""}`}>
        <span className="mobile-menu-label">Navigate</span>
        {LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <a
              key={link.href}
              href={link.href}
              className={active ? "active" : ""}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          );
        })}
        <a href={accountHref} className="mobile-account-link" onClick={() => setOpen(false)}>
          <FiUser aria-hidden="true" /> {user ? "Profile" : "Sign In"}
        </a>
        <a href="/contact#get-in-touch" onClick={() => setOpen(false)}>
          Get a Quote <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </>
  );
}
