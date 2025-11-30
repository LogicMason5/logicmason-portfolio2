"use client"

import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { AnimatedBackground } from "@/components/animated-background"

export default function AboutPage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="pt-24">
        <AboutSection />
        <SkillsSection />
      </div>
    </main>
  )
}
