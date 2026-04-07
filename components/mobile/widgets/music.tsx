// Add useRef to your imports at the top
import { Pause, Play, SkipForward, Volume2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { createAudioInstance, getAudioInstance, destroyAudioInstance, setAudioVolume, getAudioVolume } from "@/lib/audio-player";

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [volume, setVolume] = useState<number>(0.12)

  const STREAM_URL = "https://listen.moe/stream";
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
    <div className="col-span-4 h-28 rounded-3xl bg-white/20 backdrop-blur-3xl border border-white/60 p-4 flex items-center gap-6 pr-6 relative overflow-hidden shadow-2xl ring-1 ring-white/60">

      {/* Background visualizer overlay */}
      {isPlaying && (
        <div className="absolute inset-0 bg-pink-400/5 mix-blend-overlay animate-pulse" />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="text-[10px] text-stone-950/40 font-black uppercase tracking-widest leading-none">Live</div>
          {/* Mini Audio Bars */}
          {isPlaying && (
            <div className="flex items-end gap-px h-3">
              <div className="w-0.5 bg-pink-400 animate-bounce_1s_infinite h-2" />
              <div className="w-0.5 bg-pink-400 animate-bounce_1.2s_infinite h-3" />
              <div className="w-0.5 bg-pink-400 animate-bounce_0.8s_infinite h-1.5" />
            </div>
          )}
        </div>
        <div className="text-base text-stone-950 font-black truncate tracking-tighter uppercase">Listen.moe Anime</div>
        <div className="text-[11px] text-stone-800 font-bold truncate opacity-60">jpop · jrock</div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 z-10">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-stone-950 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink-950/10 ring-1 ring-white/10"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current text-pink-400" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5 text-pink-400" />
          )}
        </button>
        {/* Volume control */}
        <div className="flex items-center gap-2 ml-2">
          <Volume2 className="w-4 h-4 text-stone-950/40" />
          <input
            aria-label="Volume"
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => handleVolumeChange(Number(e.target.value) / 100)}
            className="w-24 h-1 bg-stone-950/10 rounded-full accent-pink-400"
          />
        </div>
      </div>
    </div>
  )
}

export default MusicWidget
