import type { PostList } from '../components/blog/BlogPostCard';

// API base URL from environment variables (.env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Default RAG setting
export const USE_RAG_DEFAULT = false;

// Type definitions based on API documentation
export interface UserBase {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserDetail extends UserBase {
  uuid: string;
  is_superuser: boolean;
  created_at: string;
}

export interface PostDetail extends PostList {
  content: string;
  updated_at: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  is_superuser?: boolean;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  published: boolean;
}

export interface PostListResponse {
  items: PostList[];
  total_count: number;
  has_more: boolean;
  limit: number;
  skip: number;
}

export interface DeleteResponse {
  message: string;
  deleted_item: {
    id: number;
    title: string;
    uuid: string;
  };
}

// Authentication Functions

// Function to handle registration (superuser only)
export async function register(userData: RegisterRequest): Promise<UserDetail> {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Function to handle login
export async function login(username: string, password: string): Promise<AuthResponse> {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData,
      credentials: 'include' // Important for receiving cookies
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Store token in localStorage for future requests
    localStorage.setItem('access_token', data.access_token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Function to refresh token
export async function refreshToken(): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include' // Important for sending cookies
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Update token in localStorage
    localStorage.setItem('access_token', data.access_token);
    return data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}

// Function to handle logout
export async function logout(): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include' // Important for clearing cookies
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Clear token from localStorage
    localStorage.removeItem('access_token');
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

// Function to get all users (superuser only)
export async function fetchAllUsers(): Promise<UserDetail[]> {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Function to delete a user (superuser only)
export async function deleteUser(userId: number): Promise<any> {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting user with id ${userId}:`, error);
    throw error;
  }
}

// Blog Post Functions

// Function to fetch blog posts with pagination and search
export async function fetchBlogPosts(
  skip: number = 0, 
  limit: number = 3, 
  search?: string,
  tag?: string,
  publishedStatus: 'published' | 'unpublished' | 'all' = 'published',
  useRag?: boolean
): Promise<PostListResponse> {
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

// Function to create a new blog post (authenticated)
export async function createBlogPost(postData: CreatePostRequest): Promise<PostDetail> {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/blog/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

// Function to update a blog post (authenticated, author or superuser only)
export async function updateBlogPost(postId: number, postData: CreatePostRequest): Promise<PostDetail> {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/blog/admin/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Post not found');
      }
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating blog post with id ${postId}:`, error);
    throw error;
  }
}

// Function to delete a blog post (authenticated, superuser only)
export async function deleteBlogPost(postId: number): Promise<DeleteResponse> {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/blog/admin/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Post not found');
      }
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting blog post with id ${postId}:`, error);
    throw error;
  }
}
