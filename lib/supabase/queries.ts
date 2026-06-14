import type { WatchRow, ReadRow, PlayRow } from "@/lib/supabase/types"

/** Fetch entries from our own /api/entries route (ISR cached, server-rendered).
 *  These never expose Supabase credentials to the client. */

export async function getWatchEntries(): Promise<WatchRow[]> {
  try {
    const res = await fetch(`/api/entries?collection=watch`)
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function getReadEntries(): Promise<ReadRow[]> {
  try {
    const res = await fetch(`/api/entries?collection=read`)
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function getPlayEntries(): Promise<PlayRow[]> {
  try {
    const res = await fetch(`/api/entries?collection=play`)
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
