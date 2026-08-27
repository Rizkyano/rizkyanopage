import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../data/projects';
import { PROJECTS } from '../data/projects';
import { sound } from '../utils/soundFX';
import { Eye, ExternalLink, Lock, CheckCircle2, Sparkles } from 'lucide-react';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

// Render real website screenshot preview without cropping
const ProjectScreenshotPreview: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="relative flex-1 w-full h-full overflow-hidden bg-[#070b14] flex items-top justify-center group/img">
      <img
        src={project.image}
        alt={`${project.title} Preview`}
        className="w-full h-full object-contain object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
        loading="lazy"
      />
    </div>
  );
};

// Compact Stacking Parallax Card with Centered Alignment & Full Scroll Buffer
const StackingParallaxCard: React.FC<{
  project: Project;
  index: number;
  total: number;
  onSelect: (p: Project) => void;
}> = ({ project, index, total, onSelect }) => {
  const isLast = index === total - 1;

  return (
    <div
      className={`sticky w-full will-change-transform ${
        isLast 
          ? 'mb-[50vh] sm:mb-[65vh] lg:mb-[75vh]' // Extended runway ensures Card 3 stacks completely and holds in view
          : 'mb-44 sm:mb-60 lg:mb-72'
      }`}
      style={{
        // Generous top offset so card is centered vertically and never touches the navbar
        top: `calc(5.8rem + ${index * 14}px)`,
        zIndex: index + 10,
        transform: 'translateZ(0)',
      }}
    >
      {/* Outer Card Shell */}
      <div
        onMouseEnter={() => sound.playHover()}
        className="relative w-full rounded-2xl sm:rounded-3xl dark:bg-[#0a0f1d]/95 bg-white/95 backdrop-blur-md dark:border-white/15 border-slate-200 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.85)] p-5 sm:p-7 lg:p-8 overflow-hidden transition-colors duration-200 dark:hover:border-white/35 hover:border-slate-300 group"
      >
        {/* Themed Ambient Radial Glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[80px] pointer-events-none opacity-15 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          style={{ backgroundColor: project.accentColor }}
        />

        <div className="grid grid-cols-12 gap-5 lg:gap-8 xl:gap-10 items-center relative z-10">
          {/* Left Column: Project Details */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-between space-y-3.5 sm:space-y-4">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
              <span
                className="px-2.5 py-0.5 rounded-full border font-bold text-[11px]"
                style={{
                  borderColor: `${project.accentColor}70`,
                  color: project.accentColor,
                  backgroundColor: `${project.accentColor}12`,
                }}
              >
                {project.number}
              </span>

              <span className="dark:text-slate-400 text-slate-600 font-medium uppercase tracking-wider text-[11px]">
                {project.category} · {project.year}
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full dark:bg-emerald-950/60 bg-emerald-100/80 dark:border-emerald-500/30 border-emerald-400/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {project.status}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold dark:text-white text-slate-900 tracking-tight leading-snug">
              {project.title}
            </h3>

            {/* Description */}
            <p className="dark:text-slate-300 text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
              {project.description}
            </p>

            {/* 2x2 Feature Bullet Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              {project.features.map((feature, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl dark:bg-[#060a14]/80 bg-slate-100/80 dark:border-white/5 border-slate-200/80 text-[11px] sm:text-xs dark:text-slate-300 text-slate-700 transition-colors hover:border-slate-300 dark:hover:border-white/15"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.accentColor }}
                  />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {project.stack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-full dark:bg-[#060a14]/90 bg-slate-100 dark:border-white/10 border-slate-200 text-[11px] font-mono dark:text-slate-300 text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelect(project);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r ${project.buttonGradient} text-white font-sans font-semibold text-xs sm:text-sm shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:brightness-110 active:scale-95 transition-all`}
              >
                <span>Quick Preview</span>
                <Eye size={15} />
              </button>

              <a
                href={`https://${project.url}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full dark:bg-[#060a14]/90 bg-white dark:border-white/15 border-slate-300 dark:text-slate-200 text-slate-800 font-sans font-semibold text-xs sm:text-sm hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-white active:scale-95 transition-all shadow-sm"
              >
                <span>Live Website</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Landscape Widescreen Browser Mockup */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.8] lg:aspect-[16/9] max-h-[260px] sm:max-h-[310px] lg:max-h-[340px] rounded-xl sm:rounded-2xl bg-[#050812] border dark:border-white/15 border-slate-300 overflow-hidden shadow-xl flex flex-col justify-between">
              {/* Top Browser Bar */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#0a0f1e] border-b border-white/10 z-20 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>

                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-300">
                  <Lock size={9} className="text-emerald-400" />
                  <span className="truncate max-w-[160px] sm:max-w-[200px]">{project.url}</span>
                </div>

                <div className="w-5" />
              </div>

              {/* Full Width Screenshot Image */}
              <ProjectScreenshotPreview project={project} />

              {/* Bottom Status Bar */}
              <div className="px-3.5 py-1 bg-[#080c18] border-t border-white/10 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-slate-400 z-20 shrink-0">
                <span>STATUS: SECURE_SSL</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 size={10} /> VERIFIED LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleTransform, setTitleTransform] = useState({
    opacity: 1,
    scale: 1,
  });

  // RAF-Throttled Scroll Listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = titleRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const titleCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const distFromCenter = titleCenter - viewportCenter;

            let opacity = 1;
            let scale = 1;

            if (distFromCenter > 0) {
              const enterRange = windowHeight * 0.65;
              const progress = Math.max(0, Math.min(1, 1 - distFromCenter / enterRange));
              opacity = Math.pow(progress, 1.4);
              scale = 0.85 + progress * 0.15;
            } else {
              const exitRange = windowHeight * 0.55;
              const exitProgress = Math.max(0, Math.min(1, Math.abs(distFromCenter) / exitRange));
              opacity = Math.max(0, 1 - Math.pow(exitProgress, 1.4));
              scale = 1.0 - exitProgress * 0.12;
            }

            setTitleTransform({
              opacity: Math.max(0, Math.min(1, opacity)),
              scale: Math.max(0.8, Math.min(1.05, scale)),
            });
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
    <section id="selected-work" className="relative w-full px-4 sm:px-8 lg:px-14 pt-12 pb-16 select-none">
      {/* Centered Grand Title */}
      <div 
        ref={titleRef}
        className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center mb-16 sm:mb-24 will-change-transform"
        style={{
          opacity: titleTransform.opacity,
          transform: `translate3d(0,0,0) scale(${titleTransform.scale})`,
        }}
      >
        {/* Dynamic Multi-Chromatic Glow Layers in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-[30rem] sm:w-[42rem] h-[20rem] sm:h-[28rem] rounded-full bg-gradient-to-r from-cyan-500/15 via-purple-600/15 to-pink-500/15 blur-[90px]" />
          <div className="absolute w-72 h-72 sm:w-[440px] sm:h-[440px] rounded-full border border-cyan-500/15 border-dashed animate-[spin_40s_linear_infinite]" />
        </div>

        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-cyan-950/70 bg-cyan-100/80 dark:border-cyan-500/40 border-cyan-300 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold mb-6 uppercase tracking-widest shadow-sm">
          <Sparkles size={12} className="text-cyan-500" />
          <span>FEATURED ARCHIVE [{PROJECTS.length} CASES]</span>
        </div>

        {/* Large Centered Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold uppercase tracking-tight dark:text-white text-slate-900 leading-tight">
          <span>SELECTED </span>
          <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            WORKS
          </span>
          <br />
          <span className="text-cyan-500 font-extrabold">&</span> EXPERIENCES
        </h2>

        {/* Scroll Subtitle Indicator */}
        <p className="mt-6 dark:text-slate-400 text-slate-600 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] flex items-center gap-2 font-medium">
          <span>SCROLL DOWN TO EXPLORE CASE STUDIES</span>
          <span className="text-cyan-500 animate-bounce">↓</span>
        </p>
      </div>

      {/* Parallax Sticky Stacking Cards Container with Extended Scroll Runway */}
      <div className="relative w-full">
        {PROJECTS.map((project, index) => (
          <StackingParallaxCard
            key={project.id}
            project={project}
            index={index}
            total={PROJECTS.length}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};
