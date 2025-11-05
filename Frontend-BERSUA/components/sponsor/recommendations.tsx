"use client"

import { Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjectRecommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Ramayana Digital",
      animator: "@epic_studio_yogya",
      aiScore: 91,
      roi: "85%",
      image: "/public/ramayana-epic-animation.jpg",
      reason: "Highest predicted ROI based on engagement metrics",
    },
    {
      id: 2,
      title: "Borobudur: Stone Stories",
      animator: "@architect_animator_jakarta",
      aiScore: 94,
      roi: "92%",
      image: "/public/borobudur-temple.jpg",
      reason: "Premium quality content with strong IP portfolio",
    },
    {
      id: 3,
      title: "Malin Kundang 2049",
      animator: "@animator_jogja",
      aiScore: 92,
      roi: "78%",
      image: "/public/malin-kundang-legend.jpg",
      reason: "Trending content with viral potential",
    },
  ]

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Star size={24} className="text-primary" />
          Rekomendasi untuk Anda
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Proyek dengan ROI prediction tertinggi</p>
      </div>

      <div className="space-y-4 p-6">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="flex gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 overflow-hidden">
              <img
                src={rec.image || "/placeholder.svg"}
                alt={rec.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{rec.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">by {rec.animator}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold">{rec.aiScore}</span>
                  <span className="text-muted-foreground">/100 AI Score</span>
                </div>
                <div className="flex items-center gap-1 text-accent">
                  <TrendingUp size={14} />
                  <span className="font-semibold">{rec.roi} ROI</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{rec.reason}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6">
        <Button className="w-full">View All Recommendations</Button>
      </div>
    </div>
  )
}
