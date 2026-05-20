"use client"

import { projects } from "@/components/projects-data"
import { ArrowUpRight, ExternalLink } from "lucide-react"

const ACCENTS = ["ember", "teal", "amber"] as const
type Accent = typeof ACCENTS[number]
const accentVar = (a: Accent) =>
  a === "ember" ? "var(--color-ember)" : a === "teal" ? "var(--color-teal)" : "var(--color-amber)"

export function ChapterWorks() {
  return (
    <div className="relative min-h-full">
      {/* Decorative kana */}
      <span className="kana-stamp" style={{ top: "-3rem", right: "-5rem" }}>作</span>

      {/* ── Chapter masthead ─────────────────────────────────────── */}
      <header className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-14 pt-10 pb-8 border-b border-[var(--color-line)]">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-px bg-[var(--color-ember)]" />
          <span className="eyebrow !text-[var(--color-ember)]">01 · 作品 · Works</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h1 className="font-display text-bone text-[3rem] lg:text-[3.5rem] leading-[0.95]">
            Things I built<span className="text-[var(--color-ember)]">.</span>
          </h1>
          <p className="font-sans text-bone-dim text-[13px] leading-relaxed max-w-md">
            A magazine of selected work — shipped sites, one in development.
            Each entry is its own spread.
          </p>
        </div>
      </header>

      {/* ── Project spreads ─────────────────────────────────────── */}
      <div className="relative z-10">
        {projects.map((p: any, i: number) => {
          const accent = ACCENTS[i % ACCENTS.length]
          const reverse = i % 2 === 1
          return (
            <ProjectSpread
              key={p.title}
              project={p}
              index={i}
              total={projects.length}
              accent={accent}
              reverse={reverse}
            />
          )
        })}

        {/* End ornament */}
        <div className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-14 py-14 flex items-center gap-6">
          <span className="flex-1 h-px hairline" />
          <span className="font-display italic text-bone-mute text-2xl leading-none">— 終 —</span>
          <span className="flex-1 h-px hairline" />
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────── */

interface SpreadProps {
  project: any
  index: number
  total: number
  accent: Accent
  reverse: boolean
}

function ProjectSpread({ project, index, total, accent, reverse }: SpreadProps) {
  const images: any[] = Array.isArray(project.images) ? project.images : []
  const accentColor = accentVar(accent)
  const isLive = (project.status ?? "").toUpperCase() === "DEPLOYED"

  return (
    <section
      data-index={index}
      id={`project-${index}`}
      className="relative scroll-mt-4"
    >
        {/* Page break above (skip for first) */}
        {index > 0 && (
          <div className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-14 py-8 flex items-center gap-6">
            <span className="flex-1 h-px hairline" />
            <span
              className="font-display italic text-2xl leading-none"
              style={{ color: accentColor, opacity: 0.85 }}
            >
              §
            </span>
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="flex-1 h-px hairline" />
          </div>
        )}

        {/* Spread body */}
        <div className="grid lg:grid-cols-2 gap-0 px-5 sm:px-8 md:px-10 lg:px-14 py-10">
          {/* TEXT COLUMN */}
          <div
            className={`flex flex-col justify-start lg:py-6 ${
              reverse ? "lg:order-2 lg:pl-12" : "lg:pr-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono-tight text-[10px] tabular-nums tracking-widest" style={{ color: accentColor }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="w-10 h-px" style={{ background: accentColor }} />
              <span className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone-mute">
                {project.year || "—"}
              </span>
              <StatusPip isLive={isLive} accent={accent} />
            </div>

            <h2 className="font-display text-bone text-[2.75rem] lg:text-[3.5rem] leading-[0.92] mb-6">
              {project.title}
            </h2>

            <p className="font-sans text-bone-dim text-[14px] leading-[1.7] mb-7 max-w-md">
              {project.description}
            </p>

            {Array.isArray(project.features) && project.features.length > 0 && (
              <div className="mb-7">
                <div className="eyebrow mb-3">Inside</div>
                <ul className="font-sans text-bone-dim text-[12.5px] leading-relaxed space-y-1.5 max-w-md">
                  {project.features.slice(0, 5).map((f: string) => (
                    <li key={f} className="flex gap-3">
                      <span className="shrink-0 select-none" style={{ color: accentColor }}>—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(project.tech) && project.tech.length > 0 && (
              <div className="mb-7">
                <div className="eyebrow mb-3">Stack</div>
                <div className="flex flex-wrap gap-1.5 max-w-md">
                  {project.tech.map((t: string, j: number) => (
                    <span
                      key={t}
                      className={`font-mono-tight text-[10px] uppercase tracking-wider px-2.5 py-1.5 ${
                        j % 3 === 0 ? "tag-ember" : j % 3 === 1 ? "tag-teal" : "tag-amber"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-5 border-t border-[var(--color-line)] flex items-center gap-5 flex-wrap">
              {project.links?.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 font-mono-tight text-[11px] uppercase tracking-[0.25em] text-bone transition-colors"
                  style={{ color: undefined }}
                >
                  <span
                    className="relative pb-0.5 transition-colors"
                    style={{ color: undefined }}
                  >
                    Visit live
                    <span
                      className="absolute left-0 -bottom-0 h-px w-full origin-left scale-x-100 group-hover:scale-x-100 transition-transform"
                      style={{ background: accentColor }}
                    />
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="font-mono-tight text-[11px] uppercase tracking-[0.25em] text-bone-mute">
                  not yet public
                </span>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-[0.25em] text-bone-mute hover:text-bone transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Source
                </a>
              )}
              {project.timeline && (
                <span className="ml-auto eyebrow !text-bone-mute/60">{project.timeline}</span>
              )}
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div
            className={`${reverse ? "lg:order-1 lg:pr-12" : "lg:pl-12"} mt-10 lg:mt-0 space-y-3`}
          >
            {images.length > 0 ? (
              images.map((img: any, j: number) => {
                const src = typeof img === "string" ? img : img?.src
                if (!src) return null
                return (
                  <figure
                    key={j}
                    className="group relative overflow-hidden border border-[var(--color-line)] bg-ink-2"
                  >
                    {/* Plate number */}
                    <span
                      className="absolute top-3 left-3 z-10 font-mono-tight text-[9px] uppercase tracking-[0.25em] text-bone-dim bg-ink/70 backdrop-blur-sm px-2 py-1 border border-[var(--color-line)]"
                      style={{ borderColor: "rgba(236,227,210,0.10)" }}
                    >
                      Plate {String(j + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={src}
                      alt={`${project.title} — plate ${j + 1}`}
                      className="block w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                      loading={index === 0 && j === 0 ? "eager" : "lazy"}
                    />
                  </figure>
                )
              })
            ) : (
              <EmptyPlate title={project.title} accent={accent} />
            )}
          </div>
        </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────── */

function StatusPip({ isLive, accent }: { isLive: boolean; accent: Accent }) {
  const color = isLive ? "var(--color-moss)" : accentVar(accent)
  return (
    <span className="inline-flex items-center gap-2 ml-2">
      <span
        className={`w-1.5 h-1.5 rounded-full ${isLive ? "" : "lamp-pulse"}`}
        style={{ background: color }}
      />
      <span
        className="font-mono-tight text-[9px] uppercase tracking-[0.3em]"
        style={{ color }}
      >
        {isLive ? "DEPLOYED" : "IN DEV"}
      </span>
    </span>
  )
}

function EmptyPlate({ title, accent }: { title: string; accent: Accent }) {
  return (
    <div
      className="relative aspect-[4/5] border border-[var(--color-line)] washi flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-ink-2)" }}
    >
      <span
        className="font-display italic text-[10rem] leading-none opacity-25"
        style={{ color: accentVar(accent) }}
      >
        {(title?.[0] ?? "—").toUpperCase()}
      </span>
      <span className="absolute bottom-3 left-3 font-mono-tight text-[9px] uppercase tracking-[0.25em] text-bone-mute">
        Plate · pending
      </span>
    </div>
  )
}
