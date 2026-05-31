import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ArrowTopRightOnSquareIcon, DocumentDuplicateIcon, CheckIcon as HeroCheckIcon } from '@heroicons/react/24/outline';

// Props types for markdown renderer components
interface ChildrenProps { children?: ReactNode }
interface ElementProps extends ChildrenProps { className?: string; [key: string]: unknown }
interface CodeProps extends ElementProps { inline?: boolean }
interface ImgProps extends ElementProps { src?: string; alt?: string; title?: string; loading?: 'lazy' | 'eager' }
interface LinkProps extends ElementProps { href?: string }
interface TrProps extends ChildrenProps { isHeader?: boolean }

// Helper to create heading IDs
const createHeadingId = (text: string, level: number): string => {
  const cleanedText = typeof text === 'string'
    ? text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    : '';
  return `heading-${level}-${cleanedText}`;
};

// Simple CodeBlock without Shiki (server-side rendering handles highlighting)
const CodeBlock = ({ language: _language, code }: { language: string, code: string }) => {
  return (
    <div className="w-full relative px-1">
      <pre style={{
        margin: 0, padding: '0.6rem 1.25rem', fontSize: '0.8rem',
        background: 'transparent', fontFamily: 'monospace', whiteSpace: 'pre',
        lineHeight: 1.4,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const MarkdownRenderers = {
  pre: ({children}: ChildrenProps) => <>{children}</>,
  code({className, children, ...props}: CodeProps) {
    const match = /language-(\w+)/.exec(className || '');

    // Only add copy button for code blocks (has language class), not inline code
    if (match) {
      // Clean up the code string for proper display and copying
      const codeString = String(children).replace(/\n$/, '').trim();

      return (
        <div style={{
          margin: '1.5em 0',
          borderRadius: 12,
          border: '1px solid var(--border-medium)',
          background: 'var(--bg-elevated-1)',
          overflow: 'clip',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 16px',
            borderBottom: '1px solid var(--border-soft)',
          }}>
            <span className="chip chip-brand" style={{ fontSize: 10 }}>{match[1].toUpperCase()}</span>
            <CopyButton code={codeString} />
          </div>

          {/* Code */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <CodeBlock language={match[1]} code={codeString} />
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
  img({src, alt, title, ...props}: ImgProps) {
    return (
      <img
        src={src}
        alt={alt || 'Blog post image'}
        title={title || alt || ''}
        className="rounded-lg max-w-full h-auto mx-auto shadow-lg my-6"
        loading="lazy"
        {...props}
      />
    );
  },
  // Ensure paragraphs containing only images don't have extra margins
  p({children, ...props}: ElementProps) {
    const hasOnlyImage = React.Children.toArray(children).every(
      child => typeof child === 'object' && child !== null && ('type' in child && (child as { type?: string }).type === 'img' || 'props' in child && (child as { props?: { src?: string } }).props?.src)
    );

    if (hasOnlyImage) {
      return (
        <div className="my-8 text-center">
          {children}
          {React.Children.map(children, child => {
            if (typeof child === 'object' && child !== null && 'props' in child && (child as { props?: { title?: string } }).props?.title) {
              return (
                <p className="text-center text-sm text-gray-400 mt-2">
                  {(child as { props: { title: string } }).props.title}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }

    return <p className="mb-3" {...props}>{children}</p>;
  },
  div({className, children, ...props}: ElementProps) {
    return (
      <div className={`my-4 ${className || ''}`} {...props}>
        {children}
      </div>
    );
  },
  hr: () => (
    <div className="my-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
    </div>
  ),
  h1: ({children}: ChildrenProps) => {
    const id = createHeadingId(String(children), 1);
    return (
      <div className="relative mt-10 mb-6 group">
        <h1 id={id} className="text-3xl sm:text-4xl font-bold text-white pb-3 relative z-10">
          {children}
        </h1>
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500/50 via-primary-400/30 to-transparent group-hover:from-primary-500 group-hover:via-primary-400 transition-all duration-500"></div>
      </div>
    );
  },
  h2: ({children}: ChildrenProps) => {
    const id = createHeadingId(String(children), 2);
    return (
      <div className="relative mt-8 mb-4 group">
        <h2 id={id} className="text-2xl sm:text-3xl font-bold text-white pb-3 relative z-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-primary-100 transition-all duration-300">
          {children}
        </h2>
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500/50 via-primary-400/30 to-transparent group-hover:from-primary-500 group-hover:via-primary-400 transition-all duration-500"></div>
      </div>
    );
  },
  h3: ({children}: ChildrenProps) => {
    const id = createHeadingId(String(children), 3);
    return (
      <div className="relative mt-6 mb-3 group">
        <h3 id={id} className="text-xl sm:text-2xl font-semibold text-white pb-2 relative z-10">
          {children}
        </h3>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-500/50 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r"></div>
      </div>
    );
  },
  h4: ({children}: ChildrenProps) => {
    const id = createHeadingId(String(children), 4);
    return (
      <h4 id={id} className="text-lg sm:text-xl font-medium mt-5 mb-2 text-primary-300 group-hover:text-primary-200 transition-colors">
        {children}
      </h4>
    );
  },
  h5: ({children}: ChildrenProps) => {
    const id = createHeadingId(String(children), 5);
    return (
      <h5 id={id} className="text-md sm:text-lg font-medium mt-4 mb-2 text-primary-300 group-hover:text-primary-200 transition-colors">
        {children}
      </h5>
    );
  },
  h6: ({children}: ChildrenProps) => {
    const id = createHeadingId(String(children), 6);
    return (
      <h6 id={id} className="text-base font-medium mt-4 mb-2 text-gray-300">
        {children}
      </h6>
    );
  },
  ul: ({children}: ChildrenProps) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-white">{children}</ul>
  ),
  ol: ({children}: ChildrenProps) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-white">{children}</ol>
  ),
  li: ({children}: ChildrenProps) => (
    <li className="pl-1">{children}</li>
  ),
  table: ({children}: ChildrenProps) => (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxWidth: '100%', margin: '1.5em 0' }}>
      <table style={{ borderCollapse: 'collapse', width: 'max-content', minWidth: '100%' }}>
        {children}
      </table>
    </div>
  ),
  thead: ({children}: ChildrenProps) => (
    <thead className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 text-white border-b border-gray-700/30">
      {children}
    </thead>
  ),
  tbody: ({children}: ChildrenProps) => (
    <tbody className="divide-y divide-gray-700/30">
      {children}
    </tbody>
  ),
  tr: ({children, isHeader}: TrProps) => (
    <tr className={isHeader ? "" : "hover:bg-primary-500/5 transition-colors duration-200"}>
      {children}
    </tr>
  ),
  th: ({children}: ChildrenProps) => (
    <th className="px-4 py-3 text-left font-semibold text-primary-300 border-r border-gray-700/20 last:border-r-0" style={{ whiteSpace: 'nowrap', background: 'rgba(11,17,32,0.6)' }}>
      {children}
    </th>
  ),
  td: ({children}: ChildrenProps) => (
    <td className="px-4 py-3 text-gray-300 border-r border-gray-700/20 last:border-r-0">
      {children}
    </td>
  ),
  a({href, children, ...props}: LinkProps) {
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
          <span className="inline-block ml-1 text-xs" aria-hidden="true">
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
  blockquote: ({children}: ChildrenProps) => (
    <blockquote style={{
      borderLeft: '3px solid var(--primary-500)',
      margin: '1.5em 0',
      padding: '12px 16px',
      background: 'rgba(48,189,242,0.05)',
      borderRadius: '0 8px 8px 0',
      color: 'var(--fg-4)',
      fontStyle: 'italic',
    }}>
      {children}
    </blockquote>
  )
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
