import CoverImage from "@/components/CoverImage";
import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Customer Sign In",
  description: "Sign in to your Zameett customer account.",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
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
          <AuthForm />
        </div>
      </section>
    </main>
  );
}
