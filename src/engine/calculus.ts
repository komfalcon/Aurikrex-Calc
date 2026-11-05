// Aurikrex Calculus & Algebra Solver (FR-18, FR-19)
import { all, create } from 'mathjs';

const math = create(all);

/**
 * Numeric derivative at a point using central differences: f'(x) ≈ (f(x+h) - f(x-h)) / (2h)
 */
export function numericalDerivative(expr: string, variable: string, atVal: number): number {
  const h = 1e-6;
  const compiled = math.compile(expr);
  const fPlus = compiled.evaluate({ [variable]: atVal + h });
  const fMinus = compiled.evaluate({ [variable]: atVal - h });
  return (fPlus - fMinus) / (2 * h);
}

/**
 * Definite integral using Simpson's 1/3 Rule (adaptive / 1000 intervals)
 */
export function numericalDefiniteIntegral(expr: string, variable: string, a: number, b: number, intervals = 1000): number {
  if (a === b) return 0;
  if (a > b) return -numericalDefiniteIntegral(expr, variable, b, a, intervals);

  const compiled = math.compile(expr);
  const n = intervals % 2 === 0 ? intervals : intervals + 1;
  const h = (b - a) / n;

  let sum = compiled.evaluate({ [variable]: a }) + compiled.evaluate({ [variable]: b });

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    const y = compiled.evaluate({ [variable]: x });
    sum += i % 2 === 0 ? 2 * y : 4 * y;
  }

  return (h / 3) * sum;
}

/**
 * Numerical Summation: Σ f(n) from n = start to end
 */
export function numericalSummation(expr: string, variable: string, start: number, end: number): number {
  const compiled = math.compile(expr);
  let sum = 0;
  const s = Math.min(start, end);
  const e = Math.max(start, end);
  for (let n = s; n <= e; n++) {
    sum += compiled.evaluate({ [variable]: n });
  }
  return sum;
}

export interface EquationRoots {
  realRoots: number[];
  complexRoots: string[];
}

/**
 * Solve single-variable polynomial or expression: e.g. "x^2 - 5x + 6 = 0"
 */
export function solveEquation(equationStr: string, variable = 'x'): EquationRoots {
  // Normalize equation into form f(x) = 0
  let lhs = equationStr;
  let rhs = '0';
  if (equationStr.includes('=')) {
    const parts = equationStr.split('=');
    lhs = parts[0].trim();
    rhs = parts[1].trim() || '0';
  }

  // Check for quadratic ax^2 + bx + c = 0
  // Clean expression: lhs - (rhs)
  const fExpr = `(${lhs}) - (${rhs})`;

  // Try finding roots using scanning + Newton-Raphson
  const roots: number[] = [];
  const compiled = math.compile(fExpr);

  function evalF(x: number): number {
    try {
      return compiled.evaluate({ [variable]: x });
    } catch {
      return NaN;
    }
  }

  function evalDeriv(x: number): number {
    const h = 1e-5;
    return (evalF(x + h) - evalF(x - h)) / (2 * h);
  }

  // Scan across a range [-100, 100] with step 0.2
  const scanMin = -50;
  const scanMax = 50;
  const step = 0.25;

  let prevX = scanMin;
  let prevY = evalF(prevX);

  for (let x = scanMin + step; x <= scanMax; x += step) {
    const y = evalF(x);
    if (Math.abs(y) < 1e-9) {
      if (!roots.some(r => Math.abs(r - x) < 1e-4)) {
        roots.push(x);
      }
    } else if (prevY * y < 0) {
      // Sign change -> bracket root, refine with Newton-Raphson or Bisection
      let rootCandidate = (prevX + x) / 2;
      for (let iter = 0; iter < 30; iter++) {
        const fVal = evalF(rootCandidate);
        if (Math.abs(fVal) < 1e-9) break;
        const dfVal = evalDeriv(rootCandidate);
        if (Math.abs(dfVal) < 1e-12) break;
        rootCandidate -= fVal / dfVal;
      }
      if (!isNaN(rootCandidate) && !roots.some(r => Math.abs(r - rootCandidate) < 1e-4)) {
        roots.push(parseFloat(rootCandidate.toFixed(6)));
      }
    }
    prevX = x;
    prevY = y;
  }

  // Sort roots
  roots.sort((a, b) => a - b);

  return {
    realRoots: roots,
    complexRoots: roots.length === 0 ? ['Complex or no real roots found in range'] : [],
  };
}
