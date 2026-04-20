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
import { useI18n } from "@/lib/i18n"

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
    id: 6,
    title: "Lampi AI – Confidential AI Agents for Finance Professionals",
    category: "ai" as const,
    description: "A secure AI workspace for finance teams to automate analysis",
    image: "/6.jpg",
    technologies: ["AI Agents", "RAG", "MCP", "LLMs"],
    github: "https://www.lampi.ai/",
    isPrivate: true,
    demo: "https://www.lampi.ai/",
    longDescription:
      "A confidential AI platform for finance professionals that automates complex workflows across document analysis, market intelligence, knowledge search, dashboards, and production-grade document creation with traceable citations and multi-agent orchestration.",
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
    title: "SilkPLM – Product Lifecycle Management Platform",
    category: "ai" as const,
    description: "A modern PLM platform for managing product development",
    image: "/4.jpg",
    technologies: ["SaaS", "PLM", "Cloud", "Workflow Automation"],
    github: "https://silkplm.com/",
    isPrivate: true,
    demo: "https://silkplm.com/",
    longDescription:
      "A cloud-based Product Lifecycle Management (PLM) platform designed to streamline product development, collaboration, and data management. SilkPLM helps teams manage everything from concept to production with centralized workflows, real-time collaboration, version control, and integration capabilities tailored for modern product organizations.",
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
    id: 7,
    title: "AICompar – AI Models & Tools Comparison Hub",
    category: "ai" as const,
    description: "Web platform for comparing and analyzing AI models, tools, and prompts with data-driven insights and side-by-side comparisons.",
    image: "/7.png",
    technologies: ["AI Models", "Benchmarking", "DataAnalysis", "+1"],
    github: "https://github.com/LogicMason5/AI-Composer-AI-Models-Tools-Comparison-Hub",
    isPrivate: false,
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
    technologies: ["Voice AI", "LLMs", "Speech Recognition", "Text-to-Speech", "React", "Node.js", "GSAP", "Twilio", "OpenAI"],
    github: "https://github.com/LogicMason5/Thoughtly-AI-Voice-Agents-for-Calls",
    isPrivate: true,
    demo: "https://www.thoughtly.com/",
    longDescription:
      "AI Voice Agents for Calls",
  },
  {
    id: 10,
    title: "Elsa Speak — Language Learning App",
    category: "mobile" as const,
    description: "Speak, Listen, and Learn 100+ Languages with Elsa Speak",
    image: "/10.png",
    technologies: ["React", "OpenAI", "Flutter", "TailwindCSS"],
    github: "https://github.com/LogicMason5/Elsa-Speak-Language-Learning-App",
    isPrivate: true,
    demo: "https://elsaspeak.com/en/",
    longDescription:
      "Speak, Listen, and Learn 100+ Languages with Elsa Speak",
  },
  {
    id: 2,
    title: "Holidu: Vacation Rentals",
    category: "mobile" as const,
    description: "Vacation Rentals Booking App",
    image: "/2.png",
    technologies: ["Next", "Flutter", "Typescript", "FastAPI", "Django", "Stripe", "Redis"],
    github: "https://github.com/LogicMason5/Vacation-Rentals",
    isPrivate: false,
    demo: "https://www.holidu.com/app",
    longDescription:
      "With Holidu you have access to millions of accommodations around Europe.",
  },
  {
    id: 11,
    title: "mi-6 リクルート",
    category: "ai" as const,
    description: "マイクロサービスアーキテクチャを採用した包括的なECプラットフォーム。リアルタイム在庫管理とAI搭載のレコメンデーション機能を特徴とする",
    image: "11.jpg",
    technologies: ["Machine Learning", "Materials Informatics", "Data Science"],
    github: "https://recruit.mi-6.co.jp/",
    isPrivate: true,
    demo: "https://mi-6.co.jp/",
    longDescription:
      "A Japan-based AI company specializing in materials informatics, providing both SaaS platforms and consulting services to accelerate research and development through machine learning, data analysis, and domain-specific AI solutions for chemical and materials industries.",
  },
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
    title: "Martfury – eCommerce Marketplace Platform",
    category: "fullstack" as const,
    description: "A multi-vendor eCommerce platform for online marketplaces",
    image: "/18.jpg",
    technologies: ["Laravel", "PHP", "Bootstrap", "eCommerce", "stripe"],
    github: "https://github.com/LogicMason5/eCommerce-Marketplace-Platform",
    isPrivate: false,
    demo: "https://martfury.botble.com/",
    longDescription:
      "A full-featured multi-vendor eCommerce marketplace platform built with Laravel, enabling businesses to create scalable online marketplaces. It includes vendor management, product catalogs, order processing, payment integrations, and customizable storefronts, making it suitable for building Amazon-like or niche marketplace solutions.",
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
  {
  id: 20,
  title: "PaperClue", 
  category: "ai" as const,
  description: "学術研究論文のレビューを変革するAI搭載の学術研究プラットフォーム。原稿の改善、引用の正確性、ジャーナルフォーマット、ピアレビュー形式のフィードバックを専門的に提供",
  image: "/20.jpg",
  technologies: ["AI", "LLMs", "NLP", "Semantic Search"],
  github: "https://www.paperclue.ai/",
  isPrivate: true,
  demo: "https://www.paperclue.ai/",
  longDescription:
    "An AI-powered research assistant designed to help users discover, analyze, and understand academic papers more efficiently. PaperClue enables semantic search across research content, generates summaries, extracts key insights, and supports knowledge exploration through natural language interactions, making it valuable for researchers, students, and professionals.",
  },
  {
    id: 21,
    title: "Waves – Money Management & Accounting App",
    category: "fullstack" as const,
    description: "A cloud-based accounting and financial management platform",
    image: "/21.jpg",
    technologies: ["SaaS", "Fintech", "Cloud", "Accounting Software"],
    github: "https://www.wavesapp.com/",
    isPrivate: true,
    demo: "https://www.wavesapp.com/en/kw/home",
    longDescription:
      "A cloud-based financial management platform designed for small businesses, freelancers, and entrepreneurs. Waves provides tools for invoicing, accounting, expense tracking, and financial reporting, helping users manage their finances efficiently with an intuitive interface and automated workflows.",
  },
  {
  id: 22,
  title: "WhatsApp Chatbot",
  category: "ai" as const,
  description: "An AI chatbot integrated with WhatsApp for automated conversations",
  image: "/22.png",
  technologies: ["Node.js", "WhatsApp API", "OpenAI API", "Express"],
  github: "https://github.com/LogicMason5/Whatsapp-Chatbot",
  isPrivate: false,
  longDescription:
    "An AI-powered chatbot system integrated with WhatsApp to automate real-time conversations and customer interactions. The project leverages the WhatsApp API and OpenAI models to process user messages, generate intelligent responses, and handle workflows such as support, FAQs, and lead engagement, making it suitable for business automation and conversational AI use cases.",
  },
  {
  id: 23,
  title: "Content Collector Telegram Bot",
  category: "ai" as const,
  description: "A Telegram bot for collecting and organizing content automatically",
  image: "/23.png",
  technologies: ["Python", "Telegram Bot API", "Web Scraping", "Automation"],
  github: "https://github.com/LogicMason5/content_collector_telegram_bot",
  isPrivate: false,
  demo: "https://t.me/Contentcontrollers_bot",
  longDescription:
    "A Telegram bot designed to automatically collect, organize, and manage content from various sources. It leverages the Telegram Bot API along with automation and scraping techniques to capture messages, links, and media, enabling users to build structured content repositories and streamline information gathering workflows.",
  },
  {
  id: 24,
  title: "Flamingo",
  category: "fullstack" as const,
  description: "A design-driven studio creating digital products and experiences",
  image: "/24.jpg",
  technologies: ["UI/UX Design", "Web Development", "Mobile Apps", "Product Strategy"],
  github: "https://flamingo-beret.com/",
  isPrivate: true,
  demo: "https://flamingo-beret.com/en",
  longDescription:
    "A product design and digital innovation studio focused on crafting high-quality digital experiences. Flamingo collaborates with startups and forward-thinking companies to design, prototype, and develop web and mobile products, combining strategy, user-centered design, and modern engineering to bring ideas to market effectively.",
  },

]

