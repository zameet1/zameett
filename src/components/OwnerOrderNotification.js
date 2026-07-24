"use client";

import { useEffect } from "react";

const WEB3FORMS_ACCESS_KEY = "10e56bce-ccaa-4fbe-b986-8d3a18d3496e";
const OWNER_STORAGE_KEY = "zameett_owner_notified_orders";
const CLIENT_STORAGE_KEY = "zameett_client_notified_orders";

function readNotifiedOrders(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function rememberOrder(storageKey, notifiedOrders, orderId) {
  localStorage.setItem(
    storageKey,
    JSON.stringify([...notifiedOrders, orderId].slice(-30)),
  );
}

export default function OwnerOrderNotification({ order }) {
  useEffect(() => {
    if (!order?.id) return;

    const ownerNotifiedOrders = readNotifiedOrders(OWNER_STORAGE_KEY);
    const clientNotifiedOrders = readNotifiedOrders(CLIENT_STORAGE_KEY);

    const sendOwnerNotification = async () => {
      if (ownerNotifiedOrders.includes(order.id)) return;

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
          rememberOrder(OWNER_STORAGE_KEY, ownerNotifiedOrders, order.id);
        }
      } catch {
        // Order completion stays uninterrupted if the email service is unavailable.
      }
    };

    const sendClientConfirmation = async () => {
      if (clientNotifiedOrders.includes(order.id)) return;

      try {
        const response = await fetch("/api/order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({ id: order.id, kind: order.kind }),
        });

        if (response.ok) {
          rememberOrder(CLIENT_STORAGE_KEY, clientNotifiedOrders, order.id);
        }
      } catch {
        // Order completion stays uninterrupted if the email service is unavailable.
      }
    };

    sendOwnerNotification();
    sendClientConfirmation();
  }, [order]);

  return null;
}