// app/blog/[slug]/loading.tsx
export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="h-64 md:h-96 bg-gray-200 rounded-lg mb-8 animate-pulse" />
        <div className="h-10 bg-gray-200 w-3/4 mb-4 animate-pulse" />
        <div className="flex gap-4 mb-8">
          <div className="h-6 bg-gray-200 w-32 animate-pulse" />
          <div className="h-6 bg-gray-200 w-32 animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }