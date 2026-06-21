"use client";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, total, drawerOpen, setDrawerOpen, removeFromCart, changeQty } = useCart();

  return (
    <>
      <div
        id="cart-overlay"
        className={drawerOpen ? "open" : ""}
        onClick={() => setDrawerOpen(false)}
      />
      <aside id="cart-drawer" className={drawerOpen ? "open" : ""} aria-label="Shopping cart">
        <div className="cart-head">
          <h3>Your Cart</h3>
          <button onClick={() => setDrawerOpen(false)} className="cart-close" aria-label="Close">
            ×
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">
              Your cart is empty.
              <br />
              <a href="/digital" onClick={() => setDrawerOpen(false)}>
                Browse digital products →
              </a>
            </p>
          ) : (
            items.map((i) => (
              <div className="cart-row" key={i.name}>
                <div className="cart-row-info">
                  <h4>{i.name}</h4>
                  <span>${i.price}</span>
                </div>
                <div className="cart-qty">
                  <button aria-label="Decrease" onClick={() => changeQty(i.name, -1)}>
                    –
                  </button>
                  <span>{i.qty || 1}</span>
                  <button aria-label="Increase" onClick={() => changeQty(i.name, 1)}>
                    +
                  </button>
                </div>
                <button className="cart-x" aria-label="Remove" onClick={() => removeFromCart(i.name)}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-total-row">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <a
            className="btn btn-burg"
            style={{ width: "100%", border: "none", cursor: "pointer", textAlign: "center", display: items.length ? "block" : "none" }}
            href="/checkout"
            onClick={() => setDrawerOpen(false)}
          >
            Checkout →
          </a>
          <p className="cart-note">We&rsquo;ll send a secure payment link to complete your order</p>
        </div>
      </aside>
    </>
  );
}
