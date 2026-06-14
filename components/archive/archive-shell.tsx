"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { chapters, type ChapterId } from "@/data/chapters"
import { getCounts, statusLine } from "@/lib/counts"
import { ChapterHome } from "./chapters/chapter-home"
import { ChapterWorks } from "./chapters/chapter-works"
import { ChapterWatch } from "./chapters/chapter-watch"
import { ChapterRead } from "./chapters/chapter-read"
import { ChapterPlay } from "./chapters/chapter-play"
import { ChapterPlaceholder } from "./chapters/chapter-placeholder"
import { ChapterContact } from "./chapters/chapter-contact"

type Direction = "forward" | "back" | "initial"

export function ArchiveShell() {
  const [active, setActive] = useState<ChapterId>("home")
  const [direction, setDirection] = useState<Direction>("initial")
  const [time, setTime] = useState<string>("")
  const [hour, setHour] = useState<number>(new Date().getHours())
  const [progress, setProgress] = useState(0)
  const [navOpen, setNavOpen] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  /* Clock + hour-of-day */
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const pad = (n: number) => String(n).padStart(2, "0")
      setTime(`${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} · ${pad(d.getHours())}:${pad(d.getMinutes())}`)
      setHour(d.getHours())
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  /* Reading thread — track scroll within the stage */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    setProgress(0)
    el.scrollTo({ top: 0 })
    return () => el.removeEventListener("scroll", onScroll)
  }, [active])

  /* Switch chapter with directional intent */
  const navigate = useCallback(
    (id: ChapterId) => {
      const oldIdx = chapters.findIndex((c) => c.id === active)
      const newIdx = chapters.findIndex((c) => c.id === id)
      setNavOpen(false)
      if (newIdx === oldIdx) return
      setDirection(newIdx > oldIdx ? "forward" : "back")
      setActive(id)
    },
    [active]
  )

  /* Close drawer on Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return
      const idx = chapters.findIndex((c) => c.id === active)
      if (e.key === "ArrowRight") {
        const next = chapters[Math.min(chapters.length - 1, idx + 1)]
        if (next) navigate(next.id)
      } else if (e.key === "ArrowLeft") {
        const prev = chapters[Math.max(0, idx - 1)]
        if (prev) navigate(prev.id)
      } else if (e.key === "Home" || e.key === "0") {
        navigate("home")
      } else if (/^[1-6]$/.test(e.key)) {
        const target = chapters[Number(e.key)]
        if (target) navigate(target.id)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, navigate])

  const activeChapter = chapters.find((c) => c.id === active)!
  const status = useMemo(() => statusLine(active), [active])
  const isDay = hour >= 6 && hour < 18

  return (
    <main className="fixed inset-0 bg-ink text-bone overflow-hidden grain">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_120%)]" />

      {/* Ambient firefly — quiet drift */}
      <FireflyAmbient />

      {/* ── Top strip ───────────────────────────────────── */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 lg:px-12 h-14 border-b border-line bg-ink/70 backdrop-blur-sm">
        <div className="flex items-center gap-4 sm:gap-7 min-w-0">
          <Monogram />
          <div className="hidden md:flex items-center gap-3 text-[10px] font-mono-tight text-bone-mute uppercase tracking-[0.2em]">
            <span>SHIN<span className="text-ember">尾</span></span>
            <span className="text-bone-mute/40">/</span>
            <span>ARCHIVE</span>
            <span className="text-bone-mute/40">/</span>
            <span className="text-bone">{activeChapter.index}</span>
            <span className="text-bone-mute/40">·</span>
            <span className="font-display italic text-amber text-sm normal-case tracking-normal">
              {activeChapter.title}
            </span>
          </div>
          {/* Mobile-only chapter chip — replaces the breadcrumb at small widths */}
          <div className="md:hidden flex items-baseline gap-2 min-w-0">
            <span className="font-mono-tight text-[10px] tabular-nums text-ember">
              {activeChapter.index}
            </span>
            <span className="font-display italic text-amber text-sm leading-none truncate">
              {activeChapter.title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-5 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute">
          <DayGlyph isDay={isDay} />
          <span className="hidden sm:inline">{time}</span>
          <span className="hidden md:inline text-bone-mute/40">·</span>
          <span className="hidden md:inline text-teal">HAWLER · KRG</span>
          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={navOpen ? "Close index" : "Open index"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
            className="md:hidden ml-1 w-9 h-9 -mr-1 flex flex-col items-center justify-center gap-1.25 border border-line-strong hover:border-line-ember transition-colors"
          >
            <span
              className={`block w-4 h-px bg-bone transition-transform duration-200 ${
                navOpen ? "translate-y-0.75 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-4 h-px bg-bone transition-transform duration-200 ${
                navOpen ? "-translate-y-0.75 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── Body grid ──────────────────────────────────── */}
      <div className="relative z-10 grid h-[calc(100dvh-3.5rem-1.5rem)] grid-cols-1 md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[17rem_minmax(0,1fr)_20rem]">
        {/* Drawer backdrop — mobile only */}
        {navOpen && (
          <button
            type="button"
            aria-label="Close index"
            onClick={() => setNavOpen(false)}
            className="md:hidden fixed inset-0 top-14 bottom-6 z-30 bg-ink/70 backdrop-blur-sm fade-in"
          />
        )}

        {/* SPINE — inline on md+, off-canvas drawer on mobile */}
        <aside
          className={`border-r border-line flex flex-col surface-ink-2
            fixed top-14 bottom-6 left-0 z-40 w-[18rem] max-w-[85vw] transform transition-transform duration-300 ease-out
            ${navOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative md:top-0 md:bottom-0 md:w-auto md:max-w-none md:translate-x-0 md:z-auto`}
        >
          <div className="px-7 pt-10 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-px bg-ember" />
              <div className="eyebrow text-ember!">Index</div>
            </div>
            <div className="font-display text-amber text-3xl leading-none">章</div>
          </div>
          <nav className="flex-1 px-3 pb-4">
            {chapters.map((c) => {
              const isActive = c.id === active
              const counts = getCounts(c.id)
              return (
                <button
                  key={c.id}
                  onClick={() => navigate(c.id)}
                  className={`group relative w-full text-left px-4 py-3.5 flex items-baseline gap-4 transition-all duration-300 ${isActive
                    ? "text-bone bg-ember-glow"
                    : "text-bone-mute hover:text-bone hover:bg-ink-3/40"
                    }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-ember draw-in" />
                  )}
                  <span className={`font-mono-tight text-[10px] tabular-nums tracking-widest ${isActive ? "text-ember" : "opacity-70"
                    }`}>
                    {c.index}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`font-display italic text-[1.35rem] leading-none block ${isActive ? "text-amber" : ""
                      }`}>
                      {c.title}
                    </span>
                    <span className="font-mono-tight text-[9px] uppercase tracking-[0.25em] text-bone-mute mt-1.5 block">
                      {c.kana} · {c.hint}
                    </span>
                  </span>
                  {counts && (
                    <span
                      className={`font-mono-tight text-[10px] tabular-nums transition-opacity ${isActive ? "text-amber opacity-100" : "text-bone-mute opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      {counts.total}
                    </span>
                  )}
                </button>
              )
            })}
            <div className="mt-2 px-4 py-3.5 flex items-baseline gap-4 text-bone-mute/40 select-none">
              <span className="font-mono-tight text-[10px] tracking-widest">0X</span>
              <span className="font-display italic text-[1.35rem] leading-none">___</span>
            </div>
          </nav>
          <div className="px-7 py-5 border-t border-line">
            <div className="eyebrow mb-1">v7.0</div>
            <div className="font-mono-tight text-[10px] text-bone-mute leading-relaxed">
              hand-kept · always under construction
            </div>
          </div>
        </aside>

        {/* STAGE */}
        <section className="relative overflow-hidden">
          {/* Vermilion hanko — a single printed seal, the only "chrome" the stage carries */}
          <span className="seal-mark" aria-hidden="true">尾</span>

          <div
            ref={stageRef}
            key={active}
            className={`absolute inset-0 overflow-auto ${direction === "forward" ? "slide-forward" : direction === "back" ? "slide-back" : "stage-in"
              }`}
          >
            {active === "home" && <ChapterHome onNavigate={navigate} />}
            {active === "works" && <ChapterWorks />}
            {active === "watch" && <ChapterWatch />}
            {active === "read" && <ChapterRead />}
            {active === "play" && <ChapterPlay />}
            {active === "notes" && <ChapterPlaceholder chapter={activeChapter} />}
            {active === "contact" && <ChapterContact />}
          </div>

          {/* Reading thread — sits on stage right edge, fills as you scroll */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-0.5 bg-line">
            <div
              className="origin-top bg-ember transition-transform duration-150 ease-out"
              style={{ width: "100%", height: "100%", transform: `scaleY(${progress})` }}
            />
          </div>
        </section>

        {/* MARGIN */}
        <aside className="hidden lg:flex border-l border-line flex-col p-8 gap-7 overflow-auto">
          <Margin chapterId={active} />
        </aside>
      </div>

      {/* ── Bottom status strip ─────────────────────────── */}
      <footer className="relative z-20 h-6 border-t border-line flex items-center px-4 sm:px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm">
        <span className="text-bone-dim">{activeChapter.index}</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>{activeChapter.kana}</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-dim">{status}</span>
        <span className="ml-auto hidden md:flex items-center gap-3">
          <KeyHint>← →</KeyHint>
          <span className="text-bone-mute/40">to flip · </span>
          <KeyHint>0–6</KeyHint>
          <span className="text-bone-mute/40">to jump</span>
          <span className="text-bone-mute/40">·</span>
          <span>DYARI ALI TAHIR · 2026</span>
        </span>
      </footer>
    </main>
  )
}

function KeyHint({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono-tight text-[10px] tracking-normal border border-line-strong px-1.5 py-px text-bone bg-ink/60">
      {children}
    </kbd>
  )
}

function Monogram() {
  return (
    <div className="relative flex items-center gap-3">
      <img
        src="/logo.jpg"
        alt="SHIN尾"
        className="w-7 h-7 object-cover"
        draggable={false}
      />
      <span className="font-mono-tight text-[10px] uppercase tracking-[0.35em] text-bone">SHIN</span>
    </div>
  )
}

function DayGlyph({ isDay }: { isDay: boolean }) {
  return (
    <span
      className="hidden md:inline-flex items-center gap-2"
      title={isDay ? "Daylight" : "Lamplight"}
    >
      {isDay ? (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber" fill="none">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
            <line
              key={d}
              x1="12"
              y1="2"
              x2="12"
              y2="5"
              stroke="currentColor"
              strokeLinecap="round"
              transform={`rotate(${d} 12 12)`}
            />
          ))}
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber" fill="none">
          <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5 7 7 0 1 0 19.5 14.5Z" fill="currentColor" />
        </svg>
      )}
      <span className="text-bone-dim">{isDay ? "DAY" : "NIGHT"}</span>
    </span>
  )
}

/** A single drifting mote — was two, kept just one so the page feels more still. */
function FireflyAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span
        className="absolute float-slow"
        style={{
          right: "25%",
          top: "62%",
          width: 2,
          height: 2,
          borderRadius: 9999,
          background: "var(--color-amber)",
          boxShadow: "0 0 10px 2px rgba(201,168,106,0.32)",
          opacity: 0.35,
          animationDuration: "13s",
        }}
      />
    </div>
  )
}

function Margin({ chapterId }: { chapterId: ChapterId }) {
  if (chapterId === "home") {
    return (
      <>
        <div>
          <div className="eyebrow mb-4">Field Note · Today</div>
          <p className="font-display italic text-bone text-xl leading-[1.4]">
            &ldquo;Mono no aware — the tender ache of things that pass.&rdquo;
          </p>
          <p className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone-mute mt-3">
            物の哀れ
          </p>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">Now</div>
          <ul className="font-mono-tight text-[11px] text-bone-dim space-y-2">
            <li className="flex items-baseline gap-3">
              <span className="text-bone-mute/40">engineering</span>
              <a
                href="https://kanidata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber hover:text-bone transition-colors"
              >
                Kani Data
              </a>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-bone-mute/40">watching</span>
              <span className="text-bone">Scum&apos;s Wish</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-bone-mute/40">reading</span>
              <span className="text-bone">Dorohedoro</span>
            </li>
            <li className="flex items-baseline gap-3">
              <span className="text-bone-mute/40">playing</span>
              <span className="text-bone">Warzone</span>
            </li>
          </ul>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow text-teal! mb-2">Open / Web only</div>
          <p className="font-mono-tight text-[10px] text-bone-dim leading-relaxed">
            Not seeking contracts. Open to web projects that match this register —
            quiet, considered, made well.
          </p>
        </div>
      </>
    )
  }
  if (chapterId === "works") {
    return (
      <>
        <div>
          <div className="eyebrow text-ember! mb-3">Now / Building</div>
          <div className="font-display italic text-xl leading-tight text-bone mb-1">DCVAW</div>
          <div className="font-mono-tight text-[10px] uppercase tracking-widest text-bone-mute mb-3">
            2026 · in development
          </div>
          <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
            A platform for the General Directorate of Combating Violence Against Women and Families.
            The kind of work that&apos;s worth the silence.
          </p>
        </div>
        <div className="h-px hairline-ember" />
        <div>
          <div className="eyebrow mb-3">Daily stack</div>
          <ul className="font-mono-tight text-[11px] space-y-1.5">
            {[
              { t: "Next.js", c: "ember" },
              { t: "TypeScript", c: "teal" },
              { t: "Postgres", c: "amber" },
              { t: "Tailwind", c: "ember" },
              { t: "Node", c: "teal" },
            ].map((row) => (
              <li key={row.t} className="flex items-center gap-2.5">
                <span
                  className={`w-1 h-1 rounded-full ${row.c === "ember"
                    ? "bg-ember"
                    : row.c === "teal"
                      ? "bg-teal"
                      : "bg-amber"
                    }`}
                />
                <span className="text-bone">{row.t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">Field note</div>
          <p className="font-display italic text-bone text-base leading-snug">
            &ldquo;Most of this was made at night, with the door closed.&rdquo;
          </p>
        </div>
      </>
    )
  }
  if (chapterId === "watch") {
    return (
      <>
        <div>
          <div className="eyebrow text-ember! mb-3">Currently</div>
          <div className="font-display italic text-xl leading-tight text-bone mb-1">Scum&apos;s Wish</div>
          <div className="font-mono-tight text-[10px] uppercase tracking-widest text-bone-mute mb-3">
            クズの本懐 · 2017
          </div>
          <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
            A short, sharp one about wanting the wrong people for the right reasons.
          </p>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">Field note</div>
          <p className="font-display italic text-bone text-base leading-snug">
            &ldquo;Most of what I love I found alone, after midnight.&rdquo;
          </p>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">Always returning to</div>
          <ul className="font-mono-tight text-[11px] text-bone-dim space-y-1.5">
            {["Monster", "Berserk (1997)", "Cowboy Bebop", "Hunter x Hunter", "Evangelion"].map((t, i) => (
              <li key={t} className="flex items-baseline gap-2">
                <span className="text-bone-mute/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-bone">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
  if (chapterId === "read") {
    return (
      <>
        <div>
          <div className="eyebrow text-amber! mb-3">Currently reading</div>
          <div className="font-display italic text-xl leading-tight text-bone mb-1">Dorohedoro</div>
          <div className="font-mono-tight text-[10px] uppercase tracking-widest text-bone-mute mb-3">
            ドロヘドロ · 2000
          </div>
          <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
            Q Hayashida. Black magic, lizard heads, fried meat. The mood is everything.
          </p>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">Genres I keep finding</div>
          <ul className="font-mono-tight text-[11px] text-bone-dim space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-amber" />
              <span className="text-bone">Action with dread</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-ember" />
              <span className="text-bone">Slow-burn romance</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-teal" />
              <span className="text-bone">Beautiful ugliness</span>
            </li>
          </ul>
        </div>
      </>
    )
  }
  if (chapterId === "play") {
    return (
      <>
        <div>
          <div className="eyebrow text-teal! mb-3">Currently playing</div>
          <div className="font-display italic text-xl leading-tight text-bone mb-1">Warzone</div>
          <div className="font-mono-tight text-[10px] uppercase tracking-widest text-bone-mute mb-3">
            COD · 2020 · live service
          </div>
          <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
            The kind of thing you put on while doing something else, until you&apos;re not.
          </p>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow text-amber! mb-3">Favourites</div>
          <ul className="font-mono-tight text-[11px] text-bone-dim space-y-1.5">
            <li className="flex items-baseline gap-2">
              <span className="text-bone-mute/40 tabular-nums">01</span>
              <span className="text-bone">Cyberpunk 2077</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-bone-mute/40 tabular-nums">02</span>
              <span className="text-bone">Resident Evil — all of it</span>
            </li>
          </ul>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">RTS childhood</div>
          <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
            C&amp;C Generals · Empire Earth · Age of Empires III. The reason I still know what an APC is.
          </p>
        </div>
      </>
    )
  }
  if (chapterId === "contact") {
    return (
      <>
        <div>
          <div className="eyebrow text-ember! mb-3">Status</div>
          <div className="font-display italic text-xl leading-tight text-bone mb-2">
            Open — web projects only.
          </div>
          <p className="font-mono-tight text-[10px] text-bone-dim leading-relaxed">
            Days go to data engineering at Kani Data — not seeking another contract role.
            Web projects that share this register are welcome.
          </p>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">Where</div>
          <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
            Hawler, Iraq · UTC+3. Remote OK.
          </p>
        </div>
        <div className="h-px hairline" />
        <div>
          <div className="eyebrow mb-3">Reply time</div>
          <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
            Slow but I read everything.
          </p>
        </div>
      </>
    )
  }
  return (
    <div>
      <div className="eyebrow mb-3">Pending</div>
      <p className="font-mono-tight text-[11px] text-bone-dim leading-relaxed">
        This chapter is reserved. Entries are being transcribed — check back.
      </p>
    </div>
  )
}
