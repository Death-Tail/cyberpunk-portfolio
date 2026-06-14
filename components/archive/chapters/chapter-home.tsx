"use client"

import { ArrowRight } from "lucide-react"
import type { ChapterId } from "@/data/chapters"

export function ChapterHome({ onNavigate }: { onNavigate: (id: ChapterId) => void }) {
  return (
    <div className="relative min-h-full overflow-hidden lamplight">
      {/* Cinematic backdrop — quieter, more "indigo cloth binding" than dusk window */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />
        {/* Ink wash — heavy left, fading to a sliver of image on the right */}
        <div className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/75 to-ink/45" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
        {/* A single cinnabar bloom — replaces the warm/cool double haze */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_38%_at_88%_18%,rgba(200,72,58,0.10),transparent_65%)]" />
      </div>

      {/* Big decorative kana */}
      <span
        className="kana-stamp z-0 select-none"
        style={{ bottom: "-6rem", right: "-4rem", color: "var(--color-ember)" }}
      >
        序
      </span>

      {/* Content */}
      <div className="relative z-10 min-h-full grid grid-rows-[1fr_auto] px-5 sm:px-8 md:px-12 lg:px-20">
        {/* Hero block */}
        <div className="flex flex-col justify-center max-w-2xl pt-8 sm:pt-10 pb-6">
          <div className="flex items-center gap-3 mb-5 lamp-pulse">
            <span className="w-10 h-px bg-ember" />
            <span className="eyebrow text-ember!">00 · 序 · Introduction</span>
          </div>

          <p className="font-display italic text-amber text-xl lg:text-2xl mb-2 leading-tight">
            Late light. Working alone.
          </p>

          <h1 className="font-display text-bone text-[2.75rem] sm:text-[3.5rem] lg:text-[5.25rem] leading-[0.92] mb-4">
            Dyari Ali<br />
            <span className="text-bone-dim">Tahir<span className="text-ember">.</span></span>
          </h1>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone">
              SHIN<span className="text-ember">尾</span>
            </span>
            <span className="text-bone-mute/40">·</span>
            <span className="font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-dim">
              Full-Stack Developer
            </span>
            <span className="text-bone-mute/40">·</span>
            <span className="font-mono-tight text-[11px] uppercase tracking-[0.3em] text-teal">
              Hawler · KRG
            </span>
          </div>

          <p className="font-display italic text-bone text-[1.1rem] lg:text-[1.25rem] leading-[1.45] mb-5 max-w-xl">
            By day, I engineer data for{" "}
            <a
              href="https://kanidata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember underline decoration-line-ember underline-offset-[6px] decoration-1 hover:decoration-ember transition-colors"
            >
              Kani Data
            </a>
            . By night, I build for the web.
          </p>

          <p className="font-sans text-bone-dim text-[14px] leading-[1.7] max-w-lg mb-6">
            A quiet record of both — works I&apos;ve shipped and the films, books, games
            I&apos;ve been moved by. Some for clients. Most just for me.
          </p>

          <div className="font-mono-tight text-[11px] uppercase tracking-[0.25em] text-bone-mute mb-6 max-w-lg leading-relaxed">
            Not seeking another contract role.
            <br />
            Open to web projects that share this register — quiet, considered, made well.
          </div>

          {/* Calls */}
          <div className="flex items-center gap-x-6 gap-y-3 flex-wrap">
            <button
              onClick={() => onNavigate("works")}
              className="group inline-flex items-center gap-3 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone hover:text-amber transition-colors"
            >
              <span className="relative pb-1">
                See the works
                <span className="absolute left-0 bottom-0 h-px w-full bg-amber" />
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="group inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-mute hover:text-ember transition-colors"
            >
              <span>Pitch a project</span>
            </button>
            <button
              onClick={() => onNavigate("watch")}
              className="group inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.3em] text-bone-mute/70 hover:text-teal transition-colors"
            >
              <span>Or what I&apos;ve been watching</span>
            </button>
          </div>
        </div>

        {/* Quiet contents row */}
        <div className="pb-10">
          <div className="flex items-end justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-teal" />
              <span className="eyebrow">Contents</span>
            </div>
            <span className="eyebrow text-bone-mute/40!">07 chapters · always under construction</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-line">
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
                    ? "text-ember"
                    : c.tone === "teal"
                      ? "text-teal"
                      : "text-amber"
                return (
                  <button
                    key={c.id}
                    onClick={() => onNavigate(c.id)}
                    className="group relative bg-ink/75 hover:bg-ink-2 backdrop-blur-sm px-4 py-4 text-left transition-colors"
                  >
                    <span className={`absolute top-0 left-0 h-px w-0 group-hover:w-full ${toneClass.replace("text-", "bg-")} transition-all duration-500`} />
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono-tight text-[10px] tabular-nums text-bone-mute">{c.num}</span>
                      <span className={`font-display italic ${toneClass} opacity-50 group-hover:opacity-100 transition-opacity text-base leading-none`}>
                        {c.kana}
                      </span>
                    </div>
                    <div className="font-display italic text-bone text-lg leading-tight group-hover:text-amber transition-colors">
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
