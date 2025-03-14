import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

interface CustomScrollToTopProps {
  scrollThreshold?: number;
  smooth?: boolean;
}

export default function CustomScrollToTop({ 
  scrollThreshold = 300, 
  smooth = true 
}: CustomScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Fungsi untuk memeriksa posisi scroll
  const toggleVisibility = () => {
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed z-20 bg-primary-700 hover:bg-primary-600 transition-colors duration-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          style={{ bottom: '20px', right: '20px' }}
          aria-label="Scroll to top"
        >
          <ChevronUpIcon 
            className="h-5 w-5 text-white" 
            stroke="currentColor"
            strokeWidth={2}
          />
        </button>
      )}
    </>
  );
} 