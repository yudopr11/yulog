import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { MarkdownRenderers } from './MarkdownRenderers';
import TableOfContents from './TableOfContents';

interface PostContentProps {
  content?: string;
}

export default function PostContent({ content }: PostContentProps) {
  const [renderKey, setRenderKey] = useState(Date.now());
  
  useEffect(() => {
    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setRenderKey(Date.now());
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initial render with a slight delay
    const timer = setTimeout(() => {
      setRenderKey(Date.now());
    }, 100);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timer);
    };
  }, []);
  
  if (!content) {
    return null;
  }
  
  return (
    <div className="leading-relaxed">
      {/* Table of Contents at the top */}
      <TableOfContents content={content} />
      
      {/* Main Content */}
      <div className="prose prose-invert prose-lg max-w-none prose-img:rounded-lg prose-img:shadow-xl prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-headings:text-white prose-p:text-gray-300">
        <ReactMarkdown
          key={renderKey}
          remarkPlugins={[
            remarkGfm, 
            remarkMath,
            [remarkToc, { heading: "Contents", tight: true }]
          ]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={MarkdownRenderers}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
} 