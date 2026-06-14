import { supabase } from "@/lib/supabase/client"

/* ── Auth (browser-side only) ─────────────────────────── */
export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getSession() {
  return supabase.auth.getSession()
}

/** Get the current access token for authenticated API calls */
async function getAccessToken(): Promise<string> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error("Not authenticated")
  return token
}

/* ── Admin CRUD via API routes ────────────────────────── */
/* All writes go through /api/admin/entries which:
   1. Verifies the JWT server-side
   2. Uses the service role key to write to Supabase
   3. Revalidates ISR cache tags automatically */

type Collection = "watch" | "read" | "play"

export async function createEntry(collection: Collection, data: any) {
  const token = await getAccessToken()
  const res = await fetch("/api/admin/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ collection, data }),
  })
  const json = await res.json()
  if (!res.ok) return { data: null, error: { message: json.error } }
  return { data: json, error: null }
}

export async function updateEntry(collection: Collection, id: string, data: any) {
  const token = await getAccessToken()
  const res = await fetch("/api/admin/entries", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ collection, id, data }),
  })
  const json = await res.json()
  if (!res.ok) return { data: null, error: { message: json.error } }
  return { data: json, error: null }
}

export async function deleteEntry(collection: Collection, id: string) {
  const token = await getAccessToken()
  const res = await fetch("/api/admin/entries", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ collection, id }),
  })
  const json = await res.json()
  if (!res.ok) return { error: { message: json.error } }
  return { error: null }
}
