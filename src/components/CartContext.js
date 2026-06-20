"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const CART_KEY = "zameett_cart";
const CartCtx = createContext(null);

function readCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    setItems(readCart());
    function onStorage(e) {
      if (e.key === CART_KEY) setItems(readCart());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const save = useCallback((next) => {
    setItems(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_KEY, JSON.stringify(next));
    }
  }, []);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2800);
  }, []);

  const addToCart = useCallback(
    (name, price) => {
      const current = readCart();
      const found = current.find((i) => i.name === name);
      let next;
      if (found) {
        next = current.map((i) =>
          i.name === name ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      } else {
        next = [...current, { name, price: Number(price) || 0, qty: 1 }];
      }
      save(next);
      showToast(`✓  ${name} added to cart`);
      setDrawerOpen(true);
    },
    [save, showToast]
  );

  const removeFromCart = useCallback(
    (name) => {
      save(readCart().filter((i) => i.name !== name));
    },
    [save]
  );

  const changeQty = useCallback(
    (name, delta) => {
      const current = readCart();
      const it = current.find((i) => i.name === name);
      if (!it) return;
      const qty = (it.qty || 1) + delta;
      if (qty < 1) {
        save(current.filter((i) => i.name !== name));
        return;
      }
      save(current.map((i) => (i.name === name ? { ...i, qty } : i)));
    },
    [save]
  );

  const checkout = useCallback(() => {
    if (readCart().length === 0) {
      showToast("Your cart is empty");
      return;
    }
    showToast("Checkout is a demo — connect a payment provider to go live");
  }, [showToast]);

  const count = items.reduce((n, i) => n + (i.qty || 1), 0);
  const total = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  return (
    <CartCtx.Provider
      value={{
        items,
        count,
        total,
        drawerOpen,
        setDrawerOpen,
        addToCart,
        removeFromCart,
        changeQty,
        checkout,
        toastMsg,
        showToast,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
