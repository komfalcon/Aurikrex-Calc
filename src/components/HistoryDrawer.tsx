'use client';

import React, { useState, useRef } from 'react';
import { StoredTapeRow } from '../db';
import { ChevronUp, Trash2, Clock, Search, CornerDownLeft, Copy, Check, X } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rows: StoredTapeRow[];
  onSelectRow: (row: StoredTapeRow) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  rows,
  onSelectRow,
  onClearHistory,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const touchStartY = useRef<number | null>(null);

  if (!isOpen) return null;

  const filtered = rows.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.expression.toLowerCase().includes(q) ||
      (r.value && r.value.toLowerCase().includes(q)) ||
      (r.unit && r.unit.toLowerCase().includes(q))
    );
  });

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;
    // Swipe UP to close history drawer
    if (deltaY < -40) {
      onClose();
    }
    touchStartY.current = null;
  };

  return (
    <div
      className="tool-overlay absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-start animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[82vh] bg-slate-900 border-b border-slate-700/80 rounded-b-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drawer Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">
              Calculation History ({rows.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {rows.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Clear entire calculation history?')) {
                    onClearHistory();
                  }
                }}
                className="px-2.5 py-1 text-[11px] font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg border border-red-900/30 flex items-center gap-1 transition-all"
                title="Clear all history"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close History"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar if history is not empty */}
        {rows.length > 3 && (
          <div className="px-3 py-2 border-b border-slate-800 bg-slate-950/40">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" />
              <input
                type="text"
                placeholder="Search past calculations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
          </div>
        )}

        {/* Scrollable History List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs font-mono scrollbar-thin scrollbar-thumb-slate-800">
          {rows.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Clock className="w-8 h-8 mx-auto text-slate-600 stroke-[1.5]" />
              <div className="text-xs font-lexend">No calculation history yet</div>
              <div className="text-[10px] text-slate-600 font-sans">
                Expressions and results will automatically appear here as you calculate.
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No calculations matching "{search}"
            </div>
          ) : (
            filtered.map((row, idx) => {
              const hasError = !!row.error;
              const dateStr = new Date(row.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={row.id}
                  onClick={() => {
                    onSelectRow(row);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-blue-500/50 cursor-pointer transition-all group relative"
                >
                  <div className="flex items-center justify-between text-slate-400 group-hover:text-slate-300 mb-1">
                    <span className="text-xs truncate max-w-[80%] font-semibold">
                      {row.expression}
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans">
                      {dateStr}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-slate-500 font-sans">
                      #{idx + 1}
                    </span>

                    <div className="flex items-center gap-2">
                      {hasError ? (
                        <span className="text-xs text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60 font-sans">
                          {row.error}
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-1 font-bold text-slate-100 text-sm">
                          <span className="text-emerald-400 font-mono text-base">{row.value}</span>
                          {row.unit && (
                            <span className="text-xs text-teal-400 font-sans">{row.unit}</span>
                          )}
                        </div>
                      )}

                      <button
                        onClick={(e) => handleCopy(e, row.value || row.expression, row.id)}
                        className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-700/60 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedId === row.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRow(row);
                          onClose();
                        }}
                        className="p-1 rounded text-slate-500 hover:text-blue-400 hover:bg-slate-700/60 transition-colors"
                        title="Load into calculator"
                      >
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Bottom Collapse Handle */}
        <div
          onClick={onClose}
          className="py-2 bg-slate-950/80 border-t border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-950 transition-colors group"
        >
          <ChevronUp className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-sans">
            Swipe up or tap to close history
          </span>
        </div>
      </div>
    </div>
  );
};
