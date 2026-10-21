"use client";

import { useEffect } from "react";
import {
  ATTRIBUTION_COOKIE,
  PAID_ATTRIBUTION_COOKIE,
  buildPaidTouch,
  decodeAttribution,
  normaliseConsent,
  readBrowserConsent,
} from "@/lib/attribution";

function safeHost(value) {
  if (!value) return "";
  try { return new URL(value).hostname.replace(/^www\./, "").slice(0, 100); } catch { return ""; }
}

function sourceFromVisit(params, referrer) {
  const utmSource = params.get("utm_source");
  if (utmSource) return { source: utmSource, medium: params.get("utm_medium") || "campaign" };
  const host = safeHost(referrer).toLowerCase();
  if (!host) return { source: "Direct", medium: "direct" };
  if (host.includes("google.")) return { source: "Google", medium: "organic search" };
  if (host.includes("instagram.")) return { source: "Instagram", medium: "organic social" };
  if (host.includes("facebook.")) return { source: "Facebook", medium: "organic social" };
  if (host.includes("pinterest.")) return { source: "Pinterest", medium: "organic social" };
  if (host.includes("tiktok.")) return { source: "TikTok", medium: "organic social" };
  if (host.includes("linkedin.")) return { source: "LinkedIn", medium: "organic social" };
  return { source: host, medium: "referral" };
}

function campaignParam(params, name, max = 200) {
  return (params.get(name) || "").trim().slice(0, max);
}

function readCookie(name) {
  const prefix = `${name}=`;
  const item = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
  return decodeAttribution(item?.slice(prefix.length));
}

function writeCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=7776000; Path=/; SameSite=Lax; Secure`;
}

function clearCookie(name) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
}

function analyticsRecord(params) {
  const channel = sourceFromVisit(params, document.referrer);
  return {
    ...channel,
    campaign: campaignParam(params, "utm_campaign", 100) || "Not provided",
    campaignId: campaignParam(params, "utm_id", 100),
    term: campaignParam(params, "utm_term", 100),
    content: campaignParam(params, "utm_content", 100),
    referrer: safeHost(document.referrer) || "Direct",
    landingPage: window.location.pathname.slice(0, 160),
    device: window.matchMedia("(max-width: 760px)").matches ? "Mobile" : window.matchMedia("(max-width: 1100px)").matches ? "Tablet" : "Desktop",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
    language: navigator.language || "Unknown",
    recordedAt: new Date().toISOString(),
  };
}

function scrubLegacyClickIds() {
  const firstTouch = readCookie(ATTRIBUTION_COOKIE);
  if (!firstTouch || !["gclid", "gbraid", "wbraid", "paidRecordedAt"].some((name) => firstTouch[name])) return null;
  const { gclid, gbraid, wbraid, paidRecordedAt, ...analyticsOnly } = firstTouch;
  writeCookie(ATTRIBUTION_COOKIE, analyticsOnly);
  return {
    source: "Google Ads",
    medium: "paid search",
    gclid,
    gbraid,
    wbraid,
    paidRecordedAt: paidRecordedAt || firstTouch.recordedAt || new Date().toISOString(),
  };
}

function captureAttribution(consentValue) {
  const consent = normaliseConsent(consentValue || readBrowserConsent());
  const params = new URLSearchParams(window.location.search);

  let legacyPaidTouch = null;
  if (!consent.analytics) {
    clearCookie(ATTRIBUTION_COOKIE);
  } else {
    legacyPaidTouch = scrubLegacyClickIds();
    if (!readCookie(ATTRIBUTION_COOKIE)) writeCookie(ATTRIBUTION_COOKIE, analyticsRecord(params));
  }

  if (!consent.advertising) {
    clearCookie(PAID_ATTRIBUTION_COOKIE);
  } else {
    const latestPaidTouch = buildPaidTouch(params, consent.advertising);
    if (latestPaidTouch) writeCookie(PAID_ATTRIBUTION_COOKIE, latestPaidTouch);
    else if (legacyPaidTouch && !readCookie(PAID_ATTRIBUTION_COOKIE)) writeCookie(PAID_ATTRIBUTION_COOKIE, legacyPaidTouch);
  }
}

export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
    const updateConsent = (event) => captureAttribution(event.detail);
    window.addEventListener("zameett:consent", updateConsent);
    return () => window.removeEventListener("zameett:consent", updateConsent);
  }, []);
  return null;
}
