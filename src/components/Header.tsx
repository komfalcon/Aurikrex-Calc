'use client';
import React, { useEffect, useState } from 'react';
import { History, Settings2, Sparkles, WifiOff } from 'lucide-react';
import { AngleUnit } from '../engine/contract';

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

export const Header: React.FC<HeaderProps> = ({ angleMode, onToggleAngleMode, onOpenToolbox, onOpenAsk, onOpenHistory }) => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    return () => { window.removeEventListener('online', online); window.removeEventListener('offline', offline); };
  }, []);

  return (
    <header className="h-[64px] min-h-[64px] px-4 flex items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur z-30">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-sm shadow-sm" aria-hidden="true">A</div>
        <div className="min-w-0">
          <div className="text-[13px] font-extrabold tracking-[0.16em] text-slate-900 leading-tight">AURIKREX</div>
          <div className="text-[10px] font-semibold tracking-wide text-slate-500">CALCULATOR</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button type="button" onClick={onOpenAsk} className="min-h-[40px] px-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 flex items-center gap-1.5 text-[11px] font-bold" aria-label="Ask AI">
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          <span className="hidden min-[390px]:inline">Ask</span>
          {!isOnline && <WifiOff className="w-3 h-3 text-slate-400" />}
        </button>
        <button type="button" onClick={onToggleAngleMode} className="min-w-[46px] min-h-[40px] rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-[11px] font-extrabold" aria-label="Toggle Angle Mode">{angleMode.toUpperCase()}</button>
        {onOpenHistory && <button type="button" onClick={onOpenHistory} className="min-w-[40px] min-h-[40px] rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center" aria-label="History"><History className="w-4 h-4" /></button>}
        <button type="button" onClick={onOpenToolbox} className="min-w-[40px] min-h-[40px] rounded-xl border border-slate-200 bg-white text-slate-600 flex items-center justify-center" aria-label="Settings and tools"><Settings2 className="w-4 h-4" /></button>
      </div>
    </header>
  );
};
