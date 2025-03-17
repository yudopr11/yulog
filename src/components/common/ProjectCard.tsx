import { Link } from 'react-router-dom';

// Reusable Project Card Component
export default function ProjectCard({ 
  demoLink, 
  repoLink, 
  title, 
  description 
}: { 
  demoLink?: string; 
  repoLink?: string; 
  title: string; 
  description: string 
}) {
  // Common styles for the card
  const cardStyles = "p-6 bg-gradient-to-br from-[#192734] to-[#0c141d] hover:from-[#1e2f41] hover:to-[#101b25] rounded-lg transition-all duration-300 flex flex-col relative cursor-pointer";
  
  // Button styles for CTAs
  const buttonStyles = "px-3 py-2 bg-gradient-to-r from-[#1e2f41] to-[#101b25] hover:from-[#283d52] hover:to-[#192838] rounded text-white text-sm font-medium transition-all duration-300";
  
  // Handler for card click (repo link)
  const handleCardClick = () => {
    if (repoLink) {
      window.open(repoLink, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div 
      className={cardStyles}
      onClick={handleCardClick}
      role={repoLink ? "link" : undefined}
      aria-label={repoLink ? `View ${title} repository` : undefined}
    >
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className={`text-gray-400 ${demoLink ? 'mb-10' : 'mb-0'}`}>{description}</p>
      
      {demoLink && (
        <div className="absolute bottom-6 right-6">
          {isExternalLink(demoLink) ? (
            <a 
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={buttonStyles}
            >
              View App
            </a>
          ) : (
            <Link 
              to={demoLink} 
              onClick={(e) => e.stopPropagation()}
              className={buttonStyles}
            >
              View App
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to check if a link is external
function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
} 