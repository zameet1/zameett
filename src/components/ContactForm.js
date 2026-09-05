"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GIGS } from "@/app/services/gigs";
import { SOLUTIONS } from "@/app/solutions/solutions";
import { PRICING_PACKAGES } from "@/data/pricing";
import { trackAnalyticsEvent, trackOpenAIAdsCustomEvent } from "@/lib/analytics";
import styles from "./ContactForm.module.css";

const CUSTOM = "__custom__";
const GOOGLE_ADS_LEAD_CONVERSION = "AW-18258289518/UDVqCKWikNYcEO7GnYJE";
const MAX_FILES_BYTES = 5 * 1024 * 1024;
const BASE_SERVICES = [
  "Fashion Design & Product Development",
  "Design & Tech Packs Only",
  "Sampling",
  "Modest-Wear Manufacturing",
  "Embroidery & Textile Prints",
  "Production Review",
  "Not sure yet. I need guidance",
];
const STEP_LABELS = ["Your details", "Project scope", "References & consent"];

function getPackagePrefill(packageParam) {
  const pricingPackage = PRICING_PACKAGES.find((item) => item.contactParam === packageParam);
  if (pricingPackage) {
    const stylesMatch = pricingPackage.subtitle.match(/^(\d+)\s/);
    return {
      pricingPackage,
      productCategory:
        pricingPackage.category === "custom-print"
          ? "Textile print / surface pattern"
          : "Fashion apparel / garment",
      projectRoute: "Design / technical development only",
      numberOfStyles:
        pricingPackage.category === "custom-print" ? "" : stylesMatch?.[1] || "",
    };
  }

  if (packageParam === "production-review") {
    return {
      pricingPackage: null,
      productCategory: "",
      projectRoute: "Sampling and manufacturing",
      numberOfStyles: "",
    };
  }

  return {
    pricingPackage: null,
    productCategory: "",
    projectRoute: "",
    numberOfStyles: "",
  };
}

function validCurrentStep(form, step) {
  const controls = [...form.querySelectorAll('[data-form-step="' + step + '"] input, [data-form-step="' + step + '"] select, [data-form-step="' + step + '"] textarea')];
  const invalid = controls.find((control) => !control.checkValidity());
  if (!invalid) return true;
  invalid.reportValidity();
  invalid.focus();
  return false;
}

