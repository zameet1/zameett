export const ATTRIBUTION_COOKIE = "zameett_first_touch";
export const PAID_ATTRIBUTION_COOKIE = "zameett_latest_paid_touch";
export const CONSENT_STORAGE_KEY = "zameett_cookie_consent_v1";

const ANALYTICS_FIELDS = [
  "source",
  "medium",
  "campaign",
  "campaignId",
  "term",
  "content",
  "referrer",
  "landingPage",
  "device",
  "timezone",
  "language",
  "recordedAt",
];
const ADVERTISING_FIELDS = ["source", "medium", "gclid", "gbraid", "wbraid", "paidRecordedAt"];

function clean(value, max = 120) {
  return String(value || "").trim().slice(0, max);
}

export function buildPaidTouch(params, advertisingAllowed, recordedAt = new Date().toISOString()) {
  if (!advertisingAllowed) return null;
  const paid = {
    gclid: clean(params.get("gclid"), 200),
    gbraid: clean(params.get("gbraid"), 200),
    wbraid: clean(params.get("wbraid"), 200),
  };
  if (Object.values(paid).some(Boolean)) {
    return { source: "Google Ads", medium: "paid search", ...paid, paidRecordedAt: recordedAt };
  }
  if (params.has("fbclid")) {
    return { source: "Meta Ads", medium: "paid social", paidRecordedAt: recordedAt };
  }
  return null;
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

export function normaliseConsent(value) {
  return {
    analytics: value?.analytics === true,
    advertising: value?.advertising === true,
  };
}

export function readBrowserConsent() {
  if (typeof window === "undefined") return normaliseConsent(null);
  try {
    return normaliseConsent(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null"));
  } catch {
    return normaliseConsent(null);
  }
}

function selectFields(value, names) {
  if (!value) return {};
  return Object.fromEntries(names.filter((name) => value[name]).map((name) => [name, value[name]]));
}

export function mergeAttributionByConsent(firstTouch, latestPaidTouch, consentValue) {
  const consent = normaliseConsent(consentValue);
  const analytics = consent.analytics ? selectFields(firstTouch, ANALYTICS_FIELDS) : {};
  const legacyPaidTouch = consent.advertising && firstTouch && ["gclid", "gbraid", "wbraid"].some((name) => firstTouch[name])
    ? { ...selectFields(firstTouch, ["gclid", "gbraid", "wbraid", "paidRecordedAt"]), source: "Google Ads", medium: "paid search" }
    : null;
  const paidSource = latestPaidTouch || legacyPaidTouch;
  const advertising = consent.advertising ? selectFields(paidSource, ADVERTISING_FIELDS) : {};
  const paid = {
    latestPaidSource: advertising.source,
    latestPaidMedium: advertising.medium,
    gclid: advertising.gclid,
    gbraid: advertising.gbraid,
    wbraid: advertising.wbraid,
    paidRecordedAt: advertising.paidRecordedAt,
  };
  const merged = {
    ...analytics,
    ...Object.fromEntries(Object.entries(paid).filter(([, value]) => value)),
  };
  return Object.keys(merged).length ? merged : null;
}

function readCookie(name) {
  const prefix = `${name}=`;
  const item = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
  return decodeAttribution(item?.slice(prefix.length));
}

export function readBrowserAttribution() {
  if (typeof document === "undefined") return null;
  const consent = readBrowserConsent();
  return mergeAttributionByConsent(
    consent.analytics ? readCookie(ATTRIBUTION_COOKIE) : null,
    consent.advertising ? readCookie(PAID_ATTRIBUTION_COOKIE) : null,
    consent,
  );
}

export function attributionToContactFields(attribution) {
  if (!attribution) return {};

  const fields = {
    "Attribution Source": clean(attribution.source, 60),
    "Attribution Medium": clean(attribution.medium, 60),
    "Attribution Campaign": clean(attribution.campaign, 100),
    "Attribution Campaign ID": clean(attribution.campaignId, 100),
    "Attribution Term": clean(attribution.term, 100),
    "Attribution Content": clean(attribution.content, 100),
    "Latest Paid Source": clean(attribution.latestPaidSource, 60),
    "Latest Paid Medium": clean(attribution.latestPaidMedium, 60),
    "Google Click ID": clean(attribution.gclid, 200),
    "Google GBRAID": clean(attribution.gbraid, 200),
    "Google WBRAID": clean(attribution.wbraid, 200),
    "First Landing Page": clean(attribution.landingPage, 160),
    "Attribution Referrer": clean(attribution.referrer, 100),
    "Attribution Recorded At": clean(attribution.recordedAt, 40),
    "Latest Paid Touch At": clean(attribution.paidRecordedAt, 40),
  };

  return Object.fromEntries(Object.entries(fields).filter(([, value]) => value));
}

export function attributionToUserMetadata(attribution) {
  if (!attribution?.recordedAt) return {};
  const metadata = {
    acquisition_source: clean(attribution.source, 60),
    acquisition_medium: clean(attribution.medium, 60),
    acquisition_campaign: clean(attribution.campaign, 100),
    acquisition_referrer: clean(attribution.referrer, 100),
    first_landing_page: clean(attribution.landingPage, 160),
    visitor_device: clean(attribution.device, 30),
    visitor_timezone: clean(attribution.timezone, 60),
    visitor_language: clean(attribution.language, 20),
    attribution_recorded_at: clean(attribution.recordedAt, 40),
  };
  return Object.fromEntries(Object.entries(metadata).filter(([, value]) => value));
}
