"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSession } from "@/lib/supabase/admin"
import { ArrowLeft, Plus, Pencil, Trash2, X, Save, ArrowUp, Check } from "lucide-react"

/* ── Types ──────────────────────────────────────────── */
interface BoughtItem {
  id: string; name: string; cat: string;
  price: number; note: string; date: string
}
interface WishItem {
  id: string; name: string; cat: string;
  price: number; note: string;
  priority: "high" | "medium" | "low"
  status: "next" | "hold" | "tbd"
}
interface TrackerState {
  bought: BoughtItem[]; wish: WishItem[]
  updatedAt?: string
}

const KEY = "pc-tracker-v4"
const CATS = [
  "Keyboard", "Mouse", "Monitor", "GPU", "CPU", "RAM", "Storage",
  "Motherboard", "PSU", "Case", "Cooling", "Desk", "Chair",
  "Headset", "Mic", "Mousepad", "Lighting", "Other",
]

function uid() { return Math.random().toString(36).slice(2, 10) }
function today() { return new Date().toISOString().split("T")[0] }
function fmt(n: number) {
  return n > 0 ? Number(n).toLocaleString("en-IQ") + " IQD" : null
}

/* ── Default seed data ─────────────────────────────── */
function makeSeed(): TrackerState {
  return {
    bought: [{
      id: uid(), name: "Attack Shark X98 Pro", cat: "Keyboard",
      price: 103500, note: "item 99k + 4,500k delivery", date: "2026-06-06",
    }],
    wish: [
      { id: uid(), name: "Desk", cat: "Desk", price: 0, note: "Next purchase — looking for 160–200cm aesthetic setup", priority: "high", status: "next" },
      { id: uid(), name: "PC Case", cat: "Case", price: 0, note: "Aesthetic build — 3D animation, gaming & work", priority: "high", status: "hold" },
      { id: uid(), name: "Monitor", cat: "Monitor", price: 0, note: "On hold until desk is sorted", priority: "high", status: "hold" },
      { id: uid(), name: "GPU", cat: "GPU", price: 0, note: "High-end for 3D animation & gaming", priority: "high", status: "hold" },
      { id: uid(), name: "CPU", cat: "CPU", price: 0, note: "On hold until order is confirmed", priority: "medium", status: "hold" },
      { id: uid(), name: "Motherboard", cat: "Motherboard", price: 0, note: "On hold", priority: "medium", status: "hold" },
      { id: uid(), name: "RAM", cat: "RAM", price: 0, note: "On hold", priority: "medium", status: "hold" },
      { id: uid(), name: "Storage", cat: "Storage", price: 0, note: "On hold", priority: "medium", status: "hold" },
      { id: uid(), name: "PSU", cat: "PSU", price: 0, note: "On hold", priority: "medium", status: "hold" },
      { id: uid(), name: "Cooling", cat: "Cooling", price: 0, note: "On hold", priority: "low", status: "hold" },
      { id: uid(), name: "Chair", cat: "Chair", price: 0, note: "On hold", priority: "low", status: "hold" },
    ],
  }
}

