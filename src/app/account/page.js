import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { decodeFreeOrders, FREE_ORDERS_COOKIE } from "@/lib/freeOrders";

export const metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(value, fallback = "Not available") {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AccountPage() {
  if (!hasSupabaseConfig()) redirect("/sign-in");
  const supabase = await createClient();
  const { data: claimsData, error } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;
  if (error || !claims?.sub) redirect("/sign-in");

  const { data: userData } = await supabase.auth.getUser();
  const authUser = userData?.user;
  const metadata = authUser?.user_metadata || claims.user_metadata || {};
  const appMetadata = authUser?.app_metadata || claims.app_metadata || {};
  const email = authUser?.email || claims.email || "";
  const name = metadata.full_name || metadata.name || email.split("@")[0] || "Client";
  const provider = appMetadata.provider === "google" ? "Google" : "Email & password";
  const joined = formatDate(authUser?.created_at);
  const lastSignIn = formatDate(authUser?.last_sign_in_at, "Current session");
  const emailVerified = Boolean(authUser?.email_confirmed_at || claims.email_verified);
  const cookieStore = await cookies();
  const orders = decodeFreeOrders(cookieStore.get(FREE_ORDERS_COOKIE)?.value)
    .filter((order) => order?.userId === claims.sub)
    .slice(0, 10);

  return (
    <main className="account-page profile-page">
      <section className="account-hero profile-hero">
        <div className="inner profile-hero-inner">
          <div>
            <span className="eyebrow">Profile</span>
            <h1>Welcome, <em>{name}.</em></h1>
            <p>Manage your Zameett orders, downloads, profile details and project requests from one place.</p>
          </div>
          <div className="profile-summary" aria-label="Profile summary">
            <div><strong>{orders.length}</strong><span>Orders</span></div>
            <div><strong>{orders.length}</strong><span>Test products</span></div>
            <div><strong>{emailVerified ? "Yes" : "Pending"}</strong><span>Email verified</span></div>
          </div>
        </div>
      </section>

      <section className="account-content profile-content">
        <div className="inner profile-dashboard">
          <article className="profile-identity profile-panel">
            <div className="profile-identity-main">
              <span className="account-avatar" aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
              <div>
                <span className="profile-kicker">Signed in profile</span>
                <h2>{name}</h2>
                <p>{email}</p>
              </div>
            </div>
            <form action="/auth/signout" method="post">
              <button type="submit" className="account-signout">Sign Out</button>
            </form>
          </article>

          <article className="profile-details profile-panel">
            <div className="profile-panel-head">
              <div><span>Account</span><h2>Profile details</h2></div>
              <span className={`profile-status ${emailVerified ? "verified" : ""}`}>{emailVerified ? "Verified" : "Pending"}</span>
            </div>
            <dl className="profile-detail-list">
              <div><dt>Email address</dt><dd>{email}</dd></div>
              <div><dt>Sign-in method</dt><dd>{provider}</dd></div>
              <div><dt>Member since</dt><dd>{joined}</dd></div>
              <div><dt>Last sign in</dt><dd>{lastSignIn}</dd></div>
            </dl>
          </article>

          <article className="profile-orders profile-panel">
            <div className="profile-panel-head">
              <div><span>Purchases</span><h2>Orders & downloads</h2></div>
              <a href="/shop#digital-products">Shop products →</a>
            </div>
            {orders.length ? (
              <div className="profile-order-list">
                {orders.map((order) => (
                  <div className="profile-order" key={order.id}>
                    <div className="profile-order-mark" aria-hidden="true">✓</div>
                    <div>
                      <span>{order.id}</span>
                      <h3>{order.name}</h3>
                      <p>{formatDate(order.createdAt)} · {order.status}</p>
                    </div>
                    <div className="profile-order-price">
                      <strong>$0</strong>
                      <a href={`/shop/${order.slug}#product-details`}>View product</a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-empty">
                <span>01</span>
                <div><h3>No orders yet</h3><p>Your completed digital-product orders and available downloads will appear here.</p></div>
                <a href="/shop#digital-products" className="btn btn-outline">Browse shop</a>
              </div>
            )}
          </article>

          <article className="profile-action profile-panel">
            <span className="profile-kicker">Projects & quotes</span>
            <h2>Start or continue a collection.</h2>
            <p>Send your design direction, tech-pack requirements or manufacturing brief to the Zameett team.</p>
            <a href="/contact#get-in-touch" className="btn btn-burg">Start a project →</a>
          </article>

          <article className="profile-action profile-panel profile-support">
            <span className="profile-kicker">Support</span>
            <h2>Need help with an order?</h2>
            <p>Contact us from the same email used for your profile so we can identify your account quickly.</p>
            <a href="mailto:hello@zameett.com" className="btn btn-outline">Email support →</a>
          </article>
        </div>
      </section>
    </main>
  );
}