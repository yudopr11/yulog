interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  impact?: string;
}

interface ProfessionalTimelineProps {
  events: TimelineEvent[];
}

export default function ProfessionalTimeline({
  events,
}: ProfessionalTimelineProps) {
  return (
    <div>
      <h2 className="section-header">Career Highlights</h2>
      <p className="section-subtitle">
        Key milestones in my data engineering journey
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 via-primary-500 to-transparent"></div>

        {/* Timeline items */}
        <div className="space-y-8 md:pl-24">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="timeline-item"
              style={{
                animation: `slide-in 0.5s ease-out forwards`,
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="timeline-item-content">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="timeline-item-date font-bold text-primary-400">
                    {event.year}
                  </span>
                  <span className="hidden md:inline text-gray-600">•</span>
                </div>
                <h4 className="timeline-item-title">
                  {event.title}
                </h4>
                <p className="timeline-item-description">
                  {event.description}
                </p>
                {event.impact && (
                  <div className="mt-3 p-3 rounded-lg bg-primary-600/10 border border-primary-500/20">
                    <p className="text-sm text-primary-300 font-medium">
                      💡 Impact: {event.impact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}