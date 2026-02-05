export default function BlogPostCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl h-full animate-pulse">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        {/* Meta Info - 3 skeleton badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 bg-gray-700/50 rounded-full"
              style={{ width: `${60 + i * 20}px` }}
            ></div>
          ))}
        </div>

        {/* Title - 2 lines */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-gray-700/50 rounded-lg w-full"></div>
          <div className="h-6 bg-gray-700/50 rounded-lg w-3/4"></div>
        </div>

        {/* Excerpt - 2 lines */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 bg-gray-700/50 rounded-lg w-full"></div>
          <div className="h-4 bg-gray-700/50 rounded-lg w-5/6"></div>
        </div>

        {/* Tags - 3 skeleton tags */}
        <div className="flex gap-2 mb-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 bg-gray-700/50 rounded-full"
              style={{ width: `${50 + i * 15}px` }}
            ></div>
          ))}
        </div>

        {/* CTA Button area */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
          <div className="h-4 bg-gray-700/50 rounded w-24"></div>
          <div className="h-5 w-5 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    </div>
  );
}
