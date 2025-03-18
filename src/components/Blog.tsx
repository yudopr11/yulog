import { useState, useEffect } from 'react';
import PageTitle from './common/PageTitle';
import BlogPostCard, { type PostList } from './blog/BlogPostCard';
import { fetchBlogPosts, USE_RAG_DEFAULT } from '../services/api';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';


export default function Blog() {
  // Default posts
  const [defaultPosts, setDefaultPosts] = useState<PostList[]>([]);
  const [defaultLoading, setDefaultLoading] = useState(true);
  const [defaultSkip, setDefaultSkip] = useState(0);
  const [hasMoreDefault, setHasMoreDefault] = useState(true);
  const [totalDefault, setTotalDefault] = useState(0);
  
  // Search results
  const [searchPosts, setSearchPosts] = useState<PostList[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSkip, setSearchSkip] = useState(0);
  const [hasMoreSearch, setHasMoreSearch] = useState(true);
  const [totalSearch, setTotalSearch] = useState(0);
  
  // Shared state
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [useRag, setUseRag] = useState<boolean>(USE_RAG_DEFAULT);
  const limit = 3; // Posts per page
  
  // Effect for loading default posts (when search is empty)
  useEffect(() => {
    let isMounted = true;
    
    if (searchTerm) return; // Skip if there's a search term
    
    async function loadDefaultPosts() {
      try {
        setDefaultLoading(true);
        const data = await fetchBlogPosts(defaultSkip, limit);
        
        if (isMounted) {
          if (defaultSkip === 0) {
            setDefaultPosts(data.items);
          } else {
            setDefaultPosts(prevPosts => [...prevPosts, ...data.items]);
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
  }, [defaultSkip, limit, searchTerm]);

  // Effect for loading search results (when search has a term)
  useEffect(() => {
    let isMounted = true;
    
    if (!searchTerm) return; // Skip if there's no search term
    
    async function loadSearchResults() {
      try {
        setSearchLoading(true);
        const data = await fetchBlogPosts(searchSkip, limit, searchTerm, undefined, 'published', useRag);
        
        if (isMounted) {
          if (searchSkip === 0) {
            setSearchPosts(data.items);
          } else {
            setSearchPosts(prevPosts => [...prevPosts, ...data.items]);
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
  }, [searchSkip, limit, searchTerm, useRag]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchSkip(0); // Reset search pagination
      setHasMoreSearch(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value) {
      // Reset search when input is cleared
      setSearchPosts([]);
      setSearchSkip(0);
    } else {
      // Reset search pagination when input changes
      setSearchSkip(0);
    }
  };

  const handleRagToggle = () => {
    setUseRag(!useRag);
    if (searchTerm) {
      setSearchSkip(0); // Reset search pagination when changing search mode
    }
  };

  const loadMoreDefault = () => {
    setDefaultSkip(prev => prev + limit);
  };

  const loadMoreSearch = () => {
    setSearchSkip(prev => prev + limit);
  };

  // Helper to render posts with animation 
  const renderPostList = (posts: PostList[]) => {
    return (
      <div className="space-y-8">
        {posts.map((post, index) => (
          <div 
            key={post.post_id} 
            className="animate-slide-in" 
            style={{ 
              animationDelay: `${index * 0.1}s`,
              opacity: 0, // Start with opacity 0 (will be animated to 1)
            }}
          >
            <BlogPostCard post={post} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <PageTitle 
        title="Blog" 
        description="Blog posts and articles by yudopr"
      />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-12 relative z-10">
          {/* Search Bar with RAG toggle */}
          <div className="pb-6">
            <form onSubmit={handleSearch}>
              <div className="relative mb-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search posts..."
                  className="w-full bg-transparent border-b border-gray-700 px-4 py-2 outline-none focus:border-gray-400 text-white transition-colors placeholder-gray-500"
                />
                <MagnifyingGlassIcon 
                  className="h-5 w-5 absolute right-2 top-2 text-gray-500"
                />
              </div>
              
              {/* RAG toggle switch */}
              <div className="flex items-center justify-end">
                <span className="text-sm text-gray-400 mr-2">
                  {useRag ? 'Smart Search' : 'Basic Search'}
                </span>
                <button 
                  type="button"
                  onClick={handleRagToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${useRag ? 'bg-primary-600' : 'bg-gray-700'}`}
                  aria-pressed={useRag}
                  aria-labelledby="rag-toggle-label"
                >
                  <span className="sr-only">Use semantic search</span>
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${useRag ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
                <span 
                  id="rag-toggle-label" 
                  className="ml-2 text-xs text-gray-500"
                >
                  AI-powered search
                </span>
              </div>
            </form>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6">
              {error}
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
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold mb-2">No posts found</h2>
                      <p className="text-gray-400">
                        Check back later for new content
                      </p>
                    </div>
                  ) : (
                    <>
                      {renderPostList(defaultPosts)}
                      
                      {/* Show post count and total */}
                      <div className="mt-4 text-sm text-gray-500 text-center">
                        Showing {defaultPosts.length} of {totalDefault} posts
                      </div>
                      
                      {/* Load More Default Posts - only show if no error, posts exist, and hasMore is true */}
                      {!error && defaultPosts.length > 0 && hasMoreDefault && (
                        <div className="mt-10 flex justify-center">
                          <button
                            onClick={loadMoreDefault}
                            disabled={defaultLoading}
                            className="px-6 py-2 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 flex items-center space-x-2"
                          >
                            {defaultLoading && defaultSkip > 0 ? (
                              <>
                                <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-gray-400 rounded-full"></span>
                                <span>Loading...</span>
                              </>
                            ) : (
                              <span>Load More</span>
                            )}
                          </button>
                        </div>
                      )}
                      
                      {/* Message when all posts are loaded */}
                      {!hasMoreDefault && defaultPosts.length > 0 && !defaultLoading && (
                        <div className="mt-8 text-center text-gray-500 text-sm">
                          You've reached the end of the posts
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
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-semibold mb-2">No search results</h2>
                      <p className="text-gray-400">
                        No results for "{searchTerm}"
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h2 className="text-xl font-medium">Search results for "{searchTerm}"</h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Found {totalSearch} results using {useRag ? 'semantic search' : 'keyword search'}
                        </p>
                      </div>
                      {renderPostList(searchPosts)}
                      
                      {/* Load More Search Results - only show if no error, search posts exist, and hasMore is true */}
                      {!error && searchPosts.length > 0 && hasMoreSearch && (
                        <div className="mt-10 flex justify-center">
                          <button
                            onClick={loadMoreSearch}
                            disabled={searchLoading}
                            className="px-6 py-2 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 flex items-center space-x-2"
                          >
                            {searchLoading && searchSkip > 0 ? (
                              <>
                                <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-gray-400 rounded-full"></span>
                                <span>Loading...</span>
                              </>
                            ) : (
                              <span>Load More</span>
                            )}
                          </button>
                        </div>
                      )}
                      
                      {/* Message when all search results are loaded */}
                      {!hasMoreSearch && searchPosts.length > 0 && !searchLoading && (
                        <div className="mt-8 text-center text-gray-500 text-sm">
                          You've reached the end of the search results
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