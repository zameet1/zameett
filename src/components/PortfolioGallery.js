"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  { num: "01", cat: "formal", src: "/images/16.jpeg", alt: "Plum and sage velvet caftan", catLabel: "Formal · Full Manufacturing", title: <>Plum &amp; Sage <em>Velvet Caftan</em></>, desc: "Colour-blocked velvet with woven trims and beaded edges." },
  { num: "02", cat: "embroidery", src: "/images/01.jpeg", alt: "Olive embroidered kaftan", catLabel: "Embroidery · Design + Sampling", title: <>Olive <em>Embroidered Kaftan</em></>, desc: "Self-jacquard with hand-worked neckline and tassels." },
  { num: "03", cat: "abaya", src: "/images/09.jpeg", alt: "Ivory pearl-trim abaya", catLabel: "Abayas · Full Manufacturing", title: <>Ivory <em>Pearl-Trim Abaya</em></>, desc: "Soft crepe with hand-beaded lapels and tasselled ties." },
  { num: "04", cat: "bias", src: "/images/02.jpeg", alt: "Rosewood satin maxi", catLabel: "Bias Cut · Full Manufacturing", title: <>Rosewood <em>Belted Maxi</em></>, desc: "Fluid satin maxi with pleated skirt, cut on the bias." },
  { num: "05", cat: "embroidery", src: "/images/10.jpeg", alt: "Protea print kaftan", catLabel: "Prints · Design Only", title: <>Protea <em>Print Kaftan</em></>, desc: "Placement-printed silk developed from original artwork." },
  { num: "06", cat: "formal", src: "/images/15.jpeg", alt: "Midnight beaded abaya", catLabel: "Formal · Embroidery", title: <>Midnight <em>Beaded Velvet Abaya</em></>, desc: "Navy velvet open abaya with all-over beadwork and lace." },
  { num: "07", cat: "abaya", src: "/images/07.jpeg", alt: "Onyx button-front abaya", catLabel: "Abayas · Tech Packs", title: <>Onyx <em>Button-Front Abaya</em></>, desc: "Satin abaya with covered-button placket and bishop sleeves." },
  { num: "08", cat: "formal", src: "/images/17.jpeg", alt: "Sage velvet lace robe", catLabel: "Formal · Full Manufacturing", title: <>Sage <em>Velvet &amp; Lace Robe</em></>, desc: "Velvet robe over satin slip with scalloped lace trim." },
  { num: "09", cat: "embroidery", src: "/images/03.jpeg", alt: "Lemon bloom open abaya", catLabel: "Prints · Design + Sampling", title: <>Lemon Bloom <em>Open Abaya</em></>, desc: "Ditsy-floral printed open abaya with contrast ties." },
  { num: "10", cat: "scarf", src: "/images/12.jpeg", alt: "Rosé paisley shawl suit", catLabel: "Shawls · Print Design", title: <>Rosé <em>Paisley Shawl Suit</em></>, desc: "Paisley-printed suit with matching shawl, artwork to garment." },
  { num: "11", cat: "abaya", src: "/images/20.jpeg", alt: "Cocoa cape abaya", catLabel: "Abayas · Full Manufacturing", title: <>Cocoa <em>Cape Abaya</em></>, desc: "Draped cape-back abaya with gold hardware and embroidered hem." },
  { num: "12", cat: "bias", src: "/images/04.jpeg", alt: "Sleeveless slip edit", catLabel: "Bias Cut · Tech Packs", title: <>The <em>Sleeveless Slip Edit</em></>, desc: "A four-colour slip-dress capsule, graded and tech-packed." },
  { num: "13", cat: "embroidery", src: "/images/08.jpeg", alt: "Terracotta tribal kimono", catLabel: "Embroidery · Full Manufacturing", title: <>Terracotta <em>Tribal Kimono</em></>, desc: "Layered kimono with woven tribal panels and fringe sleeves." },
  { num: "14", cat: "scarf", src: "/images/22.jpeg", alt: "Champagne fringe shawl abaya", catLabel: "Shawls · Full Manufacturing", title: <>Champagne <em>Fringe Shawl Abaya</em></>, desc: "Tonal abaya with macramé-fringe shawl and lace appliqué." },
  { num: "15", cat: "formal", src: "/images/19.jpeg", alt: "Powder blue embroidered set", catLabel: "Formal · Design + Sampling", title: <>Powder Blue <em>Embroidered Set</em></>, desc: "Floral-embroidered open abaya layered over a satin slip." },
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
