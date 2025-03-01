import { Link } from 'react-router-dom';

// Author interface berdasarkan UserBase di openapi.json
export interface UserBase {
  id: number;
  username: string;
  email: string;
}

// PostList interface berdasarkan openapi.json
export interface PostList {
  id: number;
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {post.author.username}
          </span>
        )}
        
        {post.author && formattedDate && <span className="mx-1">•</span>}
        
        {formattedDate && (
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formattedDate}
          </span>
        )}
        
        {(post.author || formattedDate) && <span className="mx-1">•</span>}
        
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {post.reading_time} min read
        </span>
      </div>
      
      <p className="text-gray-300 mb-4">{post.excerpt}</p>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span 
              key={`${post.id}-${tag}-${index}`} 
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 