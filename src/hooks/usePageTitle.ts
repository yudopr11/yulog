import { useEffect } from 'react';

interface PageTitleOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

/**
 * Custom hook for setting page titles and Open Graph meta tags for social sharing
 * Format: "yudopr | {title}"
 */
export function usePageTitle(title?: string, description?: string, options?: PageTitleOptions) {
  useEffect(() => {
    // Helper function to safely set/update meta tags
    const setOrUpdateMetaTag = (property: string, content: string, isOgTag: boolean = true) => {
      const attr = isOgTag ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.insertBefore(meta, document.head.firstChild);
      }
      meta.content = content;
    };

    // Set page title immediately
    const fullTitle = title ? `${title} | yudopr` : 'yudopr';
    document.title = fullTitle;

    // Set meta description if provided
    const metaDescription = document.querySelector('meta[name="description"]');
    if (description && metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Set all Open Graph tags for social media sharing
    if (title) {
      setOrUpdateMetaTag('og:title', fullTitle);
    }

    if (description) {
      setOrUpdateMetaTag('og:description', description);
    }

    // Always update og:url to current page
    setOrUpdateMetaTag('og:url', window.location.href);

    // Set og:type
    setOrUpdateMetaTag('og:type', options?.type || 'website');

    // Set og:image if provided
    if (options?.image) {
      setOrUpdateMetaTag('og:image', options.image);
    } else {
      // Set a default image for social sharing
      setOrUpdateMetaTag('og:image', window.location.origin + '/favicon.svg');
    }

    // Set Twitter card tags
    setOrUpdateMetaTag('twitter:card', 'summary_large_image', false);
    if (title) {
      setOrUpdateMetaTag('twitter:title', fullTitle, false);
    }
    if (description) {
      setOrUpdateMetaTag('twitter:description', description, false);
    }

    // Return cleanup function
    return () => {
      // Reset title only if unmounting from a page without a title
      if (!title) {
        document.title = 'yudopr';
      }
    };
  }, [title, description, options?.type, options?.image]);
} 