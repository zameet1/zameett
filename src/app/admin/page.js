import { getAdminDashboardData, requireAdmin } from "@/lib/adminData";
import { updateClientProjectStage } from "@/app/admin/actions";
import { getProjectStageOptions } from "@/lib/clientProjects";

export const metadata = {
  title: "Owner Dashboard",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

function formatDate(value, withTime = false) {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";
  return new Intl.DateTimeFormat("en", {
    day: "numeric", month: "short", year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(date);
}

function formatMoney(cents, currency = "USD") {
  if (cents === null || cents === undefined) return "Connect";
  return new Intl.NumberFormat("en", { style: "currency", currency }).format(cents / 100);
}

function titleCase(value) {
  return String(value || "").replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function dateParam(value) {
  return typeof value === "string" ? value : undefined;
}

function datePresetHref(from, to) {
  return `/admin?from=${from}&to=${to}`;
}

function getDatePresets() {
  const today = new Date();
  const todayValue = today.toISOString().slice(0, 10);
  const last30 = new Date(today);
  last30.setUTCDate(last30.getUTCDate() - 29);
  const lastMonthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1));
  const lastMonthEnd = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0));
  return [
    { label: "This month", href: "/admin" },
    { label: "Last 30 days", href: datePresetHref(last30.toISOString().slice(0, 10), todayValue) },
    { label: "Last month", href: datePresetHref(lastMonthStart.toISOString().slice(0, 10), lastMonthEnd.toISOString().slice(0, 10)) },
    { label: "All time", href: datePresetHref("2020-01-01", todayValue) },
  ];
}

