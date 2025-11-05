"use client"

import { TrendingUp, Eye, Download, DollarSign } from "lucide-react"

export default function CreatorAnalytics() {
  const topAssets = [
    { name: "Legenda Sangkuriang", views: 2341, downloads: 78, revenue: "Rp 3,900,000", trend: "+15%" },
    { name: "Motif Batik Mega Mendung", views: 1567, downloads: 56, revenue: "Rp 5,600,000", trend: "+22%" },
    { name: "Wayang Gatot Kaca 3D", views: 1234, downloads: 45, revenue: "Rp 6,750,000", trend: "+8%" },
    { name: "Gamelan Jawa Ensemble", views: 856, downloads: 34, revenue: "Rp 2,550,000", trend: "+12%" },
  ]

  const trafficSources = [
    { source: "Direct", percentage: 45, visitors: 2341 },
    { source: "Search", percentage: 30, visitors: 1560 },
    { source: "Social Media", percentage: 15, visitors: 780 },
    { source: "Referral", percentage: 10, visitors: 520 },
  ]

  const audienceByRegion = [
    { region: "Jakarta", percentage: 35 },
    { region: "Bandung", percentage: 20 },
    { region: "Surabaya", percentage: 15 },
    { region: "Yogyakarta", percentage: 12 },
    { region: "Lainnya", percentage: 18 },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">Analytics</h1>
        <p className="text-lg text-muted-foreground">Pantau performa dan insights aset Anda</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="text-primary" size={24} />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Views</p>
          <p className="text-3xl font-bold text-foreground">6,543</p>
          <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Download className="text-accent" size={24} />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+8.3%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Downloads</p>
          <p className="text-3xl font-bold text-foreground">213</p>
          <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="text-secondary-foreground" size={24} />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+18.7%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Revenue</p>
          <p className="text-3xl font-bold text-foreground">Rp 18.8M</p>
          <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-green-600" size={24} />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+5.2%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-foreground">3.26%</p>
          <p className="text-xs text-muted-foreground mt-2">Views to downloads</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Views Over Time</h2>
          <div className="space-y-4">
            {[
              { day: "Sen", views: 245 },
              { day: "Sel", views: 312 },
              { day: "Rab", views: 198 },
              { day: "Kam", views: 421 },
              { day: "Jum", views: 387 },
              { day: "Sab", views: 534 },
              { day: "Min", views: 289 },
            ].map((data, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground w-12">{data.day}</span>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent flex items-center justify-end pr-3"
                    style={{ width: `${(data.views / 534) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-white">{data.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Traffic Sources</h2>
          <div className="space-y-6">
            {trafficSources.map((source, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{source.source}</span>
                  <span className="text-sm text-muted-foreground">
                    {source.percentage}% ({source.visitors})
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Assets */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Top Performing Assets</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Asset Name</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Views</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Downloads</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Revenue</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topAssets.map((asset, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-foreground">{asset.name}</td>
                  <td className="py-4 px-4 text-right text-muted-foreground">{asset.views.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right text-muted-foreground">{asset.downloads}</td>
                  <td className="py-4 px-4 text-right font-semibold text-foreground">{asset.revenue}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {asset.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audience Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Audience by Region</h2>
          <div className="space-y-4">
            {audienceByRegion.map((region, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{region.region}</span>
                  <span className="text-sm font-semibold text-primary">{region.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Quick Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-semibold text-green-900 mb-1">🎉 Best Performing Day</p>
              <p className="text-xs text-green-700">Sabtu dengan 534 views - 42% lebih tinggi dari rata-rata</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-1">📈 Growing Interest</p>
              <p className="text-xs text-blue-700">Aset 3D Model naik 35% dalam 2 minggu terakhir</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm font-semibold text-amber-900 mb-1">💡 Recommendation</p>
              <p className="text-xs text-amber-700">Upload lebih banyak konten Jawa - permintaan tinggi!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
