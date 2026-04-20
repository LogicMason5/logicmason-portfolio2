"use client"

import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { tr } = useI18n()

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Portfolio. {tr.footerRights}
          </p>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            {tr.footerCreatedBy}{" "}
            <span className="font-semibold bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              LogicMason
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
