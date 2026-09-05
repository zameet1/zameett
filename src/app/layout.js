import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import SiteChrome from "@/components/SiteChrome";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import OpenAIAdsPixel from "@/components/OpenAIAdsPixel";
import AttributionTracker from "@/components/AttributionTracker";
import PwaManager from "@/components/PwaManager";
import { DEFAULT_SOCIAL_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, createSiteIdentitySchema } from "@/lib/seo";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300","400","600","700"], style: ["normal","italic"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300","400","500","600"] });
const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || "GTM-T7NL4P3W";
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim() || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const siteTitle = "Zameett | Fashion Design & Product Development";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: siteTitle, template: "%s | Zameett" },
  description: SITE_DESCRIPTION,
  referrer: "strict-origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  applicationName: SITE_NAME,
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: SITE_NAME },
  formatDetection: { email: false, address: false, telephone: false },
  keywords: ["fashion design services","fashion tech pack design","textile print design","fashion product development","modest wear development","abaya manufacturer Pakistan","modest fashion manufacturer"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico?v=20260809b", sizes: "any" },
      { url: "/icon.png?v=20260809b", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon.ico?v=20260809b" }],
    apple: [{ url: "/apple-icon.png?v=20260809b", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", url: SITE_URL, title: siteTitle, description: SITE_DESCRIPTION, siteName: SITE_NAME, images: [DEFAULT_SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: siteTitle, description: SITE_DESCRIPTION, images: [{ url: DEFAULT_SOCIAL_IMAGE.url, alt: DEFAULT_SOCIAL_IMAGE.alt }] },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#4A0E2B" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cormorant.variable + " " + jost.variable}>
      <head>
        <Script id="google-consent-default" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html:
          "window.dataLayer=window.dataLayer||[];" +
          "window.gtag=window.gtag||function(){dataLayer.push(arguments)};" +
          "gtag('consent','default',{" +
          "'analytics_storage':'denied'," +
          "'ad_storage':'denied'," +
          "'ad_user_data':'denied'," +
          "'ad_personalization':'denied'," +
          "'functionality_storage':'granted'," +
          "'security_storage':'granted'," +
          "'wait_for_update':500});"
        }} />
        <Script id="google-tag-manager" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html:
          "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
          "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
          "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
          "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
          "})(window,document,'script','dataLayer','" + googleTagManagerId + "');"
        }} />
      </head>
      <body>
        <noscript><iframe src={"https://www.googletagmanager.com/ns.html?id=" + googleTagManagerId} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>
        <JsonLd data={createSiteIdentitySchema()} />
        <GoogleAnalytics />
        <OpenAIAdsPixel />
        <AttributionTracker />
        <PwaManager />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Nav />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <CookieConsent />
        <SiteChrome />
      </body>
    </html>
  );
}
