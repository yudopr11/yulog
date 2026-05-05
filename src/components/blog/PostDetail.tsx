import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import PageTitle from '../common/PageTitle';
import { fetchBlogPostBySlug } from '../../services/api';
import type { PostDetail as PostDetailType } from '../../types/blog';
import CustomScrollToTop from '../common/CustomScrollToTop';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostDetailSkeleton from './PostDetailSkeleton';
import ErrorAlert from '../common/ErrorAlert';
import PostNotFound from './PostNotFound';
import TableOfContents from './TableOfContents';

interface PostDetailProps {
  slug: string;
  initialPost?: PostDetailType;
}

export default function PostDetail({ slug, initialPost }: PostDetailProps) {
  const [post, setPost] = useState<PostDetailType | null>(initialPost ?? null);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialPost) return;

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
  }, [slug, initialPost]);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569' },
          success: { iconTheme: { primary: '#30BDF2', secondary: '#1e293b' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#1e293b' } },
        }}
      />

      {post ? (
        <PageTitle
          title={post.title}
          description={post.excerpt ?? undefined}
          type="article"
        />
      ) : (
        <PageTitle
          title={notFound ? 'Post Not Found' : 'Loading Post...'}
          description="Blog post detail"
          type="article"
        />
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 80px' }}>
        {loading ? (
          <PostDetailSkeleton />
        ) : error ? (
          <ErrorAlert message={error} />
        ) : notFound ? (
          <PostNotFound />
        ) : post ? (
          <div className="post-layout">
            {/* Main article column */}
            <article style={{ minWidth: 0 }}>
              <PostHeader post={post} />
              <PostContent content={post.content} />
              <PostFooter />
            </article>

            {/* Sticky sidebar */}
            <aside className="post-sidebar" style={{ position: 'sticky', top: 88 }}>
              <TableOfContents content={post.content ?? ''} />
            </aside>
          </div>
        ) : null}
      </div>

      <CustomScrollToTop scrollThreshold={300} smooth={true} />
    </div>
  );
}
