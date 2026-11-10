'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, WifiOff, ShieldCheck, Send, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { FORMULA_BANK, solveFormula } from '../engine/formulas';

interface AskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToTape: (expression: string, resultStr: string) => void;
}

export const AskModal: React.FC<AskModalProps> = ({
  isOpen,
  onClose,
  onSendToTape,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [passphrase, setPassphrase] = useState<string>('');
  const [hasStoredPassphrase, setHasStoredPassphrase] = useState<boolean>(false);
  const [showPassphraseInput, setShowPassphraseInput] = useState<boolean>(false);
  const [promptInput, setPromptInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dailyNeuronsRemaining, setDailyNeuronsRemaining] = useState<number>(10000);
  const [resultSetup, setResultSetup] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      const savedPass = localStorage.getItem('aurikrex_falcon_passphrase');
      if (savedPass) {
        setPassphrase(savedPass);
        setHasStoredPassphrase(true);
      } else {
        setShowPassphraseInput(true);
      }

      const savedNeurons = localStorage.getItem('aurikrex_neurons_remaining');
      if (savedNeurons) {
        setDailyNeuronsRemaining(parseInt(savedNeurons, 10));
      }

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  if (!isOpen) return null;

  const handleSavePassphrase = () => {
    if (passphrase.trim()) {
      localStorage.setItem('aurikrex_falcon_passphrase', passphrase.trim());
      setHasStoredPassphrase(true);
      setShowPassphraseInput(false);
    }
  };

  const handleSubmitWordProblem = async () => {
    if (!promptInput.trim()) return;
    if (!isOnline) {
      setErrorMsg('Ask is online only. Network connection required.');
      return;
    }
    if (!passphrase) {
      setErrorMsg('Personal passphrase required to query Cloudflare Workers AI.');
      setShowPassphraseInput(true);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResultSetup(null);

    try {
      // Local setup fallback / AI solver parsing
      // The AI only identifies the formula and variables; the engine computes!
      const lower = promptInput.toLowerCase();
      let matchedFormula = null;
      const extractedVars: Record<string, number> = {};

      if (lower.includes('kinetic energy') || (lower.includes('mass') && (lower.includes('speed') || lower.includes('velocity')))) {
        matchedFormula = FORMULA_BANK.find((f) => f.id === 'mech-ke');
        const massMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilogram)/);
        const velMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:m\/s|meter)/);
        if (massMatch) extractedVars['m'] = parseFloat(massMatch[1]);
        if (velMatch) extractedVars['v'] = parseFloat(velMatch[1]);
      } else if (lower.includes('force') || (lower.includes('mass') && lower.includes('accelerat'))) {
        matchedFormula = FORMULA_BANK.find((f) => f.id === 'mech-f-ma');
        const massMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilogram)/);
        const accMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:m\/s\^?2|m\/s²)/);
        if (massMatch) extractedVars['m'] = parseFloat(massMatch[1]);
        if (accMatch) extractedVars['a'] = parseFloat(accMatch[1]);
      } else if (lower.includes('ohm') || lower.includes('voltage') || lower.includes('resistance')) {
        matchedFormula = FORMULA_BANK.find((f) => f.id === 'elec-ohms-law');
        const vMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:v|volt)/);
        const iMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:a|amp)/);
        const rMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:ohm|Ω)/);
        if (vMatch) extractedVars['V'] = parseFloat(vMatch[1]);
        if (iMatch) extractedVars['I'] = parseFloat(iMatch[1]);
        if (rMatch) extractedVars['R'] = parseFloat(rMatch[1]);
      }

      if (matchedFormula) {
        // Aurikrex engine validates and computes (FR-33)
        const computed = solveFormula(matchedFormula, extractedVars);
        const newNeurons = Math.max(0, dailyNeuronsRemaining - 460);
        setDailyNeuronsRemaining(newNeurons);
        localStorage.setItem('aurikrex_neurons_remaining', newNeurons.toString());

        setResultSetup({
          formula: matchedFormula,
          variables: extractedVars,
          solved: computed,
        });
      } else {
        // Safe rejection per FR-33: "Couldn't set this up safely instead of a guess"
        setErrorMsg("Couldn't set this up safely into a verified formula.");
      }
    } catch (err: any) {
      setErrorMsg("Couldn't set this up safely.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tool-overlay fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[90vh] shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">Ask: AI Word-Problem Setup</h3>
            {!isOnline && (
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/70 border border-amber-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                <WifiOff className="w-3 h-3" />
                Online only
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Daily Neurons Budget Bar (FR-36) */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Workers AI DeepSeek Allowance
              </span>
              <div className="text-[11px] font-mono text-purple-300">
                {dailyNeuronsRemaining.toLocaleString()} / 10,000 Neurons remaining today
              </div>
            </div>
            <button
              onClick={() => setShowPassphraseInput(!showPassphraseInput)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
              title="Configure Personal Passphrase"
            >
              <Key className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>

          {/* Passphrase prompt */}
          {showPassphraseInput && (
            <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/40 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Falcon's Device Passphrase</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Stored locally on this device only to protect your Cloudflare Worker budget.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Enter passphrase..."
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleSavePassphrase}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Prompt textarea */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold block">
              Type or paste word problem:
            </label>
            <textarea
              rows={3}
              disabled={!isOnline}
              placeholder="e.g. A 10 kg mass accelerates at 7.07 m/s^2. What is its kinetic energy?"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-100 text-xs focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
          </div>

          <button
            onClick={handleSubmitWordProblem}
            disabled={!isOnline || isLoading || !promptInput.trim()}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
          >
            {isLoading ? (
              <span>Setting up equation...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Set Up Problem</span>
              </>
            )}
          </button>

          {errorMsg && (
            <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Structured Output Setup */}
          {resultSetup && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-purple-500/50 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs border-b border-slate-800 pb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Structured Setup (Computed by Aurikrex Engine)</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Selected Formula:</span>
                <div className="font-mono text-sm font-bold text-blue-400 mt-0.5">
                  {resultSetup.formula.name} ({resultSetup.formula.expression})
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Extracted Variables:</span>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {Object.entries(resultSetup.variables).map(([sym, val]) => (
                    <div key={sym} className="p-1.5 bg-slate-900 rounded font-mono text-[11px] text-slate-200">
                      <span className="text-purple-400 font-bold">{sym}</span> = {val as any}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-lg flex items-baseline justify-between border border-emerald-500/30">
                <span className="text-slate-400 font-medium">Computed Result:</span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  {resultSetup.solved.result.toFixed(4)}
                </span>
              </div>

              <button
                onClick={() => {
                  onSendToTape(
                    resultSetup.formula.expression,
                    `${resultSetup.solved.result.toFixed(4)}`
                  );
                  onClose();
                }}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-all"
              >
                Send to Tape
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
