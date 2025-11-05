"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import SponsorStats from "@/components/sponsor/stats"
import ProjectRecommendations from "@/components/sponsor/recommendations"
import RecentActivity from "@/components/sponsor/activity"

export default function SponsorDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Quick Stats */}
      <SponsorStats />

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Temukan Proyek Terbaik</h2>
            <p className="text-muted-foreground">
              Lihat showcase terbaik dari animator Indonesia dan danai karya berkualitas tinggi.
            </p>
          </div>
          <Button asChild className="whitespace-nowrap">
            <Link href="/sponsor/discover">Browse Projects</Link>
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommendations */}
        <div className="lg:col-span-2">
          <ProjectRecommendations />
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  )
}
