export default function PostDetailSkeleton() {
  return (
    <div className="space-y-12 sm:space-y-16 animate-pulse">
      {/* Header Skeleton */}
      <header className="relative mb-12">
        <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30">
          {/* Title skeleton - 3 lines */}
          <div className="space-y-3 mb-6">
            <div className="h-10 bg-gray-700/50 rounded-lg w-full"></div>
            <div className="h-10 bg-gray-700/50 rounded-lg w-5/6"></div>
            <div className="h-10 bg-gray-700/50 rounded-lg w-4/6"></div>
          </div>

          {/* Metadata badges skeleton - 3 badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 bg-gray-700/50 rounded-full"
                style={{ width: `${80 + i * 30}px` }}
              ></div>
            ))}
          </div>

          {/* Tags skeleton - 4 tags */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 bg-gray-700/50 rounded-full"
                style={{ width: `${60 + i * 20}px` }}
              ></div>
            ))}
          </div>
        </div>
      </header>

      {/* Content Skeleton */}
      <div className="space-y-8">
        {/* Table of Contents skeleton */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-900/60 backdrop-blur-sm border border-gray-700/20 rounded-2xl"></div>
          <div className="relative z-10 p-8 sm:p-10">
            <div className="h-6 bg-gray-700/50 rounded-lg w-40 mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-700/50 rounded-lg"
                  style={{ width: `${60 + (i % 3) * 20}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-900/60 backdrop-blur-sm border border-gray-700/20 rounded-2xl"></div>
          <div className="relative z-10 p-8 sm:p-10 lg:p-12">
            <div className="space-y-4">
              {/* Paragraph skeletons */}
              {[1, 2, 3, 4, 5].map((block) => (
                <div key={block} className="space-y-2">
                  <div className="h-4 bg-gray-700/50 rounded-lg w-full"></div>
                  <div className="h-4 bg-gray-700/50 rounded-lg w-full"></div>
                  <div className="h-4 bg-gray-700/50 rounded-lg w-4/5"></div>
                  {block < 4 && <div className="h-3 bg-gray-700/30 rounded-lg w-2/3 mt-6"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
