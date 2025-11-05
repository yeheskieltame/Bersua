"use client"

import { TrendingUp, Lock } from "lucide-react"

interface ProjectCardsProps {
  projects: any[]
  onSelectProject: (project: any) => void
}

export default function ProjectCards({ projects, onSelectProject }: ProjectCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {projects.map((project, index) => (
        <div
          key={project.id}
          onClick={() => onSelectProject(project)}
          className="group cursor-pointer bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-slide-up border border-border"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {/* Thumbnail */}
          <div className="relative h-48 bg-muted overflow-hidden">
            <img
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              {project.status === "funded" && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Lock size={12} />
                  Fully Funded
                </div>
              )}
              {project.status === "funding" && (
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <TrendingUp size={12} />
                  Funding
                </div>
              )}
              {project.status === "discovery" && (
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Discovery</div>
              )}
            </div>

            {/* Funded Percentage Bar */}
            {project.status !== "discovery" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${project.fundedPercentage}%` }}
                />
              </div>
            )}
          </div>

          <div className="p-4">
            {/* Title */}
            <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">by {project.animator}</p>

            {/* Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Views</span>
                <span className="font-semibold text-foreground">{project.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Retention</span>
                <span className="font-semibold text-primary">{project.retention}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">AI Score</span>
                <span className="font-semibold text-accent">{project.aiScore}/100</span>
              </div>
            </div>

            {/* Funding Progress (if applicable) */}
            {project.status !== "discovery" && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold">Funded</span>
                  <span className="text-xs font-bold text-primary">{project.fundedPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${project.fundedPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Budget */}
            <div className="px-3 py-2 bg-muted/30 rounded-lg text-sm font-semibold text-foreground">
              Budget: Rp{(project.budget / 1000000).toFixed(0)}M
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
