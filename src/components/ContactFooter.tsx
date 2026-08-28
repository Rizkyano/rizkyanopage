import React, { useState, useEffect, useRef } from "react";
import { sound } from "../utils/soundFX";
import { Mail, Copy, Check, ArrowUpRight, Github, Twitter, Linkedin, Sparkles, Send } from "lucide-react";

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const email = "ridhwandinaano@gmail.com";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Fallback in case user is already at bottom
    const checkVisibility = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setIsVisible(true);
        }
      }
    };
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer 
      id="contact" 
      ref={footerRef}
      className="relative w-full px-4 sm:px-8 lg:px-14 pt-16 sm:pt-20 pb-10 sm:pb-12 select-none border-t dark:border-white/10 border-slate-200"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between space-y-8 sm:space-y-10">
        {/* Main CTA Block */}
        <div className="flex flex-col items-start space-y-5">
          {/* Badge Pill with Ping Glow */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-cyan-950/70 bg-cyan-100/90 dark:border-cyan-500/40 border-cyan-300 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold shadow-[0_0_20px_rgba(6,182,212,0.15)] transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Sparkles size={13} className="text-cyan-500 animate-pulse" />
            <span className="tracking-wider">LET'S BUILD SOMETHING EXTRAORDINARY</span>
          </div>

          {/* Headline with dynamic reveal & gradient shimmer */}
          <h2 
            className={`text-3xl sm:text-5xl md:text-6xl font-sans font-bold dark:text-white text-slate-900 tracking-tight leading-[1.05] transform transition-all duration-700 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            HAVE AN IDEA? <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
              LET'S COLLABORATE.
            </span>
          </h2>

          {/* Description */}
          <p 
            className={`dark:text-slate-300 text-slate-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed transform transition-all duration-700 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Always open to discussing design engineering, 3D WebGL interactions, design systems, and innovative web architectures.
          </p>

          {/* Interactive Action Area: Email Copy Box & Send Direct */}
          <div 
            className={`flex flex-wrap items-center gap-3 pt-2 transform transition-all duration-700 delay-450 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <button
              onClick={copyEmail}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl dark:bg-[#0a0f1d]/90 bg-white/90 dark:border-white/15 border-slate-300 shadow-lg hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all group active:scale-95"
            >
              <Mail size={16} className="text-cyan-500 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs sm:text-sm dark:text-slate-200 text-slate-800 font-medium">{email}</span>
              <div className="pl-2 border-l dark:border-white/10 border-slate-200 text-slate-400 group-hover:text-cyan-500 transition-colors">
                {copied ? <Check size={14} className="text-emerald-500 animate-scaleUp" /> : <Copy size={14} />}
              </div>
            </button>

            <a
              href={`mailto:${email}`}
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs sm:text-sm font-sans font-semibold shadow-md hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95"
            >
              <span>Send Mail</span>
              <Send size={13} />
            </a>

            {copied && (
              <span className="text-xs font-mono text-emerald-500 animate-fadeIn font-semibold flex items-center gap-1">
                ✓ Copied to clipboard!
              </span>
            )}
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div 
          className={`flex flex-wrap items-center justify-between gap-4 pt-6 border-t dark:border-white/10 border-slate-200 font-mono text-xs dark:text-slate-400 text-slate-600 transform transition-all duration-700 delay-600 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover()} className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors">
              <Github size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover()} className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors">
              <Twitter size={14} />
              <span>Twitter</span>
              <ArrowUpRight size={12} />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.playHover()} className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors">
              <Linkedin size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>© 2026 RIZKYANO · ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
