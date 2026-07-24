import CoverImage from "@/components/CoverImage";
import AuthForm from "@/components/AuthForm";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";

export const metadata = {
  title: "Customer Sign In",
  description: "Sign in to your Zameett customer account.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SignInPage({ searchParams }) {
  const requestedNext = (await searchParams)?.next;
  const nextPath =
    typeof requestedNext === "string" && requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/account";
  if (hasSupabaseConfig()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    if (data?.claims?.sub) redirect("/account");
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-visual">
          <CoverImage src="/images/21.jpeg" alt="Zameett modest fashion collection" objectPosition="center 25%" priority sizes="(max-width: 900px) 100vw, 48vw" />
          <div className="auth-visual-copy">
            <span>Customer Portal</span>
            <h1>Your Zameett account, <em>all in one place.</em></h1>
            <p>Access purchases, project updates and resources made for your brand.</p>
          </div>
        </div>
        <div className="auth-panel">
          <a className="auth-back" href="/">← Back to Zameett</a>
          <div className="auth-intro">
            <span className="eyebrow">Welcome</span>
            <h2>Sign in to <em>your account.</em></h2>
            <p>Use Google for the quickest access, or continue securely with email.</p>
          </div>
          <AuthForm nextPath={nextPath} />
        </div>
      </section>
    </main>
  );
}
