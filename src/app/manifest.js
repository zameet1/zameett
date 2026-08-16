export default function manifest() {
  return {
    id: "/",
    name: "Zameett - Fashion Development Studio",
    short_name: "Zameett",
    description:
      "Access Zameett fashion-development services, digital resources, account orders and project updates.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#faf7f2",
    theme_color: "#4a0e2b",
    categories: ["business", "shopping", "lifestyle"],
    icons: [
      { src: "/icon.png?v=20260809b", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "My account", short_name: "Account", description: "View orders, downloads and project progress", url: "/account?source=app-shortcut", icons: [{ src: "/icon.png?v=20260809b", sizes: "512x512" }] },
      { name: "Digital shop", short_name: "Shop", description: "Browse editable fashion tech-pack products", url: "/shop?source=app-shortcut", icons: [{ src: "/icon.png?v=20260809b", sizes: "512x512" }] },
      { name: "Get a quote", short_name: "Quote", description: "Start a Zameett project", url: "/contact#get-in-touch", icons: [{ src: "/icon.png?v=20260809b", sizes: "512x512" }] },
    ],
  };
}
