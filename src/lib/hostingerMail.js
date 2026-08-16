import "server-only";

const MAILBOX_RESOURCE_ID = "AC327b2a2cee33b211206845f7ab5b";
const MAIL_API_URL = `https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_RESOURCE_ID}/send`;

export async function sendHostingerMail(message) {
  const token = process.env.HOSTINGER_MAIL_API_TOKEN?.trim().replace(/^["']|["']$/g, "");
  if (!token) throw new Error("Hostinger Mail API token is not configured.");

  const response = await fetch(MAIL_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Hostinger Mail rejected the message (${response.status}): ${detail}`);
  }
}