"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Can I come for designs only, without manufacturing?",
    a: "Absolutely. Many of our clients only need design concepts and tech packs — they have their own manufacturer or are still deciding on production. We create complete, production-ready design files that any factory in the world can follow. There is no obligation to use our manufacturing services.",
  },
  {
    q: "What is a tech pack and why do I need one?",
    a: "A tech pack is a detailed technical document telling a manufacturer exactly how to produce your garment — measurements, construction details, fabric specifications, stitch types, embellishment placement and more. Without one, manufacturers guess — and that is exactly where designs get ruined.",
  },
  {
    q: "My manufacturer ruined my designs. Can Zameett help?",
    a: "Yes — and this is one of the most common situations we hear about. We can review what went wrong, rebuild your tech packs with clearer construction notes tailored to modest wear, or take over manufacturing entirely so your designs are in the hands of specialists.",
  },
  {
    q: "What garments do you specialise in?",
    a: "We specialise in modest fashion — abayas, bias-cut styles, scarves, modest formal and casual wear, embroidered pieces and printed modest collections. We do not produce general fashion outside the modest wear category. This focus is what makes our quality exceptional.",
  },
  {
    q: "What is your minimum order quantity?",
    a: "We are flexible and work with small brands as well as larger labels. MOQ varies by product type, fabric choice and embellishment complexity. Contact us with your project details and we will work out what makes sense together — we do not turn away small collections.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship worldwide — to you, your warehouse, or directly to your customers. All packaging and quality checks are completed before dispatch so your product arrives exactly as it left our facility.",
  },
  {
    q: "How long does the full process take?",
    a: "Design and tech pack work typically takes 1–2 weeks. Sampling takes an additional 2–3 weeks. Full production runs vary based on order size and embellishment complexity. Realistic timelines are always discussed at consultation, and you receive updates throughout the process.",
  },
  {
    q: "How do I get started with Zameett?",
    a: "Simply fill in the contact form above or email us directly. Tell us about your project — design only, full manufacturing, or anything in between — and we will schedule a consultation to understand your vision and walk you through the next steps. No pressure on the first call.",
  },
];

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
