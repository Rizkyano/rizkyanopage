import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const StickyStatement: React.FC = () => {
  const statementReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="relative w-full py-28 sm:py-36 px-4 sm:px-8 lg:px-14 border-t border-white/10 select-none overflow-hidden">
      <div 
        ref={statementReveal.ref}
        className={`max-w-4xl mx-auto flex flex-col justify-center items-center font-sans font-bold uppercase text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-center transition-all duration-1000 ease-out transform ${
          statementReveal.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90'
        }`}
      >
        <span className="text-white">
          Innovate
        </span>
        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          with
        </span>
        <span className="text-cyan-300">
          purpose
        </span>
      </div>
    </section>
  );
};
