import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface ProjectCardProps {
  demoLink?: string;
  repoLink?: string;
  title: string;
  description: string;
  tags?: string[];
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
  tags = [],
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
      className="card-hover group flex flex-col relative cursor-pointer h-full"
      onClick={handleCardClick}
      role={repoLink ? 'link' : undefined}
      aria-label={repoLink ? `View ${title} repository` : undefined}
    >
      {/* Header with type badge */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex-grow pr-4">{title}</h3>
        {projectType && (
          <span className="flex-shrink-0 text-2xl">
            {projectTypeIcons[projectType]}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 flex-grow mb-4">{description}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="badge-tech text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      {(demoLink || repoLink) && (
        <div className="flex gap-3 mt-auto">
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-secondary text-sm flex items-center gap-2 flex-1 justify-center hover-lift"
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
              className="btn-ghost text-sm flex items-center gap-2 justify-center hover-lift"
            >
              Code
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
} 