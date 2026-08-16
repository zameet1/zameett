"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zameett_cookie_consent_v1";

function updateGoogleConsent(preferences) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.advertising ? "granted" : "denied",
    ad_user_data: preferences.advertising ? "granted" : "denied",
    ad_personalization: preferences.advertising ? "granted" : "denied",
  });
  window.dataLayer.push({
    event: "zameett_consent_update",
    consent_analytics: preferences.analytics,
    consent_advertising: preferences.advertising,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (stored && typeof stored === "object") {
        const saved = {
          analytics: stored.analytics === true,
          advertising: stored.advertising === true,
        };
        updateGoogleConsent(saved);
        queueMicrotask(() => {
          setPreferences(saved);
        });
        return;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    queueMicrotask(() => {
      setVisible(true);
    });
  }, []);

  function save(nextPreferences) {
    setPreferences(nextPreferences);
    setVisible(false);
    setManaging(false);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...nextPreferences, updatedAt: new Date().toISOString() }),
    );
    updateGoogleConsent(nextPreferences);
    window.dispatchEvent(new CustomEvent("zameett:consent", { detail: nextPreferences }));
  }

  if (!visible) return null;

  return (
    <section
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent-copy">
        <span>Your privacy</span>
        <h2 id="cookie-consent-title">Choose how we use cookies.</h2>
        <p>
          Essential cookies keep accounts and orders working. With your permission,
          analytics and advertising cookies help us improve Zameett and measure our ads.{" "}
          <a href="/cookie-policy">Cookie policy</a>
        </p>
      </div>

      {managing && (
        <div className="cookie-preferences" aria-label="Cookie preferences">
          <div>
            <span>
              <strong>Essential</strong>
              <small>Required for security, sign-in and orders.</small>
            </span>
            <b>Always on</b>
          </div>
          <label>
            <span>
              <strong>Analytics</strong>
              <small>Helps us understand how visitors use the website.</small>
            </span>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(event) =>
                setPreferences((current) => ({
                  ...current,
                  analytics: event.target.checked,
                }))
              }
            />
          </label>
          <label>
            <span>
              <strong>Advertising</strong>
              <small>Measures campaigns and supports relevant advertising.</small>
            </span>
            <input
              type="checkbox"
              checked={preferences.advertising}
              onChange={(event) =>
                setPreferences((current) => ({
                  ...current,
                  advertising: event.target.checked,
                }))
              }
            />
          </label>
        </div>
      )}

      <div className="cookie-consent-actions">
        {managing ? (
          <>
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => save(preferences)}>
              Save preferences
            </button>
            <button type="button" className="cookie-btn cookie-btn-secondary" onClick={() => save({ analytics: true, advertising: true })}>
              Accept all
            </button>
          </>
        ) : (
          <>
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => save({ analytics: true, advertising: true })}>
              Accept all
            </button>
            <button type="button" className="cookie-btn cookie-btn-secondary" onClick={() => save({ analytics: false, advertising: false })}>
              Reject non-essential
            </button>
            <button type="button" className="cookie-manage" onClick={() => setManaging(true)}>
              Manage preferences
            </button>
          </>
        )}
      </div>
    </section>
  );
}
