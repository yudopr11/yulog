import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  // State untuk animasi pulse
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Efek untuk menganimasikan pulse setiap beberapa detik
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Background glow effect */}
        <div className={`absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl transition-opacity duration-1000 ${isPulsing ? 'opacity-70' : 'opacity-20'}`}></div>
        
        <h1 className="relative text-8xl md:text-9xl font-extrabold mb-4">
          {/* Shadow layer for depth */}
          <span className="absolute inset-0 text-8xl md:text-9xl blur-[3px] select-none bg-gradient-to-br from-blue-700 via-blue-900 to-blue-950 text-transparent bg-clip-text opacity-80 transform -translate-y-[2px] -translate-x-[2px]">404</span>
          
          {/* Blurred glow for metallic shine */}
          <span className={`absolute inset-0 text-8xl md:text-9xl blur-[2px] select-none bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 text-transparent bg-clip-text transition-opacity duration-700 ${isPulsing ? 'opacity-90' : 'opacity-70'}`}>404</span>
          
          {/* Light reflection layer */}
          <span className="absolute inset-0 text-8xl md:text-9xl select-none bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700 text-transparent bg-clip-text transform translate-y-[1px] translate-x-[1px]">404</span>
          
          {/* Main visible layer with gradient */}
          <span className="relative z-10 bg-gradient-to-br from-blue-300 via-cyan-400 to-blue-600 text-transparent bg-clip-text select-none">404</span>
        </h1>
        
        {/* Metallic reflection line with animation */}
        <div className={`w-40 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-10 transition-all duration-700 ${isPulsing ? 'opacity-90 w-48' : 'opacity-70 w-40'}`}></div>
        
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-200">Page Not Found</h2>
        <p className="text-gray-300 text-lg mb-10 max-w-lg">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-primary-400 border border-gray-700 px-5 py-2 rounded-md hover:border-blue-400 hover:border-opacity-70 transition-all duration-300 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 