import { useState, useEffect, useCallback } from 'react';

type HeadingType = {
  id: string;
  title: string;
  level: number;
};

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingType[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!content) return;

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
        const title = m[2].trim();
        const id = `heading-${level}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
        parsed.push({ id, title, level });
      }
    }
    setHeadings(parsed);
  }, [content]);

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

    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
      if (el.id) observer.observe(el);
    });

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
      <nav>
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={e => handleClick(e, h.id)}
            className={`toc-panel-link${activeId === h.id ? ' active' : ''}`}
            style={{ paddingLeft: `${(h.level - 1) * 12 + 10}px` }}
          >
            {h.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
