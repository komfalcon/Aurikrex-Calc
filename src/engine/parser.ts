// Aurikrex Input Normalization and Preprocessing
import { normalizeUnitTokens } from './units';

/**
 * Normalise calculator keypad input string into mathjs/calculus compatible syntax
 */
export function preprocessExpression(input: string, angleMode: 'DEG' | 'RAD' = 'DEG'): string {
  let expr = input.trim();
  if (!expr) return '';

  // Replace typographical symbols
  expr = expr.replace(/×/g, '*');
  expr = expr.replace(/÷/g, '/');
  expr = expr.replace(/−/g, '-');
  expr = expr.replace(/–/g, '-');
  expr = expr.replace(/•/g, '*');

  // Replace powers of 10: e.g. "×10^" or "x10^" or "×10ˣ" or "E"
  expr = expr.replace(/×10\^/g, '*10^');
  expr = expr.replace(/x10\^/gi, '*10^');
  expr = expr.replace(/×10ˣ/g, '*10^');
  expr = expr.replace(/×10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g, (_, exp) => {
    const unmap: Record<string, string> = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
    const num = exp.split('').map((c: string) => unmap[c] || c).join('');
    return `*10^(${num})`;
  });

  // Normalise unit superscripts
  expr = normalizeUnitTokens(expr);

  // Greek pi
  expr = expr.replace(/π/g, 'pi');

  // Implicit multiplication:
  // 1. Number directly before variable or function: 2pi -> 2*pi, 2x -> 2*x, 3sin(x) -> 3*sin(x), 2Ans -> 2*Ans
  // Use negative lookbehind (?<![a-zA-Z]) to prevent breaking names like log10(
  expr = expr.replace(/(?<![a-zA-Z0-9_])(\d+(\.\d+)?)(\s*)([a-zA-Zπ]|pi|Ans|\()/g, (m, num, _, space, after) => {
    return `${num}*${after}`;
  });

  // 2. Parentheses followed by number or paren: (2)(3) -> (2)*(3), (2)3 -> (2)*3
  expr = expr.replace(/\)(\s*)\(/g, ')*(');
  expr = expr.replace(/\)(\s*)(\d+(\.\d+)?)/g, ')*$2');
  expr = expr.replace(/\)(\s*)([a-zA-Zπ]|pi|Ans)/g, ')*$2');

  // Percentage: e.g. "50%" -> "(50/100)" or "50 * 0.01"
  expr = expr.replace(/(\d+(\.\d+)?)%/g, '($1 * 0.01)');

  // Factorial: e.g. "5!" -> "factorial(5)"
  // Handle simple numbers or variables followed by !
  expr = expr.replace(/(\b\d+(\.\d+)?\b)!/g, 'factorial($1)');
  // Handle parenthesized expression followed by !: (3+2)! -> factorial(3+2)
  expr = expr.replace(/\(([^()]+)\)!/g, 'factorial($1)');

  // Normalise cube root ³√
  expr = expr.replace(/(?:³|\u00B3)√\(([^()]+)\)/g, 'cbrt($1)');
  expr = expr.replace(/(?:³|\u00B3)√(\d+(\.\d+)?|[a-zA-Z]+)/g, 'cbrt($1)');

  // Handle square root √x or √(x)
  expr = expr.replace(/√\(([^()]+)\)/g, 'sqrt($1)');
  expr = expr.replace(/√(\d+(\.\d+)?|[a-zA-Z]+)/g, 'sqrt($1)');

  // Handle log10(...) -> log(..., 10)
  expr = expr.replace(/\blog10\s*\(([^()]+)\)/g, 'log($1, 10)');

  // Handle common log(...) without base -> log(..., 10)
  expr = expr.replace(/\blog\s*\(([^,()]+)\)/g, 'log($1, 10)');

  // Map natural logarithm ln(...) -> log(...)
  expr = expr.replace(/\bln\s*\(/g, 'log(');

  // In DEG mode, convert trig function arguments and returns
  if (angleMode === 'DEG') {
    // Wrap arguments of sin, cos, tan, sec, csc, cot in (arg * deg)
    // Note: mathjs has a built-in 'deg' unit where sin(30 deg) works, or (30 * pi / 180)
    // We rewrite trig(args) to trig((args) * pi / 180)
    // Avoid double wrapping if already has unit
    expr = wrapTrigInDegrees(expr);
  }

  return expr;
}

/**
 * Helper to wrap trig arguments in degree-to-radian conversion for DEG mode
 */
function wrapTrigInDegrees(expr: string): string {
  // Regex to match sin, cos, tan followed by (
  const directTrig = ['sin', 'cos', 'tan', 'sec', 'csc', 'cot'];
  for (const fn of directTrig) {
    const regex = new RegExp(`\\b${fn}\\s*\\(`, 'g');
    let match;
    let offset = 0;
    while ((match = regex.exec(expr)) !== null) {
      const openIdx = match.index + match[0].length - 1;
      // Find matching close paren
      let depth = 1;
      let closeIdx = -1;
      for (let i = openIdx + 1; i < expr.length; i++) {
        if (expr[i] === '(') depth++;
        else if (expr[i] === ')') {
          depth--;
          if (depth === 0) {
            closeIdx = i;
            break;
          }
        }
      }
      if (closeIdx !== -1) {
        const inner = expr.substring(openIdx + 1, closeIdx);
        // If inner already contains deg or rad, don't wrap
        if (!inner.includes('deg') && !inner.includes('rad')) {
          const replacement = `(${inner}) * pi / 180`;
          expr = expr.substring(0, openIdx + 1) + replacement + expr.substring(closeIdx);
          regex.lastIndex = openIdx + replacement.length + 1;
        }
      }
    }
  }

  // Inverse trig: asin, acos, atan in DEG mode should return degrees: asin(...) * 180 / pi
  const invTrig = ['asin', 'acos', 'atan'];
  for (const fn of invTrig) {
    const regex = new RegExp(`\\b${fn}\\s*\\(`, 'g');
    let match;
    while ((match = regex.exec(expr)) !== null) {
      const openIdx = match.index + match[0].length - 1;
      let depth = 1;
      let closeIdx = -1;
      for (let i = openIdx + 1; i < expr.length; i++) {
        if (expr[i] === '(') depth++;
        else if (expr[i] === ')') {
          depth--;
          if (depth === 0) {
            closeIdx = i;
            break;
          }
        }
      }
      if (closeIdx !== -1) {
        const fullCall = expr.substring(match.index, closeIdx + 1);
        const replacement = `(${fullCall} * 180 / pi)`;
        expr = expr.substring(0, match.index) + replacement + expr.substring(closeIdx + 1);
        regex.lastIndex = match.index + replacement.length;
      }
    }
  }

  return expr;
}
