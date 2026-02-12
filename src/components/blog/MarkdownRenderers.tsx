import React, { useState, useEffect, useCallback } from 'react';
import { codeToHtml } from 'shiki';
import { ArrowTopRightOnSquareIcon, DocumentDuplicateIcon, CheckIcon as HeroCheckIcon } from '@heroicons/react/24/outline';

// Helper to create heading IDs
const createHeadingId = (text: string, level: number): string => {
  const cleanedText = typeof text === 'string'
    ? text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    : '';
  return `heading-${level}-${cleanedText}`;
};

// Language normalization map - constant to avoid recreating on every render
const LANGUAGE_MAP: Record<string, string> = {
  'js': 'javascript',
  'ts': 'typescript',
  'jsx': 'tsx',
  'nodejs': 'javascript',
  'node': 'javascript',
  'shell': 'bash',
  'sh': 'bash',
  'zsh': 'bash',
  'bash': 'bash',
  'curl': 'bash',
  'powershell': 'powershell',
  'ps': 'powershell',
  'ps1': 'powershell',
  'cmd': 'cmd',
  'batch': 'batch',
  'bat': 'batch',
  'yml': 'yaml',
  'yaml': 'yaml',
  'json': 'json',
  'json5': 'json',
  'jsonc': 'jsonc',
  'xml': 'xml',
  'toml': 'toml',
  'html': 'html',
  'css': 'css',
  'scss': 'scss',
  'sass': 'sass',
  'less': 'less',
  'svg': 'svg',
  'py': 'python',
  'python': 'python',
  'rb': 'ruby',
  'ruby': 'ruby',
  'go': 'go',
  'golang': 'go',
  'rs': 'rust',
  'rust': 'rust',
  'java': 'java',
  'kotlin': 'kotlin',
  'kt': 'kotlin',
  'c': 'c',
  'cpp': 'cpp',
  'c++': 'cpp',
  'cs': 'csharp',
  'csharp': 'csharp',
  'php': 'php',
  'swift': 'swift',
  'sql': 'sql',
  'mysql': 'sql',
  'pgsql': 'sql',
  'postgres': 'sql',
  'postgresql': 'sql',
  'md': 'markdown',
  'markdown': 'markdown',
  'tex': 'latex',
  'latex': 'latex',
};

