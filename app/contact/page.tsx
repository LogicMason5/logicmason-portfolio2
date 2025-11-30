"use client"

import { ContactSection } from "@/components/contact-section"
import { AnimatedBackground } from "@/components/animated-background"

export default function ContactPage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="pt-24">
        <ContactSection />
      </div>
    </main>
  )
}
