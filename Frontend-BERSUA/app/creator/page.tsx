"use client"
import Link from "next/link"
import { DollarSign, Eye, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuickStats from "@/components/creator/quick-stats"
import AssetsList from "@/components/creator/assets-list"
import EarningsChart from "@/components/creator/earnings-chart"

export default function CreatorDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Quick Stats */}
      <QuickStats />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1 sm:flex-none">
          <Link href="/creator/upload">Unggah Aset Baru</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1 sm:flex-none bg-transparent">
          <Link href="/creator/portfolio">Lihat Portfolio</Link>
        </Button>
      </div>

      {/* Assets List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AssetsList />
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Eye size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Aset Anda ditonton 500x</p>
                <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground">
                <DollarSign size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Royalti masuk Rp50K</p>
                <p className="text-xs text-muted-foreground">5 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground">
                <Zap size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">NFT Anda terjual!</p>
                <p className="text-xs text-muted-foreground">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <EarningsChart />
    </div>
  )
}
