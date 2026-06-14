import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"

/* ── Auth helper (same as admin entries route) ── */
async function verifyAuth(req: Request) {
  const auth = req.headers.get("authorization") ?? ""
  const token = auth.replace(/^Bearer\s+/i, "").trim()
  if (!token || token.split(".").length !== 3) return false

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL)!
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY)!
  const supabase = createClient<Database>(url, key)
  const { data: { user }, error } = await supabase.auth.getUser(token)
  return !error && !!user
}

/* ── GET: fetch all tracker items ── */
export async function GET(req: Request) {
  if (!await verifyAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from("tracker_items" as any)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/* ── POST: create item ── */
export async function POST(req: Request) {
  if (!await verifyAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { section, name, cat, price, note, date, priority, status, sort_order } = body

  if (!section || !name || !cat) return NextResponse.json({ error: "Missing required fields" }, { status: 400 })

  const supabase = createServerClient()
  const { data, error } = await (supabase.from("tracker_items" as any) as any)
    .insert({ section, name, cat, price: price ?? 0, note: note ?? "", date: date ?? null, priority: priority ?? null, status: status ?? null, sort_order: sort_order ?? 0 })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/* ── PUT: update item ── */
export async function PUT(req: Request) {
  if (!await verifyAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { id, ...fields } = body
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const supabase = createServerClient()
  const { data, error } = await (supabase.from("tracker_items" as any) as any)
    .update(fields)
    .eq("id", id)
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/* ── DELETE: remove item ── */
export async function DELETE(req: Request) {
  if (!await verifyAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const supabase = createServerClient()
  const { error } = await (supabase.from("tracker_items" as any) as any).delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ deleted: true })
}
