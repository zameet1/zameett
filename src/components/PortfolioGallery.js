"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

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
  const shown = PORTFOLIO_ITEMS.filter((item) => active === "all" || item.cat === active);
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
    <div className="pf-grid">{shown.map((item, index) => <article className="pf-item" id={item.slug} key={item.src}><button type="button" className="pf-item-button" onClick={(event) => openLightbox(index, event.currentTarget)} aria-label={`Open ${item.alt}`} aria-haspopup="dialog"><div className="pf-shot"><span className="pf-num">{String(index + 1).padStart(2, "0")}</span><span className="pf-view">View</span><Image src={item.src} alt={item.alt} fill quality={75} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div><div className="pf-cap"><div className="pf-cat">{item.evidence} · {item.role}</div><h3>{item.titleLead} <em>{item.titleEmphasis}</em></h3><p>{item.desc}</p></div></button></article>)}</div>
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
          <h2 id="lightbox-title">{currentItem.titleLead} <em>{currentItem.titleEmphasis}</em></h2>
          <p id="lightbox-role">{currentItem.role}</p>
        </figcaption>
      </figure>
      {shown.length > 1 && <button type="button" className="lb-nav lb-next" aria-label="Next project" onClick={(event) => { event.stopPropagation(); showNext(); }}>›</button>}
    </div>}
  </>;
}
