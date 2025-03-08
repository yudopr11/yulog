import { useState, useEffect } from 'react';
import PageTitle from './common/PageTitle';
import ProjectCard from './common/ProjectCard';
import SocialLink from './common/SocialLink';

export default function Home() {
  const [, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <PageTitle 
        title="Home" 
        description="Personal website and portfolio of yudopr"
      />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-12 relative z-10">
          <div className="flex flex-col gap-16">
            {/* About Me Section */}
            <div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image - circular */}
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 overflow-hidden rounded-full mx-auto md:mx-0">
                    <img 
                      src="https://res.cloudinary.com/dnf9bfdne/image/upload/e_grayscale/c_auto,g_auto,h_1836,w_1836/mzgrukkvsdiweksgszl7" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-400">
                    Hello, I'm @yudopr!
                  </h1>
                  
                  <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                  I'm a data engineer with 7 years of experience 🚀, specializing in project management, data analysis, and data engineering. 
                  I excel at understanding complex business requirements and creating detailed data models 🤓. 
                  In my most recent project, I increased financial visibility and efficiency through meticulous data pipeline development 📈. 
                  Additionally, I've recently begun exploring LLM applications, such as Retrieval-Augmented Generation (RAG) and function calling 🤖, to drive innovative, data-driven solutions.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Independent Projects Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-100">Independent projects I'm working on:</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProjectCard 
                  to="https://github.com/yudopr11/yupi" 
                  title="Yupi" 
                  description="Collection of APIs for my project."
                />
                <ProjectCard 
                  to="https://github.com/yudopr11/cuan" 
                  title="Cuan" 
                  description="Web-based personal financial management application."
                />
                <ProjectCard 
                  to="https://github.com/yudopr11/ngakak" 
                  title="Ngakak" 
                  description="Web-based bill splitter using LLM."
                />
                <ProjectCard 
                  to="https://github.com/yudopr11/latihan-matematika" 
                  title="Latihan Matematika" 
                  description="Web-based math quiz application for high school students."
                />
                <ProjectCard 
                  to="https://youtube.com/playlist?list=PLNxndFN0gO42oBYLVsXBrTsKW7aAPEbQP&si=l5crWKP-WnAFoKhr" 
                  title="Belajar SQL" 
                  description="Video tutorials and SQL exercises for beginners."
                />
              </div>
            </div>
            
            {/* Social Media Links */}
            <div>
              <div className="flex justify-center gap-10">
                <SocialLink href="https://www.linkedin.com/in/yudho-prakoso/" icon={
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                } />
                <SocialLink href="https://github.com/yudopr11/" icon={
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                } />
                <SocialLink href="https://www.tiktok.com/@yudopr" icon={
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.3-.67.34-1.03.01-1.13.04-2.27.03-3.4.01-1.79.01-3.58.04-5.37.04-1.15.04-2.3.02-3.45z"/>
                  </svg>
                } />
                <SocialLink href="https://www.youtube.com/SantapMalam" icon={
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                } />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 