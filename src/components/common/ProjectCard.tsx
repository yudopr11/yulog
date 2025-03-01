import { Link } from 'react-router-dom';

// Reusable Project Card Component
export default function ProjectCard({ to, title, description }: { to: string; title: string; description: string }) {
  // Check if the link is external (starts with http:// or https://)
  const isExternalLink = to.startsWith('http://') || to.startsWith('https://');
  
  // Common styles for both internal and external links
  const cardStyles = "p-6 bg-gradient-to-br from-[#192734] to-[#0c141d] hover:from-[#1e2f41] hover:to-[#101b25] rounded-lg transition-all duration-300 flex flex-col";
  
  // Render content inside both link types
  const cardContent = (
    <>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </>
  );
  
  // For external links, use <a> tag with target="_blank"
  if (isExternalLink) {
    return (
      <a 
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={cardStyles}
      >
        {cardContent}
      </a>
    );
  }
  
  // For internal links, use React Router's Link
  return (
    <Link 
      to={to} 
      className={cardStyles}
    >
      {cardContent}
    </Link>
  );
} 