// Custom CodeBlock component with Shiki syntax highlighting
const CodeBlock = ({ language, code, showLineNumbers = true }: { language: string, code: string, showLineNumbers?: boolean }) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Map some common language variations to supported ones
  const normalizeLanguage = (lang: string): string => {
    return LANGUAGE_MAP[lang.toLowerCase()] || lang;
  };

  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);
        const normalizedLang = normalizeLanguage(language);
        
        // Use Shiki's codeToHtml API
        const html = await codeToHtml(code, {
          lang: normalizedLang,
          theme: 'github-dark',
          // Add line numbers if requested
          transformers: showLineNumbers ? [{
            pre(node) {
              // Add line numbers via CSS counter
              node.properties.style = 'counter-reset: line; padding: 0.6rem 1.25rem; font-size: 0.8rem;';
              return node;
            },
            line(node, line) {
              // Add counter-increment to each line
              node.properties.className = ['line'];
              node.properties.style = 'counter-increment: line; padding-right: 1rem; display: flex; align-items: center; min-height: 0.9em; margin: 0; letter-spacing: -0.01em;';
              
              // Add line number as a pseudo-element via CSS
              node.properties['data-line'] = String(line);
              return node;
            }
          }] : undefined,
        });
        
        // Replace default background color with transparent
        const withTransparentBg = html.replace(
          /style="background-color:[^"]+"/,
          'style="background-color: transparent"'
        );
        
        setHighlightedCode(withTransparentBg);
      } catch (error) {
        console.error('Error highlighting code:', error);
        // Fallback to plain text if highlighting fails
        setHighlightedCode(`<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };
    
    highlightCode();
  }, [code, language, showLineNumbers]);

  return (
    <div className="overflow-x-auto w-full relative px-1">
      {isLoading ? (
        <div className="bg-gray-900 p-6 text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <div 
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          className="text-sm leading-tight relative"
        />
      )}
    </div>
  );
};

export const MarkdownRenderers = {
  code({node, inline, className, children, ...props}: any) {
    const match = /language-(\w+)/.exec(className || '');
    
    // Only add copy button for code blocks, not inline code
    if (!inline && match) {
      // Clean up the code string for proper display and copying
      // This removes the final newline and trims any extra whitespace
      const codeString = String(children).replace(/\n$/, '').trim();
      
      // Custom component for code block with copy button
      return (
        <div className="my-6 overflow-hidden rounded-2xl group relative">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl rounded-2xl"></div>

          {/* Border with hover effect */}
          <div className="absolute inset-0 border border-gray-700/30 rounded-2xl group-hover:border-primary-500/30 transition-all duration-300"></div>

          {/* Shadow/glow effect */}
          <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header with gradient background */}
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-900/50 to-gray-800/30 px-6 py-3 border-b border-gray-700/30 group-hover:border-primary-500/20 transition-colors duration-300">
              <span className="text-xs font-semibold text-primary-300 bg-gradient-to-r from-primary-600/20 to-primary-500/20 px-3 py-1 rounded-full border border-primary-500/30">
                {match[1].toUpperCase()}
              </span>
              <CopyButton code={codeString} />
            </div>

            {/* Code content */}
            <div className="overflow-x-auto px-2 py-4">
              <CodeBlock
                language={match[1]}
                code={codeString}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Regular inline code
    return (
      <code className={`${className} bg-gray-800 px-1 py-0.5 rounded text-gray-200`} {...props}>
        {children}
      </code>
    );
  },
  img({src, alt, title, ...props}: any) {
    return (
      <img 
        src={src} 
        alt={alt || ''} 
        title={title || alt || ''} 
        className="rounded-lg max-w-full h-auto mx-auto shadow-lg my-6"
        {...props}
      />
    );
  },
  // Ensure paragraphs containing only images don't have extra margins
  p({children, ...props}: any) {
    const hasOnlyImage = React.Children.toArray(children).every(
      child => typeof child === 'object' && ((child as any)?.type === 'img' || (child as any)?.props?.src)
    );
    
    // If it only contains images, render a div with image-specific styling instead
    if (hasOnlyImage) {
      return (
        <div className="my-8 text-center">
          {children}
          {React.Children.map(children, child => {
            if (typeof child === 'object' && (child as any)?.props?.title) {
              return (
                <p className="text-center text-sm text-gray-400 mt-2">
                  {(child as any).props.title}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    
    // Regular paragraph
    return <p className="mb-3" {...props}>{children}</p>;
  },
  // Add styling for div elements to handle HTML content better
  div({node, className, children, ...props}: any) {
    return (
      <div className={`my-4 ${className || ''}`} {...props}>
        {children}
      </div>
    );
  },
  // Add custom renderer for horizontal rules (line separators)
  hr: () => (
    <div className="my-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
    </div>
  ),
  // Custom heading renderers with IDs and gradient accents
  h1: ({children}: any) => {
    const id = createHeadingId(String(children), 1);
    return (
      <div className="relative mt-10 mb-6 group">
        <h1 id={id} className="text-3xl sm:text-4xl font-bold text-white pb-3 relative z-10">
          {children}
        </h1>
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500/50 via-primary-400/30 to-transparent group-hover:from-primary-500 group-hover:via-primary-400 transition-all duration-500"></div>
      </div>
    );
  },
  h2: ({children}: any) => {
    const id = createHeadingId(String(children), 2);
    return (
      <div className="relative mt-8 mb-4 group">
        <h2 id={id} className="text-2xl sm:text-3xl font-bold text-white pb-3 relative z-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-primary-100 transition-all duration-300">
          {children}
        </h2>
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500/50 via-primary-400/30 to-transparent group-hover:from-primary-500 group-hover:via-primary-400 transition-all duration-500"></div>
      </div>
    );
  },
  h3: ({children}: any) => {
    const id = createHeadingId(String(children), 3);
    return (
      <div className="relative mt-6 mb-3 group">
        <h3 id={id} className="text-xl sm:text-2xl font-semibold text-white pb-2 relative z-10">
          {children}
        </h3>
        {/* Left gradient accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-500/50 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r"></div>
      </div>
    );
  },
  h4: ({children}: any) => {
    const id = createHeadingId(String(children), 4);
    return (
      <h4 id={id} className="text-lg sm:text-xl font-medium mt-5 mb-2 text-primary-300 group-hover:text-primary-200 transition-colors">
        {children}
      </h4>
    );
  },
  h5: ({children}: any) => {
    const id = createHeadingId(String(children), 5);
    return (
      <h5 id={id} className="text-md sm:text-lg font-medium mt-4 mb-2 text-primary-300 group-hover:text-primary-200 transition-colors">
        {children}
      </h5>
    );
  },
  h6: ({children}: any) => {
    const id = createHeadingId(String(children), 6);
    return (
      <h6 id={id} className="text-base font-medium mt-4 mb-2 text-gray-300">
        {children}
      </h6>
    );
  },
  // Custom list renderers
  ul: ({children}: any) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-white">{children}</ul>
  ),
  ol: ({children}: any) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-white">{children}</ol>
  ),
  li: ({children}: any) => (
    <li className="pl-1">{children}</li>
  ),
  // Custom table renderers with glassmorphism
  table: ({children}: any) => (
    <div className="my-6 rounded-2xl group relative">
      {/* Glassmorphism wrapper */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/30 group-hover:border-primary-500/30 transition-all duration-300"></div>

      {/* Glow effect */}
      <div className="absolute -top-1/2 -right-1/4 w-3/4 h-full bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="overflow-x-auto relative z-10 rounded-2xl">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    </div>
  ),
  thead: ({children}: any) => (
    <thead className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 text-white border-b border-gray-700/30">
      {children}
    </thead>
  ),
  tbody: ({children}: any) => (
    <tbody className="divide-y divide-gray-700/30">
      {children}
    </tbody>
  ),
  tr: ({children, isHeader}: any) => (
    <tr className={isHeader ? "" : "hover:bg-primary-500/5 transition-colors duration-200"}>
      {children}
    </tr>
  ),
  th: ({children}: any) => (
    <th className="px-4 py-3 text-left font-semibold text-primary-300 border-r border-gray-700/20 last:border-r-0 group-hover:text-primary-200 transition-colors">
      {children}
    </th>
  ),
  td: ({children}: any) => (
    <td className="px-4 py-3 text-gray-300 border-r border-gray-700/20 last:border-r-0">
      {children}
    </td>
  ),
  // Hyperlink renderer with custom styling
  a({node, href, children, ...props}: any) {
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
    return (
      <a 
        href={href}
        className="text-primary-400 hover:text-primary-300 underline decoration-primary-600 decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {isExternal && (
          <span className="inline-block ml-1 text-xs">
            <ArrowTopRightOnSquareIcon 
              className="inline-block h-3 w-3" 
              stroke="currentColor"
              strokeWidth={2}
            />
          </span>
        )}
      </a>
    );
  },
  // Custom blockquote renderer with elegant styling
  blockquote({node, className, children, ...props}: React.ComponentPropsWithoutRef<'blockquote'> & {
    node?: any;
    className?: string;
  }) {
    // Check if this is a nested blockquote by looking at the parent elements
    const isNested = React.Children.toArray(children).some(
      child => {
        if (!React.isValidElement(child)) return false;
        const childProps = child.props as {children?: React.ReactNode};
        return React.Children.toArray(childProps.children).some(
          grandChild => React.isValidElement(grandChild) && grandChild.type === 'blockquote'
        );
      }
    );

    if (isNested) {
      return (
        <blockquote className={`ml-4 mt-4 mb-4 pl-4 border-l-2 border-blue-400/20 ${className || ''}`} {...props}>
          <div className="text-gray-300 italic text-sm sm:text-base">
            {children}
          </div>
        </blockquote>
      );
    }

    return (
      <div className="relative my-8 overflow-hidden group">
        {/* Gradient background with blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-3xl group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors duration-300"></div>
        
        {/* Left border with gradient */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-400 group-hover:from-blue-300 group-hover:to-purple-300 transition-colors duration-300"></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"></div>
        
        {/* Quote content */}
        <blockquote className={`relative rounded-r-lg py-6 pl-6 pr-4 sm:pl-8 sm:pr-6 ${className || ''}`} {...props}>
          {/* Large quote mark */}
          <div className="absolute -top-2 left-3 text-4xl sm:text-5xl text-blue-400/20 select-none font-serif transform -translate-y-1/4">"</div>
          
          <div className="relative text-gray-300 italic text-sm sm:text-base">
            {children}
          </div>
        </blockquote>
      </div>
    );
  }
}; 

// Copy button component with copy-to-clipboard functionality
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className={`
        text-xs font-medium px-2 py-1 rounded transition-all duration-200 flex items-center gap-1
        ${copied 
          ? 'bg-green-800 text-green-100' 
          : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white hover:shadow-md transform hover:-translate-y-0.5'
        }
      `}
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <>
          <HeroCheckIcon className="w-3.5 h-3.5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <DocumentDuplicateIcon className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
} 