"use client";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 6000);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>First Name *</label>
          <input type="text" placeholder="Your first name" required />
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input type="text" placeholder="Your last name" required />
        </div>
      </div>
      <div className="form-group">
        <label>Email Address *</label>
        <input type="email" placeholder="your@email.com" required />
      </div>
      <div className="form-group">
        <label>WhatsApp / Phone</label>
        <input type="text" placeholder="+1 (000) 000 0000" />
      </div>
      <div className="form-group">
        <label>I Am A *</label>
        <select required defaultValue="">
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
        <select required defaultValue="">
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
        <textarea placeholder="Describe your collection, garment types, quantities, timeline, and any other details that will help us understand your vision…" />
      </div>
      <button
        type="submit"
        className="btn btn-burg"
        style={{ width: "100%", padding: 18, fontSize: 11, cursor: "pointer", border: "none" }}
      >
        Send Enquiry →
      </button>
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "var(--gold)",
          display: submitted ? "block" : "none",
          marginTop: 4,
        }}
      >
        ✓ Thank you! We&rsquo;ll be in touch within 24 hours.
      </p>
    </form>
  );
}
