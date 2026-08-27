import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/soundFX';

interface Experience {
  id: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  role: string;
  description: string;
  bullets: string[];
  accentColor: string;
  roleColor: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: 'attin-tour',
    company: 'ATTIN Tour',
    location: 'Jakarta, Indonesia',
    period: 'Feb 2026 – Present',
    isCurrent: true,
    role: 'Digital Marketing',
    description: 'Professional travel company specializing in Hajj and Umrah pilgrimage services. Established in 2007, with more than 17 years of experience.',
    bullets: [
      'Planning and executing digital marketing campaigns through social media, web and paid advertisements.',
      'Creating visual and written content aligned with brand identity and business goals.',
      'Managing and optimizing social media platforms, monitoring trends, and improving engagement.'
    ],
    accentColor: '#f43f5e',
    roleColor: 'text-rose-500',
  },
  {
    id: 'o2-consulting',
    company: 'O2 Consulting',
    location: 'Jakarta, Indonesia',
    period: 'Sep 2024 – Dec 2024',
    isCurrent: false,
    role: 'Graphic Design',
    description: 'A firm focused on public affairs and communications, offering professional services in policy advocacy and strategic communications.',
    bullets: [
      'Collaborated with cross-functional teams to translate business and policy requirements into clear visual assets.',
      'Developed and implemented content strategies, produced compelling visual and textual materials.',
      'Created diverse graphic designs including posters, brochures, and infographics.'
    ],
    accentColor: '#ec4899',
    roleColor: 'text-pink-500',
  },
  {
    id: 'more-design',
    company: 'More Design',
    location: 'Selangor, Malaysia',
    period: 'May 2023 – Aug 2023',
    isCurrent: false,
    role: 'Graphic Design',
    description: 'Leading brand in high-end furniture and homeware with HQ experience center in Kuala Lumpur and five other stores in Southeast Asia.',
    bullets: [
      'Designed and delivered visually compelling assets in partnership with marketing.',
      'Created digital assets for online and offline marketing campaigns aligned with brand identity.',
      'Designed price tags that consistently reinforced the brand\'s visual identity.'
    ],
    accentColor: '#0ea5e9',
    roleColor: 'text-sky-500',
  }
];

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // RAF-Throttled Scroll listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (section) {
            const rect = section.getBoundingClientRect();
            const scrollY = -rect.top;
            const totalScrollable = rect.height - window.innerHeight;

            if (totalScrollable > 0) {
              const raw = scrollY / totalScrollable;
              const progress = Math.max(0, Math.min(1, raw));
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="relative w-full select-none"
      style={{
        height: '200vh',
      }}
    >
      {/* Sticky Full-Viewport 3-Column Stage */}
      <div className="sticky top-14 sm:top-16 w-full min-h-[85vh] flex items-center justify-center px-4 sm:px-8 lg:px-14 py-8 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {EXPERIENCES.map((exp, index) => {
            const enterStart = index * 0.28;
            const enterDuration = 0.32;
            const cardProgress = Math.max(0, Math.min(1, (scrollProgress - enterStart) / enterDuration));

            const opacity = Math.pow(cardProgress, 1.3);
            const translateY = (1 - cardProgress) * 50;
            const scale = 0.94 + cardProgress * 0.06;
            const isVisible = cardProgress > 0.02;

            return (
              <div
                key={exp.id}
                onMouseEnter={() => isVisible && sound.playHover()}
                className="relative rounded-3xl dark:bg-[#0a0f1d]/95 bg-white/95 backdrop-blur-md dark:border-white/15 border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-200 dark:hover:border-white/35 hover:border-slate-300 group will-change-transform"
                style={{
                  opacity,
                  transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                  pointerEvents: isVisible && opacity > 0.5 ? 'auto' : 'none',
                  visibility: isVisible ? 'visible' : 'hidden',
                }}
              >
                {/* Themed Ambient Radial Glow */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none opacity-15 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ backgroundColor: exp.accentColor }}
                />

                {/* Top Corner Accent */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-black/5 dark:from-white/10 to-transparent pointer-events-none rounded-tl-3xl" />

                {/* Card Header Info */}
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    {/* Company Name */}
                    <h3 className="text-xl sm:text-2xl font-sans font-bold dark:text-white text-slate-900 tracking-tight">
                      {exp.company}
                    </h3>

                    {/* Now Badge if current */}
                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Now
                      </span>
                    )}
                  </div>

                  {/* Location & Period */}
                  <div className="flex flex-col gap-1 text-xs font-mono dark:text-slate-400 text-slate-500 mb-3">
                    <span>· {exp.location}</span>
                    <span className="font-mono text-[11px]">{exp.period}</span>
                  </div>

                  {/* Role Title */}
                  <div className="mb-4">
                    <span className={`text-base font-semibold italic ${exp.roleColor}`}>
                      {exp.role}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="dark:text-slate-300 text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {exp.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 pt-3 border-t dark:border-white/10 border-slate-200">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs dark:text-slate-300 text-slate-700 font-normal leading-relaxed">
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: exp.accentColor }} 
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Verification Footer */}
                <div className="relative z-10 mt-6 pt-4 border-t dark:border-white/5 border-slate-200 flex justify-between items-center text-[10px] font-mono dark:text-slate-500 text-slate-400 uppercase tracking-widest">
                  <span>0{index + 1} / 03</span>
                  <span style={{ color: exp.accentColor }} className="font-bold">CONFIRMED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
