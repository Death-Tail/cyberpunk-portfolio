"use client"

/**
 * Loader — 序 (prelude). Ink settles onto washi, the seal is pressed,
 * the page is ready. No status lines, no progress chrome.
 *
 * 一期一会 — ichi-go ichi-e — "this moment, never again."
 * Used by app/loading.tsx (Next.js streaming fallback) and as the
 * first-paint loader for the home page in app/page.tsx.
 */
const COLUMN = ["一", "期", "一", "会"] as const
const CHAR_STEP_MS = 180

export function ArchiveLoader() {
  const sealDelay = COLUMN.length * CHAR_STEP_MS + 60

  return (
    <div className="fixed inset-0 bg-ink text-bone overflow-hidden grain">
      {/* Vignette — single quiet pool, no competing blooms */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#000000_120%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_45%_30%_at_50%_50%,rgba(201,168,106,0.05),transparent_70%)]" />

      {/* Top strip — minimal, no "syncing" copy */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 h-14 flex items-center border-b border-[var(--color-line)]">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="SHIN尾" className="w-7 h-7 object-cover" draggable={false} />
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.35em] text-bone">
            SHIN<span className="text-[var(--color-ember)]">尾</span>
          </span>
        </div>
      </div>

      {/* Center — tategaki column, then the seal */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 mb-9 select-none">
            {COLUMN.map((ch, i) => (
              <span
                key={i}
                className="ink-settle font-display italic text-bone text-[2.5rem] sm:text-[3rem] leading-none"
                style={{ animationDelay: `${i * CHAR_STEP_MS}ms` }}
                aria-hidden="true"
              >
                {ch}
              </span>
            ))}
            <span className="sr-only">Loading the archive</span>
          </div>

          {/* Hanko — vermilion seal stamps last */}
          <span
            className="hanko-press relative inline-flex items-center justify-center font-display italic text-bone"
            style={{
              animationDelay: `${sealDelay}ms`,
              width: "2.25rem",
              height: "2.25rem",
              background: "var(--color-ember)",
              fontSize: "1rem",
              opacity: 0,
              boxShadow: "inset 0 0 0 1px rgba(14,17,24,0.4)",
            }}
            aria-hidden="true"
          >
            {/* Ink bloom — diffuses outward as the seal settles */}
            <span
              className="hanko-bloom absolute inset-0 -z-10 rounded-full"
              style={{
                animationDelay: `${sealDelay}ms`,
                background:
                  "radial-gradient(circle, rgba(200,72,58,0.35) 0%, transparent 65%)",
              }}
            />
            尾
          </span>

          {/* One single hairline beneath — the page's edge */}
          <div
            className="hairline-draw mt-7 h-px w-24 bg-[var(--color-line-strong)] origin-center"
            style={{ animationDelay: `${sealDelay + 200}ms` }}
          />
        </div>
      </div>

      {/* Bottom strip — quiet signature, no PLEASE WAIT, no copyright */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-6 border-t border-[var(--color-line)] flex items-center px-4 sm:px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.25em] text-bone-mute bg-ink/70 backdrop-blur-sm">
        <span className="text-bone-dim">00</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>序</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-mute/60">prelude</span>
      </div>
    </div>
  )
}
