"use client";

import { useEffect } from "react";
import { ATTRIBUTION_COOKIE, CONSENT_STORAGE_KEY } from "@/lib/attribution";

function safeHost(value) {
  if (!value) return "";
  try { return new URL(value).hostname.replace(/^www\./, "").slice(0, 100); } catch { return ""; }
}

function sourceFromVisit(params, referrer) {
  const utmSource = params.get("utm_source");
  if (utmSource) return { source: utmSource, medium: params.get("utm_medium") || "campaign" };
  if (params.has("gclid")) return { source: "Google Ads", medium: "paid search" };
  if (params.has("fbclid")) return { source: "Meta Ads", medium: "paid social" };
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

function analyticsAllowed() {
  try { return JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null")?.analytics === true; } catch { return false; }
}

function captureFirstTouch() {
  if (!analyticsAllowed() || document.cookie.includes(`${ATTRIBUTION_COOKIE}=`)) return;
  const params = new URLSearchParams(window.location.search);
  const channel = sourceFromVisit(params, document.referrer);
  const attribution = {
    ...channel,
    campaign: (params.get("utm_campaign") || "Not provided").slice(0, 100),
    referrer: safeHost(document.referrer) || "Direct",
    landingPage: window.location.pathname.slice(0, 160),
    device: window.matchMedia("(max-width: 760px)").matches ? "Mobile" : window.matchMedia("(max-width: 1100px)").matches ? "Tablet" : "Desktop",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
    language: navigator.language || "Unknown",
    recordedAt: new Date().toISOString(),
  };
  document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(attribution))}; Max-Age=7776000; Path=/; SameSite=Lax; Secure`;
}

export default function AttributionTracker() {
  useEffect(() => {
    captureFirstTouch();
    window.addEventListener("zameett:consent", captureFirstTouch);
    return () => window.removeEventListener("zameett:consent", captureFirstTouch);
  }, []);
  return null;
}