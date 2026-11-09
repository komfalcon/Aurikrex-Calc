'use client';

import React, { useState } from 'react';
import { KeyButton } from './KeyButton';

interface FunctionPanelProps {
  shiftActive: boolean;
  shiftLocked: boolean;
  alphaActive: boolean;
  invActive: boolean;
  hypActive: boolean;
  onToggleShift: () => void;
  onToggleAlpha: () => void;
  onToggleInv: () => void;
  onToggleHyp: () => void;
  onInsert: (token: string) => void;
  onOpenConstants: () => void;
  onOpenFormulaBank: () => void;
  onOpenChem: () => void;
  onOpenStats: () => void;
}

export const FunctionPanel: React.FC<FunctionPanelProps> = ({
  shiftActive,
  shiftLocked,
  alphaActive,
  invActive,
  hypActive,
  onToggleShift,
  onToggleAlpha,
  onToggleInv,
  onToggleHyp,
  onInsert,
  onOpenConstants,
  onOpenFormulaBank,
  onOpenChem,
  onOpenStats,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Swipe / navigation between 5 function pages
  const handleTouchStart = (e: React.TouchEvent) => {
    (window as any).__touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = (window as any).__touchStartX;
    if (startX !== undefined) {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) {
        // Swipe Right -> Prev
        setCurrentPage((p) => Math.max(0, p - 1));
      } else if (diff < -50) {
        // Swipe Left -> Next
        setCurrentPage((p) => Math.min(4, p + 1));
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex-[3] flex flex-col justify-between px-3 py-2 bg-slate-950/20 select-none relative border-t border-slate-800/60"
    >
      <div className="flex-1 grid grid-rows-3 grid-cols-5 gap-2 min-h-0">
        {currentPage === 0 && (
          // Page 1: Core
          <>
            {/* Row 1: SHIFT, ALPHA, INV, HYP, Const */}
            <button
              onClick={onToggleShift}
              className={`aurikrex-key font-mono font-bold text-xs ${
                shiftActive || shiftLocked
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.4)]'
                  : 'bg-slate-800 text-cyan-400'
              }`}
            >
              <span>{shiftLocked ? 'SHIFT*' : 'SHIFT'}</span>
            </button>

            <button
              onClick={onToggleAlpha}
              className={`aurikrex-key font-mono font-bold text-xs ${
                alphaActive
                  ? 'bg-violet-950 text-violet-300 border border-violet-500 shadow-[0_0_8px_rgba(167,139,250,0.4)]'
                  : 'bg-slate-800 text-violet-400'
              }`}
            >
              <span>ALPHA</span>
            </button>

            <button
              onClick={onToggleInv}
              className={`aurikrex-key font-mono font-bold text-xs ${
                invActive
                  ? 'bg-amber-950 text-amber-300 border border-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  : 'bg-slate-800 text-amber-400'
              }`}
            >
              <span>INV</span>
            </button>

            <button
              onClick={onToggleHyp}
              className={`aurikrex-key font-mono font-bold text-xs ${
                hypActive
                  ? 'bg-pink-950 text-pink-300 border border-pink-500 shadow-[0_0_8px_rgba(244,114,182,0.4)]'
                  : 'bg-slate-800 text-pink-400'
              }`}
            >
              <span>HYP</span>
            </button>

            <button
              onClick={onOpenConstants}
              className="aurikrex-key bg-slate-800 text-blue-300 font-mono font-semibold text-xs border border-blue-500/30"
              title="Physical Constants Library"
            >
              <span>Const</span>
            </button>

            {/* Row 2: sin, cos, tan, (, ) */}
            <KeyButton
              label="sin"
              alternates={{ alpha: 'A', inv: 'sin⁻¹', hyp: 'sinh', invHyp: 'sinh⁻¹' }}
              shiftActive={shiftActive}
              alphaActive={alphaActive}
              invActive={invActive}
              hypActive={hypActive}
              action={() => {
                if (alphaActive) onInsert('A');
                else if (invActive && hypActive) onInsert('asinh(');
                else if (invActive) onInsert('asin(');
                else if (hypActive) onInsert('sinh(');
                else onInsert('sin(');
              }}
            />

            <KeyButton
              label="cos"
              alternates={{ alpha: 'B', inv: 'cos⁻¹', hyp: 'cosh', invHyp: 'cosh⁻¹' }}
              shiftActive={shiftActive}
              alphaActive={alphaActive}
              invActive={invActive}
              hypActive={hypActive}
              action={() => {
                if (alphaActive) onInsert('B');
                else if (invActive && hypActive) onInsert('acosh(');
                else if (invActive) onInsert('acos(');
                else if (hypActive) onInsert('cosh(');
                else onInsert('cos(');
              }}
            />

            <KeyButton
              label="tan"
              alternates={{ alpha: 'C', inv: 'tan⁻¹', hyp: 'tanh', invHyp: 'tanh⁻¹' }}
              shiftActive={shiftActive}
              alphaActive={alphaActive}
              invActive={invActive}
              hypActive={hypActive}
              action={() => {
                if (alphaActive) onInsert('C');
                else if (invActive && hypActive) onInsert('atanh(');
                else if (invActive) onInsert('atan(');
                else if (hypActive) onInsert('tanh(');
                else onInsert('tan(');
              }}
            />

            <KeyButton
              label="("
              alternates={{ shift: 'n!' }}
              shiftActive={shiftActive}
              action={() => (shiftActive ? onInsert('!') : onInsert('('))}
            />

            <KeyButton
              label=")"
              alternates={{ shift: '1/x' }}
              shiftActive={shiftActive}
              action={() => (shiftActive ? onInsert('^-1') : onInsert(')'))}
            />

            {/* Row 3: x², xʸ, √, ln, log */}
            <KeyButton
              label="x²"
              alternates={{ shift: 'x³', alpha: 'X' }}
              shiftActive={shiftActive}
              alphaActive={alphaActive}
              action={() => {
                if (alphaActive) onInsert('X');
                else if (shiftActive) onInsert('^3');
                else onInsert('^2');
              }}
            />

            <KeyButton
              label="xʸ"
              alternates={{ shift: 'ʸ√x', alpha: 'Y' }}
              shiftActive={shiftActive}
              alphaActive={alphaActive}
              action={() => {
                if (alphaActive) onInsert('Y');
                else if (shiftActive) onInsert('^(1/');
                else onInsert('^');
              }}
            />

            <KeyButton
              label="√"
              alternates={{ shift: '³√', alpha: 'M' }}
              shiftActive={shiftActive}
              alphaActive={alphaActive}
              action={() => {
                if (alphaActive) onInsert('M');
                else if (shiftActive) onInsert('³√(');
                else onInsert('√(');
              }}
            />

            <KeyButton
              label="ln"
              alternates={{ shift: 'eˣ' }}
              shiftActive={shiftActive}
              action={() => (shiftActive ? onInsert('e^') : onInsert('ln('))}
            />

            <KeyButton
              label="log"
              alternates={{ shift: '10ˣ' }}
              shiftActive={shiftActive}
              action={() => (shiftActive ? onInsert('10^') : onInsert('log('))}
            />
          </>
        )}

        {currentPage === 1 && (
          // Page 2: Algebra & Calculus
          <>
            {/* Row 1: Solve, d/dx, ∫dx, Σ, lim */}
            <KeyButton label="Solve" action={() => onInsert('Solve(')} tooltip="Equation Solver" />
            <KeyButton label="d/dx" action={() => onInsert('d/dx(x^2, 2)')} tooltip="Derivative at a point" />
            <KeyButton label="∫dx" action={() => onInsert('∫(x^2, 0, 1)')} tooltip="Definite Integral" />
            <KeyButton label="Σ" action={() => onInsert('sum(')} tooltip="Summation" />
            <KeyButton label="lim" action={() => onInsert('lim(')} tooltip="Limit" />

            {/* Row 2: |x|, mod, ⌊x⌋, ⌈x⌉, Rand */}
            <KeyButton label="|x|" action={() => onInsert('abs(')} />
            <KeyButton label="mod" action={() => onInsert(' % ')} />
            <KeyButton label="⌊x⌋" action={() => onInsert('floor(')} />
            <KeyButton label="⌈x⌉" action={() => onInsert('ceil(')} />
            <KeyButton label="Rand" action={() => onInsert('random()')} />

            {/* Row 3: Fac, Expd, Sub, Chk, Stp */}
            <KeyButton label="Fac" action={() => onInsert('factor(')} tooltip="Factorize" />
            <KeyButton label="Expd" action={() => onInsert('expand(')} tooltip="Expand" />
            <KeyButton label="Sub" action={() => onInsert('subst(')} tooltip="Substitute" />
            <KeyButton label="Chk" action={() => onInsert('==')} tooltip="Equate Check" />
            <KeyButton label="Stp" action={onOpenFormulaBank} tooltip="Formula Steps" />
          </>
        )}

        {currentPage === 2 && (
          // Page 3: Stats & Discrete
          <>
            {/* Row 1: nCr, nPr, x̄, σ, Σx */}
            <KeyButton label="nCr" action={() => onInsert('combinations(')} tooltip="Combinations" />
            <KeyButton label="nPr" action={() => onInsert('permutations(')} tooltip="Permutations" />
            <KeyButton label="x̄" action={onOpenStats} tooltip="Mean" />
            <KeyButton label="σ" action={onOpenStats} tooltip="Standard Deviation" />
            <KeyButton label="Σx" action={onOpenStats} tooltip="Sum of Data" />

            {/* Row 2: Reg, GCD, LCM, S⇔D, PF */}
            <KeyButton label="Reg" action={onOpenStats} tooltip="Linear Regression" />
            <KeyButton label="GCD" action={() => onInsert('gcd(')} tooltip="Greatest Common Divisor" />
            <KeyButton label="LCM" action={() => onInsert('lcm(')} tooltip="Lowest Common Multiple" />
            <KeyButton label="S⇔D" action={() => onInsert('fraction')} tooltip="Standard / Decimal" />
            <KeyButton label="PF" action={() => onInsert('primeFactors(')} tooltip="Prime Factors" />

            {/* Row 3: Tbl, Med, Mode, Var, Data */}
            <KeyButton label="Tbl" action={onOpenStats} tooltip="Data Table" />
            <KeyButton label="Med" action={onOpenStats} tooltip="Median" />
            <KeyButton label="Mode" action={onOpenStats} tooltip="Mode" />
            <KeyButton label="Var" action={onOpenStats} tooltip="Variance" />
            <KeyButton label="Data" action={onOpenStats} tooltip="Input Data Set" />
          </>
        )}

        {currentPage === 3 && (
          // Page 4: Vectors, Matrices, Complex
          <>
            {/* Row 1: dot, cross, |v|, det, inv */}
            <KeyButton label="dot" action={() => onInsert('dot(')} tooltip="Dot Product" />
            <KeyButton label="cross" action={() => onInsert('cross(')} tooltip="Cross Product" />
            <KeyButton label="|v|" action={() => onInsert('norm(')} tooltip="Vector Magnitude" />
            <KeyButton label="det" action={() => onInsert('det(')} tooltip="Matrix Determinant" />
            <KeyButton label="inv" action={() => onInsert('inv(')} tooltip="Matrix Inverse" />

            {/* Row 2: Mat, i, arg, conj, P→R */}
            <KeyButton label="Mat" action={() => onInsert('[[1, 0], [0, 1]]')} tooltip="Matrix" />
            <KeyButton label="i" action={() => onInsert('i')} tooltip="Imaginary Unit" />
            <KeyButton label="arg" action={() => onInsert('arg(')} tooltip="Complex Argument" />
            <KeyButton label="conj" action={() => onInsert('conj(')} tooltip="Complex Conjugate" />
            <KeyButton label="P→R" action={() => onInsert('toRect(')} tooltip="Polar to Rectangular" />

            {/* Row 3: Re, Im, v̂, tr, rank */}
            <KeyButton label="Re" action={() => onInsert('re(')} tooltip="Real Part" />
            <KeyButton label="Im" action={() => onInsert('im(')} tooltip="Imaginary Part" />
            <KeyButton label="v̂" action={() => onInsert('unitVector(')} tooltip="Unit Vector" />
            <KeyButton label="tr" action={() => onInsert('trace(')} tooltip="Matrix Trace" />
            <KeyButton label="rank" action={() => onInsert('rank(')} tooltip="Matrix Rank" />
          </>
        )}

        {currentPage === 4 && (
          // Page 5: Science (Chemistry, Physics, Biology)
          <>
            {/* Row 1: Mr, pH, mol, ΔT, H–W */}
            <KeyButton label="Mr" action={onOpenChem} tooltip="Molar Mass (Chemistry)" />
            <KeyButton label="pH" action={() => onInsert('-log10(')} tooltip="pH = -log10[H+]" />
            <KeyButton label="mol" action={() => onInsert('mol')} tooltip="Moles" />
            <KeyButton label="ΔT" action={() => onInsert('deltaT')} tooltip="Temperature Difference" />
            <KeyButton label="H–W" action={onOpenFormulaBank} tooltip="Hardy-Weinberg" />

            {/* Row 2: Mag, SI, Conc, Gas, Keq */}
            <KeyButton label="Mag" action={onOpenFormulaBank} tooltip="Magnification M = I / A" />
            <KeyButton label="SI" action={onOpenConstants} tooltip="SI Prefixes & Constants" />
            <KeyButton label="Conc" action={() => onInsert('mol/L')} tooltip="Concentration Molarity" />
            <KeyButton label="Gas" action={onOpenFormulaBank} tooltip="Ideal Gas Law PV=nRT" />
            <KeyButton label="Keq" action={() => onInsert('Keq')} tooltip="Equilibrium Constant" />

            {/* Row 3: Ar, %err, Q10, Ksp, Pt */}
            <KeyButton label="Ar" action={onOpenChem} tooltip="Relative Atomic Mass" />
            <KeyButton label="%err" action={() => onInsert('%')} tooltip="Percentage Uncertainty" />
            <KeyButton label="Q10" action={onOpenFormulaBank} tooltip="Temperature Coefficient" />
            <KeyButton label="Ksp" action={() => onInsert('Ksp')} tooltip="Solubility Product" />
            <KeyButton label="Pt" action={onOpenChem} tooltip="Periodic Table" />
          </>
        )}
      </div>

      {/* Pagination dots for 5 swipeable pages */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        {['Core', 'Algebra', 'Stats', 'Matrix', 'Science'].map((name, idx) => (
          <button
            key={name}
            onClick={() => setCurrentPage(idx)}
            className={`transition-all rounded-full ${
              currentPage === idx
                ? 'w-4 h-1.5 bg-blue-500 shadow-sm'
                : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-600'
            }`}
            title={`Page ${idx + 1}: ${name}`}
          />
        ))}
      </div>
    </div>
  );
};
