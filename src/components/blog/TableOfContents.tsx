import { useState, useEffect, useCallback, useMemo } from 'react';

type HeadingType = {
  id: string;
  title: string;
  level: number;
};

interface TableOfContentsProps {
  content: string;
}

function parseHeadings(content: string): HeadingType[] {
  if (!content) return [];

  const codeBlockRegex = /```[\s\S]*?```/g;
  const codeBlocks: { start: number; end: number }[] = [];
  let m;
  while ((m = codeBlockRegex.exec(content)) !== null) {
    codeBlocks.push({ start: m.index, end: m.index + m[0].length });
  }
  const inCodeBlock = (pos: number) => codeBlocks.some(b => pos >= b.start && pos < b.end);

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const parsed: HeadingType[] = [];
  while ((m = headingRegex.exec(content)) !== null) {
    if (!inCodeBlock(m.index)) {
      const level = m[1].length;
      const rawTitle = m[2].trim();
      // Strip markdown link/image syntax before slugifying to match server-rendered HTML IDs
      // Server renders [text](url) as <a>text</a>, then strips tags → "text"
      // We must produce the same slug from raw markdown
      const textForId = rawTitle
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')   // remove images ![alt](url)
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links [text](url) → text
        .replace(/[*_`~]+/g, '');                 // strip inline formatting markers
      const id = `heading-${level}-${textForId.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      parsed.push({ id, title: rawTitle, level });
    }
  }
  return parsed;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = useMemo(() => parseHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    // Scope to article container only
    const article = document.querySelector('.article');
    if (article) {
      article.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
        if (el.id) observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="toc-panel">
      <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--primary-500)' }}>On this page</div>
      <nav aria-label="Table of contents">
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={e => handleClick(e, h.id)}
            className={`toc-panel-link${activeId === h.id ? ' active' : ''}`}
            aria-current={activeId === h.id ? 'true' : undefined}
            style={{ paddingLeft: `${(h.level - 1) * 12 + 10}px` }}
          >
            {h.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
