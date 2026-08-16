export const SITE_NAME = "Zameett";
export const SITE_URL = "https://zameett.com";
export const SITE_DESCRIPTION = "Zameett is a Pakistan-based fashion design and product-development studio providing original fashion concepts, technical flats, production-ready tech packs, textile print design, and specialist modest-wear development support for brands worldwide.";
export const DEFAULT_SOCIAL_IMAGE = { url: "/services/abaya-1.jpeg", width: 1600, height: 1132, alt: "Zameett fashion design and product-development work" };
export const VERIFIED_SOCIAL_PROFILES = ["https://www.instagram.com/zameett_","https://www.pinterest.com/zameett/"];
export const PUBLIC_STATIC_ROUTES = ["","/about","/services","/how-it-works","/pricing","/supply-chain","/portfolio","/shop","/contact","/faq","/blog","/privacy","/terms","/legal"];
export const PRIVATE_CRAWL_PATHS = ["/api/","/account","/admin","/auth/","/reset-password","/sign-in","/shop/success","/shop/*/checkout"];
export const ORGANIZATION_ID = SITE_URL + "/#organization";
export const WEBSITE_ID = SITE_URL + "/#website";

export function absoluteUrl(path = "/") {
  if (path instanceof URL) return path.toString();
  const value = typeof path === "string" && path.trim() ? path.trim() : "/";
  return new URL(value.startsWith("//") ? "/" : value, SITE_URL + "/").toString();
}
export function canonicalUrl(path = "/") {
  const url = new URL(absoluteUrl(path));
  if (url.origin !== SITE_URL) return SITE_URL + "/";
  url.search = "";
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}
export function createPageMetadata({ title, description = SITE_DESCRIPTION, path = "/", image = DEFAULT_SOCIAL_IMAGE, type = "website", keywords, noIndex = false } = {}) {
  const canonical = canonicalUrl(path);
  const socialImage = typeof image === "string" ? { ...DEFAULT_SOCIAL_IMAGE, url: image } : image;
  const imageUrl = absoluteUrl(socialImage.url);
  const socialTitle = title?.includes(SITE_NAME) ? title : title + " | " + SITE_NAME;
  return {
    title, description, ...(keywords?.length ? { keywords } : {}), alternates: { canonical },
    openGraph: { type, url: canonical, siteName: SITE_NAME, title: socialTitle, description, images: [{ url: imageUrl, width: socialImage.width, height: socialImage.height, alt: socialImage.alt || socialTitle }] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [{ url: imageUrl, alt: socialImage.alt || socialTitle }] },
    robots: noIndex ? { index: false, follow: false, nocache: true } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  };
}
export function createSiteIdentitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, alternateName: "Zameett Fashion Development", url: SITE_URL + "/", description: SITE_DESCRIPTION, logo: absoluteUrl("/icon.svg"), image: absoluteUrl(DEFAULT_SOCIAL_IMAGE.url), email: "hello@zameett.com", areaServed: "Worldwide", address: { "@type": "PostalAddress", addressCountry: "PK" }, contactPoint: { "@type": "ContactPoint", contactType: "customer support and sales", email: "hello@zameett.com" }, sameAs: VERIFIED_SOCIAL_PROFILES },
      { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL + "/", name: SITE_NAME, alternateName: ["Zameett Fashion Development","zameett.com"], description: SITE_DESCRIPTION, publisher: { "@id": ORGANIZATION_ID }, inLanguage: "en" },
    ],
  };
}
export function createBreadcrumbSchema(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(({ name, path }, index) => ({ "@type": "ListItem", position: index + 1, name, item: canonicalUrl(path) })) };
}
