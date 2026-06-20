import { POSTS } from "./blog/posts";

const siteUrl = "https://zameett.com";

const routes = ["", "/about", "/services", "/portfolio", "/digital", "/contact", "/blog"];

export default function sitemap() {
  const staticEntries = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const postEntries = POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
