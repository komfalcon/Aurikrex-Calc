'use client';

import React, { useState } from 'react';
import { calculateMolarMass, MolarMassResult, PERIODIC_TABLE } from '../engine/chemistry';
import { X, FlaskConical, Table } from 'lucide-react';

interface ChemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToTape: (expr: string, res: string) => void;
}

export const ChemModal: React.FC<ChemModalProps> = ({ isOpen, onClose, onSendToTape }) => {
  const [activeTab, setActiveTab] = useState<'molar' | 'periodic'>('molar');
  const [formulaInput, setFormulaInput] = useState('H2SO4');
  const [result, setResult] = useState<MolarMassResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCompute = () => {
    setError(null);
    try {
      const res = calculateMolarMass(formulaInput);
      setResult(res);
    } catch (e: any) {
      setError(e.message || 'Error parsing chemical formula');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[90vh] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">Chemistry Tools</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('molar')}
            className={`flex-1 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'molar'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Molar Mass & Composition
          </button>
          <button
            onClick={() => setActiveTab('periodic')}
            className={`flex-1 py-2 font-medium transition-colors border-b-2 ${
              activeTab === 'periodic'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Mini Periodic Table
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {activeTab === 'molar' ? (
            <>
              <div className="space-y-2">
                <label className="text-slate-300 font-semibold block">Enter Chemical Formula:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formulaInput}
                    onChange={(e) => setFormulaInput(e.target.value)}
                    placeholder="e.g. H2SO4, Ca(OH)2, C6H12O6"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleCompute}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl active:scale-95 transition-all shadow-md"
                  >
                    Calculate
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300">
                  {error}
                </div>
              )}

              {result && (
                <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Total Molar Mass:</span>
                    <span className="font-mono text-lg font-bold text-emerald-400">
                      {result.molarMass.toFixed(3)} <span className="text-xs text-slate-400 font-sans">g/mol</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Elemental Breakdown:
                    </div>
                    <div className="space-y-1.5">
                      {result.breakdown.map((item) => (
                        <div key={item.element.symbol} className="bg-slate-900/80 p-2 rounded-lg space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-slate-200">
                              {item.element.symbol} ({item.element.name}) × {item.count}
                            </span>
                            <span className="font-mono text-emerald-300 font-semibold">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSendToTape(`Mr(${result.formula})`, `${result.molarMass.toFixed(3)} g/mol`);
                      onClose();
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-all"
                  >
                    Send to Tape
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {Object.values(PERIODIC_TABLE).map((el) => (
                <div
                  key={el.symbol}
                  onClick={() => {
                    setFormulaInput((prev) => prev + el.symbol);
                    setActiveTab('molar');
                  }}
                  className="p-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center text-center"
                >
                  <span className="text-[9px] text-slate-400">{el.atomicNumber}</span>
                  <span className="font-mono font-bold text-base text-emerald-400">{el.symbol}</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">{el.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{el.atomicMass.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
