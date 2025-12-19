// Add useRef to your imports at the top
import { Pause, Play, SkipForward, Volume2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { createAudioInstance, getAudioInstance, destroyAudioInstance, setAudioVolume, getAudioVolume } from "@/lib/audio-player";

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [volume, setVolume] = useState<number>(0.12)

  const STREAM_URL = "https://play.streamafrica.net/lofiradio";
  // Initialize Audio
  useEffect(() => {
    let audio = getAudioInstance();

    if (!audio) {
      audio = createAudioInstance(STREAM_URL);
    }

    audioRef.current = audio;
    // Sync widget volume with audio instance (createAudioInstance sets a low default)
    const v = getAudioVolume()
    if (v && !Number.isNaN(v)) setVolume(v)
    audioRef.current.volume = volume

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

  const handleVolumeChange = (v: number) => {
    const vol = Math.max(0, Math.min(1, v))
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
    // Also persist to shared instance if present
    setAudioVolume(vol)
  }

  return (
    <div className="col-span-4 h-28 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/5 p-4 flex items-center gap-6 pr-6 relative overflow-hidden">

      {/* Background visualizer overlay (optional subtle touch) */}
      {isPlaying && (
        <div className="absolute inset-0 bg-neutral-500/5 mix-blend-overlay animate-pulse" />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center gap-3 mb-1">
           <div className="text-xs text-neutral-400 font-medium">Now Playing</div>
           {/* Mini Audio Bars */}
           {isPlaying && (
             <div className="flex items-end gap-2px h-3">
               <div className="w-0.5 bg-neutral-400 animate-bounce_1s_infinite h-2" />
               <div className="w-0.5 bg-neutral-400 animate-bounce_1.2s_infinite h-3" />
               <div className="w-0.5 bg-neutral-400 animate-bounce_0.8s_infinite h-1.5" />
             </div>
           )}
        </div>
        <div className="text-base text-white font-bold truncate">Lofi Hip Hop Radio</div>
        <div className="text-sm text-zinc-400 truncate">Beats to Relax/Study to</div>
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
        {/* Volume control: small icon + slider */}
        <div className="flex items-center gap-2 ml-2">
          <Volume2 className="w-4 h-4 text-zinc-300" />
          <input
            aria-label="Volume"
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => handleVolumeChange(Number(e.target.value) / 100)}
            className="w-24 h-0.5 bg-white/10 accent-emerald-400"
          />
        </div>
      </div>
    </div>
  )
}

export default MusicWidget
