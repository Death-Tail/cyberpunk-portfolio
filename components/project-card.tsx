import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  icon: ReactNode
  color: "cyan" | "magenta" | "green" | "orange"
  compact?: boolean
}

export function ProjectCard({ title, description, icon, color = "orange", compact = false }: ProjectCardProps) {
  const colorStyles = {
    cyan: {
      text: "text-cyan-400",
      shadow: "shadow-[0_0_10px_rgba(0,255,224,0.15)]",
    },
    magenta: {
      text: "text-magenta-400",
      shadow: "shadow-[0_0_10px_rgba(255,0,255,0.15)]",
    },
    green: {
      text: "text-green-400",
      shadow: "shadow-[0_0_10px_rgba(57,255,20,0.15)]",
    },
    orange: {
      text: "text-orange-500",
      shadow: "shadow-[0_0_10px_rgba(255,94,21,0.15)]",
    },
  }

  const styles = colorStyles[color]

  if (compact) {
    return (
      <div
        className={cn(
          "border p-2 rounded-sm relative overflow-hidden transition-transform hover:-translate-y-0.5",
          styles.shadow,
        )}
      >
        <div className="flex items-start gap-2">
          <div className={cn("p-1 rounded-sm")}>{icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className={cn("text-sm font-bold font-display mb-1", styles.text)}>{title}</h3>
            <p className="text-xs text-zinc-400 mb-2 font-mono line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "border p-4 rounded-md relative overflow-hidden transform transition-transform hover:-translate-y-1",
        styles.shadow,
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent"></div>

      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-sm")}>{icon}</div>

        <div>
          <h3 className={cn("text-lg font-bold font-display mb-2", styles.text)}>{title}</h3>

          <p className={cn("text-sm text-zinc-400 mb-3 font-mono", styles.text)}>{description}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-1.5 h-1.5 bg-orange-600/30 mb-1"></div>
          <div className="w-1.5 h-1.5 bg-orange-600/30"></div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent"></div>
    </div>
  )
}
