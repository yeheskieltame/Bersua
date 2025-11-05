"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, Download, CreditCard, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CreatorEarnings() {
  const [timeRange, setTimeRange] = useState("30d")

  const earningsData = {
    "7d": { total: "Rp 4.2M", sales: "Rp 3.1M", royalties: "Rp 1.1M", pending: "Rp 450K" },
    "30d": { total: "Rp 18.8M", sales: "Rp 14.2M", royalties: "Rp 4.6M", pending: "Rp 1.8M" },
    "90d": { total: "Rp 52.5M", sales: "Rp 39.7M", royalties: "Rp 12.8M", pending: "Rp 3.2M" },
    all: { total: "Rp 127.3M", sales: "Rp 96.1M", royalties: "Rp 31.2M", pending: "Rp 5.7M" },
  }

  const current = earningsData[timeRange as keyof typeof earningsData]

  const transactions = [
    {
      id: "TRX-001",
      type: "sale",
      asset: "Wayang Gatot Kaca 3D",
      amount: "Rp 150,000",
      date: "18 Jan 2025",
      status: "completed",
      buyer: "Studio Animasi XYZ",
    },
    {
      id: "TRX-002",
      type: "royalty",
      asset: "Legenda Sangkuriang",
      amount: "Rp 10,000",
      date: "17 Jan 2025",
      status: "completed",
      buyer: "Animator ABC",
    },
    {
      id: "TRX-003",
      type: "sale",
      asset: "Motif Batik Mega Mendung",
      amount: "Rp 100,000",
      date: "16 Jan 2025",
      status: "completed",
      buyer: "Creator DEF",
    },
    {
      id: "TRX-004",
      type: "royalty",
      asset: "Gamelan Jawa Ensemble",
      amount: "Rp 15,000",
      date: "16 Jan 2025",
      status: "pending",
      buyer: "Studio GHI",
    },
    {
      id: "TRX-005",
      type: "sale",
      asset: "Tari Kecak Audio",
      amount: "Rp 65,000",
      date: "15 Jan 2025",
      status: "completed",
      buyer: "Produser JKL",
    },
    {
      id: "TRX-006",
      type: "royalty",
      asset: "Wayang Gatot Kaca 3D",
      amount: "Rp 30,000",
      date: "14 Jan 2025",
      status: "completed",
      buyer: "Film MNO",
    },
  ]

  const payoutHistory = [
    { date: "1 Jan 2025", amount: "Rp 15,450,000", method: "Bank Transfer", status: "completed" },
    { date: "1 Des 2024", amount: "Rp 12,300,000", method: "Bank Transfer", status: "completed" },
    { date: "1 Nov 2024", amount: "Rp 9,875,000", method: "Bank Transfer", status: "completed" },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-2">Earnings</h1>
          <p className="text-lg text-muted-foreground">Kelola pendapatan dan riwayat pembayaran Anda</p>
        </div>
        <Button className="flex items-center gap-2">
          <CreditCard size={18} />
          Request Payout
        </Button>
      </div>

      {/* Time Range Filter */}
      <div className="flex gap-3">
        {["7d", "30d", "90d", "all"].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            onClick={() => setTimeRange(range)}
            size="sm"
          >
            {range === "7d" ? "7 Hari" : range === "30d" ? "30 Hari" : range === "90d" ? "90 Hari" : "Semua"}
          </Button>
        ))}
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <DollarSign className="text-primary" size={24} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-foreground">{current.total}</p>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +15.3% from last period
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Download className="text-secondary-foreground" size={24} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">From Sales</p>
          <p className="text-3xl font-bold text-foreground">{current.sales}</p>
          <p className="text-xs text-muted-foreground mt-2">Primary market sales</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-accent" size={24} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">From Royalties</p>
          <p className="text-3xl font-bold text-foreground">{current.royalties}</p>
          <p className="text-xs text-muted-foreground mt-2">Perpetual royalties</p>
        </div>

        <div className="bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center">
              <Calendar className="text-amber-700" size={24} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-3xl font-bold text-foreground">{current.pending}</p>
          <p className="text-xs text-amber-700 mt-2">Available after 7 days</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Recent Transactions</h2>
          <Button variant="outline" size="sm" className="bg-transparent">
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Transaction ID</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Asset</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Buyer</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Amount</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 font-mono text-sm text-muted-foreground">{tx.id}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        tx.type === "sale"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {tx.type === "sale" ? "Sale" : "Royalty"}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-foreground">{tx.asset}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{tx.buyer}</td>
                  <td className="py-4 px-4 text-right font-semibold text-foreground">{tx.amount}</td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground">{tx.date}</td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {tx.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Payout History</h2>
        <div className="space-y-4">
          {payoutHistory.map((payout, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{payout.amount}</p>
                  <p className="text-xs text-muted-foreground">{payout.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">{payout.date}</p>
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {payout.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Payment Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default Payment Method</p>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
              <CreditCard size={24} className="text-accent" />
              <div>
                <p className="font-semibold text-foreground">Bank Transfer</p>
                <p className="text-xs text-muted-foreground">BCA •••• 1234</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Payout Schedule</p>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
              <Calendar size={24} className="text-accent" />
              <div>
                <p className="font-semibold text-foreground">Monthly</p>
                <p className="text-xs text-muted-foreground">Setiap tanggal 1</p>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" className="mt-4 bg-transparent">
          Update Payment Settings
        </Button>
      </div>
    </div>
  )
}
