"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PACKAGE_CATEGORIES, PRICING_PACKAGES, getPackagesByCategory } from "@/data/pricing";
import { trackAnalyticsEvent } from "@/lib/analytics";
import styles from "@/app/pricing/pricing.module.css";

const TIER_LABELS = {
  "design-techpack": ["One product", "Five-style capsule", "Seven-style collection"],
  "design-techpack-print": ["One printed product", "Five-style printed capsule", "Seven-style printed collection"],
  "custom-print": ["Simple artwork", "Detailed artwork", "Highly detailed artwork"],
};

function PackageCard({ pricingPackage, index }) {
  const contactUrl = `/contact?package=${encodeURIComponent(pricingPackage.contactParam)}#get-in-touch`;
  const visibleInclusions = pricingPackage.included.slice(0, 3);
  const additionalInclusions = pricingPackage.included.slice(3);
  const tierLabel = TIER_LABELS[pricingPackage.category]?.[index] || "Fixed-scope service";

  function trackSelection() {
    trackAnalyticsEvent("package_select", {
      package_slug: pricingPackage.slug,
      package_category: pricingPackage.category,
      starting_price_usd: pricingPackage.price,
    });
  }

  return (
    <article
      className={`${styles.packageCard} ${pricingPackage.featured ? styles.featuredCard : ""} ${pricingPackage.recommended ? styles.recommendedCard : ""} reveal`}
      id={`package-${pricingPackage.slug}`}
      data-pricing-card="true"
      style={{ "--reveal-delay": `${index * 65}ms` }}
    >
      {pricingPackage.recommended ? <p className={styles.recommendedBadge}>Recommended</p> : pricingPackage.featured ? <p className={styles.popularBadge}>Most popular</p> : null}
      <header className={styles.packageHeader}>
        <div className={styles.cardTopline}>
          <p className={styles.packageIndex}>{tierLabel}</p>
          <span className={styles.tierNumber} aria-hidden="true">0{index + 1}</span>
        </div>
        <h3>{pricingPackage.name}</h3>
        <p className={styles.packageSubtitle}>{pricingPackage.subtitle}</p>
        <p className={styles.price}>
          <span>{pricingPackage.priceQualifier}</span>
          <strong>${pricingPackage.price.toLocaleString("en-US")}</strong>
          <small>USD</small>
        </p>
        <p className={styles.standardScope}>For standard complexity matching the listed scope. We confirm fit before payment.</p>
        <p className={styles.packageDescription}>{pricingPackage.description}</p>
      </header>

      {pricingPackage.recommended ? (
        <div className={styles.premiumValue}>
          <span>{pricingPackage.recommendation || "Recommended premium package"}</span>
          <div>{pricingPackage.premiumHighlights?.map((item) => <strong key={item}>{item}</strong>)}</div>
        </div>
      ) : null}
      <div className={styles.bestFor}>
        <span>Best for</span>
        <p>{pricingPackage.bestFor}</p>
      </div>

      <dl className={styles.packageFacts}>
        <div><dt>Estimated delivery</dt><dd>{pricingPackage.delivery}</dd></div>
        <div><dt>Included revisions</dt><dd>{pricingPackage.revisions}</dd></div>
      </dl>

      <div className={styles.included}>
        <h4>Key deliverables</h4>
        <ul>{visibleInclusions.map((item) => <li key={item}>{item}</li>)}</ul>
        {additionalInclusions.length ? (
          <details className={styles.moreIncluded}>
            <summary>View all {pricingPackage.included.length} deliverables <span aria-hidden="true">+</span></summary>
            <ul>{additionalInclusions.map((item) => <li key={item}>{item}</li>)}</ul>
          </details>
        ) : null}
      </div>

      <details className={styles.exclusions}>
        <summary>Not included <span aria-hidden="true">+</span></summary>
        <ul>{pricingPackage.exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
      </details>

      <Link className={styles.packageCta} href={contactUrl} onClick={trackSelection}>
        {pricingPackage.recommended ? "Choose Recommended Premium" : "Select this package"} <span className={styles.ctaPrice}>from ${pricingPackage.price.toLocaleString("en-US")} USD</span><span aria-hidden="true">&rarr;</span>
      </Link>
      <Link className={styles.packageHelp} href="/contact#get-in-touch">Not sure? Ask us to recommend one</Link>
    </article>
  );
}

function categoryFromHash() {
  if (typeof window === "undefined") return "";
  const hash = window.location.hash;
  const tabPrefix = "#pricing-tab-";
  const packagePrefix = "#package-";

  if (hash.startsWith(tabPrefix)) {
    const categoryId = decodeURIComponent(hash.slice(tabPrefix.length));
    return PACKAGE_CATEGORIES.some((category) => category.id === categoryId) ? categoryId : "";
  }

  if (hash.startsWith(packagePrefix)) {
    const packageSlug = decodeURIComponent(hash.slice(packagePrefix.length));
    return PRICING_PACKAGES.find((item) => item.slug === packageSlug)?.category || "";
  }

  return "";
}

export default function PricingExplorer() {
  const [activeCategory, setActiveCategory] = useState(PACKAGE_CATEGORIES[0].id);
  const tabRefs = useRef([]);

  useEffect(() => {
    trackAnalyticsEvent("pricing_view", { page_path: "/pricing" });

    function syncCategoryFromHash() {
      const categoryId = categoryFromHash();
      if (!categoryId) return;
      const index = PACKAGE_CATEGORIES.findIndex((category) => category.id === categoryId);
      setActiveCategory(categoryId);
      window.requestAnimationFrame(() => {
        tabRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center" });
        if (window.location.hash.startsWith("#package-")) {
          window.setTimeout(() => {
            document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
        }
      });
    }

    syncCategoryFromHash();
    window.addEventListener("hashchange", syncCategoryFromHash);
    return () => window.removeEventListener("hashchange", syncCategoryFromHash);
  }, []);

  function activateCategory(categoryId, focusIndex) {
    if (categoryId !== activeCategory) {
      setActiveCategory(categoryId);
      trackAnalyticsEvent("pricing_category_change", { pricing_category: categoryId });
    }

    const index = typeof focusIndex === "number"
      ? focusIndex
      : PACKAGE_CATEGORIES.findIndex((category) => category.id === categoryId);
    const nextHash = `#pricing-tab-${categoryId}`;
    if (window.location.hash !== nextHash) window.history.replaceState(null, "", nextHash);

    window.requestAnimationFrame(() => {
      tabRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      if (typeof focusIndex === "number") tabRefs.current[index]?.focus();
    });
  }

  function handleTabKeyDown(event, currentIndex) {
    const lastIndex = PACKAGE_CATEGORIES.length - 1;
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;
    else return;

    event.preventDefault();
    activateCategory(PACKAGE_CATEGORIES[nextIndex].id, nextIndex);
  }

  return (
    <section className={styles.packagesSection} id="packages" aria-labelledby="packages-title">
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeading + " reveal"}>
          <div><p className={styles.eyebrow}>Choose your route</p><h2 id="packages-title">Pick what you need. Then compare three levels.</h2></div>
          <p>Choose garment development, garment plus print, or artwork only. The page then shows the three relevant package levels.</p>
        </div>

        <div className={styles.choiceHelp}>
          <div><strong>Not sure which route?</strong><span>Start with the output you need today. We review fit before payment.</span></div>
          <a href="/contact#get-in-touch">Ask for a recommendation →</a>
        </div>

        <div className={styles.tabList} role="tablist" aria-label="Pricing package categories">
          {PACKAGE_CATEGORIES.map((category, index) => {
            const selected = activeCategory === category.id;
            const packages = getPackagesByCategory(category.id);
            const startingPrice = Math.min(...packages.map((item) => item.price));
            return (
              <button
                key={category.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                type="button"
                role="tab"
                id={`pricing-tab-${category.id}`}
                aria-controls={`pricing-panel-${category.id}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => activateCategory(category.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>0{index + 1}</span>
                <span className={styles.tabCopy}>{category.label}<small>From ${startingPrice} · {packages.length} options</small></span>
                <span className={styles.tabArrow} aria-hidden="true">&rarr;</span>
              </button>
            );
          })}
        </div>
        <div className={styles.mobileRouteSelect}>
          <div className={styles.mobileRouteLabel}>
            <span>Step 1 of 2</span>
            <strong>Choose a service category</strong>
            <small>Tap one option, then compare its three package levels.</small>
          </div>
          <div className={styles.mobileCategoryGrid} role="group" aria-label="Choose a pricing service category">
            {PACKAGE_CATEGORIES.map((category, index) => {
              const selected = activeCategory === category.id;
              const packages = getPackagesByCategory(category.id);
              const startingPrice = Math.min(...packages.map((item) => item.price));
              return (
                <button
                  className={`${styles.mobileCategoryButton} ${selected ? styles.mobileCategoryActive : ""}`}
                  key={category.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => activateCategory(category.id)}
                >
                  <span className={styles.mobileCategoryNumber}>0{index + 1}</span>
                  <span className={styles.mobileCategoryCopy}>
                    <strong>{category.label}</strong>
                    <small>From ${startingPrice} USD &middot; {packages.length} options</small>
                  </span>
                  <span className={styles.mobileCategoryState}>{selected ? "Selected" : "View"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {PACKAGE_CATEGORIES.map((category) => {
          const selected = activeCategory === category.id;
          const packages = getPackagesByCategory(category.id);
          const startingPrice = Math.min(...packages.map((item) => item.price));
          return (
            <section
              key={category.id}
              className={styles.tabPanel}
              role="tabpanel"
              id={`pricing-panel-${category.id}`}
              aria-labelledby={`pricing-tab-${category.id}`}
              hidden={!selected}
              tabIndex={0}
            >
              <div className={styles.panelIntro}>
                <div className={styles.panelPath}><span>Step 2 of 2</span><i>Selected route</i><strong>{category.label}</strong></div>
                <p className={styles.panelNeed}>{category.question}</p>
                <h2>{category.title}</h2>
                <p>{category.summary}</p>
                <div className={styles.panelSummary} aria-label={category.label + " summary"}>
                  <span><strong>{packages.length}</strong> package levels</span>
                  <span><strong>${startingPrice}</strong> starting price</span>
                  <span><strong>No payment</strong> at enquiry</span>
                </div>
                {category.id === "design-techpack-print" ? <p className={styles.printNote}>Each print is delivered as a seamless repeat or placement artwork according to the approved project direction.</p> : null}
              </div>
              <div className={styles.packageGrid}>
                {packages.map((pricingPackage, index) => <PackageCard key={pricingPackage.slug} pricingPackage={pricingPackage} index={index} />)}
              </div>
            </section>
          );
        })}

        <noscript><style>{`.${styles.tabList}{display:none!important}.${styles.tabPanel}[hidden]{display:block!important}`}</style></noscript>
      </div>
    </section>
  );
}