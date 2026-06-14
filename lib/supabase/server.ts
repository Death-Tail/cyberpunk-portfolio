import "server-only"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"

/** Server-only Supabase client using the service role key.
 *  This bypasses RLS — used for server-side data fetching
 *  and admin API routes. NEVER import this from client code. */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL")
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
