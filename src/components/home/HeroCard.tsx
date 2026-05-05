const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

interface HeroCardProps {
  name: string;
  bio: string;
  years: number;
  projects: number;
  onProjectsClick?: () => void;
  onBlogClick?: () => void;
}

export default function HeroCard({ bio, onProjectsClick, onBlogClick }: HeroCardProps) {
  return (
    <div className="cuan-slide-up" style={{ padding: '80px 0 56px', maxWidth: 860 }}>
      <div className="eyebrow" style={{ marginBottom: 24, color: 'var(--primary-500)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--primary-500)', verticalAlign: 'middle' }} />
        PERSONAL SITE OF YUDOPR
      </div>

      <h1 style={{
        margin: 0,
        fontSize: 'clamp(44px, 7vw, 88px)',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        color: 'var(--fg-1)',
      }}>
        I build pipelines, ship products, and write about{' '}
        <span className="brand-text">what breaks along the way.</span>
      </h1>

      <p style={{
        marginTop: 28,
        color: 'var(--fg-4)',
        fontSize: 18,
        lineHeight: 1.65,
        maxWidth: 620,
      }}>
        {bio}
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
        <button
          onClick={onBlogClick}
          className="cuan-btn cuan-btn-primary"
          style={{ padding: '13px 22px', fontSize: 15 }}
        >
          Read latest writing <ArrowRightIcon />
        </button>
        <button
          onClick={onProjectsClick}
          className="cuan-btn cuan-btn-secondary"
          style={{ padding: '13px 22px', fontSize: 15 }}
        >
          Browse projects
        </button>
      </div>
    </div>
  );
}
