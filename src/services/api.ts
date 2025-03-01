import type { PostList } from '../components/blog/BlogPostCard';

// API base URL dari variabel lingkungan (.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Mengambil daftar blog posts
export async function fetchBlogPosts(
  skip: number = 0, 
  limit: number = 3, 
  search?: string
): Promise<PostList[]> {
  let url = `${API_BASE_URL}/blog?skip=${skip}&limit=${limit}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error; // Re-throw error untuk ditangani di komponen
  }
}

// Mengambil post detail berdasarkan slug
export async function fetchBlogPostBySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw error;
  }
}
