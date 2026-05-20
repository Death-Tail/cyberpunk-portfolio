import { ArrowUpRight } from "lucide-react"

const channels: { label: string; handle: string; href: string; kana: string }[] = [
  { label: "Email", handle: "hello@dyariali.com", href: "mailto:hello@dyariali.com", kana: "信" },
  { label: "GitHub", handle: "@Death-Tail", href: "https://github.com/Death-Tail", kana: "源" },
  { label: "LinkedIn", handle: "in/dyarialitahir", href: "https://www.linkedin.com/in/dyarialitahir/", kana: "職" },
  { label: "X / Twitter", handle: "@Death_Tail0331", href: "https://x.com/Death_Tail0331", kana: "声" },
  { label: "Instagram", handle: "@dyari_ali_taher", href: "https://www.instagram.com/dyari_ali_taher/", kana: "像" },
  { label: "Discord", handle: "death_tail", href: "https://discord.com/users/death_tail", kana: "話" },
]

export function ChapterContact() {
  return (
    <div className="h-full overflow-auto">
      <div className="px-8 md:px-12 py-12 max-w-3xl">
        <div className="eyebrow mb-3">06 · 連絡 · Channels</div>
        <h1 className="font-display text-bone text-[2.75rem] md:text-[4rem] leading-[0.95] mb-6">
          Open the&nbsp;
          <span className="text-[var(--color-ember)]">line.</span>
        </h1>
        <p className="font-sans text-bone-dim text-[13px] leading-relaxed max-w-lg mb-4">
          Days go to data engineering at&nbsp;
          <a href="https://kanidata.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-amber)] hover:text-[var(--color-ember)] transition-colors">
            Kani Data
          </a>
          . I&apos;m <span className="text-bone">not</span> looking for another contract role.
        </p>
        <p className="font-sans text-bone-dim text-[13px] leading-relaxed max-w-lg mb-12">
          Open to <span className="text-[var(--color-amber)]">web projects</span> that share the register
          of the work in the archive — quiet, considered, made well. Otherwise: just say hi.
          Hawler, UTC+3.
        </p>

        <ul className="border-t border-[var(--color-line)]">
          {channels.map((c, i) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group grid grid-cols-[3rem_3rem_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-[var(--color-line)] py-5 hover:bg-ink-2 transition-colors px-2"
              >
                <span className="font-mono-tight text-[10px] tabular-nums text-bone-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display italic text-bone-dim text-2xl leading-none">
                  {c.kana}
                </span>
                <span>
                  <span className="font-display italic text-bone text-xl leading-tight block group-hover:text-[var(--color-amber)] transition-colors">
                    {c.label}
                  </span>
                  <span className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute mt-1 block">
                    {c.handle}
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-bone-mute group-hover:text-[var(--color-ember)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
