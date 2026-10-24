import { readBrowserConsent } from "@/lib/attribution";

const ALLOWED_PARAMETER_TYPES = new Set(["string", "number", "boolean"]);

export function trackAnalyticsEvent(eventName, parameters = {}) {
  if (typeof window === "undefined" || !eventName) return;

  const safeParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => ALLOWED_PARAMETER_TYPES.has(typeof value)),
  );

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParameters);
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...safeParameters });
  }
}

export function trackOpenAIAdsCustomEvent(customEventName) {
  if (
    typeof window === "undefined" ||
    typeof window.oaiq !== "function" ||
    !/^[a-z0-9](?:[a-z0-9_-]{0,62}[a-z0-9])?$/.test(customEventName)
  ) return;

  window.oaiq(
    "measure",
    "custom",
    { type: "custom" },
    { custom_event_name: customEventName },
  );
}

export function trackWhopEvent(eventName, parameters = {}) {
  if (
    typeof window === "undefined" ||
    typeof window.whop?.track !== "function" ||
    !readBrowserConsent().advertising ||
    !/^[a-z0-9](?:[a-z0-9_-]{0,248}[a-z0-9])?$/.test(eventName)
  ) return;

  const safeParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => ALLOWED_PARAMETER_TYPES.has(typeof value)),
  );

  if (Object.keys(safeParameters).length) {
    window.whop.track(eventName, safeParameters);
    return;
  }

  window.whop.track(eventName);
}
