import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, canonicalUrl, createBreadcrumbSchema, ORGANIZATION_ID } from "@/lib/seo";
import { ARTICLES } from "../articles";
import { POSTS, getPost } from "../posts";
import { postCategory } from "../category";

export const dynamicParams = false;
export function generateStaticParams() { return POSTS.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const canonical = canonicalUrl("/blog/" + post.slug);
  const image = absoluteUrl(post.image);
  const socialTitle = post.title + " | Zameett";
  return {
    title: post.title,
    description: post.description,
    keywords: [post.primaryKeyword, ...(post.keywords || [])].filter(Boolean),
    alternates: { canonical },
    authors: [{ name: "Zameett Editorial Team", url: "/about" }],
    openGraph: {
      title: socialTitle, description: post.description, url: canonical, type: "article",
      publishedTime: post.date, modifiedTime: post.updatedDate || post.date,
      authors: ["Zameett Editorial Team"],
      images: [{ url: image, width: 1200, height: 630, alt: post.imageAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description: post.description, images: [{ url: image, alt: post.imageAlt || post.title }] },
  };
}

function sectionId(heading) { return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function formatDate(value) { return new Date(value + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }); }

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  const article = ARTICLES[slug];
  if (!post || !article) notFound();

  const pageUrl = canonicalUrl("/blog/" + post.slug);
  const relatedSlugs = post.related || [];
  const explicitRelated = relatedSlugs.map(getPost).filter(Boolean);
  const clusterRelated = POSTS.filter((item) => item.slug !== post.slug && postCategory(item) === postCategory(post) && !relatedSlugs.includes(item.slug));
  const related = [...explicitRelated, ...clusterRelated].slice(0, 3);
  const updatedDate = post.updatedDate || post.date;

  const articleSchema = {
    "@context": "https://schema.org", "@type": "BlogPosting", "@id": pageUrl + "#article",
    headline: post.title, description: post.description, image: absoluteUrl(post.image),
    datePublished: post.date, dateModified: updatedDate, mainEntityOfPage: pageUrl, inLanguage: "en",
    articleSection: postCategory(post), keywords: [post.primaryKeyword, ...(post.keywords || [])].filter(Boolean).join(", "),
    author: { "@type": "Organization", name: "Zameett Editorial Team", url: canonicalUrl("/about") },
    publisher: { "@id": ORGANIZATION_ID },
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: "/blog/" + post.slug },
  ]);
  const faqSchema = article.faq?.length ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: article.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  } : null;

  return <>
    <JsonLd data={articleSchema} />
    <JsonLd data={breadcrumbSchema} />
    {faqSchema && <JsonLd data={faqSchema} />}
    <main className="journal-article" id="article">
      <header className="intent-hero article-editorial-hero">
        <div className="inner intent-hero-grid">
          <div className="intent-hero-copy">
            <p className="crumb"><Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/blog">Blog</Link> &nbsp;/&nbsp; {postCategory(post)}</p>
            <p className="s-tag">Zameett Journal &middot; {postCategory(post)}</p>
            <h1>{post.title}</h1>
            <p className="intent-lead">{post.description}</p>
            <div className="intent-trust" aria-label="Article details">
              <span>By Zameett Editorial Team</span>
              <span>Published {formatDate(post.date)}</span>
              {updatedDate !== post.date && <span>Updated {formatDate(updatedDate)}</span>}
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="intent-hero-image">
            <Image src={post.image} alt={post.imageAlt || post.title} fill priority sizes="(max-width: 960px) 100vw, 38vw" />
          </div>
        </div>
      </header>

      <div className="article-shell">
        <article className="article-body">
          <p className="article-intro reveal">{article.intro}</p>
          <div className="article-contents reveal" role="navigation" aria-label="Table of contents">
            <details>
              <summary>Table of contents</summary>
              <ol>{article.sections.map((section) => <li key={section.heading}><a href={"#" + sectionId(section.heading)}>{section.heading.replace(/^\d+\.\s*/, "")}</a></li>)}</ol>
            </details>
          </div>
          <aside className="article-takeaway reveal"><span>Key takeaway</span><p>{article.keyTakeaway}</p></aside>

          {article.sections.map((section, index) => <section key={section.heading} id={sectionId(section.heading)} className="reveal">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            {index === 2 && post.serviceHref && <aside className="article-context-cta"><strong>{post.serviceLabel}</strong><p>See the relevant Zameett service scope, current positioning and next steps.</p><Link href={post.serviceHref}>Explore the service <span aria-hidden="true">&rarr;</span></Link></aside>}
          </section>)}

          {article.resourceLinks?.length > 0 && <aside className="article-resources reveal" aria-label="Related project resources">
            <p className="s-tag">Useful Next Steps</p><h2>Continue with the right resource</h2>
            <ul>{article.resourceLinks.map(([label, href]) => <li key={href}><Link href={href}>{label} <span aria-hidden="true">&rarr;</span></Link></li>)}</ul>
          </aside>}

<section className="article-author reveal">
            <div className="article-author-mark" aria-hidden="true">Z</div>
            <div><span>About the author</span><h2>Zameett Editorial Team</h2><p>Practical guidance based on documented fashion-design, technical-development, sampling and reviewed production workflows. Project specifications and supplier requirements must be confirmed individually.</p></div>
          </section>

          {article.faq?.length > 0 && <section className="article-faq reveal">
            <p className="s-tag">Frequently Asked Questions</p><h2>Questions about this topic</h2>
            {article.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </section>}

          <div className="article-end-cta reveal">
            <p className="s-tag">Apply This to Your Collection</p>
            <h2>Develop your next product with a clear scope.</h2>
            <p>Share your category, style count, available files, quantity and target date. Zameett will recommend the most suitable design, technical-development, sampling or reviewed production route.</p>
            <div><Link href="/contact#get-in-touch" className="btn btn-gold">Get a Quote <span aria-hidden="true">&rarr;</span></Link><Link href="/portfolio#portfolio-gallery" className="btn btn-outline-ivory">View Portfolio</Link></div>
          </div>

          <section className="article-related">
            <p className="s-tag">Related Reading</p><h2>Continue your research</h2>
            <div>{related.map((item) => <Link key={item.slug} href={"/blog/" + item.slug}><span>{postCategory(item)}</span><h3>{item.title}</h3><p>{item.description}</p></Link>)}</div>
          </section>
        </article>

        <aside className="article-sidebar reveal">
          <div><span>In this guide</span><ol>{article.sections.map((section) => <li key={section.heading}><a href={"#" + sectionId(section.heading)}>{section.heading.replace(/^\d+\.\s*/, "")}</a></li>)}</ol></div>
          <div className="article-sidebar-card"><span>Project checklist</span><p>Prepare the information needed for a clearer development or production quote.</p><a href="/resources/fashion-development-brief-checklist.pdf" download>Download checklist &rarr;</a></div>
          <div className="article-sidebar-card"><span>Relevant service</span><p>{post.serviceLabel || "Compare Zameett service paths."}</p><Link href={post.serviceHref || "/services"}>View service &rarr;</Link></div>
        </aside>
      </div>
    </main>
    <Footer />
  </>;
}