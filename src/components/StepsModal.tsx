'use client';

import React from 'react';
import { StepItem } from '../engine/types';
import { X, Check, Copy } from 'lucide-react';

interface StepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  expression: string;
  result: string;
  steps?: StepItem[];
}

export const StepsModal: React.FC<StepsModalProps> = ({
  isOpen,
  onClose,
  expression,
  result,
  steps,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `Aurikrex Working:\nProblem: ${expression}\n` +
      (steps ? steps.map((s) => `• ${s.text}`).join('\n') : '') +
      `\nResult: ${result}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-overlay fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[85vh] shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-sm font-lexend">Worked Steps</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Problem</span>
            <div className="font-mono text-sm text-blue-400 font-bold">{expression}</div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Derivation & Steps</span>
            {steps && steps.length > 0 ? (
              <div className="space-y-2">
                {steps.map((st, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 font-mono text-slate-200 pl-3 border-l-4 border-l-blue-500">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Step {i + 1}</span>
                    {st.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-slate-800/40 text-slate-400 italic">
                Direct evaluation: {expression} = {result}
              </div>
            )}
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-baseline">
            <span className="text-slate-400">Final Answer:</span>
            <span className="font-mono text-base font-bold text-emerald-400">{result}</span>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Solution'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
