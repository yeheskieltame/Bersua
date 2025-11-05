"use client"

import { useState } from "react"
import { Eye, Heart, Download, Edit, Trash2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CreatorPortfolio() {
  const [filter, setFilter] = useState("all")

  const assets = [
    {
      id: 1,
      title: "Wayang Gatot Kaca 3D",
      type: "3D Model",
      culture: "Jawa",
      thumbnail: "/placeholder-3d.png",
      views: 1234,
      likes: 89,
      downloads: 45,
      price: "Rp 150,000",
      status: "published",
      mintDate: "15 Jan 2025",
    },
    {
      id: 2,
      title: "Gamelan Jawa Ensemble",
      type: "Musik",
      culture: "Jawa",
      thumbnail: "/placeholder-music.png",
      views: 856,
      likes: 67,
      downloads: 34,
      price: "Rp 75,000",
      status: "published",
      mintDate: "12 Jan 2025",
    },
    {
      id: 3,
      title: "Legenda Sangkuriang",
      type: "Cerita",
      culture: "Sunda",
      thumbnail: "/placeholder-story.png",
      views: 2341,
      likes: 156,
      downloads: 78,
      price: "Rp 50,000",
      status: "published",
      mintDate: "8 Jan 2025",
    },
    {
      id: 4,
      title: "Motif Batik Mega Mendung",
      type: "Visual 2D",
      culture: "Jawa",
      thumbnail: "/placeholder-visual.png",
      views: 1567,
      likes: 123,
      downloads: 56,
      price: "Rp 100,000",
      status: "published",
      mintDate: "5 Jan 2025",
    },
    {
      id: 5,
      title: "Tari Kecak Audio",
      type: "Musik",
      culture: "Bali",
      thumbnail: "/placeholder-music.png",
      views: 489,
      likes: 34,
      downloads: 12,
      price: "Rp 65,000",
      status: "draft",
      mintDate: "-",
    },
  ]

  const stats = {
    total: assets.length,
    published: assets.filter((a) => a.status === "published").length,
    draft: assets.filter((a) => a.status === "draft").length,
    totalViews: assets.reduce((sum, a) => sum + a.views, 0),
    totalLikes: assets.reduce((sum, a) => sum + a.likes, 0),
    totalDownloads: assets.reduce((sum, a) => sum + a.downloads, 0),
  }

  const filteredAssets =
    filter === "all"
      ? assets
      : filter === "published"
        ? assets.filter((a) => a.status === "published")
        : assets.filter((a) => a.status === "draft")

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">Portfolio Saya</h1>
        <p className="text-lg text-muted-foreground">Kelola dan pantau performa aset budaya Anda</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Aset</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Published</p>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Draft</p>
          <p className="text-2xl font-bold text-amber-600">{stats.draft}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Views</p>
          <p className="text-2xl font-bold text-primary">{stats.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Likes</p>
          <p className="text-2xl font-bold text-accent">{stats.totalLikes}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Downloads</p>
          <p className="text-2xl font-bold text-secondary-foreground">{stats.totalDownloads}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          Semua ({stats.total})
        </Button>
        <Button variant={filter === "published" ? "default" : "outline"} onClick={() => setFilter("published")}>
          Published ({stats.published})
        </Button>
        <Button variant={filter === "draft" ? "default" : "outline"} onClick={() => setFilter("draft")}>
          Draft ({stats.draft})
        </Button>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-card border border-border rounded-xl overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {asset.type === "3D Model" ? "🎭" : asset.type === "Musik" ? "🎵" : asset.type === "Cerita" ? "📖" : "🎨"}
              </div>
              {asset.status === "draft" && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">Draft</div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {asset.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded">{asset.type}</span>
                  <span>{asset.culture}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Eye size={14} className="text-muted-foreground" />
                  <span>{asset.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={14} className="text-muted-foreground" />
                  <span>{asset.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download size={14} className="text-muted-foreground" />
                  <span>{asset.downloads}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-foreground">{asset.price}</span>
                <span className="text-muted-foreground text-xs">{asset.mintDate}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit size={14} className="mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Share2 size={14} />
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent text-red-600 hover:bg-red-50">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">Tidak ada aset dalam kategori ini</p>
          <Button>Upload Aset Baru</Button>
        </div>
      )}
    </div>
  )
}
