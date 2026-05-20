"use client"

import { useEffect, useState } from "react"
import { ArchiveShell } from "@/components/archive/archive-shell"
import { ArchiveLoader } from "@/components/archive/archive-loader"

type Phase = "loading" | "out" | "shell"

const HOLD_MS = 1400 // how long the loader stays visible
const FADE_MS = 500 // how long the loader takes to fade away

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading")

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("out"), HOLD_MS)
    const t2 = window.setTimeout(() => setPhase("shell"), HOLD_MS + FADE_MS)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  return (
    <>
      {phase !== "shell" && (
        <div className={phase === "out" ? "fade-out" : ""}>
          <ArchiveLoader />
        </div>
      )}
      {phase === "shell" && (
        <div className="fade-in">
          <ArchiveShell />
        </div>
      )}
    </>
  )
}
