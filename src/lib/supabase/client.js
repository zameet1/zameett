import { createBrowserClient } from "@supabase/ssr";
import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
  hasSupabaseConfig,
} from "./config";

export { hasSupabaseConfig };

export function createClient() {
  if (!hasSupabaseConfig()) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}