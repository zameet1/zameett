import { getVapidPublicKey } from "@/lib/pushNotifications";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const publicKey = getVapidPublicKey();
  if (!publicKey) {
    return Response.json(
      { error: "Account notifications are being configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  return Response.json(
    { publicKey },
    { headers: { "Cache-Control": "no-store" } },
  );
}
