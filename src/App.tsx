import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import SwipeHandler from './components/SwipeHandler';
import ScrollToTop from './components/ScrollToTop';
import { useLocation } from 'react-router-dom';

// Lazy load components for code splitting
const Home = lazy(() => import('./components/Home'));
const Blog = lazy(() => import('./components/Blog'));
const PostDetail = lazy(() => import('./components/blog/PostDetail'));
const NotFound = lazy(() => import('./components/NotFound'));

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-[70vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
  </div>
);

// Component to conditionally render SwipeHandler
const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  // Only use SwipeHandler on top-level routes (no sub-paths)
  if (pathParts.length <= 1) {
    return <SwipeHandler>{children}</SwipeHandler>;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #475569'
          },
          success: {
            iconTheme: {
              primary: '#30BDF2',
              secondary: '#1e293b',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1e293b',
            },
          },
        }} />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={
              <RouteWrapper>
                <Home />
              </RouteWrapper>
            } />
            <Route path="/blog" element={
              <RouteWrapper>
                <Blog />
              </RouteWrapper>
            } />
            <Route path="/blog/:slug" element={<PostDetail />} />
            {/* Catch all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
} 