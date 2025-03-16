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
  const cardStyles = "p-6 bg-gradient-to-br from-[#192734] to-[#0c141d] hover:from-[#1e2f41] hover:to-[#101b25] rounded-lg transition-all duration-300 flex flex-col relative";
  
  // Button styles for CTAs
  const buttonStyles = "px-4 py-2 bg-gradient-to-r from-[#1e2f41] to-[#101b25] hover:from-[#283d52] hover:to-[#192838] rounded-md text-white text-sm font-medium transition-all duration-300";
  
  // Create card content
  const cardContent = (
    <>
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
    </>
  );
  
  // If repo link exists, make the card clickable to the repo
  if (repoLink) {
    return (
      <a 
        href={repoLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cardStyles}
      >
        {cardContent}
      </a>
    );
  }
  
  // If only demo link exists, make card non-clickable
  return (
    <div className={cardStyles}>
      {cardContent}
    </div>
  );
}

// Helper function to check if a link is external
function isExternalLink(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
} 