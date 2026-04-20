"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Moon, Sun, Menu, X,
  Home, User, Briefcase, FolderOpen, Star, Mail,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { useState, useRef, useEffect } from "react"
import { useI18n, type Lang, flags, langLabels } from "@/lib/i18n"

const navIcons = [Home, User, Briefcase, FolderOpen, Star, Mail]
const navPaths = ["/", "/about", "/services", "/projects", "/reviews", "/contact"]

function LangSwitcher() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const langs: Lang[] = ["en", "fr", "ja"]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-violet-500/30 hover:bg-violet-500/10 transition-colors text-sm font-medium"
        aria-label="Switch language"
      >
        <span>{flags[lang]}</span>
        <span className="text-xs font-semibold text-violet-400">{langLabels[lang]}</span>
        <ChevronDown className={`w-3 h-3 text-violet-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden z-50">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-violet-500/10 transition-colors ${
                lang === l ? "text-violet-400 font-semibold bg-violet-500/5" : "text-foreground"
              }`}
            >
              <span className="text-base">{flags[l]}</span>
              <span>{langLabels[l]}</span>
              {lang === l && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { tr } = useI18n()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = navPaths.map((path, i) => ({
    label: tr.nav[i],
    path,
    Icon: navIcons[i],
  }))

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide"
          >
            ポートフォリオ
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ label, path, Icon }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:text-violet-400 relative group ${
                  pathname === path ? "text-violet-400" : "text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitcher />
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-violet-500/10">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-1 border-t border-border/30 pt-4">
            {navItems.map(({ label, path, Icon }) => (
              <Link
                key={path}
                href={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === path
                    ? "text-violet-400 bg-violet-500/10"
                    : "text-foreground hover:text-violet-400 hover:bg-violet-500/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
