import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export const metadata = {
  title: "Links · Dyari Ali Tahir",
  description: "Channels for reaching Dyari Ali Tahir.",
}

const links: { name: string; url: string; handle: string; kana: string; tone: "ember" | "teal" | "amber" }[] = [
  { name: "Email", url: "mailto:dyarialitaher03@gmail.com", handle: "dyarialitaher03@gmail.com", kana: "信", tone: "ember" },
  { name: "GitHub", url: "https://github.com/Death-Tail", handle: "Death-Tail", kana: "源", tone: "teal" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/dyarialitahir/", handle: "in/dyarialitahir", kana: "職", tone: "amber" },
  { name: "X", url: "https://x.com/Death_Tail0331", handle: "@Death_Tail0331", kana: "声", tone: "ember" },
  { name: "Instagram", url: "https://www.instagram.com/dyari_ali_taher/", handle: "@dyari_ali_taher", kana: "像", tone: "teal" },
  { name: "Discord", url: "https://discord.com/users/death_tail", handle: "death_tail", kana: "話", tone: "amber" },
]

const toneVar = (t: "ember" | "teal" | "amber") =>
  t === "ember" ? "var(--color-ember)" : t === "teal" ? "var(--color-teal)" : "var(--color-amber)"

export default function LinksPage() {
  return (
    <main className="fixed inset-0 bg-ink text-bone overflow-hidden grain">
      {/* Vignette + radials */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_120%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_75%_20%,rgba(217,119,87,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_85%,rgba(106,144,152,0.08),transparent_70%)]" />

      {/* HUD corners */}
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      {/* Background kana */}
      <span className="kana-stamp z-0 select-none" style={{ top: "-5rem", right: "-4rem" }}>連</span>

      {/* Top strip */}
      <header className="relative z-20 flex items-center justify-between px-8 lg:px-12 h-14 border-b border-line bg-ink/70 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-bone-dim/60 flex items-center justify-center">
            <span className="font-display italic text-bone text-base leading-none">尾</span>
          </div>
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.35em] text-bone">SHIN</span>
        </div>
        <a
          href="/"
          className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone-mute hover:text-ember transition-colors"
        >
          ← back to archive
        </a>
      </header>

      <div className="relative z-10 h-[calc(100dvh-3.5rem-1.5rem)] overflow-auto px-8 lg:px-12 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Profile block */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="relative w-28 h-28 mb-6">
              <div className="absolute inset-0 border border-line-strong" />
              <Image
                src="/L.jpg"
                alt="Dyari Ali Tahir"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border border-ember bg-ink flex items-center justify-center">
                <span className="font-display italic text-ember text-xs leading-none">尾</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-ember" />
              <span className="eyebrow text-ember!">06 · 連絡 · Channels</span>
              <span className="w-8 h-px bg-ember" />
            </div>
            <h1 className="font-display text-bone text-[2.75rem] leading-[0.95] mb-2">
              Dyari Ali Tahir
            </h1>
            <p className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute">
              SHIN<span className="text-ember">尾</span> · @death_tail
            </p>
          </div>

          {/* Links list */}
          <ul className="border-t border-line">
            {links.map((link, i) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[2.5rem_2.5rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line py-5 px-2 hover:bg-ink-2 transition-colors"
                >
                  <span className="font-mono-tight text-[10px] tabular-nums text-bone-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display italic text-2xl leading-none"
                    style={{ color: toneVar(link.tone), opacity: 0.85 }}
                  >
                    {link.kana}
                  </span>
                  <span className="min-w-0">
                    <span className="font-display italic text-bone text-xl leading-tight block group-hover:text-amber transition-colors">
                      {link.name}
                    </span>
                    <span className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute mt-1 block truncate">
                      {link.handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-bone-mute group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    style={{ color: undefined }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-8 text-center">
            <a
              href="/"
              className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute hover:text-ember transition-colors"
            >
              ← return to the archive
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 h-6 border-t border-line flex items-center px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm">
        <span className="text-bone-dim">06</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>連</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-dim">CHANNELS</span>
        <span className="ml-auto hidden md:inline">DYARI ALI TAHIR · 2026</span>
      </footer>
    </main>
  )
}
