import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface ProjectCardProps {
  demoLink?: string;
  repoLink?: string;
  title: string;
  description: string;
  projectType?: 'data-pipeline' | 'analytics' | 'full-stack' | 'llm' | 'learning';
}

const projectTypeIcons = {
  'data-pipeline': '📊',
  'analytics': '📈',
  'full-stack': '🛠️',
  'llm': '🤖',
  'learning': '📚',
};

// Reusable Project Card Component
export default function ProjectCard({
  demoLink,
  repoLink,
  title,
  description,
  projectType,
}: ProjectCardProps) {
  // Handler for card click (repo link)
  const handleCardClick = () => {
    if (repoLink) {
      window.open(repoLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="group flex flex-col relative cursor-pointer h-full overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105"
      onClick={handleCardClick}
      role={repoLink ? 'link' : undefined}
      aria-label={repoLink ? `View ${title} repository` : undefined}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 group-hover:border-primary-500/50 transition-all duration-500"></div>

      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-500"></div>

      {/* Glow effect on hover */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        {/* Header with type badge */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex-grow pr-4 group-hover:text-primary-300 transition-colors duration-300">
            {title}
          </h3>
          {projectType && (
            <span className="flex-shrink-0 text-2xl sm:text-3xl group-hover:scale-125 transition-transform duration-300">
              {projectTypeIcons[projectType]}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-300 flex-grow mb-6 sm:mb-8 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        {(demoLink || repoLink) && (
          <div className="flex gap-3 mt-auto pt-2">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:translate-y-[-2px]"
              >
                View Demo
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary-300 border-2 border-primary-500/50 rounded-xl hover:border-primary-400 hover:text-primary-200 hover:bg-primary-500/10 transition-all duration-300 flex items-center justify-center gap-2 hover:translate-y-[-2px]"
              >
                Code
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 