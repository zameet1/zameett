import createMDX from "@next/mdx";

const securityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self)" },
];
const noIndexHeader = { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" };
const privateRoutes = ["/api/:path*","/auth/:path*","/account","/account/:path*","/admin","/admin/:path*","/sign-in","/reset-password","/shop/success","/shop/:slug/checkout"];

const nextConfig = {
  pageExtensions: ["js","jsx","mdx"],
  output: "standalone",
  poweredByHeader: false,
  images: { unoptimized: true, qualities: [75,90], formats: ["image/avif","image/webp"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      ...privateRoutes.map((source) => ({ source, headers: [noIndexHeader] })),
    ];
  },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "www.zameett.com" }], destination: "https://zameett.com/:path*", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/solutions/garment-sampling-fitting-service", destination: "/solutions/fashion-sampling-services", permanent: true },
      { source: "/blog/garment-sampling-process-modest-fashion", destination: "/blog/types-of-garment-samples", permanent: true },
    ];
  },
};
export default createMDX({})(nextConfig);
