export type PlayStatus = "playing" | "finished" | "dropped" | "queued" | "endless"
export type PlayKind = "single" | "live"

export interface PlayEntry {
  id: string
  title: string
  kind: PlayKind
  year?: number
  status: PlayStatus
  rating?: number
  hours?: number
  cover?: string
  note?: string
  finishedOn?: string
  favorite?: boolean
  tags?: string[]
}

export const playEntries: PlayEntry[] = [
  /* ── Currently playing ─────────────────────────────── */
  {
    id: "warzone",
    title: "Call of Duty: Warzone",
    kind: "live",
    year: 2020,
    status: "playing",
    tags: ["fps", "live-service"],
  },

  /* ── Favourites (finished) ─────────────────────────── */
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    kind: "single",
    year: 2020,
    status: "finished",
    favorite: true,
    note: "All-time. Phantom Liberty doubled it.",
    tags: ["rpg", "openworld"],
  },
  {
    id: "re-franchise",
    title: "Resident Evil — the franchise",
    kind: "single",
    status: "finished",
    favorite: true,
    note: "From the originals through Village. Forever yes.",
    tags: ["horror"],
  },
  {
    id: "tlou1",
    title: "The Last of Us · Part 1",
    kind: "single",
    year: 2013,
    status: "finished",
  },
  {
    id: "twd-game",
    title: "The Walking Dead (Telltale)",
    kind: "single",
    year: 2012,
    status: "finished",
  },

  /* ── Live / endless ────────────────────────────────── */
  {
    id: "genshin",
    title: "Genshin Impact",
    kind: "live",
    year: 2020,
    status: "endless",
    tags: ["gacha", "openworld"],
  },
  {
    id: "aov",
    title: "Arena of Valor",
    kind: "live",
    year: 2016,
    status: "endless",
    tags: ["moba"],
  },
  {
    id: "wuwa",
    title: "Wuthering Waves",
    kind: "live",
    year: 2024,
    status: "endless",
    tags: ["gacha", "action"],
  },
  {
    id: "nte",
    title: "Neverness to Everness",
    kind: "live",
    year: 2025,
    status: "endless",
    tags: ["gacha"],
  },
  {
    id: "phasmo",
    title: "Phasmophobia",
    kind: "live",
    year: 2020,
    status: "endless",
    tags: ["horror", "co-op"],
  },
  {
    id: "repo",
    title: "R.E.P.O.",
    kind: "live",
    year: 2025,
    status: "endless",
    tags: ["horror", "co-op"],
  },

  /* ── Classics / older ──────────────────────────────── */
  {
    id: "cnc-zero-hour",
    title: "Command & Conquer: Generals — Zero Hour",
    kind: "single",
    year: 2003,
    status: "finished",
    tags: ["rts"],
  },
  {
    id: "empire-earth",
    title: "Empire Earth",
    kind: "single",
    year: 2001,
    status: "finished",
    tags: ["rts"],
  },
  {
    id: "aoe3",
    title: "Age of Empires III",
    kind: "single",
    year: 2005,
    status: "finished",
    tags: ["rts"],
  },
  {
    id: "dragon-raja",
    title: "Dragon Raja",
    kind: "live",
    year: 2019,
    status: "playing",
    tags: ["mmo"],
  },
]
