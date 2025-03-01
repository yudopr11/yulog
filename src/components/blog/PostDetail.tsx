import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../common/PageTitle';
import { fetchBlogPostBySlug } from '../../services/api';
import type { PostList } from './BlogPostCard';
import ScrollToTop from 'react-scroll-to-top';

// Import the extracted components
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import PostNotFound from './PostNotFound';

// Extend PostList for detail post yang lengkap
export interface PostDetail extends PostList {
  content: string;
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadPostDetail() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await fetchBlogPostBySlug(slug);
        
        if (isMounted) {
          setPost(data as PostDetail);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load post. Please try again later.');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    loadPostDetail();
    
    return () => {
      isMounted = false;
    };
  }, [slug]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <PageTitle 
        title={post?.title || 'Blog Post'} 
        description={post?.excerpt || 'Blog post by yudopr'}
      />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-12 relative z-10">
          {error && <ErrorAlert message={error} />}
          
          {loading ? (
            <LoadingSpinner />
          ) : post ? (
            <>
              <article className="prose prose-invert prose-lg max-w-none">
                <PostHeader post={post} />
                <PostContent content={post.content} excerpt={post.excerpt} />
              </article>
              
              <PostFooter title={post.title} />
            </>
          ) : (
            <PostNotFound />
          )}
        </div>
      </div>
      
      {/* Back to Top Button */}
      <ScrollToTop 
        smooth 
        component={<ArrowUpIcon />} 
        style={{
          backgroundColor: '#2563eb', // primary blue color
          borderRadius: '50%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          color: 'white',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 20,
          bottom: '1.5rem',
          right: '1.5rem'
        }}
      />
    </div>
  );
}

// Arrow Up Icon Component
const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
); 