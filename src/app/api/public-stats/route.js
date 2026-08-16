import { getLiveClientCount } from "@/lib/publicStats";

export const dynamic = "force-dynamic";

export async function GET() {
  const clients = await getLiveClientCount();
  return Response.json(
    { clients },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
