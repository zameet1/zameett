"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteChrome() {
  const pathname = usePathname();
  const [navShadow, setNavShadow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setNavShadow(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav)
      nav.style.boxShadow = navShadow
        ? "0 1px 0 rgba(201,169,110,0.18), 0 10px 36px -14px rgba(53,9,32,0.40)"
        : "0 1px 0 rgba(201,169,110,0.12), 0 8px 32px -16px rgba(53,9,32,0.25)";
  }, [navShadow]);

  const animateCount = useCallback((el) => {
    const raw = el.textContent.trim();
    const m = raw.match(/^(\d+)(.*)$/);
    if (!m) return;
    const target = parseInt(m[1], 10);
    const suffix = m[2];
    const dur = 1400;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            statIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(".stat-num").forEach((el) => statIO.observe(el));
    return () => statIO.disconnect();
  }, [pathname, animateCount]);

  // Subtle scroll-reveal: fade/slide elements in as they enter the viewport.
  // The inline script in layout adds `js-reveal` (skipped under reduced motion),
  // so without JS or with reduced motion everything stays fully visible.
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-reveal")) return;
    const gridSelector = [
      ".svc-grid.reveal", ".gig-grid.reveal", ".t-grid.reveal", ".why-grid.reveal",
      ".sig-grid.reveal", ".intent-directory-grid.reveal", ".intent-gallery.reveal",
      ".intent-process-grid.reveal", ".values.reveal", ".c-list.reveal",
      ".pain-list.reveal", ".p-row.reveal", ".shop-benefit-grid.reveal",
      ".contact-step-grid.reveal", ".contact-info-col.reveal"
    ].join(",");
    document.querySelectorAll(gridSelector).forEach((el) => el.classList.remove("reveal", "in"));
    const cardSelector = [
      ".svc-card", ".gig-card", ".t-card", ".why-card", ".sig-card",
      ".intent-directory-grid > a", ".intent-facts article", ".intent-gallery-item",
      ".intent-process-grid article", ".val", ".c-item", ".pain-item", ".p-step",
      ".shop-benefit-grid article", ".contact-step-grid article", ".contact-detail",
      ".faq-item"
    ].join(",");
    document.querySelectorAll(cardSelector).forEach((el, index) => {
      el.classList.add("reveal", "card-reveal");
      el.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
