"use client"

export default function EarningsChart() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h2 className="text-2xl font-bold mb-6">Earnings per Bulan</h2>
      <div className="h-64 bg-muted/30 rounded-lg flex items-end justify-around px-4 py-6 gap-2">
        {[45, 52, 38, 71, 49, 65, 82, 58, 44, 69, 87, 95].map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-300 hover:from-secondary hover:to-primary"
              style={{ height: `${(value / 100) * 100}%` }}
            />
            <span className="text-xs text-muted-foreground font-medium">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
