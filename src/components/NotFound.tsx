import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 6l-6 6 6 6"/>
  </svg>
);

export default function NotFound() {
  usePageTitle('404 - Page Not Found');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
    }}>
      <div>
        <div style={{
          fontSize: 'clamp(96px, 20vw, 160px)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          background: 'var(--gradient-text)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 24,
        }}>
          404
        </div>

        <div className="cuan-divider" style={{ maxWidth: 160, margin: '0 auto 32px' }} />

        <h2 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.02em' }}>
          Page Not Found
        </h2>
        <p style={{ margin: '0 0 36px', color: 'var(--fg-4)', fontSize: 16, maxWidth: 400 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="cuan-btn cuan-btn-primary" style={{ textDecoration: 'none', padding: '12px 24px' }}>
          <ArrowLeftIcon /> Back to Home
        </Link>
      </div>
    </div>
  );
}
