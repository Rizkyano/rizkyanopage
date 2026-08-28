import React from 'react';
import { sound } from '../utils/soundFX';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutSection: React.FC = () => {
  const reveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section 
      id="about" 
      className="relative w-full px-4 sm:px-8 lg:px-14 py-20 sm:py-28 lg:py-36 border-t dark:border-white/10 border-slate-200/80 select-none overflow-hidden"
    >
      {/* Subtle Crosshair Plus Markers on Grid Line Intersections */}
      <div className="absolute top-0 left-4 sm:left-8 lg:left-14 -translate-y-1/2 font-mono text-xs dark:text-white/20 text-slate-400 select-none pointer-events-none">
        +
      </div>
      <div className="absolute top-0 right-4 sm:right-8 lg:right-14 -translate-y-1/2 font-mono text-xs dark:text-white/20 text-slate-400 select-none pointer-events-none">
        +
      </div>

      <div 
        ref={reveal.ref}
        className={`max-w-7xl mx-auto grid grid-cols-12 gap-8 lg:gap-14 items-center transition-all duration-1000 ease-out transform ${
          reveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Left Column: Square Portrait Photo with Animated "Rizkyano" Signature Underneath */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 flex flex-col items-start sm:items-center">
          {/* Square Portrait Photo Frame with Ambient Glow & Transparent Cutout */}
          <div className="relative w-48 sm:w-56 lg:w-64 aspect-square rounded-2xl dark:bg-[#080d1a]/85 bg-white/90 backdrop-blur-md border dark:border-white/20 border-slate-300 shadow-2xl group">
            {/* Soft Ambient Radial Glow Behind Avatar */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/25 via-purple-500/25 to-pink-500/25 blur-lg opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />

            <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="/avatar.png"
                alt="Rizkyano Portrait"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Animated "Rizkyano" Signature (Cyan -> Purple -> Pink Gradient Matching Future-Forward) */}
          <div className="mt-4 flex items-center justify-center w-full max-w-[260px] relative">
            <svg
              viewBox="0 0 280 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-48 sm:w-56 h-auto drop-shadow-[0_4px_16px_rgba(168,85,247,0.35)] dark:drop-shadow-[0_0_18px_rgba(168,85,247,0.55)] ${
                reveal.isVisible ? 'signature-animated' : 'opacity-0'
              }`}
              aria-label="Rizkyano"
            >
              <defs>
                {/* Exact Cyan -> Purple -> Pink Gradient matching Future-Forward */}
                <linearGradient id="future-forward-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              {/* Crisp, Bold, Handwritten Signature Text with Animated Stroke Drawing */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="central"
                className="signature-stroke font-serif italic tracking-wide"
                stroke="url(#future-forward-grad)"
                strokeWidth="1.8"
                fill="url(#future-forward-grad)"
                style={{
                  fontSize: '44px',
                  fontWeight: 700,
                  fontFamily: '"Caveat", "Playfair Display", "Georgia", cursive, serif',
                  letterSpacing: '1.5px',
                }}
              >
                Rizkyano
              </text>
            </svg>
          </div>
        </div>

        {/* Right Column: Editorial Typographic Statements & Links with Distinct Modern Typography */}
        <div className="col-span-12 sm:col-span-8 lg:col-span-9 flex flex-col justify-center space-y-5 sm:space-y-7">
          {/* Section Kicker */}
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-400 font-semibold">
              Profile // Vision & Systems
            </span>
          </div>

          {/* Primary Statement with Distinct Modern Outfit Typography */}
          <h2 className="font-['Outfit',sans-serif] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white text-slate-900 leading-[1.22] tracking-[-0.025em]">
            I craft{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              high-performance digital systems
            </span>{' '}
            and interactive web experiences, bridging technical precision with intentional design.
          </h2>

          {/* Secondary Statement with Interactive Project Links */}
          <p className="font-['Outfit',sans-serif] font-normal text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] dark:text-slate-300 text-slate-700 leading-[1.4] tracking-[-0.01em]">
            Currently architecting{' '}
            <a
              href="https://arcane-card.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="inline-flex items-center font-semibold text-cyan-500 dark:text-cyan-300 border-b-2 border-cyan-400/40 hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              ArcaneCard™
            </a>
            , with a track record of engineering scalable platforms like{' '}
            <a
              href="https://enterprise-mandiri.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="inline-flex items-center font-semibold text-purple-500 dark:text-purple-300 border-b-2 border-purple-400/40 hover:border-purple-400 hover:text-purple-400 transition-all"
            >
              Enterprise Mandiri ERP
            </a>
            ,{' '}
            <a
              href="https://tripyourtravel.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="inline-flex items-center font-semibold text-pink-500 dark:text-pink-300 border-b-2 border-pink-400/40 hover:border-pink-400 hover:text-pink-400 transition-all"
            >
              TravelTrip
            </a>
            , and modular design architectures.
          </p>
        </div>
      </div>

      {/* Signature Handwriting Stroke CSS Keyframe Animation */}
      <style>{`
        .signature-animated .signature-stroke {
          stroke-dasharray: 450;
          stroke-dashoffset: 450;
          fill-opacity: 0;
          animation: drawTextStroke 1.3s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards, fillText 0.6s ease-out 1.2s forwards;
        }
        @keyframes drawTextStroke {
          0% {
            stroke-dashoffset: 450;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fillText {
          0% {
            fill-opacity: 0;
          }
          100% {
            fill-opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};
