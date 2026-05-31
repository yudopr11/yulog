import type { PostDetail, PaginatedPostsResponse } from '../types/blog';

// Default RAG setting — reads from env var, falls back to false
export const USE_RAG_DEFAULT = import.meta.env.VITE_USE_RAG_DEFAULT === 'true';

// Blog Post Functions
export async function fetchBlogPosts(
  skip: number = 0,
  limit: number = 10,
  search?: string,
  tag?: string,
  publishedStatus: 'published' | 'unpublished' | 'all' = 'published',
  useRag?: boolean,
  cursor?: string | null,
): Promise<PaginatedPostsResponse> {
  const params = new URLSearchParams();
  params.set('skip', String(skip));
  params.set('limit', String(limit));
  if (cursor) params.set('cursor', cursor);

  if (search) params.set('search', search);
  if (tag) params.set('tag', tag);
  if (publishedStatus !== 'published') params.set('published_status', publishedStatus);

  const finalUseRag = useRag !== undefined ? useRag : USE_RAG_DEFAULT;
  if (search && finalUseRag !== undefined) params.set('use_rag', String(finalUseRag));

  const url = typeof window !== 'undefined'
    ? `/api/blog?${params}`
    : `${import.meta.env.VITE_API_BASE_URL}/blog?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<PostDetail> {
  const url = typeof window !== 'undefined'
    ? `/api/blog/${slug}`
    : `${import.meta.env.VITE_API_BASE_URL}/blog/${slug}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Post not found');
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }
}
