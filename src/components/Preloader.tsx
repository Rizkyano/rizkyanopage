import React, { useEffect, useState } from 'react';
import { sound } from '../utils/soundFX';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        sound.playBlip(950, 0.08);
        setIsFading(true);
        setTimeout(() => {
          onComplete();
        }, 350);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] text-white transition-opacity duration-300 pointer-events-none select-none ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Centered Minimal Loading Bar */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-[160px] h-[3px] bg-neutral-800 relative overflow-hidden rounded-full">
          <div
            className="h-full bg-[#C0FE04] rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_#C0FE04]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
          INITIALIZING // {String(progress).padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
};
