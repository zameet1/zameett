import { POSTS } from "./blog/posts";
import { GIGS } from "./services/gigs";
import { PRODUCTS } from "./shop/products";
import { SOLUTIONS } from "./solutions/solutions";
import { POLICIES } from "@/lib/policyContent";
import { PUBLIC_STATIC_ROUTES, SITE_URL } from "@/lib/seo";

function entry(path, lastModified, changeFrequency, priority) {
  return { url: SITE_URL + path, lastModified, changeFrequency, priority };
}
export default function sitemap() {
  const siteUpdated = new Date("2026-08-23T00:00:00Z");
  const policyUpdated = new Date("2026-07-30T00:00:00Z");
  const entries = [
    ...PUBLIC_STATIC_ROUTES.map((route) => entry(route, siteUpdated, route === "/blog" ? "weekly" : "monthly", route === "" ? 1 : ["/services","/portfolio","/contact","/pricing"].includes(route) ? 0.9 : 0.7)),
    ...Object.keys(POLICIES).map((slug) => entry("/" + slug, policyUpdated, "yearly", 0.4)),
    ...GIGS.map((gig) => entry("/services/" + gig.slug, siteUpdated, "monthly", 0.8)),
    ...SOLUTIONS.map((solution) => entry("/solutions/" + solution.slug, siteUpdated, "monthly", 0.8)),
    ...PRODUCTS.map((product) => entry("/shop/" + product.slug, siteUpdated, "monthly", 0.7)),
    ...POSTS.map((post) => entry("/blog/" + post.slug, new Date(post.updatedDate || post.date), "monthly", 0.6)),
    entry("/resources/fashion-development-brief-checklist.pdf", siteUpdated, "yearly", 0.5),
  ];
  return [...new Map(entries.map((item) => [item.url, item])).values()];
}
