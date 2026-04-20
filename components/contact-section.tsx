"use client"

import { Mail, Github, Send, Clock, Globe } from "lucide-react"
import { SiDiscord, SiTelegram, SiWhatsapp } from "react-icons/si"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"

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
    value: "@logicmason",
    link: "https://t.me/@logicmason",
    color: "#26A5E4",
  },
  {
    name: "WhatsApp",
    icon: SiWhatsapp,
    value: "+81 70-4485-1707",
    link: "https://wa.me/817044851707",
    color: "#25D366",
  },
]

export function ContactSection() {
  const { tr } = useI18n()
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{tr.contactTitle}</h2>
          <p className="text-xl text-muted-foreground text-pretty">{tr.contactSubtitle}</p>
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
                  <h3 className="text-xl font-semibold">{tr.contactResponseTime}</h3>
                </div>
                <div className="space-y-2 pl-16">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">{tr.contactPriority}</span>
                    <Badge className="ml-2 bg-violet-500/20 text-violet-400 border-violet-500/30">
                      {tr.contactHigh}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">{tr.contactETA}</span>
                    <span className="ml-2 text-sm font-semibold text-foreground">&lt; 4 {tr.contactETA === "ETA:" ? "HOURS" : tr.contactETA === "DÉLAI :" ? "HEURES" : "時間"}</span>
                  </div>
                </div>
              </div>

              {/* Availability Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{tr.contactAvailability}</h3>
                </div>
                <div className="space-y-2 pl-16">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold">{tr.contactMonitoring}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-semibold">{tr.contactGlobal}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-12 text-center">
            <Button size="lg" className="group">
              {tr.contactDownloadCV}
              <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
