import { createServerClient } from "@/lib/supabase/server"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"

type Collection = "watch" | "read" | "play"

const VALID_COLLECTIONS = new Set(["watch", "read", "play"])

/* ── Allowed fields per collection (whitelist — blocks injection) ── */
const ALLOWED_FIELDS: Record<Collection, Set<string>> = {
  watch: new Set(["title", "jp_title", "kind", "year", "status", "rating", "episodes", "cover", "note", "finished_on", "tags", "sort_order"]),
  read: new Set(["title", "jp_title", "kind", "year", "status", "rating", "chapters", "cover", "note", "finished_on", "tags", "sort_order"]),
  play: new Set(["title", "kind", "year", "status", "rating", "hours", "cover", "note", "finished_on", "favorite", "tags", "sort_order"]),
}

/* ── Allowed enum values (prevents constraint violations and injection) ── */
const VALID_KINDS: Record<Collection, Set<string>> = {
  watch: new Set(["anime", "film", "series"]),
  read: new Set(["manga", "manhwa", "manhua", "book", "essay"]),
  play: new Set(["single", "live"]),
}

const VALID_STATUSES: Record<Collection, Set<string>> = {
  watch: new Set(["watching", "finished", "dropped", "queued"]),
  read: new Set(["reading", "finished", "dropped", "queued"]),
  play: new Set(["playing", "finished", "dropped", "queued", "endless"]),
}

/** Strip data down to only allowed fields for this collection */
function sanitizePayload(collection: Collection, data: Record<string, any>): Record<string, any> {
  const allowed = ALLOWED_FIELDS[collection]
  const sanitized: Record<string, any> = {}

  for (const [key, value] of Object.entries(data)) {
    if (allowed.has(key)) {
      sanitized[key] = value
    }
  }

  return sanitized
}

/** Validate enum fields */
function validateEnums(collection: Collection, data: Record<string, any>): string | null {
  if (data.kind && !VALID_KINDS[collection].has(data.kind)) {
    return `Invalid kind: ${data.kind}`
  }
  if (data.status && !VALID_STATUSES[collection].has(data.status)) {
    return `Invalid status: ${data.status}`
  }
  if (data.rating !== null && data.rating !== undefined) {
    const r = Number(data.rating)
    if (isNaN(r) || r < 0 || r > 10) return "Rating must be 0–10"
  }
  if (data.year !== null && data.year !== undefined) {
    const y = Number(data.year)
    if (isNaN(y) || y < 1900 || y > 2100) return "Year must be 1900–2100"
  }
  if (data.title && (typeof data.title !== "string" || data.title.length > 500)) {
    return "Title must be a string under 500 characters"
  }
  if (data.note && typeof data.note === "string" && data.note.length > 2000) {
    return "Note must be under 2000 characters"
  }
  if (data.tags && !Array.isArray(data.tags)) {
    return "Tags must be an array"
  }
  return null
}

/** Verify the request is from an authenticated Supabase user.
 *  Uses getUser() which validates the JWT against Supabase's auth server. */
async function verifyAuth(request: Request): Promise<{ authenticated: boolean; userId?: string }> {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) return { authenticated: false }

  const token = authHeader.slice(7)

  /* Basic JWT format check before even hitting Supabase */
  if (token.length < 100 || token.split(".").length !== 3) {
    return { authenticated: false }
  }

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL)!
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY)!

  const supabase = createClient<Database>(url, key)
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (!user || error) return { authenticated: false }

  return { authenticated: true, userId: user.id }
}

function getTable(collection: Collection) {
  return `${collection}_entries` as "watch_entries" | "read_entries" | "play_entries"
}

function getTag(collection: Collection) {
  return `${collection}-entries`
}

/** POST /api/admin/entries — Create a new entry */
export async function POST(request: Request) {
  const auth = await verifyAuth(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { collection, data } = body as { collection: string; data: Record<string, any> }

    if (!collection || !VALID_COLLECTIONS.has(collection)) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
    }

    const col = collection as Collection
    const sanitized = sanitizePayload(col, data)
    const validationError = validateEnums(col, sanitized)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    if (!sanitized.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data: result, error } = await supabase
      .from(getTable(col))
      .insert(sanitized as any)
      .select("*")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    await revalidateTag(getTag(col), "max")

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Create failed" }, { status: 500 })
  }
}

/** PUT /api/admin/entries — Update an entry */
export async function PUT(request: Request) {
  const auth = await verifyAuth(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { collection, id, data } = body as { collection: string; id: string; data: Record<string, any> }

    if (!collection || !VALID_COLLECTIONS.has(collection)) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 })
    }

    /* UUID format check */
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 })
    }

    const col = collection as Collection
    const sanitized = sanitizePayload(col, data)
    const validationError = validateEnums(col, sanitized)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data: result, error } = await (supabase
      .from(getTable(col)) as any)
      .update(sanitized)
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    await revalidateTag(getTag(col), "max")

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Update failed" }, { status: 500 })
  }
}

/** DELETE /api/admin/entries — Delete an entry */
export async function DELETE(request: Request) {
  const auth = await verifyAuth(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { collection, id } = body as { collection: string; id: string }

    if (!collection || !VALID_COLLECTIONS.has(collection)) {
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 })
    }

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 })
    }

    const col = collection as Collection
    const supabase = createServerClient()
    const { error } = await supabase
      .from(getTable(col))
      .delete()
      .eq("id", id as any)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    await revalidateTag(getTag(col), "max")

    return NextResponse.json({ deleted: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Delete failed" }, { status: 500 })
  }
}

/* Block all other HTTP methods */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PATCH() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
