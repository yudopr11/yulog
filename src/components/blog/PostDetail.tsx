import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../common/PageTitle';
import { fetchBlogPostBySlug, type PostDetail } from '../../services/api';
import CustomScrollToTop from '../common/CustomScrollToTop';

// Import the extracted components
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import PostNotFound from './PostNotFound';

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    async function loadPostDetail() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setNotFound(false);
        setError(null);
        
        const data = await fetchBlogPostBySlug(slug);
        
        if (isMounted) {
          setPost(data);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof Error && err.message === 'Post not found') {
            setNotFound(true);
          } else {
            setError('Failed to load post. Please try again later.');
          }
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
      {/* Title with the blog post title if loaded */}
      {post ? (
        <PageTitle 
          title={post.title} 
          description={post.excerpt}
        />
      ) : (
        <PageTitle 
          title={notFound ? "Post Not Found" : "Loading Post..."} 
          description="Blog post detail"
        />
      )}
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-12 relative z-10">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorAlert message={error} />
          ) : notFound ? (
            <PostNotFound />
          ) : post ? (
            <>
              <PostHeader post={post} />
              <PostContent content={post.content} />
              <PostFooter post={post} />
              
              {/* Custom Scroll to Top button */}
              <CustomScrollToTop scrollThreshold={300} smooth={true} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
} 