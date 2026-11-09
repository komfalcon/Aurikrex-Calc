'use client';

import React from 'react';
import { UNIT_CATEGORIES, UnitCategory } from '../engine/units';

interface UnitRowProps {
  currentCategoryIndex: number;
  onCycleCategory: () => void;
  onSelectUnit: (unit: string) => void;
  dimmed?: boolean;
}

export const UnitRow: React.FC<UnitRowProps> = ({
  currentCategoryIndex,
  onCycleCategory,
  onSelectUnit,
  dimmed = false,
}) => {
  const activeCategory: UnitCategory = UNIT_CATEGORIES[currentCategoryIndex] || UNIT_CATEGORIES[0];

  return (
    <div
      className={`h-[30px] min-h-[30px] px-3 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap bg-slate-900/50 border-b border-slate-800/80 transition-opacity select-none scrollbar-none ${
        dimmed ? 'opacity-65' : 'opacity-100'
      }`}
    >
      {/* Category Cycling Pill */}
      <button
        onClick={onCycleCategory}
        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 min-h-[36px] rounded-full bg-blue-900/40 text-blue-300 border border-blue-700/50 hover:bg-blue-800/50 active:scale-95 transition-all flex items-center gap-1"
        title="Tap to cycle Unit Category"
      >
        <span>{activeCategory.name}</span>
        <span className="text-[9px] text-blue-400">↻</span>
      </button>

      {/* Unit Chips for this category */}
      <div className="flex items-center gap-1 font-mono text-[11px]">
        {activeCategory.chips.map((unit) => (
          <button
            key={unit}
            onClick={() => onSelectUnit(unit)}
            className="px-2.5 py-1 min-h-[34px] rounded-md bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 active:scale-95 transition-all border border-slate-700/50"
          >
            {unit === 'ohm' ? 'Ω' : unit}
          </button>
        ))}
      </div>
    </div>
  );
};