/* ══════════════════════════════════════════════════════ */
export default function TrackerPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [state, setState] = useState<TrackerState>({ bought: [], wish: [] })

  /* Bought form */
  const [showBF, setShowBF] = useState(false)
  const [editBI, setEditBI] = useState<number | null>(null)
  const [bf, setBf] = useState({ name: "", cat: "Keyboard", price: "", note: "", date: today() })

  /* Wish form */
  const [showWF, setShowWF] = useState(false)
  const [editWI, setEditWI] = useState<number | null>(null)
  const [wf, setWf] = useState<{ name: string; cat: string; price: string; note: string; priority: WishItem["priority"]; status: WishItem["status"] }>({ name: "", cat: "Case", price: "0", note: "", priority: "medium", status: "tbd" })

  /* ── Auth ── */
  useEffect(() => {
    getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin")
      else setAuthed(true)
    })
  }, [router])

  /* ── Load from localStorage ── */
  useEffect(() => {
    if (!authed) return
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setState(JSON.parse(raw))
      else {
        const seed = makeSeed()
        localStorage.setItem(KEY, JSON.stringify(seed))
        setState(seed)
      }
    } catch { /* empty */ }
  }, [authed])

  /* ── Persist ── */
  const persist = useCallback((next: TrackerState) => {
    const updated = { ...next, updatedAt: new Date().toISOString() }
    setState(updated)
    localStorage.setItem(KEY, JSON.stringify(updated))
  }, [])

  /* ── Computed ── */
  const spent = state.bought.reduce((s, x) => s + (x.price || 0), 0)
  const planned = state.wish.filter(x => x.price > 0).reduce((s, x) => s + x.price, 0)
  const total = spent + planned
  const pct = total > 0 ? Math.min(100, Math.round((spent / total) * 100)) : 0
  const itemCount = state.bought.length + state.wish.length

  /* ── Bought CRUD ── */
  function openAddBought() {
    setEditBI(null)
    setBf({ name: "", cat: "Keyboard", price: "", note: "", date: today() })
    setShowBF(true)
  }
  function openEditBought(i: number) {
    const item = state.bought[i]
    setEditBI(i)
    setBf({ name: item.name, cat: item.cat, price: String(item.price || ""), note: item.note, date: item.date })
    setShowBF(true)
  }
  function saveBought() {
    if (!bf.name.trim()) return
    const item: BoughtItem = {
      id: editBI !== null ? state.bought[editBI].id : uid(),
      name: bf.name.trim(), cat: bf.cat,
      price: parseFloat(bf.price) || 0,
      note: bf.note.trim(), date: bf.date,
    }
    const next = { ...state, bought: [...state.bought] }
    if (editBI !== null) next.bought[editBI] = item
    else next.bought.push(item)
    persist(next)
    setShowBF(false); setEditBI(null)
  }
  function deleteBought(i: number) {
    if (!confirm(`Delete "${state.bought[i].name}"?`)) return
    const next = { ...state, bought: state.bought.filter((_, idx) => idx !== i) }
    persist(next)
  }
  function moveBoughtToWish(i: number) {
    const item = state.bought[i]
    const next = {
      ...state,
      bought: state.bought.filter((_, idx) => idx !== i),
      wish: [{ id: item.id, name: item.name, cat: item.cat, price: item.price, note: item.note, priority: "medium" as const, status: "tbd" as const }, ...state.wish],
    }
    persist(next)
  }

  /* ── Wish CRUD ── */
  function openAddWish() {
    setEditWI(null)
    setWf({ name: "", cat: "Case", price: "0", note: "", priority: "medium", status: "tbd" })
    setShowWF(true)
  }
  function openEditWish(i: number) {
    const item = state.wish[i]
    setEditWI(i)
    setWf({ name: item.name, cat: item.cat, price: String(item.price || 0), note: item.note, priority: item.priority, status: item.status })
    setShowWF(true)
  }
  function saveWish() {
    if (!wf.name.trim()) return
    const item: WishItem = {
      id: editWI !== null ? state.wish[editWI].id : uid(),
      name: wf.name.trim(), cat: wf.cat,
      price: parseFloat(wf.price) || 0,
      note: wf.note.trim(), priority: wf.priority, status: wf.status,
    }
    const next = { ...state, wish: [...state.wish] }
    if (editWI !== null) next.wish[editWI] = item
    else next.wish.push(item)
    persist(next)
    setShowWF(false); setEditWI(null)
  }
  function deleteWish(i: number) {
    if (!confirm(`Delete "${state.wish[i].name}"?`)) return
    const next = { ...state, wish: state.wish.filter((_, idx) => idx !== i) }
    persist(next)
  }
  function wishToBought(i: number) {
    const item = state.wish[i]
    const next = {
      ...state,
      wish: state.wish.filter((_, idx) => idx !== i),
      bought: [...state.bought, { id: item.id, name: item.name, cat: item.cat, price: item.price, note: item.note, date: today() }],
    }
    persist(next)
  }

  if (!authed) {
    return (
      <main className="fixed inset-0 bg-ink text-bone grid place-items-center grain">
        <span className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute animate-pulse">
          Checking session…
        </span>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ink text-bone grain">
      {/* ── Hero ── */}
      <div className="relative w-full h-65 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-ink-3/60 to-ink" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_75%_20%,rgba(200,72,58,0.12),transparent_60%)]" />
        <span className="kana-stamp select-none" style={{ top: "-6rem", right: "-3rem" }}>銭</span>

        <div className="relative h-full flex flex-col justify-end px-8 lg:px-12 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-ember" />
            <span className="eyebrow text-ember!">PC Upgrade Tracker · IQD</span>
          </div>
          <h1 className="font-display text-bone text-[3rem] leading-[0.9] tracking-tight">
            Build<span className="text-ember">.</span>
          </h1>
          <p className="font-mono-tight text-[10px] uppercase tracking-[0.3em] text-bone-mute mt-2">
            {itemCount} item{itemCount !== 1 ? "s" : ""} tracked
          </p>
        </div>
      </div>

      {/* ── Shell ── */}
      <div className="max-w-215 mx-auto px-6 lg:px-8 pb-24">
        {/* Back to dashboard */}
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="flex items-center gap-2 font-mono-tight text-[10px] uppercase tracking-[0.2em] text-bone-mute hover:text-ember transition-colors mb-8 mt-2"
        >
          <ArrowLeft size={12} /> Dashboard
        </button>

        {/* ── Budget row ── */}
        <div className="grid grid-cols-3 gap-px bg-line-strong border border-line-strong mb-0">
          <div className="bg-ink-2 p-5">
            <div className="eyebrow mb-2">Spent</div>
            <div className="font-display text-2xl text-ember">{spent > 0 ? Number(spent).toLocaleString("en-IQ") + " IQD" : "— IQD"}</div>
          </div>
          <div className="bg-ink-2 p-5">
            <div className="eyebrow mb-2">Planned est.</div>
            <div className="font-display text-2xl text-bone-dim">{planned > 0 ? Number(planned).toLocaleString("en-IQ") + " IQD" : "— IQD"}</div>
          </div>
          <div className="bg-ink-2 p-5">
            <div className="eyebrow mb-2">Total committed</div>
            <div className="font-display text-2xl text-bone">{total > 0 ? Number(total).toLocaleString("en-IQ") + " IQD" : "— IQD"}</div>
          </div>
        </div>
        <div className="h-0.5 bg-line-strong mb-12">
          <div className="h-full bg-ember-soft transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>

        {/* ══ ACQUIRED ══ */}
        <SectionHead title="Acquired" count={state.bought.length} />

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr>
              <Th>Item</Th><Th>Category</Th><Th right>Price paid</Th><Th right>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {state.bought.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-9 font-display italic text-sm text-bone-mute border-b border-line">nothing acquired yet</td></tr>
            ) : state.bought.map((item, i) => (
              <tr key={item.id} className={`group transition-colors hover:bg-ember-glow ${editBI === i ? "bg-ember-glow" : ""}`}>
                <td className="py-4 px-4 border-b border-line">
                  <div className="font-sans text-sm font-medium text-bone">{item.name}</div>
                  {item.note && <div className="font-mono-tight text-[11px] text-bone-dim mt-1">{item.note}</div>}
                  {item.date && <div className="font-mono-tight text-[9px] text-bone-mute mt-0.5">{item.date}</div>}
                </td>
                <td className="py-4 px-4 border-b border-line"><CatBadge cat={item.cat} /></td>
                <td className="py-4 px-4 border-b border-line text-right font-mono-tight text-sm font-bold text-ember">{fmt(item.price) || <span className="text-bone-mute">—</span>}</td>
                <td className="py-4 px-4 border-b border-line text-right whitespace-nowrap">
                  <IBtn icon={<Pencil size={13} />} onClick={() => openEditBought(i)} />
                  <IBtn icon={<ArrowUp size={13} />} onClick={() => moveBoughtToWish(i)} />
                  <IBtn icon={<Trash2 size={13} />} onClick={() => deleteBought(i)} danger />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bought form */}
        {showBF && (
          <div className="bg-ink-2 border border-line-strong border-t-2 border-t-ember-soft p-5 mb-3 animate-in fade-in duration-200">
            <div className="eyebrow text-ember! mb-4">— {editBI !== null ? "edit" : "add acquired"} item</div>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 mb-3">
              <Field label="Item name" value={bf.name} onChange={v => setBf({ ...bf, name: v })} placeholder="Attack Shark X98 Pro" />
              <FieldSelect label="Category" value={bf.cat} onChange={v => setBf({ ...bf, cat: v })} options={CATS} />
              <Field label="Price paid (IQD)" value={bf.price} onChange={v => setBf({ ...bf, price: v })} placeholder="103000" type="number" />
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-3 mb-4">
              <Field label="Note" value={bf.note} onChange={v => setBf({ ...bf, note: v })} placeholder="e.g. includes delivery from…" />
              <Field label="Date" value={bf.date} onChange={v => setBf({ ...bf, date: v })} type="date" />
            </div>
            <div className="flex gap-2">
              <Btn primary onClick={saveBought}><Save size={12} /> Save</Btn>
              <Btn onClick={() => { setShowBF(false); setEditBI(null) }}><X size={12} /> Cancel</Btn>
            </div>
          </div>
        )}
        <button onClick={openAddBought} className="w-full border border-dashed border-line-strong text-bone-mute font-mono-tight text-[9px] uppercase tracking-[0.16em] py-3 px-4 text-left hover:border-ember-soft hover:text-ember transition-all mb-12">
          <Plus size={12} className="inline mr-2" /> Add acquired item
        </button>

        {/* ══ PLANNED ══ */}
        <SectionHead title="Planned" count={state.wish.length} />

        <table className="w-full border-collapse mb-2">
          <thead>
            <tr>
              <Th>Item</Th><Th>Category</Th><Th right>Est. price</Th><Th right>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {state.wish.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-9 font-display italic text-sm text-bone-mute border-b border-line">nothing planned yet</td></tr>
            ) : state.wish.map((item, i) => (
              <tr key={item.id} className={`group transition-colors hover:bg-ember-glow ${editWI === i ? "bg-ember-glow" : ""} ${item.status === "hold" && editWI !== i ? "opacity-55" : ""}`}>
                <td className="py-4 px-4 border-b border-line">
                  <div className="font-sans text-sm font-medium text-bone flex items-center gap-2 flex-wrap">
                    {item.name}
                    <PrioBadge priority={item.priority} />
                    <StatusBadge status={item.status} />
                  </div>
                  {item.note && <div className="font-mono-tight text-[11px] text-bone-dim mt-1">{item.note}</div>}
                </td>
                <td className="py-4 px-4 border-b border-line"><CatBadge cat={item.cat} /></td>
                <td className={`py-4 px-4 border-b border-line text-right font-mono-tight text-sm ${item.price > 0 ? "font-bold text-bone-dim" : "italic text-bone-mute text-xs"}`}>
                  {fmt(item.price) || "TBD"}
                </td>
                <td className="py-4 px-4 border-b border-line text-right whitespace-nowrap">
                  <IBtn icon={<Pencil size={13} />} onClick={() => openEditWish(i)} />
                  <IBtn icon={<Check size={13} />} onClick={() => wishToBought(i)} />
                  <IBtn icon={<Trash2 size={13} />} onClick={() => deleteWish(i)} danger />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Wish form */}
        {showWF && (
          <div className="bg-ink-2 border border-line-strong border-t-2 border-t-ember-soft p-5 mb-3 animate-in fade-in duration-200">
            <div className="eyebrow text-ember! mb-4">— {editWI !== null ? "edit" : "add planned"} item</div>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 mb-3">
              <Field label="Item name" value={wf.name} onChange={v => setWf({ ...wf, name: v })} placeholder="e.g. RTX 5080" />
              <FieldSelect label="Category" value={wf.cat} onChange={v => setWf({ ...wf, cat: v })} options={CATS} />
              <Field label="Est. price (0 = TBD)" value={wf.price} onChange={v => setWf({ ...wf, price: v })} placeholder="0" type="number" />
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-3 mb-4">
              <Field label="Note" value={wf.note} onChange={v => setWf({ ...wf, note: v })} placeholder="notes…" />
              <div className="flex flex-col gap-3">
                <FieldSelect label="Priority" value={wf.priority} onChange={v => setWf({ ...wf, priority: v as any })} options={["high", "medium", "low"]} />
                <FieldSelect label="Status" value={wf.status} onChange={v => setWf({ ...wf, status: v as any })} options={["next", "hold", "tbd"]} />
              </div>
            </div>
            <div className="flex gap-2">
              <Btn primary onClick={saveWish}><Save size={12} /> Save</Btn>
              <Btn onClick={() => { setShowWF(false); setEditWI(null) }}><X size={12} /> Cancel</Btn>
            </div>
          </div>
        )}
        <button onClick={openAddWish} className="w-full border border-dashed border-line-strong text-bone-mute font-mono-tight text-[9px] uppercase tracking-[0.16em] py-3 px-4 text-left hover:border-ember-soft hover:text-ember transition-all mb-16">
          <Plus size={12} className="inline mr-2" /> Add planned item
        </button>

        {/* ── Footer ── */}
        <footer className="border-t border-line-strong pt-6 flex items-center justify-between">
          <span className="font-mono-tight text-[9px] tracking-widest text-bone-mute">Stored locally · no cloud · no account</span>
          <span className="font-mono-tight text-[9px] tracking-widest text-bone-mute">
            {state.updatedAt ? `last saved ${new Date(state.updatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : "—"}
          </span>
        </footer>
      </div>

      {/* Bottom strip */}
      <div className="fixed bottom-0 left-0 right-0 z-20 h-6 border-t border-line flex items-center px-8 lg:px-12 text-[10px] font-mono-tight uppercase tracking-[0.2em] text-bone-mute bg-ink/70 backdrop-blur-sm">
        <span className="text-bone-dim">TRK</span>
        <span className="mx-3 text-bone-mute/40">/</span>
        <span>銭</span>
        <span className="mx-3 text-bone-mute/40">·</span>
        <span className="text-bone-dim">UPGRADE TRACKER</span>
        <span className="ml-auto hidden md:inline">DYARI ALI TAHIR · 2026</span>
      </div>
    </main>
  )
}

/* ── Shared components ─────────────────────────────── */
function SectionHead({ title, count }: { title: string; count: number }) {
  return (
    <>
      <div className="flex items-center gap-3 py-5">
        <span className="font-display italic text-sm text-bone-dim whitespace-nowrap">{title}</span>
        <span className="font-mono-tight text-[8px] tracking-[0.14em] uppercase text-bone-mute border border-line-strong px-2 py-0.5">{count}</span>
        <span className="flex-1 h-px bg-line-strong" />
      </div>
      <div className="h-px bg-line-strong" />
    </>
  )
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`font-mono-tight text-[9px] tracking-[0.16em] uppercase text-bone-mute font-normal pb-2.5 px-4 border-b border-line-strong ${right ? "text-right" : "text-left"}`}>
      {children}
    </th>
  )
}

function CatBadge({ cat }: { cat: string }) {
  return (
    <span className="font-mono-tight text-[8px] tracking-widest uppercase text-bone-dim border border-line-strong px-2 py-1 bg-ink-3">
      {cat}
    </span>
  )
}

function PrioBadge({ priority }: { priority: string }) {
  const c = priority === "high" ? "text-ember" : priority === "medium" ? "text-bone-mute" : "text-bone-mute/50"
  return <span className={`font-mono-tight text-[8px] tracking-widest uppercase ${c}`}>{priority}</span>
}

function StatusBadge({ status }: { status: string }) {
  if (status === "next") return <span className="font-mono-tight text-[8px] tracking-widest uppercase text-ember ml-1">▶ next up</span>
  if (status === "hold") return <span className="font-mono-tight text-[8px] tracking-widest uppercase text-bone-mute border border-line-strong px-1.5 py-px ml-1">on hold</span>
  return null
}

function IBtn({ icon, onClick, danger }: { icon: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`p-1.5 text-bone-mute transition-colors ${danger ? "hover:text-ember" : "hover:text-bone"}`}
    >
      {icon}
    </button>
  )
}

function Field({ label, value, onChange, placeholder, type }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="eyebrow block mb-1.5">{label}</label>
      <input
        type={type || "text"} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-ink border border-line-strong text-bone font-mono-tight text-xs px-3 py-2.5 focus:border-ember-soft focus:outline-none transition-colors placeholder:text-bone-mute/40"
      />
    </div>
  )
}

function FieldSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="eyebrow block mb-1.5">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-ink border border-line-strong text-bone font-mono-tight text-xs px-3 py-2.5 focus:border-ember-soft focus:outline-none transition-colors appearance-none"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Btn({ children, primary, onClick }: { children: React.ReactNode; primary?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-mono-tight text-[9px] tracking-[0.16em] uppercase px-5 py-2.5 border transition-all ${
        primary
          ? "bg-ember-soft border-ember-soft text-bone hover:bg-ember hover:border-ember"
          : "bg-transparent border-line-strong text-bone-mute hover:border-bone-dim hover:text-bone"
      }`}
    >
      {children}
    </button>
  )
}
