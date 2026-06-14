"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { getSession, signOut, createEntry, updateEntry, deleteEntry } from "@/lib/supabase/admin"
import { getWatchEntries, getReadEntries, getPlayEntries } from "@/lib/supabase/queries"
import type { WatchRow, ReadRow, PlayRow } from "@/lib/supabase/types"
import { LogOut, Plus, Pencil, Trash2, X, Save, ArrowLeft } from "lucide-react"

type Tab = "watch" | "read" | "play"

export default function AdminDashboard() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>("watch")

  /* Data */
  const [watchData, setWatchData] = useState<WatchRow[]>([])
  const [readData, setReadData] = useState<ReadRow[]>([])
  const [playData, setPlayData] = useState<PlayRow[]>([])
  const [loading, setLoading] = useState(true)

  /* Modal state */
  const [modal, setModal] = useState<"add" | "edit" | null>(null)
  const [editId, setEditId] = useState<string | null>(null)

  /* Toast */
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  /* Auth check */
  useEffect(() => {
    getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin")
      else setAuthed(true)
    })
  }, [router])

  /* Data fetch */
  const refreshData = useCallback(async () => {
    setLoading(true)
    const [w, r, p] = await Promise.all([getWatchEntries(), getReadEntries(), getPlayEntries()])
    setWatchData(w); setReadData(r); setPlayData(p)
    setLoading(false)
  }, [])

  useEffect(() => { if (authed) refreshData() }, [authed, refreshData])

  async function handleLogout() {
    await signOut()
    router.replace("/admin")
  }

  /* Delete handler */
  async function handleDelete(collection: Tab, id: string) {
    if (!confirm("Delete this entry?")) return
    const { error } = await deleteEntry(collection, id)
    if (error) { showToast(`Error: ${error.message}`); return }
    showToast("Entry deleted")
    refreshData()
  }

  if (!authed) {
    return (
      <main className="fixed inset-0 bg-ink text-bone grid place-items-center grain">
        <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute animate-pulse">
          Verifying…
        </span>
      </main>
    )
  }

  const currentData = tab === "watch" ? watchData : tab === "read" ? readData : playData

  return (
    <main className="fixed inset-0 bg-ink text-bone overflow-hidden grain flex flex-col">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_120%)]" />

      {/* Top bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 h-14 border-b border-line bg-ink/70 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-bone-mute hover:text-bone transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.25em]">Site</span>
          </a>
          <span className="text-bone-mute/40">|</span>
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone">
            SHIN<span className="text-ember">尾</span> CMS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute hidden sm:inline">
            {watchData.length + readData.length + playData.length} total entries
          </span>
          <a
            href="/admin/tracker"
            className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute hover:text-ember transition-colors hidden sm:inline"
          >
            ⚙ Tracker
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute hover:text-ember transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="relative z-20 flex items-center border-b border-line bg-ink-2/50 backdrop-blur-sm shrink-0">
        {(["watch", "read", "play"] as Tab[]).map((t) => {
          const count = t === "watch" ? watchData.length : t === "read" ? readData.length : playData.length
          const label = t === "watch" ? "観た Watch" : t === "read" ? "読了 Read" : "遊 Play"
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`group relative px-6 py-3.5 font-mono-tight text-[10px] uppercase tracking-[0.25em] transition-colors ${
                tab === t ? "text-bone" : "text-bone-mute hover:text-bone"
              }`}
            >
              {label}
              <span className={`ml-2 ${tab === t ? "text-ember" : "text-bone-mute/60"}`}>{count}</span>
              {tab === t && <span className="absolute left-2 right-2 -bottom-px h-px bg-ember" />}
            </button>
          )
        })}
        <div className="ml-auto pr-4">
          <button
            onClick={() => { setEditId(null); setModal("add") }}
            className="flex items-center gap-2 px-4 py-2 bg-ember text-bone font-mono-tight text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Entry</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto">
        {loading ? (
          <div className="h-full grid place-items-center">
            <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute animate-pulse">
              Loading…
            </span>
          </div>
        ) : currentData.length === 0 ? (
          <div className="h-full grid place-items-center">
            <div className="text-center">
              <p className="font-display italic text-bone-dim text-xl mb-3">No entries yet.</p>
              <p className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute">
                Add your first {tab} entry to get started.
              </p>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th className="px-4 sm:px-6 py-3 font-mono-tight text-[9px] uppercase tracking-[0.3em] text-bone-mute font-normal">#</th>
                <th className="px-4 sm:px-6 py-3 font-mono-tight text-[9px] uppercase tracking-[0.3em] text-bone-mute font-normal">Title</th>
                <th className="px-4 sm:px-6 py-3 font-mono-tight text-[9px] uppercase tracking-[0.3em] text-bone-mute font-normal hidden md:table-cell">Kind</th>
                <th className="px-4 sm:px-6 py-3 font-mono-tight text-[9px] uppercase tracking-[0.3em] text-bone-mute font-normal hidden sm:table-cell">Status</th>
                <th className="px-4 sm:px-6 py-3 font-mono-tight text-[9px] uppercase tracking-[0.3em] text-bone-mute font-normal hidden lg:table-cell">Year</th>
                <th className="px-4 sm:px-6 py-3 font-mono-tight text-[9px] uppercase tracking-[0.3em] text-bone-mute font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((entry, i) => (
                <tr key={entry.id} className="border-b border-line hover:bg-ink-2/40 transition-colors group">
                  <td className="px-4 sm:px-6 py-4 font-mono-tight text-[10px] tabular-nums text-bone-mute">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="font-display italic text-bone text-base leading-tight">{entry.title}</div>
                    {"jp_title" in entry && entry.jp_title && (
                      <div className="font-mono-tight text-[9px] text-bone-mute mt-0.5">{entry.jp_title as string}</div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                    <span className="font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute">{entry.kind}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                    <span className="font-mono-tight text-[10px] tabular-nums text-bone-mute">
                      {"year" in entry ? (entry.year ?? "—") : "—"}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditId(entry.id); setModal("edit") }}
                        className="p-1.5 text-bone-mute hover:text-amber transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(tab, entry.id)}
                        className="p-1.5 text-bone-mute hover:text-ember transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bottom strip */}
      <footer className="relative z-20 h-6 border-t border-line flex items-center px-4 sm:px-8 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm shrink-0">
        <span className="text-bone-dim">ADM</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>管</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-dim">DASHBOARD</span>
        <span className="ml-auto hidden md:inline">DYARI ALI TAHIR · 2026</span>
      </footer>

      {/* Modal */}
      {modal && (
        <EntryModal
          tab={tab}
          mode={modal}
          editId={editId}
          watchData={watchData}
          readData={readData}
          playData={playData}
          onClose={() => { setModal(null); setEditId(null) }}
          onSaved={() => { setModal(null); setEditId(null); refreshData(); showToast(modal === "add" ? "Entry added" : "Entry updated") }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-ink-3 border border-line-strong px-6 py-3 font-mono-tight text-[11px] uppercase tracking-[0.2em] text-bone shadow-xl fade-in">
          {toast}
        </div>
      )}
    </main>
  )
}

