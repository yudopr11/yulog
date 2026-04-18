import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { shareOnSocialMedia } from '../../services/metaTags';

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M11 6l-6 6 6 6"/>
  </svg>
);
const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.683-5.867 6.683h-3.307l7.671-8.835L.392 2.25h6.663l4.872 6.453 5.317-6.453zM17.092 19.25h1.828L5.074 4.278H3.165l13.927 14.972z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.595zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.71 0-.956.771-1.71 1.958-1.71 1.187 0 1.914.754 1.937 1.71 0 .951-.75 1.71-1.98 1.71zm1.581 10.019H3.819V9.934h3.099v9.518zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);

export default function PostFooter() {
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!', { position: 'top-right' });
    } catch {
      toast.error('Failed to copy link', { position: 'top-right' });
    }
  }, []);

  const shareOnX = useCallback(() => shareOnSocialMedia('x', window.location.href), []);
  const shareOnFacebook = useCallback(() => shareOnSocialMedia('facebook', window.location.href), []);
  const shareOnLinkedIn = useCallback(() => shareOnSocialMedia('linkedin', window.location.href), []);

  return (
    <div className="cuan-surface" style={{ marginTop: 48, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Share */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="eyebrow" style={{ fontSize: 11 }}>Share</span>
        <button onClick={handleCopyLink} className="cuan-btn cuan-btn-secondary" style={{ padding: '8px 10px' }} title="Copy link">
          <LinkIcon />
        </button>
        <button onClick={shareOnX} className="cuan-btn cuan-btn-secondary" style={{ padding: '8px 10px' }} title="Share on X">
          <XIcon />
        </button>
        <button onClick={shareOnFacebook} className="cuan-btn cuan-btn-secondary" style={{ padding: '8px 10px' }} title="Share on Facebook">
          <FacebookIcon />
        </button>
        <button onClick={shareOnLinkedIn} className="cuan-btn cuan-btn-secondary" style={{ padding: '8px 10px' }} title="Share on LinkedIn">
          <LinkedInIcon />
        </button>
      </div>

      <div className="cuan-divider" />

      {/* Back */}
      <Link
        to="/blog"
        className="cuan-btn cuan-btn-secondary"
        style={{ textDecoration: 'none', padding: '11px 16px', fontSize: 14, justifyContent: 'center' }}
      >
        <ArrowLeftIcon /> Back to Blog
      </Link>
    </div>
  );
}
