import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, LinkIcon, CheckIcon } from '@heroicons/react/20/solid';
import toast from 'react-hot-toast';
import { shareOnSocialMedia } from '../../services/metaTags';

export default function PostFooter() {
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.custom((t) => (
        <div className={`${t.visible ? 'toast-enter' : 'toast-exit'} toast-success flex items-center gap-3`}>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 flex-shrink-0">
            <CheckIcon className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-green-300">Link copied!</p>
            <p className="text-sm text-green-200/80">Post URL is ready to share</p>
          </div>
        </div>
      ), {
        position: 'top-right',
        duration: 3000,
      });
    } catch (err) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'toast-enter' : 'toast-exit'} toast-error flex items-center gap-3`}>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 flex-shrink-0">
            <span className="text-red-400 font-bold">!</span>
          </div>
          <div>
            <p className="font-semibold text-red-300">Failed to copy</p>
            <p className="text-sm text-red-200/80">Please try again</p>
          </div>
        </div>
      ), {
        position: 'top-right',
        duration: 3000,
      });
    }
  }, []);

  const shareOnX = useCallback(() => {
    shareOnSocialMedia('x', window.location.href);
  }, []);

  const shareOnFacebook = useCallback(() => {
    shareOnSocialMedia('facebook', window.location.href);
  }, []);

  const shareOnLinkedIn = useCallback(() => {
    shareOnSocialMedia('linkedin', window.location.href);
  }, []);

  return (
    <div className="mt-16 relative overflow-hidden rounded-2xl group">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 group-hover:border-primary-500/30 transition-all duration-500 rounded-2xl"></div>

      {/* Glow effect on hover */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Content - Back button on left, social buttons on right */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-6 sm:p-8">
        {/* Back to Blog */}
        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-primary-300 hover:bg-primary-500/10 rounded-xl border border-transparent hover:border-primary-500/30 transition-all duration-300 group/link"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover/link:-translate-x-1" />
          <span>Back to Blog</span>
        </Link>

        {/* Social Media Buttons Group */}
        <div className="flex items-center gap-3">
          {/* Copy Link Button - Icon Only */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 text-primary-400 border border-primary-500/30 hover:border-primary-400/60 hover:bg-gradient-to-br hover:from-primary-500/30 hover:to-primary-600/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20"
            title="Copy link to clipboard"
            aria-label="Copy link to clipboard"
          >
            <LinkIcon className="h-5 w-5" />
          </button>

          {/* Share on X - Icon Only */}
          <button
            onClick={shareOnX}
            className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30 text-gray-300 border border-slate-600/40 hover:border-slate-500/60 hover:bg-gradient-to-br hover:from-slate-700/50 hover:to-slate-800/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-slate-500/20"
            title="Share on X"
            aria-label="Share on X"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.683-5.867 6.683h-3.307l7.671-8.835L.392 2.25h6.663l4.872 6.453 5.317-6.453zM17.092 19.25h1.828L5.074 4.278H3.165l13.927 14.972z" />
            </svg>
          </button>

          {/* Share on Facebook - Icon Only */}
          <button
            onClick={shareOnFacebook}
            className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-blue-700/30 to-blue-800/30 text-blue-300 border border-blue-600/40 hover:border-blue-500/60 hover:bg-gradient-to-br hover:from-blue-700/50 hover:to-blue-800/50 hover:text-blue-200 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* Share on LinkedIn - Icon Only */}
          <button
            onClick={shareOnLinkedIn}
            className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-blue-600/30 to-blue-700/30 text-blue-400 border border-blue-600/40 hover:border-blue-500/60 hover:bg-gradient-to-br hover:from-blue-600/50 hover:to-blue-700/50 hover:text-blue-300 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
            title="Share on LinkedIn"
            aria-label="Share on LinkedIn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.595zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.71 0-.956.771-1.71 1.958-1.71 1.187 0 1.914.754 1.937 1.71 0 .951-.75 1.71-1.98 1.71zm1.581 10.019H3.819V9.934h3.099v9.518zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 