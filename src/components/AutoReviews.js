/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const EVIDENCE_LINKS = [
  { label: "Published work", title: "Portfolio references", text: "Review 14 selected references with a stated work type, Zameett role and evidence standard.", href: "/portfolio#portfolio-gallery", cta: "Inspect the portfolio" },
  { label: "Commercial scope", title: "Pricing and deliverables", text: "Compare published starting prices, files, revision rounds, timing assumptions and exclusions.", href: "/pricing", cta: "Compare the scope" },
  { label: "Approval route", title: "Development workflow", text: "Follow the documented route from brief and proposal through development, approval and handover.", href: "/how-it-works#workflow", cta: "Review the workflow" },
  { label: "Production controls", title: "Supply chain and quality", text: "See how supplier responsibilities, checkpoints and project-specific production decisions are recorded.", href: "/supply-chain", cta: "View the controls" },
];

function stars(rating) {
  const filled = Math.max(1, Math.min(5, Math.round(rating || 5)));
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)}`;
}

export default function AutoReviews() {
  const [googleData, setGoogleData] = useState(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const trackRef = useRef(null);
  const liveReviews = useMemo(
    () => googleData?.configured && googleData.reviews?.length ? googleData.reviews : [],
    [googleData],
  );

  useEffect(() => {
    let active = true;
    fetch("/api/google-reviews")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (active && data) setGoogleData(data); })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  const updateCarouselState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollBack(track.scrollLeft > 4);
    setCanScrollForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const frame = window.requestAnimationFrame(updateCarouselState);
    track.addEventListener("scroll", updateCarouselState, { passive: true });
    const observer = new ResizeObserver(updateCarouselState);
    observer.observe(track);
    return () => {
      window.cancelAnimationFrame(frame);
      track.removeEventListener("scroll", updateCarouselState);
      observer.disconnect();
    };
  }, [liveReviews.length, updateCarouselState]);

  function move(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".t-card");
    const gap = Number.parseFloat(getComputedStyle(track).gap || "18");
    const distance = (card?.getBoundingClientRect().width || track.clientWidth) + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  if (!liveReviews.length) return <>
    <p className="t-rating">Review the work, scope, workflow and production controls before you decide.</p>
    <div className="trust-evidence-grid reveal">
      {EVIDENCE_LINKS.map((item, index) => <a className="trust-evidence-card" href={item.href} key={item.title}>
        <span>{String(index + 1).padStart(2, "0")} · {item.label}</span>
        <strong>{item.title}</strong>
        <p>{item.text}</p>
        <b>{item.cta} →</b>
      </a>)}
    </div>
  </>;

  return <>
    <p className="t-rating">★ {googleData.rating?.toFixed(1) || "5.0"} Google rating · {liveReviews.length} sourced reviews</p>
    <div className="review-carousel">
      <div className="review-carousel-toolbar">
        <span>Swipe or use the arrows</span>
        <div>
          <button type="button" onClick={() => move(-1)} disabled={!canScrollBack} aria-label="Previous review">←</button>
          <button type="button" onClick={() => move(1)} disabled={!canScrollForward} aria-label="Next review">→</button>
        </div>
      </div>
      <div className="review-carousel-track reveal" ref={trackRef} role="region" aria-roledescription="carousel" aria-label="Client feedback">
        {liveReviews.map((review) => {
          return <article className="t-card" key={review.id}>
            {review.photoUri && <img className="google-review-avatar" src={review.photoUri} alt="" referrerPolicy="no-referrer" />}
            <div className="t-stars" aria-label={`${review.rating} out of 5 stars`}>{stars(review.rating)}</div>
            <p>“{review.text}”</p>
            <div className="t-name">{review.name}</div>
            <div className="t-role">{review.relativeTime || "Google review"}</div>
            {review.mapsUri && <a className="google-review-link" href={review.mapsUri} target="_blank" rel="noreferrer">View Google source →</a>}
          </article>;
        })}
      </div>
    </div>
  </>;
}
