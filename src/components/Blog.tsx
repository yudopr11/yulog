import { useState, useEffect } from 'react';
import PageTitle from './common/PageTitle';
import BlogPostCard, { type PostList } from './blog/BlogPostCard';
import { fetchBlogPosts } from '../services/api';

export default function Blog() {
  // Default posts
  const [defaultPosts, setDefaultPosts] = useState<PostList[]>([]);
  const [defaultLoading, setDefaultLoading] = useState(true);
  const [defaultSkip, setDefaultSkip] = useState(0);
  const [hasMoreDefault, setHasMoreDefault] = useState(true);
  
  // Search results
  const [searchPosts, setSearchPosts] = useState<PostList[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchSkip, setSearchSkip] = useState(0);
  const [hasMoreSearch, setHasMoreSearch] = useState(true);
  
  // Shared state
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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
            setDefaultPosts(data);
          } else {
            setDefaultPosts(prevPosts => [...prevPosts, ...data]);
          }
          
          // Only show "Load More" if we received exactly the limit number of posts
          setHasMoreDefault(data.length >= limit);
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
        const data = await fetchBlogPosts(searchSkip, limit, searchTerm);
        
        if (isMounted) {
          if (searchSkip === 0) {
            setSearchPosts(data);
          } else {
            setSearchPosts(prevPosts => [...prevPosts, ...data]);
          }
          
          // Only show "Load More" if we received exactly the limit number of posts
          setHasMoreSearch(data.length >= limit);
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
  }, [searchSkip, limit, searchTerm]);

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
            key={post.id} 
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
          {/* Search Bar */}
          <div className="pb-6">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search posts..."
                  className="w-full bg-transparent border-b border-gray-700 px-4 py-2 outline-none focus:border-gray-400 text-white transition-colors placeholder-gray-500"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 absolute right-2 top-2 text-gray-500"
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
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