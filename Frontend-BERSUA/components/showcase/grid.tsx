"use client"

import { Play, Eye, TrendingUp, Zap } from "lucide-react"

interface ShowcaseGridProps {
  showcases: any[]
  onSelectShowcase: (showcase: any) => void
}

export default function ShowcaseGrid({ showcases, onSelectShowcase }: ShowcaseGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {showcases.map((item, index) => (
        <div
          key={item.id}
          onClick={() => onSelectShowcase(item)}
          className="group cursor-pointer bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-slide-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {/* Video Thumbnail */}
          <div className="relative h-56 bg-muted overflow-hidden">
            <img
              src={item.video || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/80 group-hover:bg-primary flex items-center justify-center transform group-hover:scale-110 transition-all">
                <Play size={24} className="text-white fill-white ml-1" />
              </div>
            </div>

            {/* Info Badges */}
            <div className="absolute top-3 right-3 space-y-2">
              {item.ipVerified && (
                <div className="bg-green-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  ✅ Verified
                </div>
              )}
            </div>

            {/* Duration */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold">
              {item.duration}
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">by {item.animator}</p>

            {/* Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye size={14} />
                  {item.views.toLocaleString()} views
                </div>
                <span className="font-semibold text-primary">{item.retention}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap size={14} />
                  AI Score
                </div>
                <span className="font-bold text-accent">{item.aiScore}/100</span>
              </div>
            </div>

            {/* Trending Indicator */}
            <div className="flex items-center gap-2 text-xs text-secondary-foreground bg-secondary/20 px-3 py-1.5 rounded-full w-fit">
              <TrendingUp size={14} />
              Trending
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
