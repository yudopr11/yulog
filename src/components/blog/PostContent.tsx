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
  excerpt?: string;
}

export default function PostContent({ content, excerpt }: PostContentProps) {
  return (
    <div className="leading-relaxed">
      {content ? (
        <>
          {/* Table of Contents - Now positioned at the top */}
          <TableOfContents content={content} />
          
          {/* Main Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-img:rounded-lg prose-img:shadow-xl prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-headings:text-white prose-p:text-gray-300">
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
        </>
      ) : (
        <p className="text-lg">{excerpt}</p>
      )}
    </div>
  );
} 