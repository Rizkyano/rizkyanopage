import React from 'react';
import type { Project } from '../data/projects';
import { sound } from '../utils/soundFX';
import { X, ExternalLink, Cpu, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-[#0d1222] bg-white border dark:border-white/20 border-slate-300 rounded-3xl p-6 sm:p-10 font-sans dark:text-white text-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          onMouseEnter={() => sound.playHover()}
          className="absolute top-6 right-6 p-2 rounded-full dark:bg-slate-900 bg-slate-100 dark:border-slate-700 border-slate-300 dark:text-slate-400 text-slate-600 hover:text-cyan-500 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Top Tag & Year */}
        <div className="flex items-center gap-3 text-xs mb-4 font-mono">
          <span 
            className="text-black font-bold px-3 py-1 rounded-full uppercase tracking-wider text-xs"
            style={{ backgroundColor: project.accentColor }}
          >
            {project.number}
          </span>
          <span className="dark:text-slate-400 text-slate-500">[{project.year}]</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{project.category}</span>
        </div>

        {/* Title & Role */}
        <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight dark:text-white text-slate-900 mb-2">
          {project.title}
        </h2>
        <p className="text-sm font-mono text-cyan-600 dark:text-cyan-300 mb-6 font-semibold">
          ROLE // {project.details.role}
        </p>

        {/* Overview */}
        <div className="space-y-6 text-sm dark:text-slate-300 text-slate-700 border-t dark:border-white/10 border-slate-200 pt-6">
          <div>
            <h4 className="font-mono text-xs dark:text-slate-400 text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2 font-bold">
              <Sparkles size={14} className="text-cyan-500" /> Case Overview
            </h4>
            <p className="text-base dark:text-slate-200 text-slate-800 leading-relaxed font-normal">
              {project.details.overview}
            </p>
          </div>

          {/* Metrics */}
          {project.details.metrics && (
            <div>
              <h4 className="font-mono text-xs dark:text-slate-400 text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
                <Cpu size={14} className="text-cyan-500" /> Key Performance Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.details.metrics.map((metric, i) => (
                  <div 
                    key={i} 
                    className="p-3 dark:bg-slate-900/80 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-xl font-mono text-xs text-cyan-600 dark:text-cyan-300 font-medium"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Engineering Features */}
          <div>
            <h4 className="font-mono text-xs dark:text-slate-400 text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
              <Layers size={14} className="text-cyan-500" /> Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs dark:text-slate-300 text-slate-700">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="pt-4 border-t dark:border-white/10 border-slate-200">
            <h4 className="font-mono text-xs dark:text-slate-400 text-slate-500 uppercase tracking-widest mb-3 font-bold">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 text-xs font-mono rounded-full dark:bg-slate-900 bg-slate-100 dark:border-slate-800 border-slate-300 dark:text-slate-300 text-slate-800 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t dark:border-white/10 border-slate-200 flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-mono">SPEC: PROD_RELEASE</span>
          <a
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs uppercase hover:brightness-110 transition-all shadow-md"
          >
            <span>Visit Live Website</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
