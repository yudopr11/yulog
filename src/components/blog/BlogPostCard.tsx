import { Link } from 'react-router-dom';
import { UserIcon, CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

// Author interface berdasarkan UserBase di openapi.json
export interface UserBase {
  user_id: number;
  username: string;
  email: string;
}

// PostList interface berdasarkan openapi.json
export interface PostList {
  post_id: number;
  uuid: string;
  title: string;
  excerpt: string;
  slug: string;
  reading_time: number;
  tags?: string[] | null;
  published: boolean;
  author: UserBase;
  created_at?: string; // Menggunakan created_at dari API, bukan created_date
}

interface BlogPostCardProps {
  post: PostList;
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
    <div className="bg-gradient-to-br from-[#192734] to-[#0c141d] rounded-lg shadow-xl p-6 transition-all duration-300 hover:shadow-primary-500/10">
      <h2 className="text-2xl font-semibold mb-2 text-white">
        <Link 
          to={`/blog/${post.slug}`} 
          className="hover:text-primary-400 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      {/* Author, Date & Reading Time in single row */}
      <div className="flex flex-wrap items-center text-sm text-gray-400 mb-3 gap-2">
        {post.author && (
          <span className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1" />
            {post.author.username}
          </span>
        )}
        
        {post.author && formattedDate && <span className="mx-1">•</span>}
        
        {formattedDate && (
          <span className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {formattedDate}
          </span>
        )}
        
        {(post.author || formattedDate) && <span className="mx-1">•</span>}
        
        <span className="flex items-center">
          <ClockIcon className="h-4 w-4 mr-1" />
          {post.reading_time} min read
        </span>
      </div>
      
      <p className="text-gray-300 mb-4">{post.excerpt}</p>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={`${post.post_id}-${tag}-${index}`} 
              className="px-2 py-1 bg-gray-700 text-xs rounded-md text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Read Full Article with lowkey style */}
      <div className="mt-4">
        <Link 
          to={`/blog/${post.slug}`} 
          className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors group"
        >
          <span className="group-hover:underline">Read Full Article</span>
          <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
} 