import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx"],
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
        // always revalidate with the server so a new deploy is picked up
        // immediately. Without this the browser/host caches stale HTML that
        // still points at old chunks — the "sometimes old, sometimes new" bug.
        source: "/:path((?!_next/|images/).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
