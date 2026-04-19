import { useState, useEffect, useCallback, useRef } from 'react';
import PageTitle from './common/PageTitle';
import BlogPostCard from './blog/BlogPostCard';
import BlogPostCardSkeleton from './blog/BlogPostCardSkeleton';
import CustomScrollToTop from './common/CustomScrollToTop';
import { fetchBlogPosts, USE_RAG_DEFAULT } from '../services/api';
import type { PostListItem } from '../types/blog';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12M18 6L6 18"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

const POSTS_PER_PAGE = 4;

export default function Blog() {
  // Default posts
  const [defaultPosts, setDefaultPosts] = useState<PostListItem[]>([]);
  const [defaultLoading, setDefaultLoading] = useState(true);
  const [defaultSkip, setDefaultSkip] = useState(0);
  const [hasMoreDefault, setHasMoreDefault] = useState(true);
  const [totalDefault, setTotalDefault] = useState(0);

  // Search results
  const [searchPosts, setSearchPosts] = useState<PostListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSkip, setSearchSkip] = useState(0);
  const [hasMoreSearch, setHasMoreSearch] = useState(true);
  const [totalSearch, setTotalSearch] = useState(0);

  // Shared state
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [useRag, setUseRag] = useState<boolean>(USE_RAG_DEFAULT);

  // Track when to scroll to newly loaded posts
  const [shouldScrollDefault, setShouldScrollDefault] = useState(false);
  const [shouldScrollSearch, setShouldScrollSearch] = useState(false);
  const newPostsRefDefault = useRef<HTMLDivElement>(null);
  const newPostsRefSearch = useRef<HTMLDivElement>(null);
  
  // Effect for loading default posts (when search is empty)
  useEffect(() => {
    let isMounted = true;

    if (searchTerm) return; // Skip if there's a search term

    async function loadDefaultPosts() {
      try {
        setDefaultLoading(true);
        const data = await fetchBlogPosts(defaultSkip, POSTS_PER_PAGE);

        if (isMounted) {
          if (defaultSkip === 0) {
            setDefaultPosts(data.items);
            setShouldScrollDefault(false);
          } else {
            setDefaultPosts(prevPosts => {
              const existingIds = new Set(prevPosts.map(p => p.id));
              const newUniquePosts = data.items.filter(item => !existingIds.has(item.id));
              return [...prevPosts, ...newUniquePosts];
            });
            setShouldScrollDefault(true);
          }

          setTotalDefault(data.total_count);
          setHasMoreDefault(data.has_more);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load blog posts. Please try again later.');
          console.error(err);
          setHasMoreDefault(false); // Set hasMore to false when there's an error
        }
      } finally {
        if (isMounted) {
          setDefaultLoading(false);
        }
      }
    }

    loadDefaultPosts();

    return () => {
      isMounted = false;
    };
  }, [defaultSkip, POSTS_PER_PAGE, searchTerm]);

  // Effect to scroll to bottom when new default posts are loaded
  useEffect(() => {
    if (shouldScrollDefault) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 200);
      setShouldScrollDefault(false);
    }
  }, [shouldScrollDefault]);

  // Effect for loading search results (when search has a term)
  useEffect(() => {
    let isMounted = true;

    if (!searchTerm) return; // Skip if there's no search term

    async function loadSearchResults() {
      try {
        setSearchLoading(true);
        const data = await fetchBlogPosts(searchSkip, POSTS_PER_PAGE, searchTerm, undefined, 'published', useRag);

        if (isMounted) {
          if (searchSkip === 0) {
            setSearchPosts(data.items);
            setShouldScrollSearch(false);
          } else {
            setSearchPosts(prevPosts => {
              const existingIds = new Set(prevPosts.map(p => p.id));
              const newUniquePosts = data.items.filter(item => !existingIds.has(item.id));
              return [...prevPosts, ...newUniquePosts];
            });
            setShouldScrollSearch(true);
          }

          setTotalSearch(data.total_count);
          setHasMoreSearch(data.has_more);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load search results. Please try again later.');
          console.error(err);
          setHasMoreSearch(false); // Set hasMore to false when there's an error
        }
      } finally {
        if (isMounted) {
          setSearchLoading(false);
        }
      }
    }

    // Debounce search requests
    const timeoutId = setTimeout(() => {
      loadSearchResults();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchSkip, POSTS_PER_PAGE, searchTerm, useRag]);

  // Effect to scroll to bottom when new search results are loaded
  useEffect(() => {
    if (shouldScrollSearch) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 200);
      setShouldScrollSearch(false);
    }
  }, [shouldScrollSearch]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchSkip(0);
      setHasMoreSearch(true);
    }
  }, [searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value) {
      setSearchPosts([]);
      setSearchSkip(0);
    } else {
      setSearchSkip(0);
    }
  }, []);

  const loadMoreDefault = useCallback(() => {
    setDefaultSkip(prev => prev + POSTS_PER_PAGE);
  }, []);

  const loadMoreSearch = useCallback(() => {
    setSearchSkip(prev => prev + POSTS_PER_PAGE);
  }, []);

  const renderPostList = useCallback((posts: PostListItem[]) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
        {posts.map(post => (
          <div key={post.id} className="cuan-fade-in">
            <BlogPostCard post={post} />
          </div>
        ))}
      </div>
    );
  }, []);

  return (
    <div className="min-h-screen" style={{ position: 'relative', zIndex: 1 }}>
      <PageTitle
        title="Blog"
        description="Blog posts and articles by yudopr"
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 80px' }}>
        {/* Page header */}
        <div className="cuan-slide-up" style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ color: 'var(--primary-500)', marginBottom: 12 }}>Writing</div>
          <h1 style={{
            margin: 0, fontSize: 'clamp(36px,5vw,56px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--fg-1)',
          }}>
            Notes from <span className="brand-text">the pipeline.</span>
          </h1>
          <p style={{ marginTop: 14, color: 'var(--fg-4)', fontSize: 16, maxWidth: 600 }}>
            Long-form posts on data engineering, LLMs, and side projects.
          </p>
        </div>

        {/* Search block */}
        <div className="cuan-card" style={{ padding: 20, marginBottom: 32 }}>
          <form onSubmit={handleSearch}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ color: 'var(--fg-5)', flexShrink: 0, display: 'flex' }}><SearchIcon /></span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by title, tag, or content…"
                style={{
                  flex: 1, background: 'transparent', border: 'none',
                  color: 'var(--fg-1)', outline: 'none', fontSize: 15,
                  fontFamily: 'inherit',
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setSearchPosts([]); setSearchSkip(0); }}
                  className="cuan-btn cuan-btn-ghost"
                  style={{ padding: 6 }}
                >
                  <XIcon />
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="eyebrow" style={{ fontSize: 11 }}>Search mode</span>
                <div className="period-toggle">
                  <button
                    type="button"
                    className={!useRag ? 'active' : ''}
                    onClick={() => { setUseRag(false); if (searchTerm) setSearchSkip(0); }}
                  >
                    <SearchIcon /> Keyword
                  </button>
                  <button
                    type="button"
                    className={useRag ? 'active' : ''}
                    onClick={() => { setUseRag(true); if (searchTerm) setSearchSkip(0); }}
                  >
                    <SparkleIcon /> Semantic
                  </button>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-5)' }}>
                {searchTerm
                  ? <>Showing <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{totalSearch}</span> results for "<span style={{ color: 'var(--fg-2)' }}>{searchTerm}</span>"</>
                  : <>Showing <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{totalDefault}</span> posts</>
                }
              </div>
            </div>
          </form>
        </div>
          
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)',
              borderRadius: 12, padding: '14px 18px', marginBottom: 24,
              color: 'var(--expense)', fontSize: 14,
            }}>
              {error}
            </div>
          )}
          
          {/* Default Posts Container - Visible when search is empty */}
          {!searchTerm && (
            <>
              {defaultLoading && defaultSkip === 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <BlogPostCardSkeleton />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {defaultPosts.length === 0 ? (
                    <div className="cuan-card" style={{ padding: 60, textAlign: 'center' }}>
                      <div className="icon-tile brand" style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: 16 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4V4zM20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7V4z"/>
                        </svg>
                      </div>
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>No posts yet</h3>
                      <p style={{ margin: '8px 0 0', color: 'var(--fg-4)' }}>Fresh content is coming soon. Check back regularly!</p>
                    </div>
                  ) : (
                    <>
                      <div ref={newPostsRefDefault}>
                        {renderPostList(defaultPosts)}
                      </div>

                      {/* Post count info */}
                      <div style={{
                        marginTop: 32, padding: '12px 20px', textAlign: 'center',
                        borderRadius: 12, border: '1px solid var(--border-soft)',
                        background: 'rgba(255,255,255,0.02)', fontSize: 13, color: 'var(--fg-5)',
                      }}>
                        Showing <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{defaultPosts.length}</span> of <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{totalDefault}</span> posts
                      </div>

                      {/* Load more */}
                      {!error && defaultPosts.length > 0 && hasMoreDefault && (
                        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                          <button
                            onClick={loadMoreDefault}
                            disabled={defaultLoading}
                            className="cuan-btn cuan-btn-primary"
                            style={{ padding: '12px 24px', opacity: defaultLoading ? 0.6 : 1 }}
                          >
                            {defaultLoading && defaultSkip > 0 ? 'Loading…' : <>Load more posts <ArrowIcon /></>}
                          </button>
                        </div>
                      )}

                      {/* All loaded */}
                      {!hasMoreDefault && defaultPosts.length > 0 && !defaultLoading && (
                        <div style={{ marginTop: 40, textAlign: 'center', color: 'var(--fg-5)', fontSize: 13 }}>
                          All <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{totalDefault}</span> posts displayed.
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          
          {/* Search Results Container - Visible when search has a term */}
          {searchTerm && (
            <>
              {searchLoading && searchSkip === 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <BlogPostCardSkeleton />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {searchPosts.length === 0 ? (
                    <div className="cuan-card" style={{ padding: 60, textAlign: 'center' }}>
                      <div className="icon-tile brand" style={{ width: 56, height: 56, margin: '0 auto 16px', borderRadius: 16 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
                        </svg>
                      </div>
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--fg-1)' }}>No posts found</h3>
                      <p style={{ margin: '8px 0 20px', color: 'var(--fg-4)' }}>Nothing matches "{searchTerm}". Try different keywords or toggle {useRag ? 'keyword' : 'semantic'} search.</p>
                      <button
                        className="cuan-btn cuan-btn-primary"
                        style={{ padding: '10px 20px' }}
                        onClick={() => { setSearchTerm(''); setSearchPosts([]); setSearchSkip(0); }}
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <>
                      <div ref={newPostsRefSearch}>
                        {renderPostList(searchPosts)}
                      </div>

                      {/* Pagination info */}
                      <div style={{
                        marginTop: 32, padding: '12px 20px', textAlign: 'center',
                        borderRadius: 12, border: '1px solid var(--border-soft)',
                        background: 'rgba(255,255,255,0.02)', fontSize: 13, color: 'var(--fg-5)',
                      }}>
                        Showing <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{searchPosts.length}</span> of <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{totalSearch}</span> results
                      </div>

                      {/* Load more */}
                      {!error && searchPosts.length > 0 && hasMoreSearch && (
                        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                          <button
                            onClick={loadMoreSearch}
                            disabled={searchLoading}
                            className="cuan-btn cuan-btn-primary"
                            style={{ padding: '12px 24px', opacity: searchLoading ? 0.6 : 1 }}
                          >
                            {searchLoading && searchSkip > 0 ? 'Loading…' : <>Load more results <ArrowIcon /></>}
                          </button>
                        </div>
                      )}

                      {!hasMoreSearch && searchPosts.length > 0 && !searchLoading && (
                        <div style={{ marginTop: 40, textAlign: 'center', color: 'var(--fg-5)', fontSize: 13 }}>
                          All <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>{totalSearch}</span> results found.
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
      </div>
    </div>
    <CustomScrollToTop />
  );
} 