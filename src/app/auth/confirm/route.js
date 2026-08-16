import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase/config";
import { sendWelcomeEmailOnce } from "@/lib/accountEmails";

const allowedOtpTypes = new Set(["email", "signup", "invite", "magiclink"]);

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  let next = searchParams.get("next") || "/account";

  if (!next.startsWith("/") || next.startsWith("//")) next = "/account";

  const canonicalOrigin =
    process.env.NODE_ENV === "production" ? "https://zameett.com" : origin;
  const successResponse = NextResponse.redirect(new URL(next, canonicalOrigin));
  successResponse.headers.set("Cache-Control", "private, no-store, max-age=0");

  if (!tokenHash || !type || !allowedOtpTypes.has(type)) {
    return NextResponse.redirect(
      new URL("/sign-in?error=confirmation", canonicalOrigin)
    );
  }

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            successResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type,
  });

  if (!error) {
    await sendWelcomeEmailOnce(supabase, data.user);
    return successResponse;
  }

  return NextResponse.redirect(
    new URL("/sign-in?error=confirmation", canonicalOrigin)
  );
}