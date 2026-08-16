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
function clientEmailHtml(order) {
  const name = escapeHtml(order.customerName);
  const orderId = escapeHtml(order.id);
  const product = escapeHtml(order.product);
  const amount = escapeHtml(order.amount);

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f6f0eb;font-family:Arial,Helvetica,sans-serif;color:#3f0b20">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f0eb;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fffaf6;border:1px solid #decbbd">
          <tr><td style="background:#4b0823;padding:30px 36px;text-align:center">
            <a href="https://zameett.com" style="display:inline-block;text-decoration:none"><img src="https://zameett.com/brand/zameett-email-logo.png" width="215" height="55" alt="Zameett" style="display:block;width:215px;max-width:100%;height:auto;border:0;margin:0 auto"></a>
            <div style="margin-top:8px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#c9a24f">Order confirmation</div>
          </td></tr>
          <tr><td style="padding:36px">
            <h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:30px;line-height:1.2;font-weight:500;color:#4b0823">Thank you, ${name}.</h1>
            <p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:#6b4b57">Your order has been received successfully. You can review its details below and find it anytime in your Zameett Profile.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #decbbd">
              <tr><td style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Order ID</td><td align="right" style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:14px;color:#4b0823">${orderId}</td></tr>
              <tr><td style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Product</td><td align="right" style="padding:13px 16px;border-bottom:1px solid #eadfd7;font-size:14px;color:#4b0823">${product}</td></tr>
              <tr><td style="padding:13px 16px;font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#9b7a68">Amount</td><td align="right" style="padding:13px 16px;font-size:14px;font-weight:700;color:#4b0823">${amount}</td></tr>
            </table>
            <div style="padding-top:28px;text-align:center"><a href="https://zameett.com/account" style="display:inline-block;background:#4b0823;color:#fffaf6;text-decoration:none;padding:14px 28px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">View your profile</a></div>
            <p style="margin:28px 0 0;font-size:13px;line-height:1.7;color:#806773">If you need help, reply to this email or contact <a href="mailto:hello@zameett.com" style="color:#4b0823">hello@zameett.com</a>.</p>
          </td></tr>
          <tr><td style="padding:20px 36px;background:#efe3db;text-align:center;font-size:11px;line-height:1.6;color:#806773">Zameett &middot; Modest Fashion Design &amp; Manufacturing</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function clientEmailText(order) {
  return [
    `Thank you, ${order.customerName}.`,
    "",
    "Your Zameett order has been received successfully.",
    `Order ID: ${order.id}`,
    `Product: ${order.product}`,
    `Amount: ${order.amount}`,
    "",
    "View your profile: https://zameett.com/account",
    "Need help? Reply to this email or contact hello@zameett.com.",
  ].join("\n");
}

export async function sendCustomerOrderEmail(order) {
  await sendHostingerMail({
    to: [order.customerEmail],
    displayName: "Zameett",
    subject: `Your Zameett order is confirmed - ${order.id}`,
    text: clientEmailText(order),
    html: clientEmailHtml(order),
  });
}

export async function sendOwnerOrderEmail(order) {
  const id = escapeHtml(order.id);
  const product = escapeHtml(order.product);
  const amount = escapeHtml(order.amount);
  const type = escapeHtml(order.type);
  const customerName = escapeHtml(order.customerName);
  const customerEmail = escapeHtml(order.customerEmail);

  await sendHostingerMail({
    to: ["hello@zameett.com"],
    displayName: "Zameett Order Alerts",
    subject: "New Zameett order - " + order.product,
    text: [
      "A verified order was completed on zameett.com.",
      "",
      "Order ID: " + order.id,
      "Product: " + order.product,
      "Amount: " + order.amount,
      "Order type: " + order.type,
      "Customer name: " + order.customerName,
      "Customer email: " + order.customerEmail,
    ].join("\n"),
    html:
      '<div style="font-family:Arial,sans-serif;background:#f6f0eb;padding:24px"><div style="max-width:620px;margin:auto;background:#fffaf6;padding:28px;border:1px solid #decbbd">' +
      '<h1 style="color:#4b0823">New verified order</h1>' +
      '<p><strong>Order ID:</strong> ' + id + '</p>' +
      '<p><strong>Product:</strong> ' + product + '</p>' +
      '<p><strong>Amount:</strong> ' + amount + '</p>' +
      '<p><strong>Order type:</strong> ' + type + '</p>' +
      '<p><strong>Customer:</strong> ' + customerName + ' (' + customerEmail + ')</p>' +
      "</div></div>",
  });
}
