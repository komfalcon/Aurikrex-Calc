// Aurikrex Input Normalization and Preprocessing (PRD v2 Section 4A & 7)
import { normalizeUnitTokens } from './units';

/**
 * Normalise calculator keypad input string into mathjs/calculus compatible syntax
 */
export function preprocessExpression(input: string, angleMode: 'deg' | 'rad' = 'deg'): string {
  let expr = input.trim();
  if (!expr) return '';

  // Limit check (PRD v2 Section 7: max 2,000 chars)
  if (expr.length > 2000) {
    throw new Error('TOO_LARGE: Input is too long');
  }

  // Auto-close missing parentheses (PRD requirement: automatically detect no close bracket and add it)
  let openCount = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
      openCount++;
    } else if (expr[i] === ')') {
      if (openCount > 0) openCount--;
    }
  }
  if (openCount > 0) {
    expr = expr + ')'.repeat(openCount);
  }

  // Check nesting depth (max 64)
  let depth = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
      depth++;
      if (depth > 64) throw new Error('TOO_LARGE: Nesting depth exceeded 64');
    } else if (expr[i] === ')') {
      depth--;
    }
  }

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

  // Calculator Percent Convention (PRD v2 Section 7: "200 + 10% means 200 plus 10% of 200 = 220")
  expr = expr.replace(/(\d+(?:\.\d+)?)\s*([\+\-])\s*(\d+(?:\.\d+)?)%/g, (_, base, op, pct) => {
    return `(${base} ${op} (${base} * (${pct} / 100)))`;
  });
  // Standalone percentage: 50% -> (50 / 100)
  expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1 / 100)');

  // Implicit multiplication:
  // Number directly before variable or function: 2pi -> 2*pi, 2x -> 2*x, 3sin(x) -> 3*sin(x), 2Ans -> 2*Ans
  expr = expr.replace(/(?<![a-zA-Z0-9_])(\d+(\.\d+)?)(\s*)([a-zA-Zπ]|pi|Ans|\()/g, (m, num, _, space, after) => {
    return `${num}*${after}`;
  });

  // Parentheses followed by number or paren: (2)(3) -> (2)*(3), (2)3 -> (2)*3
  expr = expr.replace(/\)(\s*)\(/g, ')*(');
  expr = expr.replace(/\)(\s*)(\d+(\.\d+)?)/g, ')*$2');
  expr = expr.replace(/\)(\s*)([a-zA-Zπ]|pi|Ans)/g, ')*$2');

  // Factorial: e.g. "5!" -> "factorial(5)"
  expr = expr.replace(/(\b\d+(\.\d+)?\b)!/g, 'factorial($1)');
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
  if (angleMode.toLowerCase() === 'deg') {
    expr = wrapTrigInDegrees(expr);
  }

  return expr;
}

/**
 * Clean, safe wrapper for trig functions in DEG mode with support for nested expressions and parentheses
 */
function wrapTrigInDegrees(expr: string): string {
  const trigFns = ['asin', 'acos', 'atan', 'sin', 'cos', 'tan', 'sec', 'csc', 'cot'];
  let result = '';
  let i = 0;

  while (i < expr.length) {
    let matchedFn: string | null = null;
    for (const fn of trigFns) {
      const isWordStart = i === 0 || /[^a-zA-Z0-9_]/.test(expr[i - 1]);
      if (isWordStart && expr.startsWith(fn, i)) {
        let j = i + fn.length;
        while (j < expr.length && /\s/.test(expr[j])) j++;
        if (expr[j] === '(') {
          matchedFn = fn;
          break;
        }
      }
    }

    if (matchedFn) {
      const openParenIdx = expr.indexOf('(', i + matchedFn.length);
      let depth = 1;
      let k = openParenIdx + 1;
      while (k < expr.length && depth > 0) {
        if (expr[k] === '(') depth++;
        else if (expr[k] === ')') depth--;
        k++;
      }

      // Argument inside the parentheses
      const arg = expr.slice(openParenIdx + 1, depth === 0 ? k - 1 : k);
      const wrappedArg = wrapTrigInDegrees(arg);

      const isInverse = ['asin', 'acos', 'atan'].includes(matchedFn);
      if (isInverse) {
        if (wrappedArg.includes('180 / pi')) {
          result += `${matchedFn}(${wrappedArg})`;
        } else {
          result += `(${matchedFn}(${wrappedArg}) * 180 / pi)`;
        }
      } else {
        if (wrappedArg.includes('deg') || wrappedArg.includes('rad') || wrappedArg.includes('pi / 180')) {
          result += `${matchedFn}(${wrappedArg})`;
        } else {
          result += `${matchedFn}((${wrappedArg}) * pi / 180)`;
        }
      }

      i = k;
    } else {
      result += expr[i];
      i++;
    }
  }

  return result;
}
