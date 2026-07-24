"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState("signin");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const configured = hasSupabaseConfig();

  async function signInWithGoogle() {
    if (!configured) return setMessage("Customer accounts are being activated. Please check back shortly.");
    setBusy(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "https://zameett.com/auth/callback?next=/account" },
    });
    if (error) {
      setMessage(error.message);
      setBusy(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (!configured) return setMessage("Customer accounts are being activated. Please check back shortly.");
    setBusy(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: "https://zameett.com/account" },
      });
      setBusy(false);
      if (error) return setMessage(error.message);
      setMessage("Check your inbox for a confirmation email from Zameett.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMessage(error.message);
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="auth-card">
      <div className="auth-tabs" role="tablist" aria-label="Account access">
        <button type="button" role="tab" aria-selected={mode === "signin"} className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setMessage(""); }}>
          Sign In
        </button>
        <button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>
          Create Account
        </button>
      </div>
      <button className="auth-google" type="button" onClick={signInWithGoogle} disabled={busy}>
        <span aria-hidden="true">G</span> Continue with Google
      </button>
      <div className="auth-divider"><span>or use email</span></div>
      <form className="auth-form" onSubmit={submit}>
        <label>
          Email address
          <input type="email" name="email" autoComplete="email" required placeholder="you@yourbrand.com" />
        </label>
        <label>
          Password
          <input type="password" name="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={6} required placeholder="Minimum 6 characters" />
        </label>
        <button className="btn btn-burg auth-submit" type="submit" disabled={busy}>
          {busy ? "Please wait…" : mode === "signup" ? "Create My Account" : "Sign In"}
        </button>
      </form>
      {message && <p className="auth-message" role="status">{message}</p>}
      <p className="auth-note">Secure access for your orders, digital products and project updates.</p>
    </div>
  );
}
