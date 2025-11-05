"use client"

interface FiltersProps {
  filters: any
  setFilters: any
}

export default function MarketplaceFilters({ filters, setFilters }: FiltersProps) {
  const types = ["Cerita", "3D Model", "Musik"]
  const cultures = ["Jawa", "Sunda", "Bali", "Sumatera", "Kalimantan", "Sulawesi", "Papua"]
  const sorts = [
    { value: "latest", label: "Terbaru" },
    { value: "popular", label: "Paling Populer" },
    { value: "cheapest", label: "Termurah" },
    { value: "expensive", label: "Termahal" },
  ]

  const handleTypeChange = (type: string) => {
    setFilters({
      ...filters,
      type: filters.type === type ? "all" : type,
    })
  }

  const handleCultureChange = (culture: string) => {
    setFilters({
      ...filters,
      culture: filters.culture === culture ? "all" : culture,
    })
  }

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...filters.priceRange]
    newRange[index] = value
    setFilters({ ...filters, priceRange: newRange })
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold mb-2">Cari Aset</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Judul, creator..."
          className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-sm font-semibold mb-2">Urutkan</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        >
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="font-semibold mb-3">Jenis Aset</h3>
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.type === type}
                onChange={() => handleTypeChange(type)}
                className="w-4 h-4 rounded border-border cursor-pointer accent-primary"
              />
              <span className="text-sm group-hover:text-primary transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Culture Filter */}
      <div>
        <h3 className="font-semibold mb-3">Budaya</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {cultures.map((culture) => (
            <label key={culture} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.culture === culture}
                onChange={() => handleCultureChange(culture)}
                className="w-4 h-4 rounded border-border cursor-pointer accent-primary"
              />
              <span className="text-sm group-hover:text-primary transition-colors">{culture}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Harga (Rp)</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Min</label>
            <input
              type="range"
              min="0"
              max="500000"
              step="5000"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm font-semibold">Rp{filters.priceRange[0].toLocaleString()}</span>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Max</label>
            <input
              type="range"
              min="0"
              max="500000"
              step="5000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm font-semibold">Rp{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          setFilters({
            type: "all",
            culture: "all",
            priceRange: [0, 500000],
            sort: "latest",
            search: "",
          })
        }
        className="w-full py-2 border border-border rounded-lg hover:bg-muted transition-colors font-semibold text-sm"
      >
        Reset Filter
      </button>
    </div>
  )
}