/* ── Status Badge ─────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    watching: "tag-ember",
    reading: "tag-ember",
    playing: "tag-ember",
    finished: "tag-teal",
    endless: "tag-amber",
    queued: "tag-amber",
    dropped: "",
  }
  return (
    <span className={`inline-block font-mono-tight text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 ${colors[status] ?? "text-bone-mute border border-line"}`}>
      {status}
    </span>
  )
}

/* ── Entry Modal ──────────────────────────────────────── */
interface ModalProps {
  tab: Tab
  mode: "add" | "edit"
  editId: string | null
  watchData: WatchRow[]
  readData: ReadRow[]
  playData: PlayRow[]
  onClose: () => void
  onSaved: () => void
}

function EntryModal({ tab, mode, editId, watchData, readData, playData, onClose, onSaved }: ModalProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  /* Form fields — a superset of all 3 types */
  const [title, setTitle] = useState("")
  const [jpTitle, setJpTitle] = useState("")
  const [kind, setKind] = useState("")
  const [year, setYear] = useState("")
  const [status, setStatus] = useState("")
  const [rating, setRating] = useState("")
  const [episodes, setEpisodes] = useState("")
  const [chapters, setChapters] = useState("")
  const [hours, setHours] = useState("")
  const [note, setNote] = useState("")
  const [tags, setTags] = useState("")
  const [favorite, setFavorite] = useState(false)

  /* Populate form when editing */
  useEffect(() => {
    if (mode !== "edit" || !editId) {
      /* Set defaults for add mode */
      if (tab === "watch") { setKind("anime"); setStatus("finished") }
      else if (tab === "read") { setKind("manga"); setStatus("finished") }
      else { setKind("single"); setStatus("finished") }
      return
    }
    let entry: any = null
    if (tab === "watch") entry = watchData.find((e) => e.id === editId)
    else if (tab === "read") entry = readData.find((e) => e.id === editId)
    else entry = playData.find((e) => e.id === editId)

    if (entry) {
      setTitle(entry.title ?? "")
      setJpTitle(entry.jp_title ?? "")
      setKind(entry.kind ?? "")
      setYear(entry.year?.toString() ?? "")
      setStatus(entry.status ?? "")
      setRating(entry.rating?.toString() ?? "")
      setEpisodes(entry.episodes?.toString() ?? "")
      setChapters(entry.chapters?.toString() ?? "")
      setHours(entry.hours?.toString() ?? "")
      setNote(entry.note ?? "")
      setTags(Array.isArray(entry.tags) ? entry.tags.join(", ") : "")
      setFavorite(entry.favorite ?? false)
    }
  }, [mode, editId, tab, watchData, readData, playData])

  const kindOptions = tab === "watch"
    ? ["anime", "film", "series"]
    : tab === "read"
    ? ["manga", "manhwa", "manhua", "book", "essay"]
    : ["single", "live"]

  const statusOptions = tab === "watch"
    ? ["watching", "finished", "dropped", "queued"]
    : tab === "read"
    ? ["reading", "finished", "dropped", "queued"]
    : ["playing", "finished", "dropped", "queued", "endless"]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaving(true)

    const parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean)
    const parsedYear = year ? parseInt(year, 10) : null
    const parsedRating = rating ? parseFloat(rating) : null

    try {
      /* Build the payload based on collection type */
      const basePayload: any = {
        title,
        kind,
        status,
        rating: parsedRating,
        cover: null,
        note: note || null,
        finished_on: null,
        tags: parsedTags,
        sort_order: 0,
      }

      if (tab === "watch") {
        basePayload.jp_title = jpTitle || null
        basePayload.year = parsedYear!
        basePayload.episodes = episodes ? parseInt(episodes, 10) : null
      } else if (tab === "read") {
        basePayload.jp_title = jpTitle || null
        basePayload.year = parsedYear
        basePayload.chapters = chapters ? parseInt(chapters, 10) : null
      } else {
        basePayload.year = parsedYear
        basePayload.hours = hours ? parseInt(hours, 10) : null
        basePayload.favorite = favorite
      }

      if (mode === "add") {
        const { error } = await createEntry(tab, basePayload)
        if (error) throw error
      } else {
        const { error } = await updateEntry(tab, editId!, basePayload)
        if (error) throw error
      }

      onSaved()
    } catch (err: any) {
      setError(err?.message ?? "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative bg-ink-2 border border-line-strong w-full max-w-lg max-h-[90vh] overflow-auto shadow-2xl fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-ember" />
            <span className="eyebrow text-ember!">
              {mode === "add" ? "Add Entry" : "Edit Entry"} · {tab}
            </span>
          </div>
          <button onClick={onClose} className="text-bone-mute hover:text-bone transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <Field label="Title *">
            <input
              type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="admin-input" placeholder="e.g. Monster"
            />
          </Field>

          {/* JP Title (watch & read only) */}
          {tab !== "play" && (
            <Field label="Japanese Title">
              <input
                type="text" value={jpTitle} onChange={(e) => setJpTitle(e.target.value)}
                className="admin-input" placeholder="e.g. MONSTER"
              />
            </Field>
          )}

          {/* Kind + Status */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kind *">
              <select value={kind} onChange={(e) => setKind(e.target.value)} className="admin-input">
                {kindOptions.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </Field>
            <Field label="Status *">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-input">
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          {/* Year + Rating */}
          <div className="grid grid-cols-2 gap-4">
            <Field label={tab === "watch" ? "Year *" : "Year"}>
              <input
                type="number" value={year} onChange={(e) => setYear(e.target.value)}
                className="admin-input" placeholder="2024"
                {...(tab === "watch" ? { required: true } : {})}
              />
            </Field>
            <Field label="Rating (0–10)">
              <input
                type="number" step="0.1" min="0" max="10"
                value={rating} onChange={(e) => setRating(e.target.value)}
                className="admin-input" placeholder="8.5"
              />
            </Field>
          </div>

          {/* Type-specific: episodes / chapters / hours */}
          {tab === "watch" && (
            <Field label="Episodes">
              <input
                type="number" value={episodes} onChange={(e) => setEpisodes(e.target.value)}
                className="admin-input" placeholder="24"
              />
            </Field>
          )}
          {tab === "read" && (
            <Field label="Chapters">
              <input
                type="number" value={chapters} onChange={(e) => setChapters(e.target.value)}
                className="admin-input" placeholder="200"
              />
            </Field>
          )}
          {tab === "play" && (
            <>
              <Field label="Hours">
                <input
                  type="number" value={hours} onChange={(e) => setHours(e.target.value)}
                  className="admin-input" placeholder="120"
                />
              </Field>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)}
                  className="w-4 h-4 accent-amber"
                />
                <span className="font-mono-tight text-[11px] uppercase tracking-[0.2em] text-bone-mute">Favourite</span>
              </label>
            </>
          )}

          {/* Note */}
          <Field label="Note">
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)}
              className="admin-input min-h-20 resize-y"
              placeholder="A short personal note…"
            />
          </Field>

          {/* Tags */}
          <Field label="Tags (comma-separated)">
            <input
              type="text" value={tags} onChange={(e) => setTags(e.target.value)}
              className="admin-input" placeholder="rpg, openworld, horror"
            />
          </Field>

          {/* Error */}
          {error && (
            <div className="font-mono-tight text-[11px] text-ember bg-ember-glow border border-line-ember px-4 py-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-ember text-bone font-mono-tight text-[10px] uppercase tracking-[0.25em] hover:brightness-110 transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : mode === "add" ? "Add Entry" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 font-mono-tight text-[10px] uppercase tracking-[0.25em] text-bone-mute hover:text-bone transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="eyebrow block mb-1.5">{label}</label>
      {children}
    </div>
  )
}
