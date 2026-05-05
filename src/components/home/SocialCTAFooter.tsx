import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface SocialCTAFooterProps {
  socialLinks: Array<{
    href: string;
    icon: React.ReactNode;
    label: string;
  }>;
  onContactClick?: () => void;
}

export default function SocialCTAFooter({
  socialLinks,
  onContactClick,
}: SocialCTAFooterProps) {
  return (
    <div className="glass-card text-center py-12">
      <h2 className="text-h3 mb-4 gradient-text-primary">
        Let's Connect
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        Whether you have a data challenge, want to collaborate, or just want to chat about data engineering,
        I'd love to hear from you!
      </p>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {socialLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-enhanced"
            aria-label={link.label}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="divider my-8"></div>

      {/* CTA Section */}
      <div className="space-y-4">
        <p className="text-gray-500 text-sm">
          Interested in my work? Let's discuss your data needs!
        </p>
        <button
          onClick={onContactClick}
          className="btn-primary group mx-auto"
        >
          Send Me an Email
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}