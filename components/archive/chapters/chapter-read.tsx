"use client"

import { useMemo, useState } from "react"
import { readEntries, type ReadKind, type ReadStatus } from "@/data/read"

const KINDS: { id: ReadKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "manga", label: "Manga" },
  { id: "manhwa", label: "Manhwa" },
  { id: "book", label: "Books" },
]

const STATUS_ORDER: ReadStatus[] = ["reading", "finished", "queued"]
const STATUS_LABEL: Record<ReadStatus, string> = {
  reading: "Currently",
  finished: "Finished",
  queued: "Queued",
  dropped: "Dropped",
}

export function ChapterRead() {
  const [kind, setKind] = useState<ReadKind | "all">("all")

  const filtered = useMemo(
    () => readEntries.filter((e) => (kind === "all" ? true : e.kind === kind)),
    [kind]
  )

  const byStatus = useMemo(() => {
    const groups: Record<ReadStatus, typeof readEntries> = {
      reading: [],
      finished: [],
      queued: [],
      dropped: [],
    }
    filtered.forEach((e) => groups[e.status].push(e))
    return groups
  }, [filtered])

  return (
    <div className="relative min-h-full">
      <span className="kana-stamp" style={{ top: "-4rem", right: "-4rem" }}>読</span>

      <div className="relative z-10 px-10 lg:px-14 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-px bg-[var(--color-amber)]" />
          <span className="eyebrow !text-[var(--color-amber)]">03 · 読了 · Read</span>
        </div>
        <h1 className="font-display text-bone text-[2.75rem] lg:text-[3.5rem] leading-[0.95] mb-3">
          What I&apos;ve been&nbsp;
          <span className="text-[var(--color-amber)]">reading.</span>
        </h1>
        <p className="dropcap dropcap-amber font-sans text-bone-dim text-[13px] leading-relaxed max-w-xl">
          Mostly manga and manhwa. A running shelf. Most entries are honest reads, not skims —
          if I dropped it after a chapter, it&apos;s not here.
        </p>

        <div className="mt-8 flex items-center gap-1 border-b border-[var(--color-line)]">
          {KINDS.map((k) => (
            <button
              key={k.id}
              onClick={() => setKind(k.id)}
              className={`group relative px-4 py-3 font-mono-tight text-[10px] uppercase tracking-[0.25em] transition-colors ${
                kind === k.id ? "text-bone" : "text-bone-mute hover:text-bone"
              }`}
            >
              {k.label}
              {kind === k.id && (
                <span className="absolute left-2 right-2 -bottom-px h-[1px] bg-[var(--color-amber)]" />
              )}
            </button>
          ))}
          <span className="ml-auto eyebrow pr-2">{filtered.length} entries</span>
        </div>
      </div>

      <div className="relative z-10 px-10 lg:px-14 pb-12 space-y-12">
        {STATUS_ORDER.map((st) => {
          const items = byStatus[st]
          if (!items || items.length === 0) return null
          return (
            <section key={st}>
              <div className="flex items-baseline gap-3 mb-5">
                <h2 className="font-display italic text-bone text-2xl leading-none">{STATUS_LABEL[st]}</h2>
                <span className="eyebrow">{items.length}</span>
                <span className="flex-1 h-px hairline self-center" />
              </div>
              <ul>
                {items.map((e, i) => (
                  <li
                    key={e.id}
                    className="group border-t border-[var(--color-line)] py-5 grid grid-cols-[2.5rem_minmax(0,1fr)_auto] md:grid-cols-[3rem_minmax(0,2fr)_minmax(0,3fr)_auto] gap-4 items-baseline"
                  >
                    <span className="font-mono-tight text-[10px] tabular-nums text-bone-mute pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-display italic text-bone text-xl leading-tight group-hover:text-[var(--color-amber)] transition-colors">
                        {e.title}
                      </div>
                      <div className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute mt-1">
                        {e.jpTitle ? `${e.jpTitle} · ` : ""}{e.year ? `${e.year} · ` : ""}{e.kind}
                        {e.chapters ? ` · ${e.chapters} ch` : ""}
                      </div>
                    </div>
                    <p className="hidden md:block font-sans text-[12px] text-bone-dim leading-relaxed">
                      {e.note}
                    </p>
                    <div className="text-right">
                      {typeof e.rating === "number" ? (
                        <Rating value={e.rating} />
                      ) : (
                        <span className="eyebrow">—</span>
                      )}
                      {e.finishedOn && <div className="eyebrow mt-1">{e.finishedOn}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        <div className="pt-8 flex items-center gap-6">
          <span className="flex-1 h-px hairline" />
          <span className="font-display italic text-bone-mute text-xl leading-none">— 終 —</span>
          <span className="flex-1 h-px hairline" />
        </div>
      </div>
    </div>
  )
}

function Rating({ value }: { value: number }) {
  return (
    <div className="inline-flex items-baseline gap-1">
      <span className="font-display italic text-bone text-2xl leading-none tabular-nums">{value.toFixed(1)}</span>
      <span className="font-mono-tight text-[9px] uppercase tracking-widest text-bone-mute">/10</span>
    </div>
  )
}
