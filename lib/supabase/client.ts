import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/** Browser-side client — used ONLY for Supabase Auth on /admin.
 *  All data reads go through server-side API routes.
 *  All data writes go through authenticated API routes. */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
