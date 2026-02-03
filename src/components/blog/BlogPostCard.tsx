import { Link } from 'react-router-dom';
import { UserIcon, CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import type { PostListItem } from '../../types/blog';

interface BlogPostCardProps {
  post: PostListItem;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Format tanggal jika tersedia
  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : null;

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 block h-full"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 group-hover:border-primary-500/50 transition-all duration-500"></div>

      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-500"></div>

      {/* Glow effect on hover */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Top accent line with reveal animation */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500/50 via-primary-400/30 to-transparent group-hover:from-primary-500 group-hover:via-primary-400 group-hover:animate-border-reveal transition-all duration-500"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-400 mb-4 gap-3">
          {post.user && (
            <span className="flex items-center px-2 py-1 bg-gray-800/30 rounded-full border border-gray-700/30 group-hover:border-primary-500/30 transition-colors">
              <UserIcon className="h-3 sm:h-4 w-3 sm:w-4 mr-1.5" />
              {post.user.username}
            </span>
          )}

          {formattedDate && (
            <span className="flex items-center px-2 py-1 bg-gray-800/30 rounded-full border border-gray-700/30 group-hover:border-primary-500/30 transition-colors">
              <CalendarIcon className="h-3 sm:h-4 w-3 sm:w-4 mr-1.5" />
              {formattedDate}
            </span>
          )}

          <span className="flex items-center px-2 py-1 bg-gray-800/30 rounded-full border border-gray-700/30 group-hover:border-primary-500/30 transition-colors">
            <ClockIcon className="h-3 sm:h-4 w-3 sm:w-4 mr-1.5" />
            {post.reading_time}m
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-primary-300 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm sm:text-base text-gray-300 mb-4 flex-grow line-clamp-2 group-hover:text-gray-200 transition-colors">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={`${post.id}-${tag}-${index}`}
                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-300 rounded-full border border-primary-500/30 group-hover:border-primary-500/60 group-hover:bg-gradient-to-r group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium text-gray-400">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/30 group-hover:border-primary-500/30 transition-colors">
          <span className="text-sm font-semibold text-primary-300 group-hover:text-primary-200 transition-colors">
            Read Article
          </span>
          <ArrowRightIcon className="h-5 w-5 text-primary-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary-300" />
        </div>
      </div>
    </Link>
  );
} 