'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, WifiOff, ShieldCheck, Send, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { FORMULA_BANK, solveFormula } from '../engine/formulas';
import {
  addUsageToDaily,
  AIUsageSummary,
  createEmptyDailyUsage,
  DAILY_FREE_NEURON_LIMIT,
  DEFAULT_AI_MODEL,
  getUtcDayKey,
  DailyNeuronUsage,
  MODEL_NEURON_PRICING,
  normalizeDailyUsage,
  USD_PER_1_000_NEURONS,
} from '../ai/usage';

const DAILY_USAGE_STORAGE_KEY = 'aurikrex_ai_daily_usage_v2';
const LAST_USAGE_STORAGE_KEY = 'aurikrex_ai_last_usage_v2';

function readDailyUsage(): DailyNeuronUsage {
  const utcDay = getUtcDayKey();
  if (typeof window === 'undefined') return createEmptyDailyUsage(utcDay);
  try {
    const raw = localStorage.getItem(DAILY_USAGE_STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : null;
    const normalized = normalizeDailyUsage(saved, utcDay);
    if (!saved || saved.utcDay !== utcDay) {
      localStorage.setItem(DAILY_USAGE_STORAGE_KEY, JSON.stringify(normalized));
    }
    localStorage.removeItem('aurikrex_neurons_remaining');
    return normalized;
  } catch {
    return createEmptyDailyUsage(utcDay);
  }
}

function readLastUsage(utcDay: string): AIUsageSummary | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LAST_USAGE_STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    const usage = saved?.usage as AIUsageSummary | undefined;
    if (
      saved?.utcDay !== utcDay || typeof usage?.model !== 'string' ||
      typeof usage.promptTokens !== 'number' || typeof usage.completionTokens !== 'number'
    ) return null;
    return usage;
  } catch {
    return null;
  }
}

