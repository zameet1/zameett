import { SEO_POSTS } from "./seo-posts.js";

const LEGACY_POSTS = [
  {
    slug: "abaya-manufacturing-cost",
    title: "How Much Does It Cost to Manufacture an Abaya?",
    titleAccent: "Manufacture an Abaya?",
    description: "A practical cost breakdown covering fabric, construction, embellishment, sampling, labels, quantity and freight—with a worked costing example.",
    date: "2026-07-13",
    image: "/services/manufacturing-1.jpeg",
    readTime: "9 min read",
  },
  {
    slug: "complete-abaya-manufacturing-process",
    title: "The Complete Abaya Manufacturing Process",
    titleAccent: "Abaya Manufacturing Process",
    description: "From design brief and tech pack to fabric approval, sampling, cutting, stitching, finishing, quality control and shipment.",
    date: "2026-07-06",
    image: "/services/manufacturing-2.jpeg",
    readTime: "10 min read",
  },
  {
    slug: "how-to-create-a-tech-pack-for-abayas",
    title: "What Should an Abaya Tech Pack Include?",
    titleAccent: "Abaya Tech Pack Include?",
    description: "The exact drawings, measurements, construction notes, BOM, artwork and revision controls a factory needs to sample an abaya accurately.",
    date: "2026-06-29",
    image: "/images/14.jpeg",
    readTime: "11 min read",
  },
  {
    slug: "modest-fashion-manufacturer-pakistan",
    title: "How to Find a Modest-Fashion Manufacturer",
    titleAccent: "Modest-Fashion Manufacturer",
    description: "A due-diligence guide for comparing specialisation, samples, MOQs, quality systems, communication and production claims before paying a deposit.",
    date: "2026-06-22",
    image: "/images/27.jpeg",
    readTime: "9 min read",
  },
  {
    slug: "low-moq-vs-bulk-fashion-manufacturing",
    title: "Low MOQ vs Bulk Fashion Manufacturing",
    titleAccent: "Bulk Fashion Manufacturing",
    description: "The real trade-offs in unit cost, cash risk, fabric buying, size depth, testing and reorders for emerging fashion brands.",
    date: "2026-06-15",
    image: "/services/manufacturing-3.jpeg",
    readTime: "8 min read",
  },
  {
    slug: "fabric-guide-abayas-modest-dresses",
    title: "Fabric Guide for Abayas and Modest Dresses",
    titleAccent: "Abayas and Modest Dresses",
    description: "How nida, crepe, chiffon, satin, georgette and linen blends behave in real garments—and what to test before production.",
    date: "2026-06-08",
    image: "/images/25.jpeg",
    readTime: "10 min read",
  },
  {
    slug: "tech-pack-mistakes-delay-production",
    title: "Tech-Pack Mistakes That Delay Production",
    titleAccent: "Delay Production",
    description: "Eight specification gaps that trigger factory questions, failed samples and avoidable revisions, with a pre-handoff audit checklist.",
    date: "2026-06-01",
    image: "/images/techpack.jpeg",
    readTime: "8 min read",
  },
  {
    slug: "how-to-start-a-modest-fashion-brand",
    title: "How to Start a Modest-Clothing Brand",
    titleAccent: "Modest-Clothing Brand",
    description: "A grounded launch plan covering customer, price architecture, collection size, development files, sampling, production and first-drop validation.",
    date: "2026-05-25",
    image: "/images/19.jpeg",
    readTime: "12 min read",
  },
  {
    slug: "private-label-vs-custom-manufacturing",
    title: "Private Label vs Custom Clothing Manufacturing",
    titleAccent: "Custom Clothing Manufacturing",
    description: "Compare speed, originality, development cost, MOQ, margin and brand control before choosing a production model.",
    date: "2026-07-20",
    image: "/services/manufacturing-2.jpeg",
    readTime: "8 min read",
  },
  {
    slug: "garment-sampling-process-modest-fashion",
    title: "The Garment Sampling Process for Modest Fashion",
    titleAccent: "for Modest Fashion",
    description: "A practical guide to prototype, fit, size-set and pre-production samples with modest-wear approval checkpoints.",
    date: "2026-07-19",
    image: "/images/23.jpeg",
    readTime: "9 min read",
  },
  {
    slug: "fabric-sourcing-checklist-fashion-brand",
    title: "Fabric Sourcing Checklist for Fashion Brands",
    titleAccent: "for Fashion Brands",
    description: "What to confirm about composition, opacity, drape, width, shrinkage, colour, MOQ and lead time before ordering fabric.",
    date: "2026-07-18",
    image: "/images/25.jpeg",
    readTime: "8 min read",
  },
  {
    slug: "production-management-fashion-brand",
    title: "When Does a Fashion Brand Need Production Management?",
    titleAccent: "Need Production Management?",
    description: "The warning signs, responsibilities and control systems that make outside production management worth considering.",
    date: "2026-07-17",
    image: "/services/manufacturing-3.jpeg",
    readTime: "8 min read",
  },];

const BLOG_IMAGE_OVERRIDES = {
  "tech-pack-cost": { image: "/images/01.jpeg", imageAlt: "Fashion technical documents arranged for a tech pack costing review" },
  "tech-pack-example": { image: "/images/02.jpeg", imageAlt: "Fashion specification pages illustrating a production-ready tech pack" },
  "fashion-technical-flat-drawings": { image: "/images/03.jpeg", imageAlt: "Detailed fashion technical drawings prepared for garment development" },
  "what-is-a-tech-pack": { image: "/images/04.jpeg", imageAlt: "Fashion design documents introducing the structure of a clothing tech pack" },
  "tech-pack-vs-spec-sheet-pattern": { image: "/images/05.jpeg", imageAlt: "Technical garment documentation used to compare production file types" },
  "bill-of-materials-fashion": { image: "/images/06.jpeg", imageAlt: "Fashion materials and specifications supporting a garment bill of materials" },
  "private-label-vs-custom-manufacturing": { image: "/images/07.jpeg", imageAlt: "Fashion product development reference for private-label and custom production" },
  "abaya-manufacturer-moq": { image: "/images/08.jpeg", imageAlt: "Modest-wear collection planning reference for abaya order quantities" },
  "prepare-design-for-manufacturer": { image: "/images/09.jpeg", imageAlt: "Fashion concept prepared for a professional manufacturer handoff" },
  "fashion-collection-development": { image: "/images/10.jpeg", imageAlt: "Coordinated fashion collection development reference" },
  "production-management-fashion-brand": { image: "/images/11.jpeg", imageAlt: "Fashion production workflow and collection coordination reference" },
  "fabric-sourcing-checklist-fashion-brand": { image: "/images/12.jpeg", imageAlt: "Fashion fabric sourcing and material-selection reference" },
};

const ACTIVE_POSTS = [...LEGACY_POSTS.filter((post) => post.slug !== "garment-sampling-process-modest-fashion"), ...SEO_POSTS];
export const POSTS = ACTIVE_POSTS.map((post) => ({ ...post, ...(BLOG_IMAGE_OVERRIDES[post.slug] || {}) }));

export function getPost(slug) {
  return POSTS.find((post) => post.slug === slug);
}
