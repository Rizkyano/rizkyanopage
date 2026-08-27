import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { WebGLCanvas } from './components/WebGLCanvas';
import { HUDOverlay } from './components/HUDOverlay';
import { HeroSection } from './components/HeroSection';
import { ProjectGrid } from './components/ProjectGrid';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactFooter } from './components/ContactFooter';
import { ProjectModal } from './components/ProjectModal';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import type { Project } from './data/projects';
import { sound } from './utils/soundFX';

export function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('light'); // Light mode is default!
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize Lenis for snappy, smooth momentum scrolling (60/120 FPS)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Mouse tracker for coordinates
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setCursorPos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen bg-vibrant-glow selection:bg-cyan-400 selection:text-black font-sans antialiased transition-colors duration-400 ${
      theme === 'dark' ? 'bg-[#070a12] text-white' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Subtle Digital Blueprint Grid Texture Layer */}
      <div className="fixed inset-0 pointer-events-none cyber-grid-overlay z-0" />

      {/* Intro Preloader Loading Bar */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Cyber Crosshair Cursor */}
      <CustomCursor />

      {/* Optimized 3D WebGL Glass Canvas with Theme Adaptability */}
      <WebGLCanvas theme={theme} />

      {/* HUD Overlay */}
      <HUDOverlay
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        cursorPos={cursorPos}
        onNavigate={handleNavigate}
      />

      {/* Main Content Container */}
      <main className="relative z-10 max-w-[1700px] mx-auto">
        <HeroSection />

        <ProjectGrid 
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ExperienceSection />

        <ContactFooter />
      </main>

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
