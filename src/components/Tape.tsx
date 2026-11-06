'use client';

import React, { useRef, useEffect } from 'react';
import { StoredTapeRow } from '../db';
import { ChevronDown, Clock } from 'lucide-react';

interface TapeProps {
  rows: StoredTapeRow[];
  activeRowId: string | null;
  onSelectRow: (row: StoredTapeRow) => void;
  onClearTape: () => void;
  onOpenHistory?: () => void;
}

export const Tape: React.FC<TapeProps> = ({
  rows,
  activeRowId,
  onSelectRow,
  onClearTape,
  onOpenHistory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  // Auto scroll to bottom when rows update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [rows]);

  // Swipe downward detection on the tape area
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;
    // Downward swipe of more than 35px opens the full history drawer
    if (deltaY > 35 && onOpenHistory) {
      onOpenHistory();
    }
    touchStartY.current = null;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
      {/* Scrollable Tape Rows */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-y-auto px-4 py-1.5 flex flex-col gap-1.5 font-mono select-none scrollbar-thin scrollbar-thumb-slate-800"
      >
        {/* mt-auto pushes content to bottom when few rows, without breaking flexbox scrolling when overflowing */}
        <div className="mt-auto" />

        {rows.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs font-lexend italic">
            Aurikrex Live Tape · Enter an expression below
          </div>
        ) : (
          rows.map((row, idx) => {
            const isActive = row.id === activeRowId;
            const hasError = !!row.error;

            return (
              <div
                key={row.id}
                onClick={() => onSelectRow(row)}
                className={`group relative pl-3.5 pr-2 py-1.5 rounded-lg transition-all cursor-pointer hover:bg-slate-800/40 ${
                  isActive ? 'tape-row-active bg-slate-800/50' : ''
                }`}
              >
                {/* Top row: expression left, row number subtle */}
                <div className="flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300">
                  <span className="truncate max-w-[85%]">{row.expression}</span>
                  <span className="text-[10px] text-slate-600 font-sans">#{idx + 1}</span>
                </div>

                {/* Bottom row: result right (or error amber) */}
                <div className="flex items-center justify-end text-right mt-0.5">
                  {hasError ? (
                    <span className="text-xs text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60 font-sans font-medium">
                      {row.error}
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1 text-slate-100 font-semibold text-sm">
                      <span className="text-base text-slate-100">{row.value}</span>
                      {row.unit && <span className="text-xs text-teal-400 font-sans">{row.unit}</span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Subtle Pull-Down Handle / History Pill at bottom of tape */}
      {rows.length > 0 && onOpenHistory && (
        <div
          onClick={onOpenHistory}
          className="w-full flex items-center justify-center py-0.5 cursor-pointer group text-slate-500 hover:text-slate-300 transition-colors"
          title="Scroll or pull down to view full history"
        >
          <div className="flex items-center gap-1 text-[10px] font-sans font-medium bg-slate-900/90 hover:bg-slate-800 px-3 py-0.5 rounded-full border border-slate-800 group-hover:border-blue-500/50 transition-all shadow-sm">
            <ChevronDown className="w-3 h-3 text-blue-400 group-hover:translate-y-0.5 transition-transform" />
            <span className="text-slate-400 group-hover:text-slate-200">History ({rows.length})</span>
          </div>
        </div>
      )}
    </div>
  );
};
