// Featured "gig" services shown as product-style cards on the homepage and
// services page, each with its own detail page at /services/[slug].
// `serviceValue` must match an <option> in the contact form so the inquiry
// link can pre-select the right service.

export const GIGS = [
  {
    slug: "fashion-tech-packs",
    title: "Fashion Tech Packs for Abaya, Kaftan & Modest Wear",
    short: "Tech Packs for Modest Wear",
    tagline:
      "Production-ready tech packs built specifically for modest wear brands — abayas, kaftans, bisht and heavily embellished garments.",
    serviceValue: "Fashion Tech Pack (Abaya / Kaftan / Modest Wear)",
    cover: "/services/abaya-3.jpeg",
    gallery: ["/services/abaya-3.jpeg", "/services/abaya-1.jpeg", "/services/abaya-2.jpeg"],
    pdf: "/services/abaya-techpack-portfolio.pdf",
    intro: [
      "Your manufacturer won't start without a proper tech pack. A bad one means wrong samples, wasted money, and weeks of back-and-forth fixing mistakes that never should have happened.",
      "We create production-ready tech packs built specifically for modest wear — abayas, kaftans, bisht and heavily embellished garments. We understand the construction, the drape and the embellishment complexity that general designers get completely wrong.",
      "You send us your sketch, reference images, or even just a rough idea — we handle everything else.",
    ],
    listTitle: "Every tech pack includes",
    list: [
      "Flat sketches with full call-outs",
      "Construction & seam specifications",
      "Embellishment details — stitch types & bead specs",
      "Pantone colour references",
      "Bill of materials (BOM)",
      "Size chart with grading",
      "Factory-ready files — AI, PDF, PNG, DXF & TIFF",
    ],
    whyTitle: "Built for complex designs",
    why: [
      "Intricate hand-beaded designs",
      "Filigree embroidery & tassel detailing",
      "Multi-layer garment construction",
      "If your design is complex, we're built for it",
    ],
    note: "Message before ordering if you have heavy embellishment or a multi-piece design — we'll confirm scope and turnaround upfront. No surprises.",
  },
  {
    slug: "custom-textile-patterns",
    title: "Custom Seamless Textile Patterns for Fashion Brands",
    short: "Custom Textile Patterns",
    tagline:
      "Your premium textile design partner — high-end, production-ready fabric prints that set your clothing brand apart.",
    serviceValue: "Custom Seamless Textile Patterns",
    cover: "/services/textile-2.jpeg",
    gallery: ["/services/textile-2.jpeg", "/services/textile-3.jpeg", "/services/textile-1.jpeg"],
    pdf: "/services/textile-prints-portfolio.pdf",
    intro: [
      "Looking for unique, production-ready fabric prints that set your clothing brand apart? I specialise in creating high-end, custom digital textile designs tailored to your brand's identity.",
      "From beautiful minimalist patterns to elegant traditional motifs, I deliver flawless, industry-standard repeat patterns ready for direct fabric printing — with meticulous attention to scale, alignment and colour harmony.",
    ],
    listTitle: "What I offer",
    list: [
      "Seamless all-over patterns — flawlessly tiled repeats with zero visible breaks",
      "Custom motifs & placements — artwork designed for specific garment panels or scarves",
      "Production-ready files — high-res TIFF, AI, PSD and PDF",
      "Colourway variations — perfectly colour-matched for your seasonal drops",
    ],
    whyTitle: "Why work with me",
    why: [
      "Fully layered master source files for effortless future colour or editing adjustments",
      "Clean aesthetic and professional communication",
      "Sharp attention to detail",
    ],
    note: "Message me to discuss your concepts before ordering!",
  },
];

export function getGig(slug) {
  return GIGS.find((g) => g.slug === slug);
}
