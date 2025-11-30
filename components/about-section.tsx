"use client"

import { Briefcase, Code2, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
            I'm a passionate AI, Full-Stack, and Mobile Engineer with expertise in building intelligent applications
            across web, mobile, and AI platforms. With years of experience transforming complex problems into elegant
            solutions, I deliver high-quality software that exceeds expectations. Specialized in machine learning
            integration, cloud architecture, and cross-platform development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">7+ Years</h3>
            <p className="text-muted-foreground">AI, Full-Stack & Mobile Experience</p>
          </Card>

          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">100+</h3>
            <p className="text-muted-foreground">AI & Full-Stack Projects</p>
          </Card>

          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">15+</h3>
            <p className="text-muted-foreground">AI & Tech Certifications</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
