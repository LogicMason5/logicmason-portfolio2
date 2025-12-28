"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Smartphone, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-violet-500/10 rounded-full border border-violet-500/20 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">AI, Full-Stack & Mobile Engineer</span>
              <Smartphone className="w-4 h-4 text-violet-400" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance font-cursive">
              Building{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Intelligent
              </span>
              <br />
              Digital Solutions
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-pretty leading-relaxed">
              Specializing in AI/ML integration, full-stack web applications, and cross-platform mobile development.
              Transforming ideas into intelligent, scalable digital experiences powered by modern technologies.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                asChild
                className="group bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
              >
                <Link href="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-violet-500/50 hover:bg-violet-500/10 bg-transparent"
              >
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80 atomic-3d-container" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              {/* Orbital Ring 1 - Horizontal (X-axis rotation) */}
              <div className="absolute top-1/2 left-1/2 border border-violet-500/20 rounded-full electron-ring-1 z-0 ring-3d-shadow" style={{ width: '360px', height: '360px', transform: 'translate(-50%, -50%) rotateX(0deg)', transformStyle: 'preserve-3d' }} />
              {/* Orbital Ring 2 - Vertical (Y-axis rotation) */}
              <div className="absolute top-1/2 left-1/2 border border-purple-500/20 rounded-full electron-ring-2 z-0 ring-3d-shadow" style={{ width: '360px', height: '360px', transform: 'translate(-50%, -50%) rotateY(90deg)', transformStyle: 'preserve-3d' }} />
              {/* Orbital Ring 3 - Diagonal (Z-axis rotation) */}
              <div className="absolute top-1/2 left-1/2 border border-pink-500/20 rounded-full electron-ring-3 z-0 ring-3d-shadow" style={{ width: '360px', height: '360px', transform: 'translate(-50%, -50%) rotateZ(45deg) rotateX(60deg)', transformStyle: 'preserve-3d' }} />
              
              {/* Electron 1 - Orbiting on ring 1 */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-violet-400 rounded-full shadow-lg shadow-violet-500/50 electron-1 z-[5]" />
              
              {/* Electron 2 - Orbiting on ring 2 */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50 electron-2 z-[5]" />
              
              {/* Electron 3 - Orbiting on ring 3 */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50 electron-3 z-[5]" />
              
              {/* Electron 4 - Orbiting on ring 1 (opposite side) */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-violet-400 rounded-full shadow-lg shadow-violet-500/50 electron-4 z-[5]" />
              
              {/* Electron 5 - Orbiting on ring 2 (opposite side) */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50 electron-5 z-[5]" />
              
              {/* Electron 6 - Orbiting on ring 3 (opposite side) */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50 electron-6 z-[5]" />

              {/* Nucleus - Avatar */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-violet-500/60 shadow-2xl shadow-violet-500/60 bg-background/95 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full" />
                  <Image
                    src="/user.png"
                    alt="Profile"
                    width={256}
                    height={256}
                    className="object-cover w-full h-full avatar-image relative z-10"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
