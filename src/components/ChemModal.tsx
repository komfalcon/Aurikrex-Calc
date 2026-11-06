'use client';

import React, { useState, useMemo } from 'react';
import { calculateMolarMass, MolarMassResult, PERIODIC_TABLE, ElementData } from '../engine/chemistry';
import { X, FlaskConical, Search, Radio, Sparkles, Filter } from 'lucide-react';

interface ChemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToTape: (expr: string, res: string) => void;
}

type FilterOption =
  | 'all'
  | 'group-1'
  | 'group-2'
  | 'group-3'
  | 'group-4'
  | 'group-5'
  | 'group-6'
  | 'group-7'
  | 'group-8'
  | 'group-9'
  | 'group-10'
  | 'group-11'
  | 'group-12'
  | 'group-13'
  | 'group-14'
  | 'group-15'
  | 'group-16'
  | 'group-17'
  | 'group-0'
  | 'lanthanide'
  | 'actinide'
  | 'radioactive';

const FILTER_ITEMS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All (118 Elements)' },
  { id: 'group-1', label: 'Group 1' },
  { id: 'group-2', label: 'Group 2' },
  { id: 'group-3', label: 'Group 3' },
  { id: 'group-4', label: 'Group 4' },
  { id: 'group-5', label: 'Group 5' },
  { id: 'group-6', label: 'Group 6' },
  { id: 'group-7', label: 'Group 7' },
  { id: 'group-8', label: 'Group 8' },
  { id: 'group-9', label: 'Group 9' },
  { id: 'group-10', label: 'Group 10' },
  { id: 'group-11', label: 'Group 11' },
  { id: 'group-12', label: 'Group 12' },
  { id: 'group-13', label: 'Group 13' },
  { id: 'group-14', label: 'Group 14' },
  { id: 'group-15', label: 'Group 15' },
  { id: 'group-16', label: 'Group 16' },
  { id: 'group-17', label: 'Group 17 (Halogens)' },
  { id: 'group-0', label: 'Group 0 / 18 (Noble Gases)' },
  { id: 'lanthanide', label: 'Lanthanides' },
  { id: 'actinide', label: 'Actinides' },
  { id: 'radioactive', label: '☢ Radioactive Elements' },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'alkali-metal': { bg: 'bg-red-950/40 hover:bg-red-900/50', text: 'text-red-400', border: 'border-red-800/50' },
  'alkaline-earth': { bg: 'bg-orange-950/40 hover:bg-orange-900/50', text: 'text-orange-400', border: 'border-orange-800/50' },
  'transition-metal': { bg: 'bg-amber-950/40 hover:bg-amber-900/50', text: 'text-amber-400', border: 'border-amber-800/50' },
  'post-transition': { bg: 'bg-blue-950/40 hover:bg-blue-900/50', text: 'text-blue-400', border: 'border-blue-800/50' },
  'metalloid': { bg: 'bg-teal-950/40 hover:bg-teal-900/50', text: 'text-teal-400', border: 'border-teal-800/50' },
  'nonmetal': { bg: 'bg-emerald-950/40 hover:bg-emerald-900/50', text: 'text-emerald-400', border: 'border-emerald-800/50' },
  'halogen': { bg: 'bg-cyan-950/40 hover:bg-cyan-900/50', text: 'text-cyan-400', border: 'border-cyan-800/50' },
  'noble-gas': { bg: 'bg-purple-950/40 hover:bg-purple-900/50', text: 'text-purple-400', border: 'border-purple-800/50' },
  'lanthanide': { bg: 'bg-pink-950/40 hover:bg-pink-900/50', text: 'text-pink-400', border: 'border-pink-800/50' },
  'actinide': { bg: 'bg-rose-950/40 hover:bg-rose-900/50', text: 'text-rose-400', border: 'border-rose-800/50' },
};

