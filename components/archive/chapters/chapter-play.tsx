"use client"

import { useMemo, useState } from "react"
import { playEntries, type PlayKind, type PlayStatus } from "@/data/play"

const KINDS: { id: PlayKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "single", label: "Single-player" },
  { id: "live", label: "Live / endless" },
]

const STATUS_ORDER: PlayStatus[] = ["playing", "finished", "endless", "queued", "dropped"]
const STATUS_LABEL: Record<PlayStatus, string> = {
  playing: "Currently",
  finished: "Finished",
  endless: "Endless",
  queued: "Queued",
  dropped: "Dropped",
}

export function ChapterPlay() {
  const [kind, setKind] = useState<PlayKind | "all">("all")

  const filtered = useMemo(
    () => playEntries.filter((e) => (kind === "all" ? true : e.kind === kind)),
    [kind]
  )

  const byStatus = useMemo(() => {
    const groups: Record<PlayStatus, typeof playEntries> = {
      playing: [],
      finished: [],
      endless: [],
      queued: [],
      dropped: [],
    }
    filtered.forEach((e) => groups[e.status].push(e))
    return groups
  }, [filtered])

  return (
    <div className="relative min-h-full">
      <span className="kana-stamp" style={{ top: "-4rem", right: "-4rem", color: "var(--color-teal)" }}>遊</span>

      <div className="relative z-10 px-10 lg:px-14 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-px bg-[var(--color-teal)]" />
          <span className="eyebrow !text-[var(--color-teal)]">04 · 遊 · Play</span>
        </div>
        <h1 className="font-display text-bone text-[2.75rem] lg:text-[3.5rem] leading-[0.95] mb-3">
          What I&apos;ve been&nbsp;
          <span className="text-[var(--color-teal)]">playing.</span>
        </h1>
        <p className="dropcap dropcap-teal font-sans text-bone-dim text-[13px] leading-relaxed max-w-xl">
          Single-player works I&apos;ve actually finished, plus the live / endless games I keep returning to.
          Favourites are marked.
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
                <span className="absolute left-2 right-2 -bottom-px h-[1px] bg-[var(--color-teal)]" />
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
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-display italic text-bone text-xl leading-tight group-hover:text-[var(--color-teal)] transition-colors">
                          {e.title}
                        </span>
                        {e.favorite && (
                          <span className="font-mono-tight text-[9px] uppercase tracking-[0.25em] tag-amber px-1.5 py-0.5">
                            FAV
                          </span>
                        )}
                      </div>
                      <div className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute mt-1">
                        {e.year ? `${e.year} · ` : ""}{e.kind === "live" ? "live / service" : "single-player"}
                        {Array.isArray(e.tags) && e.tags.length > 0 ? ` · ${e.tags.join(" · ")}` : ""}
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
