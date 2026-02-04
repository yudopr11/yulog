import { ArrowRightIcon } from '@heroicons/react/24/outline';
import NumberCounter from './NumberCounter';

interface HeroCardProps {
  name: string;
  bio: string;
  years: number;
  projects: number;
  onProjectsClick?: () => void;
  onContactClick?: () => void;
}

export default function HeroCard({
  name,
  bio,
  years,
  projects,
  onProjectsClick,
  onContactClick,
}: HeroCardProps) {
  return (
    <div className="relative min-h-screen md:min-h-[600px] flex items-center overflow-hidden py-6 sm:py-8 md:py-0">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center w-full">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 w-fit flex-wrap sm:flex-nowrap">
            <div className="flex gap-1">
              <span className="text-xl sm:text-2xl animate-wave">👋</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-300 bg-gray-800/50 px-3 sm:px-4 py-2 rounded-full border border-gray-700/50 backdrop-blur-sm">
              Hi everyone, I'm {name}
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
              <span className="block text-white">Data Engineer</span>
              <span className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Based in Asia
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl">
            {bio}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 py-4">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text">
                <NumberCounter
                  target={years}
                  duration={2000}
                  className="inline"
                />
                +
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Years Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text">
                <NumberCounter
                  target={projects}
                  duration={2000}
                  className="inline"
                />
                +
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Projects Built</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
            <button
              onClick={onProjectsClick}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white font-semibold text-sm sm:text-base rounded-xl hover:bg-primary-700 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-primary-500/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Work
                <ArrowRightIcon className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={onContactClick}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-700 text-white font-semibold text-sm sm:text-base rounded-xl hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 py-2">
            <span className="text-xs sm:text-sm text-gray-500 font-medium">Find me on:</span>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://www.linkedin.com/in/yudho-prakoso/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-all duration-300 hover:scale-110 hover:bg-gray-800"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/yudopr11/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-all duration-300 hover:scale-110 hover:bg-gray-800"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@yudopr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-all duration-300 hover:scale-110 hover:bg-gray-800"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.3-.67.34-1.03.01-1.13.04-2.27.03-3.4.01-1.79.01-3.58.04-5.37.04-1.15.04-2.3.02-3.45z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Profile Section */}
        <div className="relative flex flex-col items-center justify-center order-1 lg:order-2 h-auto lg:h-full">
          {/* Decorative circles and shapes */}
          <div className="hidden sm:block absolute top-1/2 right-1/3 -translate-y-1/2 w-48 sm:w-60 md:w-72 h-48 sm:h-60 md:h-72 border-2 border-primary-500/20 rounded-full animate-rotate-slow"></div>
          <div className="hidden md:block absolute bottom-1/4 -left-16 w-48 h-48 border-2 border-primary-400/10 rounded-full animate-float-gentle"></div>

          {/* Geometric accent shapes */}
          <div className="hidden md:block absolute top-20 right-12 w-40 h-40 bg-primary-500/10 rounded-3xl transform rotate-12 animate-pulse"></div>
          <div className="hidden md:block absolute bottom-24 -left-8 w-32 h-32 bg-primary-400/10 rounded-2xl transform -rotate-12 animate-float-gentle" style={{ animationDelay: '1s' }}></div>

          {/* Profile Image Container */}
          <div className="relative z-10 w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden border-4 border-primary-500/40 shadow-2xl">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50 z-10"></div>
            <img
              src="https://res.cloudinary.com/dnf9bfdne/image/upload/e_grayscale/c_auto,g_auto,h_1836,w_1836/mzgrukkvsdiweksgszl7"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating accent element */}
          <div className="absolute top-4 sm:top-auto sm:-bottom-20 md:bottom-24 right-4 sm:right-8 md:right-16 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900/80 backdrop-blur-md border border-primary-500/40 rounded-2xl text-xs sm:text-sm text-gray-300 z-20 shadow-lg whitespace-nowrap">
            <span className="text-primary-400 font-semibold">Data Engineer</span>
            <span className="text-gray-600 mx-2">•</span>
            <span>7+ Years</span>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
    </div>
  );
}