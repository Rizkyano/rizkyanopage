import React from 'react';
import { sound } from '../utils/soundFX';
import { ArrowDown, Sparkles, Mail, Code2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToWork = () => {
    sound.playClick();
    const el = document.getElementById('selected-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    sound.playClick();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between px-4 sm:px-8 lg:px-14 pt-28 pb-12 select-none overflow-hidden">
      {/* Top Status Badge Row */}
      <div className="w-full flex items-center font-mono text-xs z-10">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-emerald-950/60 bg-emerald-100/80 dark:border-emerald-500/30 border-emerald-400/40 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>AVAILABLE FOR NEW PROJECTS</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-10 z-10">
        {/* Left Column: Bold Headline & Call to Action */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          {/* Creative Role Tag */}
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-widest">
            <Code2 size={15} />
            <span>DESIGN ENGINEER & CREATIVE DEVELOPER</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-sans font-bold dark:text-white text-slate-900 tracking-tight leading-[1.05]">
            BUILDING <br />
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              FUTURE-FORWARD
            </span> <br />
            DIGITAL SYSTEMS.
          </h1>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Explore Works Button */}
            <button
              onClick={scrollToWork}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-sans font-semibold text-sm shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Explore Selected Works</span>
              <ArrowDown size={16} className="animate-bounce" />
            </button>

            {/* Contact Button */}
            <button
              onClick={scrollToContact}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full dark:bg-slate-900/90 bg-white/90 dark:border-white/15 border-slate-300 dark:text-slate-200 text-slate-800 font-sans font-semibold text-sm hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-white active:scale-95 transition-all shadow-sm"
            >
              <Mail size={15} />
              <span>Get In Touch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Highlights & Metrics Bar */}
      <div className="w-full pt-6 border-t dark:border-white/10 border-slate-200 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] dark:text-slate-400 text-slate-600 z-10 uppercase tracking-wider">
        <div className="flex items-center gap-6">
          <span>[04+ YEARS EXPERIENCE]</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">[FULL-STACK & DESIGN]</span>
        </div>

        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold">
          <Sparkles size={13} />
          <span>REAL-TIME WEBGL & REACT ECOSYSTEM</span>
        </div>
      </div>
    </section>
  );
};
