import { Cpu } from "lucide-react"

export default function SystemWidget() {
  return (
    <div className="col-span-2 h-32 rounded-3xl bg-zinc-800/60 backdrop-blur-xl border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden group">
      <div className="flex justify-between items-start z-10">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">System</span>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-zinc-400" />
              <div className="h-1.5 flex-1 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[45%] animate-[pulse_3s_infinite]" />
              </div>
          </div>
          <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>RAM: 45%</span>
              <span>UP: 12H</span>
          </div>
      </div>
    </div>
  )
}
