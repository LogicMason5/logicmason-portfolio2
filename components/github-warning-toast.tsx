"use client"
import { AlertCircle, X } from "lucide-react"

interface GitHubWarningToastProps {
  onClose: () => void
  visible: boolean
}

export function GitHubWarningToast({ onClose, visible }: GitHubWarningToastProps) {
  if (!visible) return null

  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 shadow-lg max-w-sm">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
            This project is private, so you need to enter the password.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
