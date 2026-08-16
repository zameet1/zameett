import "server-only";
import { sendHostingerMail } from "@/lib/hostingerMail";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendWelcomeEmail(user) {
  const email = user?.email;
  if (!email) throw new Error("Welcome email recipient is missing.");

  const metadata = user.user_metadata || {};
  const name = escapeHtml(
    metadata.full_name || metadata.name || email.split("@")[0] || "there",
  );

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f6f0eb;font-family:Arial,Helvetica,sans-serif;color:#3f0b20">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f0eb;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fffaf6;border:1px solid #decbbd">
          <tr><td style="background:#4b0823;padding:30px 36px;text-align:center">
            <a href="https://zameett.com" style="display:inline-block;text-decoration:none"><img src="https://zameett.com/brand/zameett-email-logo.png" width="215" height="55" alt="Zameett" style="display:block;width:215px;max-width:100%;height:auto;border:0;margin:0 auto"></a>
            <div style="margin-top:8px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#c9a24f">Welcome to your account</div>
          </td></tr>
          <tr><td style="padding:36px">
            <h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:32px;line-height:1.2;font-weight:500;color:#4b0823">Welcome, ${name}.</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:#6b4b57">Your Zameett account is ready. You can now access your profile, keep track of digital-product orders and start a new modest-fashion project with us.</p>
            <table role="presentation" cellspacing="0" cellpadding="0"><tr><td style="background:#4b0823">
              <a href="https://zameett.com/account" style="display:inline-block;padding:15px 27px;color:#fffaf6;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">Open your profile</a>
            </td></tr></table>
            <p style="margin:28px 0 0;font-size:13px;line-height:1.7;color:#806773">Need help with design, tech packs or manufacturing? Reply to this email and our team will guide you.</p>
          </td></tr>
          <tr><td style="padding:20px 36px;background:#efe3db;text-align:center;font-size:11px;line-height:1.6;color:#806773">Zameett &middot; Modest Fashion Design &amp; Manufacturing<br><a href="https://zameett.com" style="color:#4b0823">zameett.com</a></td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  await sendHostingerMail({
    to: [email],
    displayName: "Zameett",
    subject: "Welcome to Zameett - your account is ready",
    text: [
      `Welcome, ${metadata.full_name || metadata.name || email.split("@")[0] || "there"}.`,
      "",
      "Your Zameett account is ready.",
      "Open your profile: https://zameett.com/account",
      "",
      "Need help? Reply to this email or contact hello@zameett.com.",
    ].join("\n"),
    html,
  });
}

export async function sendWelcomeEmailOnce(supabase, user) {
  if (!user?.email || user.user_metadata?.zameett_welcome_email_sent_at) return;

  try {
    await sendWelcomeEmail(user);
    const { error } = await supabase.auth.updateUser({
      data: { zameett_welcome_email_sent_at: new Date().toISOString() },
    });
    if (error) console.error("Welcome email flag could not be saved:", error.message);
  } catch (error) {
    console.error("Welcome email delivery failed:", error);
  }
}