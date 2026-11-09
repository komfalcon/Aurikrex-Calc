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
      className={`unit-row h-[38px] min-h-[38px] px-3 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap bg-white border-y border-slate-200 transition-opacity select-none scrollbar-none ${
        dimmed ? 'opacity-65' : 'opacity-100'
      }`}
    >
      {/* Category Cycling Pill */}
      <button
        onClick={onCycleCategory}
        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 min-h-[30px] rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 active:scale-95 transition-all flex items-center gap-1"
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
            className="px-2.5 py-1 min-h-[30px] rounded-md bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-white active:scale-95 transition-all border border-slate-200"
          >
            {unit === 'ohm' ? 'Ω' : unit}
          </button>
        ))}
      </div>
    </div>
  );
};
