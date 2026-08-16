"use client";

export default function GlobalError({ unstable_retry }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#faf7f2", color: "#4a0e2b", fontFamily: "Georgia, serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeContent: "center", padding: 28, textAlign: "center" }}>
          <p style={{ letterSpacing: 3, textTransform: "uppercase", font: "600 10px Arial, sans-serif", color: "#9a6e29" }}>Zameett</p>
          <h1 style={{ margin: "10px 0", fontSize: "clamp(34px, 7vw, 64px)", fontWeight: 400 }}>Let&apos;s reload this experience.</h1>
          <p style={{ maxWidth: 520, margin: "0 auto 24px", color: "#6d6065", font: "400 14px/1.7 Arial, sans-serif" }}>A temporary connection or page error interrupted the website. Your account and order information remain safe.</p>
          <div><button type="button" onClick={() => unstable_retry()} style={{ border: 0, padding: "14px 24px", background: "#4a0e2b", color: "#fffaf4", cursor: "pointer", fontWeight: 700 }}>Try again</button> <a href="/" style={{ display: "inline-block", marginLeft: 8, padding: "13px 24px", border: "1px solid #4a0e2b", color: "#4a0e2b", textDecoration: "none", fontWeight: 700 }}>Home</a></div>
        </main>
      </body>
    </html>
  );
}
