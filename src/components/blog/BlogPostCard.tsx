import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { PostListItem } from '../../types/blog';

interface BlogPostCardProps {
  post: PostListItem;
}

const CalendarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
  </svg>
);
const ArrowUpRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M8 7h9v9"/>
  </svg>
);

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const [hover, setHover] = useState(false);

  const formattedDate = useMemo(() => {
    return post.created_at
      ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : null;
  }, [post.created_at]);

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`cuan-card${hover ? ' hoverable' : ' hoverable'}`}
        style={{
          padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12,
          height: '100%', width: '100%',
          background: hover ? 'linear-gradient(135deg,#1a2540,#151e2d)' : undefined,
          borderColor: hover ? 'rgba(48,189,242,0.20)' : undefined,
          boxShadow: hover ? 'var(--shadow-card-hi)' : undefined,
          transform: hover ? 'translateY(-1px)' : undefined,
          transition: 'all 200ms ease-out',
        }}
      >
        {/* Meta chips */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {formattedDate && (
              <span className="chip chip-neutral" style={{ fontSize: 10, gap: 4 }}>
                <CalendarIcon /> {formattedDate}
              </span>
            )}
            <span className="chip chip-neutral" style={{ fontSize: 10, gap: 4 }}>
              <ClockIcon /> {post.reading_time} min
            </span>
          </div>
          <div style={{
            color: hover ? 'var(--primary-500)' : 'var(--fg-5)',
            transition: 'all 200ms',
            transform: hover ? 'translate(2px,-2px)' : 'none',
            flexShrink: 0,
          }}>
            <ArrowUpRight />
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.3,
          color: hover ? 'var(--primary-300)' : 'var(--fg-1)',
          transition: 'color 200ms',
        }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          margin: 0, fontSize: 13, color: 'var(--fg-4)', lineHeight: 1.55,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="chip chip-neutral" style={{ fontSize: 10 }}>{tag}</span>
            ))}
            {post.tags.length > 3 && (
              <span className="chip chip-neutral" style={{ fontSize: 10 }}>+{post.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
