"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import CoverImage from "@/components/CoverImage";
import { BLOG_CLUSTERS, postCategory } from "@/app/blog/category";

const BLOG_FILTERS = ["All", ...BLOG_CLUSTERS];

function formatDate(value) {
  return new Date(value + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function BlogExplorer({ posts }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const counts = useMemo(() => Object.fromEntries(BLOG_FILTERS.map((item) => [item, item === "All" ? posts.length : posts.filter((post) => postCategory(post) === item).length])), [posts]);
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === "All" || postCategory(post) === category;
    const haystack = (post.title + " " + post.description + " " + (post.keywords || []).join(" ")).toLowerCase();
    return matchesCategory && haystack.includes(query.trim().toLowerCase());
  }), [posts, query, category]);

  function resetFilters() {
    setQuery("");
    setCategory("All");
  }

  return <>
    <div className="blog-tools">
      <label className="blog-search"><span>What do you want to learn?</span><div><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={'Try "tech pack cost" or "abaya MOQ"'} aria-controls="blog-guide-results" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">Clear</button>}</div></label>
      <div className="blog-topic-picker"><label className="blog-mobile-filter"><span>Browse topics</span><span className="blog-mobile-select-wrap"><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Choose a blog topic">{BLOG_FILTERS.map((item) => <option value={item} key={item}>{item === "All" ? `All guides (${counts[item]})` : `${item} (${counts[item]})`}</option>)}</select><i aria-hidden="true">⌄</i></span></label><span className="blog-filter-label">Browse topics</span><div className="blog-categories" aria-label="Blog categories">{BLOG_FILTERS.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}><span>{item === "All" ? "All guides" : item}</span><small>{counts[item]}</small></button>)}</div></div>
    </div>

    <div className="blog-list-toolbar">
      <p className="blog-results" aria-live="polite"><strong>{filtered.length}</strong> guide{filtered.length === 1 ? "" : "s"} {category !== "All" ? "in " + category : "in the journal"}</p>
      {(query || category !== "All") && <button type="button" className="blog-reset" onClick={resetFilters}>Reset filters</button>}
    </div>

    {filtered.length ? <div className="blog-guide-list" id="blog-guide-results" aria-label="Zameett blog guides">
      {filtered.map((post, index) => <Link key={post.slug} href={"/blog/" + post.slug} className="blog-guide-list-item reveal" style={{ "--reveal-delay": `${Math.min(index, 7) * 45}ms` }}>
        <span className="blog-list-number">{String(index + 1).padStart(2, "0")}</span>
        <div className="blog-list-image"><CoverImage src={post.image} alt={post.imageAlt || post.title} sizes="(max-width: 640px) 30vw, 230px" />{index === 0 && category === "All" && !query && <span className="blog-featured-label">Start here</span>}</div>
        <div className="blog-list-copy"><div className="dp-cat">{postCategory(post)}</div><h3>{post.title}</h3><p>{post.description}</p></div>
        <div className="blog-list-meta"><span>{formatDate(post.date)}</span><span>{post.readTime}</span><b>Read guide <i aria-hidden="true">&rarr;</i></b></div>
      </Link>)}</div>
    : <div className="blog-empty"><span aria-hidden="true">Z</span><h2>No guide matched that search.</h2><p>Try a shorter phrase or reset the topic filter.</p><button type="button" className="btn btn-burg" onClick={resetFilters}>View all guides</button></div>}
  </>;
}