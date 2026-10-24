"use client";

import { trackAnalyticsEvent, trackWhopEvent } from "@/lib/analytics";

function createEventId() {
  if (typeof window.crypto?.randomUUID === "function") {
    return `download_${window.crypto.randomUUID()}`;
  }

  return `download_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function TrackedDownloadLink({
  children,
  className,
  href,
  linkLocation,
  resourceName,
}) {
  function trackDownload() {
    trackAnalyticsEvent("resource_download", {
      resource_name: resourceName,
      file_name: "fashion-development-brief-checklist.pdf",
      link_location: linkLocation,
      link_url: href,
      page_path: window.location.pathname,
    });
    trackWhopEvent("resource_download", { event_id: createEventId() });
  }

  return (
    <a className={className} href={href} download onClick={trackDownload}>
      {children}
    </a>
  );
}
