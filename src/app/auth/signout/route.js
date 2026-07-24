import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  const origin =
    process.env.NODE_ENV === "production"
      ? "https://zameett.com"
      : new URL(request.url).origin;
  return NextResponse.redirect(new URL("/", origin), 303);
}