'use client';

import React, { useRef, useEffect } from 'react';
import { StoredTapeRow } from '../db';

interface TapeProps {
  rows: StoredTapeRow[];
  activeRowId: string | null;
  onSelectRow: (row: StoredTapeRow) => void;
  onClearTape: () => void;
}

export const Tape: React.FC<TapeProps> = ({ rows, activeRowId, onSelectRow, onClearTape }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when rows update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [rows]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-2 flex flex-col justify-end gap-1.5 font-mono select-none"
    >
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
  );
};
