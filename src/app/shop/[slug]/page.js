import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GigGallery from "@/components/GigGallery";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, getProduct } from "../products";
import { FaEnvelope } from "react-icons/fa6";

export const dynamicParams = false;

const siteUrl = "https://zameett.com";
export function generateStaticParams() { return PRODUCTS.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const product = getProduct(slug); if (!product) return {}; return { title: product.name, description: product.tagline, alternates: { canonical: `/shop/${product.slug}` }, openGraph: { title: `${product.name} | Zameett`, description: product.tagline, url: `/shop/${product.slug}`, images: [{ url: product.cover, width: 1600, height: 1132, alt: product.name }] }, twitter: { card: "summary_large_image", title: `${product.name} | Zameett`, description: product.tagline, images: [product.cover] } }; }

export default async function ProductPage({ params }) {
  const { slug } = await params; const product = getProduct(slug); if (!product) notFound();
  const productSchema = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.tagline, image: `${siteUrl}${product.cover}`, brand: { "@type": "Brand", name: "Zameett" }, offers: { "@type": "Offer", price: product.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${siteUrl}/shop/${product.slug}` } };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` }, { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/shop/${product.slug}` }] };
  const related = PRODUCTS.filter((item) => item.slug !== product.slug);
  return <><JsonLd data={[productSchema, breadcrumbSchema]} />
    <section className="gig-detail premium-detail-page product-detail-page" id="product-details"><div className="inner">
      <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/shop">Shop</a> &nbsp;/&nbsp; {product.short}</p>
      <div className="gig-top"><GigGallery images={product.gallery} alt={product.name} /><div className="gig-info">
        <p className="s-tag">Digital Product</p><h1 className="gig-title">{product.name}</h1><p className="gig-tagline">{product.tagline}</p><p className="prod-price-lg">{product.price} <span>· instant digital delivery</span></p>
        <ul className="gig-highlights">{product.list.slice(0,4).map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="gig-actions"><a href="/contact#get-in-touch" className="btn btn-burg">Ask about availability →</a><a href="/pricing" className="btn btn-outline">View current packages</a></div>
        <p className="digital-refund-alert"><strong>Digital product.</strong> Due to immediate access, purchases are non-refundable once the download has been delivered. Please review the included formats before purchasing.</p>
        <div className="checkout-trust-panel"><div><FaEnvelope /><span><strong>Digital delivery</strong>Files are delivered to the confirmed project email</span></div></div>
      </div></div>
      <div className="gig-body"><div className="gig-desc">{product.intro.map((text) => <p key={text}>{text}</p>)}<h2>{product.listTitle}</h2><ul className="gig-list">{product.list.map((item) => <li key={item}>{item}</li>)}</ul><h2>Compatibility & licence</h2><div className="product-spec-table">{Object.entries(product.specs).map(([key,value]) => <div key={key}><strong>{key.replace(/([A-Z])/g," $1")}</strong><span>{value}</span></div>)}</div><p className="gig-note">{product.note}</p><div className="product-faq"><h2>Before you buy</h2><details><summary>Does this create correct garment measurements?</summary><p>No. Measurement and grading fields are editable layouts only. A qualified technical designer and pattern maker must create and validate product-specific values.</p></details><details><summary>Can I resell the template?</summary><p>No. The licence permits use for one purchasing brand&apos;s internal product development. The template itself may not be resold, shared or redistributed.</p></details><details><summary>Is Canva included?</summary><p>No. Full editing requires Adobe Illustrator. Canva, Excel and Google Sheets versions are not included.</p></details></div><a href="/contact#get-in-touch" className="btn btn-gold gig-cta">Ask about this template →</a></div></div>
      <section className="related-products"><p className="s-tag">Related Templates</p><div>{related.map((item) => <Link className="related-product-card" key={item.slug} href={`/shop/${item.slug}`}><span className="related-product-media"><Image src={item.cover} alt={`${item.short} preview`} width={160} height={120} sizes="(max-width: 640px) 112px, 160px" /></span><span className="related-product-copy"><small>Digital template</small><strong>{item.short}</strong><span className="related-product-price">{item.price} →</span></span></Link>)}</div></section>
    </div></section>
    <aside className="mobile-sticky-buy" aria-label={`Buy ${product.short}`}>
      <div className="mobile-sticky-buy-summary"><span>{product.short}</span><strong>{product.price}</strong></div>
      <Link href="/contact#get-in-touch" className="btn btn-burg">Ask availability</Link>
    </aside>
    <Footer /></>;
}
