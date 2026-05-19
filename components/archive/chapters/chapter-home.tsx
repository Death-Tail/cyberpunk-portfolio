"use client"

import { ArrowRight } from "lucide-react"
import type { ChapterId } from "@/data/chapters"

export function ChapterHome({ onNavigate }: { onNavigate: (id: ChapterId) => void }) {
  return (
    <div className="relative h-full overflow-hidden lamplight">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />
        {/* Warm dusk overlays — keep enough image visible to feel like a window */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/65 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        {/* Warm haze in upper-right (sunset feel) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_15%,rgba(217,119,87,0.18),transparent_60%)]" />
        {/* Cool haze opposite (window vs lamp) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_10%_90%,rgba(106,144,152,0.12),transparent_70%)]" />
      </div>

      {/* Big decorative kana */}
      <span
        className="kana-stamp z-0 select-none"
        style={{ bottom: "-6rem", right: "-4rem", color: "var(--color-ember)" }}
      >
        序
      </span>

      {/* Content */}
      <div className="relative z-10 h-full grid grid-rows-[1fr_auto] px-12 lg:px-20">
        {/* Hero block */}
        <div className="flex flex-col justify-center max-w-2xl pt-16">
          <div className="flex items-center gap-3 mb-8 lamp-pulse">
            <span className="w-10 h-px bg-[var(--color-ember)]" />
            <span className="eyebrow !text-[var(--color-ember)]">00 · 序 · Introduction</span>
          </div>

          <p className="font-display italic text-[var(--color-amber)] text-2xl lg:text-3xl mb-3 leading-tight">
            Late light. Working alone.
          </p>

          <h1 className="font-display text-bone text-[4.5rem] lg:text-[6.5rem] leading-[0.92] mb-6">
            Dyari Ali<br />
            <span className="text-[var(--color-bone-dim)]">Tahir<span className="text-[var(--color-ember)]">.</span></span>
          </h1>

          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone">
              SHIN<span className="text-[var(--color-ember)]">尾</span>
            </span>
            <span className="text-bone-mute/40">·</span>
            <span className="font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-dim">
              Full-Stack Developer
            </span>
            <span className="text-bone-mute/40">·</span>
            <span className="font-mono-tight text-[11px] uppercase tracking-[0.3em] text-[var(--color-teal)]">
              Hawler · KRG
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 mb-8 self-start px-3 py-1.5 tag-teal">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)] lamp-pulse" />
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.25em]">
              Currently · Data Engineer Consultant at&nbsp;
              <a
                href="https://kanidata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-amber)] hover:text-bone transition-colors"
              >
                Kani Data
              </a>
            </span>
          </div>

          <p className="font-sans text-bone-dim text-[15px] leading-[1.75] max-w-lg mb-10">
            I build things on the web, and I keep a quiet record of what I make and what
            I&apos;m moved by. This is that record — works, films, books, the rest.
            Some of it is for clients. Most of it is just for me.
          </p>

          <div className="font-mono-tight text-[11px] uppercase tracking-[0.25em] text-bone-mute mb-10 max-w-lg leading-relaxed">
            Not looking for a contract role.
            <br />
            Open to web projects that share this register — quiet, considered, made well.
          </div>

          {/* Calls */}
          <div className="flex items-center gap-8 flex-wrap">
            <button
              onClick={() => onNavigate("works")}
              className="group inline-flex items-center gap-3 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone hover:text-[var(--color-amber)] transition-colors"
            >
              <span className="relative pb-1">
                See the works
                <span className="absolute left-0 -bottom-0 h-px w-full bg-[var(--color-amber)]" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="group inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-mute hover:text-[var(--color-ember)] transition-colors"
            >
              <span>Pitch a project</span>
            </button>
            <button
              onClick={() => onNavigate("watch")}
              className="group inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-mute/70 hover:text-[var(--color-teal)] transition-colors"
            >
              <span>Or what I&apos;ve been watching</span>
            </button>
          </div>
        </div>

        {/* Quiet contents row */}
        <div className="pb-12">
          <div className="flex items-end justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[var(--color-teal)]" />
              <span className="eyebrow">Contents</span>
            </div>
            <span className="eyebrow !text-bone-mute/40">07 chapters · always under construction</span>
          </div>
          <div className="grid grid-cols-6 gap-px bg-[var(--color-line)]">
            {([
              { id: "works", num: "01", title: "Works", kana: "作品", tone: "ember" },
              { id: "watch", num: "02", title: "Watch", kana: "観た", tone: "teal" },
              { id: "read", num: "03", title: "Read", kana: "読了", tone: "amber" },
              { id: "play", num: "04", title: "Play", kana: "遊", tone: "ember" },
              { id: "notes", num: "05", title: "Notes", kana: "日記", tone: "teal" },
              { id: "contact", num: "06", title: "Contact", kana: "連絡", tone: "amber" },
            ] as { id: ChapterId; num: string; title: string; kana: string; tone: "ember" | "teal" | "amber" }[]).map(
              (c) => {
                const toneClass =
                  c.tone === "ember"
                    ? "text-[var(--color-ember)]"
                    : c.tone === "teal"
                      ? "text-[var(--color-teal)]"
                      : "text-[var(--color-amber)]"
                return (
                  <button
                    key={c.id}
                    onClick={() => onNavigate(c.id)}
                    className="group relative bg-ink/75 hover:bg-[var(--color-ink-2)] backdrop-blur-sm px-5 py-5 text-left transition-colors"
                  >
                    <span className={`absolute top-0 left-0 h-px w-0 group-hover:w-full ${toneClass.replace("text-", "bg-")} transition-all duration-500`} />
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-mono-tight text-[10px] tabular-nums text-bone-mute">{c.num}</span>
                      <span className={`font-display italic ${toneClass} opacity-50 group-hover:opacity-100 transition-opacity text-lg leading-none`}>
                        {c.kana}
                      </span>
                    </div>
                    <div className="font-display italic text-bone text-xl leading-tight group-hover:text-[var(--color-amber)] transition-colors">
                      {c.title}
                    </div>
                  </button>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
