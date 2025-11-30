"use client"

import { Mail, Github, Send } from "lucide-react"
import { SiDiscord, SiTelegram } from "react-icons/si"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const contacts = [
  {
    name: "Gmail",
    icon: Mail,
    value: "contact@example.com",
    link: "mailto:contact@example.com",
    color: "#EA4335",
  },
  {
    name: "GitHub",
    icon: Github,
    value: "github.com/username",
    link: "https://github.com/username",
    color: "#181717",
  },
  {
    name: "Discord",
    icon: SiDiscord,
    value: "username#1234",
    link: "https://discord.com",
    color: "#5865F2",
  },
  {
    name: "Telegram",
    icon: SiTelegram,
    value: "@username",
    link: "https://t.me/username",
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
