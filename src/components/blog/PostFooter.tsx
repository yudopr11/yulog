import { Link } from 'react-router-dom';
import { ArrowLeftIcon, LinkIcon } from '@heroicons/react/20/solid';
import type { PostDetail } from '../../types/blog';

// Custom social media icon components since Heroicons doesn't have specific social icons
const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface PostFooterProps {
  post: PostDetail;
}

export default function PostFooter({ post }: PostFooterProps) {
  const title = post.title;

  return (
    <div className="mt-16 flex justify-between items-center border-t border-gray-800 pt-6">
      {/* Back to Blog - Left Side */}
      <Link 
        to="/blog" 
        className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors group"
      >
        <ArrowLeftIcon 
          className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" 
        />
        <span className="group-hover:underline">Back to Blog</span>
      </Link>
      
      {/* Social Media - Right Side */}
      <div className="flex space-x-4">
        {/* Twitter/X */}
        <a 
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Share on Twitter"
        >
          <TwitterXIcon className="h-5 w-5" />
        </a>
        
        {/* Facebook */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-5 w-5" />
        </a>
        
        {/* LinkedIn */}
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-700 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="h-5 w-5" />
        </a>
        
        {/* Copy Link */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            // Ideally you'd show a toast notification here
          }}
          className="text-gray-400 hover:text-green-400 transition-colors"
          aria-label="Copy link to clipboard"
        >
          <LinkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 