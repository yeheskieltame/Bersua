"use client"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import FeaturedShowcase from "@/components/featured-showcase"
import FeaturedAssets from "@/components/featured-assets"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Stats />
      <FeaturedShowcase />
      <FeaturedAssets />
      <Footer />
    </div>
  )
}
