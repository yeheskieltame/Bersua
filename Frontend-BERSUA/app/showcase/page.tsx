"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Upload } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import ShowcaseFilters from "@/components/showcase/filters"
import ShowcaseGrid from "@/components/showcase/grid"
import ShowcaseDetail from "@/components/showcase/detail"

export default function Showcase() {
  const [selectedShowcase, setSelectedShowcase] = useState(null)
  const [filters, setFilters] = useState({
    culture: "all",
    minScore: 80,
    minRetention: 0,
    sort: "trending",
    search: "",
  })

  // Mock data - would come from API
  const allShowcases = [
    {
      id: 1,
      title: "Malin Kundang 2049",
      animator: "@animator_jogja",
      views: 15000,
      retention: 88,
      aiScore: 92,
      culture: "Sumatera",
      video: "/malin-kundang-2049-cyberpunk-animation.jpg",
      description: "Adaptasi futuristik dari legenda Malin Kundang dengan visual cyberpunk yang memukau.",
      usedAssets: ["#1234", "#5678", "#9101"],
      ipVerified: true,
      duration: "5:23",
      tags: ["Cyberpunk", "Drama", "Legend", "Epic"],
    },
    {
      id: 2,
      title: "Timun Mas: Legend Reborn",
      animator: "@animator_bandung",
      views: 8100,
      retention: 75,
      aiScore: 85,
      culture: "Jawa",
      video: "/timun-mas-animation-legend.jpg",
      description: "Reinterpretasi modern dari cerita Timun Mas dengan animasi 3D yang lembut.",
      usedAssets: ["#2345", "#6789"],
      ipVerified: true,
      duration: "7:45",
      tags: ["Adventure", "3D", "Fantasy"],
    },
    {
      id: 3,
      title: "Wayang Kulit Modern",
      animator: "@animator_solo",
      views: 12000,
      retention: 82,
      aiScore: 88,
      culture: "Jawa",
      video: "/wayang-kulit-modern-animation-shadow-puppet.jpg",
      description: "Kolaborasi tradisional dan digital yang menghidupkan wayang kulit dalam format digital.",
      usedAssets: ["#3456", "#7890", "#1112"],
      ipVerified: true,
      duration: "4:15",
      tags: ["Traditional", "Digital", "Cultural"],
    },
    {
      id: 4,
      title: "Nusantara Dreams",
      animator: "@filmmaker_bali",
      views: 6500,
      retention: 71,
      aiScore: 81,
      culture: "Bali",
      video: "/nusantara-dreams-animation-surreal.jpg",
      description: "Perjalanan visual melalui keindahan alam dan budaya Kepulauan Nusantara.",
      usedAssets: ["#4567"],
      ipVerified: true,
      duration: "6:30",
      tags: ["Documentary", "Travel", "Cultural"],
    },
    {
      id: 5,
      title: "Batik Chronicles",
      animator: "@motion_designer_jakarta",
      views: 9200,
      retention: 79,
      aiScore: 86,
      culture: "Jawa",
      video: "/batik-chronicles-animation-textile-patterns.jpg",
      description: "Dokumentasi animasi tentang proses pembuatan batik tradisional Jawa.",
      usedAssets: ["#5678", "#9999"],
      ipVerified: true,
      duration: "8:20",
      tags: ["Documentary", "Craft", "Traditional"],
    },
    {
      id: 6,
      title: "Ramayana Digital",
      animator: "@epic_studio_yogya",
      views: 11500,
      retention: 85,
      aiScore: 91,
      culture: "Jawa",
      video: "/ramayana-digital-animation-epic-story.jpg",
      description: "Epos Ramayana diadaptasi dengan teknologi animasi terkini dan sinematografi profesional.",
      usedAssets: ["#6789", "#0101", "#1213"],
      ipVerified: true,
      duration: "12:45",
      tags: ["Epic", "Historical", "Drama"],
    },
    {
      id: 7,
      title: "Sundanese Melodies",
      animator: "@music_animator_bandung",
      views: 5800,
      retention: 68,
      aiScore: 79,
      culture: "Sunda",
      video: "/sundanese-melodies-animation-music-visual.jpg",
      description: "Visualisasi musik tradisional Sunda dengan animasi yang mengikuti ritme dan melodi.",
      usedAssets: ["#7890", "#2223"],
      ipVerified: false,
      duration: "3:50",
      tags: ["Music", "Animation", "Audio"],
    },
    {
      id: 8,
      title: "Borobudur: Stone Stories",
      animator: "@architect_animator_jakarta",
      views: 13200,
      retention: 87,
      aiScore: 94,
      culture: "Jawa",
      video: "/borobudur-stone-stories-3d-animation-temple.jpg",
      description: "3D visualization dari sejarah dan arsitektur Candi Borobudur yang legendaris.",
      usedAssets: ["#8901", "#3334", "#4445"],
      ipVerified: true,
      duration: "9:15",
      tags: ["3D", "Historical", "Architecture"],
    },
  ]

  // Filter and sort
  const filteredShowcases = useMemo(() => {
    const result = allShowcases.filter((item) => {
      const cultureMatch = filters.culture === "all" || item.culture === filters.culture
      const scoreMatch = item.aiScore >= filters.minScore
      const retentionMatch = item.retention >= filters.minRetention
      const searchMatch =
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.animator.toLowerCase().includes(filters.search.toLowerCase())
      return cultureMatch && scoreMatch && retentionMatch && searchMatch
    })

    // Sort
    switch (filters.sort) {
      case "views":
        result.sort((a, b) => b.views - a.views)
        break
      case "retention":
        result.sort((a, b) => b.retention - a.retention)
        break
      case "score":
        result.sort((a, b) => b.aiScore - a.aiScore)
        break
      default: // trending
        result.sort((a, b) => b.views * b.retention - a.views * a.retention)
    }

    return result
  }, [filters])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-2">Showcase Gallery</h1>
              <p className="text-lg text-muted-foreground">Karya terbaik dari animator dan kreator Indonesia</p>
            </div>
            <Link href="/showcase/upload">
              <Button size="lg" className="gap-2">
                <Upload size={20} />
                Upload Showcase
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ShowcaseFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Grid */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Menampilkan <span className="font-bold text-foreground">{filteredShowcases.length}</span> karya
              </p>
            </div>

            {filteredShowcases.length > 0 ? (
              <ShowcaseGrid showcases={filteredShowcases} onSelectShowcase={setSelectedShowcase} />
            ) : (
              <div className="bg-card rounded-xl p-12 text-center border border-border">
                <p className="text-lg text-muted-foreground">Tidak ada karya yang sesuai dengan filter Anda.</p>
                <button
                  onClick={() =>
                    setFilters({
                      culture: "all",
                      minScore: 80,
                      minRetention: 0,
                      sort: "trending",
                      search: "",
                    })
                  }
                  className="mt-4 text-primary hover:underline font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedShowcase && <ShowcaseDetail showcase={selectedShowcase} onClose={() => setSelectedShowcase(null)} />}

      <Footer />
    </div>
  )
}
