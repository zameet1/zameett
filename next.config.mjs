import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx"],
  // Keep Next.js image optimization on (responsive + webp = fast), but at a
  // high quality so there is no visible loss vs the originals.
  images: { qualities: [75, 90] },
  async headers() {
    return [
      {
        // Built JS/CSS chunks are content-hashed, safe to cache forever.
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Static product/portfolio photos rarely change; revalidate daily.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        // HTML pages (everything except hashed static assets & images) must
        // always revalidate with BOTH the browser (max-age=0) and any shared
        // CDN/proxy (s-maxage=0). Hostinger's hcdn was caching HTML for a year
        // via s-maxage=31536000, serving stale pages — the "sometimes old,
        // sometimes new" bug. s-maxage=0 forces the CDN to revalidate too.
        source: "/:path((?!_next/|images/).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
