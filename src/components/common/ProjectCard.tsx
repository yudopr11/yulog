interface ProjectCardProps {
  demoLink?: string;
  repoLink?: string;
  title: string;
  description: string;
  projectType?: 'data-pipeline' | 'analytics' | 'full-stack' | 'llm' | 'learning';
  tags?: string[];
}

const kindMeta: Record<string, { label: string; tone: string; icon: React.ReactNode }> = {
  'data-pipeline': {
    label: 'Data Pipeline',
    tone: 'transfer',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="8" ry="3"/>
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
      </svg>
    ),
  },
  analytics: {
    label: 'Analytics',
    tone: 'income',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18M7 15l4-4 3 3 5-6"/>
      </svg>
    ),
  },
  'full-stack': {
    label: 'Full-Stack',
    tone: 'brand',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l-6-6 6-6M15 6l6 6-6 6M14 4l-4 16"/>
      </svg>
    ),
  },
  llm: {
    label: 'LLM / AI',
    tone: 'indigo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="12" height="12" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3"/>
      </svg>
    ),
  },
  learning: {
    label: 'Learning',
    tone: 'brand',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4V4zM20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7V4z"/>
      </svg>
    ),
  },
};

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M8 7h9v9"/>
  </svg>
);

export default function ProjectCard({ demoLink, repoLink, title, description, projectType = 'full-stack', tags = [] }: ProjectCardProps) {
  const meta = kindMeta[projectType] || kindMeta['full-stack'];

  return (
    <div className="cuan-card hoverable" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className={`icon-tile ${meta.tone}`} style={{ width: 36, height: 36 }}>
            {meta.icon}
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2 }}>{title}</div>
            <div className="eyebrow" style={{ marginTop: 4, fontSize: 10 }}>{meta.label}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.55, flex: 1 }}>{description}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tags.map(t => <span key={t} className="chip chip-neutral" style={{ fontSize: 10 }}>{t}</span>)}
        </div>
      )}

      {/* Actions */}
      {(demoLink || repoLink) && (
        <div style={{ display: 'flex', gap: 8, paddingTop: 8, borderTop: '1px solid var(--border-soft)', marginTop: 'auto' }}>
          {demoLink && (
            <a
              href={demoLink} target="_blank" rel="noopener noreferrer"
              className="cuan-btn cuan-btn-primary"
              style={{ flex: 1, padding: '8px 12px', fontSize: 12, textDecoration: 'none' }}
            >
              Demo <ArrowUpRightIcon />
            </a>
          )}
          {repoLink && (
            <a
              href={repoLink} target="_blank" rel="noopener noreferrer"
              className="cuan-btn cuan-btn-secondary"
              style={{ flex: 1, padding: '8px 12px', fontSize: 12, textDecoration: 'none' }}
            >
              <GithubIcon /> Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}
