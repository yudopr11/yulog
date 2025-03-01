import { Link } from 'react-router-dom';

export default function PostNotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold mb-2">Post not found</h2>
      <p className="text-gray-400">
        The post you're looking for doesn't exist or has been removed.
      </p>
      
      <div className="mt-6">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="group-hover:underline">Back to Blog</span>
        </Link>
      </div>
    </div>
  );
} 