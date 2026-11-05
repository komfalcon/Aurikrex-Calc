// Result formatting (PRD v2 Section 4A & 7)
import { ResponseForms } from './contract';

/**
 * Snap value within 1e-12 (relative) of zero or integer to clean value
 */
export function snapToClean(val: number): number {
  if (!Number.isFinite(val)) return val;
  if (Math.abs(val) < 1e-12) return 0;
  const nearest = Math.round(val);
  if (Math.abs(val - nearest) < 1e-12) return nearest;
  return val;
}

/**
 * Convert number to fraction string using continued fractions algorithm
 */
export function toFraction(val: number, maxDenominator = 10000, tolerance = 1e-9): string | null {
  if (!Number.isFinite(val) || Math.abs(val) > 1e12) return null;
  const snapped = snapToClean(val);
  if (Math.abs(snapped - Math.round(snapped)) < tolerance) {
    return null; // Already an integer
  }

  const sign = snapped < 0 ? -1 : 1;
  let x = Math.abs(snapped);

  let h1 = 1, h2 = 0;
  let k1 = 0, k2 = 1;
  let b = x;

  for (let i = 0; i < 20; i++) {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;

    if (k1 > maxDenominator) break;

    const approx = h1 / k1;
    if (Math.abs(x - approx) < tolerance) {
      const num = sign * h1;
      return `${num}/${k1}`;
    }

    const diff = b - a;
    if (diff < 1e-12) break;
    b = 1 / diff;
  }

  return null;
}

/**
 * Standard form scientific notation (e.g. "2.94e1" in contract, "2.94 × 10¹" for UI)
 */
export function toStandardForm(val: number, digits = 6): string {
  if (!Number.isFinite(val)) return String(val);
  const snapped = snapToClean(val);
  if (snapped === 0) return '0';

  const expStr = snapped.toExponential(digits - 1);
  const [mantissa, exp] = expStr.split('e');
  const expNum = parseInt(exp, 10);
  
  if (expNum === 0) {
    return parseFloat(mantissa).toString();
  }

  return `${parseFloat(mantissa).toString()}e${expNum}`;
}

/**
 * UI standard form with unicode superscripts
 */
export function toStandardFormUI(val: number, digits = 6): string {
  if (!Number.isFinite(val)) return String(val);
  const snapped = snapToClean(val);
  if (snapped === 0) return '0';

  const expStr = snapped.toExponential(digits - 1);
  const [mantissa, exp] = expStr.split('e');
  const expNum = parseInt(exp, 10);
  if (expNum === 0) return parseFloat(mantissa).toString();

  const superscriptMap: Record<string, string> = {
    '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³',
    '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };

  const expFormatted = expNum.toString().split('').map(c => superscriptMap[c] || c).join('');
  return `${parseFloat(mantissa).toString()} × 10${expFormatted}`;
}

/**
 * Format to specified number of significant figures, trimming trailing zeros
 */
export function toSigFigs(val: number, n = 12): string {
  if (!Number.isFinite(val)) return String(val);
  const snapped = snapToClean(val);
  if (snapped === 0) return '0';
  const prec = parseFloat(snapped.toPrecision(Math.max(1, Math.min(12, n))));
  return prec.toString();
}

/**
 * Create full ResponseForms matching Section 4A contract
 */
export function createResponseForms(val: number, sigFigsCount = 12): ResponseForms {
  const snapped = snapToClean(val);
  const decimalStr = toSigFigs(snapped, sigFigsCount);

  return {
    decimal: decimalStr,
    fraction: toFraction(snapped),
    standard: toStandardForm(snapped),
    sig_figs: decimalStr,
  };
}
