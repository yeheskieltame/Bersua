"use client"

import { useEffect, useState } from "react"

interface StatItem {
  label: string
  value: string
  icon: string
}

export default function Stats() {
  const [stats, setStats] = useState<StatItem[]>([])

  useEffect(() => {
    setStats([
      { label: "Creator Aktif", value: "1,234", icon: "👨‍🎨" },
      { label: "Aset NFT", value: "5,678", icon: "🎨" },
      { label: "Total GMV", value: "Rp500M", icon: "💰" },
      { label: "Budaya Terpelihara", value: "200+", icon: "🏛️" },
    ])
  }, [])

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
