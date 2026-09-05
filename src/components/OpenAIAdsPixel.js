"use client";

import { useEffect } from "react";

const PIXEL_ID = "UKu4iWofatp6NA8DqXpCd2";
const SDK_URL = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
const CONSENT_STORAGE_KEY = "zameett_cookie_consent_v1";

function advertisingConsentGranted() {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null");
    return stored?.advertising === true;
  } catch {
    return false;
  }
}

function ensurePixelQueue() {
  if (typeof window.oaiq === "function") return window.oaiq;
  const queue = (...args) => queue.q.push(args);
  queue.q = [];
  window.oaiq = queue;
  return queue;
}

export default function OpenAIAdsPixel() {
  useEffect(() => {
    const oaiq = ensurePixelQueue();
    if (!window.__zameettOpenAIAdsPixelInitialized) {
      oaiq("consent", false);
      oaiq("init", { pixelId: PIXEL_ID, debug: false });
      window.__zameettOpenAIAdsPixelInitialized = true;
    }
    oaiq("consent", advertisingConsentGranted());

    if (!document.getElementById("openai-ads-measurement-pixel")) {
      const script = document.createElement("script");
      script.id = "openai-ads-measurement-pixel";
      script.async = true;
      script.src = SDK_URL;
      document.head.appendChild(script);
    }

    function updateConsent(event) {
      window.oaiq?.("consent", event.detail?.advertising === true);
    }

    window.addEventListener("zameett:consent", updateConsent);
    return () => window.removeEventListener("zameett:consent", updateConsent);
  }, []);

  return null;
}
