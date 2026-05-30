import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchBlogPosts, fetchBlogPostBySlug, type PaginatedPostsResponse } from './api';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:8000');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchBlogPosts', () => {
  const mockResponse: PaginatedPostsResponse = {
    items: [
      {
        id: '1',
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        tags: ['Test'],
        reading_time: 5,
        published: true,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
        user: { id: 'u1', username: 'author', email: 'a@b.com' },
      },
    ],
    total_count: 1,
    has_more: false,
    limit: 10,
    skip: 0,
    next_cursor: null,
  };

  it('fetches posts with default params', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });
    const result = await fetchBlogPosts();
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('skip=0');
    expect(calledUrl).toContain('limit=10');
    expect(result.items).toHaveLength(1);
  });

  it('passes cursor param', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });
    await fetchBlogPosts(0, 10, undefined, undefined, 'published', undefined, '2026-02-11T16:13:03Z');
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('cursor=');
  });

  it('passes search and use_rag params', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });
    await fetchBlogPosts(0, 10, 'python', undefined, 'published', true);
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('search=python');
    expect(calledUrl).toContain('use_rag=true');
  });

  it('passes tag param', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });
    await fetchBlogPosts(0, 10, undefined, 'FastAPI');
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('tag=FastAPI');
  });

  it('passes skip param', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockResponse });
    await fetchBlogPosts(10);
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('skip=10');
  });

  it('includes next_cursor in response', async () => {
    const withCursor = { ...mockResponse, next_cursor: '2026-02-11T16:13:03Z' };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => withCursor });
    const result = await fetchBlogPosts();
    expect(result.next_cursor).toBe('2026-02-11T16:13:03Z');
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Internal Server Error' });
    await expect(fetchBlogPosts()).rejects.toThrow('500');
  });
});

describe('fetchBlogPostBySlug', () => {
  it('fetches single post by slug', async () => {
    const mockPost = { id: '1', title: 'Test', slug: 'test', content: 'body' };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockPost });
    const result = await fetchBlogPostBySlug('test');
    expect(result).toEqual(mockPost);
    expect(mockFetch.mock.calls[0][0]).toContain('/blog/test');
  });

  it('throws on 404', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(fetchBlogPostBySlug('nonexistent')).rejects.toThrow('not found');
  });
});
