'use client';

import React, { useState } from 'react';
import { CONSTANTS, PhysicalConstant } from '../engine/constants';
import { X, Search, Atom, Sparkles } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Universal', 'Electromagnetic', 'Atomic', 'Physico-chemical', 'Thermodynamic', 'Astronomical', 'Mathematical'];

  const filtered = CONSTANTS.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.unit.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[88vh] shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">
              Physical & Chemical Constants ({CONSTANTS.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 border-b border-slate-800 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search constants (e.g. Planck, c, gravity, charge, mass)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] whitespace-nowrap transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No constants matching "{search}"</div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.symbol}
                onClick={() => {
                  onSelectConstant(item);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-cyan-400 group-hover:scale-105 transition-transform">
                      {item.symbol}
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-teal-400 font-mono bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                    {item.unit}
                  </span>
                </div>
                <div className="font-semibold text-xs text-slate-200">{item.name}</div>
                <div className="text-[11px] text-cyan-200/90 font-mono mt-0.5">{item.value.toExponential ? (Math.abs(item.value) >= 10000 || (Math.abs(item.value) < 0.001 && item.value !== 0) ? item.value.toExponential(6) : item.value) : item.value}</div>
                <div className="text-[10px] text-slate-400 font-sans mt-1">{item.description}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
