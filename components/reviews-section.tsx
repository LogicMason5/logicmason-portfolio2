"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useI18n } from "@/lib/i18n"
import { useEffect, useRef, useState, useCallback } from "react"

// ── Review data ───────────────────────────────────────────────────────────────
const reviewMeta = [
  { id: 1, name: "Michael Chen",    role: "CTO at TechCorp",                avatar: "/review1.png" },
  { id: 2, name: "Sarah Johnson",   role: "Product Manager at InnovateLab", avatar: "/review2.png" },
  { id: 3, name: "David Rodriguez", role: "Founder of StartupHub",          avatar: "/review3.png" },
  { id: 4, name: "Emily Watson",    role: "VP Engineering at DataFlow",     avatar: "/review4.png" },
  { id: 5, name: "James Anderson",  role: "CEO at FinTech Solutions",       avatar: "/review5.jpg" },
  { id: 6, name: "Lisa Martinez",   role: "Director of IT at HealthTech",   avatar: "/review6.png" },
]
const ratings = [5.0, 5.0, 4.5, 5.0, 5.0, 4.5]

// ── Hex ring card ─────────────────────────────────────────────────────────────
function HexCard({
  review,
  isFront,
  onEnter,
  onLeave,
}: {
  review: { name: string; role: string; avatar: string; rating: number; comment: string }
  isFront: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: 280,
        padding: "20px 22px",
        borderRadius: 18,
        background: isFront
          ? "linear-gradient(135deg,rgba(38,22,68,0.99) 0%,rgba(55,30,90,0.99) 100%)"
          : "linear-gradient(135deg,rgba(16,10,30,0.93) 0%,rgba(24,15,44,0.93) 100%)",
        border: isFront
          ? "1.5px solid rgba(167,139,250,0.75)"
          : "1.5px solid rgba(139,92,246,0.2)",
        boxShadow: isFront
          ? "0 0 48px rgba(139,92,246,0.38), 0 20px 60px rgba(0,0,0,0.6)"
          : "0 4px 24px rgba(0,0,0,0.4)",
        backdropFilter: "blur(16px)",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease",
        cursor: "default",
        userSelect: "none",
        pointerEvents: "auto",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 46, height: 46, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
          border: `2px solid ${isFront ? "rgba(167,139,250,0.6)" : "rgba(139,92,246,0.3)"}`,
          boxShadow: isFront ? "0 0 12px rgba(167,139,250,0.4)" : "none",
        }}>
          <img src={review.avatar} alt={review.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => { (e.target as HTMLImageElement).style.display = "none" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: isFront ? "#fff" : "#e2d9f3", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {review.name}
          </p>
          <p style={{ fontSize: 11, color: "#9d8ec0", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {review.role}
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 3,
          background: isFront ? "rgba(167,139,250,0.2)" : "rgba(139,92,246,0.12)",
          borderRadius: 8, padding: "3px 8px", flexShrink: 0,
        }}>
          <Star style={{ width: 12, height: 12, fill: "#a78bfa", color: "#a78bfa" }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa" }}>{review.rating}</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg,transparent,${isFront ? "rgba(167,139,250,0.35)" : "rgba(139,92,246,0.18)"},transparent)`,
        marginBottom: 14,
      }} />

      {/* Comment */}
      <p style={{ fontSize: 12, color: isFront ? "#d4c8f0" : "#b8a8d8", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
        "{review.comment}"
      </p>
    </div>
  )
}

// ── 3D Hexagonal ring ─────────────────────────────────────────────────────────
// 6 cards placed on a cylinder (radius R), each rotated 60° apart.
// The cylinder auto-rotates; hovering pauses it and the front card lifts.
function HexRing({ reviews }: { reviews: typeof reviewMeta & { rating: number; comment: string }[] }) {
  const N = 6
  const CARD_W = 280
  // Radius so adjacent cards don't overlap: R = (CARD_W/2) / tan(π/N)
  const R = Math.round((CARD_W / 2) / Math.tan(Math.PI / N)) + 20  // ≈ 262

  const angleRef   = useRef(0)          // current Y rotation (rad)
  const velRef     = useRef(0.006)      // auto-spin velocity
  const pausedRef  = useRef(false)
  const isDragging = useRef(false)
  const lastX      = useRef(0)
  const rafRef     = useRef<number | null>(null)

  // Which card index is currently closest to the front
  const [frontIdx, setFrontIdx] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Derived: angle per card
  const step = (Math.PI * 2) / N

  // rAF loop
  useEffect(() => {
    const loop = () => {
      if (!pausedRef.current && !isDragging.current) {
        angleRef.current += velRef.current
      }
      // Find which card faces front (angle closest to 0 mod 2π)
      const a = angleRef.current % (Math.PI * 2)
      let best = 0, bestDist = Infinity
      for (let i = 0; i < N; i++) {
        const cardAngle = (a + i * step) % (Math.PI * 2)
        // z = cos(cardAngle) — front is z=1 (angle≈0)
        const dist = Math.abs(Math.cos(cardAngle) - 1)
        if (dist < bestDist) { bestDist = dist; best = i }
      }
      setFrontIdx(best)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [step])

  // Drag
  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true
      lastX.current = "touches" in e ? e.touches[0].clientX : e.clientX
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      const dx = x - lastX.current
      angleRef.current += dx * 0.007
      velRef.current = dx * 0.007
      lastX.current = x
    }
    const onUp = () => {
      isDragging.current = false
      // Decay velocity back to auto-spin
      if (Math.abs(velRef.current) < 0.003) velRef.current = 0.006
    }
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchstart", onDown, { passive: true })
    window.addEventListener("touchmove", onMove, { passive: true })
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchstart", onDown)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [])

  const pause  = useCallback(() => { pausedRef.current = true  }, [])
  const resume = useCallback(() => { pausedRef.current = false }, [])

  // Scene dimensions
  const W = 700, H = 440

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: W, height: H, perspective: "1100px", perspectiveOrigin: "50% 48%" }}
    >
      {/* Rotating cylinder */}
      <div
        style={{
          position: "absolute",
          left: W / 2,
          top: H / 2,
          transformStyle: "preserve-3d",
          // The whole cylinder rotates on Y
          transform: `rotateX(8deg) rotateY(${angleRef.current}rad)`,
          willChange: "transform",
        }}
        // We update this via rAF below
        ref={el => {
          if (!el) return
          const update = () => {
            el.style.transform = `rotateX(8deg) rotateY(${angleRef.current}rad)`
            requestAnimationFrame(update)
          }
          requestAnimationFrame(update)
        }}
      >
        {reviews.map((r, i) => {
          const theta = i * step          // angle for this card on the cylinder
          const isFront = i === frontIdx
          const isHovered = i === hoveredIdx
          const extraZ = isHovered ? 40 : 0

          return (
            <div
              key={r.id}
              style={{
                position: "absolute",
                // Place card on cylinder surface
                transform: `rotateY(${theta}rad) translateZ(${R + extraZ}px)`,
                // Counter-rotate so card always faces outward
                // (the card itself doesn't need extra rotateY because
                //  the cylinder rotation already handles facing)
                left: -CARD_W / 2,
                top: -200,
                transition: "transform 0.35s cubic-bezier(0.34,1.4,0.64,1)",
                willChange: "transform",
              }}
            >
              <HexCard
                review={r}
                isFront={isFront || isHovered}
                onEnter={() => { setHoveredIdx(i); pause() }}
                onLeave={() => { setHoveredIdx(null); resume() }}
              />
            </div>
          )
        })}
      </div>

      {/* Bottom hint */}
      <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/35 pointer-events-none whitespace-nowrap">
        ← drag to spin →
      </p>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ReviewsSection() {
  const { tr } = useI18n()

  const reviews = reviewMeta.map((m, i) => ({
    ...m,
    rating: ratings[i],
    comment: tr.reviews[i].comment,
  }))

  const averageRating = (ratings.reduce((s, r) => s + r, 0) / ratings.length).toFixed(1)

  return (
    <section id="reviews" className="py-20 relative bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {tr.reviewsTitle}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">{tr.reviewsSubtitle}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Star className="h-6 w-6 fill-violet-400 text-violet-400" />
            <span className="text-3xl font-bold">{averageRating}</span>
            <span className="text-muted-foreground">({reviews.length} {tr.reviewsCount})</span>
          </div>
        </div>

        {/* ── Desktop: 3D hex ring ── */}
        <div className="hidden md:flex justify-center">
          <HexRing reviews={reviews as any} />
        </div>

        {/* ── Mobile: single-column stack ── */}
        <div className="md:hidden flex flex-col gap-4">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{review.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{review.role}</p>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded flex-shrink-0">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs font-bold text-primary">{review.rating}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
