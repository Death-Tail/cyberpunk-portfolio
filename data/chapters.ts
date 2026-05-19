export type ChapterId = "home" | "works" | "watch" | "read" | "play" | "notes" | "contact"

export interface Chapter {
  id: ChapterId
  index: string
  title: string
  kana: string
  caption: string
  status: string
  hint: string
}

export const chapters: Chapter[] = [
  {
    id: "home",
    index: "00",
    title: "Intro",
    kana: "序",
    caption: "The opening",
    status: "TURN THE PAGE",
    hint: "begin here",
  },
  {
    id: "works",
    index: "01",
    title: "Works",
    kana: "作品",
    caption: "Shipped & in development",
    status: "5 SHIPPED · 1 IN DEV",
    hint: "things i built",
  },
  {
    id: "watch",
    index: "02",
    title: "Watch",
    kana: "観た",
    caption: "Anime, film, series",
    status: "37 ENTRIES · 1 CURRENT",
    hint: "things i watched",
  },
  {
    id: "read",
    index: "03",
    title: "Read",
    kana: "読了",
    caption: "Manga, manhwa, books",
    status: "4 ENTRIES · 1 READING",
    hint: "things i read",
  },
  {
    id: "play",
    index: "04",
    title: "Play",
    kana: "遊",
    caption: "Games played, finished",
    status: "15 ENTRIES · 1 PLAYING",
    hint: "things i played",
  },
  {
    id: "notes",
    index: "05",
    title: "Notes",
    kana: "日記",
    caption: "Field notes, fragments",
    status: "ARCHIVE PENDING",
    hint: "things i wrote",
  },
  {
    id: "contact",
    index: "06",
    title: "Contact",
    kana: "連絡",
    caption: "Channels",
    status: "OPEN",
    hint: "reach me",
  },
]
