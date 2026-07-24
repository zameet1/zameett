"use client";

import { useEffect } from "react";

const STORAGE_KEY = "zameett_order_emails_v2";

function readNotifiedOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function OwnerOrderNotification({ order }) {
  useEffect(() => {
    if (!order?.id) return;

    const notifiedOrders = readNotifiedOrders();
    if (notifiedOrders.includes(order.id)) return;

    const sendOrderEmails = async () => {
      try {
        const response = await fetch("/api/order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({ id: order.id, kind: order.kind }),
        });

        if (response.ok) {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...notifiedOrders, order.id].slice(-30)),
          );
        }
      } catch {
        // Order completion stays uninterrupted if the email service is unavailable.
      }
    };

    sendOrderEmails();
  }, [order]);

  return null;
}