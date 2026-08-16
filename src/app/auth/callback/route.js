import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase/config";
import { sendWelcomeEmailOnce } from "@/lib/accountEmails";
import { ATTRIBUTION_COOKIE, attributionToUserMetadata, decodeAttribution } from "@/lib/attribution";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") || "/account";
  if (!next.startsWith("/") || next.startsWith("//")) next = "/account";

  const canonicalOrigin = process.env.NODE_ENV === "production" ? "https://zameett.com" : origin;
  const response = NextResponse.redirect(new URL(next, canonicalOrigin));
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const user = data.session?.user;
      if (user && !user.user_metadata?.acquisition_source) {
        const attribution = decodeAttribution(request.cookies.get(ATTRIBUTION_COOKIE)?.value);
        const metadata = attributionToUserMetadata(attribution);
        if (Object.keys(metadata).length) await supabase.auth.updateUser({ data: metadata });
      }
      await sendWelcomeEmailOnce(supabase, user);
      return response;
    }
  }
  return NextResponse.redirect(new URL("/sign-in?error=callback", canonicalOrigin));
}