"use client"

import { Edit2, Trash2 } from "lucide-react"

export default function AssetsList() {
  const assets = [
    {
      id: 1,
      title: "Malin Kundang Modern",
      type: "Cerita",
      price: "Rp100K",
      sales: 12,
      views: 3400,
      image: "/malin-kundang-legend.jpg",
    },
    {
      id: 2,
      title: "Keris Cyberpunk 3D",
      type: "3D Model",
      price: "Rp80K",
      sales: 8,
      views: 2100,
      image: "/keris-sword-3d-model.jpg",
    },
    {
      id: 3,
      title: "Gamelan Modern Remix",
      type: "Musik",
      price: "Rp50K",
      sales: 5,
      views: 1200,
      image: "/gamelan-music-instrument.jpg",
    },
  ]

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold">Aset Saya</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Aset</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipe</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Harga</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Penjualan</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={asset.image}
                      alt={asset.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{asset.title}</p>
                      <p className="text-xs text-muted-foreground">{asset.views.toLocaleString()} views</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {asset.type}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-foreground">{asset.price}</td>
                <td className="px-6 py-4 font-semibold text-primary">{asset.sales} sold</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
