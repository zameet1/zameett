import { sendHostingerMail } from "@/lib/hostingerMail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 6 * 1024 * 1024;
const MAX_FILES_BYTES = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set(["application/pdf","image/jpeg","image/png","application/zip","application/x-zip-compressed"]);
const REQUIRED_FIELDS = ["First Name","Last Name","Email","Product Category","Project Route","Project Stage","Estimated Budget","Service Required","Target Market or Country","Message","Privacy Consent"];
const FIELD_NAMES = ["Package","First Name","Last Name","Email","Phone","Brand Name","Service Required","Custom Service","Product Category","Project Route","Project Stage","Estimated Budget","Number of Styles","Required Quantity","Target Sizes","Target Market or Country","Required Delivery Date","Preferred Communication","NDA Required","How Did You Hear About Us","Google Drive or WeTransfer Link","Message","Privacy Consent"];

const rateStore = globalThis.__zameettContactRateStore || new Map();
globalThis.__zameettContactRateStore = rateStore;

function isAllowedOrigin(request) {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  return origin === "https://zameett.com" || origin === "https://www.zameett.com";
}
function clientKey(request) {
  return (request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown").split(",")[0].trim();
}
function isRateLimited(request) {
  const now = Date.now();
  const key = clientKey(request);
  const previous = (rateStore.get(key) || []).filter((timestamp) => now - timestamp < 10 * 60 * 1000);
  if (previous.length >= 5) return true;
  rateStore.set(key, [...previous, now]);
  if (rateStore.size > 500) {
    for (const [storedKey, timestamps] of rateStore) {
      if (!timestamps.some((timestamp) => now - timestamp < 10 * 60 * 1000)) rateStore.delete(storedKey);
    }
  }
  return false;
}
function clean(value, max = 4000) {
  return String(value || "").trim().slice(0, max);
}
function escapeHtml(value) {
  return clean(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (isRateLimited(request)) return Response.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return Response.json({ error: "Attachments must be 5 MB or less in total." }, { status: 413 });

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "The submitted form could not be read." }, { status: 400 });
  }

  if (clean(formData.get("Website"))) return Response.json({ success: true });

  const fields = Object.fromEntries(FIELD_NAMES.map((name) => [name, clean(formData.get(name))]));
  const missing = REQUIRED_FIELDS.filter((name) => !fields[name]);
  if (missing.length || !validEmail(fields.Email)) return Response.json({ error: "Please complete all required fields with a valid email address." }, { status: 400 });

  const files = ["Reference File","Sketch File","Tech Pack File"]
    .map((name) => formData.get(name))
    .filter((file) => file && typeof file.arrayBuffer === "function" && file.size > 0);
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_FILES_BYTES) return Response.json({ error: "Attachments must be 5 MB or less in total." }, { status: 413 });
  if (files.some((file) => !ALLOWED_FILE_TYPES.has(file.type))) return Response.json({ error: "Only PDF, JPG, PNG and ZIP files are accepted." }, { status: 415 });

  const attachments = await Promise.all(files.map(async (file) => ({
    filename: clean(file.name, 180).replace(/[^\w.\- ()]/g, "_"),
    content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    contentType: file.type,
    encoding: "base64",
  })));

  const rows = FIELD_NAMES.filter((name) => fields[name]).map((name) => name + ": " + fields[name]);
  const htmlRows = FIELD_NAMES.filter((name) => fields[name]).map((name) =>
    '<tr><th align="left" style="padding:8px;border-bottom:1px solid #eadfd7;color:#4b0823">' + escapeHtml(name) + '</th><td style="padding:8px;border-bottom:1px solid #eadfd7;color:#4b3d44">' + escapeHtml(fields[name]).replaceAll("\n","<br>") + "</td></tr>"
  ).join("");

  try {
    await sendHostingerMail({
      to: ["hello@zameett.com"],
      displayName: "Zameett Website",
      subject: "New Zameett enquiry: " + fields["Service Required"],
      text: ["New project enquiry from zameett.com","",...rows].join("\n"),
      html: '<div style="font-family:Arial,sans-serif;background:#f6f0eb;padding:24px"><div style="max-width:720px;margin:auto;background:#fffaf6;padding:28px;border:1px solid #decbbd"><h1 style="color:#4b0823">New project enquiry</h1><table style="width:100%;border-collapse:collapse">' + htmlRows + "</table></div></div>",
      ...(attachments.length ? { attachments } : {}),
    });
  } catch (error) {
    console.error("Contact email failed:", error);
    return Response.json({ error: "Email delivery is temporarily unavailable. Please email hello@zameett.com." }, { status: 502 });
  }

  return Response.json({ success: true }, { headers: { "Cache-Control": "private, no-store, max-age=0" } });
}
