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
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6">
        {/* Author & Date */}
        <div className="flex items-center mr-6 mb-2">
          <UserIcon className="h-4 w-4 mr-1" />
          <span>{post.user?.username || 'Anonymous'}</span>
        </div>
        
        <div className="flex items-center mr-6 mb-2">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{post.created_at ? formatDate(post.created_at) : 'Unknown date'}</span>
        </div>
        
        {/* Reading Time */}
        <div className="flex items-center mb-2">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{post.reading_time} min read</span>
        </div>
      </div>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-primary-900/30 border border-primary-800 text-primary-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
} 