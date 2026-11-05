'use client';

import React, { useState } from 'react';
import { FORMULA_BANK } from '../engine/formulas';
import { FormulaDefinition, StepItem } from '../engine/types';
import { solveFormula } from '../engine/formulas';
import { X, Search, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';

interface FormulaBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToTape: (expression: string, resultStr: string) => void;
}

export const FormulaBankModal: React.FC<FormulaBankModalProps> = ({
  isOpen,
  onClose,
  onSendToTape,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [activeFormula, setActiveFormula] = useState<FormulaDefinition | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [solveResult, setSolveResult] = useState<{ result: number; targetVar: string; steps: StepItem[] } | null>(null);
  const [solveError, setSolveError] = useState<string | null>(null);

  if (!isOpen) return null;

  const topics = ['All', 'Mechanics', 'Waves', 'Electricity', 'Thermal', 'Moles and gas laws', 'pH and equilibria', 'Genetics', 'Magnification'];

  const filtered = FORMULA_BANK.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.expression.toLowerCase().includes(search.toLowerCase()) ||
      f.notes?.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || f.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const handleSelectFormula = (f: FormulaDefinition) => {
    setActiveFormula(f);
    setInputs({});
    setSolveResult(null);
    setSolveError(null);
  };

  const handleSolve = () => {
    if (!activeFormula) return;
    setSolveError(null);
    setSolveResult(null);

    try {
      const numericInputs: Record<string, number> = {};
      for (const [k, v] of Object.entries(inputs)) {
        if (v.trim() !== '') {
          const val = parseFloat(v);
          if (isNaN(val)) throw new Error(`Invalid number for ${k}`);
          numericInputs[k] = val;
        }
      }

      const res = solveFormula(activeFormula, numericInputs);
      setSolveResult(res);
    } catch (err: any) {
      setSolveError(err.message || 'Error solving formula');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[90vh] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">
              {activeFormula ? activeFormula.name : 'Formula Bank'}
            </h3>
          </div>
          <button
            onClick={() => {
              if (activeFormula) setActiveFormula(null);
              else onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeFormula ? (
          /* Formula Solver View */
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">{activeFormula.topic}</div>
              <div className="text-sm font-bold font-mono text-slate-100 mt-1">{activeFormula.expression}</div>
              {activeFormula.notes && <div className="text-slate-400 text-[11px] mt-1">{activeFormula.notes}</div>}
            </div>

            <div className="space-y-2">
              <div className="text-slate-300 font-semibold">Enter known values (leave one blank to solve):</div>
              <div className="grid grid-cols-1 gap-2">
                {activeFormula.variables.map((v) => (
                  <div key={v.symbol} className="flex items-center gap-2 bg-slate-800/40 p-2 rounded-lg border border-slate-800">
                    <span className="font-mono font-bold text-blue-400 w-12">{v.symbol}</span>
                    <span className="text-slate-400 flex-1 truncate">{v.name}</span>
                    <input
                      type="number"
                      step="any"
                      placeholder="Leave blank to solve"
                      value={inputs[v.symbol] || ''}
                      onChange={(e) => setInputs({ ...inputs, [v.symbol]: e.target.value })}
                      className="w-32 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-100 text-right font-mono focus:outline-none focus:border-blue-500"
                    />
                    <span className="w-12 text-teal-400 font-mono text-[10px]">{v.defaultUnit}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSolve}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
            >
              Solve Variable
            </button>

            {solveError && (
              <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300">
                {solveError}
              </div>
            )}

            {solveResult && (
              <div className="p-3.5 bg-slate-950 border border-blue-500/40 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-400 text-sm">Solved: {solveResult.targetVar}</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {solveResult.result.toFixed(4)}
                  </span>
                </div>

                {/* Steps */}
                <div className="border-t border-slate-800 pt-2 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Working Steps:</div>
                  {solveResult.steps.map((st, i) => (
                    <div key={i} className="text-slate-300 font-mono text-[11px] pl-2 border-l-2 border-blue-500/50">
                      {st.text}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onSendToTape(activeFormula.expression, `${solveResult.result.toFixed(4)}`);
                    onClose();
                  }}
                  className="w-full mt-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-all"
                >
                  Send to Tape
                </button>
              </div>
            )}
          </div>
        ) : (
          /* List View */
          <>
            {/* Search and Topic Filters */}
            <div className="p-3 border-b border-slate-800 space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search 40+ science formulas..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              {/* Topics chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap transition-all ${
                      selectedTopic === t
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filtered.map((formula) => (
                <div
                  key={formula.id}
                  onClick={() => handleSelectFormula(formula)}
                  className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-200">{formula.name}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 font-semibold">
                        {formula.topic}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-blue-400 font-semibold">{formula.expression}</div>
                    {formula.notes && <div className="text-[10px] text-slate-400">{formula.notes}</div>}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
