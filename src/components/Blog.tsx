import { useState, useEffect, useCallback } from 'react';
import PageTitle from './common/PageTitle';
import BlogPostCard from './blog/BlogPostCard';
import { fetchBlogPosts, USE_RAG_DEFAULT } from '../services/api';
import { MagnifyingGlassIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import type { PostListItem } from '../types/blog';

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
          } else {
            setDefaultPosts(prevPosts => {
              const existingIds = new Set(prevPosts.map(p => p.id));
              const newUniquePosts = data.items.filter(item => !existingIds.has(item.id));
              return [...prevPosts, ...newUniquePosts];
            });
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
          } else {
            setSearchPosts(prevPosts => {
              const existingIds = new Set(prevPosts.map(p => p.id));
              const newUniquePosts = data.items.filter(item => !existingIds.has(item.id));
              return [...prevPosts, ...newUniquePosts];
            });
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

  const handleRagToggle = useCallback(() => {
    setUseRag(!useRag);
    if (searchTerm) {
      setSearchSkip(0);
    }
  }, [useRag, searchTerm]);

  const loadMoreDefault = useCallback(() => {
    setDefaultSkip(prev => prev + POSTS_PER_PAGE);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 300);
  }, []);

  const loadMoreSearch = useCallback(() => {
    setSearchSkip(prev => prev + POSTS_PER_PAGE);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 300);
  }, []);

  // Helper to render posts with animation - memoized to prevent unnecessary re-renders
  const renderPostList = useCallback((posts: PostListItem[]) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-slide-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
            }}
          >
            <BlogPostCard post={post} />
          </div>
        ))}
      </div>
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <PageTitle 
        title="Blog" 
        description="Blog posts and articles by yudopr"
      />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10 py-4 sm:py-5 lg:py-6">
          {/* Search Bar with RAG toggle */}
          <div className="pb-6">
            <form onSubmit={handleSearch}>
              {/* Search Input */}
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative flex items-center bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-2xl focus-within:border-primary-500/50 transition-all duration-300 px-6 py-4">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search posts by title, tag, or content..."
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm sm:text-base"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSearchPosts([]);
                        setSearchSkip(0);
                      }}
                      className="ml-2 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Search Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Search Mode Info */}
                <div className="text-xs sm:text-sm text-gray-400">
                  {searchTerm ? (
                    <span>
                      Searching with <span className="text-primary-400 font-medium">{useRag ? '🤖 AI-Powered' : '🔍 Keyword'}</span> mode
                    </span>
                  ) : (
                    <span>
                      <span className="text-primary-400 font-medium">{useRag ? '🤖 AI-Powered' : '🔍 Keyword'}</span> search mode
                    </span>
                  )}
                </div>

                {/* RAG Toggle Switch */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRagToggle}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none ${useRag ? 'bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-500/30' : 'bg-gray-700'}`}
                    aria-pressed={useRag}
                    aria-labelledby="rag-toggle-label"
                  >
                    <span className="sr-only">Use semantic search</span>
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${useRag ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                  <span id="rag-toggle-label" className="text-xs text-gray-500 whitespace-nowrap">
                    Semantic search
                  </span>
                </div>
              </div>
            </form>
          </div>
          
          {error && (
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/50 backdrop-blur-xl text-red-200 p-4 sm:p-6 rounded-2xl mb-8 flex items-center gap-3">
              <div className="text-xl flex-shrink-0">⚠️</div>
              <p>{error}</p>
            </div>
          )}
          
          {/* Default Posts Container - Visible when search is empty */}
          {!searchTerm && (
            <>
              {defaultLoading && defaultSkip === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <>
                  {defaultPosts.length === 0 ? (
                    <div className="text-center py-20 sm:py-28">
                      {/* Animated empty state background */}
                      <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative text-7xl sm:text-8xl mb-6 animate-bounce" style={{ animationDelay: '0s' }}>✍️</div>
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                        The blog is still being written! 📖
                      </h2>
                      <p className="text-lg text-gray-400 mb-2">
                        Fresh content is coming soon. Check back regularly for new articles and insights.
                      </p>

                      {/* Suggestions */}
                      <div className="mt-10 space-y-3">
                        <p className="text-sm text-gray-500">💡 In the meantime:</p>
                        <ul className="text-sm text-gray-400 space-y-2 flex flex-col items-center">
                          <li>• Follow on social media for updates</li>
                          <li>• Check out the projects section</li>
                          <li>• Bookmark this page to visit later</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        {renderPostList(defaultPosts)}
                      </div>

                      {/* Show post count and pagination info */}
                      <div className="mt-10 px-6 py-4 bg-gradient-to-r from-gray-900/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-xl text-center">
                        <p className="text-sm text-gray-400">
                          Showing <span className="text-primary-400 font-bold text-base">{defaultPosts.length}</span> of <span className="text-primary-400 font-bold text-base">{totalDefault}</span> posts
                          {hasMoreDefault && <span className="text-gray-500"> • More available</span>}
                        </p>
                      </div>
                      
                      {/* Load More Default Posts - only show if no error, posts exist, and hasMore is true */}
                      {!error && defaultPosts.length > 0 && hasMoreDefault && (
                        <div className="mt-12 flex justify-center">
                          <button
                            onClick={loadMoreDefault}
                            disabled={defaultLoading}
                            className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 hover:translate-y-[-2px]"
                          >
                            {defaultLoading && defaultSkip > 0 ? (
                              <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                <span>Loading more posts...</span>
                              </>
                            ) : (
                              <>
                                <span>Load More Posts</span>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      
                      {/* Message when all posts are loaded */}
                      {!hasMoreDefault && defaultPosts.length > 0 && !defaultLoading && (
                        <div className="mt-12 text-center py-8">
                          <div className="text-4xl mb-3">✨</div>
                          <p className="text-gray-400">
                            You've reached the end! All <span className="text-primary-400 font-semibold">{totalDefault}</span> posts displayed.
                          </p>
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
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <>
                  {searchPosts.length === 0 ? (
                    <div className="text-center py-20 sm:py-28">
                      {/* Animated empty state background */}
                      <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative text-7xl sm:text-8xl mb-6 animate-bounce" style={{ animationDelay: '0s' }}>🔍</div>
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                        Hmm, looks like that post went hiding! 🏃‍♂️
                      </h2>
                      <p className="text-lg text-gray-400 mb-2">
                        We couldn't find any posts matching <span className="text-primary-400 font-semibold">"{searchTerm}"</span>
                      </p>

                      {/* Suggestions */}
                      <div className="mt-10 space-y-3">
                        <p className="text-sm text-gray-500">💡 Try:</p>
                        <ul className="text-sm text-gray-400 space-y-2 flex flex-col items-center">
                          <li>• Using different keywords</li>
                          <li>• Toggling {useRag ? 'keyword search' : 'AI-powered search'}</li>
                          <li>• Checking your spelling</li>
                        </ul>
                      </div>

                      {/* Clear search button */}
                      <div className="mt-8">
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSearchPosts([]);
                            setSearchSkip(0);
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:translate-y-[-2px] inline-block"
                        >
                          Clear Search
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8 pb-8 border-b border-gray-700/30">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Search results for <span className="text-primary-400">"{searchTerm}"</span></h2>
                        <p className="text-sm text-gray-400">
                          Found <span className="text-primary-400 font-semibold">{totalSearch}</span> result{totalSearch !== 1 ? 's' : ''} using {useRag ? '🤖 semantic search' : '🔍 keyword search'}
                        </p>
                      </div>
                      <div>
                        {renderPostList(searchPosts)}
                      </div>

                      {/* Show search pagination info */}
                      <div className="mt-10 px-6 py-4 bg-gradient-to-r from-gray-900/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-xl text-center">
                        <p className="text-sm text-gray-400">
                          Showing <span className="text-primary-400 font-bold text-base">{searchPosts.length}</span> of <span className="text-primary-400 font-bold text-base">{totalSearch}</span> result{totalSearch !== 1 ? 's' : ''}
                          {hasMoreSearch && <span className="text-gray-500"> • More available</span>}
                        </p>
                      </div>

                      {/* Load More Search Results - only show if no error, search posts exist, and hasMore is true */}
                      {!error && searchPosts.length > 0 && hasMoreSearch && (
                        <div className="mt-12 flex justify-center">
                          <button
                            onClick={loadMoreSearch}
                            disabled={searchLoading}
                            className="group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 hover:translate-y-[-2px]"
                          >
                            {searchLoading && searchSkip > 0 ? (
                              <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                <span>Loading more results...</span>
                              </>
                            ) : (
                              <>
                                <span>Load More Results</span>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      
                      {/* Message when all search results are loaded */}
                      {!hasMoreSearch && searchPosts.length > 0 && !searchLoading && (
                        <div className="mt-12 text-center py-8">
                          <div className="text-4xl mb-3">🎯</div>
                          <p className="text-gray-400">
                            That's all! <span className="text-primary-400 font-semibold">{totalSearch}</span> result{totalSearch !== 1 ? 's' : ''} found.
                          </p>
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
    </div>
  );
} 