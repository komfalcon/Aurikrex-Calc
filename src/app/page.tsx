'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Tape } from '../components/Tape';
import { InputLine } from '../components/InputLine';
import { SuggestionStrip } from '../components/SuggestionStrip';
import { UnitRow } from '../components/UnitRow';
import { FunctionPanel } from '../components/FunctionPanel';
import { NumberKeypad } from '../components/NumberKeypad';
import { ToolboxModal } from '../components/ToolboxModal';
import { FormulaBankModal } from '../components/FormulaBankModal';
import { ConstantsModal } from '../components/ConstantsModal';
import { ChemModal } from '../components/ChemModal';
import { StepsModal } from '../components/StepsModal';
import { engine } from '../engine';
import { AngleMode, EvaluationResult, StepItem } from '../engine/types';
import { db, initStoragePersistence, StoredTapeRow } from '../db';
import { PhysicalConstant } from '../engine/constants';

export default function AurikrexCalcApp() {
  // Input line & Caret state
  const [expression, setExpression] = useState<string>('');
  const [cursorPos, setCursorPos] = useState<number>(0);
  const [inputError, setInputError] = useState<string | null>(null);

  // Modifiers state
  const [shiftActive, setShiftActive] = useState<boolean>(false);
  const [shiftLocked, setShiftLocked] = useState<boolean>(false);
  const [alphaActive, setAlphaActive] = useState<boolean>(false);
  const [invActive, setInvActive] = useState<boolean>(false);
  const [hypActive, setHypActive] = useState<boolean>(false);
  const lastShiftTapRef = useRef<number>(0);

  // Angle Mode ('DEG' | 'RAD')
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');

  // Tape history and variables
  const [tapeRows, setTapeRows] = useState<StoredTapeRow[]>([]);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [lastResult, setLastResult] = useState<EvaluationResult | null>(null);

  // Unit Row category index
  const [unitCategoryIndex, setUnitCategoryIndex] = useState<number>(0);

  // Modals state
  const [toolboxOpen, setToolboxOpen] = useState<boolean>(false);
  const [formulaBankOpen, setFormulaBankOpen] = useState<boolean>(false);
  const [constantsOpen, setConstantsOpen] = useState<boolean>(false);
  const [chemOpen, setChemOpen] = useState<boolean>(false);
  const [stepsModalOpen, setStepsModalOpen] = useState<boolean>(false);
  const [currentSteps, setCurrentSteps] = useState<{ expr: string; res: string; steps?: StepItem[] }>({
    expr: '',
    res: '',
  });

  // 1. Initial Load: Dexie DB, persistent storage & Service Worker
  useEffect(() => {
    initStoragePersistence();

    // Register PWA Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('[Aurikrex PWA] Service Worker registered:', reg.scope))
        .catch((err) => console.warn('[Aurikrex PWA] Service Worker registration failed:', err));
    }

    // Load initial settings and tape from Dexie
    const loadState = async () => {
      try {
        const savedSettings = await db.settings.get('user-settings');
        if (savedSettings) {
          setAngleMode(savedSettings.angleMode);
        }

        const savedRows = await db.tape.orderBy('createdAt').toArray();
        if (savedRows && savedRows.length > 0) {
          setTapeRows(savedRows);
          const last = savedRows[savedRows.length - 1];
          if (last.numericValue !== null) {
            setLastResult({
              value: last.value,
              numericValue: last.numericValue,
              unit: last.unit,
              forms: {
                ...last.forms,
                sigFigs: (n: number) => parseFloat(last.numericValue!.toPrecision(n)).toString(),
              },
              error: last.error,
            });
          }
        }

        const savedVars = await db.variables.toArray();
        const varsObj: Record<string, any> = {};
        savedVars.forEach((v) => {
          varsObj[v.name] = v.unit ? { value: v.value, unit: v.unit } : v.value;
        });
        setVariables(varsObj);
      } catch (e) {
        console.error('[Aurikrex Storage] Load error:', e);
      }
    };

    loadState();
  }, []);

  // 2. Consume modifier helper
  const consumeModifiers = () => {
    if (!shiftLocked) setShiftActive(false);
    setAlphaActive(false);
    setInvActive(false);
    setHypActive(false);
  };

  // 3. Modifier triggers
  const handleToggleShift = () => {
    const now = Date.now();
    if (now - lastShiftTapRef.current < 350) {
      // Double tap -> Toggle lock
      setShiftLocked(!shiftLocked);
      setShiftActive(!shiftLocked);
    } else {
      if (shiftLocked) {
        setShiftLocked(false);
        setShiftActive(false);
      } else {
        setShiftActive(!shiftActive);
      }
    }
    lastShiftTapRef.current = now;
  };

  const handleToggleAlpha = () => setAlphaActive(!alphaActive);
  const handleToggleInv = () => setInvActive(!invActive);
  const handleToggleHyp = () => setHypActive(!hypActive);

  // 4. Token insertion into expression at cursor
  const handleInsert = (token: string) => {
    setInputError(null);
    const before = expression.slice(0, cursorPos);
    const after = expression.slice(cursorPos);
    const newExpr = before + token + after;
    setExpression(newExpr);
    setCursorPos(before.length + token.length);
    consumeModifiers();
  };

  const handleBackspace = () => {
    setInputError(null);
    if (cursorPos === 0) return;
    const before = expression.slice(0, cursorPos - 1);
    const after = expression.slice(cursorPos);
    setExpression(before + after);
    setCursorPos(cursorPos - 1);
  };

  const handleClear = () => {
    setExpression('');
    setCursorPos(0);
    setInputError(null);
    setActiveRowId(null);
    consumeModifiers();
  };

  const handleTogglePlusMinus = () => {
    if (!expression) {
      handleInsert('-');
      return;
    }
    if (expression.startsWith('-')) {
      setExpression(expression.slice(1));
      setCursorPos(Math.max(0, cursorPos - 1));
    } else {
      setExpression('-' + expression);
      setCursorPos(cursorPos + 1);
    }
  };

  // 5. Evaluate expression & update Live Tape
  const handleEvaluate = async () => {
    if (!expression.trim()) return;

    // Build context
    const lastAns = lastResult?.numericValue ?? 0;
    const ctx = {
      angleMode,
      variables: { ...variables },
      ans: lastAns,
    };

    const res = engine.evaluate({ input: expression, context: ctx });

    if (res.error) {
      setInputError(res.error);
    } else {
      setInputError(null);
    }

    setLastResult(res);
    consumeModifiers();

    const timestamp = Date.now();
    const rowId = activeRowId || `row_${timestamp}_${Math.random().toString(36).substring(2, 7)}`;

    const newRow: StoredTapeRow = {
      id: rowId,
      expression,
      value: res.value !== null ? String(res.value) : null,
      numericValue: res.numericValue,
      unit: res.unit,
      error: res.error,
      forms: {
        decimal: res.forms.decimal,
        fraction: res.forms.fraction,
        standardForm: res.forms.standardForm,
        engineering: res.forms.engineering,
      },
      dependsOn: [],
      createdAt: activeRowId
        ? tapeRows.find((r) => r.id === activeRowId)?.createdAt || timestamp
        : timestamp,
      updatedAt: timestamp,
    };

    // Update in-memory tape rows
    let updatedRows: StoredTapeRow[];
    if (activeRowId) {
      // Editing existing row: update it and recalculate dependents (FR-8)
      updatedRows = tapeRows.map((r) => (r.id === activeRowId ? newRow : r));
      setActiveRowId(null);
    } else {
      // Append new row
      updatedRows = [...tapeRows, newRow];
    }

    setTapeRows(updatedRows);

    // Persist to Dexie
    try {
      await db.tape.put(newRow);
      // Persist any updated variables
      if (ctx.variables) {
        setVariables(ctx.variables);
        for (const [k, v] of Object.entries(ctx.variables)) {
          if (v !== undefined) {
            await db.variables.put({
              name: k,
              value: typeof v === 'object' ? v.value : v,
              unit: typeof v === 'object' ? v.unit : null,
              updatedAt: timestamp,
            });
          }
        }
      }
    } catch (e) {
      console.warn('[Aurikrex Storage] Save failed:', e);
    }
  };

  // 6. Tape row selection for in-place editing (FR-7)
  const handleSelectTapeRow = (row: StoredTapeRow) => {
    setActiveRowId(row.id);
    setExpression(row.expression);
    setCursorPos(row.expression.length);
    setInputError(row.error);
  };

  // 7. Clear entire tape
  const handleClearTape = async () => {
    setTapeRows([]);
    setActiveRowId(null);
    setLastResult(null);
    try {
      await db.tape.clear();
    } catch {}
  };

  // 8. Toggle Angle Mode DEG / RAD
  const handleToggleAngleMode = async () => {
    const nextMode: AngleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    setAngleMode(nextMode);
    try {
      await db.settings.put({
        id: 'user-settings',
        angleMode: nextMode,
        resultForm: 'decimal',
        sigFigs: 12,
        lastCategory: 'Length',
      });
    } catch {}
  };

  // 9. Send from formulas/chemistry to tape
  const handleSendToTape = (expr: string, resStr: string) => {
    setExpression(expr);
    setCursorPos(expr.length);
    handleEvaluate();
  };

  return (
    <main className="h-[100dvh] w-full max-w-md mx-auto flex flex-col justify-between overflow-hidden bg-gradient-to-b from-aurikrex-bg to-aurikrex-bgDark shadow-2xl relative p-safe">
      {/* 1. Header (44px) */}
      <Header
        shiftActive={shiftActive}
        shiftLocked={shiftLocked}
        alphaActive={alphaActive}
        invActive={invActive}
        hypActive={hypActive}
        angleMode={angleMode}
        onToggleAngleMode={handleToggleAngleMode}
        onOpenToolbox={() => setToolboxOpen(true)}
      />

      {/* 2. Tape (flex, scrolls inside, bottom-aligned) */}
      <Tape
        rows={tapeRows}
        activeRowId={activeRowId}
        onSelectRow={handleSelectTapeRow}
        onClearTape={handleClearTape}
      />

      {/* 3. Input Line (48px, mono, blue underline, custom caret) */}
      <InputLine
        value={expression}
        cursorPosition={cursorPos}
        onSetCursorPosition={(pos) => setCursorPos(pos)}
        error={inputError}
      />

      {/* 4. Suggestion Strip (30px or 0, only when last row is a result) */}
      <SuggestionStrip
        lastResult={lastResult}
        onApplyForm={(form) => {
          setExpression(form);
          setCursorPos(form.length);
        }}
        onShowSteps={() => {
          if (lastResult) {
            setCurrentSteps({
              expr: expression || 'Last Expression',
              res: lastResult.value !== null ? String(lastResult.value) : '',
              steps: lastResult.steps,
            });
            setStepsModalOpen(true);
          }
        }}
        onSolveForX={() => {
          const solveStr = `Solve(${expression || 'x^2 - 4 = 0'})`;
          setExpression(solveStr);
          setCursorPos(solveStr.length);
        }}
      />

      {/* 5. Unit Row (30px, cycles categories, unit chips) */}
      <UnitRow
        currentCategoryIndex={unitCategoryIndex}
        onCycleCategory={() => setUnitCategoryIndex((i) => (i + 1) % 6)}
        onSelectUnit={(u) => handleInsert(` ${u}`)}
      />

      {/* 6. Function Panel (flex ratio 3, 5 swipeable pages) */}
      <FunctionPanel
        shiftActive={shiftActive}
        shiftLocked={shiftLocked}
        alphaActive={alphaActive}
        invActive={invActive}
        hypActive={hypActive}
        onToggleShift={handleToggleShift}
        onToggleAlpha={handleToggleAlpha}
        onToggleInv={handleToggleInv}
        onToggleHyp={handleToggleHyp}
        onInsert={handleInsert}
        onOpenConstants={() => setConstantsOpen(true)}
        onOpenFormulaBank={() => setFormulaBankOpen(true)}
        onOpenChem={() => setChemOpen(true)}
        onOpenStats={() => setToolboxOpen(true)}
      />

      {/* 7. Number Keypad (flex ratio 4, = key solid blue with angled corner) */}
      <NumberKeypad
        shiftActive={shiftActive}
        onDigit={handleInsert}
        onOperator={handleInsert}
        onBackspace={handleBackspace}
        onClear={handleClear}
        onEvaluate={handleEvaluate}
        onTogglePlusMinus={handleTogglePlusMinus}
      />

      {/* Modals */}
      <ToolboxModal
        isOpen={toolboxOpen}
        onClose={() => setToolboxOpen(false)}
        angleMode={angleMode}
        onToggleAngleMode={handleToggleAngleMode}
        onClearTape={handleClearTape}
        onOpenFormulaBank={() => setFormulaBankOpen(true)}
        onOpenConstants={() => setConstantsOpen(true)}
        onOpenChem={() => setChemOpen(true)}
        onSendToTape={handleSendToTape}
      />

      <FormulaBankModal
        isOpen={formulaBankOpen}
        onClose={() => setFormulaBankOpen(false)}
        onSendToTape={handleSendToTape}
      />

      <ConstantsModal
        isOpen={constantsOpen}
        onClose={() => setConstantsOpen(false)}
        onSelectConstant={(c: PhysicalConstant) => handleInsert(c.expression)}
      />

      <ChemModal
        isOpen={chemOpen}
        onClose={() => setChemOpen(false)}
        onSendToTape={handleSendToTape}
      />

      <StepsModal
        isOpen={stepsModalOpen}
        onClose={() => setStepsModalOpen(false)}
        expression={currentSteps.expr}
        result={currentSteps.res}
        steps={currentSteps.steps}
      />
    </main>
  );
}
