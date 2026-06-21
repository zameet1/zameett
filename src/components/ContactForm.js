"use client";
import { useState } from "react";

// Web3Forms public access key — sends submissions to the registered inbox.
// This key is meant to be public (it only allows sending TO the owner's email).
const WEB3FORMS_KEY = "10e56bce-ccaa-4fbe-b986-8d3a18d3496e";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    setStatus("sending");

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New enquiry from zameett.com");
    formData.append("from_name", "Zameett Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 8000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
        disabled={status === "sending"}
        style={{ width: "100%", padding: 18, fontSize: 11, cursor: status === "sending" ? "wait" : "pointer", border: "none", opacity: status === "sending" ? 0.7 : 1 }}
      >
        {status === "sending" ? "Sending…" : "Send Enquiry →"}
      </button>
      {status === "success" && (
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--gold)", marginTop: 4 }}>
          ✓ Thank you! We&rsquo;ll be in touch within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p style={{ textAlign: "center", fontSize: 13, color: "#c0392b", marginTop: 4 }}>
          Something went wrong. Please email us directly at hello@zameett.com.
        </p>
      )}
    </form>
  );
}
