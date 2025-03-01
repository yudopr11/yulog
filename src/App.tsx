import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import PostDetail from './components/blog/PostDetail';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Toaster position="top-center" />
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<PostDetail />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
} 