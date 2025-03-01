import type { PostDetail } from './PostDetail';

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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>{post.author?.username || 'Anonymous'}</span>
        </div>
        
        <div className="flex items-center mr-6 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>{post.created_at ? formatDate(post.created_at) : 'Unknown date'}</span>
        </div>
        
        {/* Reading Time */}
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
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