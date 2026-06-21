import Script from "next/script";

// GA4 Measurement IDs are not secret — they are always visible in the page
// source on every site. Hardcoding it as a fallback sidesteps Hostinger not
// exposing env vars at build time (static pages inline NEXT_PUBLIC_* at build).
const DEFAULT_GA_ID = "G-VCR2ENVVJ5";

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
