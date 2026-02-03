import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, LinkIcon, CheckIcon } from '@heroicons/react/20/solid';
import toast from 'react-hot-toast';
import type { PostDetail } from '../../types/blog';

interface PostFooterProps {
  post?: PostDetail;
}

export default function PostFooter({ }: PostFooterProps) {
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

  return (
    <div className="mt-16 relative overflow-hidden rounded-2xl group">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 group-hover:border-primary-500/30 transition-all duration-500 rounded-2xl"></div>

      {/* Glow effect on hover */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6 p-6 sm:p-8">
        {/* Back to Blog */}
        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-primary-300 hover:bg-primary-500/10 rounded-xl border border-transparent hover:border-primary-500/30 transition-all duration-300 group/link"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover/link:-translate-x-1" />
          <span>Back to Blog</span>
        </Link>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 text-primary-400 border border-primary-500/30 hover:border-primary-400/60 hover:bg-gradient-to-br hover:from-primary-500/30 hover:to-primary-600/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20"
          aria-label="Copy link to clipboard"
        >
          <LinkIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Copy Link</span>
        </button>
      </div>
    </div>
  );
} 