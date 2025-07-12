import type { PostDetail, PaginatedPostsResponse } from '../types/blog';

// API base URL from environment variables (.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://yupi-dev.up.railway.app';

// Default RAG setting
export const USE_RAG_DEFAULT = false;

// Blog Post Functions
// Function to fetch blog posts with pagination and search
export async function fetchBlogPosts(
  skip: number = 0, 
  limit: number = 3, 
  search?: string,
  tag?: string,
  publishedStatus: 'published' | 'unpublished' | 'all' = 'published',
  useRag?: boolean
): Promise<PaginatedPostsResponse> {
  let url = `${API_BASE_URL}/blog?skip=${skip}&limit=${limit}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (tag) {
    url += `&tag=${encodeURIComponent(tag)}`;
  }
  
  if (publishedStatus !== 'published') {
    url += `&published_status=${publishedStatus}`;
  }
  
  // Apply RAG setting from .env if not explicitly provided
  const finalUseRag = useRag !== undefined ? useRag : USE_RAG_DEFAULT;
  if (search && finalUseRag !== undefined) {
    url += `&use_rag=${finalUseRag}`;
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error; // Re-throw error to be handled in the component
  }
}

// Function to fetch a blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<PostDetail> {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Post not found');
      }
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }
}