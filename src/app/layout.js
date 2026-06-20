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

export const metadata = {
  title: "Zameett — Modest Fashion Design & Manufacturing",
  description:
    "From design concepts and tech packs to full manufacturing and worldwide delivery. Zameett specialises exclusively in modest fashion — abayas, bias cuts, scarves and modest formal wear.",
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
