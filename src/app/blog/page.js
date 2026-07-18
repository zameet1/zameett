import Footer from "@/components/Footer";
import CoverImage from "@/components/CoverImage";
import { POSTS } from "./posts";

export const metadata = {
  title: "Blog",
  description:
    "Guides on modest wear tech packs, abaya manufacturing and building a modest fashion brand — from the Zameett team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Zameett Blog | Modest Fashion & Manufacturing Guides",
    description:
      "Guides on modest wear tech packs, abaya manufacturing and building a modest fashion brand.",
    url: "/blog",
    images: [{ url: "/images/14.jpeg", width: 1200, height: 630, alt: "Zameett blog — modest fashion manufacturing guides" }],
  },
};

export default function Blog() {
  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <header className="page-hero blog-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Blog</p>
          <h1>Guides for <em>modest fashion brands.</em></h1>
          <p>
            Practical, no-fluff guides on tech packs, abaya manufacturing and building a modest
            wear label — written from the floor of our own atelier.
          </p>
          <div className="page-hero-proof"><span>Factory knowledge</span><span>Original guidance</span><span>For brand owners</span></div>
        </div>
      </header>

      <section className="services blog-index">
        <div className="inner">
          <div className="gig-grid blog-grid">
            {sorted.map((post, index) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className={`gig-card reveal${index === 0 ? " blog-featured" : ""}`}>
                <div className="gig-card-img">
                  <CoverImage src={post.image} alt={post.title} sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="gig-card-body">
                  <div className="dp-cat">
                    {new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })} · {post.readTime}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <span className="gig-card-link">Read practical guide →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
