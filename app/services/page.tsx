"use client"

import { ServicesSection } from "@/components/services-section"
import { AnimatedBackground } from "@/components/animated-background"

export default function ServicesPage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="pt-24">
        <ServicesSection />
      </div>
    </main>
  )
}
