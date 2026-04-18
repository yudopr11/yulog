import type { PostDetail } from '../../types/blog';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
  </svg>
);
const UserIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
  </svg>
);

interface PostHeaderProps {
  post: PostDetail;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header style={{ marginBottom: 32 }}>
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {post.tags.map(tag => (
            <span key={tag} className="chip chip-brand" style={{ fontSize: 10 }}>{tag}</span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 style={{
        margin: 0,
        fontSize: 'clamp(30px, 4vw, 44px)',
        fontWeight: 800, letterSpacing: '-0.025em',
        lineHeight: 1.15, color: 'var(--fg-1)',
      }}>
        {post.title}
      </h1>

      {/* Author + meta */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        marginTop: 20, paddingTop: 20,
        borderTop: '1px solid var(--border-soft)',
        flexWrap: 'wrap',
      }}>
        {post.user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="icon-tile brand" style={{ width: 36, height: 36 }}>
              <UserIcon />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>{post.user.username}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-5)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                {post.created_at && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <CalendarIcon /> {formatDate(post.created_at)}
                  </span>
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <ClockIcon /> {post.reading_time} min read
                </span>
              </div>
            </div>
          </div>
        )}
        {!post.user && post.created_at && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-5)', fontSize: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <CalendarIcon /> {formatDate(post.created_at)}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <ClockIcon /> {post.reading_time} min read
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