export const ChemModal: React.FC<ChemModalProps> = ({ isOpen, onClose, onSendToTape }) => {
  const [activeTab, setActiveTab] = useState<'molar' | 'periodic'>('periodic');
  const [formulaInput, setFormulaInput] = useState('H2SO4');
  const [result, setResult] = useState<MolarMassResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Periodic table filter state
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [elementSearch, setElementSearch] = useState('');
  const [inspectedElement, setInspectedElement] = useState<ElementData | null>(null);

  const allElements = useMemo(() => Object.values(PERIODIC_TABLE), []);

  const filteredElements = useMemo(() => {
    return allElements.filter((el) => {
      // 1. Text search filter
      if (elementSearch.trim()) {
        const q = elementSearch.toLowerCase().trim();
        const matchesQuery =
          el.name.toLowerCase().includes(q) ||
          el.symbol.toLowerCase() === q ||
          el.symbol.toLowerCase().startsWith(q) ||
          el.atomicNumber.toString() === q;
        if (!matchesQuery) return false;
      }

      // 2. Category / Group filter
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'radioactive') return el.radioactive;
      if (selectedFilter === 'lanthanide') return el.category === 'lanthanide';
      if (selectedFilter === 'actinide') return el.category === 'actinide';
      if (selectedFilter === 'group-0') return el.group === 18;

      const groupMatch = selectedFilter.match(/^group-(\d+)$/);
      if (groupMatch) {
        const gNum = parseInt(groupMatch[1], 10);
        // Exclude lanthanides/actinides from standard group 3 unless specifically filtered
        if (gNum === 3 && (el.category === 'lanthanide' || el.category === 'actinide')) {
          return false;
        }
        return el.group === gNum;
      }

      return true;
    });
  }, [allElements, selectedFilter, elementSearch]);

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
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[92vh] shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">
              {activeTab === 'periodic' ? 'Full Periodic Table of Elements (118)' : 'Molar Mass & Composition'}
            </h3>
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
            onClick={() => setActiveTab('periodic')}
            className={`flex-1 py-2.5 font-medium transition-colors border-b-2 ${
              activeTab === 'periodic'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Periodic Table (All 118 Elements)
          </button>
          <button
            onClick={() => setActiveTab('molar')}
            className={`flex-1 py-2.5 font-medium transition-colors border-b-2 ${
              activeTab === 'molar'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Molar Mass & Formula Breakdown
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {activeTab === 'periodic' ? (
            <div className="space-y-3">
              {/* Search & Filter Bar */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by symbol, name, or atomic number (e.g. Au, Carbon, 92)..."
                    value={elementSearch}
                    onChange={(e) => setElementSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                  {elementSearch && (
                    <button
                      onClick={() => setElementSearch('')}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Chips Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
                  <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
                  {FILTER_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedFilter(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] whitespace-nowrap transition-all font-medium ${
                        selectedFilter === item.id
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inspected Element Details Card */}
              {inspectedElement && (
                <div className="bg-slate-950 border border-emerald-500/40 p-3 rounded-xl flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-900 border border-emerald-500/50 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-[9px] text-slate-400">{inspectedElement.atomicNumber}</span>
                      <span className="font-mono font-bold text-base text-emerald-400">{inspectedElement.symbol}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 text-sm">{inspectedElement.name}</span>
                        {inspectedElement.radioactive && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-400 border border-rose-800/50 text-[9px] font-mono">
                            ☢ Radioactive
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 flex gap-2 mt-0.5">
                        <span>Mass: <strong className="text-slate-200 font-mono">{inspectedElement.atomicMass.toFixed(3)}</strong></span>
                        <span>•</span>
                        <span>Group: <strong className="text-slate-200">{inspectedElement.group === 18 ? '0 (18)' : inspectedElement.group}</strong></span>
                        <span>•</span>
                        <span>Period: <strong className="text-slate-200">{inspectedElement.period}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setFormulaInput((prev) => prev + inspectedElement.symbol);
                        setActiveTab('molar');
                      }}
                      className="px-2.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-semibold transition-all"
                    >
                      Use in Molar Mass
                    </button>
                    <button
                      onClick={() => {
                        onSendToTape(`${inspectedElement.name} (${inspectedElement.symbol})`, `${inspectedElement.atomicMass} g/mol`);
                        onClose();
                      }}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] transition-all"
                    >
                      Send to Tape
                    </button>
                  </div>
                </div>
              )}

              {/* Elements Count */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
                <span>Showing {filteredElements.length} of 118 elements</span>
                <span>Click any element to inspect or calculate</span>
              </div>

              {/* Periodic Table Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {filteredElements.map((el) => {
                  const style = CATEGORY_COLORS[el.category] || {
                    bg: 'bg-slate-800/60',
                    text: 'text-slate-200',
                    border: 'border-slate-700/60',
                  };
                  const isSelected = inspectedElement?.symbol === el.symbol;

                  return (
                    <div
                      key={el.symbol}
                      onClick={() => setInspectedElement(el)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center text-center relative ${
                        isSelected
                          ? 'ring-2 ring-emerald-500 bg-slate-800 border-emerald-500'
                          : `${style.bg} ${style.border}`
                      }`}
                    >
                      {el.radioactive && (
                        <span className="absolute top-1 right-1 text-[8px] text-rose-400">☢</span>
                      )}
                      <span className="text-[9px] text-slate-400">{el.atomicNumber}</span>
                      <span className={`font-mono font-bold text-base ${style.text}`}>{el.symbol}</span>
                      <span className="text-[10px] text-slate-300 truncate w-full">{el.name}</span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {el.atomicMass < 100 ? el.atomicMass.toFixed(2) : el.atomicMass.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Molar Mass Tab */
            <>
              <div className="space-y-2">
                <label className="text-slate-300 font-semibold block">Enter Chemical Formula:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formulaInput}
                    onChange={(e) => setFormulaInput(e.target.value)}
                    placeholder="e.g. H2SO4, Ca(OH)2, Fe2(SO4)3, C6H12O6"
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
          )}
        </div>
      </div>
    </div>
  );
};
