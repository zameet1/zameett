"use client";

import { useSearchParams } from "next/navigation";

export default function CheckoutStatusMessage({ context = "product" }) {
  const status = useSearchParams().get("checkout");
  if (!status) return null;

  if (context === "checkout") {
    if (status === "cancelled") {
      return <p className="checkout-message">Payment cancelled. You have not been charged.</p>;
    }
    if (status === "consent-required") {
      return <p className="checkout-message checkout-error">Please review and accept the digital-product licence and refund terms before continuing.</p>;
    }
    return null;
  }

  if (status === "cancelled") {
    return <p className="checkout-message">Checkout was cancelled. You have not been charged.</p>;
  }
  if (status === "unavailable") {
    return <p className="checkout-message checkout-error">Secure checkout is temporarily unavailable. Please try again later.</p>;
  }
  if (status === "error") {
    return <p className="checkout-message checkout-error">Checkout could not start. Please try again or contact us.</p>;
  }
  return null;
}