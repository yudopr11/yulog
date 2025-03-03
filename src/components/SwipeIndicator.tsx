import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SwipeIndicator() {
  const location = useLocation();
  const [showIndicator, setShowIndicator] = useState(true);
  const [recentlyVisited, setRecentlyVisited] = useState<string[]>([]);
  
  // Hide indicator after user has seen it on multiple pages
  useEffect(() => {
    if (!recentlyVisited.includes(location.pathname)) {
      setRecentlyVisited(prev => [...prev, location.pathname]);
    }
    
    // Hide indicator after visiting 3+ pages
    if (recentlyVisited.length >= 3) {
      setShowIndicator(false);
    }
    
    // Hide indicator after 5 seconds on each page
    const timer = setTimeout(() => {
      setShowIndicator(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [location.pathname, recentlyVisited]);
  
  if (!showIndicator) return null;
  
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-50">
      <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-8 shadow-xl">
        {location.pathname !== '/blog' && (
          <div className="flex items-center space-x-2">
            <div className="text-primary-400 animate-pulse">←</div>
            <span className="text-sm text-gray-300">Blog</span>
          </div>
        )}
        
        {location.pathname !== '/' && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Home</span>
            <div className="text-primary-400 animate-pulse">→</div>
          </div>
        )}
      </div>
    </div>
  );
} 