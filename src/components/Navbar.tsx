import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// NavLink component for modular navigation items
interface NavLinkProps {
  to: string;
  children: ReactNode;
  currentPath: string;
}

const NavLink = ({ to, children, currentPath }: NavLinkProps) => {
  // Check if active: exact match or (for blog) if currentPath starts with "/blog/"
  const isActive = 
    currentPath === to || 
    (to === '/blog' && (currentPath.startsWith('/blog/') || currentPath === '/blog'));
  
  return (
    <Link
      to={to}
      className={`relative py-2 transition-all duration-300 
        ${isActive 
          ? 'text-primary-400 font-bold' 
          : 'text-gray-300 hover:text-primary-400'}`}
    >
      {children}
      <span 
        className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-all duration-300 ease-out 
          ${isActive 
            ? 'scale-x-100 bg-primary-400' 
            : 'scale-x-0 hover:scale-x-100 bg-primary-400'}`}
      />
    </Link>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-xl shadow-lg' 
          : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10 py-4 sm:py-5 lg:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <span className={`text-2xl font-bold transition-all duration-300
                  ${isScrolled
                    ? 'bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 text-transparent bg-clip-text drop-shadow-sm'
                    : 'bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 text-transparent bg-clip-text'}`}
                >
                  yudopr
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <NavLink to="/" currentPath={location.pathname}>
                Home
              </NavLink>
              <NavLink to="/blog" currentPath={location.pathname}>
                Blog
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

