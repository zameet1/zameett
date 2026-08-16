"use client";

import { useEffect, useMemo, useState } from "react";
import { FiBell, FiBellOff, FiCheck, FiDownload } from "react-icons/fi";
import { requestAppInstall } from "@/components/PwaManager";

const FINGERPRINT_KEY = "zameett_account_activity_v1";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replaceAll("-", "+").replaceAll("_", "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((character) => character.charCodeAt(0)));
}

function latestActivity(projects, orders) {
  const project = projects?.[0];
  if (project) {
    return {
      title: `${project.title} updated`,
      body: `${project.currentStage}: ${project.progress}% complete`,
      tag: `project-${project.id}-${project.updatedAt}`,
    };
  }
  const order = orders?.[0];
  if (order) {
    return {
      title: "Your Zameett order",
      body: `${order.name}: ${order.status}`,
      tag: `order-${order.id}-${order.status}`,
    };
  }
  return null;
}

export default function AccountActivityNotifications({ projects = [], orders = [] }) {
  const [state, setState] = useState("checking");
  const [message, setMessage] = useState("");
  const activity = useMemo(() => latestActivity(projects, orders), [projects, orders]);
  const fingerprint = useMemo(
    () =>
      JSON.stringify({
        projects: projects.map((project) => [project.id, project.status, project.currentStage, project.progress, project.updatedAt]),
        orders: orders.map((order) => [order.id, order.status]),
      }),
    [projects, orders],
  );

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      const unsupportedTimer = window.setTimeout(() => setState("unsupported"), 0);
      return () => window.clearTimeout(unsupportedTimer);
    }

    let active = true;
    navigator.serviceWorker.ready
      .then((registration) => registration.pushManager.getSubscription())
      .then((subscription) => {
        if (active) setState(subscription ? "enabled" : Notification.permission === "denied" ? "blocked" : "disabled");
      })
      .catch(() => active && setState("disabled"));

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (state !== "enabled" || !activity || !fingerprint) return;
    const previous = localStorage.getItem(FINGERPRINT_KEY);
    localStorage.setItem(FINGERPRINT_KEY, fingerprint);
    if (!previous || previous === fingerprint || Notification.permission !== "granted") return;

    navigator.serviceWorker.ready.then((registration) =>
      registration.showNotification(activity.title, {
        body: activity.body,
        icon: "/icon.png",
        badge: "/icon.png",
        tag: activity.tag,
        data: { url: "/account" },
      }),
    ).catch(() => undefined);
  }, [activity, fingerprint, state]);

  async function enableNotifications() {
    setMessage("");
    setState("working");
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState("blocked");
        setMessage("Notifications were not allowed. You can enable them from your browser site settings.");
        return;
      }

      const keyResponse = await fetch("/api/notifications/key", { cache: "no-store" });
      const keyData = await keyResponse.json();
      if (!keyResponse.ok || !keyData.publicKey) throw new Error(keyData.error || "Notification key is unavailable.");

      const registration = await navigator.serviceWorker.ready;
      const existing = await registration.pushManager.getSubscription();
      const subscription = existing || (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keyData.publicKey),
      }));

      const response = await fetch("/api/notifications/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Notification subscription could not be saved.");

      localStorage.setItem(FINGERPRINT_KEY, fingerprint);
      setState("enabled");
      setMessage("Notifications are on. We will alert you when an order or project moves forward.");
      await registration.showNotification("Zameett notifications are on", {
        body: "Order confirmations and project-stage updates will appear here.",
        icon: "/icon.png",
        tag: "zameett-notifications-enabled",
        data: { url: "/account" },
      });
    } catch (error) {
      setState("disabled");
      setMessage(error instanceof Error ? error.message : "Notifications could not be enabled.");
    }
  }

  async function disableNotifications() {
    setState("working");
    setMessage("");
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await fetch("/api/notifications/subscription", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }
      setState("disabled");
      setMessage("Notifications are off on this device.");
    } catch {
      setState("enabled");
      setMessage("We could not change this preference. Please try again.");
    }
  }

  return (
    <article className="profile-notifications profile-panel">
      <div className="profile-notification-copy">
        <span className="profile-notification-icon" aria-hidden="true"><FiBell /></span>
        <div>
          <span className="profile-kicker">Account alerts</span>
          <h2>Never miss the next step.</h2>
          <p>Receive a device notification when your order is confirmed, work starts, or your project moves to its next stage.</p>
          {message && <small className="profile-notification-message" role="status">{message}</small>}
        </div>
      </div>
      <div className="profile-notification-actions">
        {state === "enabled" ? (
          <button type="button" className="notification-toggle enabled" onClick={disableNotifications}>
            <FiCheck aria-hidden="true" /> Notifications on
          </button>
        ) : (
          <button type="button" className="notification-toggle" onClick={enableNotifications} disabled={state === "working" || state === "checking" || state === "unsupported"}>
            {state === "blocked" ? <FiBellOff aria-hidden="true" /> : <FiBell aria-hidden="true" />}
            {state === "working" || state === "checking" ? "Checking…" : state === "blocked" ? "Permission blocked" : state === "unsupported" ? "Not supported" : "Enable notifications"}
          </button>
        )}
        <button type="button" className="notification-install" onClick={requestAppInstall}>
          <FiDownload aria-hidden="true" /> Download app
        </button>
      </div>
    </article>
  );
}
