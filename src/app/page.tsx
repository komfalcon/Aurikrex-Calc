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
import { AskModal } from '../components/AskModal';
import { engine } from '../engine';
import { AngleUnit, EvaluateResponse } from '../engine/contract';
import { db, initStoragePersistence, StoredTapeRow } from '../db';
import { PhysicalConstant } from '../engine/constants';
import { toStandardFormUI } from '../engine/formatting';

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

  // Angle Mode ('deg' | 'rad')
  const [angleMode, setAngleMode] = useState<AngleUnit>('deg');

  // Tape history and variables
  const [tapeRows, setTapeRows] = useState<StoredTapeRow[]>([]);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [lastResponse, setLastResponse] = useState<EvaluateResponse | null>(null);

  // Unit Row category index
  const [unitCategoryIndex, setUnitCategoryIndex] = useState<number>(0);

  // Modals state
  const [toolboxOpen, setToolboxOpen] = useState<boolean>(false);
  const [formulaBankOpen, setFormulaBankOpen] = useState<boolean>(false);
  const [constantsOpen, setConstantsOpen] = useState<boolean>(false);
  const [chemOpen, setChemOpen] = useState<boolean>(false);
  const [stepsModalOpen, setStepsModalOpen] = useState<boolean>(false);
  const [askModalOpen, setAskModalOpen] = useState<boolean>(false);
  const [currentSteps, setCurrentSteps] = useState<{ expr: string; res: string; steps?: string[] }>({
    expr: '',
    res: '',
  });

  // 1. Initial Load: Dexie DB, persistent storage & Service Worker
  useEffect(() => {
    initStoragePersistence();

    // Register PWA Service Worker (precaching shell, fonts, wasm)
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
          setAngleMode(savedSettings.angleMode.toLowerCase() as AngleUnit);
        }

        const savedRows = await db.tape.orderBy('createdAt').toArray();
        if (savedRows && savedRows.length > 0) {
          setTapeRows(savedRows);
          const last = savedRows[savedRows.length - 1];
          if (last.numericValue !== null) {
            setLastResponse({
              ok: !last.error,
              value: last.numericValue,
              unit: last.unit,
              dimension: [0, 0, 0, 0, 0, 0, 0],
              forms: {
                decimal: last.forms.decimal,
                fraction: last.forms.fraction,
                standard: last.forms.standardForm,
                sig_figs: last.forms.decimal,
              },
              steps: [],
              warnings: [],
              error: last.error ? { code: 'SYNTAX', message: last.error } : null,
            });
          }
        }

        const savedVars = await db.variables.toArray();
        const varsObj: Record<string, any> = {};
        savedVars.forEach((v) => {
          varsObj[v.name] = v.unit ? { value: v.value, unit: v.unit } : { value: v.value };
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

  // 5. Evaluate expression through the Section 4A Engine JSON contract
  const handleEvaluate = async () => {
    if (!expression.trim()) return;

    // Check for variable assignment: e.g. "A = 9.8" or "X = 5 m"
    const assignMatch = expression.match(/^([A-Za-z])\s*=\s*(.+)$/);
    let targetVarName: string | null = null;
    let evalInput = expression;

    if (assignMatch) {
      const varName = assignMatch[1].toUpperCase();
      const rhs = assignMatch[2].trim();
      const isSimpleVar = ['A', 'B', 'C', 'X', 'Y', 'M'].includes(varName);
      if (isSimpleVar && !rhs.includes('x') && !rhs.includes('X') && rhs !== '0') {
        targetVarName = varName;
        evalInput = rhs;
      }
    }

    const lastAns = (lastResponse && typeof lastResponse.value === 'number')
      ? { value: lastResponse.value }
      : undefined;
    const req = {
      input: evalInput,
      context: {
        angle: angleMode,
        variables,
        ans: lastAns,
      },
    };

    const res = engine.evaluateParsed(req);

    if (res.error) {
      setInputError(res.error.message);
    } else {
      setInputError(null);
    }

    setLastResponse(res);
    consumeModifiers();

    const timestamp = Date.now();
    const rowId = activeRowId || `row_${timestamp}_${Math.random().toString(36).substring(2, 7)}`;

    const newRow: StoredTapeRow = {
      id: rowId,
      expression,
      value: res.value !== null ? String(res.forms.decimal) : null,
      numericValue: res.value,
      unit: res.unit,
      error: res.error ? res.error.message : null,
      forms: {
        decimal: res.forms.decimal,
        fraction: res.forms.fraction,
        standardForm: res.forms.standard,
        engineering: res.forms.standard,
      },
      dependsOn: [],
      createdAt: activeRowId
        ? tapeRows.find((r) => r.id === activeRowId)?.createdAt || timestamp
        : timestamp,
      updatedAt: timestamp,
    };

    let updatedRows: StoredTapeRow[];
    if (activeRowId) {
      updatedRows = tapeRows.map((r) => (r.id === activeRowId ? newRow : r));
      setActiveRowId(null);
    } else {
      updatedRows = [...tapeRows, newRow];
    }

    setTapeRows(updatedRows);

    // Persist to Dexie
    try {
      await db.tape.put(newRow);
      if (targetVarName && res.value !== null) {
        const updatedVars = {
          ...variables,
          [targetVarName]: { value: res.value, unit: res.unit },
        };
        setVariables(updatedVars);
        await db.variables.put({
          name: targetVarName,
          value: res.value,
          unit: res.unit,
          updatedAt: timestamp,
        });
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
    setLastResponse(null);
    try {
      await db.tape.clear();
    } catch {}
  };

  // 8. Toggle Angle Mode DEG / RAD
  const handleToggleAngleMode = async () => {
    const nextMode: AngleUnit = angleMode === 'deg' ? 'rad' : 'deg';
    setAngleMode(nextMode);
    try {
      await db.settings.put({
        id: 'user-settings',
        angleMode: nextMode.toUpperCase() as any,
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
        onOpenAsk={() => setAskModalOpen(true)}
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
        lastResult={
          lastResponse && lastResponse.value !== null
            ? {
                value: lastResponse.forms.decimal,
                numericValue: lastResponse.value,
                forms: {
                  decimal: lastResponse.forms.decimal,
                  fraction: lastResponse.forms.fraction,
                  standardForm: toStandardFormUI(lastResponse.value),
                  engineering: toStandardFormUI(lastResponse.value),
                  sigFigs: (n: number) => parseFloat(lastResponse.value!.toPrecision(n)).toString(),
                },
              }
            : null
        }
        onApplyForm={(form) => {
          setExpression(form);
          setCursorPos(form.length);
        }}
        onShowSteps={() => {
          if (lastResponse) {
            setCurrentSteps({
              expr: expression || 'Last Expression',
              res: lastResponse.value !== null ? `${lastResponse.forms.decimal} ${lastResponse.unit || ''}` : '',
              steps: lastResponse.steps,
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
        angleMode={angleMode.toUpperCase() as any}
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
        steps={currentSteps.steps?.map((s) => ({ type: 'intermediate', text: s }))}
      />

      <AskModal
        isOpen={askModalOpen}
        onClose={() => setAskModalOpen(false)}
        onSendToTape={handleSendToTape}
      />
    </main>
  );
}