function formatModelName(model: string): string {
  if (model === DEFAULT_AI_MODEL) return 'Llama 3.1 8B';
  if (model === '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b') return 'DeepSeek R1 Distill Qwen 32B';
  return model;
}

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
  const [dailyUsage, setDailyUsage] = useState<DailyNeuronUsage>(() => createEmptyDailyUsage());
  const [lastUsage, setLastUsage] = useState<AIUsageSummary | null>(null);
  const [usageNotice, setUsageNotice] = useState<string | null>(null);
  const [resultSetup, setResultSetup] = useState<any>(null);
  const [assistantAnswer, setAssistantAnswer] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dailyNeuronsRemaining = Math.max(0, DAILY_FREE_NEURON_LIMIT - dailyUsage.neuronsUsed);
  const activeModel = lastUsage?.model ?? DEFAULT_AI_MODEL;
  const modelPricing = MODEL_NEURON_PRICING[activeModel];
  const dollarValuePerNeuron = USD_PER_1_000_NEURONS / 1_000;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refreshUsage = () => {
        const current = readDailyUsage();
        setDailyUsage(current);
        setLastUsage(readLastUsage(current.utcDay));
      };

      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      window.addEventListener('focus', refreshUsage);
      window.addEventListener('storage', refreshUsage);
      document.addEventListener('visibilitychange', refreshUsage);
      const resetTimer = window.setInterval(refreshUsage, 30_000);
      refreshUsage();

      const savedPass = localStorage.getItem('aurikrex_falcon_passphrase');
      if (savedPass) {
        setPassphrase(savedPass);
        setHasStoredPassphrase(true);
      } else {
        setShowPassphraseInput(true);
      }

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('focus', refreshUsage);
        window.removeEventListener('storage', refreshUsage);
        document.removeEventListener('visibilitychange', refreshUsage);
        window.clearInterval(resetTimer);
      };
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const current = readDailyUsage();
      setDailyUsage(current);
      setLastUsage(readLastUsage(current.utcDay));
    }
  }, [isOpen]);

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
    setAssistantAnswer(null);

    try {
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'aurikrex-calc.moparaji57.workers.dev'
        ? '/api/ask'
        : 'https://aurikrex-calc.moparaji57.workers.dev/api/ask';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInput.trim(),
          formulas: FORMULA_BANK.map(({ id, name, expression, variables }) => ({
            id,
            name,
            expression,
            variables: variables.map(({ symbol, name: variableName, defaultUnit }) => ({ symbol, name: variableName, defaultUnit })),
          })),
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error || 'Workers AI request failed.');

      const usage = payload?.usage as AIUsageSummary | null | undefined;
      if (
        usage && typeof usage.promptTokens === 'number' && typeof usage.completionTokens === 'number'
      ) {
        setLastUsage(usage);
        setUsageNotice(null);
        if (typeof usage.neuronsConsumed === 'number' && Number.isFinite(usage.neuronsConsumed)) {
          const utcDay = getUtcDayKey();
          const updated = addUsageToDaily(readDailyUsage(), usage, utcDay);
          try {
            localStorage.setItem(DAILY_USAGE_STORAGE_KEY, JSON.stringify(updated));
            localStorage.setItem(LAST_USAGE_STORAGE_KEY, JSON.stringify({ utcDay, usage }));
          } catch {
            setUsageNotice('Usage was measured, but this browser could not save the daily total.');
          }
          setDailyUsage(updated);
        } else {
          setUsageNotice('Token counts were returned, but this model has no configured neuron price.');
        }
      } else {
        setUsageNotice('This response did not include usage metrics, so the neuron balance was not updated.');
      }

      if (payload?.kind === 'answer' && typeof payload.answer === 'string') {
        setAssistantAnswer(payload.answer);
      } else if (payload?.kind === 'formula') {
        const matchedFormula = FORMULA_BANK.find((formula) => formula.id === payload.formulaId);
        const extractedVars = Object.fromEntries(
          Object.entries(payload.variables ?? {}).filter(([symbol, value]) =>
            matchedFormula?.variables.some((variable) => variable.symbol === symbol) && typeof value === 'number' && Number.isFinite(value)
          )
        ) as Record<string, number>;
        if (!matchedFormula || Object.keys(extractedVars).length === 0) throw new Error('The AI did not return a recognized formula.');
        const computed = solveFormula(matchedFormula, extractedVars);
        setResultSetup({ formula: matchedFormula, variables: extractedVars, solved: computed, explanation: payload.explanation });
      } else {
        throw new Error('The AI returned an unsupported response.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Couldn't set this up safely.");
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
                Workers AI · {formatModelName(activeModel)}
              </span>
              <div className="text-[11px] font-mono text-purple-300">
                {dailyNeuronsRemaining.toLocaleString(undefined, { maximumFractionDigits: 2 })} / {DAILY_FREE_NEURON_LIMIT.toLocaleString()} estimated neurons remaining today
              </div>
              <div className="text-[10px] text-slate-500">
                This device · resets at 00:00 UTC
              </div>
              {modelPricing && (
                <>
                  <div className="text-[10px] text-slate-500">
                    Per 1M tokens: ${modelPricing.inputUsdPerMillion.toFixed(3)} input / ${modelPricing.outputUsdPerMillion.toFixed(3)} output
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Neuron rates: {modelPricing.inputNeuronsPerMillion.toLocaleString()} input / {modelPricing.outputNeuronsPerMillion.toLocaleString()} output · ≈ ${dollarValuePerNeuron.toFixed(6)} per neuron above free allocation
                  </div>
                </>
              )}
              <div className="text-[10px] text-slate-500">
                Today tracked: {dailyUsage.neuronsUsed.toLocaleString(undefined, { maximumFractionDigits: 2 })} neurons · {dailyUsage.inputTokens.toLocaleString()} in / {dailyUsage.outputTokens.toLocaleString()} out tokens
              </div>
              {lastUsage && (
                <div className="text-[10px] text-slate-400">
                  Last call{lastUsage.exact ? '' : ' (estimated)'}: {lastUsage.promptTokens.toLocaleString()} in / {lastUsage.completionTokens.toLocaleString()} out tokens
                  {typeof lastUsage.neuronsConsumed === 'number' && (
                    <> · {lastUsage.neuronsConsumed.toLocaleString(undefined, { maximumFractionDigits: 2 })} neurons · ${lastUsage.costUsd?.toFixed(8) ?? 'n/a'}</>
                  )}
                </div>
              )}
              {usageNotice && <div className="text-[10px] text-amber-400">{usageNotice}</div>}
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
                Stored locally on this device. The Worker does not validate this passphrase, so it does not secure the AI endpoint.
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
              Beyond Numbers? Ask away:
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

          {assistantAnswer && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-blue-500/30 text-slate-200 leading-relaxed">
              <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs border-b border-slate-800 pb-2 mb-2">
                <span>FalkeAI</span>
              </div>
              <p className="whitespace-pre-wrap">{assistantAnswer}</p>
            </div>
          )}

          {/* Structured Output Setup */}
          {resultSetup && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-purple-500/50 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs border-b border-slate-800 pb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Structured Setup (Computed by Calculator Engine)</span>
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
