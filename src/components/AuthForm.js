"use client";

import { useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import { attributionToUserMetadata, readBrowserAttribution } from "@/lib/attribution";

export default function AuthForm({ nextPath = "/account" }) {
  const [mode, setMode] = useState("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const configured = hasSupabaseConfig();

  async function signInWithGoogle() {
    if (!configured) return setMessage("Customer accounts are temporarily unavailable. Please contact support.");
    setBusy(true); setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `https://zameett.com/auth/callback?next=${encodeURIComponent(nextPath)}` } });
    if (error) { setMessage(error.message); setBusy(false); }
  }

  async function sendPasswordReset() {
    if (!configured) return setMessage("Password recovery is temporarily unavailable. Please contact support.");
    if (!email.trim()) return setMessage("Enter your email address first, then select Forgot password.");
    setBusy(true); setMessage("");
    const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), { redirectTo: "https://zameett.com/reset-password" });
    setBusy(false); setMessage(error ? error.message : "Password-reset instructions have been sent if an account exists for this email.");
  }

  async function submit(event) {
    event.preventDefault();
    if (!configured) return setMessage("Customer accounts are temporarily unavailable. Please contact support.");
    setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const supabase = createClient();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `https://zameett.com/auth/confirm?next=${encodeURIComponent(nextPath)}`, data: attributionToUserMetadata(readBrowserAttribution()) } });
      setBusy(false); if (error) return setMessage(error.message); setMessage("Check your inbox and verify your email before signing in."); return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false); if (error) return setMessage(error.message); window.location.assign(nextPath);
  }

  return <div className="auth-card">
    <div className="auth-tabs" role="tablist" aria-label="Account access"><button type="button" role="tab" aria-selected={mode === "signin"} className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setMessage(""); }}>Sign In</button><button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>Create Account</button></div>
    <button className="auth-google" type="button" onClick={signInWithGoogle} disabled={busy}><span aria-hidden="true">G</span> Continue with Google</button><div className="auth-divider"><span>or use email</span></div>
    <form className="auth-form" onSubmit={submit}>
      <label>Email address<input type="email" name="email" autoComplete="email" required placeholder="you@yourbrand.com" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
      <label>Password<span className="auth-password-field"><input type={showPassword ? "text" : "password"} name="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={6} required placeholder="Minimum 6 characters" /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></span></label>
      {mode === "signup" && <label className="auth-terms"><input type="checkbox" required /><span>I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span></label>}
      {mode === "signin" && <button type="button" className="auth-forgot" onClick={sendPasswordReset} disabled={busy}>Forgot password?</button>}
      <button className="btn btn-burg auth-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "signup" ? "Create My Account" : "Sign In"}</button>
    </form>
    {message && <p className="auth-message" role="status">{message}</p>}
    <div className="auth-portal-note"><strong>Inside your portal</strong><p>Completed digital orders, available downloads, profile information and project updates that Zameett has activated for your account. Some project-tracking features may be marked beta while they are being rolled out.</p></div>
    <p className="auth-note">Need help? <a href="mailto:hello@zameett.com">Contact support</a>.</p>
  </div>;
}
