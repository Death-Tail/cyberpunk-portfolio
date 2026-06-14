import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

type Collection = "watch" | "read" | "play"

/** Cached server-side data fetcher with revalidation tags.
 *  Next.js caches the result and revalidates it:
 *  - Every 60 seconds (ISR time-based)
 *  - On-demand when revalidateTag() is called from /api/admin/entries */
function getCachedEntries(collection: Collection) {
  const table = `${collection}_entries` as "watch_entries" | "read_entries" | "play_entries"
  const tag = `${collection}-entries`

  return unstable_cache(
    async () => {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true })

      if (error) {
        console.error(`[api/entries] ${collection} error:`, error.message)
        return []
      }
      return data ?? []
    },
    [`entries-${collection}`],
    {
      revalidate: 60,
      tags: [tag, "all-entries"],
    }
  )
}

/** GET /api/entries?collection=watch|read|play
 *  Server-side cached fetch with ISR + revalidation tags.
 *  Supabase service role key stays server-side. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const collection = searchParams.get("collection") as Collection | null

  if (!collection || !["watch", "read", "play"].includes(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
  }

  try {
    const fetchEntries = getCachedEntries(collection)
    const data = await fetchEntries()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (err: any) {
    console.error(`[api/entries] fatal:`, err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/** Force dynamic rendering — the caching is handled by unstable_cache */
export const dynamic = "force-dynamic"
