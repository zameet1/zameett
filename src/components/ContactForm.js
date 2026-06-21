"use client";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // Web3Forms redirects back here with ?sent=1 after a successful submission.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("sent=1")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of redirect query param after mount
      setSent(true);
      window.history.replaceState(null, "", window.location.pathname);
      const t = setTimeout(() => setSent(false), 8000);
      return () => clearTimeout(t);
    }
  }, []);

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
        <select name="I Am A" required defaultValue="">
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
        <select name="Service Required" required defaultValue="">
          <option value="" disabled>What do you need?</option>
          <option>Design &amp; Tech Packs Only</option>
          <option>Design Concept &amp; Styling</option>
          <option>Embroidery &amp; Textile Prints</option>
          <option>Full Manufacturing (Design to Delivery)</option>
          <option>Sampling &amp; Production</option>
          <option>Not Sure Yet — Let&rsquo;s Talk</option>
        </select>
      </div>
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
