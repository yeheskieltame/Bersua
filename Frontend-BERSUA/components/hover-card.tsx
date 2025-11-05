"use client"

import type { ReactNode } from "react"

interface HoverCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function HoverCard({ children, className = "", onClick }: HoverCardProps) {
  return (
    <div onClick={onClick} className={`card-hover ${className} cursor-pointer group`}>
      {children}
    </div>
  )
}
