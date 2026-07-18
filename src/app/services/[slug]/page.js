import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GigGallery from "@/components/GigGallery";
import { GIGS, getGig } from "../gigs";

const siteUrl = "https://zameett.com";

export function generateStaticParams() {
  return GIGS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gig = getGig(slug);
  if (!gig) return {};
  return {
    title: gig.title,
    description: gig.tagline,
    alternates: { canonical: `/services/${gig.slug}` },
    openGraph: {
      title: `${gig.title} | Zameett`,
      description: gig.tagline,
      url: `/services/${gig.slug}`,
      images: [{ url: gig.cover, width: 1200, height: 630, alt: gig.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${gig.title} | Zameett`,
      description: gig.tagline,
      images: [gig.cover],
    },
  };
}

export default async function GigPage({ params }) {
  const { slug } = await params;
  const gig = getGig(slug);
  if (!gig) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: gig.title,
    description: gig.tagline,
    provider: { "@type": "Organization", name: "Zameett", url: siteUrl },
    areaServed: "Worldwide",
    serviceType: "Modest Fashion Design",
    image: `${siteUrl}${gig.cover}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: gig.title, item: `${siteUrl}/services/${gig.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="gig-detail premium-detail-page">
        <div className="inner">
          <p className="crumb">
            <a href="/">Home</a> &nbsp;/&nbsp; <a href="/services">Services</a> &nbsp;/&nbsp; {gig.short}
          </p>

          <div className="gig-top">
            <GigGallery images={gig.gallery} alt={gig.title} />

            <div className="gig-info">
              <p className="s-tag">Featured Service</p>
              <h1 className="gig-title">{gig.title}</h1>
              <p className="gig-tagline">{gig.tagline}</p>

              <ul className="gig-highlights">
                {gig.list.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="gig-actions">
                <a href={`/contact?service=${gig.slug}#get-in-touch`} className="btn btn-burg">
                  Send Inquiry →
                </a>
                {gig.pdf && (
                  <a
                    href={gig.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    View Portfolio PDF
                  </a>
                )}
              </div>

              {gig.pdf && (
                <a className="gig-pdf-dl" href={gig.pdf} download>
                  ⬇ Download portfolio (PDF)
                </a>
              )}
            </div>
          </div>

          <div className="gig-body">
            <div className="gig-desc">
              {gig.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <h2>{gig.listTitle}</h2>
              <ul className="gig-list">
                {gig.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>{gig.whyTitle}</h2>
              <ul className="gig-list">
                {gig.why.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="gig-note">{gig.note}</p>

              <a href={`/contact?service=${gig.slug}#get-in-touch`} className="btn btn-gold gig-cta">
                Start Your Project →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
