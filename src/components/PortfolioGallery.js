"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ITEMS = [
  { cat: "abaya", src: "/images/09.jpeg", alt: "Ivory pearl-trim abaya", role: "Designed and developed by Zameett", title: <>Ivory <em>Pearl-Trim Abaya</em></>, desc: "Soft crepe, pearl-edged lapels and tasselled ties documented as a modest-wear development reference." },
  { cat: "bias", src: "/images/02.jpeg", alt: "Rosewood satin maxi", role: "Design and technical development by Zameett", title: <>Rosewood <em>Belted Maxi</em></>, desc: "A fluid satin silhouette developed around drape, waist definition and skirt movement." },
  { cat: "formal", src: "/images/07.jpeg", alt: "Onyx button-front abaya", role: "Designed and sampled by Zameett", title: <>Onyx <em>Button-Front Abaya</em></>, desc: "A satin abaya reference with covered buttons, a controlled placket and bishop sleeves." },
  { cat: "embroidery", src: "/images/lemon.jpeg", alt: "Lemon bloom open abaya", role: "Print direction and sampling by Zameett", title: <>Lemon Bloom <em>Open Abaya</em></>, desc: "A printed open-abaya direction with a contrast tie and coordinated floral repeat." },
  { cat: "scarf", src: "/images/12.jpeg", alt: "Rosé paisley shawl suit", role: "Textile artwork by Zameett", title: <>Rosé <em>Paisley Shawl Set</em></>, desc: "A coordinated paisley artwork developed across the garment and matching shawl." },
  { cat: "abaya", src: "/images/20.jpeg", alt: "Cocoa cape abaya", role: "Design and garment development by Zameett", title: <>Cocoa <em>Cape Abaya</em></>, desc: "A layered modest silhouette developed with woven trims and controlled drape." },
  { cat: "bias", src: "/images/04.jpeg", alt: "Sleeveless slip dress colour capsule", role: "Technical design by Zameett", title: <>Four-Colour <em>Slip Capsule</em></>, desc: "A colour-led capsule reference with technical flats and coordinated style direction." },
  { cat: "embroidery", src: "/images/08.jpeg", alt: "Terracotta tribal kimono", role: "Design and surface detail by Zameett", title: <>Terracotta <em>Panelled Kimono</em></>, desc: "A layered kimono direction with woven panels and fringe sleeve details." },
  { cat: "archive", src: "/images/06.jpeg", alt: "Zameett pleated modest dress development", role: "Selected Zameett studio reference", title: <>Pleated <em>Modest Dress Study</em></>, desc: "A silhouette study focused on proportion, movement and a controlled waist line." },
  { cat: "archive", src: "/images/11.jpeg", alt: "Zameett embellished formalwear development", role: "Selected Zameett studio reference", title: <>Embellished <em>Formalwear Direction</em></>, desc: "An atelier reference documenting placement, finish and styling decisions." },
  { cat: "archive", src: "/images/19.jpeg", alt: "Zameett layered modest collection development", role: "Selected Zameett studio reference", title: <>Layered <em>Collection Concept</em></>, desc: "A modest-wear concept developed around coverage, layering and visual balance." },
  { cat: "archive", src: "/images/23.jpeg", alt: "Zameett sample development reference", role: "Sample development by Zameett", title: <>Prototype <em>Development Reference</em></>, desc: "A selected sample-stage reference used to review proportion and construction." },
  { cat: "archive", src: "/images/24.jpeg", alt: "Zameett finished garment reference", role: "Selected Zameett studio reference", title: <>Finished <em>Garment Direction</em></>, desc: "A finished reference showing the intended styling and collection language." },
  { cat: "embroidery", src: "/images/01.jpeg", alt: "Olive embroidered kaftan", role: "Design and sampling by Zameett", title: <>Olive <em>Embroidered Kaftan</em></>, desc: "A self-jacquard kaftan direction with a worked neckline and tassel detail." },
];

