"use client"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-muted rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-rotate-slow" />
      </div>
    </div>
  )
}
