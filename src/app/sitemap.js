import { POSTS } from "./blog/posts";
import { GIGS } from "./services/gigs";
import { PRODUCTS } from "./shop/products";

const siteUrl = "https://zameett.com";

const routes = ["", "/about", "/services", "/portfolio", "/shop", "/contact", "/blog", "/privacy", "/terms"];

export default function sitemap() {
  const staticEntries = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const gigEntries = GIGS.map((gig) => ({
    url: `${siteUrl}/services/${gig.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productEntries = PRODUCTS.map((p) => ({
    url: `${siteUrl}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries = POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...gigEntries, ...productEntries, ...postEntries];
}
