"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartContext";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/digital", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, setDrawerOpen } = useCart();

  return (
    <>
      <nav>
        <a href="/" className="logo">
          Zamee<span>tt</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={pathname === l.href ? "active" : ""}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/contact" className="nav-cta btn">
              Get a Quote
            </a>
          </li>
        </ul>
        <button
          className="cart-btn"
          aria-label="Cart"
          onClick={() => setDrawerOpen(true)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" />
            <circle cx="9" cy="20" r="1.3" />
            <circle cx="18" cy="20" r="1.3" />
          </svg>
          <span className={`cart-badge${count > 0 ? " show" : ""}`}>{count}</span>
        </button>
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href="/contact" onClick={() => setOpen(false)}>
          Get a Quote
        </a>
      </div>
    </>
  );
}
