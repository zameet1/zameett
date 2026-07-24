"use client";

import { useEffect } from "react";

const WEB3FORMS_ACCESS_KEY = "10e56bce-ccaa-4fbe-b986-8d3a18d3496e";
const STORAGE_KEY = "zameett_owner_notified_orders";

export default function OwnerOrderNotification({ order }) {
  useEffect(() => {
    if (!order?.id) return;

    let notifiedOrders = [];

    try {
      notifiedOrders = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      notifiedOrders = [];
    }

    if (notifiedOrders.includes(order.id)) return;

    const sendNotification = async () => {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            from_name: "Zameett Order Alerts",
            subject: `New Zameett order — ${order.product}`,
            email: "hello@zameett.com",
            order_id: order.id,
            product: order.product,
            amount: order.amount,
            order_type: order.type,
            message: [
              `Order ID: ${order.id}`,
              `Product: ${order.product}`,
              `Amount: ${order.amount}`,
              `Order type: ${order.type}`,
            ].join("\n"),
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...notifiedOrders, order.id].slice(-30)),
          );
        }
      } catch {
        // Order completion stays uninterrupted if the email service is unavailable.
      }
    };

    sendNotification();
  }, [order]);

  return null;
}