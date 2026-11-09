'use client';
import React, { useEffect, useRef } from 'react';
import { StoredTapeRow } from '../db';
import { ChevronDown, Clock3 } from 'lucide-react';

interface TapeProps {
  rows: StoredTapeRow[];
  activeRowId: string | null;
  onSelectRow: (row: StoredTapeRow) => void;
  onClearTape: () => void;
  onOpenHistory?: () => void;
}

export const Tape: React.FC<TapeProps> = ({ rows, activeRowId, onSelectRow, onOpenHistory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  useEffect(() => { if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight; }, [rows]);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current !== null && e.changedTouches[0].clientY - touchStartY.current > 35) onOpenHistory?.();
    touchStartY.current = null;
  };
  return (
    <section aria-label="Calculation history" className="flex-1 min-h-[108px] flex flex-col overflow-hidden bg-white">
      <div ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-2 select-none scrollbar-none">
        {rows.length === 0 ? (
          <div className="m-auto text-center text-slate-400 space-y-1.5">
            <Clock3 className="w-5 h-5 mx-auto text-slate-300" />
            <p className="m-0 text-[11px] font-semibold tracking-wide">Your calculations appear here</p>
          </div>
        ) : (
          rows.map((row, idx) => {
            const isActive = row.id === activeRowId;
            return (
              <button type="button" key={row.id} onClick={() => onSelectRow(row)} className={`w-full text-left px-3 py-2 rounded-xl border transition-colors ${isActive ? 'tape-row-active border-blue-200' : 'border-slate-100 hover:border-slate-200'}`}>
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 font-mono"><span className="truncate">{row.expression}</span><span className="text-[10px] text-slate-300">#{idx + 1}</span></div>
                <div className="flex justify-end items-baseline gap-1 mt-0.5 font-mono font-semibold"><span className={row.error ? 'text-rose-600 text-xs' : 'text-slate-900 text-base'}>{row.error || row.value}</span>{!row.error && row.unit && <span className="text-[10px] text-blue-600">{row.unit}</span>}</div>
              </button>
            );
          })
        )}
      </div>
      {rows.length > 0 && onOpenHistory && <button type="button" onClick={onOpenHistory} className="mx-auto mb-2 px-3 py-1 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 flex items-center gap-1"><ChevronDown className="w-3 h-3 text-blue-600" />History ({rows.length})</button>}
    </section>
  );
};
