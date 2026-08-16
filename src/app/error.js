"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, unstable_retry }) {
  useEffect(() => {
    console.error("Zameett route error", error);
  }, [error]);

  return (
    <main className="route-error" role="alert">
      <span>Something paused</span>
      <h1>This page could not finish loading.</h1>
      <p>Your information is safe. Retry the page, or return home if the connection was interrupted.</p>
      <div><button type="button" className="btn btn-burg" onClick={() => unstable_retry()}>Try again</button><a className="btn btn-outline" href="/">Return home</a></div>
    </main>
  );
}
