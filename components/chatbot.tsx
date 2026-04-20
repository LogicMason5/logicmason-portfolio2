"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react"
import { useI18n } from "@/lib/i18n"

type Message = {
  id: number
  role: "bot" | "user"
  text: string
}

// ── Knowledge base (language-aware) ────────────────────────────────────────
function buildKB(lang: string) {
  if (lang === "fr") return [
    { patterns: [/bonjour|salut|bonsoir|coucou/i], answer: "Bonjour ! 👋 Je suis l'assistant de LogicMason. Posez-moi des questions sur ses compétences, projets, services ou comment le contacter." },
    { patterns: [/compétence|technologie|stack|langage|framework|outil/i], answer: "LogicMason maîtrise :\n• **Frontend :** React, Next.js, Vue.js, Flutter\n• **Backend :** Node.js, FastAPI, Django\n• **IA/ML :** OpenAI, LangChain, NLP\n• **BDD :** PostgreSQL, Firebase, Supabase\n• **Cloud :** AWS, Vercel, Nginx" },
    { patterns: [/projet|portfolio|travail|réalisation/i], answer: "Projets notables :\n• 🍣 Fashion Sushi Bar — Next.js\n• 💰 PlasBit — Crypto (MERN + Web3)\n• 🏠 Property Finder — Flutter\n• 🤖 Thoughtly — Agent vocal IA\n• 🌍 Minami — Assistant voyage IA" },
    { patterns: [/service|offre|prestation|freelance|recruter/i], answer: "Services proposés :\n• 🌐 Développement Full-Stack\n• 📱 Applications Mobile\n• 🤖 Intégration IA & ML\n• 🔗 Architecture API\n• 🛒 E-commerce & CMS" },
    { patterns: [/contact|email|whatsapp|telegram|discord|joindre/i], answer: "Contactez LogicMason :\n• 📧 logicmason5@gmail.com\n• 💬 WhatsApp : +81 70-4485-1707\n• ✈️ Telegram : @logicmason\n• 🎮 Discord : LMason" },
    { patterns: [/prix|tarif|coût|budget|devis/i], answer: "Le tarif dépend de la portée du projet. Contactez directement via email ou WhatsApp avec les détails de votre projet pour un devis précis." },
    { patterns: [/disponible|disponibilité|temps plein|freelance/i], answer: "LogicMason est disponible pour des projets freelance et des opportunités à temps plein. Temps de réponse inférieur à 4 heures !" },
    { patterns: [/merci|super|excellent|parfait/i], answer: "De rien ! 😊 N'hésitez pas à poser d'autres questions ou à visiter la section Contact." },
    { patterns: [/au revoir|bye|à bientôt/i], answer: "Au revoir ! 👋 À bientôt !" },
  ]
  if (lang === "ja") return [
    { patterns: [/こんにちは|はじめまして|おはよう|こんばんは|やあ|hello|hi/i], answer: "こんにちは！👋 LogicMasonのアシスタントです。スキル、プロジェクト、サービス、連絡方法について何でも聞いてください！" },
    { patterns: [/スキル|技術|スタック|言語|フレームワーク|ツール/i], answer: "LogicMasonのスキル：\n• **フロントエンド：** React, Next.js, Vue.js, Flutter\n• **バックエンド：** Node.js, FastAPI, Django\n• **AI/ML：** OpenAI, LangChain, NLP\n• **データベース：** PostgreSQL, Firebase\n• **クラウド：** AWS, Vercel, Nginx" },
    { patterns: [/プロジェクト|ポートフォリオ|作品|実績/i], answer: "主なプロジェクト：\n• 🍣 Fashion Sushi Bar — Next.js\n• 💰 PlasBit — 暗号通貨 (MERN + Web3)\n• 🏠 Property Finder — Flutter\n• 🤖 Thoughtly — AIボイスエージェント\n• 🌍 Minami — AI旅行アシスタント" },
    { patterns: [/サービス|提供|フリーランス|採用/i], answer: "提供サービス：\n• 🌐 フルスタック開発\n• 📱 モバイルアプリ\n• 🤖 AI・ML統合\n• 🔗 API設計\n• 🛒 ECサイト・CMS" },
    { patterns: [/連絡|メール|whatsapp|テレグラム|ディスコード/i], answer: "連絡先：\n• 📧 logicmason5@gmail.com\n• 💬 WhatsApp: +81 70-4485-1707\n• ✈️ Telegram: @logicmason\n• 🎮 Discord: LMason" },
    { patterns: [/料金|費用|予算|見積もり/i], answer: "料金はプロジェクトの規模によって異なります。詳細はメールまたはWhatsAppでお問い合わせください。" },
    { patterns: [/ありがとう|すごい|素晴らしい/i], answer: "どういたしまして！😊 他に質問があればお気軽にどうぞ。" },
    { patterns: [/さようなら|またね|バイバイ/i], answer: "さようなら！👋 またいつでもどうぞ！" },
  ]
  // default EN
  return [
    { patterns: [/hello|hi|hey|good (morning|afternoon|evening)|howdy/i], answer: "Hey! 👋 I'm LogicMason's assistant. Ask me anything about his skills, projects, services, or how to get in touch." },
    { patterns: [/who are you|what are you|introduce yourself/i], answer: "I'm a portfolio chatbot for LogicMason — an AI, Full-Stack & Mobile Engineer." },
    { patterns: [/skill|tech|stack|language|framework|tool/i], answer: "LogicMason works across:\n• **Frontend:** React, Next.js, Vue.js, Flutter\n• **Backend:** Node.js, FastAPI, Django\n• **AI/ML:** OpenAI, LangChain, NLP\n• **Databases:** PostgreSQL, Firebase\n• **Cloud:** AWS, Vercel, Nginx" },
    { patterns: [/project|portfolio|work|built|made/i], answer: "Notable projects:\n• 🍣 Fashion Sushi Bar — Next.js\n• 💰 PlasBit — Crypto (MERN + Web3)\n• 🏠 Property Finder — Flutter\n• 🤖 Thoughtly — AI Voice Agent\n• 🌍 Minami — AI travel assistant" },
    { patterns: [/service|offer|provide|hire|freelance/i], answer: "Services:\n• 🌐 Full-Stack Web Development\n• 📱 Mobile Apps\n• 🤖 AI & ML Integration\n• 🔗 API Architecture\n• 🛒 E-commerce & CMS" },
    { patterns: [/contact|reach|email|whatsapp|telegram|discord/i], answer: "Contact LogicMason:\n• 📧 logicmason5@gmail.com\n• 💬 WhatsApp: +81 70-4485-1707\n• ✈️ Telegram: @logicmason\n• 🎮 Discord: LMason" },
    { patterns: [/price|cost|rate|budget|quote|how much/i], answer: "Pricing depends on scope. Reach out via email or WhatsApp with your project details for an accurate quote." },
    { patterns: [/available|availability|hire|open to work/i], answer: "LogicMason is available for freelance and full-time opportunities. Response time under 4 hours!" },
    { patterns: [/thank|thanks|appreciate|great|awesome/i], answer: "You're welcome! 😊 Feel free to ask anything else." },
    { patterns: [/bye|goodbye|see you|later/i], answer: "Goodbye! 👋 Come back anytime!" },
  ]
}

