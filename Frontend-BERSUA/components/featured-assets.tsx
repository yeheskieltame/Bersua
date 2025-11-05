"use client"

import Link from "next/link"

export default function FeaturedAssets() {
  const assets = [
    {
      id: 1,
      title: "Legenda Malin Kundang Modern",
      creator: "@penulis_padang",
      price: "Rp100K",
      type: "Cerita",
      image: "/malin-kundang-legend.jpg",
    },
    {
      id: 2,
      title: "Keris Cyberpunk 3D Model",
      creator: "@modeler_bandung",
      price: "Rp80K",
      type: "3D Model",
      image: "/keris-sword-3d-model.jpg",
    },
    {
      id: 3,
      title: "Gamelan Modern Remix",
      creator: "@musik_jogja",
      price: "Rp50K",
      type: "Musik",
      image: "/gamelan-music-instrument.jpg",
    },
    {
      id: 4,
      title: "Wayang Kulit Digital",
      creator: "@animator_solo",
      price: "Rp120K",
      type: "3D Model",
      image: "/wayang-kulit-puppet.jpg",
    },
    {
      id: 5,
      title: "Batik Pattern Library",
      creator: "@designer_bali",
      price: "Rp75K",
      type: "Cerita",
      image: "/batik-pattern-textile.jpg",
    },
    {
      id: 6,
      title: "Ramayana Epic Story",
      creator: "@writer_yogya",
      price: "Rp150K",
      type: "Cerita",
      image: "/ramayana-story.jpg",
    },
    {
      id: 7,
      title: "Borobudur Temple 3D",
      creator: "@architect_jakarta",
      price: "Rp200K",
      type: "3D Model",
      image: "/borobudur-temple.jpg",
    },
    {
      id: 8,
      title: "Nusantara Folklore Mix",
      creator: "@composer_medang",
      price: "Rp60K",
      type: "Musik",
      image: "/indonesian-folklore-music.jpg",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
            Aset Terbaru di Marketplace
          </h2>
          <p className="text-lg text-muted-foreground">Upload terbaru dari creator berbakat se-Nusantara</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset, index) => (
            <Link
              key={asset.id}
              href="/marketplace"
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slide-up group cursor-pointer block"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <img
                  src={asset.image || "/placeholder.svg"}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {asset.type}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {asset.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{asset.creator}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{asset.price}</span>
                  <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm group-hover:bg-primary/90 transition-colors">
                    Beli
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/marketplace"
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary/5 transition-colors"
          >
            Lihat Semua Aset
          </Link>
        </div>
      </div>
    </section>
  )
}
