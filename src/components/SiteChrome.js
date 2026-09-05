"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteChrome() {
  const pathname = usePathname();
  const [navShadow, setNavShadow] = useState(false);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    main.classList.remove("page-transition-in");
    const frame = window.requestAnimationFrame(() => main.classList.add("page-transition-in"));
    const timer = window.setTimeout(() => main.classList.remove("page-transition-in"), 560);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      main.classList.remove("page-transition-in");
    };
  }, [pathname]);

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

  // Progressive enhancement only: content remains visible by default. Elements
  // receive motion when they actually enter the viewport, even after a long read.
  useEffect(() => {
    const gridSelector = [
      ".svc-grid.reveal", ".gig-grid.reveal", ".t-grid.reveal", ".why-grid.reveal",
      ".sig-grid.reveal", ".intent-directory-grid.reveal", ".intent-gallery.reveal",
      ".intent-process-grid.reveal", ".values.reveal", ".c-list.reveal",
      ".pain-list.reveal", ".p-row.reveal", ".shop-benefit-grid.reveal",
      ".contact-step-grid.reveal", ".contact-info-col.reveal",
      ".supply-stage-grid.reveal", ".supplier-check-grid.reveal",
      ".home-pricing-grid.reveal", ".home-trust-copy.reveal",
      ".workflow-model-grid.reveal", ".workflow-stage-grid.reveal"
    ].join(",");
    document.querySelectorAll(gridSelector).forEach((element) => element.classList.remove("reveal", "reveal-pending", "reveal-in"));

    const presentationSelector = [
      ".page-hero .inner > *", ".hero-content > *", ".blog-journal-copy > *",
      ".blog-journal-visual", ".blog-section-heading", ".blog-editorial-copy",
      ".blog-editorial-actions", ".about-identity .inner > div",
      ".about-clients .inner > div", ".pff-media", ".pff-copy",
      ".portfolio-disclosure .inner", ".photo-break .pb-content > *",
      ".contact-steps > .inner > .s-tag", ".contact-faq .faq-layout > div",
      ".legal-content > .legal-intro", ".legal-review-note", ".legal-contact",
      ".premium-checkout-shell > *", ".auth-shell > *", ".auth-reset-shell > *",
      ".shop-benefits .svc-head", ".related-products .svc-head"
    ].join(",");
    document.querySelectorAll(presentationSelector).forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 5) * 45}ms`);
    });

    const cardSelector = [
      ".svc-card", ".gig-card", ".t-card", ".why-card", ".sig-card",
      ".intent-directory-grid > a", ".intent-facts article", ".intent-gallery-item",
      ".intent-process-grid article", ".val", ".c-item", ".pain-item", ".p-step",
      ".shop-benefit-grid article", ".contact-step-grid article", ".contact-detail",
      ".faq-item", ".work-showcase-card", ".dp-card", ".shl-card",
      ".contact-form-panel", ".checkout-trust-panel > div", ".article-sidebar > div",
      ".article-takeaway", ".article-field-note", ".pricing-guide-card",
      ".supply-stage-grid article", ".supplier-check-card",
      ".home-pricing-grid article", ".home-trust-copy p", ".blog-cluster-grid > a",
      ".blog-path-step", ".about-scope-list article", ".workflow-model-card",
      ".workflow-stage-card", ".service-pricing-card", ".service-learning-card",
      ".product-faq details", ".legal-section"
    ].join(",");
    document.querySelectorAll(cardSelector).forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
    });

    const candidates = [...document.querySelectorAll(".reveal")];
    if (!candidates.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    candidates.forEach((element) => element.classList.add("reveal-pending"));
    const revealElement = (element) => {
      element.classList.add("reveal-in");
      window.setTimeout(() => {
        element.classList.remove("reveal-pending", "reveal-in");
        element.style.removeProperty("--reveal-delay");
      }, 760);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -3% 0px" },
    );
    candidates.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      candidates.forEach((element) => {
        element.classList.remove("reveal-pending", "reveal-in");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);
  // Give touch users the same visual feedback that desktop users get on hover.
  useEffect(() => {
    const selector = [
      ".svc-card", ".why-card", ".pain-item", ".intent-process-grid article",
      ".contact-step-grid article", ".p-step", ".val", ".c-item",
      ".intent-facts article", ".shop-benefit-grid article", ".t-card",
      ".workflow-model-card", ".workflow-stage-card", ".supplier-check-card",
      ".home-pricing-grid article", ".home-trust-copy p"
    ].join(",");

    function onCardClick(event) {
      if (event.target.closest("a,button,input,select,textarea,summary")) return;
      const card = event.target.closest(selector);
      document.querySelectorAll(".card-active").forEach((item) => {
        if (item !== card) item.classList.remove("card-active");
      });
      if (card) card.classList.toggle("card-active");
    }

    document.addEventListener("click", onCardClick);
    return () => document.removeEventListener("click", onCardClick);
  }, [pathname]);
  // Re-apply hash scrolling after client-side route changes and delayed page rendering.
  useEffect(() => {
    let retryTimer;
    let arrivalTimer;

    function scrollToCurrentHash(attempt = 0) {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        target.scrollIntoView({ behavior, block: "start" });
        target.classList.remove("hash-target-active");
        window.requestAnimationFrame(() => target.classList.add("hash-target-active"));
        window.clearTimeout(arrivalTimer);
        arrivalTimer = window.setTimeout(() => target.classList.remove("hash-target-active"), 1100);
        return;
      }
      if (attempt < 8) {
        retryTimer = window.setTimeout(() => scrollToCurrentHash(attempt + 1), 80);
      }
    }

    function onHashChange() {
      scrollToCurrentHash();
    }

    scrollToCurrentHash();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(retryTimer);
      window.clearTimeout(arrivalTimer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);
  // Deter casual image saving while preserving normal page interaction.
  useEffect(() => {
    function isProtectedImage(target) {
      return target instanceof Element && Boolean(target.closest("img, picture"));
    }
    function preventImageAction(event) {
      if (isProtectedImage(event.target)) event.preventDefault();
    }
    document.addEventListener("contextmenu", preventImageAction);
    document.addEventListener("dragstart", preventImageAction);
    return () => {
      document.removeEventListener("contextmenu", preventImageAction);
      document.removeEventListener("dragstart", preventImageAction);
    };
  }, []);

  return null;
}
