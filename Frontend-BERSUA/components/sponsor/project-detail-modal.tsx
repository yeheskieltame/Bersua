"use client"

import { X, Users, Target, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectDetailModalProps {
  project: any
  onClose: () => void
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Project Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Thumbnail */}
          <div className="w-full aspect-video bg-muted rounded-xl overflow-hidden">
            <img
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Description */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{project.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary/20 text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                {project.culture}
              </span>
              <span className="bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                {project.targetAudience} years
              </span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Views</p>
              <p className="font-bold text-lg">{project.views.toLocaleString()}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Retention</p>
              <p className="font-bold text-lg text-primary">{project.retention}%</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">AI Score</p>
              <p className="font-bold text-lg text-accent">{project.aiScore}/100</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Predicted ROI</p>
              <p className="font-bold text-lg text-green-600">85%</p>
            </div>
          </div>

          {/* Funding Status */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="font-bold mb-4">Funding Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Budget: Rp{(project.budget / 1000000).toFixed(0)}M</span>
                  <span className="font-bold text-primary">{project.fundedPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${project.fundedPercentage}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Rp{((project.budget * project.fundedPercentage) / 100 / 1000000).toFixed(0)}M raised • Rp
                {((project.budget * (100 - project.fundedPercentage)) / 100 / 1000000).toFixed(0)}M to go
              </p>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Target size={20} />
                Project Scope
              </h3>
              <p className="text-muted-foreground mb-4">{project.milestone}</p>
            </div>
            <div>
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Users size={20} />
                Team
              </h3>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {project.team.map((member: string, i: number) => (
                  <li key={i}>• {member}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* IP Verification */}
          {project.ipVerified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle size={20} />
                IP Verified
              </h3>
              <p className="text-sm text-green-800">Semua aset dan konten memiliki lisensi yang sah.</p>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 h-12 text-base">Fund This Project</Button>
            <Button variant="outline" className="flex-1 h-12 bg-transparent">
              Contact Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
