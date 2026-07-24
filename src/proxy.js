import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim().split(":")[0];
  const host = request.headers.get("host")?.split(":")[0];
  if (request.nextUrl.hostname === "www.zameett.com" || forwardedHost === "www.zameett.com" || host === "www.zameett.com") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.hostname = "zameett.com";
    canonicalUrl.protocol = "https:";
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};