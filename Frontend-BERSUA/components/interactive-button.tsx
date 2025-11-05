"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type React from "react"

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  ripple?: boolean
}

export function InteractiveButton({ children, ripple = true, ...props }: InteractiveButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples((prev) => [...prev, { id, x, y }])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    }

    props.onClick?.(e)
  }

  return (
    <Button {...props} onClick={handleClick} className="relative overflow-hidden group">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple bg-white/40 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "10px",
            height: "10px",
          }}
        />
      ))}
      {children}
    </Button>
  )
}
