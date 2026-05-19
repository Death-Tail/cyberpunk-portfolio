export type ReadStatus = "reading" | "finished" | "dropped" | "queued"
export type ReadKind = "manga" | "manhwa" | "manhua" | "book" | "essay"

export interface ReadEntry {
  id: string
  title: string
  jpTitle?: string
  kind: ReadKind
  year?: number
  status: ReadStatus
  rating?: number
  chapters?: number
  cover?: string
  note?: string
  finishedOn?: string
  tags?: string[]
}

export const readEntries: ReadEntry[] = [
  /* ── Currently reading ────────────────────────────── */
  {
    id: "dorohedoro",
    title: "Dorohedoro",
    jpTitle: "ドロヘドロ",
    kind: "manga",
    year: 2000,
    status: "reading",
    note: "Q Hayashida's filthy, generous world.",
  },

  /* ── Finished ─────────────────────────────────────── */
  {
    id: "solo-leveling-mh",
    title: "Solo Leveling",
    kind: "manhwa",
    year: 2018,
    status: "finished",
    chapters: 200,
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    jpTitle: "チェンソーマン",
    kind: "manga",
    year: 2018,
    status: "finished",
    note: "Fujimoto. Part 1 was a knife.",
  },
  {
    id: "gf-mobster",
    title: "My Girlfriend Is a Mobster",
    kind: "manhwa",
    status: "finished",
  },
]
