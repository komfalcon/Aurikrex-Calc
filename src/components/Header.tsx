'use client';

import React from 'react';
import { AngleMode } from '../engine/types';
import { Settings, Wrench } from 'lucide-react';

interface HeaderProps {
  shiftActive: boolean;
  shiftLocked: boolean;
  alphaActive: boolean;
  invActive: boolean;
  hypActive: boolean;
  angleMode: AngleMode;
  onToggleAngleMode: () => void;
  onOpenToolbox: () => void;
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
}) => {
  return (
    <header className="h-[44px] min-h-[44px] max-h-[44px] px-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 backdrop-blur select-none">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-sm">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
            <path d="M12 2L3 20h6l3-6 3 6h6z" />
          </svg>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-sm tracking-wider text-slate-100 font-lexend">AURIKREX</span>
          <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest px-1 py-0.5 rounded bg-blue-500/10">
            Calc
          </span>
        </div>
      </div>

      {/* Annunciators strip: S, A, INV, HYP */}
      <div className="flex items-center gap-2 px-2 py-0.5 bg-slate-950/60 rounded-md border border-slate-800 text-[10px] font-mono tracking-tight font-bold">
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

      {/* DEG/RAD Pill & Toolbox Trigger */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleAngleMode}
          className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-blue-300 border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all"
          title="Toggle Angle Mode"
        >
          {angleMode}
        </button>

        <button
          onClick={onOpenToolbox}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-all"
          title="Open Toolbox & Formulas"
          aria-label="Toolbox"
        >
          <Wrench className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
