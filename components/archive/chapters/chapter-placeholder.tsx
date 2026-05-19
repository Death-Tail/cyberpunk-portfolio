import type { Chapter } from "@/data/chapters"

export function ChapterPlaceholder({ chapter }: { chapter: Chapter }) {
  return (
    <div className="h-full flex items-center justify-center p-12">
      <div className="max-w-md text-center">
        <div className="eyebrow mb-6">
          {chapter.index} · {chapter.kana}
        </div>
        <h1 className="font-display text-bone text-[3rem] md:text-[4.5rem] leading-[0.95] mb-6">
          {chapter.title}.
        </h1>
        <div className="inline-flex items-center gap-2 border border-[var(--color-line-strong)] px-4 py-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] lamp-pulse" />
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone">
            Archive pending
          </span>
        </div>
        <p className="font-sans text-bone-dim text-[13px] leading-relaxed">
          This chapter is reserved. Entries are being transcribed and will arrive when they&apos;re ready —
          honest, hand-kept, no filler. {chapter.caption.toLowerCase()}.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone-mute">
          <span>{chapter.hint}</span>
          <span className="text-bone-mute/40">·</span>
          <span>back soon</span>
        </div>
      </div>
    </div>
  )
}
