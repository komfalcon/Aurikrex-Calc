'use client';

import React, { useState } from 'react';
import { AngleMode } from '../engine/types';
import { exportDatabaseToJSON, importDatabaseFromJSON } from '../db';
import { calculateCGPA, calculateJAMBAggregate, CourseGrade } from '../engine/academic';
import { calculateStats, calculateLinearRegression } from '../engine/statistics';
import {
  X,
  BookOpen,
  Atom,
  FlaskConical,
  GraduationCap,
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
  const [activeSection, setActiveSection] = useState<'main' | 'academic' | 'stats'>('main');
  const [backupStatus, setBackupStatus] = useState<string | null>(null);

  // Academic CGPA state
  const [cgpaCourses, setCgpaCourses] = useState<CourseGrade[]>([
    { courseCode: 'CHM101', creditUnits: 3, grade: 'A' },
    { courseCode: 'PHY101', creditUnits: 3, grade: 'A' },
    { courseCode: 'MTH101', creditUnits: 3, grade: 'B' },
  ]);
  const [cgpaResult, setCgpaResult] = useState<any>(null);

  // JAMB Aggregate state
  const [utmeScore, setUtmeScore] = useState<number>(310);
  const [olevelGrades, setOlevelGrades] = useState<any>(['A1', 'A1', 'B2', 'B3', 'A1']);
  const [jambResult, setJambResult] = useState<any>(null);

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

  const computeCGPA = () => {
    try {
      const res = calculateCGPA(cgpaCourses);
      setCgpaResult(res);
    } catch {}
  };

  const computeJAMB = () => {
    try {
      const res = calculateJAMBAggregate({ utmeScore, olevelGrades });
      setJambResult(res);
    } catch {}
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
              {activeSection === 'academic'
                ? 'Academic Tools'
                : activeSection === 'stats'
                ? 'Statistics'
                : 'Toolbox & Settings'}
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
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Formula Bank</span>
                  <span className="text-[10px] text-slate-400">40+ Science equations with working</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenConstants();
                  }}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <Atom className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Constants</span>
                  <span className="text-[10px] text-slate-400">g, c, h, N_A, R, k_B with SI units</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenChem();
                  }}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <FlaskConical className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Chemistry</span>
                  <span className="text-[10px] text-slate-400">Molar mass & Periodic table</span>
                </button>

                <button
                  onClick={() => setActiveSection('academic')}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all group"
                >
                  <GraduationCap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Academic Checks</span>
                  <span className="text-[10px] text-slate-400">CGPA (5.0 scale) & JAMB aggregate</span>
                </button>

                <button
                  onClick={() => setActiveSection('stats')}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 flex flex-col gap-1.5 text-left transition-all col-span-2 group"
                >
                  <BarChart2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-100 text-xs">Statistics & Linear Regression</span>
                  <span className="text-[10px] text-slate-400">Mean, median, σ, gradient and correlation r</span>
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

          {activeSection === 'academic' && (
            <div className="space-y-4">
              {/* CGPA Calculator */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <span className="font-bold text-slate-200 text-xs block">CGPA Calculator (5.0 Scale)</span>
                <div className="space-y-2">
                  {cgpaCourses.map((c, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={c.courseCode}
                        onChange={(e) => {
                          const updated = [...cgpaCourses];
                          updated[i].courseCode = e.target.value;
                          setCgpaCourses(updated);
                        }}
                        className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
                      />
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={c.creditUnits}
                        onChange={(e) => {
                          const updated = [...cgpaCourses];
                          updated[i].creditUnits = parseInt(e.target.value) || 1;
                          setCgpaCourses(updated);
                        }}
                        className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono text-center"
                      />
                      <select
                        value={c.grade}
                        onChange={(e) => {
                          const updated = [...cgpaCourses];
                          updated[i].grade = e.target.value as any;
                          setCgpaCourses(updated);
                        }}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
                      >
                        {['A', 'B', 'C', 'D', 'E', 'F'].map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setCgpaCourses([
                        ...cgpaCourses,
                        { courseCode: `CRS${cgpaCourses.length + 1}`, creditUnits: 3, grade: 'A' },
                      ])
                    }
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                  >
                    + Add Course
                  </button>
                  <button
                    onClick={computeCGPA}
                    className="flex-1 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
                  >
                    Compute CGPA
                  </button>
                </div>

                {cgpaResult && (
                  <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center border border-blue-500/30">
                    <div>
                      <div className="text-[10px] text-slate-400">Cumulative GPA</div>
                      <div className="font-mono text-xl font-bold text-emerald-400">{cgpaResult.cgpa} / 5.0</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Class of Degree</div>
                      <div className="font-semibold text-slate-200">{cgpaResult.classOfDegree}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* JAMB Aggregate */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <span className="font-bold text-slate-200 text-xs block">JAMB Aggregate Score (UTME + O'Level)</span>
                <div className="flex gap-2 items-center">
                  <label className="text-slate-400">UTME Score (out of 400):</label>
                  <input
                    type="number"
                    value={utmeScore}
                    onChange={(e) => setUtmeScore(parseInt(e.target.value) || 0)}
                    className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono text-center"
                  />
                </div>

                <button
                  onClick={computeJAMB}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
                >
                  Calculate Aggregate
                </button>

                {jambResult && (
                  <div className="p-3 bg-slate-900 rounded-lg space-y-1 border border-blue-500/30">
                    <div className="flex justify-between">
                      <span className="text-slate-400">UTME (50%):</span>
                      <span className="font-mono font-bold text-slate-200">{jambResult.utmeComponent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">O'Level (50%):</span>
                      <span className="font-mono font-bold text-slate-200">{jambResult.olevelComponent}%</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-1">
                      <span className="font-bold text-blue-400">Total Aggregate:</span>
                      <span className="font-mono text-lg font-bold text-emerald-400">
                        {jambResult.totalAggregate}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'stats' && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
              <span className="font-bold text-slate-200 text-xs block">Data Set Analysis</span>
              <div>
                <label className="text-slate-400 block mb-1">Enter values separated by commas:</label>
                <input
                  type="text"
                  value={statsDataInput}
                  onChange={(e) => setStatsDataInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-100 font-mono"
                />
              </div>

              <button
                onClick={computeStats}
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded"
              >
                Compute Statistics
              </button>

              {statsResult && (
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-900 rounded-lg font-mono text-slate-300">
                  <div>Count (n): <span className="text-blue-400 font-bold">{statsResult.n}</span></div>
                  <div>Mean (x̄): <span className="text-emerald-400 font-bold">{statsResult.mean.toFixed(4)}</span></div>
                  <div>Median: <span className="text-emerald-400 font-bold">{statsResult.median}</span></div>
                  <div>Std Dev (σ): <span className="text-purple-400 font-bold">{statsResult.stdDev.toFixed(4)}</span></div>
                  <div>Variance: <span className="text-slate-200 font-bold">{statsResult.variance.toFixed(4)}</span></div>
                  <div>Sum (Σx): <span className="text-slate-200 font-bold">{statsResult.sum}</span></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
