'use client';

import React from 'react';
import { ResultForms } from '../engine/types';

interface SuggestionStripProps {
  lastResult: {
    value: string | number | null;
    numericValue: number | null;
    forms?: ResultForms;
  } | null;
  onApplyForm: (formStr: string) => void;
  onShowSteps: () => void;
  onSolveForX: () => void;
}

export const SuggestionStrip: React.FC<SuggestionStripProps> = ({
  lastResult,
  onApplyForm,
  onShowSteps,
  onSolveForX,
}) => {
  if (!lastResult || lastResult.numericValue === null || isNaN(lastResult.numericValue)) {
    return <div className="h-0 overflow-hidden transition-all duration-150" />;
  }

  const { forms, numericValue } = lastResult;

  return (
    <div className="h-[30px] min-h-[30px] px-3 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap bg-slate-900/70 border-b border-slate-800/60 select-none scrollbar-none text-[11px] font-sans">
      <span className="text-slate-500 font-medium text-[10px] uppercase tracking-wider mr-0.5">Quick:</span>

      {/* Standard Form Chip */}
      {forms?.standardForm && forms.standardForm !== forms.decimal && (
        <button
          onClick={() => onApplyForm(forms.standardForm)}
          className="px-2 py-0.5 rounded-full bg-teal-950/60 text-teal-300 border border-teal-700/60 hover:bg-teal-900/80 active:scale-95 transition-all"
        >
          → std form
        </button>
      )}

      {/* Fraction Chip */}
      {forms?.fraction && (
        <button
          onClick={() => onApplyForm(forms.fraction!)}
          className="px-2 py-0.5 rounded-full bg-teal-950/60 text-teal-300 border border-teal-700/60 hover:bg-teal-900/80 active:scale-95 transition-all"
        >
          → {forms.fraction}
        </button>
      )}

      {/* 3 Significant Figures */}
      {forms && (
        <button
          onClick={() => onApplyForm(forms.sigFigs(3))}
          className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 active:scale-95 transition-all"
        >
          → 3 s.f.
        </button>
      )}

      {/* Show Steps */}
      <button
        onClick={onShowSteps}
        className="px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-700/60 hover:bg-blue-900/80 active:scale-95 transition-all"
      >
        Show steps
      </button>

      {/* Solve for x */}
      <button
        onClick={onSolveForX}
        className="px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-700/60 hover:bg-purple-900/80 active:scale-95 transition-all"
      >
        Solve for x
      </button>
    </div>
  );
};
