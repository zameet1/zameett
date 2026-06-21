"use client";
import { useState } from "react";
import { FAQS } from "./faqData";

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div className="faq-item" key={i}>
          <div className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <h3>{f.q}</h3>
            <div className={`faq-tog${openIdx === i ? " open" : ""}`}>+</div>
          </div>
          <div className={`faq-ans${openIdx === i ? " open" : ""}`}>
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
