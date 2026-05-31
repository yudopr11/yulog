import { useMemo } from 'react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import type { Pluggable } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import 'katex/dist/katex.min.css';
import { MarkdownRenderers } from './MarkdownRenderers';

interface PostContentProps {
  content?: string;
  renderedHtml?: string | null;
}

export default function PostContent({ content, renderedHtml }: PostContentProps) {
  const remarkPlugins = useMemo(() => [
    remarkGfm,
    remarkMath,
    [remarkToc, { heading: 'Contents', tight: true }],
  ] as Pluggable[], []);

  const rehypePlugins = useMemo(() => [rehypeKatex, rehypeRaw, rehypeSanitize], []);

  // If server-rendered HTML is available, use it directly (no client-side markdown processing)
  if (renderedHtml) {
    return (
      <div className="article" style={{ marginTop: 24 }}>
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="article" style={{ marginTop: 24 }}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={MarkdownRenderers as unknown as Components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
