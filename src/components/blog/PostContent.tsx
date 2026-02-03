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
  if (!content) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      {/* Table of Contents */}
      <TableOfContents content={content} />

      {/* Main Content Wrapper with Glassmorphism */}
      <div className="relative overflow-hidden rounded-2xl group">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-900/60 backdrop-blur-sm border border-gray-700/20 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10 lg:p-12">
          <div className="prose prose-invert prose-lg max-w-none
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-gray-700/30
            prose-a:text-primary-400 hover:prose-a:text-primary-300
            prose-headings:text-white prose-p:text-gray-300
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-primary-300 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-transparent prose-pre:p-0
            prose-blockquote:border-transparent prose-blockquote:pl-0 prose-blockquote:pr-0
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300">
            <ReactMarkdown
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
      </div>
    </div>
  );
} 