function getBotReply(input: string, lang: string, fallback: string): string {
  const kb = buildKB(lang)
  for (const entry of kb) {
    if (entry.patterns.some((p) => p.test(input.trim()))) return entry.answer
  }
  return fallback
}

function BotMessage({ text }: { text: string }) {
  return (
    <div className="space-y-0.5">
      {text.split("\n").map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g)
        return (
          <p key={i} className="leading-relaxed">
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="font-semibold text-violet-300">{part}</strong> : part
            )}
          </p>
        )
      })}
    </div>
  )
}

export function Chatbot() {
  const { lang, tr } = useI18n()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([{ id: 0, role: "bot", text: tr.chatbotWelcome }])
  }, [lang, tr.chatbotWelcome])

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [open, messages])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: trimmed }])
    setInput("")
    setIsTyping(true)
    setTimeout(() => {
      const reply = getBotReply(trimmed, lang, tr.chatbotFallback)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: reply }])
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle chatbot"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/40 flex items-center justify-center hover:scale-110 transition-transform duration-200"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-violet-500/20 bg-background/95 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{tr.chatbotTitle}</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/70">{tr.chatbotOnline}</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors" aria-label="Minimize">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "bot" ? "bg-violet-500/20 text-violet-400" : "bg-purple-500/20 text-purple-400"}`}>
                  {msg.role === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${msg.role === "bot" ? "bg-muted text-foreground rounded-tl-sm" : "bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-tr-sm"}`}>
                  {msg.role === "bot" ? <BotMessage text={msg.text} /> : msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-violet-400" />
                </div>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {tr.chatbotSuggestions.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} className="text-xs px-2.5 py-1 rounded-full border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-3 border-t border-border/50">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={tr.chatbotPlaceholder}
              className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-violet-500/50 placeholder:text-muted-foreground"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform"
              aria-label="Send"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}


