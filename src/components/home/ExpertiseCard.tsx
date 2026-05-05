interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: number; // 0-100
  keywords: string[];
}

export default function ExpertiseCard({
  icon,
  title,
  description,
  level,
  keywords,
}: ExpertiseCardProps) {
  return (
    <div className="expertise-card group">
      {/* Icon */}
      <div className="expertise-icon group-hover:scale-110 transition-transform">
        {icon}
      </div>

      {/* Content */}
      <div className="expertise-content w-full">
        <h3 className="text-h4 text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Level Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Proficiency</span>
            <span className="text-xs font-medium text-primary-400">{level}%</span>
          </div>
          <div className="expertise-level">
            <div
              className="expertise-level-bar"
              style={{ width: `${level}%` }}
            ></div>
          </div>
        </div>

        {/* Keywords/Skills */}
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, idx) => (
            <span
              key={idx}
              className="badge-tech text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}