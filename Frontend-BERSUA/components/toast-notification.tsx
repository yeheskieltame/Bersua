"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info" | "warning"
  duration?: number
}

export function Toast({ message, type = "info", duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-amber-500",
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-6 right-6 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up flex items-center gap-3 z-50`}
    >
      <span>{message}</span>
      <button onClick={() => setIsVisible(false)} className="hover:opacity-80">
        <X size={18} />
      </button>
    </div>
  )
}
