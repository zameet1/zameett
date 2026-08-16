export const ATTRIBUTION_COOKIE = "zameett_first_touch";
export const CONSENT_STORAGE_KEY = "zameett_cookie_consent_v1";

function clean(value, max = 120) {
  return String(value || "").trim().slice(0, max);
}

export function decodeAttribution(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function readBrowserAttribution() {
  if (typeof document === "undefined") return null;
  const prefix = `${ATTRIBUTION_COOKIE}=`;
  const item = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
  return decodeAttribution(item?.slice(prefix.length));
}

export function attributionToUserMetadata(attribution) {
  if (!attribution) return {};
  return {
    acquisition_source: clean(attribution.source, 60) || "Direct / unknown",
    acquisition_medium: clean(attribution.medium, 60) || "unknown",
    acquisition_campaign: clean(attribution.campaign, 100) || "Not provided",
    acquisition_referrer: clean(attribution.referrer, 100) || "Direct",
    first_landing_page: clean(attribution.landingPage, 160) || "/",
    visitor_device: clean(attribution.device, 30) || "Unknown",
    visitor_timezone: clean(attribution.timezone, 60) || "Unknown",
    visitor_language: clean(attribution.language, 20) || "Unknown",
    attribution_recorded_at: clean(attribution.recordedAt, 40) || new Date().toISOString(),
  };
}