"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function ParallaxSection({ children, offset = 50, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        setTranslateY(scrollPercent * offset)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [offset])

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${translateY}px)` }}>
      {children}
    </div>
  )
}
