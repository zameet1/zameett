"use client";
import { useCart } from "./CartContext";

export default function AddToCartButton({ name, price, className, style, children }) {
  const { addToCart } = useCart();
  return (
    <button className={className} style={style} onClick={() => addToCart(name, price)}>
      {children}
    </button>
  );
}
