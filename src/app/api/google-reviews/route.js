import { getGoogleReviews } from "@/lib/googleReviews";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getGoogleReviews();
  return Response.json(data, {
    headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" },
  });
}
