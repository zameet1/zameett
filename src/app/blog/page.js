import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import BlogExplorer from "@/components/BlogExplorer";
import { createPageMetadata } from "@/lib/seo";
import { POSTS } from "./posts";
import { BLOG_CLUSTERS } from "./category";

const HERO_IMAGE = {
  url: "/blog/zameett-journal-hero.webp",
  width: 1800,
  height: 1013,
  alt: "Fashion development workspace with technical sketches, fabric swatches and specification sheets",
};

const CLUSTER_COPY = [
  ["Tech Pack Library", "Specifications, technical flats, BOMs and manufacturer handoffs.", "what-is-a-tech-pack"],
  ["Modest-Wear Studio", "Abaya development, materials, MOQ, embellishment and production.", "private-label-abaya-manufacturing"],
  ["Brand Development", "Collection planning, sampling, sourcing and production control.", "fashion-collection-development"],
  ["Textile Design", "Seamless repeats, placements, colourways and supplier-ready artwork.", "seamless-repeat-pattern"],
];

const LEARNING_PATHS = [
  ["01", "Define the product", "Clarify the garment, customer, materials and commercial direction before technical development.", "fashion-collection-development", "Plan your collection"],
  ["02", "Document the design", "Turn the concept into clear drawings, specifications, materials and construction instructions.", "what-is-a-tech-pack", "Build a tech pack"],
  ["03", "Prepare for production", "Understand manufacturer handoff, sampling, approvals and the decisions that affect production.", "prepare-design-for-manufacturer", "Prepare the handoff"],
];

export const metadata = createPageMetadata({
  title: "Fashion Development Blog",
  description: "Practical guides for fashion brands on tech packs, product development, garment sampling, abaya manufacturing, production and textile print design.",
  path: "/blog",
  image: HERO_IMAGE,
  keywords: ["fashion development blog", "fashion tech pack guides", "abaya manufacturing guides", "textile print design"],
});

export default function Blog() {
  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featured = sorted.find((post) => post.slug === "what-is-a-tech-pack");
  const ordered = featured ? [featured, ...sorted.filter((post) => post.slug !== featured.slug)] : sorted;

  return <>
    <header className="blog-journal-hero">
      <div className="inner blog-journal-hero-grid">
        <div className="blog-journal-copy">
          <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; Journal</p>
          <p className="s-tag">The Zameett Journal</p>
          <h1>Fashion knowledge for <em>better production decisions.</em></h1>
          <p>Clear, connected guidance on technical development, fabrics, sampling and production - with specialist modest-wear context where it matters.</p>
          <div className="blog-journal-actions">
            <a className="btn btn-gold" href="#all-guides">Explore All Guides <span aria-hidden="true">&darr;</span></a>
            <Link className="btn btn-outline-ivory" href="/contact#get-in-touch">Ask About Your Project</Link>
          </div>
          <div className="blog-journal-proof"><span>{POSTS.length} practical guides</span><span>4 specialist topics</span><span>Free to read</span></div>
        </div>
        <div className="blog-journal-visual">
          <Image src={HERO_IMAGE.url} alt={HERO_IMAGE.alt} fill priority sizes="(max-width: 900px) 100vw, 52vw" />
          <div className="blog-visual-caption"><span>Design</span><span>Develop</span><span>Prepare</span></div>
        </div>
      </div>
    </header>

    <section className="blog-cluster-intro" aria-labelledby="blog-topics-title">
      <div className="inner">
        <div className="blog-section-heading"><div><p className="s-tag">Choose Your Starting Point</p><h2 className="s-title" id="blog-topics-title">Explore the journal by <em>specialist topic.</em></h2></div><p>Follow one connected learning path or search the complete library below.</p></div>
        <div className="blog-cluster-grid">{BLOG_CLUSTERS.map((cluster, index) => <Link className="reveal" href={"/blog/" + CLUSTER_COPY[index][2]} key={cluster}><span>0{index + 1}</span><small>{CLUSTER_COPY[index][0]}</small><h3>{cluster}</h3><p>{CLUSTER_COPY[index][1]}</p><b>Start exploring <i aria-hidden="true">&rarr;</i></b></Link>)}</div>
      </div>
    </section>

    <section className="blog-learning-paths" aria-labelledby="learning-path-title">
      <div className="inner">
        <div className="blog-section-heading"><div><p className="s-tag">New to Fashion Production?</p><h2 className="s-title" id="learning-path-title">Follow a simple <em>three-guide path.</em></h2></div><p>Start with the commercial idea, build the technical information, then prepare a clearer manufacturer handoff.</p></div>
        <div className="blog-learning-path-grid">{LEARNING_PATHS.map((path) => <Link className="blog-path-step reveal" href={"/blog/" + path[3]} key={path[0]}><span>{path[0]}</span><div><small>Learning step</small><h3>{path[1]}</h3><p>{path[2]}</p><b>{path[4]} <i aria-hidden="true">&rarr;</i></b></div></Link>)}</div>
      </div>
    </section>

    <section className="services blog-index" id="all-guides"><div className="inner">
      <div className="blog-section-heading"><div><p className="s-tag">Knowledge Library</p><h2 className="s-title">Find the guide you <em>need now.</em></h2></div><p>Search by question or filter the full library by topic. Start with our featured tech pack guide if you are unsure.</p></div>
      <BlogExplorer posts={ordered} />
    </div></section>

    <section className="blog-editorial-note"><div className="inner">
      <div className="blog-editorial-copy"><p className="s-tag">From Learning to Development</p><h2 className="s-title">Need help preparing <em>your product files?</em></h2><p>Review our services or send your brief. We will recommend the support that fits your product and current stage.</p></div>
      <div className="blog-editorial-actions"><Link className="btn btn-gold" href="/services">Explore Services</Link><Link className="btn btn-outline-ivory" href="/contact#get-in-touch">Start Your Project</Link></div>
    </div></section>
    <Footer />
  </>;
}