"use client";

import { useEffect } from "react";

const WEB3FORMS_ACCESS_KEY = "10e56bce-ccaa-4fbe-b986-8d3a18d3496e";
const OWNER_STORAGE_KEY = "zameett_owner_emails_v3";
const CLIENT_STORAGE_KEY = "zameett_client_emails_v3";

function readNotifiedOrders(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

export default function OwnerOrderNotification({ order }) {
  useEffect(() => {
    if (!order?.id) return;

    const ownerOrders = readNotifiedOrders(OWNER_STORAGE_KEY);
    const clientOrders = readNotifiedOrders(CLIENT_STORAGE_KEY);

    const sendOwnerEmail = async () => {
      if (ownerOrders.includes(order.id)) return;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            from_name: "Zameett Order Alerts",
            subject: `New Zameett order - ${order.product}`,
            email: "hello@zameett.com",
            replyto: order.customerEmail,
            customer_name: order.customerName,
            customer_email: order.customerEmail,
            order_id: order.id,
            product: order.product,
            amount: order.amount,
            order_type: order.type,
            message: [
              `Order ID: ${order.id}`,
              `Product: ${order.product}`,
              `Amount: ${order.amount}`,
              `Order type: ${order.type}`,
              `Customer name: ${order.customerName}`,
              `Customer email: ${order.customerEmail}`,
            ].join("\n"),
          }),
        });
        const result = await response.json();

        if (response.ok && result.success) {
          localStorage.setItem(
            OWNER_STORAGE_KEY,
            JSON.stringify([...ownerOrders, order.id].slice(-30)),
          );
        }
      } catch {
        // Order completion stays uninterrupted if the notification service is unavailable.
      }
    };

    const sendClientEmail = async () => {
      if (clientOrders.includes(order.id)) return;

      try {
        const response = await fetch("/api/order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({ id: order.id, kind: order.kind }),
        });

        if (response.ok) {
          localStorage.setItem(
            CLIENT_STORAGE_KEY,
            JSON.stringify([...clientOrders, order.id].slice(-30)),
          );
        }
      } catch {
        // Order completion stays uninterrupted if the email service is unavailable.
      }
    };

    sendOwnerEmail();
    sendClientEmail();
  }, [order]);

  return null;
}