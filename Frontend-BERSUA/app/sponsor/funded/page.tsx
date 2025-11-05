"use client"

import { useState } from "react"
import { Eye, Calendar, TrendingUp, MessageCircle, DollarSign, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SponsorFunded() {
  const [filter, setFilter] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Ramayana: The Modern Saga",
      thumbnail: "/ramayana-epic-animation.jpg",
      culture: "Jawa",
      status: "in_production",
      fundingAmount: "Rp 50,000,000",
      fundingDate: "10 Des 2024",
      progress: 45,
      estimatedCompletion: "Mar 2025",
      roi: "+18%",
      updates: 12,
      team: "Studio Wayang Digital",
    },
    {
      id: 2,
      title: "Kerajaan Nusantara",
      thumbnail: "/indonesian-archipelago-cultural-animation.jpg",
      culture: "Sumatera",
      status: "in_production",
      fundingAmount: "Rp 75,000,000",
      fundingDate: "5 Des 2024",
      progress: 62,
      estimatedCompletion: "Feb 2025",
      roi: "+25%",
      updates: 18,
      team: "Nusantara Animation",
    },
    {
      id: 3,
      title: "Legenda Cendrawasih",
      thumbnail: "/indonesian-cultural-animation-artwork-with-wayang-.jpg",
      culture: "Papua",
      status: "completed",
      fundingAmount: "Rp 35,000,000",
      fundingDate: "20 Okt 2024",
      progress: 100,
      estimatedCompletion: "Completed",
      roi: "+32%",
      updates: 24,
      team: "Papua Creative Studio",
    },
    {
      id: 4,
      title: "Tari Saman Chronicles",
      thumbnail: "/batik-chronicles-animation-textile-patterns.jpg",
      culture: "Aceh",
      status: "pre_production",
      fundingAmount: "Rp 40,000,000",
      fundingDate: "2 Jan 2025",
      progress: 15,
      estimatedCompletion: "Mei 2025",
      roi: "Projected +22%",
      updates: 3,
      team: "Aceh Animation Collective",
    },
  ]

  const totalStats = {
    totalInvested: projects.reduce((sum, p) => sum + parseInt(p.fundingAmount.replace(/[^0-9]/g, "")), 0),
    activeProjects: projects.filter((p) => p.status === "in_production").length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    avgROI: "+24%",
  }

  const filteredProjects =
    filter === "all"
      ? projects
      : filter === "active"
        ? projects.filter((p) => p.status === "in_production" || p.status === "pre_production")
        : projects.filter((p) => p.status === "completed")

  const getStatusBadge = (status: string) => {
    const badges = {
      in_production: { label: "In Production", class: "bg-blue-100 text-blue-700" },
      pre_production: { label: "Pre-Production", class: "bg-amber-100 text-amber-700" },
      completed: { label: "Completed", class: "bg-green-100 text-green-700" },
    }
    const badge = badges[status as keyof typeof badges]
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>{badge.label}</span>
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">My Funded Projects</h1>
        <p className="text-lg text-muted-foreground">Pantau progress dan ROI dari proyek yang Anda danai</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
          <DollarSign className="text-primary mb-3" size={24} />
          <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-foreground">
            Rp {(totalStats.totalInvested / 1000000).toFixed(1)}M
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <Play className="text-accent mb-3" size={24} />
          <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
          <p className="text-2xl font-bold text-foreground">{totalStats.activeProjects}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <Eye className="text-secondary-foreground mb-3" size={24} />
          <p className="text-sm text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-bold text-foreground">{totalStats.completedProjects}</p>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-green-50 border border-green-200 rounded-xl p-6">
          <TrendingUp className="text-green-600 mb-3" size={24} />
          <p className="text-sm text-muted-foreground mb-1">Avg. ROI</p>
          <p className="text-2xl font-bold text-green-600">{totalStats.avgROI}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All Projects ({projects.length})
        </Button>
        <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")}>
          Active ({projects.filter((p) => p.status !== "completed").length})
        </Button>
        <Button variant={filter === "completed" ? "default" : "outline"} onClick={() => setFilter("completed")}>
          Completed ({totalStats.completedProjects})
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnail */}
              <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden shrink-0">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      {getStatusBadge(project.status)}
                      <span className="text-muted-foreground">{project.culture}</span>
                      <span className="text-muted-foreground">• {project.team}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <MessageCircle size={16} className="mr-2" />
                    Contact Team
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Funding Amount</p>
                    <p className="font-semibold text-foreground">{project.fundingAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Funding Date</p>
                    <p className="font-semibold text-foreground">{project.fundingDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Estimated Completion</p>
                    <p className="font-semibold text-foreground">{project.estimatedCompletion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">ROI</p>
                    <p className="font-semibold text-green-600">{project.roi}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Progress: {project.progress}%</span>
                    <span className="text-xs text-muted-foreground">{project.updates} updates posted</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Calendar size={16} className="mr-2" />
                    View Updates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground text-lg mb-4">Tidak ada proyek dalam kategori ini</p>
          <Button>Discover New Projects</Button>
        </div>
      )}
    </div>
  )
}
