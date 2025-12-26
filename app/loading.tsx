"use client"

import { CyberpunkBoot } from "@/components/cyberpunk-boot"

export default function Loading() {
  // Delegate to the cyberpunk boot screen for a richer loading experience
  return <CyberpunkBoot onComplete={() => {}} />
}
