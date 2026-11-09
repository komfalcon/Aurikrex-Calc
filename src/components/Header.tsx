'use client';

import React, { useState, useEffect } from 'react';
import { AngleUnit } from '../engine/contract';
import { Wrench, Sparkles, WifiOff, History } from 'lucide-react';

interface HeaderProps {
  shiftActive: boolean;
  shiftLocked: boolean;
  alphaActive: boolean;
  invActive: boolean;
  hypActive: boolean;
  angleMode: AngleUnit;
  onToggleAngleMode: () => void;
  onOpenToolbox: () => void;
  onOpenAsk: () => void;
  onOpenHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  shiftActive,
  shiftLocked,
  alphaActive,
  invActive,
  hypActive,
  angleMode,
  onToggleAngleMode,
  onOpenToolbox,
  onOpenAsk,
  onOpenHistory,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return (
    <header className="relative z-30 h-[56px] min-h-[56px] max-h-[56px] px-3 sm:px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 backdrop-blur select-none touch-manipulation">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
            <path d="M12 2L3 20h6l3-6 3 6h6z" />
          </svg>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-xs sm:text-sm tracking-wider text-slate-100 font-lexend">AURIKREX</span>
          <span className="hidden min-[420px]:inline-block text-[9px] font-semibold text-blue-400 uppercase tracking-widest px-1 py-0.5 rounded bg-blue-500/10">
            Calc
          </span>
        </div>
      </div>

      {/* Annunciators strip: S, A, INV, HYP (hidden below 380px to protect action buttons on mobile) */}
      <div className="hidden min-[380px]:flex items-center gap-1 px-1.5 py-0.5 bg-slate-950/60 rounded-md border border-slate-800 text-[9px] font-mono tracking-tight font-bold shrink-0">
        <span
          className={`transition-colors ${
            shiftActive || shiftLocked ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]' : 'text-slate-700'
          }`}
          title={shiftLocked ? 'SHIFT Locked' : 'SHIFT Active'}
        >
          {shiftLocked ? 'S*' : 'S'}
        </span>
        <span
          className={`transition-colors ${
            alphaActive ? 'text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.7)]' : 'text-slate-700'
          }`}
          title="ALPHA Active"
        >
          A
        </span>
        <span
          className={`transition-colors ${
            invActive ? 'text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]' : 'text-slate-700'
          }`}
          title="Inverse Active"
        >
          INV
        </span>
        <span
          className={`transition-colors ${
            hypActive ? 'text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.7)]' : 'text-slate-700'
          }`}
          title="Hyperbolic Active"
        >
          HYP
        </span>
      </div>

      {/* DEG/RAD Pill, Ask button, History & Toolbox Triggers */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onOpenAsk}
          className={`text-[10px] sm:text-[11px] font-semibold px-2 py-1 min-h-[30px] rounded-full border flex items-center gap-1 active:scale-95 transition-all cursor-pointer select-none touch-manipulation shrink-0 ${
            isOnline
              ? 'bg-purple-950/60 text-purple-300 border-purple-700/60 hover:bg-purple-900/60'
              : 'bg-slate-800/40 text-slate-500 border-slate-700 opacity-60'
          }`}
          title={isOnline ? 'Ask: AI Word-Problem Setup' : 'Ask (Offline)'}
          aria-label="Ask AI"
        >
          <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
          <span>Ask</span>
          {!isOnline && <WifiOff className="w-2.5 h-2.5 text-slate-500 shrink-0" />}
        </button>

        <button
          type="button"
          onClick={onToggleAngleMode}
          className="text-[10px] sm:text-[11px] font-mono font-semibold px-2.5 py-1.5 min-h-[40px] rounded-full bg-slate-800 text-blue-300 border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all cursor-pointer select-none touch-manipulation shrink-0"
          title="Toggle Angle Mode"
          aria-label="Toggle Angle Mode"
        >
          {angleMode.toUpperCase()}
        </button>

        {onOpenHistory && (
          <button
            type="button"
            onClick={onOpenHistory}
            className="p-1.5 min-w-[44px] min-h-[44px] rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer select-none touch-manipulation flex items-center justify-center shrink-0"
            title="View Calculation History"
            aria-label="History"
          >
            <History className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={onOpenToolbox}
          className="p-1.5 min-w-[44px] min-h-[44px] rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer select-none touch-manipulation flex items-center justify-center shrink-0"
          title="Open Toolbox & Formulas"
          aria-label="Toolbox"
        >
          <Wrench className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
