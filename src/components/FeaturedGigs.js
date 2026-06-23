"use client";
import { useState } from "react";
import CoverImage from "./CoverImage";
import { GIGS } from "@/app/services/gigs";

export default function FeaturedGigs() {
  const [index, setIndex] = useState(0);
  const [touchX, setTouchX] = useState(null);
  const count = GIGS.length;
  const go = (delta) => setIndex((p) => (p + delta + count) % count);

  return (
    <section className="featured-gigs">
      <div className="inner">
        <div className="svc-head reveal">
          <div>
            <p className="s-tag">Featured Services</p>
            <h2 className="s-title">
              Our most-requested <em>specialities.</em>
            </h2>
          </div>
          <p className="s-body">
            Two of the services brands come to us for most — tech packs built for modest wear, and
            custom seamless textile prints. Slide through, then send an inquiry in one tap.
          </p>
        </div>

        <div className="gig-carousel reveal">
          <div
            className="gig-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX == null) return;
              const dx = e.changedTouches[0].clientX - touchX;
              if (dx > 50) go(-1);
              else if (dx < -50) go(1);
              setTouchX(null);
            }}
          >
            {GIGS.map((gig) => (
              <a key={gig.slug} href={`/services/${gig.slug}`} className="gig-slide">
                <div className="gig-slide-img">
                  <CoverImage src={gig.cover} alt={gig.title} sizes="(max-width: 900px) 100vw, 55vw" />
                </div>
                <div className="gig-slide-body">
                  <p className="s-tag">Featured Service</p>
                  <h3>{gig.title}</h3>
                  <p>{gig.tagline}</p>
                  <span className="gig-card-link">View details &amp; inquire →</span>
                </div>
              </a>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                className="gig-arrow prev"
                onClick={() => go(-1)}
                aria-label="Previous service"
              >
                ‹
              </button>
              <button
                type="button"
                className="gig-arrow next"
                onClick={() => go(1)}
                aria-label="Next service"
              >
                ›
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="gig-dots">
            {GIGS.map((gig, i) => (
              <button
                key={gig.slug}
                type="button"
                className={`gig-dot${i === index ? " active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Show ${gig.short}`}
                aria-current={i === index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
