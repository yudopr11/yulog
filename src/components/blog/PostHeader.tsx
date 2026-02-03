import { UserIcon, CalendarIcon, ClockIcon } from '@heroicons/react/20/solid';
import type { PostDetail } from '../../types/blog';

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

interface PostHeaderProps {
  post: PostDetail;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="relative mb-12">
      {/* Glassmorphism Card Container */}
      <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 group">

        {/* Top accent line with reveal animation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500/50 via-primary-400/30 to-transparent group-hover:from-primary-500 group-hover:via-primary-400 group-hover:animate-border-reveal transition-all duration-500"></div>

        {/* Glow effect on hover */}
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-primary-600/0 group-hover:from-primary-500/5 group-hover:to-primary-600/5 transition-all duration-500 rounded-2xl pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Title with Gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:via-white group-hover:to-primary-200 transition-all duration-500">
            {post.title}
          </h1>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {/* Author Badge */}
            {post.user && (
              <div className="flex items-center px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/30 group-hover:border-primary-500/30 transition-colors backdrop-blur-sm">
                <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">{post.user.username}</span>
              </div>
            )}

            {/* Date Badge */}
            {post.created_at && (
              <div className="flex items-center px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/30 group-hover:border-primary-500/30 transition-colors backdrop-blur-sm">
                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">{formatDate(post.created_at)}</span>
              </div>
            )}

            {/* Reading Time Badge */}
            <div className="flex items-center px-4 py-2 bg-gray-800/30 rounded-full border border-gray-700/30 group-hover:border-primary-500/30 transition-colors backdrop-blur-sm">
              <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-300">{post.reading_time} min</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 rounded-full border border-primary-500/30 group-hover:border-primary-500/60 group-hover:bg-gradient-to-r group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300 backdrop-blur-sm hover:scale-105"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 