/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const FALLBACK_REVIEWS = [
  { id: "client-01", name: "Independent Designer", rating: 5, text: "Zameett translated the ideas clearly, added useful perspective and kept the work organised.", role: "Client feedback · Design development · Source link not published" },
  { id: "client-02", name: "Fashion Brand Founder", rating: 5, text: "The communication was patient and the revision process was handled carefully.", role: "Client feedback · Textile design · Source link not published" },
  { id: "client-03", name: "Boutique Owner", rating: 5, text: "Clear communication and quick responses made the development process easier to manage.", role: "Client feedback · Technical design · Source link not published" },
  { id: "client-04", name: "Independent Brand Owner", rating: 5, text: "The work was organised and the team took time to include the details needed for the collection.", role: "Client feedback · Product development · Source link not published" },
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
  const reviews = useMemo(() => liveReviews.length ? liveReviews : FALLBACK_REVIEWS, [liveReviews]);

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
  }, [reviews.length, updateCarouselState]);

  function move(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".t-card");
    const gap = Number.parseFloat(getComputedStyle(track).gap || "18");
    const distance = (card?.getBoundingClientRect().width || track.clientWidth) + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return <>
    <p className="t-rating">{liveReviews.length ? `★ ${googleData.rating?.toFixed(1) || "5.0"} Google rating · ${liveReviews.length} sourced reviews` : "Selected client feedback · Public source links not currently available"}</p>
    <div className="review-carousel">
      <div className="review-carousel-toolbar">
        <span>Swipe or use the arrows</span>
        <div>
          <button type="button" onClick={() => move(-1)} disabled={!canScrollBack} aria-label="Previous review">←</button>
          <button type="button" onClick={() => move(1)} disabled={!canScrollForward} aria-label="Next review">→</button>
        </div>
      </div>
      <div className="review-carousel-track reveal" ref={trackRef} role="region" aria-roledescription="carousel" aria-label="Client feedback">
        {reviews.map((review) => {
          const live = liveReviews.includes(review);
          return <article className="t-card" key={review.id}>
            {live && review.photoUri && <img className="google-review-avatar" src={review.photoUri} alt="" referrerPolicy="no-referrer" />}
            <div className="t-stars" aria-label={`${review.rating} out of 5 stars`}>{stars(review.rating)}</div>
            <p>“{review.text}”</p>
            <div className="t-name">{review.name}</div>
            <div className="t-role">{live ? review.relativeTime || "Google review" : review.role}</div>
            {live && review.mapsUri && <a className="google-review-link" href={review.mapsUri} target="_blank" rel="noreferrer">View Google source →</a>}
          </article>;
        })}
      </div>
    </div>
  </>;
}