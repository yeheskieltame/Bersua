"use client"

import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import MarketplaceFilters from "@/components/marketplace/filters"
import AssetGrid from "@/components/marketplace/asset-grid"
import AssetDetail from "@/components/marketplace/asset-detail"

export default function Marketplace() {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [filters, setFilters] = useState({
    type: "all",
    culture: "all",
    priceRange: [0, 500000],
    sort: "latest",
    search: "",
  })

  // Mock data - would come from API
  const allAssets = [
    {
      id: 1,
      title: "Legenda Malin Kundang Modern",
      creator: "@penulis_padang",
      price: 100000,
      type: "Cerita",
      culture: "Sumatera",
      views: 1200,
      image: "/public/malin-kundang-legend.jpg",
      verified: true,
      description: "Adaptasi cyberpunk dari legenda klasik Malin Kundang yang menceritakan kisah dosa dan penyesalan.",
    },
    {
      id: 2,
      title: "Keris Cyberpunk 3D Model",
      creator: "@modeler_bandung",
      price: 80000,
      type: "3D Model",
      culture: "Jawa",
      views: 890,
      image: "/public/keris-sword-3d-model.jpg",
      verified: true,
      description: "Model 3D detail dari keris tradisional Jawa dengan sentuhan cyberpunk modern.",
    },
    {
      id: 3,
      title: "Gamelan Modern Remix",
      creator: "@musik_jogja",
      price: 50000,
      type: "Musik",
      culture: "Jawa",
      views: 2100,
      image: "/public/gamelan-music-instrument.jpg",
      verified: true,
      description: "Remix kontemporer dari musik gamelan tradisional Yogyakarta.",
    },
    {
      id: 4,
      title: "Wayang Kulit Digital",
      creator: "@animator_solo",
      price: 120000,
      type: "3D Model",
      culture: "Jawa",
      views: 1500,
      image: "/public/wayang-kulit-puppet.jpg",
      verified: true,
      description: "Koleksi puppet wayang kulit digital dalam format 3D yang dapat digunakan untuk animasi.",
    },
    {
      id: 5,
      title: "Batik Pattern Library",
      creator: "@designer_bali",
      price: 75000,
      type: "Cerita",
      culture: "Bali",
      views: 890,
      image: "/public/batik-pattern-textile.jpg",
      verified: true,
      description: "Perpustakaan lengkap pola batik tradisional Bali dengan dokumentasi detail.",
    },
    {
      id: 6,
      title: "Ramayana Epic Story",
      creator: "@writer_yogya",
      price: 150000,
      type: "Cerita",
      culture: "Jawa",
      views: 2300,
      image: "/public/ramayana-story.jpg",
      verified: true,
      description: "Adaptasi modern dari epos Ramayana dengan narasi yang kaya dan detail.",
    },
    {
      id: 7,
      title: "Borobudur Temple 3D",
      creator: "@architect_jakarta",
      price: 200000,
      type: "3D Model",
      culture: "Jawa",
      views: 3100,
      image: "/public/borobudur-temple.jpg",
      verified: true,
      description: "Model 3D akurat dari Candi Borobudur dengan detail arsitektur lengkap.",
    },
    {
      id: 8,
      title: "Nusantara Folklore Mix",
      creator: "@composer_medang",
      price: 60000,
      type: "Musik",
      culture: "Sumatera",
      views: 750,
      image: "/public/indonesian-folklore-music.jpg",
      verified: true,
      description: "Koleksi musik folklore Nusantara yang diproduksi ulang dengan kualitas studio.",
    },
    {
      id: 9,
      title: "Timun Mas Legend",
      creator: "@storyteller_sunda",
      price: 95000,
      type: "Cerita",
      culture: "Sunda",
      views: 1100,
      image: "/placeholder.svg?key=z9x2m",
      verified: true,
      description: "Kisah legenda Timun Mas dari Sundanese dengan adaptasi kontemporer.",
    },
    {
      id: 10,
      title: "Wayang Golek Animation",
      creator: "@animator_bandung",
      price: 180000,
      type: "3D Model",
      culture: "Sunda",
      views: 1900,
      image: "/placeholder.svg?key=h8k3p",
      verified: true,
      description: "Model animasi wayang golek tradisional Sunda untuk digunakan dalam proyek digital.",
    },
    {
      id: 11,
      title: "Sundanese Gamelan Audio",
      creator: "@music_bandung",
      price: 55000,
      type: "Musik",
      culture: "Sunda",
      views: 620,
      image: "/placeholder.svg?key=q5m9l",
      verified: true,
      description: "Rekaman berkualitas tinggi dari instrumen gamelan Sunda tradisional.",
    },
    {
      id: 12,
      title: "Hindu Bali Stories",
      creator: "@writer_ubud",
      price: 110000,
      type: "Cerita",
      culture: "Bali",
      views: 980,
      image: "/placeholder.svg?key=r7x1k",
      verified: true,
      description: "Koleksi cerita Hindu-Balinese dengan narasi visual yang memukau.",
    },
  ]

  // Filter and sort assets
  const filteredAssets = useMemo(() => {
    const result = allAssets.filter((asset) => {
      const typeMatch = filters.type === "all" || asset.type === filters.type
      const cultureMatch = filters.culture === "all" || asset.culture === filters.culture
      const priceMatch = asset.price >= filters.priceRange[0] && asset.price <= filters.priceRange[1]
      const searchMatch =
        asset.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        asset.creator.toLowerCase().includes(filters.search.toLowerCase())
      return typeMatch && cultureMatch && priceMatch && searchMatch
    })

    // Sort
    switch (filters.sort) {
      case "popular":
        result.sort((a, b) => b.views - a.views)
        break
      case "cheapest":
        result.sort((a, b) => a.price - b.price)
        break
      case "expensive":
        result.sort((a, b) => b.price - a.price)
        break
      default: // latest
        result.sort((a, b) => b.id - a.id)
    }

    return result
  }, [filters])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-2">Marketplace</h1>
          <p className="text-lg text-muted-foreground">Temukan aset budaya Indonesia terbaik untuk proyek Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <MarketplaceFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Assets Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Menampilkan <span className="font-bold text-foreground">{filteredAssets.length}</span> aset
              </p>
            </div>

            {filteredAssets.length > 0 ? (
              <AssetGrid assets={filteredAssets} onSelectAsset={setSelectedAsset} />
            ) : (
              <div className="bg-card rounded-xl p-12 text-center border border-border">
                <p className="text-lg text-muted-foreground">Tidak ada aset yang sesuai dengan filter Anda.</p>
                <button
                  onClick={() =>
                    setFilters({
                      type: "all",
                      culture: "all",
                      priceRange: [0, 500000],
                      sort: "latest",
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

      {/* Asset Detail Modal */}
      {selectedAsset && <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}

      <Footer />
    </div>
  )
}
