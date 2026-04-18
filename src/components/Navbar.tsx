import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === '/blog' && (location.pathname.startsWith('/blog/') || location.pathname === '/blog'));

  return (
    <nav
      className="cuan-nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(11,17,32,0.55)' : 'rgba(11,17,32,0.75)',
        backdropFilter: scrolled ? 'blur(32px) saturate(1.6)' : 'blur(20px)',
        WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(1.6)' : 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(48,189,242,0.18)' : '1px solid var(--border-medium)',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(48,189,242,0.10) inset' : '0 4px 16px rgba(0,0,0,0.20)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none' }}>
          <span className="brand-text" style={{ fontSize: 18, fontWeight: 900 }}>yudopr</span>
          {/* <span className="eyebrow" style={{ fontSize: 9, marginTop: 2 }}>data engineer</span> */}
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/blog', label: 'Blog' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`cuan-nav-link${isActive(path) ? ' active' : ''}`}
            >
              {label}
              {isActive(path) && <span className="dot" />}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
