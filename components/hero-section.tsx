"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Smartphone, Brain, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { useEffect, useRef } from "react"

// ── 3D floating avatar ────────────────────────────────────────────────────────
// Uses a CSS preserve-3d container animated via rAF.
// Effect: slow continuous Y-axis rotation + gentle bob on X + floating Y drift.
// The avatar image stays sharp (HTML, not canvas).
function Avatar3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let t = 0
    const loop = () => {
      t += 0.008
      const rotY  =  t * 18                          // slow Y spin (deg)
      const rotX  =  Math.sin(t * 0.7) * 8           // gentle X tilt
      const rotZ  =  Math.sin(t * 0.4) * 3           // subtle Z roll
      const floatY = Math.sin(t * 0.9) * 10          // vertical float (px)

      if (containerRef.current) {
        containerRef.current.style.transform =
          `translateY(${floatY}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 340, height: 340, perspective: "900px", perspectiveOrigin: "50% 50%" }}
    >
      {/* Outer glow halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-pink-500/20 blur-2xl animate-pulse" />

      {/* 3D rotating stage */}
      <div
        ref={containerRef}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="relative"
      >
        {/* Orbital rings — CSS animated, layered around avatar */}
        <div
          className="absolute rounded-full border border-violet-400/30 electron-ring-1 ring-3d-shadow"
          style={{ width: 310, height: 310, top: "50%", left: "50%", transform: "translate(-50%,-50%)", transformStyle: "preserve-3d" }}
        />
        <div
          className="absolute rounded-full border border-purple-400/25 electron-ring-2 ring-3d-shadow"
          style={{ width: 310, height: 310, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateY(90deg)", transformStyle: "preserve-3d" }}
        />
        <div
          className="absolute rounded-full border border-pink-400/20 electron-ring-3 ring-3d-shadow"
          style={{ width: 310, height: 310, top: "50%", left: "50%", transform: "translate(-50%,-50%) rotateZ(60deg) rotateX(60deg)", transformStyle: "preserve-3d" }}
        />

        {/* Electrons */}
        {[
          { cls: "electron-1", color: "bg-violet-400 shadow-violet-500/60" },
          { cls: "electron-2", color: "bg-purple-400 shadow-purple-500/60" },
          { cls: "electron-3", color: "bg-pink-400   shadow-pink-500/60"   },
          { cls: "electron-4", color: "bg-violet-400 shadow-violet-500/60" },
          { cls: "electron-5", color: "bg-purple-400 shadow-purple-500/60" },
          { cls: "electron-6", color: "bg-pink-400   shadow-pink-500/60"   },
        ].map(({ cls, color }) => (
          <div
            key={cls}
            className={`absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full shadow-lg ${color} ${cls} z-[5]`}
          />
        ))}

        {/* Avatar image — counter-rotates on Y so face always looks forward */}
        <div
          className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-violet-500/70 shadow-2xl shadow-violet-500/50 bg-background/95 backdrop-blur-sm z-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full" />
          <Image
            src="/user.png"
            alt="Logic Mason"
            width={224}
            height={224}
            className="object-cover w-full h-full avatar-image relative z-10"
            priority
          />
        </div>
      </div>

      {/* Floating particles */}
      {[
        { top: "10%", left: "8%",  size: 6,  color: "#a78bfa", delay: "0s"    },
        { top: "80%", left: "12%", size: 4,  color: "#f0abfc", delay: "0.8s"  },
        { top: "15%", left: "85%", size: 5,  color: "#60a5fa", delay: "1.4s"  },
        { top: "75%", left: "80%", size: 7,  color: "#a78bfa", delay: "0.4s"  },
        { top: "50%", left: "3%",  size: 4,  color: "#f9a8d4", delay: "1.8s"  },
        { top: "45%", left: "92%", size: 5,  color: "#c4b5fd", delay: "1.1s"  },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            background: p.color,
            opacity: 0.7,
            animationDelay: p.delay,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}

// ── Hero section ──────────────────────────────────────────────────────────────
export function HeroSection() {
  const { tr } = useI18n()

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Nature background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sakura-bg.jpg"
          alt="Cherry blossom nature background"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-background/70 dark:bg-background/80" />
      </div>

      {/* Background orbs on top of image */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse z-[1]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000 z-[1]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

          {/* ── Left: text + buttons ── */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-violet-500/10 rounded-full border border-violet-500/20 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">{tr.heroBadge}</span>
              <Smartphone className="w-4 h-4 text-violet-400" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight tracking-tight">
              <span className="block text-foreground">{tr.heroLine1}</span>
              <span className="block bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
                {tr.heroLine2}
              </span>
              <span className="block text-foreground">{tr.heroLine3}</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-pretty leading-relaxed">
              {tr.heroDesc}
            </p>

            {/* ── Buttons ── */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">

              {/* Get In Touch — solid violet, always visible */}
              <Button
                size="lg"
                asChild
                className="group font-semibold shadow-lg shadow-violet-500/30 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0"
              >
                <Link href="/contact">
                  {tr.heroContact}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* View Projects — outlined, adapts to mode */}
              <Button
                size="lg"
                variant="outline"
                asChild
                className="font-semibold border-2 border-violet-500 text-violet-600 dark:text-violet-300 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-500 dark:hover:text-white bg-transparent transition-all duration-200"
              >
                <Link href="/projects">{tr.heroProjects}</Link>
              </Button>

              {/* Download CV — distinct style */}
              <Button
                size="lg"
                asChild
                className="group font-semibold border-2 border-pink-500/70 text-pink-600 dark:text-pink-300 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 dark:hover:text-white bg-transparent transition-all duration-200 shadow-sm"
                variant="outline"
              >
                <a href="/LogicMasonResume.pdf" download="LogicMasonResume.pdf">
                  <Download className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* ── Right: 3D avatar ── */}
          <div className="flex-1 flex justify-center">
            <Avatar3D />
          </div>
        </div>
      </div>
    </section>
  )
}
