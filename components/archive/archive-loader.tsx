"use client"

/**
 * Aesthetic loader — same dusk register as the archive shell.
 * Used by app/loading.tsx (Next.js streaming fallback) and as the
 * first-paint loader for the home page if needed in the future.
 */
export function ArchiveLoader({ label = "Opening the archive" }: { label?: string }) {
  return (
    <div className="fixed inset-0 bg-ink text-bone overflow-hidden grain">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_120%)]" />
      {/* Single cinnabar bloom — no second teal haze, no operator chrome */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_30%,rgba(200,72,58,0.08),transparent_65%)]" />

      {/* One drifting mote — quieter than two */}
      <span
        className="absolute float-slow pointer-events-none"
        style={{
          left: "22%",
          top: "32%",
          width: 2,
          height: 2,
          borderRadius: 9999,
          background: "var(--color-amber)",
          boxShadow: "0 0 10px 2px rgba(201,168,106,0.35)",
          opacity: 0.4,
          animationDuration: "11s",
        }}
      />

      {/* Top strip placeholder */}
      <div className="relative z-10 px-8 lg:px-12 h-14 flex items-center justify-between border-b border-[var(--color-line)]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-bone-dim/60 flex items-center justify-center">
            <span className="font-display italic text-bone text-base leading-none">尾</span>
          </div>
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.35em] text-bone">SHIN</span>
        </div>
        <span className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone-mute">
          syncing
        </span>
      </div>

      {/* Center stage */}
      <div className="relative z-10 absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          {/* Big italic kana with breathing pulse */}
          <div className="relative mb-10">
            <span className="absolute inset-0 blur-2xl opacity-50 font-display italic text-[var(--color-ember)] text-[8rem] leading-none select-none">
              章
            </span>
            <span className="relative font-display italic text-[var(--color-amber)] text-[8rem] leading-none lamp-pulse">
              章
            </span>
          </div>

          {/* Title + label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[var(--color-ember)]" />
            <span className="eyebrow !text-[var(--color-ember)]">Archive · v7.0</span>
            <span className="w-8 h-px bg-[var(--color-ember)]" />
          </div>
          <h1 className="font-display italic text-bone text-[2.25rem] leading-none mb-6">
            {label}
            <span className="loader-dots ml-0.5" />
          </h1>

          {/* Indeterminate hairline */}
          <div className="relative w-72 h-px bg-[var(--color-line-strong)] overflow-hidden mb-5">
            <div className="absolute inset-y-0 w-1/3 bg-[var(--color-ember)] loader-bar" />
          </div>

          {/* Status block — mono, like a terminal but quiet */}
          <ul className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone-mute space-y-1.5 text-center">
            <li className="flex items-center gap-2 justify-center">
              <span className="w-1 h-1 rounded-full bg-[var(--color-moss)]" />
              <span>indexing chapters · 07</span>
            </li>
            <li className="flex items-center gap-2 justify-center">
              <span className="w-1 h-1 rounded-full bg-[var(--color-ember)] lamp-pulse" />
              <span>composing the spreads</span>
            </li>
            <li className="flex items-center gap-2 justify-center text-bone-mute/40">
              <span className="w-1 h-1 rounded-full bg-[var(--color-teal)]" />
              <span>lighting the lamp</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip placeholder */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-6 border-t border-[var(--color-line)] flex items-center px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm">
        <span className="text-bone-dim">00</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>序</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-dim">PLEASE WAIT</span>
        <span className="ml-auto hidden md:inline">DYARI ALI TAHIR · 2026</span>
      </div>
    </div>
  )
}
