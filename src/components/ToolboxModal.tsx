'use client';

import React, { useState } from 'react';
import { AngleMode } from '../engine/types';
import { exportDatabaseToJSON, importDatabaseFromJSON } from '../db';
import { calculateStats, calculateLinearRegression } from '../engine/statistics';
import {
  X,
  BookOpen,
  Atom,
  FlaskConical,
  BarChart2,
  Download,
  Upload,
  Trash2,
  Check,
} from 'lucide-react';

interface ToolboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  angleMode: AngleMode;
  onToggleAngleMode: () => void;
  onClearTape: () => void;
  onOpenFormulaBank: () => void;
  onOpenConstants: () => void;
  onOpenChem: () => void;
  onSendToTape: (expr: string, res: string) => void;
}

export const ToolboxModal: React.FC<ToolboxModalProps> = ({
  isOpen,
  onClose,
  angleMode,
  onToggleAngleMode,
  onClearTape,
  onOpenFormulaBank,
  onOpenConstants,
  onOpenChem,
  onSendToTape,
}) => {
  const [activeSection, setActiveSection] = useState<'main' | 'stats'>('main');
  const [backupStatus, setBackupStatus] = useState<string | null>(null);

  // Stats state
  const [statsDataInput, setStatsDataInput] = useState<string>('12, 15, 18, 22, 25, 28, 30');
  const [statsResult, setStatsResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleExportBackup = async () => {
    try {
      const json = await exportDatabaseToJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aurikrex-calc-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupStatus('Backup downloaded successfully!');
      setTimeout(() => setBackupStatus(null), 3000);
    } catch (e: any) {
      setBackupStatus(`Export failed: ${e.message}`);
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const text = ev.target?.result as string;
        await importDatabaseFromJSON(text);
        setBackupStatus('Backup restored successfully!');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err: any) {
        setBackupStatus(`Import failed: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const computeStats = () => {
    try {
      const numbers = statsDataInput
        .split(/[,\s]+/)
        .map((s) => parseFloat(s.trim()))
        .filter((n) => !isNaN(n));
      const res = calculateStats(numbers);
      setStatsResult(res);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl flex flex-col max-h-[88vh] shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h3 className="font-bold text-slate-100 text-sm font-lexend">
              {activeSection === 'stats' ? 'Statistics & Regression' : 'Toolbox & Settings'}
            </h3>
          </div>
          <button
            onClick={() => {
              if (activeSection !== 'main') setActiveSection('main');
              else onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {activeSection === 'main' && (
            <>
              {/* Quick Launch Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onOpenFormulaBank();
                  }}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Formula Bank</span>
                  <span className="text-[10px] text-slate-400">Complete science formulas & solvers</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenConstants();
                  }}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <Atom className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Constants</span>
                  <span className="text-[10px] text-slate-400">Comprehensive SI physical constants</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenChem();
                  }}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <FlaskConical className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Chemistry</span>
                  <span className="text-[10px] text-slate-400">Molar mass & 118-Element Periodic Table</span>
                </button>

                <button
                  onClick={() => setActiveSection('stats')}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <BarChart2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Statistics</span>
                  <span className="text-[10px] text-slate-400">Mean, median, σ, gradient, r</span>
                </button>
              </div>

              {/* Data & Backup Section */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Tape Storage & Backups (Offline First)
                </span>

                {backupStatus && (
                  <div className="p-2 bg-blue-950/60 border border-blue-700/60 rounded-lg text-blue-300 text-[11px] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span>{backupStatus}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleExportBackup}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 font-medium flex items-center justify-center gap-1.5 text-slate-200 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Backup</span>
                  </button>

                  <label className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 font-medium flex items-center justify-center gap-1.5 text-slate-200 cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import Backup</span>
                    <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                  </label>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Clear all tape calculations?')) {
                      onClearTape();
                      onClose();
                    }
                  }}
                  className="w-full py-1.5 bg-red-950/40 hover:bg-red-900/50 text-red-400 border border-red-900/40 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Entire Tape History</span>
                </button>
              </div>
            </>
          )}

          {activeSection === 'stats' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <span className="font-bold text-slate-200 text-xs block">1-Variable Statistics</span>
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-[11px]">Enter comma-separated numbers:</label>
                  <textarea
                    rows={3}
                    value={statsDataInput}
                    onChange={(e) => setStatsDataInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={computeStats}
                  className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-all"
                >
                  Calculate Statistics
                </button>

                {statsResult && (
                  <div className="space-y-2 bg-slate-900 p-3 rounded-lg border border-purple-500/30">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Sample Size (n):</span>
                        <span className="font-mono font-bold text-purple-300">{statsResult.n}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Mean (x̄):</span>
                        <span className="font-mono font-bold text-purple-300">{statsResult.mean.toFixed(4)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Sample Std Dev (s):</span>
                        <span className="font-mono font-bold text-purple-300">{statsResult.sampleStdDev.toFixed(4)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Pop Std Dev (σ):</span>
                        <span className="font-mono font-bold text-purple-300">{statsResult.popStdDev.toFixed(4)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Median:</span>
                        <span className="font-mono font-bold text-purple-300">{statsResult.median.toFixed(4)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Sum (Σx):</span>
                        <span className="font-mono font-bold text-purple-300">{statsResult.sum.toFixed(4)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSendToTape(`mean(${statsResult.n} values)`, `${statsResult.mean.toFixed(4)}`);
                        onClose();
                      }}
                      className="w-full mt-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-center transition-all"
                    >
                      Send Mean to Tape
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
