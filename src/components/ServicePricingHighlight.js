import Link from "next/link";

export default function ServicePricingHighlight({
  packages = [],
  sectionId = "service-pricing",
  eyebrow = "Clear Pricing Route",
  title = "Choose the right starting scope.",
  description = "Compare the closest package, then send a brief so scope and fit can be confirmed before payment.",
  quoteHref = "/contact#get-in-touch",
  customTitle = "Project-specific quote",
  customDescription = "Physical development and production are quoted after the product, quantity, materials, complexity and destination have been reviewed.",
}) {
  return (
    <section className="service-pricing-showcase" id={sectionId} aria-labelledby={`${sectionId}-title`}>
      <div className="inner">
        <div className="service-pricing-head reveal">
          <div><p className="s-tag">{eyebrow}</p><h2 className="s-title" id={`${sectionId}-title`}>{title}</h2></div>
          <p className="s-body">{description}</p>
        </div>

        {packages.length ? (
          <div className="service-pricing-grid">
            {packages.map((item, index) => (
              <article className={`service-pricing-card reveal${item.recommended ? " recommended" : ""}${item.featured ? " popular" : ""}`} style={{ "--reveal-delay": `${index * 70}ms` }} key={item.slug}>
                {(item.recommended || item.featured) && <span className="service-pricing-badge">{item.recommended ? "Recommended" : "Most popular"}</span>}
                <small>{item.priceQualifier}</small>
                <h3>{item.name}</h3>
                <p className="service-pricing-subtitle">{item.subtitle}</p>
                <div className="service-pricing-price"><strong>${item.price.toLocaleString("en-US")}</strong><i>USD</i></div>
                <p>{item.description}</p>
                <dl><div><dt>Delivery</dt><dd>{item.delivery}</dd></div><div><dt>Revisions</dt><dd>{item.revisions}</dd></div></dl>
                <ul>{(item.premiumHighlights || item.included.slice(0, 4)).map((included) => <li key={included}>{included}</li>)}</ul>
                <div className="service-pricing-actions"><Link href={`/contact?package=${item.contactParam}#get-in-touch`}>{item.ctaLabel} <span aria-hidden="true">&rarr;</span></Link><Link href={`/pricing#package-${item.slug}`}>Full details</Link></div>
              </article>
            ))}
          </div>
        ) : (
          <article className="service-custom-quote reveal">
            <div><span>Reviewed before commitment</span><h3>{customTitle}</h3><p>{customDescription}</p></div>
            <ul><li>Scope and capability review</li><li>MOQ and timeline confirmation</li><li>Written inclusions and commercial terms</li></ul>
            <div><strong>Custom quote</strong><small>No hidden generic production price</small><Link href={quoteHref}>Request project review <span aria-hidden="true">&rarr;</span></Link></div>
          </article>
        )}

        <div className="service-pricing-foot reveal"><p>{packages.length ? "Published prices cover standard complexity matching the stated scope. Final fit is confirmed before payment." : "Custom quotes are based on the reviewed scope, required materials, quantity, complexity and delivery assumptions."}</p><Link href="/pricing#packages">Compare all pricing &amp; deliverables <span aria-hidden="true">&rarr;</span></Link></div>
      </div>
    </section>
  );
}
