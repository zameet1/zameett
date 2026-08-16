export default function Loading() {
  return (
    <main className="route-loading" aria-live="polite" aria-busy="true">
      <div className="route-loading-mark" aria-hidden="true">Z</div>
      <p>Preparing your Zameett experience...</p>
    </main>
  );
}
