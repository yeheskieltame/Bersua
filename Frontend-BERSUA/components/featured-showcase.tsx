"use client"

import Link from "next/link"

export default function FeaturedShowcase() {
  const showcases = [
    {
      id: 1,
      title: "Malin Kundang 2049",
      views: "15K",
      retention: "88%",
      image: "/cyberpunk-malin-kundang-animation.jpg",
      verified: true,
    },
    {
      id: 2,
      title: "Timun Mas: Legend Reborn",
      views: "8K",
      retention: "75%",
      image: "/timun-mas-animation-artwork.jpg",
      verified: true,
    },
    {
      id: 3,
      title: "Wayang Kulit Modern",
      views: "12K",
      retention: "82%",
      image: "/wayang-kulit-shadow-puppet-modern-art.jpg",
      verified: true,
    },
    {
      id: 4,
      title: "Nusantara Dreams",
      views: "6K",
      retention: "71%",
      image: "/indonesian-archipelago-cultural-animation.jpg",
      verified: true,
    },
    {
      id: 5,
      title: "Batik Chronicles",
      views: "9K",
      retention: "79%",
      image: "/batik-pattern-animation.jpg",
      verified: true,
    },
    {
      id: 6,
      title: "Ramayana Digital",
      views: "11K",
      retention: "85%",
      image: "/ramayana-epic-animation.jpg",
      verified: true,
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
            Showcase Trending Minggu Ini
          </h2>
          <p className="text-lg text-muted-foreground">Animasi terbaik dari para animator berbakat Indonesia</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((item, index) => (
            <Link
              key={item.id}
              href="/showcase"
              className="group cursor-pointer rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up block"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="relative overflow-hidden h-56 bg-muted">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.verified && <span className="text-xl">✅</span>}
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{item.views} views</span>
                  <span>{item.retention} retention</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
