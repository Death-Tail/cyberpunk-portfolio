import { Cpu } from "lucide-react"

export default function SystemWidget() {
  return (
    <div className="col-span-2 h-32 rounded-3xl bg-white/40 backdrop-blur-3xl border border-white/60 p-5 flex flex-col justify-between relative overflow-hidden group shadow-xl ring-1 ring-white/40">
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] font-black text-stone-950/40 uppercase tracking-[0.2em] leading-none">Logic</span>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-pulse" />
      </div>

      <div className="space-y-4 z-10">
        <div className="flex items-center gap-3">
          <Cpu className="w-4.5 h-4.5 text-orange-400" />
          <div className="h-2 flex-1 bg-white/60 rounded-full overflow-hidden ring-1 ring-white/20">
            <div className="h-full bg-linear-to-r from-orange-400 to-amber-400 w-[68%] animate-[pulse_3s_infinite]" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-stone-950/40 font-black uppercase tracking-widest">
          <span>CPU: 68%</span>
          <span>Uptime: 4d</span>
        </div>
      </div>
    </div>
  )
}
