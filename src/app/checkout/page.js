"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartContext";
import Footer from "@/components/Footer";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  // Web3Forms redirects back with ?ordered=1 after a successful submission.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("ordered=1")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of redirect query param after mount
      setOrdered(true);
      clearCart();
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [clearCart]);

  const orderSummary = items
    .map((i) => `${i.name} x${i.qty || 1} — $${i.price * (i.qty || 1)}`)
    .join("\n");

  return (
    <>
      <header className="page-hero">
        <div className="inner">
          <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/digital">Shop</a> &nbsp;/&nbsp; Checkout</p>
          <h1>Checkout</h1>
          <p>
            Review your order and share your details. We&rsquo;ll confirm availability and send you
            a secure payment link to complete the purchase.
          </p>
        </div>
      </header>

      <section className="contact-section">
        <div className="inner">
          {ordered ? (
            <div className="reveal" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
              <p className="s-tag" style={{ justifyContent: "center" }}>Order Received</p>
              <h2 className="s-title">Thank you — <em>we&rsquo;ve got your order.</em></h2>
              <p className="s-body" style={{ maxWidth: 560, margin: "0 auto 32px" }}>
                We&rsquo;ll review it and email you a secure payment link within 24 hours. Once
                payment is confirmed, your files are delivered straight to your inbox.
              </p>
              <a href="/digital" className="btn btn-burg">Continue Browsing →</a>
            </div>
          ) : items.length === 0 ? (
            <div className="reveal" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
              <h2 className="s-title">Your cart is <em>empty.</em></h2>
              <p className="s-body" style={{ marginBottom: 28 }}>Add a product to get started.</p>
              <a href="/digital" className="btn btn-burg">Browse Digital Products →</a>
            </div>
          ) : (
            <>
              {/* ORDER SUMMARY */}
              <div className="reveal">
                <p className="s-tag">Your Order</p>
                <h2 className="s-title">Order <em>summary.</em></h2>
                <div style={{ marginTop: 24 }}>
                  {items.map((i) => (
                    <div className="cart-row" key={i.name} style={{ gridTemplateColumns: "1fr auto" }}>
                      <div className="cart-row-info">
                        <h4>{i.name}</h4>
                        <span style={{ fontFamily: "var(--font-jost),sans-serif", fontSize: 12, color: "var(--mid)" }}>
                          Qty {i.qty || 1}
                        </span>
                      </div>
                      <span style={{ fontFamily: "var(--font-cormorant),serif", fontSize: 22, fontWeight: 700, color: "var(--burg)" }}>
                        ${i.price * (i.qty || 1)}
                      </span>
                    </div>
                  ))}
                  <div className="cart-total-row" style={{ marginTop: 18 }}>
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  <p className="cart-note" style={{ textAlign: "left", marginTop: 14 }}>
                    No payment is taken now. We&rsquo;ll email you a secure payment link to complete
                    the order.
                  </p>
                </div>
              </div>

              {/* CUSTOMER DETAILS */}
              <div className="reveal">
                <p className="s-tag">Your Details</p>
                <h2 className="s-title">Where to <em>reach you.</em></h2>
                <form
                  className="contact-form"
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  style={{ marginTop: 24 }}
                >
                  <input type="hidden" name="access_key" value="10e56bce-ccaa-4fbe-b986-8d3a18d3496e" />
                  <input type="hidden" name="subject" value="New ORDER from zameett.com" />
                  <input type="hidden" name="from_name" value="Zameett Shop" />
                  <input type="hidden" name="redirect" value="https://zameett.com/checkout?ordered=1" />
                  <input type="hidden" name="Order" value={orderSummary} />
                  <input type="hidden" name="Order Total" value={`$${total}`} />

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
                    <label>WhatsApp / Phone *</label>
                    <input type="text" name="Phone" placeholder="+1 (000) 000 0000" required />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="Country" placeholder="Your country" />
                  </div>
                  <div className="form-group">
                    <label>Notes (optional)</label>
                    <textarea name="Notes" placeholder="Anything we should know about your order…" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-burg"
                    style={{ width: "100%", padding: 18, fontSize: 11, cursor: "pointer", border: "none" }}
                  >
                    Place Order →
                  </button>
                  <p className="cart-note" style={{ marginTop: 4 }}>
                    By placing your order you agree to be contacted with a payment link.
                  </p>
                </form>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
