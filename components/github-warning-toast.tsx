"use client"
import { Lock, X } from "lucide-react"

interface GitHubWarningToastProps {
  onClose: () => void
  visible: boolean
}

export function GitHubWarningToast({ onClose, visible }: GitHubWarningToastProps) {
  if (!visible) return null

  return (
    <div className="fixed top-6 right-6 z-[9999] animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start gap-3 rounded-xl p-4 shadow-2xl max-w-sm"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
          border: "1.5px solid rgba(167,139,250,0.5)",
          boxShadow: "0 8px 32px rgba(109,40,217,0.45), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Icon */}
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Lock className="w-4 h-4 text-white" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white leading-snug mb-0.5">
            Private Repository
          </p>
          <p className="text-xs text-white/85 leading-relaxed">
            This project is private. Access to the GitHub repository requires the owner's permission.
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="text-white/70 hover:text-white transition-colors flex-shrink-0 mt-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
