"use client";
import { useState } from "react";
import CoverImage from "./CoverImage";

export default function GigGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const [touchX, setTouchX] = useState(null);
  const count = images.length;
  const go = (delta) => setActive((p) => (p + delta + count) % count);

  return (
    <div className="gig-gallery">
      <div
        className="gig-main"
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX == null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (dx > 50) go(-1);
          else if (dx < -50) go(1);
          setTouchX(null);
        }}
      >
        <CoverImage src={images[active]} alt={alt} priority sizes="(max-width: 900px) 100vw, 50vw" />
        {count > 1 && (
          <>
            <button
              type="button"
              className="gig-gal-arrow prev"
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="gig-gal-arrow next"
              onClick={() => go(1)}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="gig-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`gig-thumb${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
            >
              <CoverImage src={src} alt="" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
