import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (url === undefined || key === undefined) {
  throw new Error("Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY");
}

const isBrowser = typeof window !== "undefined";

export const supabase = createClient(url, key, {
  auth: {
    storage: isBrowser ? window.localStorage : undefined,
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser,
  },
});
