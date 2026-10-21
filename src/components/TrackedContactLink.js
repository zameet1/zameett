"use client";

import { trackAnalyticsEvent } from "@/lib/analytics";

const CONTACT_CLICK_EVENTS = {
  email: "email_lead_click",
  whatsapp: "whatsapp_lead_click",
};

export default function TrackedContactLink({
  channel,
  eventLocation,
  onClick,
  ...linkProps
}) {
  function handleClick(event) {
    const eventName = CONTACT_CLICK_EVENTS[channel];
    if (eventName) {
      trackAnalyticsEvent(eventName, {
        contact_channel: channel,
        link_location: eventLocation || "unspecified",
        page_path: window.location.pathname,
      });
    }
    onClick?.(event);
  }

  return <a {...linkProps} onClick={handleClick} />;
}
