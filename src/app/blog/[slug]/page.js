import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { ARTICLES } from "../articles";
import { POSTS, getPost } from "../posts";

const siteUrl = "https://zameett.com";

export function generateStaticParams() {
  return POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Zameett`,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: `${post.title} | Zameett`, description: post.description, images: [post.image] },
  };
}

function sectionId(heading) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  const article = ARTICLES[slug];
  if (!post || !article) notFound();

  const published = new Date(`${post.date}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article", headline: post.title,
    description: post.description, image: `${siteUrl}${post.image}`, datePublished: post.date,
    dateModified: post.date, mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: "Zameett", url: siteUrl },
    publisher: { "@type": "Organization", name: "Zameett", url: siteUrl },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="journal-article">
        <header className="article-hero">
          <div className="inner article-hero-grid">
            <div className="article-hero-copy">
              <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/blog">Journal</a> &nbsp;/&nbsp; Guide</p>
              <p className="s-tag">Zameett Production Journal</p>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <div className="article-meta"><span>{published}</span><span>{post.readTime}</span><span>Written by Zameett</span></div>
            </div>
            <div className="article-hero-media"><Image src={post.image} alt={post.title} fill priority sizes="(max-width: 900px) 100vw, 42vw" /></div>
          </div>
        </header>

        <div className="article-shell">
          <article className="article-body">
            <p className="article-intro">{article.intro}</p>
            <aside className="article-takeaway"><span>Key takeaway</span><p>{article.keyTakeaway}</p></aside>
            {article.sections.map((section) => (
              <section key={section.heading} id={sectionId(section.heading)}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.note && <aside className="article-field-note"><strong>From the workroom</strong><p>{section.note}</p></aside>}
              </section>
            ))}
            <figure className="article-portfolio-proof">
              <div><Image src={post.image} alt={`Zameett portfolio reference for ${post.title}`} fill sizes="760px" /></div>
              <figcaption>This guide is grounded in Zameett&rsquo;s modest-wear design, technical development and production workflow. See more garment and tech-pack work in our portfolio.</figcaption>
            </figure>
            <div className="article-end-cta">
              <p className="s-tag">Apply This to Your Collection</p>
              <h2>Need a specialist pair of eyes on your project?</h2>
              <p>Share your designs, quantities and target timeline. We&rsquo;ll recommend the clearest next step—tech pack, sampling or full manufacturing.</p>
              <div><a href="/contact#get-in-touch" className="btn btn-gold">Get a Quote →</a><a href="/portfolio" className="btn btn-outline-ivory">View Portfolio</a></div>
            </div>
          </article>
          <aside className="article-sidebar">
            <div><span>In this guide</span><ol>{article.sections.map((section) => <li key={section.heading}><a href={`#${sectionId(section.heading)}`}>{section.heading.replace(/^\d+\.\s*/, "")}</a></li>)}</ol></div>
            <div className="article-sidebar-card"><span>Planning a collection?</span><p>Get a practical scope, MOQ and timeline from a modest-fashion specialist.</p><a href="/contact#get-in-touch">Discuss your project →</a></div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
