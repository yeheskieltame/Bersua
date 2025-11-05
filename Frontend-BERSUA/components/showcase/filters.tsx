"use client"

interface ShowcaseFiltersProps {
  filters: any
  setFilters: any
}

export default function ShowcaseFilters({ filters, setFilters }: ShowcaseFiltersProps) {
  const cultures = ["Jawa", "Sunda", "Bali", "Sumatera", "Kalimantan", "Sulawesi", "Papua"]
  const sorts = [
    { value: "trending", label: "Trending" },
    { value: "views", label: "Paling Banyak Views" },
    { value: "retention", label: "Retention Tertinggi" },
    { value: "score", label: "AI Score Tertinggi" },
  ]

  return (
    <div className="sticky top-24 space-y-6 bg-card rounded-xl p-6 border border-border shadow-sm">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold mb-2">Cari Karya</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Judul, animator..."
          className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold mb-2">Urutkan</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
        >
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>

      {/* Culture */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Budaya</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="culture"
              checked={filters.culture === "all"}
              onChange={() => setFilters({ ...filters, culture: "all" })}
              className="w-4 h-4 cursor-pointer accent-primary"
            />
            <span className="text-sm">Semua</span>
          </label>
          {cultures.map((culture) => (
            <label key={culture} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="culture"
                checked={filters.culture === culture}
                onChange={() => setFilters({ ...filters, culture })}
                className="w-4 h-4 cursor-pointer accent-primary"
              />
              <span className="text-sm">{culture}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Score */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">AI Score Min: {filters.minScore}</h3>
        <input
          type="range"
          min="70"
          max="100"
          value={filters.minScore}
          onChange={(e) => setFilters({ ...filters, minScore: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Retention */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Retention Min: {filters.minRetention}%</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.minRetention}
          onChange={(e) => setFilters({ ...filters, minRetention: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          setFilters({
            culture: "all",
            minScore: 80,
            minRetention: 0,
            sort: "trending",
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
