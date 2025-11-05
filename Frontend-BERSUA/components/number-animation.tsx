"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { CounterAnimation } from "./counter-animation"

interface NumberAnimationProps {
  end: number
  suffix?: string
  prefix?: string
  className?: string
}

export function NumberAnimation({ end, suffix = "", prefix = "", className = "" }: NumberAnimationProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isVisible && <CounterAnimation end={end} suffix={suffix} />}
    </span>
  )
}
