import React, { useState } from 'react';
import { sound } from '../utils/soundFX';
import { X, Lock, Unlock, CheckCircle2 } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
  isAlreadyUnlocked: boolean;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({
  isOpen,
  onClose,
  onUnlocked,
  isAlreadyUnlocked,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept valid codes: '2026', 'DESIGN', 'AI', 'HAOQI'
    const validCodes = ['2026', 'DESIGN', 'AI', 'HAOQI', 'TIKTOK'];
    if (validCodes.includes(inputCode.trim().toUpperCase())) {
      sound.playUnlock();
      onUnlocked();
      onClose();
    } else {
      sound.playBlip(200, 0.2);
      setErrorMsg(true);
      setTimeout(() => setErrorMsg(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#121212] border border-white/20 p-6 sm:p-8 font-mono shadow-2xl text-white">
        {/* Close button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1 hover:text-[#C0FE04] transition-colors btn-dotted"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4 text-[#C0FE04]">
          {isAlreadyUnlocked ? <Unlock size={24} /> : <Lock size={24} />}
          <h3 className="text-base font-bold uppercase tracking-wider">
            {isAlreadyUnlocked ? 'DECRYPTED ACCESS: GRANTED' : 'RESTRICTED CLEARANCE'}
          </h3>
        </div>

        {isAlreadyUnlocked ? (
          <div className="space-y-4 text-sm text-neutral-300">
            <div className="p-3 bg-neutral-900 border border-[#C0FE04]/40 text-[#C0FE04] text-xs">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 size={16} />
                <span className="font-bold">CLASSIFIED DIRECTIVE REVEALED</span>
              </div>
              <p>Organization: TikTok / ByteDance Design & AI Lab</p>
              <p>Specialization: Generative UI Workflows & Autonomous Multi-Agent Engineering</p>
            </div>
            <p className="text-xs text-neutral-400">
              Passcode verification active. You now have full clearance across all lab case studies.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-neutral-400">
              Enter passcode to reveal the classified organization and unreleased design engineering initiatives.
            </p>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="ENTER PASSCODE (HINT: 2026)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full bg-black/60 border border-white/20 px-4 py-3 text-sm text-[#C0FE04] placeholder:text-neutral-600 focus:outline-none focus:border-[#C0FE04] uppercase font-mono tracking-widest"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 animate-pulse">
                [ACCESS DENIED] Invalid passcode. Try "2026" or "DESIGN".
              </p>
            )}

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-neutral-500 uppercase">SYS: PASSCODE_GATE_V2</span>
              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="btn-dotted px-4 py-2 bg-[#C0FE04] text-black font-bold uppercase text-xs hover:bg-[#a3e635] transition-colors"
              >
                AUTHORIZE ↵
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
