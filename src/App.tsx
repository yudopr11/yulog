import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import SwipeHandler from './components/SwipeHandler';

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

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <Navbar />
        <SwipeHandler>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<PostDetail />} />
              {/* Catch all route for 404 pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SwipeHandler>
      </div>
    </Router>
  );
} 