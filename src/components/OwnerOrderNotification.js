"use client";

import { useEffect } from "react";

const STORAGE_KEY = "zameett_order_emails_v4";

function readNotifiedOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function OwnerOrderNotification({ order }) {
  useEffect(() => {
    if (!order?.id || order.kind !== "paid") return;
    const notified = readNotifiedOrders();
    if (notified.includes(order.id)) return;

    fetch("/api/order-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ id: order.id, kind: order.kind }),
    }).then((response) => {
      if (response.ok) localStorage.setItem(STORAGE_KEY, JSON.stringify([...notified, order.id].slice(-30)));
    }).catch(() => {});
  }, [order]);

  return null;
}
