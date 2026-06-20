"use client";
import { useCart } from "./CartContext";

export default function Toast() {
  const { toastMsg } = useCart();
  return (
    <div id="z-toast" className={toastMsg ? "show" : ""}>
      {toastMsg}
    </div>
  );
}
