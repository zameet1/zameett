"use client";

import { useEffect, useRef, useState } from "react";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIos() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function urlBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((character) => character.charCodeAt(0)));
}

export function requestAppInstall() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("zameett:install-app"));
  }
}

export default function PwaManager() {
  const promptRef = useRef(null);
  const autoOfferTimerRef = useRef(null);
  const [dialog, setDialog] = useState(null);

  const launchNativePrompt = async () => {
    const prompt = promptRef.current;
    if (!prompt) return false;

    setDialog(null);
    await prompt.prompt();
    const choice = await prompt.userChoice.catch(() => null);
    promptRef.current = null;

    if (choice?.outcome === "accepted") {
      setDialog("installed");
    }
    return true;
  };

  const enableNotifications = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      setDialog("notificationsUnsupported");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setDialog("notificationsBlocked");
        return;
      }

      const keyResponse = await fetch("/api/notifications/key", { cache: "no-store" });
      const keyPayload = await keyResponse.json().catch(() => ({}));
      if (!keyResponse.ok || !keyPayload.publicKey) {
        setDialog("notificationsUnavailable");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      const subscription = existingSubscription || await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keyPayload.publicKey),
      });

      const saveResponse = await fetch("/api/notifications/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });

      if (saveResponse.status === 401) {
        setDialog("notificationsPermissionReady");
        return;
      }
      if (!saveResponse.ok) {
        setDialog("notificationsUnavailable");
        return;
      }

      setDialog("notificationsReady");
    } catch {
      setDialog("notificationsUnavailable");
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => undefined);
    }

    function onBeforeInstall(event) {
      event.preventDefault();
      promptRef.current = event;

      // Never persist dismissal across visits. If the app is removed, Chrome can
      // emit beforeinstallprompt again and Zameett will offer installation again.
      if (!isStandalone() && !sessionStorage.getItem("zameett-install-offer-seen")) {
        autoOfferTimerRef.current = window.setTimeout(() => {
          sessionStorage.setItem("zameett-install-offer-seen", "1");
          setDialog("available");
        }, 1800);
      }
    }

    async function onInstallRequest() {
      if (isStandalone()) {
        setDialog("installed");
        return;
      }

      if (promptRef.current) {
        await launchNativePrompt();
      } else if (isIos()) {
        setDialog("ios");
      } else {
        setDialog("browser");
      }
    }

    function onInstalled() {
      promptRef.current = null;
      setDialog("installed");
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("zameett:install-app", onInstallRequest);

    return () => {
      if (autoOfferTimerRef.current) window.clearTimeout(autoOfferTimerRef.current);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("zameett:install-app", onInstallRequest);
    };
  }, []);

  if (!dialog) return null;

  const content = {
    available: {
      eyebrow: "Zameett app",
      title: "Keep your projects one tap away.",
      text: "Install Zameett for quick access to your account, order progress, downloads and project notifications.",
      action: "Install app",
    },
    installed: {
      eyebrow: "Zameett app",
      title: "Ready on your device.",
      text: "Turn on notifications to receive order progress, approvals and important account updates.",
      action: "Allow notifications",
    },
    notificationsReady: {
      eyebrow: "Notifications on",
      title: "You will not miss an update.",
      text: "Zameett can now notify you when your order or account activity changes.",
      action: "Done",
    },
    notificationsPermissionReady: {
      eyebrow: "Permission allowed",
      title: "Notifications are ready on this device.",
      text: "Sign in whenever you want order-specific updates linked to your Zameett account.",
      action: "Done",
    },
    notificationsBlocked: {
      eyebrow: "Notifications are off",
      title: "Permission was not enabled.",
      text: "You can allow notifications later from your browser's site settings or from your Zameett account page.",
      action: "Got it",
    },
    notificationsUnsupported: {
      eyebrow: "Notifications unavailable",
      title: "This browser does not support app notifications.",
      text: "You can still follow every order update from your Zameett account page.",
      action: "Got it",
    },
    notificationsUnavailable: {
      eyebrow: "Try again shortly",
      title: "Notifications could not be connected.",
      text: "The app is installed and ready. You can enable notifications later from your Zameett account page.",
      action: "Got it",
    },
    ios: {
      eyebrow: "Install on iPhone or iPad",
      title: "Add Zameett to your Home Screen.",
      text: "In Safari, tap Share, choose Add to Home Screen, then tap Add. If you remove the app, repeat these steps on your next visit.",
      action: "Got it",
    },
    browser: {
      eyebrow: "Install Zameett",
      title: "Use your browser's install option.",
      text: "Open the Chrome menu and choose Install app or Add to Home Screen. The install icon may also appear in the address bar.",
      action: "Got it",
    },
  }[dialog];

  const handleAction = async () => {
    if (dialog === "available") {
      const launched = await launchNativePrompt();
      if (!launched) setDialog("browser");
      return;
    }
    if (dialog === "installed") {
      await enableNotifications();
      return;
    }

    setDialog(null);
  };

  return (
    <div className="app-install-overlay app-install-toast" role="presentation">
      <section
        className="app-install-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-install-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="app-install-close" aria-label="Close" onClick={() => setDialog(null)}>
          &times;
        </button>
        <div className="app-install-mark" aria-hidden="true">Z</div>
        <span>{content.eyebrow}</span>
        <h2 id="app-install-title">{content.title}</h2>
        <p>{content.text}</p>
        <button type="button" className="btn btn-burg" onClick={handleAction}>{content.action}</button>
      </section>
    </div>
  );
}
