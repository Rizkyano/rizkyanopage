import React, { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  delay = 0,
  speed = 30,
  trigger = true,
}) => {
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    if (!trigger) return;

    let timeoutId: number;
    let frame = 0;
    const totalFrames = text.length * 3 + 10;

    timeoutId = setTimeout(() => {
      const interval = setInterval(() => {
        let output = '';
        let completed = true;

        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            output += ' ';
            continue;
          }

          const charProgress = Math.floor(frame / 3);
          if (i < charProgress) {
            output += text[i];
          } else {
            completed = false;
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayText(output);
        frame++;

        if (completed || frame > totalFrames) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, delay, speed, trigger]);

  return <span className={className}>{displayText || text}</span>;
};