const FILTERS = [
  { cat: "all", label: "All Work" },
  { cat: "abaya", label: "Abayas" },
  { cat: "bias", label: "Dresses" },
  { cat: "scarf", label: "Shawls & Scarves" },
  { cat: "formal", label: "Formal" },
  { cat: "embroidery", label: "Embroidery & Prints" },
  { cat: "archive", label: "Studio Archive" },
];

export default function PortfolioGallery() {
  const [active, setActive] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const shown = ITEMS.filter((item) => active === "all" || item.cat === active);
  const lightboxOpen = lightboxIdx !== null;
  const currentItem = lightboxOpen ? shown[lightboxIdx] : null;

  function closeLightbox() {
    setLightboxIdx(null);
  }

  function openLightbox(index, trigger) {
    returnFocusRef.current = trigger;
    setLightboxIdx(index);
  }

  function showPrevious() {
    setLightboxIdx((index) => (index - 1 + shown.length) % shown.length);
  }

  function showNext() {
    setLightboxIdx((index) => (index + 1) % shown.length);
  }

  useEffect(() => {
    if (!lightboxOpen) {
      if (returnFocusRef.current) {
        returnFocusRef.current.focus();
        returnFocusRef.current = null;
      }
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    function onKey(event) {
      if (lightboxIdx === null) return;
      if (event.key === "Escape") setLightboxIdx(null);
      if (event.key === "ArrowLeft") setLightboxIdx((index) => (index - 1 + shown.length) % shown.length);
      if (event.key === "ArrowRight") setLightboxIdx((index) => (index + 1) % shown.length);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIdx, shown.length]);

  return <>
    <div className="pf-bar"><div className="pf-filters reveal">{FILTERS.map((filter) => <button type="button" key={filter.cat} className={`pf-filter${active === filter.cat ? " active" : ""}`} onClick={() => { setActive(filter.cat); closeLightbox(); }}>{filter.label}</button>)}</div><div className="pf-count"><b>{shown.length}</b> selected references</div></div>
    <div className="pf-grid">{shown.map((item, index) => <article className="pf-item" key={item.src}><button type="button" className="pf-item-button" onClick={(event) => openLightbox(index, event.currentTarget)} aria-label={`Open ${item.alt}`} aria-haspopup="dialog"><div className="pf-shot"><span className="pf-num">{String(index + 1).padStart(2, "0")}</span><span className="pf-view">View</span><Image src={item.src} alt={item.alt} fill quality={75} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div><div className="pf-cap"><div className="pf-cat">{item.role}</div><h3>{item.title}</h3><p>{item.desc}</p></div></button></article>)}</div>
    {currentItem && <div id="lightbox" className="open" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" aria-describedby="lightbox-role" onClick={(event) => event.target.id === "lightbox" && closeLightbox()}>
      <button ref={closeButtonRef} type="button" className="lb-close" aria-label="Close portfolio preview" onClick={closeLightbox}>×</button>
      {shown.length > 1 && <button type="button" className="lb-nav lb-prev" aria-label="Previous project" onClick={(event) => { event.stopPropagation(); showPrevious(); }}>‹</button>}
      <figure className="lb-figure">
        <Image src={currentItem.src} alt={currentItem.alt} width={1200} height={1600} sizes="100vw" priority />
        <figcaption className="lb-caption">
          <div className="lb-caption-topline">
            <span className="lb-category">{FILTERS.find((filter) => filter.cat === currentItem.cat)?.label || currentItem.cat}</span>
            <span className="lb-count" aria-label={`Project ${lightboxIdx + 1} of ${shown.length}`}>{lightboxIdx + 1} / {shown.length}</span>
          </div>
          <h2 id="lightbox-title">{currentItem.title}</h2>
          <p id="lightbox-role">{currentItem.role}</p>
        </figcaption>
      </figure>
      {shown.length > 1 && <button type="button" className="lb-nav lb-next" aria-label="Next project" onClick={(event) => { event.stopPropagation(); showNext(); }}>›</button>}
    </div>}
  </>;
}
