import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../common/PageTitle';
import { fetchBlogPostBySlug } from '../../services/api';
import type { PostDetail } from '../../types/blog';
import CustomScrollToTop from '../common/CustomScrollToTop';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostDetailSkeleton from './PostDetailSkeleton';
import ErrorAlert from '../common/ErrorAlert';
import PostNotFound from './PostNotFound';
import TableOfContents from './TableOfContents';

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
    <div style={{ position: 'relative', zIndex: 1 }}>
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