// Neon colour palette — vivid in both light and dark modes
const NEON_COLORS = [
  { rgb: "139,92,246",  hex: "#8b5cf6" },  // violet
  { rgb: "236,72,153",  hex: "#ec4899" },  // pink
  { rgb: "6,182,212",   hex: "#06b6d4" },  // cyan
  { rgb: "16,185,129",  hex: "#10b981" },  // emerald
  { rgb: "245,158,11",  hex: "#f59e0b" },  // amber
  { rgb: "239,68,68",   hex: "#ef4444" },  // red
  { rgb: "99,102,241",  hex: "#6366f1" },  // indigo
  { rgb: "20,184,166",  hex: "#14b8a6" },  // teal
]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all")
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [showGitHubWarning, setShowGitHubWarning] = useState(false)
  const { tr } = useI18n()

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
            {tr.projectsTitle}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            {tr.projectsSubtitle}
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
              {tr.projectsAll}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-violet-500/15 text-violet-500"}`}>
                {projects.length}
              </span>
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
              {tr.projectsFullStack}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold ${selectedCategory === "fullstack" ? "bg-white/20 text-white" : "bg-violet-500/15 text-violet-500"}`}>
                {projects.filter((p) => p.category === "fullstack").length}
              </span>
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
              {tr.projectsMobile}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold ${selectedCategory === "mobile" ? "bg-white/20 text-white" : "bg-violet-500/15 text-violet-500"}`}>
                {projects.filter((p) => p.category === "mobile").length}
              </span>
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
              {tr.projectsAI}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold ${selectedCategory === "ai" ? "bg-white/20 text-white" : "bg-violet-500/15 text-violet-500"}`}>
                {projects.filter((p) => p.category === "ai").length}
              </span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, cardIdx) => {
            const neon = NEON_COLORS[cardIdx % NEON_COLORS.length]
            const glowDefault = `0 0 0 1.5px rgba(${neon.rgb},0.55), 0 0 10px rgba(${neon.rgb},0.3), 0 0 22px rgba(${neon.rgb},0.15), 0 2px 8px rgba(0,0,0,0.15)`
            const glowHover   = `0 0 0 2px rgba(${neon.rgb},0.9), 0 0 18px rgba(${neon.rgb},0.6), 0 0 40px rgba(${neon.rgb},0.3), 0 0 70px rgba(${neon.rgb},0.12), 0 8px 24px rgba(0,0,0,0.25)`
            return (
            <Card
              key={project.id}
              className="group overflow-hidden bg-card transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                border: `1.5px solid rgba(${neon.rgb},0.6)`,
                boxShadow: glowDefault,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = glowHover
                el.style.borderColor = neon.hex
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = glowDefault
                el.style.borderColor = `rgba(${neon.rgb},0.6)`
              }}
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
                <div className="absolute top-3 left-3">
                  {project.isPrivate ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-black/60 text-amber-400 backdrop-blur-sm border border-amber-400/30">
                      <Lock className="w-3 h-3" />
                      {tr.projectsPrivateNote.split(" ")[0] === "Access" ? "Private" : tr.projectsPrivateNote.split(" ")[0]}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-black/60 text-emerald-400 backdrop-blur-sm border border-emerald-400/30">
                      <CheckCircle2 className="w-3 h-3" />
                      {tr.projectsPublicNote}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-foreground">{project.title}</h3>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
            )
          })}
        </div>

        {filteredProjects.length > 12 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-violet-500/50 hover:bg-violet-500/10"
            >
              {showAll ? tr.projectsShowLess : tr.projectsShowMore}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent
          className="max-w-3xl bg-background"
          style={(() => {
            if (!selectedProject) return {}
            const idx = displayedProjects.findIndex(p => p.id === selectedProject.id)
            const neon = NEON_COLORS[(idx >= 0 ? idx : 0) % NEON_COLORS.length]
            return {
              border: `2px solid rgba(${neon.rgb},0.85)`,
              boxShadow: [
                `0 0 0 1px rgba(${neon.rgb},0.4)`,
                `0 0 16px rgba(${neon.rgb},0.55)`,
                `0 0 40px rgba(${neon.rgb},0.3)`,
                `0 0 80px rgba(${neon.rgb},0.12)`,
                `0 24px 60px rgba(0,0,0,0.5)`,
              ].join(", "),
            }
          })()}
        >
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-foreground">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base text-foreground/70">{selectedProject.longDescription}</DialogDescription>
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
                  <h4 className="font-semibold mb-2 text-foreground">{tr.projectsTech}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-md shadow-violet-500/20">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      {tr.projectsViewDemo}
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 border-2 border-violet-500/60 text-violet-700 dark:text-violet-300 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-500 dark:hover:text-white bg-transparent">
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
                          {tr.projectsViewSource}
                        </>
                      ) : (
                        <>
                          <Code2 className="w-4 h-4" />
                          {tr.projectsViewSource}
                        </>
                      )}
                    </a>
                  </Button>
                </div>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                  selectedProject.isPrivate
                    ? "bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300"
                    : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                }`}>
                  {selectedProject.isPrivate ? (
                    <>
                      <Key className="w-3.5 h-3.5 flex-shrink-0" />
                      {tr.projectsPrivateNote}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      {tr.projectsPublicNote}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <GitHubWarningToast visible={showGitHubWarning} onClose={() => setShowGitHubWarning(false)} />
    </section>
  )
}
