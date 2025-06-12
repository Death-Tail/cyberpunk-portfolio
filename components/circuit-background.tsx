"use client"

import { useEffect, useRef } from "react"

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawCircuitPattern()
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    // Draw circuit pattern
    function drawCircuitPattern() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set styles
      ctx.strokeStyle = "rgba(0, 255, 224, 0.1)" // Cyan
      ctx.lineWidth = 1

      const gridSize = 50
      const nodeRadius = 2

      // Create grid of points
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Add some randomness to position
          const offsetX = Math.random() * 10 - 5
          const offsetY = Math.random() * 10 - 5

          const nodeX = x + offsetX
          const nodeY = y + offsetY

          // Draw node
          if (Math.random() > 0.3) {
            ctx.beginPath()
            ctx.arc(nodeX, nodeY, nodeRadius, 0, Math.PI * 2)

            // Randomly choose color
            const colorChoice = Math.random()
            if (colorChoice < 0.33) {
              ctx.fillStyle = "rgba(0, 255, 224, 0.15)" // Cyan
            } else if (colorChoice < 0.66) {
              ctx.fillStyle = "rgba(255, 0, 255, 0.15)" // Magenta
            } else {
              ctx.fillStyle = "rgba(57, 255, 20, 0.15)" // Green
            }

            ctx.fill()

            // Connect to nearby nodes
            if (x < canvas.width - gridSize && Math.random() > 0.3) {
              // Horizontal connection
              ctx.beginPath()
              ctx.moveTo(nodeX + nodeRadius, nodeY)

              // Create path with slight curve
              const nextX = x + gridSize + (Math.random() * 10 - 5)
              const controlY = nodeY + (Math.random() * 30 - 15)

              ctx.quadraticCurveTo((nodeX + nextX) / 2, controlY, nextX, nodeY)

              ctx.stroke()
            }

            if (y < canvas.height - gridSize && Math.random() > 0.3) {
              // Vertical connection
              ctx.beginPath()
              ctx.moveTo(nodeX, nodeY + nodeRadius)

              // Create path with slight curve
              const nextY = y + gridSize + (Math.random() * 10 - 5)
              const controlX = nodeX + (Math.random() * 30 - 15)

              ctx.quadraticCurveTo(controlX, (nodeY + nextY) / 2, nodeX, nextY)

              ctx.stroke()
            }
          }
        }
      }

      // Add dot grid overlay
      ctx.fillStyle = "rgba(255, 0, 255, 0.05)" // Magenta dots
      const dotSpacing = 20

      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          if (Math.random() > 0.7) {
            ctx.beginPath()
            ctx.arc(x, y, 0.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40" style={{ pointerEvents: "none" }} />
}
