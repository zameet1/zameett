"use client";
import { useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
export default function ResetPasswordPage() {
  const [password,setPassword]=useState(""); const [show,setShow]=useState(false); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  async function submit(event){event.preventDefault(); if(!hasSupabaseConfig()) return setMessage("Password recovery is temporarily unavailable."); setBusy(true); const {error}=await createClient().auth.updateUser({password}); setBusy(false); if(error) return setMessage(error.message); setMessage("Password updated. You can now sign in.");}
  return <main className="auth-page"><section className="auth-reset-shell"><a className="auth-back" href="/sign-in">← Back to sign in</a><div className="auth-card"><span className="eyebrow">Account Recovery</span><h1>Choose a new password.</h1><form className="auth-form" onSubmit={submit}><label>New password<span className="auth-password-field"><input type={show?"text":"password"} value={password} onChange={(event)=>setPassword(event.target.value)} minLength={8} required autoComplete="new-password" /><button type="button" onClick={()=>setShow((value)=>!value)}>{show?"Hide":"Show"}</button></span></label><button className="btn btn-burg auth-submit" type="submit" disabled={busy}>{busy?"Updating…":"Update password"}</button></form>{message&&<p className="auth-message" role="status">{message}</p>}</div></section></main>;
}
