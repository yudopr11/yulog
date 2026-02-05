import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTitle from './common/PageTitle';
import CustomScrollToTop from './common/CustomScrollToTop';
import HeroCard from './home/HeroCard';
import ProjectCard from './common/ProjectCard';

// Social Media Icons
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.3-.67.34-1.03.01-1.13.04-2.27.03-3.4.01-1.79.01-3.58.04-5.37.04-1.15.04-2.3.02-3.45z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Home() {
  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: 'ease-in-out',
    });

    // Refresh AOS on scroll
    window.addEventListener('load', () => {
      AOS.refresh();
    });

    return () => {
      window.removeEventListener('load', () => {
        AOS.refresh();
      });
    };
  }, []);

  // Social links
  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/yudho-prakoso/',
      icon: <LinkedInIcon className="w-5 h-5" />,
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/yudopr11/',
      icon: <GitHubIcon className="w-5 h-5" />,
      label: 'GitHub',
    },
    {
      href: 'https://www.tiktok.com/@yudopr',
      icon: <TikTokIcon className="w-5 h-5" />,
      label: 'TikTok',
    },
    {
      href: 'https://www.youtube.com/@yudopr',
      icon: <YouTubeIcon className="w-5 h-5" />,
      label: 'YouTube',
    },
  ];

  return (
    <div>
      <PageTitle
        title="Home"
        description="Personal website and portfolio of yudopr - Data Engineer"
      />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="container-responsive">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Hero Section with Parallax */}
          <section
            className="mt-10"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div
            >
              <HeroCard
                name="@yudopr"
                bio="I'm a data engineer with 7 years of experience specializing in project management, data analysis, and data engineering. I excel at understanding complex business requirements and creating detailed data models. Recently exploring LLM applications like RAG and function calling to drive innovative solutions."
                years={7}
                projects={5}
                onProjectsClick={() => {
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                onContactClick={() => {
                  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                }}
              />
            </div>
          </section>

          {/* Projects Section */}
          <section
            className="section-spacing"
            id="projects"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div data-aos="fade-up" data-aos-delay="50">
              <h2 className="section-header">Independent Project</h2>
              <p className="section-subtitle">
                Personal projects exploring data engineering and AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  repoLink: 'https://github.com/yudopr11/yupi',
                  title: 'Yupi',
                  description:
                    'Collection of APIs for my projects. Providing foundational services for data integration.',
                  projectType: 'data-pipeline' as const,
                  tags: ['API', 'Backend', 'Microservices'],
                  delay: '100',
                },
                {
                  repoLink: 'https://github.com/yudopr11/cuan',
                  demoLink: 'https://cuan.yudopr.dev',
                  title: 'Cuan',
                  description:
                    'Personal financial management application with data analytics and visualization.',
                  projectType: 'full-stack' as const,
                  tags: ['React', 'Finance', 'Analytics'],
                  delay: '150',
                },
                {
                  repoLink: 'https://github.com/yudopr11/ngakak',
                  demoLink: 'https://ngakak.yudopr.dev',
                  title: 'Ngakak',
                  description:
                    'AI-powered bill splitter leveraging LLM for smart financial calculations.',
                  projectType: 'llm' as const,
                  tags: ['React', 'LLM', 'Function Calling'],
                  delay: '200',
                },
                {
                  repoLink: 'https://github.com/yudopr11/latihan-matematika',
                  title: 'Latihan Matematika',
                  description:
                    'Interactive math quiz platform for high school students with progress tracking.',
                  projectType: 'learning' as const,
                  tags: ['Django', 'Fullstack', 'Education', 'Quiz'],
                  delay: '250',
                },
                {
                  repoLink:
                    'https://youtube.com/playlist?list=PLNxndFN0gO42oBYLVsXBrTsKW7aAPEbQP&si=l5crWKP-WnAFoKhr',
                  title: 'Belajar SQL',
                  description:
                    'Comprehensive SQL tutorial series with practical exercises for beginners.',
                  projectType: 'learning' as const,
                  tags: ['SQL', 'Database', 'Tutorial'],
                  delay: '300',
                },
              ].map((project, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={project.delay}
                  data-aos-duration="1000"
                  className="animate-smooth-scale"
                  style={{
                    animation: `smoothScale 1000ms ease-out ${project.delay}ms both`,
                  }}
                >
                  <ProjectCard
                    repoLink={project.repoLink}
                    demoLink={project.demoLink}
                    title={project.title}
                    description={project.description}
                    projectType={project.projectType}
                    tags={project.tags}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Social & CTA Footer */}
          <section
            className="section-spacing"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div
              className="glass-card text-center py-12"
              data-aos="zoom-in"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <h2 className="text-h3 mb-4 gradient-text-primary">
                Let's Connect
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Whether you have a data challenge, want to collaborate, or just
                want to chat about data engineering, I'd love to hear from you!
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
                    data-aos="fade-in"
                    data-aos-delay={`${idx * 50}`}
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
                  onClick={() => {
                    window.location.href = 'mailto:yudopr10@gmail.com';
                  }}
                  className="btn-primary group mx-auto"
                  data-aos="pulse"
                  data-aos-delay="200"
                >
                  Send Me an Email
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Scroll to Top */}
      <CustomScrollToTop />
    </div>
  );
}