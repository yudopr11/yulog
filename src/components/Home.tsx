import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from './common/PageTitle';
import CustomScrollToTop from './common/CustomScrollToTop';
import HeroCard from './home/HeroCard';
import ProjectCard from './common/ProjectCard';
import { fetchBlogPosts } from '../services/api';
import type { PostListItem } from '../types/blog';

const PROJECTS = [
  {
    repoLink: 'https://github.com/yudopr11/yupi',
    title: 'Yupi',
    description: 'Collection of APIs for my projects. Providing foundational services for data integration.',
    projectType: 'full-stack' as const,
    tags: ['API', 'Backend', 'Microservices'],
  },
  {
    repoLink: 'https://github.com/yudopr11/cuan',
    demoLink: 'https://cuan.yudopr.dev',
    title: 'Cuan',
    description: 'Personal financial management application with data analytics and visualization.',
    projectType: 'full-stack' as const,
    tags: ['React', 'Finance', 'Analytics'],
  },
  {
    repoLink: 'https://github.com/yudopr11/ngakak',
    demoLink: 'https://ngakak.yudopr.dev',
    title: 'Ngakak',
    description: 'AI-powered bill splitter leveraging LLM for smart financial calculations.',
    projectType: 'llm' as const,
    tags: ['React', 'LLM', 'Function Calling'],
  },
  {
    repoLink: 'https://github.com/yudopr11/sat-simulation',
    demoLink: 'https://sat.yudopr.dev',
    title: 'SAT Simulation',
    description: 'Test simulation for SAT preparation.',
    projectType: 'learning' as const,
    tags: ['React', 'Education', 'Quiz'],
  },
  {
    repoLink: 'https://github.com/yudopr11/latihan-matematika',
    title: 'Latihan Matematika',
    description: 'Interactive math quiz platform for high school students with progress tracking.',
    projectType: 'learning' as const,
    tags: ['Django', 'Fullstack', 'Education', 'Quiz'],
  },
  {
    repoLink: 'https://youtube.com/playlist?list=PLNxndFN0gO42oBYLVsXBrTsKW7aAPEbQP&si=l5crWKP-WnAFoKhr',
    title: 'Belajar SQL',
    description: 'Comprehensive SQL tutorial series with practical exercises for beginners.',
    projectType: 'analytics' as const,
    tags: ['SQL', 'Database', 'Tutorial'],
  },
];

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/yudopr11' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yudho-prakoso/' },
  { label: 'YouTube',  href: 'https://www.youtube.com/@yudopr' },
  { label: 'TikTok',   href: 'https://www.tiktok.com/@yudopr' },
];


const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.595zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.71 0-.956.771-1.71 1.958-1.71 1.187 0 1.914.754 1.937 1.71 0 .951-.75 1.71-1.98 1.71zm1.581 10.019H3.819V9.934h3.099v9.518zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/>
  </svg>
);

const SOCIAL_ICONS: Record<string, React.FC> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
  TikTok: TikTokIcon,
};

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
const ArrowUpRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M8 7h9v9"/>
  </svg>
);

