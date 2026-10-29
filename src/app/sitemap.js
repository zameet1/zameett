import { POSTS } from "./blog/posts";
import { GIGS } from "./services/gigs";
import { PRODUCTS } from "./shop/products";
import { SOLUTIONS } from "./solutions/solutions";
import { POLICIES } from "@/lib/policyContent";
import { PUBLIC_STATIC_ROUTES, absoluteUrl } from "@/lib/seo";
import { SHOP_ENABLED } from "@/lib/siteFlags";

function entry(path, { lastModified, changeFrequency, priority }) {
  return {
    url: absoluteUrl(path || "/"),
    ...(lastModified ? { lastModified } : {}),
    ...(changeFrequency ? { changeFrequency } : {}),
    ...(typeof priority === "number" ? { priority } : {}),
  };
}
export default function sitemap() {
  const checklistUpdated = "2026-10-22";
  const talaPortfolioUpdated = "2026-10-29";
  const entries = [
    ...PUBLIC_STATIC_ROUTES.filter((route) => SHOP_ENABLED || route !== "/shop").map((route) => entry(route, {
      ...(route === "/resources/fashion-development-brief-checklist" ? { lastModified: checklistUpdated } : {}),
      ...(route === "/portfolio/tala-mahj" ? { lastModified: talaPortfolioUpdated } : {}),
      changeFrequency: route === "/blog" ? "weekly" : "monthly",
      priority: route === "" ? 1 : ["/services","/portfolio","/contact","/pricing"].includes(route) ? 0.9 : route === "/portfolio/tala-mahj" ? 0.8 : 0.7,
    })),
    ...Object.keys(POLICIES).map((slug) => entry("/" + slug, { changeFrequency: "yearly", priority: 0.4 })),
    ...GIGS.map((gig) => entry("/services/" + gig.slug, { lastModified: gig.updatedDate, changeFrequency: "monthly", priority: 0.8 })),
    ...SOLUTIONS.map((solution) => entry("/solutions/" + solution.slug, { lastModified: solution.updatedDate, changeFrequency: "monthly", priority: 0.8 })),
    ...(SHOP_ENABLED ? PRODUCTS.map((product) => entry("/shop/" + product.slug, { changeFrequency: "monthly", priority: 0.7 })) : []),
    ...POSTS.map((post) => entry("/blog/" + post.slug, { lastModified: post.updatedDate || post.date, changeFrequency: "monthly", priority: 0.6 })),
  ];
  return [...new Map(entries.map((item) => [item.url, item])).values()];
}
