"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface FadeInOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeInOnScroll({ children, className = "", delay = 0 }: FadeInOnScrollProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`${isVisible ? "animate-fade-in" : "opacity-0"} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
