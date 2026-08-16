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
