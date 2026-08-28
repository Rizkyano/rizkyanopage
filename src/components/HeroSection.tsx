import React from 'react';
import { sound } from '../utils/soundFX';
import { ArrowDown, Mail, Code2 } from 'lucide-react';

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
    <section className="relative h-screen min-h-[500px] max-h-[920px] flex flex-col justify-center px-4 sm:px-8 lg:px-14 select-none overflow-hidden">
      {/* Main Hero Content */}
      <div className="grid grid-cols-12 gap-6 lg:gap-10 items-center py-2 sm:py-4 z-10">
        {/* Left Column: Bold Headline & Call to Action */}
        <div className="col-span-12 lg:col-span-9 space-y-4 sm:space-y-5 lg:space-y-6">
          {/* Creative Role Tag */}
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-widest">
            <Code2 size={14} />
            <span>DESIGN ENGINEER & CREATIVE DEVELOPER</span>
          </div>

          {/* Headline (Balanced & Crisp on Zoom 100%) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-sans font-bold dark:text-white text-slate-900 tracking-tight leading-[1.08]">
            BUILDING <br />
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              FUTURE-FORWARD
            </span> <br />
            DIGITAL SYSTEMS.
          </h1>

          {/* Action Button Row (Always Clearly in View on 100% Zoom) */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1 sm:pt-2">
            {/* Primary Explore Works Button */}
            <button
              onClick={scrollToWork}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-sans font-semibold text-xs sm:text-sm shadow-[0_4px_22px_rgba(6,182,212,0.35)] hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Explore Selected Works</span>
              <ArrowDown size={15} className="animate-bounce" />
            </button>

            {/* Contact Button */}
            <button
              onClick={scrollToContact}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full dark:bg-slate-900/90 bg-white/90 dark:border-white/15 border-slate-300 dark:text-slate-200 text-slate-800 font-sans font-semibold text-xs sm:text-sm hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-white active:scale-95 transition-all shadow-sm"
            >
              <Mail size={14} />
              <span>Get In Touch</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
