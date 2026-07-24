import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";

export const metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!hasSupabaseConfig()) redirect("/sign-in");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (error || !user?.sub) redirect("/sign-in");

  const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Customer";

  return (
    <main className="account-page">
      <section className="account-hero">
        <div className="inner">
          <span className="eyebrow">Customer Account</span>
          <h1>Welcome back, <em>{name}.</em></h1>
          <p>Your Zameett orders, digital products and project communication will stay together here.</p>
        </div>
      </section>
      <section className="account-content">
        <div className="inner account-grid">
          <article className="account-profile">
            <span className="account-avatar" aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
            <div>
              <span>Signed in as</span>
              <h2>{name}</h2>
              <p>{user.email}</p>
            </div>
            <form action="/auth/signout" method="post">
              <button type="submit" className="account-signout">Sign Out</button>
            </form>
          </article>
          <article className="account-card">
            <span>01</span>
            <h2>Orders & Downloads</h2>
            <p>Your purchased templates and order details will appear here.</p>
            <a href="/shop">Browse the shop →</a>
          </article>
          <article className="account-card">
            <span>02</span>
            <h2>Project Support</h2>
            <p>Need help with an order or want to discuss a new collection?</p>
            <a href="/contact#get-in-touch">Contact Zameett →</a>
          </article>
        </div>
      </section>
    </main>
  );
}
