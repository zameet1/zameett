// Digital products sold through Stripe Checkout. Prices are defined in cents
// here on the server and are never accepted from the browser.

export const PRODUCTS = [
  {
    slug: "tech-pack-template-pro",
    name: "Tech Pack Template — Pro Edition",
    short: "Tech Pack Template — Pro",
    tagline:
      "The most complete editable tech pack template — industry-standard layouts with dedicated pages for BOM, specs and construction.",
    price: "$22",
    priceCents: 2200,
    badge: "Most Complete",
    cover: "/digital/p2-1.jpeg",
    gallery: ["/digital/p2-1.jpeg", "/digital/p2-2.jpeg", "/digital/p2-3.jpeg"],
    intro: [
      "A professional, fully editable tech pack template built to industry standards — everything a factory needs to take your design from sketch to sample without guesswork.",
      "Just drop in your flats, fill the fields and send it to any manufacturer in the world. Clean, organised and ready to use in minutes.",
    ],
    listTitle: "What's inside",
    list: [
      "Technical drawing pages (front / back / detail views)",
      "Dedicated Bill of Materials (BOM) page",
      "Size chart & POM (points of measure) with grading",
      "Colourway pages",
      "Fabric & trim suggestion pages",
      "Construction & specification layouts",
      "Fully editable, print-ready files",
    ],
    note: "Delivered as editable files to the email address used for secure Stripe Checkout.",
  },
  {
    slug: "tech-pack-template-classic",
    name: "Tech Pack Template — Classic Edition",
    short: "Tech Pack Template — Classic",
    tagline:
      "A clean, multi-page editable tech pack template — perfect for new brands creating their first professional spec sheets.",
    price: "$14",
    priceCents: 1400,
    cover: "/digital/p1-1.jpeg",
    gallery: ["/digital/p1-1.jpeg", "/digital/p1-2.jpeg", "/digital/p1-3.jpeg"],
    intro: [
      "A timeless, easy-to-edit tech pack template for brands and designers who want polished, manufacturer-ready spec sheets without starting from scratch.",
      "Includes all the core pages you need — technical details, fabric suggestions, colourways, size chart and bill of materials.",
    ],
    listTitle: "What's inside",
    list: [
      "Technical details & drawing pages",
      "Fabric suggestion page",
      "Colourway page",
      "Size chart / POM page",
      "Bill of Materials page",
      "Editable, print-ready layout",
    ],
    note: "Delivered as editable files to the email address used for secure Stripe Checkout.",
  },
  {
    slug: "tech-pack-template-blush",
    name: "Tech Pack Template — Blush Edition",
    short: "Tech Pack Template — Blush",
    tagline:
      "A soft, elegant tech pack template for fashion design brands — professional structure with a refined blush aesthetic.",
    price: "$14",
    priceCents: 1400,
    cover: "/digital/p3-1.jpeg",
    gallery: ["/digital/p3-1.jpeg", "/digital/p3-2.jpeg", "/digital/p3-3.jpeg"],
    intro: [
      "A beautifully styled, fully editable tech pack template for designers who want their documentation to look as considered as their collections.",
      "Professional, factory-ready structure wrapped in a clean blush palette — technical drawings, fabric pages, colourways, size charts and BOM included.",
    ],
    listTitle: "What's inside",
    list: [
      "Technical drawing pages (front / back)",
      "Fabric suggestion page with swatch slots",
      "Colourway page",
      "Size chart / POM with grading",
      "Bill of Materials page",
      "Editable, print-ready files",
    ],
    note: "Delivered as editable files to the email address used for secure Stripe Checkout.",
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}
