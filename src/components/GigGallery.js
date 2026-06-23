"use client";
import { useState } from "react";
import CoverImage from "./CoverImage";

export default function GigGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  return (
    <div className="gig-gallery">
      <div className="gig-main">
        <CoverImage src={images[active]} alt={alt} priority sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      {images.length > 1 && (
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
