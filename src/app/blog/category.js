export const BLOG_CLUSTERS = [
  "Tech Packs & Fashion Development",
  "Modest Wear & Abaya Manufacturing",
  "Fashion Brand Development & Production",
  "Textile & Print Design",
];

export function postCategory(post) {
  if (post.category) return post.category;
  const value = (post.slug + " " + post.title).toLowerCase();
  if (value.includes("tech-pack") || value.includes("tech pack")) return BLOG_CLUSTERS[0];
  if (value.includes("abaya") || value.includes("modest") || value.includes("fabric-guide")) return BLOG_CLUSTERS[1];
  if (value.includes("textile") || value.includes("print") || value.includes("pattern")) return BLOG_CLUSTERS[3];
  return BLOG_CLUSTERS[2];
}