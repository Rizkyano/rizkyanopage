import React, { useState } from 'react';
import { sound } from '../utils/soundFX';
import { Mail, Copy, Check, ArrowUpRight, Github, Twitter, Linkedin, Sparkles } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'haoqiwen@gmail.com';

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="relative w-full px-4 sm:px-8 lg:px-14 pt-20 pb-16 select-none border-t dark:border-white/10 border-slate-200">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between space-y-16">
        {/* Main CTA Block */}
        <div className="flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-cyan-950/60 bg-cyan-100/80 dark:border-cyan-500/30 border-cyan-300 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold">
            <Sparkles size={13} />
            <span>LET'S BUILD SOMETHING EXTRAORDINARY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold dark:text-white text-slate-900 tracking-tight leading-[1.05]">
            HAVE AN IDEA? <br />
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              LET'S COLLABORATE.
            </span>
          </h2>

          <p className="dark:text-slate-300 text-slate-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Always open to discussing design engineering, 3D WebGL interactions, design systems, and innovative web architectures.
          </p>

          {/* Email Copy Box */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={copyEmail}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl dark:bg-[#0a0f1d]/90 bg-white/90 dark:border-white/15 border-slate-300 shadow-md hover:border-cyan-400 dark:hover:border-cyan-400 transition-all group"
            >
              <Mail size={16} className="text-cyan-500" />
              <span className="font-mono text-xs sm:text-sm dark:text-slate-200 text-slate-800 font-medium">
                {email}
              </span>
              <div className="pl-2 border-l dark:border-white/10 border-slate-200 text-slate-400 group-hover:text-cyan-500 transition-colors">
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </div>
            </button>

            {copied && (
              <span className="text-xs font-mono text-emerald-500 animate-fadeIn font-semibold">
                ✓ Copied to clipboard!
              </span>
            )}
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t dark:border-white/10 border-slate-200 font-mono text-xs dark:text-slate-400 text-slate-600">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Twitter size={14} />
              <span>Twitter</span>
              <ArrowUpRight size={12} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>© 2026 WEN.DESIGN · ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
