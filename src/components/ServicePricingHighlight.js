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
  customChecklist = ["Scope and capability review", "MOQ and timeline confirmation", "Written inclusions and commercial terms"],
  customQuoteNote = "No hidden generic production price",
  customCtaLabel = "Request project review",
  customFooterDescription = "Custom quotes are based on the reviewed scope, required materials, quantity, complexity and delivery assumptions.",
  footerHref = "/pricing#packages",
  footerLabel = "Compare all pricing & deliverables",
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
                <div className="service-pricing-actions">
                  <Link
                    className="service-pricing-primary"
                    href={`/contact?package=${encodeURIComponent(item.contactParam)}#get-in-touch`}
                  >
                    Confirm This Package <span aria-hidden="true">→</span>
                  </Link>
                  <Link className="service-pricing-secondary" href={`/pricing#package-${item.slug}`}>
                    Full details
                  </Link>
                  <a
                    className="service-pricing-approved-payment"
                    href={item.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pay for approved ${item.name} on Whop (opens in a new tab)`}
                  >
                    Already approved? Pay on Whop <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="service-custom-quote reveal">
            <div><span>Reviewed before commitment</span><h3>{customTitle}</h3><p>{customDescription}</p></div>
            <ul>{customChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
            <div><strong>Custom quote</strong><small>{customQuoteNote}</small><Link href={quoteHref}>{customCtaLabel} <span aria-hidden="true">&rarr;</span></Link></div>
          </article>
        )}

        <div className="service-pricing-foot reveal"><p>{packages.length ? "Published prices cover standard complexity matching the stated scope. Final fit is confirmed before payment." : customFooterDescription}</p><Link href={footerHref}>{footerLabel} <span aria-hidden="true">&rarr;</span></Link></div>
      </div>
    </section>
  );
}
