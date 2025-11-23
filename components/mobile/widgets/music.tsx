// Add useRef to your imports at the top
import { Pause, Play, SkipForward } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { createAudioInstance, getAudioInstance, destroyAudioInstance } from "@/lib/audio-player";

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const STREAM_URL = "https://play.streamafrica.net/lofiradio";
  // Initialize Audio
  useEffect(() => {
    let audio = getAudioInstance();

    if (!audio) {
      audio = createAudioInstance(STREAM_URL);
    }

    audioRef.current = audio;

    return () => {
      // Only destroy if the LAST widget unmounts
      // (example: when navigating away)
      destroyAudioInstance();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e))
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="col-span-4 h-20 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/5 p-3 flex items-center gap-4 pr-6 relative overflow-hidden">

      {/* Background visualizer overlay (optional subtle touch) */}
      {isPlaying && (
        <div className="absolute inset-0 bg-teal-500/5 mix-blend-overlay animate-pulse" />
      )}

      {/* Album Art - Only spins when playing */}
      <div className={`h-14 w-14 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-teal-900/20 transition-all duration-700 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}>
        <div className="w-4 h-4 bg-black/80 rounded-full" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center gap-2 mb-0.5">
           <div className="text-xs text-teal-400 font-medium">Now Playing</div>
           {/* Mini Audio Bars */}
           {isPlaying && (
             <div className="flex items-end gap-2px h-3">
               <div className="w-0.5 bg-teal-400 animate-bounce_1s_infinite h-2" />
               <div className="w-0.5 bg-teal-400 animate-bounce_1.2s_infinite h-3" />
               <div className="w-0.5 bg-teal-400 animate-bounce_0.8s_infinite h-1.5" />
             </div>
           )}
        </div>
        <div className="text-sm text-white font-bold truncate">Lofi Hip Hop Radio</div>
        <div className="text-xs text-zinc-400 truncate">Beats to Relax/Study to</div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 z-10">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
        <SkipForward className="w-5 h-5 text-zinc-400 hover:text-white transition-colors cursor-pointer" />
      </div>
    </div>
  )
}

export default MusicWidget
