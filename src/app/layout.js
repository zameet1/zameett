import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import SiteChrome from "@/components/SiteChrome";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = "https://zameett.com";
const siteTitle = "Zameett — Modest Fashion Design & Manufacturing";
const siteDescription =
  "From design concepts and tech packs to full manufacturing and worldwide delivery. Zameett specialises exclusively in modest fashion — abayas, bias cuts, scarves and modest formal wear, crafted in Pakistan and delivered worldwide.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Zameett",
  },
  description: siteDescription,
  keywords: [
    "modest fashion",
    "abaya manufacturer",
    "modest wear design",
    "tech pack design",
    "Pakistan fashion manufacturer",
    "bias cut modest wear",
    "modest fashion tech packs",
  ],
  authors: [{ name: "Zameett" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Zameett",
    images: [{ url: "/images/21.jpeg", width: 1200, height: 630, alt: "Zameett modest wear collection" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/21.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <CartProvider>
          <Nav />
          {children}
          <CartDrawer />
          <Toast />
          <SiteChrome />
        </CartProvider>
      </body>
    </html>
  );
}
