import { usePageTitle } from '../../hooks/usePageTitle';

interface PageTitleProps {
  title: string;
  description?: string;
}

/**
 * Reusable component for setting page titles consistently across the application
 * Format: "yudopr | {title}"
 */
export default function PageTitle({ title, description }: PageTitleProps) {
  usePageTitle(title, description);
  return null;
} 