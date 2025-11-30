"use client"

import { ReviewsSection } from "@/components/reviews-section"
import { AnimatedBackground } from "@/components/animated-background"

export default function ReviewsPage() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="pt-24">
        <ReviewsSection />
      </div>
    </main>
  )
}
