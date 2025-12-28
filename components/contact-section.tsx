"use client"

import { Mail, Github, Send, Clock, Globe } from "lucide-react"
import { SiDiscord, SiTelegram } from "react-icons/si"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const contacts = [
  {
    name: "Gmail",
    icon: Mail,
    value: "logicmason5@gmail.com",
    link: "mailto:logicmason5@gmail.com",
    color: "#EA4335",
  },
  {
    name: "GitHub",
    icon: Github,
    value: "github.com/LogicMason5",
    link: "https://github.com/LogicMason5",
    color: "#181717",
  },
  {
    name: "Discord",
    icon: SiDiscord,
    value: "LMason",
    link: "https://discord.com",
    color: "#5865F2",
  },
  {
    name: "Telegram",
    icon: SiTelegram,
    value: "@sweaver5",
    link: "https://t.me/sweaver5",
    color: "#26A5E4",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Get In Touch</h2>
          <p className="text-xl text-muted-foreground text-pretty">Let's discuss your next project</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <Card
                  key={contact.name}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                  onClick={() => window.open(contact.link, "_blank")}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${contact.color}20` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: contact.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.value}</p>
                    </div>
                    <Send className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Response Time & Availability Card */}
          <Card className="mt-12 p-6 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 border-violet-500/20">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Response Time Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold">RESPONSE TIME</h3>
                </div>
                <div className="space-y-2 pl-16">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">PRIORITY:</span>
                    <Badge className="ml-2 bg-violet-500/20 text-violet-400 border-violet-500/30">
                      HIGH
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">ETA:</span>
                    <span className="ml-2 text-sm font-semibold text-foreground">&lt; 4 HOURS</span>
                  </div>
                </div>
              </div>

              {/* Availability Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold">AVAILABILITY</h3>
                </div>
                <div className="space-y-2 pl-16">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold">24/7 MONITORING</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-semibold">GLOBAL COVERAGE</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-12 text-center">
            <Button size="lg" className="group">
              Download CV
              <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
