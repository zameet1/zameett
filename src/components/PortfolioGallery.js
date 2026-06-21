"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  { num: "01", cat: "embroidery", src: "/images/01.jpeg", alt: "Olive embroidered kaftan", catLabel: "Embroidery · Design + Sampling", title: <>Olive <em>Embroidered Kaftan</em></>, desc: "Self-jacquard with hand-worked neckline and tassels." },
  { num: "02", cat: "abaya", src: "/images/09.jpeg", alt: "Ivory pearl-trim abaya", catLabel: "Abayas · Full Manufacturing", title: <>Ivory <em>Pearl-Trim Abaya</em></>, desc: "Soft crepe with hand-beaded lapels and tasselled ties." },
  { num: "03", cat: "bias", src: "/images/02.jpeg", alt: "Rosewood satin maxi", catLabel: "Bias Cut · Full Manufacturing", title: <>Rosewood <em>Belted Maxi</em></>, desc: "Fluid satin maxi with pleated skirt, cut on the bias." },
  { num: "04", cat: "formal", src: "/images/07.jpeg", alt: "Onyx button-front abaya", catLabel: "Formal · Full Manufacturing", title: <>Onyx <em>Button-Front Abaya</em></>, desc: "Satin abaya with a covered-button placket and bishop sleeves." },
  { num: "05", cat: "embroidery", src: "/images/lemon.jpeg", alt: "Lemon bloom open abaya", catLabel: "Prints · Design + Sampling", title: <>Lemon Bloom <em>Open Abaya</em></>, desc: "Ditsy-floral printed open abaya with contrast ties." },
  { num: "06", cat: "scarf", src: "/images/12.jpeg", alt: "Rosé paisley shawl suit", catLabel: "Shawls · Print Design", title: <>Rosé <em>Paisley Shawl Suit</em></>, desc: "Paisley-printed suit with matching shawl, artwork to garment." },
  { num: "07", cat: "abaya", src: "/images/20.jpeg", alt: "Cocoa cape abaya", catLabel: "Abayas · Full Manufacturing", title: <>Cocoa <em>Cape Abaya</em></>, desc: "Draped layered abaya with woven trims and tassel ties." },
  { num: "08", cat: "bias", src: "/images/04.jpeg", alt: "Sleeveless slip edit", catLabel: "Bias Cut · Tech Packs", title: <>The <em>Sleeveless Slip Edit</em></>, desc: "A four-colour slip-dress capsule, graded and tech-packed." },
  { num: "09", cat: "embroidery", src: "/images/08.jpeg", alt: "Terracotta tribal kimono", catLabel: "Embroidery · Full Manufacturing", title: <>Terracotta <em>Tribal Kimono</em></>, desc: "Layered kimono with woven tribal panels and fringe sleeves." },
];

const FILTERS = [
  { cat: "all", label: "All Work" },
  { cat: "abaya", label: "Abayas" },
  { cat: "bias", label: "Bias Cut" },
  { cat: "scarf", label: "Shawls & Scarves" },
  { cat: "formal", label: "Formal" },
  { cat: "embroidery", label: "Embroidery & Prints" },
];

export default function PortfolioGallery() {
  const [active, setActive] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const shown = ITEMS.filter((i) => active === "all" || i.cat === active);

  useEffect(() => {
    function onKey(e) {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i - 1 + shown.length) % shown.length);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % shown.length);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIdx, shown.length]);

  return (
    <>
      <div className="pf-bar">
        <div className="pf-filters reveal">
          {FILTERS.map((f) => (
            <button
              key={f.cat}
              className={`pf-filter${active === f.cat ? " active" : ""}`}
              onClick={() => setActive(f.cat)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="pf-count"><b>{shown.length}</b> pieces in archive</div>
      </div>

      <div className="pf-grid">
        {shown.map((item, idx) => (
          <div className="pf-item" key={item.num} onClick={() => setLightboxIdx(idx)}>
            <div className="pf-shot">
              <span className="pf-num">{item.num}</span>
              <span className="pf-view">View</span>
              {/* eslint-disable-next-line @next/next/no-img-element -- masonry layout needs intrinsic/organic image height, fill won't work without a fixed-size container */}
              <img src={item.src} alt={item.alt} />
            </div>
            <div className="pf-cap">
              <div className="pf-cat">{item.catLabel}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <div id="lightbox" className="open" onClick={(e) => e.target.id === "lightbox" && setLightboxIdx(null)}>
          <button className="lb-close" aria-label="Close" onClick={() => setLightboxIdx(null)}>×</button>
          <button
            className="lb-nav lb-prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) => (i - 1 + shown.length) % shown.length);
            }}
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- lightbox needs natural image dimensions, not a fill container */}
          <img src={shown[lightboxIdx].src} alt={shown[lightboxIdx].alt} />
          <button
            className="lb-nav lb-next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((i) => (i + 1) % shown.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
