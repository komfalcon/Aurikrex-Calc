// Result formatting: decimal, fraction, standard form, engineering, sig figs
import { ResultForms } from './types';

/**
 * Convert number to fraction string using continued fractions algorithm
 */
export function toFraction(val: number, maxDenominator = 10000, tolerance = 1e-9): string | null {
  if (!Number.isFinite(val) || Math.abs(val) > 1e12) return null;
  if (Math.abs(val - Math.round(val)) < tolerance) {
    return null; // Already an integer
  }

  const sign = val < 0 ? -1 : 1;
  let x = Math.abs(val);

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

  // Fallback check
  if (k1 <= maxDenominator && Math.abs(x - h1 / k1) < 1e-6) {
    return `${sign * h1}/${k1}`;
  }

  return null;
}

/**
 * Format to standard form (scientific notation with unicode exponents): e.g. 2.94 × 10¹
 */
export function toStandardForm(val: number, digits = 6): string {
  if (!Number.isFinite(val)) return String(val);
  if (val === 0) return '0';

  const expStr = val.toExponential(digits - 1);
  const [mantissa, exp] = expStr.split('e');
  const expNum = parseInt(exp, 10);
  
  if (expNum === 0) {
    return parseFloat(mantissa).toString();
  }

  const superscriptMap: Record<string, string> = {
    '-': '⁻',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
  };

  const expFormatted = expNum.toString().split('').map(c => superscriptMap[c] || c).join('');
  const cleanMantissa = parseFloat(mantissa).toString();
  return `${cleanMantissa} × 10${expFormatted}`;
}

/**
 * Format to engineering notation (exponent multiple of 3)
 */
export function toEngineering(val: number, sigFigs = 5): string {
  if (!Number.isFinite(val) || val === 0) return String(val);

  const exp = Math.floor(Math.log10(Math.abs(val)));
  const engExp = Math.floor(exp / 3) * 3;
  const mantissa = val / Math.pow(10, engExp);
  
  const precision = Math.max(1, sigFigs - (Math.floor(Math.log10(Math.abs(mantissa))) + 1));
  const cleanMantissa = parseFloat(mantissa.toFixed(precision));

  if (engExp === 0) return cleanMantissa.toString();

  const superscriptMap: Record<string, string> = {
    '-': '⁻',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
  };
  const expFormatted = engExp.toString().split('').map(c => superscriptMap[c] || c).join('');
  return `${cleanMantissa} × 10${expFormatted}`;
}

/**
 * Format to specified number of significant figures
 */
export function toSigFigs(val: number, n: number): string {
  if (!Number.isFinite(val)) return String(val);
  if (val === 0) return '0';
  return parseFloat(val.toPrecision(Math.max(1, Math.min(12, n)))).toString();
}

/**
 * Create full ResultForms object for a number
 */
export function createResultForms(val: number): ResultForms {
  // Format decimal up to 12 significant figures, avoiding float imprecision like 0.30000000000000004
  let decimalStr: string;
  if (!Number.isFinite(val)) {
    decimalStr = String(val);
  } else {
    // Round to 12 digits
    const prec = parseFloat(val.toPrecision(12));
    decimalStr = prec.toString();
  }

  return {
    decimal: decimalStr,
    fraction: toFraction(val),
    standardForm: toStandardForm(val),
    engineering: toEngineering(val),
    sigFigs: (n: number) => toSigFigs(val, n),
  };
}
