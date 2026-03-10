"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GitHubWarningToast } from "@/components/github-warning-toast"
import { ExternalLink, Code2, Lock, CheckCircle2, Key } from "lucide-react"
import Image from "next/image"

type ProjectCategory = "all" | "fullstack" | "mobile" | "ai"

const projects = [
  {
    id: 1,
    title: "Five Group – Fun-Driven Food Lifestyle Company",
    category: "fullstack" as const,
    description: "株式会社ファイブグループの採用サイト。",
    image: "/1.png",
    technologies: ["Vue.js", "Nuxt.js", "Firebase", "PostgreSQL"],
    github: "https://github.com/LogicMason5/Five-Group-Fun--Driven-Food-Lifestyle-Company",
    isPrivate: false,
    demo: "https://recruit.five-group.co.jp/",
    longDescription:
      "株式会社ファイブグループの採用サイト。「楽しいでつながる世界をつくる」をビジョンに、飲食業を通じてキャリアアップや成長ができる環境を提供しています",
  },
  {
    id: 2,
    title: "Holidu: Vacation Rentals",
    category: "fullstack" as const,
    description: "Vacation Rentals Booking App",
    image: "/2.png",
    technologies: ["Next", "Typescript", "FastAPI", "Django", "Stripe", "Redis"],
    github: "https://github.com/LogicMason5/Holidu",
    isPrivate: true,
    demo: "https://www.holidu.com/app",
    longDescription:
      "With Holidu you have access to millions of accommodations around Europe.",
  },
  {
    id: 3,
    title: "Fashion Sushi Bar – Online Sushi Restaurant",
    category: "fullstack" as const,
    description: "Online Sushi Restaurant",
    image: "/3.png",
    technologies: ["Next", "Typescript", "TailwindCSS", "Node.js"],
    github: "https://github.com/LogicMason5/Fashion-Sushi-Bar",
    isPrivate: false,
    demo: "https://sushi-restaurant.rashidshamloo.com/",
    longDescription:
      "Online Sushi Restaurant",
  },
  {
    id: 4,
    title: "BrighterVPN",
    category: "mobile" as const,
    description: "BrighterVPN protects your data with advanced encryption and guarantees zero logging of your activities, ensuring that your online activities are private and secure.",
    image: "/4.png",
    technologies: ["ReactNative", "Typescript", "Firebase", "Expo"],
    github: "https://github.com/LogicMason5/BrighterVPN",
    isPrivate: true,
    demo: "https://play.google.com/store/apps/details?id=com.brighter.vpn.app&hl=en",
    longDescription:
      "BrighterVPN protects your data with advanced encryption and guarantees zero logging of your activities, ensuring that your online activities are private and secure.",
  },
  {
    id: 5,
    title: "PlasBit – Crypto Wallet & Exchange Platform",
    category: "fullstack" as const,
    description: "A full-stack cryptocurrency platform offering exchange",
    image: "/5.png",
    technologies: ["MERN", "Meteor.js", "Web3"],
    github: "https://github.com/LogicMason5/Plasbit",
    isPrivate: true,
    demo: "https://plasbit.com/",
    longDescription:
      "A full-stack cryptocurrency platform offering exchange, wallet, bank-transfer and crypto-linked card services with in-house custody and PCI DSS security.",
  },
  {
    id: 6,
    title: "Solar Card",
    category: "mobile" as const,
    description: "The Solar Card is a cutting-edge financial tool designed to seamlessly integrate digital assets into everyday spending.",
    image: "/6.png",
    technologies: ["Flutter", "Dart", "Firebase", "Stripe"],
    github: "https://github.com/LogicMason5/Solar-Card",
    isPrivate: true,
    demo: "https://play.google.com/store/apps/details?id=app.solarcard.ionic&hl=en&pli=1",
    longDescription:
      "The Solar Card is a cutting-edge financial tool designed to seamlessly integrate digital assets into everyday spending.",
  },
  {
    id: 7,
    title: "AICompar – AI Models & Tools Comparison Hub",
    category: "ai" as const,
    description: "Web platform for comparing and analyzing AI models, tools, and prompts with data-driven insights and side-by-side comparisons.",
    image: "/7.png",
    technologies: ["AI Models", "Benchmarking", "DataAnalysis", "+1"],
    github: "https://github.com/LogicMason5/AICompar",
    isPrivate: true,
    demo: "https://aicompar.com/",
    longDescription:
      "A scalable video streaming platform with adaptive bitrate streaming, content delivery network integration, user authentication, subscription management, and personalized recommendations powered by machine learning.",
  },
  {
    id: 8,
    title: "Property Finder – A Home for Every Life",
    category: "mobile" as const,
    description: "Explore 350,000+ homes, get instant alerts, and connect with top super agents, FAST.",
    image: "/8.png",
    technologies: ["Flutter", "Node.js", "PostgreSQL", "AWS", "GoogleMaps API"],
    github: "https://github.com/LogicMason5/Property-Finder",
    isPrivate: true,
    demo: "https://play.google.com/store/apps/details?id=ae.propertyfinder.propertyfinder",
    longDescription:
      "Explore 350,000+ homes, get instant alerts, and connect with top super agents, FAST.",
  },
  {
    id: 9,
    title: "Thoughtly — AI Voice Agent Platform",
    category: "ai" as const,
    description: "AI Voice Agents for Calls",
    image: "/9.png",
    technologies: ["React", "Node.js", "GSAP", "Twilio", "OpenAI"],
    github: "https://github.com/LogicMason5/Thoughtly-AI-Voice-Agents-for-Calls",
    isPrivate: true,
    demo: "https://www.thoughtly.com/",
    longDescription:
      "AI Voice Agents for Calls",
  },
  {
    id: 10,
    title: "Elsa Speak — Language Learning App",
    category: "ai" as const,
    description: "Speak, Listen, and Learn 100+ Languages with Elsa Speak",
    image: "/10.png",
    technologies: ["React", "OpenAI", "Flutter", "TailwindCSS"],
    github: "https://github.com/LogicMason5/Elsa-Speak-Language-Learning-App",
    isPrivate: true,
    demo: "https://elsaspeak.com/en/",
    longDescription:
      "Speak, Listen, and Learn 100+ Languages with Elsa Speak",
  },
  // {
   // id: 11,
  //  title: "Apple Health",
 //   category: "mobile" as const,
  //  description: "The Apple Health app provides a central and secure place for your health data.",
 //   image: "/11.png",
//    technologies: ["React Native", "Supabase", "Prisma", "REST API", "TailwindCSS", "Expo"],
//    github: "https://github.com/LogicMason5/App-Health",
//    isPrivate: true,
//    demo: "https://apps.apple.com/us/app/apple-health/id1242545199",
//    longDescription:
 //     "The Apple Health app provides a central and secure place for your health data.",
 // },
  {
    id: 12,
    title: "Zoundz — Pet Anxiety Therapeutic",
    category: "mobile" as const,
    description: "Zoundz is a pet anxiety therapeutic app that helps pets relax and sleep better.",
    image: "/12.png",
    technologies: ["React Native", "Node.js", "SendGrid", "TailwindCSS"],
    github: "https://github.com/LogicMason5/Zoundz-Pet-Anxiety-Therapeutic",
    isPrivate: true,
    demo: "https://apps.apple.com/ca/app/zoundz-pet-anxiety-therapeutic/id1554036162",
    longDescription:
      "Zoundz is a pet anxiety therapeutic app that helps pets relax and sleep better.",
  },
  {
    id: 13,
    title: "Abel Fragrance — Perfume Store",
    category: "fullstack" as const,
    description: "Abel Fragrance is a perfume store that sells a variety of perfumes and fragrances.",
    image: "/13.png",
    technologies: ["Shopify", "GadgetFlow", "React"],
    github: "https://github.com/LogicMason5/Abel-Fragrance-Perfume-Store",
    isPrivate: true,
    demo: "https://abelfragrance.com/",
    longDescription:
      "Abel Fragrance is a perfume store that sells a variety of perfumes and fragrances.",
  },
  {
    id: 14,
    title: "Minami — AI Travel Assistant",
    category: "ai" as const,
    description: "Minami is an AI travel assistant that helps you plan your trip.",
    image: "/14.png",
    technologies: ["Astro", "TailwindCSS", "ML Model", "NLP", "Supabase", "AWS"],
    github: "https://github.com/LogicMason5/Minami-AI",
    isPrivate: true,
    demo: "https://minami.ai/",
    longDescription:
      "Minami is an AI travel assistant that helps you plan your trip.",
  },
  {
    id: 15,
    title: "Mimi Hair Salon",
    category: "fullstack" as const,
    description: "Mimi Hair Salon is a hair salon that provides a variety of hair services.",
    image: "/15.png",
    technologies: ["Wordpress", "Ngnix", "MySQL"],
    github: " https://github.com/LogicMason5/Mimi-Hair-Salon-AI-Content-Generation-Platform",
    isPrivate: true,
    demo: "https://mimi-hairsalon.com/",
    longDescription:
      "Mimi Hair Salon is a hair salon that provides a variety of hair services.",
  },
  {
    id: 16,
    title: "Swiz — Find Your Tribe",
    category: "mobile" as const,
    description: "Swiz is a social media platform that helps you find your tribe.",
    image: "/16.png",
    technologies: ["React Native", "Firebase", "Python"],
    github: "https://github.com/LogicMason5/Swiz-Find-Your-Tribe",
    isPrivate: true,
    demo: "https://apps.apple.com/in/app/swiz-find-your-tribe/id1577166087",
    longDescription:
      "Swiz is a social media platform that helps you find your tribe.",
  },
  {
    id: 17,
    title: "Famulor — AI Project Management Tool",
    category: "ai" as const,
    description: "Famulor is an AI-powered project management tool that helps you manage your projects.",
    image: "/17.png",
    technologies: ["Next.js", "Node.js", "Socket.io", "OpenAI", "LangChain"],
    github: "https://github.com/LogicMason5/Famulor-Project-Management-Tool",
    isPrivate: true,
    demo: "https://www.famulor.io/",
    longDescription:
      "Famulor is an AI-powered project management tool that helps you manage your projects.",
  },
  {
    id: 18,
    title: "NF Prompt — AI-Powered Wellness App",
    category: "fullstack" as const,
    description: "NF Prompt is an AI-powered wellness app that helps you meditate and relax.",
    image: "/18.png",
    technologies: ["Vue.js", "Nuxt.js", "Umami"],
    github: "https://github.com/LogicMason5/NF-Prompt-AI-Powered-Wellness-App",
    isPrivate: true,
    demo: "https://nfprompt.io/",
    longDescription:
      "NF Prompt is an AI-powered wellness app that helps you meditate and relax.",
  },
  {
    id: 19,
    title: "Dobson Ranch Golf Course — Golf Course Booking System",
    category: "fullstack" as const,
    description: "Secure file storage and sharing with end-to-end encryption",
    image: "/19.png",
    technologies: ["Wordpress", "Ngnix", "MySQL"],
    github: "https://github.com/LogicMason5/Dobson-Ranch-Golf-Course",
    isPrivate: true,
    demo: "https://www.dobsonranchgolfclub.com/",
    longDescription:
      "Dobson Ranch Golf Course is a golf course that provides a variety of golf services.",
  },
  //{
  //  id: 20,
  //  title: "TechnofuturTIC – Digital Skills & IT Training Centre",
 //   category: "fullstack" as const,
 //   description: "TechnofuturTIC is a digital skills and IT training centre that provides a variety of digital skills and IT training services.",
//    image: "/20.png",
 //   technologies: ["Wordpress", "Ngnix", "PostgreSQL", "GSAP"],
//    github: "https://github.com/LogicMason5/Gaming-Community-App",
//    isPrivate: true,
//    demo: "https://technofuturtic.be/",
//    longDescription:
//      "TechnofuturTIC is a digital skills and IT training centre that provides a variety of digital skills and IT training services.",
//  },
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all")
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [showGitHubWarning, setShowGitHubWarning] = useState(false)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory,
  )

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 12)

  const handleGitHubClick = (e: React.MouseEvent<HTMLAnchorElement>, isPrivate: boolean) => {
    if (isPrivate) {
      e.preventDefault()
      setShowGitHubWarning(true)
      setTimeout(() => setShowGitHubWarning(false), 5000)
    }
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            Showcasing innovative solutions across mobile, web, and AI platforms
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              All Projects
            </Button>
            <Button
              variant={selectedCategory === "fullstack" ? "default" : "outline"}
              onClick={() => setSelectedCategory("fullstack")}
              className={
                selectedCategory === "fullstack"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              Full-Stack
            </Button>
            <Button
              variant={selectedCategory === "mobile" ? "default" : "outline"}
              onClick={() => setSelectedCategory("mobile")}
              className={
                selectedCategory === "mobile"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              Mobile
            </Button>
            <Button
              variant={selectedCategory === "ai" ? "default" : "outline"}
              onClick={() => setSelectedCategory("ai")}
              className={
                selectedCategory === "ai"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "border-violet-500/50 hover:bg-violet-500/10"
              }
            >
              AI
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length > 12 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-violet-500/50 hover:bg-violet-500/10"
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-xl border-border">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base">{selectedProject.longDescription}</DialogDescription>
              </DialogHeader>
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="flex-1">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => handleGitHubClick(e, selectedProject.isPrivate)}
                      className="flex items-center justify-center gap-2"
                    >
                      {selectedProject.isPrivate ? (
                        <>
                          <Lock className="w-4 h-4" />
                          View Source
                        </>
                      ) : (
                        <>
                          <Code2 className="w-4 h-4" />
                          View Source
                        </>
                      )}
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {selectedProject.isPrivate ? (
                    <>
                      <Key className="w-3 h-3" />
                      Access to GitHub repositories requires user's permission.
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Public repository
                    </>
                  )}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <GitHubWarningToast visible={showGitHubWarning} onClose={() => setShowGitHubWarning(false)} />
    </section>
  )
}
