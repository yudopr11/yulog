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
    <nav className="mb-8 bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      <div 
        className="flex items-center justify-between p-4 border-b border-gray-800 cursor-pointer"
        onClick={toggleCollapsed}
      >
        <h2 className="text-lg font-bold text-white flex items-center">
          <Bars3BottomLeftIcon 
            className="h-5 w-5 mr-2" 
            stroke="currentColor"
          />
          Table of Contents
        </h2>
        <ChevronDownIcon 
          className={`h-5 w-5 transform transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} 
          stroke="currentColor"
        />
      </div>
      
      <div className={`transition-all duration-300 ${isCollapsed ? 'max-h-0' : 'max-h-[400px]'} overflow-y-auto`}>
        <ul className="p-4 space-y-1">
          {headings.map(heading => (
            <li 
              key={heading.id}
              className="transition-colors duration-200"
              style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClickTocItem(e, heading.id)}
                className={`text-sm hover:text-primary-400 transition-colors block py-1 ${
                  activeId === heading.id 
                    ? 'text-primary-400 font-medium' 
                    : 'text-gray-400'
                }`}
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TableOfContents; 