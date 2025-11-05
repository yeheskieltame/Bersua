"use client"

import { useState, useMemo } from "react"
import SponsorDiscoverFilters from "@/components/sponsor/discover-filters"
import ProjectCards from "@/components/sponsor/project-cards"
import ProjectDetailModal from "@/components/sponsor/project-detail-modal"

export default function SponsorDiscover() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filters, setFilters] = useState({
    budgetMin: 0,
    budgetMax: 10000000,
    targetAudience: "all",
    culture: "all",
    minScore: 80,
    sort: "trending",
    search: "",
  })

  // Mock project data
  const allProjects = [
    {
      id: 1,
      title: "Malin Kundang 2049",
      animator: "@animator_jogja",
      views: 15000,
      retention: 88,
      aiScore: 92,
      culture: "Sumatera",
      thumbnail: "/cyberpunk-malin-kundang-animation.jpg",
      ipVerified: true,
      budget: 500000000,
      targetAudience: "18-35",
      description: "Adaptasi futuristik dari legenda Malin Kundang dengan visual cyberpunk yang memukau.",
      status: "funding",
      fundedPercentage: 45,
      milestone: "Season 1 - 6 episodes",
      team: ["Animator: Studio XYZ", "Writer: Sudarna", "Composer: Ahmad"],
    },
    {
      id: 2,
      title: "Timun Mas: Legend Reborn",
      animator: "@animator_bandung",
      views: 8100,
      retention: 75,
      aiScore: 85,
      culture: "Jawa",
      thumbnail: "/timun-mas-animation-legend.jpg",
      ipVerified: true,
      budget: 300000000,
      targetAudience: "10-25",
      description: "Reinterpretasi modern dari cerita Timun Mas dengan animasi 3D yang lembut.",
      status: "discovery",
      fundedPercentage: 0,
      milestone: "Full Series - 10 episodes",
      team: ["Director: Budi", "Producer: Siti", "VFX Lead: Dani"],
    },
    {
      id: 3,
      title: "Wayang Kulit Modern",
      animator: "@animator_solo",
      views: 12000,
      retention: 82,
      aiScore: 88,
      culture: "Jawa",
      thumbnail: "/wayang-kulit-shadow-puppet-modern-art.jpg",
      ipVerified: true,
      budget: 700000000,
      targetAudience: "20-45",
      description: "Kolaborasi tradisional dan digital yang menghidupkan wayang kulit dalam format digital.",
      status: "funded",
      fundedPercentage: 100,
      milestone: "Full Documentary Series",
      team: ["Documentarian: Hardi", "Wayang Master: Dalang Sugito", "Tech Lead: Riza"],
    },
    {
      id: 4,
      title: "Borobudur: Stone Stories",
      animator: "@architect_animator_jakarta",
      views: 13200,
      retention: 87,
      aiScore: 94,
      culture: "Jawa",
      thumbnail: "/borobudur-stone-stories-3d-animation-temple.jpg",
      ipVerified: true,
      budget: 900000000,
      targetAudience: "25-55",
      description: "3D visualization dari sejarah dan arsitektur Candi Borobudur yang legendaris.",
      status: "funding",
      fundedPercentage: 70,
      milestone: "Full VR Experience + 4K Documentary",
      team: ["Architect Historian: Prof. Bambang", "3D Lead: Taufik", "Writer: Dewi"],
    },
    {
      id: 5,
      title: "Ramayana Digital",
      animator: "@epic_studio_yogya",
      views: 11500,
      retention: 85,
      aiScore: 91,
      culture: "Jawa",
      thumbnail: "/ramayana-digital-animation-epic-story.jpg",
      ipVerified: true,
      budget: 1200000000,
      targetAudience: "12-60",
      description: "Epos Ramayana diadaptasi dengan teknologi animasi terkini.",
      status: "funding",
      fundedPercentage: 55,
      milestone: "Full Series - 20 episodes HD",
      team: ["Director: Sigit", "Writer: Purwanto", "Composer: Teguh"],
    },
    {
      id: 6,
      title: "Nusantara Dreams",
      animator: "@filmmaker_bali",
      views: 6500,
      retention: 71,
      aiScore: 81,
      culture: "Bali",
      thumbnail: "/nusantara-dreams-animation-surreal.jpg",
      ipVerified: true,
      budget: 250000000,
      targetAudience: "16-40",
      description: "Perjalanan visual melalui keindahan alam dan budaya Kepulauan Nusantara.",
      status: "discovery",
      fundedPercentage: 10,
      milestone: "Pilot Episode + Mini Series",
      team: ["Filmmaker: Ketut", "Cinematographer: Made", "Editor: I Wayan"],
    },
  ]

  // Filter and sort
  const filteredProjects = useMemo(() => {
    const result = allProjects.filter((project) => {
      const budgetMatch = project.budget >= filters.budgetMin && project.budget <= filters.budgetMax
      const audienceMatch =
        filters.targetAudience === "all" || project.targetAudience.includes(filters.targetAudience.split("-")[0])
      const cultureMatch = filters.culture === "all" || project.culture === filters.culture
      const scoreMatch = project.aiScore >= filters.minScore
      const searchMatch = project.title.toLowerCase().includes(filters.search.toLowerCase())
      return budgetMatch && audienceMatch && cultureMatch && scoreMatch && searchMatch
    })

    // Sort
    switch (filters.sort) {
      case "trending":
        result.sort((a, b) => b.views * b.retention - a.views * a.retention)
        break
      case "topRated":
        result.sort((a, b) => b.aiScore - a.aiScore)
        break
      case "newest":
        result.sort((a, b) => b.id - a.id)
        break
      case "funded":
        result.sort((a, b) => b.fundedPercentage - a.fundedPercentage)
        break
    }

    return result
  }, [filters])

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-2">Discover Projects</h1>
        <p className="text-lg text-muted-foreground">Temukan proyek animasi budaya Indonesia terbaik untuk didanai</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <SponsorDiscoverFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Projects */}
        <div className="lg:col-span-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Menampilkan <span className="font-bold text-foreground">{filteredProjects.length}</span> proyek
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <ProjectCards projects={filteredProjects} onSelectProject={setSelectedProject} />
          ) : (
            <div className="bg-card rounded-xl p-12 text-center border border-border">
              <p className="text-lg text-muted-foreground">Tidak ada proyek yang sesuai dengan filter Anda.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}
