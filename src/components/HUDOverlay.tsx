import React from 'react';
import { sound } from '../utils/soundFX';
import { Volume2, VolumeX, Moon, Sun, Briefcase, Award, Mail, User } from 'lucide-react';

interface HUDOverlayProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  cursorPos: { x: number; y: number };
  onNavigate: (sectionId: string) => void;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onNavigate,
}) => {
  return (
    <header className="z-50 fixed inset-x-0 top-0 flex justify-between items-center px-4 sm:px-8 lg:px-14 py-4 lg:py-6 font-sans pointer-events-none select-none">
      {/* Brand / Logo */}
      <button
        onClick={() => {
          sound.playClick();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onMouseEnter={() => sound.playHover()}
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full dark:bg-[#080d1a]/80 bg-white/85 backdrop-blur-md dark:border-white/10 border-slate-200 shadow-lg dark:text-white text-slate-900 hover:border-cyan-400/50 transition-all group"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:scale-125 transition-transform" />
        <span className="font-sans font-bold text-sm tracking-tight">
          RIZKYANO<span className="text-cyan-400">.</span>DEV
        </span>
      </button>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        {/* About Nav Link */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('about');
          }}
          onMouseEnter={() => sound.playHover()}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full dark:bg-[#080d1a]/70 bg-white/80 backdrop-blur-md dark:border-white/10 border-slate-200 text-xs font-sans font-medium dark:text-slate-300 text-slate-700 hover:text-emerald-500 dark:hover:text-white dark:hover:border-white/30 hover:border-emerald-300 transition-all shadow-sm"
        >
          <User size={13} className="text-emerald-500" />
          <span>About</span>
        </button>

        {/* Work Nav Link */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('selected-work');
          }}
          onMouseEnter={() => sound.playHover()}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full dark:bg-[#080d1a]/70 bg-white/80 backdrop-blur-md dark:border-white/10 border-slate-200 text-xs font-sans font-medium dark:text-slate-300 text-slate-700 hover:text-cyan-400 dark:hover:text-white dark:hover:border-white/30 hover:border-cyan-300 transition-all shadow-sm"
        >
          <Briefcase size={13} className="text-cyan-400" />
          <span>Works</span>
        </button>

        {/* Experience Nav Link */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('experience');
          }}
          onMouseEnter={() => sound.playHover()}
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full dark:bg-[#080d1a]/70 bg-white/80 backdrop-blur-md dark:border-white/10 border-slate-200 text-xs font-sans font-medium dark:text-slate-300 text-slate-700 hover:text-purple-400 dark:hover:text-white dark:hover:border-white/30 hover:border-purple-300 transition-all shadow-sm"
        >
          <Award size={13} className="text-purple-400" />
          <span>Experience</span>
        </button>

        {/* Contact Nav Link */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('contact');
          }}
          onMouseEnter={() => sound.playHover()}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full dark:bg-[#080d1a]/70 bg-white/80 backdrop-blur-md dark:border-white/10 border-slate-200 text-xs font-sans font-medium dark:text-slate-300 text-slate-700 hover:text-pink-400 dark:hover:text-white dark:hover:border-white/30 hover:border-pink-300 transition-all shadow-sm"
        >
          <Mail size={13} className="text-pink-400" />
          <span>Contact</span>
        </button>

        {/* Functional Dark/Light Theme Toggle Button */}
        <button
          onClick={() => {
            sound.playBlip(750, 0.05);
            onToggleTheme();
          }}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full dark:bg-[#080d1a]/80 bg-white/90 backdrop-blur-md dark:border-white/15 border-slate-300 text-xs font-sans font-semibold dark:text-slate-200 text-slate-800 hover:border-cyan-400 transition-all shadow-md active:scale-95"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun size={15} className="text-amber-400 animate-spin-slow" />
          ) : (
            <Moon size={15} className="text-cyan-600" />
          )}
          <span className="hidden sm:inline text-[11px] font-sans font-bold">
            {theme === 'dark' ? 'LIGHT' : 'DARK'}
          </span>
        </button>

        {/* Sound FX Toggle Button */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-md border transition-all shadow-sm ${
            soundEnabled
              ? 'dark:bg-cyan-950/50 bg-cyan-100/80 dark:border-cyan-500/40 border-cyan-300 text-cyan-600 dark:text-cyan-400 font-bold'
              : 'dark:bg-[#080d1a]/80 bg-white/80 dark:border-white/10 border-slate-200 text-slate-400 dark:text-slate-500'
          }`}
          title="Toggle Sound Effects"
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span className="hidden sm:inline text-[11px] font-sans font-medium">
            {soundEnabled ? 'FX ON' : 'MUTE'}
          </span>
        </button>
      </div>
    </header>
  );
};
