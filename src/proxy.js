import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request) {
  if (request.nextUrl.hostname === "www.zameett.com") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.hostname = "zameett.com";
    canonicalUrl.protocol = "https:";
    return NextResponse.redirect(canonicalUrl, 308);
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};