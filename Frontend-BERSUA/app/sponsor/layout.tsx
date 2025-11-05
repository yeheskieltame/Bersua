"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SponsorLayoutProps {
  children: React.ReactNode
}

export default function SponsorLayout({ children }: SponsorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    { label: "Dashboard", href: "/sponsor", icon: "📊" },
    { label: "Discover Projects", href: "/sponsor/discover", icon: "🔍" },
    { label: "My Funded Projects", href: "/sponsor/funded", icon: "💼" },
    { label: "Messages", href: "/sponsor/messages", icon: "💬" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 transition-all duration-300 ${
          isMobileOpen ? "w-64" : "w-0 md:w-64"
        } bg-sidebar border-r border-sidebar-border`}
      >
        <div className="p-6 space-y-8">
          <Link href="/sponsor" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">
              B
            </div>
            <span className="font-bold text-lg text-sidebar-foreground hidden sm:inline">Bersua</span>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsMobileOpen(false)}>
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-20">
          <div className="px-4 md:px-8 py-4 flex items-center justify-between">
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold text-foreground">Sponsor Dashboard</h1>
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-full" />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1">{children}</div>
      </main>
    </div>
  )
}
