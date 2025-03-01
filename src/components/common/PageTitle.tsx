import { Helmet } from 'react-helmet-async';

interface PageTitleProps {
  title: string;
  description?: string;
}

/**
 * Reusable component for setting page titles consistently across the application
 * Format: "yudopr | {title}"
 */
export default function PageTitle({ title, description }: PageTitleProps) {
  const fullTitle = title ? `yudopr | ${title}` : 'yudopr';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
} 