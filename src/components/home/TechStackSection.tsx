interface TechItem {
  name: string;
  category: 'language' | 'database' | 'tool' | 'cloud';
}

interface TechStackSectionProps {
  technologies: TechItem[];
}

const categoryLabels = {
  language: 'Languages',
  database: 'Databases',
  tool: 'Tools & Frameworks',
  cloud: 'Cloud Platforms',
};

export default function TechStackSection({
  technologies,
}: TechStackSectionProps) {
  const grouped = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechItem[]>);

  const categories = ['language', 'database', 'tool', 'cloud'] as const;

  return (
    <div>
      <h2 className="section-header">Tech Stack</h2>
      <p className="section-subtitle">
        Tools and technologies I work with daily
      </p>

      <div className="space-y-8">
        {categories.map((category) => (
          grouped[category] && (
            <div key={category}>
              <h3 className="text-h4 mb-4 text-primary-300">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div className="skills-grid">
                {grouped[category]?.map((tech, idx) => (
                  <div
                    key={idx}
                    className="badge badge-tech hover-lift"
                    style={{
                      animation: `slide-in-stagger 0.5s ease-out forwards`,
                      animationDelay: `${idx * 50}ms`,
                    }}
                  >
                    <span className="inline-block w-2 h-2 bg-primary-400 rounded-full"></span>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}