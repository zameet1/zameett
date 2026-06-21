"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteChrome() {
  const pathname = usePathname();
  const [barWidth, setBarWidth] = useState(0);
  const [navShadow, setNavShadow] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setNavShadow(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setBarWidth(h > 0 ? (y / h) * 100 : 0);
      setShowTop(y > 600);
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

  return (
    <>
      <div id="scroll-progress" style={{ width: `${barWidth}%` }} />
      <button
        id="back-top"
        className={showTop ? "show" : ""}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
