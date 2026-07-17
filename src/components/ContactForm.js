"use client";
import { useEffect, useState } from "react";
import { GIGS } from "@/app/services/gigs";
import { SOLUTIONS } from "@/app/solutions/solutions";

const CUSTOM = "__custom__";

// Base service options (the two featured gigs are prepended automatically).
const BASE_SERVICES = [
  "Design & Tech Packs Only",
  "Design Concept & Styling",
  "Embroidery & Textile Prints",
  "Full Manufacturing (Design to Delivery)",
  "Sampling & Production",
  "Not Sure Yet — Let's Talk",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [service, setService] = useState("");
  const [customService, setCustomService] = useState("");

  // Web3Forms redirects back here with ?sent=1 after a successful submission.
  // We also support ?service=<gig-slug> to pre-select a featured service when
  // the visitor arrives from a gig's "Send Inquiry" button.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    if (params.get("sent") === "1") {
      window.history.replaceState(null, "", window.location.pathname);
      const showTimer = setTimeout(() => setSent(true), 0);
      const hideTimer = setTimeout(() => setSent(false), 8000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }

    const slug = params.get("service");
    if (slug) {
      const gig = GIGS.find((g) => g.slug === slug);
      const solution = SOLUTIONS.find((item) => item.slug === slug);
      const selectedService = gig?.serviceValue || solution?.contactValue;
      if (selectedService) {
        window.history.replaceState(null, "", window.location.pathname);
        const selectTimer = setTimeout(() => setService(selectedService), 0);
        return () => clearTimeout(selectTimer);
      }
    }
  }, []);

  const gigOptions = [...new Set([...GIGS.map((g) => g.serviceValue), ...SOLUTIONS.map((item) => item.contactValue)])];

  return (
    <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value="10e56bce-ccaa-4fbe-b986-8d3a18d3496e" />
      <input type="hidden" name="subject" value="New enquiry from zameett.com" />
      <input type="hidden" name="from_name" value="Zameett Website" />
      <input type="hidden" name="redirect" value="https://zameett.com/contact?sent=1" />

      <div className="form-row">
        <div className="form-group">
          <label>First Name *</label>
          <input type="text" name="First Name" placeholder="Your first name" required />
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input type="text" name="Last Name" placeholder="Your last name" required />
        </div>
      </div>
      <div className="form-group">
        <label>Email Address *</label>
        <input type="email" name="Email" placeholder="your@email.com" required />
      </div>
      <div className="form-group">
        <label>WhatsApp / Phone</label>
        <input type="text" name="Phone" placeholder="+1 (000) 000 0000" />
      </div>
      <div className="form-group">
        <label>I Am A *</label>
        <select name="I Am A" aria-label="I am a" required defaultValue="">
          <option value="" disabled>Select your type</option>
          <option>Small Modest Fashion Brand</option>
          <option>Independent Designer</option>
          <option>Boutique Owner</option>
          <option>Growing Label</option>
          <option>Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Service Required *</label>
        <select
          name="Service Required"
          aria-label="Service required"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="" disabled>What do you need?</option>
          {gigOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
          {BASE_SERVICES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
          <option value={CUSTOM}>Custom / Something Else (type below)</option>
        </select>
      </div>
      {service === CUSTOM && (
        <div className="form-group">
          <label>Describe Your Custom Request *</label>
          <input
            type="text"
            name="Custom Service"
            aria-label="Describe your custom request"
            placeholder="Tell us the exact service you need…"
            value={customService}
            onChange={(e) => setCustomService(e.target.value)}
            required
          />
        </div>
      )}
      <div className="form-group">
        <label>Tell Us About Your Project</label>
        <textarea
          name="Message"
          placeholder="Describe your collection, garment types, quantities, timeline, and any other details that will help us understand your vision…"
        />
      </div>
      <button
        type="submit"
        className="btn btn-burg"
        style={{ width: "100%", padding: 18, fontSize: 11, cursor: "pointer", border: "none" }}
      >
        Send Enquiry →
      </button>
      {sent && (
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--gold)", marginTop: 4 }}>
          ✓ Thank you! We&rsquo;ll be in touch within 24 hours.
        </p>
      )}
    </form>
  );
}
