import { projects } from "@/components/projects-data"
import type { ChapterId } from "@/data/chapters"
import type { WatchRow, ReadRow, PlayRow } from "@/lib/supabase/types"

export interface ChapterCounts {
  total: number
  current: number
  finished: number
  inDev?: number
}

/** Get counts from Supabase row arrays (called from components that have the data) */
export function getWatchCounts(entries: WatchRow[]): ChapterCounts {
  return {
    total: entries.length,
    current: entries.filter((e) => e.status === "watching").length,
    finished: entries.filter((e) => e.status === "finished").length,
  }
}

export function getReadCounts(entries: ReadRow[]): ChapterCounts {
  return {
    total: entries.length,
    current: entries.filter((e) => e.status === "reading").length,
    finished: entries.filter((e) => e.status === "finished").length,
  }
}

export function getPlayCounts(entries: PlayRow[]): ChapterCounts {
  return {
    total: entries.length,
    current: entries.filter((e) => e.status === "playing").length,
    finished: entries.filter((e) => e.status === "finished").length,
  }
}

/* ── Legacy static counts (still used by archive-shell spine + status bar) ── */

/* These use the static data files as a fast sync fallback.
   The archive-shell doesn't have access to the hooks directly
   since it renders the spine before the chapter mounts. */
import { watchEntries } from "@/data/watch"
import { readEntries } from "@/data/read"
import { playEntries } from "@/data/play"

function statusOf(entry: any): string {
  return (entry?.status ?? "").toLowerCase()
}

export function getCounts(id: ChapterId): ChapterCounts | null {
  if (id === "works") {
    const total = projects.length
    const inDev = projects.filter((p: any) => statusOf(p) !== "deployed").length
    const finished = total - inDev
    return { total, current: inDev, finished, inDev }
  }
  if (id === "watch") {
    const total = watchEntries.length
    const current = watchEntries.filter((e) => e.status === "watching").length
    const finished = watchEntries.filter((e) => e.status === "finished").length
    return { total, current, finished }
  }
  if (id === "read") {
    const total = readEntries.length
    const current = readEntries.filter((e) => e.status === "reading").length
    const finished = readEntries.filter((e) => e.status === "finished").length
    return { total, current, finished }
  }
  if (id === "play") {
    const total = playEntries.length
    const current = playEntries.filter((e) => e.status === "playing").length
    const finished = playEntries.filter((e) => e.status === "finished").length
    return { total, current, finished }
  }
  return null
}

/** A short status line for the bottom strip, derived from data. */
export function statusLine(id: ChapterId): string {
  const c = getCounts(id)
  if (!c) {
    if (id === "home") return "TURN THE PAGE"
    if (id === "contact") return "OPEN · WEB ONLY"
    if (id === "notes") return "ARCHIVE PENDING"
    return ""
  }
  if (id === "works") {
    return `${c.finished} SHIPPED · ${c.inDev ?? 0} IN DEV`
  }
  const verbMap: Partial<Record<ChapterId, string>> = {
    watch: "WATCHING",
    read: "READING",
    play: "PLAYING",
  }
  const verb = verbMap[id] ?? "CURRENT"
  return `${c.total} ENTRIES · ${c.current} ${verb}`
}
