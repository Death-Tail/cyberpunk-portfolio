"use client"

import { useEffect, useState } from "react"
import { getWatchEntries, getReadEntries, getPlayEntries } from "@/lib/supabase/queries"
import type { WatchRow, ReadRow, PlayRow } from "@/lib/supabase/types"

/* Fallback static imports — used when API hasn't responded yet */
import { watchEntries as staticWatch } from "@/data/watch"
import { readEntries as staticRead } from "@/data/read"
import { playEntries as staticPlay } from "@/data/play"

/** Convert static watch entries to WatchRow shape for fallback */
function staticWatchToRows(): WatchRow[] {
  return staticWatch.map((e, i) => ({
    id: e.id,
    title: e.title,
    jp_title: e.jpTitle ?? null,
    kind: e.kind,
    year: e.year,
    status: e.status,
    rating: e.rating ?? null,
    episodes: e.episodes ?? null,
    cover: e.cover ?? null,
    note: e.note ?? null,
    finished_on: e.finishedOn ?? null,
    tags: e.tags ?? [],
    sort_order: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}

function staticReadToRows(): ReadRow[] {
  return staticRead.map((e, i) => ({
    id: e.id,
    title: e.title,
    jp_title: e.jpTitle ?? null,
    kind: e.kind,
    year: e.year ?? null,
    status: e.status,
    rating: e.rating ?? null,
    chapters: e.chapters ?? null,
    cover: e.cover ?? null,
    note: e.note ?? null,
    finished_on: e.finishedOn ?? null,
    tags: e.tags ?? [],
    sort_order: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}

function staticPlayToRows(): PlayRow[] {
  return staticPlay.map((e, i) => ({
    id: e.id,
    title: e.title,
    kind: e.kind,
    year: e.year ?? null,
    status: e.status,
    rating: e.rating ?? null,
    hours: e.hours ?? null,
    cover: e.cover ?? null,
    note: e.note ?? null,
    finished_on: e.finishedOn ?? null,
    favorite: e.favorite ?? false,
    tags: e.tags ?? [],
    sort_order: i,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}

export function useWatchEntries() {
  const [entries, setEntries] = useState<WatchRow[]>(staticWatchToRows())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWatchEntries().then((data) => {
      if (data.length > 0) setEntries(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return {
    entries,
    loading,
    refetch: () => getWatchEntries().then((d) => { if (d.length > 0) setEntries(d) }),
  }
}

export function useReadEntries() {
  const [entries, setEntries] = useState<ReadRow[]>(staticReadToRows())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReadEntries().then((data) => {
      if (data.length > 0) setEntries(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return {
    entries,
    loading,
    refetch: () => getReadEntries().then((d) => { if (d.length > 0) setEntries(d) }),
  }
}

export function usePlayEntries() {
  const [entries, setEntries] = useState<PlayRow[]>(staticPlayToRows())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlayEntries().then((data) => {
      if (data.length > 0) setEntries(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return {
    entries,
    loading,
    refetch: () => getPlayEntries().then((d) => { if (d.length > 0) setEntries(d) }),
  }
}
