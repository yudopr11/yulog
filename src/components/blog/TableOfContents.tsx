import React, { useState, useEffect } from 'react';
import { Bars3BottomLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type HeadingType = {
  id: string;
  title: string;
  level: number;
};

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<HeadingType[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Parse markdown content for headings
  useEffect(() => {
    if (!content) return;
    
    // First, identify code blocks to exclude their content from heading search
    const findCodeBlocks = (markdown: string) => {
      const codeBlockRegex = /```[\s\S]*?```/g;
      const codeBlocks: { start: number; end: number }[] = [];
      
      let match;
      while ((match = codeBlockRegex.exec(markdown)) !== null) {
        codeBlocks.push({
          start: match.index,
          end: match.index + match[0].length
        });
      }
      return codeBlocks;
    };
    
    // Check if a position is inside any code block
    const isInsideCodeBlock = (position: number, codeBlocks: { start: number; end: number }[]) => {
      return codeBlocks.some(block => position >= block.start && position < block.end);
    };
    
    const codeBlocks = findCodeBlocks(content);
    
    // Match all headings (h1-h6) in markdown
    // Format: # Heading1, ## Heading2, etc.
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches: { level: number; title: string; position: number }[] = [];
    
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      // Skip headings inside code blocks
      if (!isInsideCodeBlock(match.index, codeBlocks)) {
        matches.push({
          level: match[1].length,
          title: match[2].trim(),
          position: match.index
        });
      }
    }
    
    const parsedHeadings = matches.map(match => {
      const { level, title } = match;
      // Generate an id from the title
      const id = `heading-${level}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      
      return { id, title, level };
    });
    
    setHeadings(parsedHeadings);
    
    // Default to collapsed on mobile
    setIsCollapsed(window.innerWidth < 768);
  }, [content]);

  // Set up intersection observer to highlight active section
  useEffect(() => {
    if (typeof window === 'undefined' || !document) return;
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );
    
    // Observe all section headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      if (heading.id) {
        observer.observe(heading);
      }
    });
    
    return () => {
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        if (heading.id) {
          observer.unobserve(heading);
        }
      });
    };
  }, [headings]);

  // Handle clicking on a TOC item - smooth scroll to the section
  const handleClickTocItem = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      
      // On mobile, collapse after clicking
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    }
  };

  // Toggle the collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="mb-8 group relative overflow-hidden rounded-2xl transition-all duration-300">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 group-hover:border-primary-500/50 transition-all duration-500 rounded-2xl"></div>

      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-primary-600/0 group-hover:from-primary-500/5 group-hover:to-primary-600/5 transition-all duration-500 rounded-2xl"></div>

      {/* Glow effect on hover */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-700/30 group-hover:border-primary-500/30 cursor-pointer transition-colors duration-300"
          onClick={toggleCollapsed}
        >
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 group-hover:text-primary-300 transition-colors duration-300">
            <div className="p-1.5 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300">
              <Bars3BottomLeftIcon
                className="h-5 w-5 text-primary-400"
                stroke="currentColor"
              />
            </div>
            Table of Contents
          </h2>
          <ChevronDownIcon
            className={`h-5 w-5 text-primary-400 transform transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`}
            stroke="currentColor"
          />
        </div>

        {/* Content List */}
        <div className={`transition-all duration-300 ${isCollapsed ? 'max-h-0' : 'max-h-[400px]'} overflow-y-auto`}>
          <ul className="p-5 sm:p-6 space-y-2">
            {headings.map((heading, index) => (
              <li
                key={heading.id}
                className="transition-all duration-200"
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClickTocItem(e, heading.id)}
                  className={`text-sm py-2 px-3 rounded-lg block transition-all duration-200 relative group/link ${
                    activeId === heading.id
                      ? 'text-primary-300 font-semibold bg-gradient-to-r from-primary-500/15 to-primary-600/15 border border-primary-500/30'
                      : 'text-gray-400 hover:text-primary-400 hover:bg-gray-800/30 border border-transparent hover:border-primary-500/20'
                  }`}
                >
                  {/* Gradient accent on active */}
                  {activeId === heading.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-r transition-all duration-300"></div>
                  )}
                  <span className="block pl-2">{heading.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TableOfContents; 