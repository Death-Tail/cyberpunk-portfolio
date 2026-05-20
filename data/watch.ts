export type WatchStatus = "watching" | "finished" | "dropped" | "queued"
export type WatchKind = "anime" | "film" | "series"

export interface WatchEntry {
  id: string
  title: string
  jpTitle?: string
  kind: WatchKind
  year: number
  status: WatchStatus
  rating?: number /* 0–10 */
  episodes?: number
  cover?: string
  note?: string
  finishedOn?: string
  tags?: string[]
}

export const watchEntries: WatchEntry[] = [
  /* ── Currently watching ───────────────────────────── */
  {
    id: "scums-wish",
    title: "Scum's Wish",
    jpTitle: "クズの本懐",
    kind: "anime",
    year: 2017,
    status: "watching",
    episodes: 12,
  },

  /* ── Anime · finished ─────────────────────────────── */
  { id: "hxh-2011", title: "Hunter x Hunter", jpTitle: "HUNTER×HUNTER", kind: "anime", year: 2011, status: "finished", episodes: 148 },
  { id: "monster", title: "Monster", jpTitle: "MONSTER", kind: "anime", year: 2004, status: "finished", episodes: 74, note: "Urasawa. Patient, exact, devastating in the third act." },
  { id: "fma-2003", title: "Fullmetal Alchemist", jpTitle: "鋼の錬金術師", kind: "anime", year: 2003, status: "finished", episodes: 51 },
  { id: "fma-brotherhood", title: "Fullmetal Alchemist: Brotherhood", jpTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST", kind: "anime", year: 2009, status: "finished", episodes: 64 },
  { id: "solo-leveling", title: "Solo Leveling", jpTitle: "俺だけレベルアップな件", kind: "anime", year: 2024, status: "finished" },
  { id: "cowboy-bebop", title: "Cowboy Bebop", jpTitle: "カウボーイビバップ", kind: "anime", year: 1998, status: "finished", episodes: 26 },
  { id: "berserk-1997", title: "Berserk", jpTitle: "剣風伝奇ベルセルク", kind: "anime", year: 1997, status: "finished", episodes: 25 },
  { id: "alya-russian", title: "Alya Sometimes Hides Her Feelings in Russian", jpTitle: "ロシデレ", kind: "anime", year: 2024, status: "finished" },
  { id: "eminence-shadow", title: "The Eminence in Shadow", jpTitle: "陰の実力者になりたくて！", kind: "anime", year: 2022, status: "finished" },
  { id: "91-days", title: "91 Days", kind: "anime", year: 2016, status: "finished", episodes: 12 },
  { id: "11eyes", title: "11eyes", kind: "anime", year: 2009, status: "finished", episodes: 12 },
  { id: "moriarty", title: "Moriarty the Patriot", jpTitle: "憂国のモリアーティ", kind: "anime", year: 2020, status: "finished" },
  { id: "banana-fish", title: "Banana Fish", jpTitle: "BANANA FISH", kind: "anime", year: 2018, status: "finished", episodes: 24 },
  { id: "jjk", title: "Jujutsu Kaisen", jpTitle: "呪術廻戦", kind: "anime", year: 2020, status: "finished" },
  { id: "bsd", title: "Bungo Stray Dogs", jpTitle: "文豪ストレイドッグス", kind: "anime", year: 2016, status: "finished" },
  { id: "blame", title: "BLAME!", jpTitle: "ブラム", kind: "film", year: 2017, status: "finished", note: "Tsutomu Nihei. Concrete forever." },
  { id: "tokyo-ghoul", title: "Tokyo Ghoul", jpTitle: "東京喰種", kind: "anime", year: 2014, status: "finished" },
  { id: "akame-ga-kill", title: "Akame ga Kill!", jpTitle: "アカメが斬る！", kind: "anime", year: 2014, status: "finished", episodes: 24 },
  { id: "akuma-no-riddle", title: "Akuma no Riddle", jpTitle: "悪魔のリドル", kind: "anime", year: 2014, status: "finished", episodes: 12 },
  { id: "death-note", title: "Death Note", jpTitle: "デスノート", kind: "anime", year: 2006, status: "finished", episodes: 37 },
  { id: "evangelion", title: "Neon Genesis Evangelion", jpTitle: "新世紀エヴァンゲリオン", kind: "anime", year: 1995, status: "finished", episodes: 26 },
  { id: "parasyte", title: "Parasyte: The Maxim", jpTitle: "寄生獣 セイの格率", kind: "anime", year: 2014, status: "finished", episodes: 24 },
  { id: "guilty-crown", title: "Guilty Crown", jpTitle: "ギルティクラウン", kind: "anime", year: 2011, status: "finished", episodes: 22 },
  { id: "spy-x-family", title: "Spy × Family", jpTitle: "SPY×FAMILY", kind: "anime", year: 2022, status: "finished" },
  { id: "witch-and-beast", title: "The Witch and the Beast", jpTitle: "魔女と野獣", kind: "anime", year: 2024, status: "finished" },
  { id: "dandadan", title: "Dandadan", jpTitle: "ダンダダン", kind: "anime", year: 2024, status: "finished" },

  /* ── Films ───────────────────────────────────────── */
  { id: "koe-no-katachi", title: "A Silent Voice", jpTitle: "聲の形", kind: "film", year: 2016, status: "finished" },
  { id: "kimi-no-na-wa", title: "Your Name", jpTitle: "君の名は。", kind: "film", year: 2016, status: "finished" },
  { id: "ghibli", title: "Studio Ghibli — the whole family", kind: "film", year: 1986, status: "finished", note: "Miyazaki / Takahata. Most of them. Some twice." },
  { id: "dead-poets", title: "Dead Poets Society", kind: "film", year: 1989, status: "finished" },

  /* ── Series ──────────────────────────────────────── */
  { id: "chernobyl", title: "Chernobyl", kind: "series", year: 2019, status: "finished", episodes: 5, note: "HBO. The kitchen scene." },
  { id: "true-detective", title: "True Detective", kind: "series", year: 2014, status: "finished" },
  { id: "dark", title: "Dark", kind: "series", year: 2017, status: "finished", episodes: 26 },
  { id: "from", title: "From", kind: "series", year: 2022, status: "finished" },
  { id: "twd", title: "The Walking Dead", kind: "series", year: 2010, status: "finished" },
  { id: "friends", title: "Friends", kind: "series", year: 1994, status: "finished" },
  { id: "office-us", title: "The Office (US)", kind: "series", year: 2005, status: "finished" },
  { id: "modern-family", title: "Modern Family", kind: "series", year: 2009, status: "finished" },
  { id: "family-guy", title: "Family Guy", kind: "series", year: 1999, status: "finished" },
  { id: "american-dad", title: "American Dad!", kind: "series", year: 2005, status: "finished" },
  { id: "mind-your-language", title: "Mind Your Language", kind: "series", year: 1977, status: "finished" },
  { id: "policias", title: "Policías, en el corazón de la calle", kind: "series", year: 2003, status: "finished", note: "Spanish" },
  { id: "el-internado", title: "El internado", kind: "series", year: 2007, status: "finished", note: "Spanish" },
  { id: "the-boarding-school-las-cumbres", title: "The Boarding School: Las Cumbres", kind: "series", year: 2021, status: "finished", note: "Spanish" },
]
