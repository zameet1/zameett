// Supabase project URL and publishable key are intentionally public values.
// Environment variables can override these defaults on another deployment.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://bcczrpjprndamwzqfowd.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_yrIhBLhw8kOPtnJibzubLw_SzevGHhh";

export const hasSupabaseConfig = () =>
  Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
