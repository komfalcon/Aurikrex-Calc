'use client';

import React, { useState } from 'react';
import { CONSTANTS, PhysicalConstant } from '../engine/constants';
import { X, Search } from 'lucide-react';

interface ConstantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConstant: (constant: PhysicalConstant) => void;
}

export const ConstantsModal: React.FC<ConstantsModalProps> = ({
  isOpen,
  onClose,
  onSelectConstant,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = CONSTANTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[85vh] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">Physical Constants</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search constants (e.g. g, light, Planck)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.map((item) => (
            <div
              key={item.symbol}
              onClick={() => {
                onSelectConstant(item);
                onClose();
              }}
              className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-sm text-blue-400">{item.symbol}</span>
                <span className="text-[10px] text-teal-400 font-mono bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                  {item.unit}
                </span>
              </div>
              <div className="font-medium text-xs text-slate-200">{item.name}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">{item.value}</div>
              <div className="text-[10px] text-slate-500 font-sans mt-1">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
