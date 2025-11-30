"use client"

import { ProjectsSection } from "@/components/projects-section"
import { AnimatedBackground } from "@/components/animated-background"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="pt-24">
        <ProjectsSection />
      </div>
    </main>
  )
}
