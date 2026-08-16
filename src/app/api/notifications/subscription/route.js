import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { SUPABASE_URL } from "@/lib/supabase/config";
import { normalizePushSubscription } from "@/lib/pushNotifications";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function authenticatedUser() {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return error ? null : data?.user || null;
}

async function updateSubscriptions(user, subscriptions) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceKey) throw new Error("Notification storage is not configured.");

  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${encodeURIComponent(user.id)}`, {
    method: "PUT",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_metadata: {
        ...(user.app_metadata || {}),
        zameett_push_subscriptions: subscriptions.slice(-5),
      },
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not save notification preference (${response.status}).`);
}

export async function POST(request) {
  const user = await authenticatedUser();
  if (!user) return Response.json({ error: "Sign in is required." }, { status: 401 });

  try {
    const body = await request.json();
    const subscription = normalizePushSubscription(body?.subscription || body);
    if (!subscription) return Response.json({ error: "Invalid notification subscription." }, { status: 400 });

    const current = Array.isArray(user.app_metadata?.zameett_push_subscriptions)
      ? user.app_metadata.zameett_push_subscriptions.map(normalizePushSubscription).filter(Boolean)
      : [];
    const subscriptions = [
      ...current.filter((item) => item.endpoint !== subscription.endpoint),
      subscription,
    ];
    await updateSubscriptions(user, subscriptions);
    return Response.json({ subscribed: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Notifications could not be enabled." },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  const user = await authenticatedUser();
  if (!user) return Response.json({ error: "Sign in is required." }, { status: 401 });

  try {
    const body = await request.json().catch(() => ({}));
    const endpoint = typeof body.endpoint === "string" ? body.endpoint : "";
    const current = Array.isArray(user.app_metadata?.zameett_push_subscriptions)
      ? user.app_metadata.zameett_push_subscriptions.map(normalizePushSubscription).filter(Boolean)
      : [];
    const subscriptions = endpoint ? current.filter((item) => item.endpoint !== endpoint) : [];
    await updateSubscriptions(user, subscriptions);
    return Response.json({ subscribed: false });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Notifications could not be disabled." },
      { status: 500 },
    );
  }
}
