
// src/types/blog.ts

export interface UserBase {
  id: string; // UUID
  username: string;
  email: string;
}

export interface PostListItem {
  id: string; // UUID
  title: string;
  excerpt?: string | null;
  slug: string;
  reading_time: number;
  tags?: string[] | null;
  published: boolean;
  user: UserBase; // Renamed from 'author' to 'user'
  created_at: string;
  updated_at: string;
}

export interface PostDetail extends PostListItem {
  content: string;
}

export interface PaginatedPostsResponse {
  items: PostListItem[];
  total_count: number;
  has_more: boolean;
  limit: number;
  skip: number;
}
