/* ── Supabase DB row types ────────────────────────────────── */

export type WatchStatus = "watching" | "finished" | "dropped" | "queued"
export type WatchKind = "anime" | "film" | "series"

export type ReadStatus = "reading" | "finished" | "dropped" | "queued"
export type ReadKind = "manga" | "manhwa" | "manhua" | "book" | "essay"

export type PlayStatus = "playing" | "finished" | "dropped" | "queued" | "endless"
export type PlayKind = "single" | "live"

export interface WatchRow {
  id: string
  title: string
  jp_title: string | null
  kind: WatchKind
  year: number
  status: WatchStatus
  rating: number | null
  episodes: number | null
  cover: string | null
  note: string | null
  finished_on: string | null
  tags: string[]
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ReadRow {
  id: string
  title: string
  jp_title: string | null
  kind: ReadKind
  year: number | null
  status: ReadStatus
  rating: number | null
  chapters: number | null
  cover: string | null
  note: string | null
  finished_on: string | null
  tags: string[]
  sort_order: number
  created_at: string
  updated_at: string
}

export interface PlayRow {
  id: string
  title: string
  kind: PlayKind
  year: number | null
  status: PlayStatus
  rating: number | null
  hours: number | null
  cover: string | null
  note: string | null
  finished_on: string | null
  favorite: boolean
  tags: string[]
  sort_order: number
  created_at: string
  updated_at: string
}

/* Supabase generated-style Database type for typed client */
export interface Database {
  public: {
    Tables: {
      watch_entries: {
        Row: WatchRow
        Insert: Omit<WatchRow, "id" | "created_at" | "updated_at"> & { id?: string }
        Update: Partial<Omit<WatchRow, "id" | "created_at" | "updated_at">>
      }
      read_entries: {
        Row: ReadRow
        Insert: Omit<ReadRow, "id" | "created_at" | "updated_at"> & { id?: string }
        Update: Partial<Omit<ReadRow, "id" | "created_at" | "updated_at">>
      }
      play_entries: {
        Row: PlayRow
        Insert: Omit<PlayRow, "id" | "created_at" | "updated_at"> & { id?: string }
        Update: Partial<Omit<PlayRow, "id" | "created_at" | "updated_at">>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
