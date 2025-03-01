import React from 'react';

// Simplified Social Link Component
export default function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-300 transition-colors"
    >
      {icon}
    </a>
  );
} 