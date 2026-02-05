import React from 'react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label?: string;
  variant?: 'simple' | 'enhanced';
}

// Enhanced Social Link Component with optional label
export default function SocialLink({
  href,
  icon,
  label,
  variant = 'simple',
}: SocialLinkProps) {
  if (variant === 'enhanced') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link-enhanced"
        aria-label={label}
      >
        {icon}
        {label && <span>{label}</span>}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-primary-400 transition-all duration-300 hover-lift"
      aria-label={label}
    >
      {icon}
    </a>
  );
} 