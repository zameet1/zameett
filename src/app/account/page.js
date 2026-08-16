import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { decodeFreeOrders, FREE_ORDERS_COOKIE } from "@/lib/freeOrders";
import { getProjectsForEmail } from "@/lib/clientProjects";
import AccountActivityNotifications from "@/components/AccountActivityNotifications";

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
  const projects = getProjectsForEmail(email, appMetadata.zameett_project_updates || {});
  const totalRecords = orders.length + projects.length;

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
            <div><strong>{totalRecords}</strong><span>Orders</span></div>
            <div><strong>{projects.length}</strong><span>Active projects</span></div>
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
            <div className="profile-identity-actions">
              <details className="profile-compact-details">
                <summary>
                  <span>Profile details</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <div className="profile-compact-details-body">
                  <span className={`profile-status ${emailVerified ? "verified" : ""}`}>{emailVerified ? "Verified" : "Pending"}</span>
                  <dl className="profile-detail-list">
                    <div><dt>Email address</dt><dd>{email}</dd></div>
                    <div><dt>Sign-in method</dt><dd>{provider}</dd></div>
                    <div><dt>Member since</dt><dd>{joined}</dd></div>
                    <div><dt>Last sign in</dt><dd>{lastSignIn}</dd></div>
                  </dl>
                </div>
              </details>
              <form action="/auth/signout" method="post">
                <button type="submit" className="account-signout">Sign Out</button>
              </form>
            </div>
          </article>

          <AccountActivityNotifications projects={projects} orders={orders} />

          {projects.length > 0 && (
            <article className="profile-projects profile-panel">
              <div className="profile-panel-head">
                <div><span>Live project</span><h2>Project progress</h2></div>
                <span className="project-status-badge">Pending</span>
              </div>
              <div className="profile-project-list">
                {projects.map((project) => (
                  <section className="profile-project" key={project.id}>
                    <div className="project-spotlight">
                      <div className="project-spotlight-copy">
                        <div className="project-topline">
                          <span className="profile-kicker">{project.id}</span>
                          <span className="project-status-badge">{project.status}</span>
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="project-current-stage">
                          <span>Current stage</span>
                          <strong>{project.currentStage}</strong>
                          <small>We will update your dashboard as soon as this stage moves forward.</small>
                        </div>
                      </div>
                      <div
                        className="project-progress-ring"
                        style={{ "--project-progress": `${project.progress * 3.6}deg` }}
                        aria-label={`${project.progress}% complete`}
                      >
                        <div><strong>{project.progress}%</strong><span>Complete</span></div>
                      </div>
                    </div>

                    <div className="project-metrics">
                      <div><span>Project value</span><strong>{project.amount}</strong>{project.paymentSummary && <small className="project-payment-summary">{project.paymentSummary}</small>}</div>
                      <div><span>Status</span><strong>{project.status}</strong></div>
                      <div><span>Delivery window</span><strong>{project.deliveryWindow}</strong></div>
                      <div><span>Estimated delivery</span><strong>{formatDate(project.estimatedDelivery)}</strong></div>
                    </div>

                    <div className="project-progress-line">
                      <div>
                        <span>Project progress</span>
                        <small>Last updated {formatDate(project.updatedAt)}</small>
                      </div>
                      <div
                        className="project-progress-track"
                        role="progressbar"
                        aria-label={`${project.title} progress`}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={project.progress}
                      >
                        <span style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>

                    <ol className="project-timeline">
                      {project.milestones.map((milestone, index) => (
                        <li className={milestone.state} key={milestone.label}>
                          <div className="project-step-head">
                            <span className="project-step-mark" aria-hidden="true">
                              {milestone.state === "complete" ? "✓" : index + 1}
                            </span>
                            <span className="project-step-state">
                              {milestone.state === "complete" ? "Complete" : milestone.state === "current" ? "In progress" : "Upcoming"}
                            </span>
                          </div>
                          <small>{milestone.date}</small>
                          <h4>{milestone.label}</h4>
                          <p>{milestone.detail}</p>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </article>
          )}
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
            <div className="profile-support-actions"><a href="mailto:hello@zameett.com" className="btn btn-outline">Email support →</a><a href="mailto:hello@zameett.com?subject=Account%20deletion%20request" className="profile-delete-link">Request account deletion</a></div>
          </article>
        </div>
      </section>
    </main>
  );
}