function RecentPostCard({ post }: { post: PostListItem }) {
  const [hover, setHover] = useState(false);
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="cuan-card hoverable"
        style={{
          padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12,
          width: '100%',
          background: hover ? 'linear-gradient(135deg,#1a2540,#151e2d)' : undefined,
          borderColor: hover ? 'rgba(48,189,242,0.20)' : undefined,
          transition: 'all 200ms ease-out',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {date && (
              <span className="chip chip-neutral" style={{ fontSize: 10, gap: 4 }}>
                <CalendarIcon /> {date}
              </span>
            )}
            <span className="chip chip-neutral" style={{ fontSize: 10, gap: 4 }}>
              <ClockIcon /> {post.reading_time} min
            </span>
          </div>
          <div style={{
            color: hover ? 'var(--primary-500)' : 'var(--fg-5)',
            transition: 'color 200ms',
            transform: hover ? 'translate(2px,-2px)' : 'none',
            flexShrink: 0,
          }}>
            <ArrowUpRightIcon />
          </div>
        </div>

        <h3 style={{
          margin: 0, fontSize: 17, fontWeight: 700, lineHeight: 1.3,
          color: hover ? 'var(--primary-300)' : 'var(--fg-1)',
          transition: 'color 200ms',
        }}>
          {post.title}
        </h3>

        {post.excerpt && (
          <p style={{
            margin: 0, fontSize: 13, color: 'var(--fg-4)', lineHeight: 1.55,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            flexGrow: 1,
          }}>
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="chip chip-neutral" style={{ fontSize: 10 }}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState<PostListItem[]>([]);

  useEffect(() => {
    fetchBlogPosts(0, 3).then(r => setRecentPosts(r.items)).catch(() => {});
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageTitle
        title="Home"
        description="Personal website and portfolio of yudopr - Data Engineer"
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        {/* Hero */}
        <HeroCard
          name="@yudopr"
          bio="I'm a data engineer with 7 years of experience specializing in project management, data analysis, and data engineering. I excel at understanding complex business requirements and creating detailed data models. Recently exploring LLM applications like RAG, function calling, and MCP to drive innovative solutions."
          years={7}
          projects={6}
          onProjectsClick={() => {
            const el = document.getElementById('projects');
            el && window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
          }}
          onBlogClick={() => navigate('/blog')}
        />

        {/* Recent Writing */}
        {recentPosts.length > 0 && (
          <section style={{ padding: '56px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--primary-500)' }}>Recent writing</div>
                <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg-1)' }}>From the blog</h2>
                <p style={{ margin: '10px 0 0', color: 'var(--fg-4)', fontSize: 15, maxWidth: 560 }}>
                  Notes on data engineering, LLMs and the messy middle of shipping things.
                </p>
              </div>
              <button
                onClick={() => navigate('/blog')}
                className="cuan-btn cuan-btn-secondary"
                style={{ padding: '10px 18px', fontSize: 13, whiteSpace: 'nowrap' }}
              >
                View all <ArrowUpRightIcon />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
              {recentPosts.map(post => (
                <RecentPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section id="projects" style={{ padding: '56px 0 32px', scrollMarginTop: 80 }}>
          {/* Section head */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--primary-500)' }}>Independent work</div>
              <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg-1)' }}>Things I've built</h2>
              <p style={{ margin: '10px 0 0', color: 'var(--fg-4)', fontSize: 15, maxWidth: 560 }}>
                Side projects where I explore data engineering, LLM applications, and education.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
            {PROJECTS.map(p => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* Connect */}
        <section style={{ padding: '56px 0 80px' }}>
          <div className="cuan-card" style={{ padding: 40, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(48,189,242,0.10) 0%, transparent 60%)',
            }} />
            <div style={{ position: 'relative' }}>
              <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--primary-500)' }}>Let's connect</div>
              <h3 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--fg-1)' }}>
                Got a <span className="brand-text">data challenge</span>?
              </h3>
              <p style={{ margin: '12px auto 0', color: 'var(--fg-4)', fontSize: 15, maxWidth: 480 }}>
                Whether you want to collaborate or just chat about data engineering — I'd love to hear from you.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
                {SOCIALS.map(s => {
                  const Icon = SOCIAL_ICONS[s.label];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cuan-btn cuan-btn-secondary"
                      style={{ padding: '10px 16px', fontSize: 13, textDecoration: 'none' }}
                    >
                      {Icon && <Icon />} {s.label}
                    </a>
                  );
                })}
              </div>
              <div className="cuan-divider" style={{ margin: '32px auto', maxWidth: 320 }} />
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                <a
                  href="mailto:me@yudopr.dev"
                  className="cuan-btn cuan-btn-primary"
                  style={{ padding: '12px 22px', textDecoration: 'none' }}
                >
                  <MailIcon /> Send me an email
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CustomScrollToTop />
    </div>
  );
}
