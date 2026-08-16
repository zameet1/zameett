"use client";

import { useState } from "react";
import { FAQS } from "./faqData";

export default function FaqAccordion({ items = FAQS }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const faq = Array.isArray(item) ? { q: item[0], a: item[1] } : item;
        const open = openIdx === index;
        const answerId = "faq-answer-" + index;
        return (
          <article className="faq-item" key={faq.q}>
            <button className="faq-q" type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpenIdx(open ? null : index)}>
              <h3>{faq.q}</h3>
              <span className={"faq-tog" + (open ? " open" : "")} aria-hidden="true">+</span>
            </button>
            <div className={"faq-ans" + (open ? " open" : "")} id={answerId} aria-hidden={!open}><div className="faq-ans-inner"><p>{faq.a}</p></div></div>
          </article>
        );
      })}
    </div>
  );
}
