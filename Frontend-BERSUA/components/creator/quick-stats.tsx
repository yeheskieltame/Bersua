"use client"

import { BarChart3, Eye, TrendingUp, DollarSign } from "lucide-react"

export default function QuickStats() {
  const stats = [
    { label: "Total Aset", value: "8", icon: BarChart3, color: "from-primary to-secondary" },
    { label: "Total Views", value: "12.5K", icon: Eye, color: "from-accent to-primary" },
    { label: "Earnings", value: "Rp1.2M", icon: DollarSign, color: "from-secondary to-accent" },
    { label: "Pending Royalty", value: "Rp50K", icon: TrendingUp, color: "from-primary to-accent" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
