import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

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
          <ArrowLeftIcon 
            className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" 
          />
          <span className="group-hover:underline">Back to Blog</span>
        </Link>
      </div>
    </div>
  );
} 