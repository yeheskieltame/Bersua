"use client"

export function SkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-12 loading-skeleton rounded-lg" />
          <div className="h-4 loading-skeleton rounded w-3/4" />
          <div className="h-4 loading-skeleton rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}
