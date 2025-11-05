"use client"

interface SponsorDiscoverFiltersProps {
  filters: any
  setFilters: any
}

export default function SponsorDiscoverFilters({ filters, setFilters }: SponsorDiscoverFiltersProps) {
  const cultures = ["Jawa", "Sunda", "Bali", "Sumatera", "Kalimantan", "Sulawesi", "Papua"]
  const audiences = ["10-18", "18-25", "25-35", "35-50", "50+"]
  const sorts = [
    { value: "trending", label: "Trending" },
    { value: "topRated", label: "Top Rated" },
    { value: "newest", label: "Newest" },
    { value: "funded", label: "Most Funded" },
  ]

  return (
    <div className="sticky top-24 space-y-6 bg-card rounded-xl p-6 border border-border shadow-sm">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold mb-2">Search Projects</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Judul proyek..."
          className="w-full px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold mb-2">Sort By</label>
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

      {/* Budget */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Budget Range</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Min: Rp{(filters.budgetMin / 1000000).toFixed(0)}M</label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={filters.budgetMin}
              onChange={(e) => setFilters({ ...filters, budgetMin: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Max: Rp{(filters.budgetMax / 1000000).toFixed(0)}M</label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={filters.budgetMax}
              onChange={(e) => setFilters({ ...filters, budgetMax: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Culture */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Culture</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              checked={filters.culture === "all"}
              onChange={() => setFilters({ ...filters, culture: "all" })}
              className="w-4 h-4 accent-primary"
            />
            All
          </label>
          {cultures.map((culture) => (
            <label key={culture} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                checked={filters.culture === culture}
                onChange={() => setFilters({ ...filters, culture })}
                className="w-4 h-4 accent-primary"
              />
              {culture}
            </label>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Target Audience</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              checked={filters.targetAudience === "all"}
              onChange={() => setFilters({ ...filters, targetAudience: "all" })}
              className="w-4 h-4 accent-primary"
            />
            All Ages
          </label>
          {audiences.map((audience) => (
            <label key={audience} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                checked={filters.targetAudience === audience}
                onChange={() => setFilters({ ...filters, targetAudience: audience })}
                className="w-4 h-4 accent-primary"
              />
              {audience} years
            </label>
          ))}
        </div>
      </div>

      {/* AI Score */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Min AI Score: {filters.minScore}</h3>
        <input
          type="range"
          min="70"
          max="100"
          value={filters.minScore}
          onChange={(e) => setFilters({ ...filters, minScore: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          setFilters({
            budgetMin: 0,
            budgetMax: 10000000,
            targetAudience: "all",
            culture: "all",
            minScore: 80,
            sort: "trending",
            search: "",
          })
        }
        className="w-full py-2 border border-border rounded-lg hover:bg-muted transition-colors font-semibold text-sm"
      >
        Reset Filters
      </button>
    </div>
  )
}
