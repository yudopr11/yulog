import { useEffect } from 'react';

/**
 * Custom hook for setting page titles consistently across the application
 * Format: "yudopr | {title}"
 */
export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    // Set page title
    const fullTitle = title ? `${title} | yudopr ` : 'yudopr';
    document.title = fullTitle;

    // Set meta description if provided
    const metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    // Cleanup function
    return () => {
      // Reset title to default when component unmounts
      if (!title) {
        document.title = 'yudopr';
      }
    };
  }, [title, description]);
} 