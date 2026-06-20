const siteUrl = "https://zameett.com";

const routes = ["", "/about", "/services", "/portfolio", "/digital", "/contact"];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
