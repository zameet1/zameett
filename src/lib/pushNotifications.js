import "server-only";

import webpush from "web-push";
import { embeddedVapidConfig } from "@/lib/vapidEmbeddedConfig";

function pushConfig() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() || embeddedVapidConfig.publicKey;
  const privateKey = process.env.VAPID_PRIVATE_KEY?.trim() || embeddedVapidConfig.privateKey;
  const subject = process.env.VAPID_SUBJECT?.trim() || embeddedVapidConfig.subject || "mailto:hello@zameett.com";
  if (!publicKey || !privateKey) return null;
  return { publicKey, privateKey, subject };
}

export function getVapidPublicKey() {
  return pushConfig()?.publicKey || null;
}

export function normalizePushSubscription(value) {
  if (!value || typeof value !== "object") return null;
  const endpoint = typeof value.endpoint === "string" ? value.endpoint.trim() : "";
  const p256dh = typeof value.keys?.p256dh === "string" ? value.keys.p256dh.trim() : "";
  const auth = typeof value.keys?.auth === "string" ? value.keys.auth.trim() : "";
  if (!endpoint.startsWith("https://") || !p256dh || !auth) return null;
  return { endpoint, expirationTime: value.expirationTime || null, keys: { p256dh, auth } };
}

export async function sendAccountPush(subscriptions, payload) {
  const config = pushConfig();
  if (!config) return { sent: 0, failed: 0, staleEndpoints: [], configured: false };

  webpush.setVapidDetails(config.subject, config.publicKey, config.privateKey);
  const unique = [...new Map((subscriptions || []).map((item) => [item?.endpoint, normalizePushSubscription(item)])).values()].filter(Boolean);
  const results = await Promise.all(
    unique.map(async (subscription) => {
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: payload.title,
            body: payload.body,
            url: payload.url || "/account",
            tag: payload.tag || "zameett-account-update",
          }),
          { TTL: 86400, urgency: "high" },
        );
        return { ok: true, endpoint: subscription.endpoint };
      } catch (error) {
        return {
          ok: false,
          endpoint: subscription.endpoint,
          stale: error?.statusCode === 404 || error?.statusCode === 410,
        };
      }
    }),
  );

  return {
    sent: results.filter((result) => result.ok).length,
    failed: results.filter((result) => !result.ok).length,
    staleEndpoints: results.filter((result) => result.stale).map((result) => result.endpoint),
    configured: true,
  };
}
