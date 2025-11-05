"use client"

interface AssetGridProps {
  assets: any[]
  onSelectAsset: (asset: any) => void
}

export default function AssetGrid({ assets, onSelectAsset }: AssetGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
      {assets.map((asset, index) => (
        <div
          key={asset.id}
          onClick={() => onSelectAsset(asset)}
          className="group cursor-pointer bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-slide-up"
          style={{ animationDelay: `${index * 0.05}s` }}
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
            {asset.verified && <div className="absolute top-3 left-3 text-lg">✅</div>}
          </div>

          <div className="p-4">
            <h3 className="font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {asset.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">by {asset.creator}</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-primary">Rp{asset.price.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">{asset.views.toLocaleString()} views</span>
            </div>

            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors group-hover:shadow-md">
              Lihat Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
