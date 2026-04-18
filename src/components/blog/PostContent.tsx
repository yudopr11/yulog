import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import { MarkdownRenderers } from './MarkdownRenderers';

interface PostContentProps {
  content?: string;
}

export default function PostContent({ content }: PostContentProps) {
  if (!content) return null;

  const remarkPlugins = useMemo(() => [
    remarkGfm,
    remarkMath,
    [remarkToc, { heading: 'Contents', tight: true }],
  ] as any, []);

  const rehypePlugins = useMemo(() => [rehypeKatex, rehypeRaw], []);

  return (
    <div className="article" style={{ marginTop: 24 }}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={MarkdownRenderers}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
