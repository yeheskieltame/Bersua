"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-white text-sm md:text-base group-hover:scale-110 transition-transform">
              B
            </div>
            <span className="font-bold text-lg md:text-xl text-foreground hidden sm:inline">Bersua</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors font-medium">
              Marketplace
            </Link>
            <Link href="/showcase" className="text-foreground hover:text-primary transition-colors font-medium">
              Showcase
            </Link>
            <Link href="/#about" className="text-foreground hover:text-primary transition-colors font-medium">
              Tentang
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Masuk</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Mulai Gratis</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-slide-up">
            <Link href="/marketplace" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Marketplace
            </Link>
            <Link href="/showcase" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Showcase
            </Link>
            <Link href="/#about" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Tentang
            </Link>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/signup">Mulai</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