export default async function AdminPage({ searchParams }) {
  const owner = await requireAdmin();
  const query = await searchParams;
  const data = await getAdminDashboardData({ from: dateParam(query?.from), to: dateParam(query?.to) });
  const datePresets = getDatePresets();
  const missingConnections = data.connections.filter((item) => !item.connected).length;
  const stripeConnected = data.connections.find((item) => item.name === "Stripe orders")?.connected;

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div className="inner admin-hero-inner">
          <div>
            <span className="eyebrow">Private owner access</span>
            <h1>Zameett <em>control centre.</em></h1>
            <p>Orders, customers, live projects, website content and connected services in one secure dashboard.</p>
          </div>
          <div className="admin-owner-card">
            <span className="admin-owner-avatar" aria-hidden="true">{owner.name.charAt(0).toUpperCase()}</span>
            <div><small>Signed in as owner</small><strong>{owner.name}</strong><span>{owner.email}</span></div>
            <form action="/auth/signout" method="post"><button type="submit">Sign out</button></form>
          </div>
        </div>
      </section>

      <div className="admin-toolbar">
        <div className="inner">
          <div className="admin-section-nav" aria-label="Admin sections">
            <a href="#overview">Overview</a><a href="#activity">Activity</a><a href="#orders">Orders</a>
            <a href="#customers">Customers</a><a href="#projects">Projects</a><a href="#website">Website</a>
          </div>
          <span>Updated {formatDate(data.generatedAt, true)}</span>
        </div>
      </div>

      <section className="admin-content" id="overview">
        <div className="inner admin-shell">
          <div className="admin-section-heading">
            <div><span>Business pulse</span><h2>Overview</h2></div>
            <a href="/" target="_blank" rel="noopener noreferrer">View live website →</a>
          </div>

          <details className="admin-date-popover">
            <summary><span>Date filter</span><strong>{data.range.label}</strong><i aria-hidden="true">+</i></summary>
            <div className="admin-date-panel">
              <div className="admin-date-copy"><span>Reporting period</span><strong>Select the dates you need.</strong><small>Dashboard totals, activity, customers, orders and sources will update together.</small></div>
              <form method="get" className="admin-date-form">
                <label><span>From</span><input type="date" name="from" defaultValue={data.range.from} max={data.range.to} /></label>
                <label><span>To</span><input type="date" name="to" defaultValue={data.range.to} min={data.range.from} /></label>
                <button type="submit">Apply range</button>
              </form>
              <nav className="admin-date-presets" aria-label="Date range presets">
                {datePresets.map((preset) => <a href={preset.href} key={preset.label}>{preset.label}</a>)}
              </nav>
            </div>
          </details>

          <div className="admin-stat-grid admin-stat-grid-six">
            <article><span>Total customers</span><strong>{data.stats.customers ?? "—"}</strong><small>All registered accounts</small></article>
            <article><span>New customers</span><strong>{data.stats.newCustomers ?? "—"}</strong><small>Joined in selected period</small></article>
            <article><span>Active customers</span><strong>{data.stats.activeCustomers ?? "—"}</strong><small>Signed in during period</small></article>
            <article><span>Paid digital orders</span><strong>{data.stats.paidOrders ?? "—"}</strong><small>{data.stats.orders ?? "—"} total checkouts in period</small></article>
            <article className="featured"><span>Verified revenue</span><strong>{formatMoney(data.stats.revenueCents)}</strong><small>Paid orders in selected period</small></article>
            <article><span>Active projects</span><strong>{data.stats.activeProjects}</strong><small>Current client work in progress</small></article>
          </div>

          {missingConnections > 0 && <div className="admin-notice"><div><span>Action needed</span><strong>{missingConnections} private data connection{missingConnections === 1 ? "" : "s"} need setup.</strong></div><p>Missing credentials are listed below, so no information is guessed or exposed.</p></div>}

          <div className="admin-two-column" id="activity">
            <article className="admin-panel">
              <div className="admin-panel-head"><div><span>Latest events</span><h2>Recent activity</h2></div><b>{data.activity.length}</b></div>
              {data.activity.length ? <div className="admin-activity-list">{data.activity.map((item, index) => (
                <div className={`admin-activity ${item.type}`} key={`${item.type}-${item.title}-${index}`}>
                  <i aria-hidden="true">{item.type === "order" ? "$" : item.type === "customer" ? "C" : "P"}</i>
                  <div><strong>{item.title}</strong><span>{item.detail}</span></div><time>{formatDate(item.date, true)}</time>
                </div>
              ))}</div> : <div className="admin-empty"><strong>No activity available yet.</strong><p>New orders, signups and project updates will appear here.</p></div>}
            </article>

            <article className="admin-panel admin-audience">
              <div className="admin-panel-head"><div><span>Customer intelligence</span><h2>Audience snapshot</h2></div><b>{data.customerInsights.trackedSources}</b></div>
              <div className="admin-audience-metrics">
                <div><strong>{data.stats.newCustomers ?? "—"}</strong><span>New customers</span></div>
                <div><strong>{data.stats.activeCustomers ?? "—"}</strong><span>Active customers</span></div>
                <div><strong>{data.stats.orders ?? "—"}</strong><span>Orders & checkouts</span></div>
              </div>
              <div className="admin-source-list">
                <span className="admin-source-title">Where customers came from</span>
                {data.customerInsights.sources.length ? data.customerInsights.sources.slice(0, 6).map((source) => (
                  <div key={source.name}><strong>{source.name}</strong><span>{source.count} customer{source.count === 1 ? "" : "s"}</span><i style={{ width: `${Math.max(8, Math.round((source.count / Math.max(data.stats.newCustomers || 1, 1)) * 100))}%` }} /></div>
                )) : <p>New signup source data will appear here after customer tracking starts.</p>}
              </div>
            </article>
          </div>

          <div className="admin-detail-heading">
            <div><span>Detailed records</span><h2>Open only what you need.</h2></div>
            <p>Orders, customers, projects and website tools stay minimized until you click a section.</p>
          </div>

          <details className="admin-panel admin-collapsible" id="orders">
            <summary>
              <div><span>Commerce</span><h2>Orders & payments</h2><small>Stripe checkout sessions, customers and payment status</small></div>
              <b>{data.stats.orders ?? "—"}</b><i aria-hidden="true">+</i>
            </summary>
            <div className="admin-collapsible-body">
              <a className="admin-external-link" href="https://dashboard.stripe.com/payments" target="_blank" rel="noreferrer">Open Stripe dashboard →</a>
              {data.orders.length ? <div className="admin-record-list">{data.orders.map((order) => (
                <div className="admin-record" key={order.id}>
                  <div className="admin-record-primary"><span>{order.id}</span><strong>{titleCase(order.product)}</strong><small>{formatDate(order.createdAt, true)}</small></div>
                  <div><span>Customer</span><strong>{order.customerName}</strong><small>{order.email}</small></div>
                  <div><span>Payment</span><strong>{formatMoney(order.amount, order.currency)}</strong><small>{titleCase(order.paymentStatus)}</small></div>
                  <b className={`admin-record-status ${order.paymentStatus === "paid" ? "complete" : "pending"}`}>{titleCase(order.checkoutStatus)}</b>
                </div>
              ))}</div> : <div className="admin-empty"><strong>{stripeConnected ? "No Stripe orders yet." : "Stripe order data is not connected."}</strong><p>Paid digital-product checkouts will appear here automatically.</p></div>}
            </div>
          </details>

          <details className="admin-panel admin-collapsible" id="customers">
            <summary>
              <div><span>Accounts</span><h2>Registered customers</h2><small>Verified users, sign-in method and account activity</small></div>
              <b>{data.stats.newCustomers ?? "—"}</b><i aria-hidden="true">+</i>
            </summary>
            <div className="admin-collapsible-body">
              <a className="admin-external-link" href="https://supabase.com/dashboard/project/bcczrpjprndamwzqfowd/auth/users" target="_blank" rel="noreferrer">Open Supabase users →</a>
              {data.customers.length ? <div className="admin-record-list">{data.customers.map((customer) => (
                <div className="admin-record admin-user-record" key={customer.id}>
                  <div className="admin-record-primary"><span>{customer.provider} account</span><strong>{customer.name}</strong><small>{customer.email}</small></div>
                  <div><span>Acquisition source</span><strong>{customer.source}</strong><small>{customer.medium} · {customer.campaign}</small></div>
                  <div><span>Activity level</span><strong>{customer.activity.label}</strong><small>Last sign in {formatDate(customer.lastSignInAt, true)}</small></div>
                  <div><span>Visitor profile</span><strong>{customer.device} · {customer.timezone}</strong><small>Landing: {customer.landingPage} · Referrer: {customer.referrer}</small></div>
                  <b className={`admin-record-status ${customer.verified ? "complete" : "pending"}`}>{customer.verified ? "Verified" : "Pending"}</b>
                </div>
              ))}</div> : <div className="admin-empty"><strong>{data.stats.customers === null ? "Customer directory connection is not ready." : "No customers joined in this period."}</strong><p>{data.stats.customers === null ? "Check the Supabase private key connection under System Health." : "Choose a wider date range to review earlier accounts."}</p></div>}
            </div>
          </details>

          <details className="admin-panel admin-collapsible" id="projects">
            <summary>
              <div><span>Client delivery</span><h2>Active projects</h2><small>Progress, current stage and estimated delivery</small></div>
              <b>{data.projects.length}</b><i aria-hidden="true">+</i>
            </summary>
            <div className="admin-collapsible-body">
              {query?.projectUpdate === "done" && <div className="admin-project-update-result success"><strong>Project updated and customer notified.</strong><span>Email: {query.email || "checked"} ? App notification: {query.push || "checked"}</span></div>}
              {query?.projectUpdate && query.projectUpdate !== "done" && <div className="admin-project-update-result error"><strong>Project update could not be completed.</strong><span>{query.projectUpdate.replaceAll("-", " ")}</span></div>}
              {data.projects.length ? <div className="admin-project-list">{data.projects.map((project) => (
                <div className="admin-project" key={project.id}>
                  <div className="admin-project-top"><div><span>{project.id}</span><h3>{project.title}</h3><p>{project.email}</p></div><div className="admin-project-value"><b>{project.amount}</b>{project.paymentSummary && <small>{project.paymentSummary}</small>}</div></div>
                  <div className="admin-project-stage"><span>Current stage</span><strong>{project.currentStage}</strong><small>Estimated delivery {formatDate(project.estimatedDelivery)}</small></div>
                  <div className="admin-project-progress"><div><span>Progress</span><strong>{project.progress}%</strong></div><div><i style={{ width: `${project.progress}%` }} /></div></div>
                  <form action={updateClientProjectStage} className="admin-project-update-form">
                    <input type="hidden" name="projectId" value={project.id} />
                    <label>
                      <span>Move project to</span>
                      <select name="stageIndex" defaultValue={String(Math.max(0, project.milestones.findIndex((milestone) => milestone.state === "current")))}>
                        {getProjectStageOptions(project.id).map((stage) => <option value={stage.index} key={stage.index}>{stage.label}</option>)}
                      </select>
                    </label>
                    <button type="submit">Save & notify customer</button>
                  </form>
                </div>
              ))}</div> : <div className="admin-empty"><strong>No active projects.</strong><p>Client projects will appear here when added to the project register.</p></div>}
            </div>
          </details>

          <details className="admin-panel admin-collapsible" id="website">
            <summary>
              <div><span>Website management</span><h2>Content, analytics & tools</h2><small>Published pages, products and reporting services</small></div>
              <b>{data.inventory.products.length + data.inventory.services + data.inventory.solutions + data.inventory.blogPosts}</b><i aria-hidden="true">+</i>
            </summary>
            <div className="admin-collapsible-body admin-two-column admin-collapsible-grid">
              <article className="admin-subpanel admin-inventory">
                <div className="admin-panel-head"><div><span>Published website</span><h2>Content inventory</h2></div></div>
                <div className="admin-inventory-stats"><div><strong>{data.inventory.products.length}</strong><span>Digital products</span></div><div><strong>{data.inventory.services}</strong><span>Service pages</span></div><div><strong>{data.inventory.solutions}</strong><span>SEO pages</span></div><div><strong>{data.inventory.blogPosts}</strong><span>Blog articles</span></div></div>
                <div className="admin-product-list">{data.inventory.products.map((product) => <a href={`/shop/${product.slug}`} target="_blank" rel="noopener noreferrer" key={product.slug}><span>{product.name}</span><strong>{product.price}</strong></a>)}</div>
              </article>

              <article className="admin-subpanel admin-tools">
                <div className="admin-panel-head"><div><span>External reporting</span><h2>Analytics & tools</h2></div></div>
                <div className="admin-tool-links">
                  <a href="https://analytics.google.com/" target="_blank" rel="noreferrer"><strong>Google Analytics</strong><span>Visitors, countries, devices and traffic sources</span><b>Open →</b></a>
                  <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer"><strong>Search Console</strong><span>Google searches, rankings and indexing</span><b>Open →</b></a>
                  <a href="https://hpanel.hostinger.com/" target="_blank" rel="noreferrer"><strong>Hostinger</strong><span>Deployments, performance and runtime logs</span><b>Open →</b></a>
                  <a href="mailto:hello@zameett.com"><strong>Enquiry inbox</strong><span>Contact forms and customer replies</span><b>Open →</b></a>
                </div>
              </article>
            </div>
          </details>
          <details className="admin-panel admin-collapsible" id="connections">
            <summary>
              <div><span>System health</span><h2>Connections & tracking</h2><small>Authentication, payments, analytics, ads and email services</small></div>
              <b>{data.connections.length - missingConnections}/{data.connections.length}</b><i aria-hidden="true">+</i>
            </summary>
            <div className="admin-collapsible-body admin-connection-list">{data.connections.map((item) => (
              <div key={item.name}><i className={item.connected ? "connected" : "missing"} aria-hidden="true" /><div><strong>{item.name}</strong><span>{item.detail}</span></div><b>{item.connected ? "Active" : "Setup"}</b></div>
            ))}</div>
          </details>
          <p className="admin-privacy-note">Private dashboard · Accessible only to {owner.email} · Customer and payment data is rendered server-side.</p>
        </div>
      </section>
    </main>
  );
}