export default function ContactForm({ initialService = "", initialPackageParam = "" }) {
  const formRef = useRef(null);
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [service, setService] = useState(initialService);
  const [packageParam, setPackageParam] = useState(initialPackageParam);
  const [customService, setCustomService] = useState("");
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const initialPrefill = useMemo(
    () => getPackagePrefill(initialPackageParam),
    [initialPackageParam],
  );
  const [productCategory, setProductCategory] = useState(initialPrefill.productCategory);
  const [projectRoute, setProjectRoute] = useState(initialPrefill.projectRoute);
  const [numberOfStyles, setNumberOfStyles] = useState(initialPrefill.numberOfStyles);
  const selectedPricingPackage = useMemo(
    () => PRICING_PACKAGES.find((item) => item.contactParam === packageParam),
    [packageParam],
  );

  useEffect(() => {
    if (window.location.hash !== "#get-in-touch") return undefined;
    const scrollTimer = window.setTimeout(() => {
      document.getElementById("project-brief")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 140);
    return () => window.clearTimeout(scrollTimer);
  }, []);
  const serviceOptions = useMemo(
    () => [...new Set([
      ...PRICING_PACKAGES.map((item) => item.name),
      ...GIGS.map((item) => item.serviceValue),
      ...SOLUTIONS.map((item) => item.contactValue),
      ...BASE_SERVICES,
    ])],
    [],
  );

  function applyPackagePrefill(nextPackageParam) {
    const prefill = getPackagePrefill(nextPackageParam);
    setProductCategory(prefill.productCategory);
    setProjectRoute(prefill.projectRoute);
    setNumberOfStyles(prefill.numberOfStyles);
  }

  function handleServiceChange(event) {
    const nextService = event.target.value;
    const nextPackage = PRICING_PACKAGES.find((item) => item.name === nextService);
    setService(nextService);
    setPackageParam(nextPackage?.contactParam || "");
    applyPackagePrefill(nextPackage?.contactParam || "");
  }

  function markStarted() {
    if (started) return;
    setStarted(true);
    trackAnalyticsEvent("contact_form_start", { form_location: window.location.pathname });
  }

  function goToStep(nextStep) {
    const form = formRef.current;
    if (nextStep > step && form && !validCurrentStep(form, step)) return;
    setStep(nextStep);
    setSubmitError("");
    trackAnalyticsEvent("contact_form_step", { form_step: nextStep, form_location: window.location.pathname });
    requestAnimationFrame(() => {
      formRef.current?.querySelector('[data-form-step="' + nextStep + '"] input, [data-form-step="' + nextStep + '"] select, [data-form-step="' + nextStep + '"] textarea')?.focus();
    });
  }

  function validateFiles(form) {
    const inputs = [...form.querySelectorAll('input[type="file"]')];
    const files = inputs.flatMap((input) => [...input.files]);
    const total = files.reduce((sum, file) => sum + file.size, 0);
    if (total <= MAX_FILES_BYTES) {
      setFileError("");
      return true;
    }
    setFileError("Attachments must be 5 MB or less in total. Please use a Drive or WeTransfer link for larger files.");
    inputs[0]?.focus();
    return false;
  }

  async function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validCurrentStep(form, 3) || !validateFiles(form)) return;

    setSubmitting(true);
    setSubmitError("");
    setSent(false);
    try {
      const response = await fetch("/api/contact", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your enquiry could not be sent.");

      trackAnalyticsEvent("lead_submit", {
        package_slug: packageParam || "custom",
        service_name: service || "not_selected",
        form_location: window.location.pathname,
      });
      trackAnalyticsEvent("conversion", {
        send_to: GOOGLE_ADS_LEAD_CONVERSION,
      });
      trackOpenAIAdsCustomEvent("lead_form_submit");
      form.reset();
      setService("");
      setPackageParam("");
      setCustomService("");
      setProductCategory("");
      setProjectRoute("");
      setNumberOfStyles("");
      setStep(1);
      setSent(true);
      setStarted(false);
    } catch (error) {
      setSubmitError(error.message || "Your enquiry could not be sent. Please email hello@zameett.com.");
      trackAnalyticsEvent("lead_submit_error", { form_location: window.location.pathname });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      className={"contact-form " + styles.form}
      method="POST"
      encType="multipart/form-data"
      onFocusCapture={markStarted}
      onSubmit={submitForm}
      noValidate
    >
      <input type="hidden" name="Package" value={packageParam} />
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="Website" type="text" tabIndex="-1" autoComplete="off" />
      </div>

      {(service || selectedPricingPackage || packageParam === "production-review") && (
        <aside className={styles.prefillSummary} aria-label="Selected request summary">
          <div>
            <span>Selected request</span>
            <strong>{selectedPricingPackage?.name || (packageParam === "production-review" ? "Production Review" : service)}</strong>
            <p>
              {selectedPricingPackage?.subtitle ||
                (packageParam === "production-review"
                  ? "Sampling and manufacturing requirements reviewed around your product and quantity."
                  : "This service was selected from the page you visited. You can confirm or change it in project scope.")}
            </p>
          </div>
          {selectedPricingPackage && (
            <dl>
              <div><dt>Starting at</dt><dd>${selectedPricingPackage.price.toLocaleString("en-US")} USD</dd></div>
              <div><dt>Delivery</dt><dd>{selectedPricingPackage.delivery}</dd></div>
              <div><dt>Revisions</dt><dd>{selectedPricingPackage.revisions}</dd></div>
            </dl>
          )}
        </aside>
      )}

      <div className={styles.progress} aria-label={"Step " + step + " of 3: " + STEP_LABELS[step - 1]}>
        {STEP_LABELS.map((label, index) => {
          const number = index + 1;
          return (
            <button
              key={label}
              type="button"
              className={number === step ? styles.activeStep : ""}
              aria-current={number === step ? "step" : undefined}
              onClick={() => number <= step && goToStep(number)}
              disabled={number > step}
            >
              <span>{String(number).padStart(2, "0")}</span>{label}
            </button>
          );
        })}
      </div>

      <section className={styles.stepPanel} data-form-step="1" hidden={step !== 1} aria-labelledby="contact-step-one">
        <div className={styles.stepHeading}>
          <span>Step 1 of 3</span><h3 id="contact-step-one">How can we reach you?</h3><p>Start with the essentials. Project details come next.</p>
        </div>
        <div className="form-row">
          <div className="form-group"><label htmlFor="first-name">First Name *</label><input id="first-name" type="text" name="First Name" autoComplete="given-name" maxLength="80" required /></div>
          <div className="form-group"><label htmlFor="last-name">Last Name *</label><input id="last-name" type="text" name="Last Name" autoComplete="family-name" maxLength="80" required /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label htmlFor="email">Email Address *</label><input id="email" type="email" name="Email" autoComplete="email" maxLength="160" required /></div>
          <div className="form-group"><label htmlFor="phone">WhatsApp / Phone</label><input id="phone" type="tel" name="Phone" autoComplete="tel" maxLength="40" placeholder="+1 000 000 0000" /></div>
        </div>
        <div className="form-group"><label htmlFor="brand">Brand Name</label><input id="brand" type="text" name="Brand Name" maxLength="120" /></div>
      </section>

      <section className={styles.stepPanel} data-form-step="2" hidden={step !== 2} aria-labelledby="contact-step-two">
        <div className={styles.stepHeading}>
          <span>Step 2 of 3</span><h3 id="contact-step-two">What are you developing?</h3><p>These details help us recommend the right scope.</p>
        </div>
        {packageParam && <p className={styles.selectedPackage}>Package, service and applicable scope fields are pre-filled below. Please confirm the remaining project details.</p>}
        <div className="form-group">
          <label htmlFor="service">Service Required *</label>
          <select id="service" name="Service Required" required value={service} onChange={handleServiceChange}>
            <option value="" disabled>What do you need?</option>
            {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            <option value={CUSTOM}>Custom / something else</option>
          </select>
        </div>
        {service === CUSTOM && <div className="form-group"><label htmlFor="custom-service">Custom Request *</label><input id="custom-service" type="text" name="Custom Service" maxLength="160" value={customService} onChange={(event) => setCustomService(event.target.value)} required /></div>}
        <div className="form-row">
          <div className="form-group"><label htmlFor="category">Product Category *</label><input id="category" type="text" name="Product Category" maxLength="120" placeholder="e.g. abayas, dresses, activewear" value={productCategory} onChange={(event) => setProductCategory(event.target.value)} required /></div>
          <div className="form-group"><label htmlFor="route">Project Route *</label><select id="route" name="Project Route" required value={projectRoute} onChange={(event) => setProjectRoute(event.target.value)}><option value="" disabled>Select a route</option><option>Design / technical development only</option><option>Sample development</option><option>Sampling and manufacturing</option><option>Not sure yet</option></select></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label htmlFor="stage">Project Stage *</label><select id="stage" name="Project Stage" required defaultValue=""><option value="" disabled>Where are you now?</option><option>Idea / mood board</option><option>Designs ready</option><option>Tech packs ready</option><option>Sampling in progress</option><option>Ready for reviewed production</option><option>Existing brand / reorder</option></select></div>
          <div className="form-group"><label htmlFor="budget">Estimated Budget *</label><select id="budget" name="Estimated Budget" required defaultValue=""><option value="" disabled>Select a range</option><option>Under $500</option><option>$500 to $1,500</option><option>$1,500 to $5,000</option><option>$5,000 to $15,000</option><option>$15,000+</option><option>Not sure yet</option></select></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label htmlFor="styles">Number of Styles</label><input id="styles" type="number" name="Number of Styles" min="1" max="500" inputMode="numeric" value={numberOfStyles} onChange={(event) => setNumberOfStyles(event.target.value)} /></div>
          <div className="form-group"><label htmlFor="quantity">Required Quantity</label><input id="quantity" type="text" name="Required Quantity" maxLength="100" placeholder="Per style / colour if known" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label htmlFor="sizes">Target Sizes</label><input id="sizes" type="text" name="Target Sizes" maxLength="100" placeholder="e.g. XS to XL or custom lengths" /></div>
          <div className="form-group"><label htmlFor="market">Target Market / Country *</label><input id="market" type="text" name="Target Market or Country" maxLength="100" required /></div>
        </div>
        <div className="form-group"><label htmlFor="delivery">Required Delivery Date</label><input id="delivery" type="date" name="Required Delivery Date" /></div>
      </section>

      <section className={styles.stepPanel} data-form-step="3" hidden={step !== 3} aria-labelledby="contact-step-three">
        <div className={styles.stepHeading}>
          <span>Step 3 of 3</span><h3 id="contact-step-three">Add references and final details.</h3><p>Small attachments are optional. A Drive or WeTransfer link works for larger files.</p>
        </div>
        <div className="form-row">
          <div className="form-group"><label htmlFor="communication">Preferred Communication</label><select id="communication" name="Preferred Communication" defaultValue="Email"><option>Email</option><option>WhatsApp</option><option>Video call</option></select></div>
          <div className="form-group"><label htmlFor="nda">NDA Required?</label><select id="nda" name="NDA Required" defaultValue="No"><option>No</option><option>Yes</option><option>Discuss first</option></select></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label htmlFor="heard">How Did You Hear About Us?</label><select id="heard" name="How Did You Hear About Us" defaultValue=""><option value="">Select</option><option>Google</option><option>Instagram</option><option>Pinterest</option><option>Fiverr</option><option>Referral</option><option>Other</option></select></div>
          <div className="form-group"><label htmlFor="large-files">Large File Link</label><input id="large-files" type="url" name="Google Drive or WeTransfer Link" maxLength="500" placeholder="https://" /></div>
        </div>
        <fieldset className="contact-files">
          <legend>Optional Reference Files</legend><p>PDF, JPG, PNG or ZIP. Maximum 5 MB total.</p>
          <div className="form-row">
            <div className="form-group"><label htmlFor="references">References</label><input id="references" type="file" name="Reference File" accept=".pdf,.jpg,.jpeg,.png,.zip,application/pdf,image/jpeg,image/png,application/zip" /></div>
            <div className="form-group"><label htmlFor="sketch">Sketch</label><input id="sketch" type="file" name="Sketch File" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" /></div>
          </div>
          <div className="form-group"><label htmlFor="tech-pack">Existing Tech Pack</label><input id="tech-pack" type="file" name="Tech Pack File" accept=".pdf,.zip,application/pdf,application/zip" /></div>
        </fieldset>
        {fileError && <p className="form-error" role="alert">{fileError}</p>}
        <div className="form-group"><label htmlFor="message">Project Details *</label><textarea id="message" name="Message" maxLength="4000" required placeholder="Describe your collection, fabrics, quantities, target customer and important constraints." /></div>
        <label className="form-consent"><input type="checkbox" name="Privacy Consent" value="Accepted" required /><span>I have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and consent to Zameett using these details to respond to my enquiry. *</span></label>
      </section>

      <div className={styles.actions}>
        {step > 1 && <button type="button" className="btn btn-outline" onClick={() => goToStep(step - 1)}>← Back</button>}
        {step < 3 ? <button type="button" className="btn btn-burg" onClick={() => goToStep(step + 1)}>Continue →</button> : <button type="submit" className="btn btn-burg contact-submit" disabled={submitting}>{submitting ? "Sending…" : "Send Enquiry →"}</button>}
      </div>
      {submitError && <p className="form-error" role="alert">{submitError} You can also email <a href="mailto:hello@zameett.com">hello@zameett.com</a>.</p>}
      {sent && <p className="form-success" role="status">✓ Thank you. Your enquiry has been sent. We aim to respond within one business day.</p>}
    </form>
  );
}
