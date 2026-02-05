import { usePageTitle } from '../../hooks/usePageTitle';

interface PageTitleProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}

/**
 * Reusable component for setting page titles and Open Graph meta tags for social sharing
 * Format: "yudopr | {title}"
 */
export default function PageTitle({ title, description, image, type }: PageTitleProps) {
  usePageTitle(title, description, { image, type });
  return null;
} 