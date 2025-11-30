"use client"

import { HeroSection } from "@/components/hero-section"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <HeroSection />
    </main>
  )
}
