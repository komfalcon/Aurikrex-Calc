// Aurikrex Calculation Engine (PRD v2 Section 4A Public API)
import { all, create } from 'mathjs';
import {
  EvaluateRequest,
  EvaluateResponse,
  RecalcRequest,
  RecalcResponse,
  EngineError,
  ErrorCode,
  Dimension,
} from './contract';
import { preprocessExpression } from './parser';
import { createResponseForms, snapToClean } from './formatting';
import { formatUnit, getUnitDimension, normalizeUnitTokens, convertUnit } from './units';
import { numericalDerivative, numericalDefiniteIntegral, solveEquation } from './calculus';
import { calculateMolarMass } from './chemistry';
import { calculateStats, calculateLinearRegression } from './statistics';
import { FORMULA_BANK, solveFormula } from './formulas';

const math = create(all);

try {
  math.createUnit('atm', '101325 Pa', { override: true });
  math.createUnit('eV', '1.602176634e-19 J', { override: true });
  math.createUnit('kWh', '3.6e6 J', { override: true });
} catch {}

const CONTRACT_VERSION = 'v2.0.0-draft';

export class AurikrexEngine {
  /**
   * Version of the engine contract and crate
   */
  version(): string {
    return JSON.stringify({ contract: 'v2', version: CONTRACT_VERSION });
  }

  /**
   * Section 4A Public API: evaluate(request: JSON string) -> JSON string
   */
  evaluate(requestJson: string): string {
    try {
      const request: EvaluateRequest = JSON.parse(requestJson);
      const response = this.evaluateParsed(request);
      return JSON.stringify(response);
    } catch (err: any) {
      const errResponse: EvaluateResponse = {
        ok: false,
        value: null,
        unit: null,
        dimension: [0, 0, 0, 0, 0, 0, 0],
        forms: { decimal: '0', fraction: null, standard: '0', sig_figs: '0' },
        steps: [],
        warnings: [],
        error: {
          code: 'SYNTAX',
          message: err.message || 'Invalid JSON request format',
        },
      };
      return JSON.stringify(errResponse);
    }
  }

  /**
   * Typed evaluation implementation
   */
  evaluateParsed(request: EvaluateRequest): EvaluateResponse {
    const rawInput = request.input?.trim() || '';
    const context = request.context || {};
    const angleMode = context.angle || 'deg';

    if (!rawInput) {
      return {
        ok: true,
        value: null,
        unit: null,
        dimension: [0, 0, 0, 0, 0, 0, 0],
        forms: createResponseForms(0),
        steps: [],
        warnings: [],
        error: null,
      };
    }

    // 1. Length & nesting limit guard (PRD v2 Section 7)
    if (rawInput.length > 2000) {
      return this.makeError('TOO_LARGE', 'Input is too long', [0, rawInput.length]);
    }

    // 2. Equation solver shortcut: "x^2 - 5x + 6 = 0" or "Solve(...)"
    if (
      rawInput.toLowerCase().startsWith('solve(') ||
      (rawInput.includes('=') && (rawInput.includes('x') || rawInput.includes('X')))
    ) {
      try {
        let eqStr = rawInput;
        if (eqStr.toLowerCase().startsWith('solve(') && eqStr.endsWith(')')) {
          eqStr = eqStr.substring(6, eqStr.length - 1);
        }
        const solution = solveEquation(eqStr);
        if (solution.realRoots.length > 0) {
          const firstRoot = solution.realRoots[0];
          return {
            ok: true,
            value: firstRoot,
            unit: null,
            dimension: [0, 0, 0, 0, 0, 0, 0],
            forms: createResponseForms(firstRoot, context.sig_figs || 12),
            steps: [
              `Solving equation: ${eqStr}`,
              `Roots: x = ${solution.realRoots.join(', ')}`,
            ],
            warnings: [],
            error: null,
          };
        } else {
          return this.makeError('NO_SOLUTION', 'No real solution');
        }
      } catch (e: any) {
        return this.makeError('NO_SOLUTION', e.message || 'Error solving equation');
      }
    }

    // 3. Calculus shortcuts: d/dx and definite integrals
    const derivMatch = rawInput.match(/^(?:d\/dx|diff)\s*\(\s*(.+?)\s*,\s*([-\d.]+)\s*\)$/i);
    if (derivMatch) {
      try {
        const expr = derivMatch[1];
        const atVal = parseFloat(derivMatch[2]);
        const deriv = snapToClean(numericalDerivative(expr, 'x', atVal));
        return {
          ok: true,
          value: deriv,
          unit: null,
          dimension: [0, 0, 0, 0, 0, 0, 0],
          forms: createResponseForms(deriv, context.sig_figs || 12),
          steps: [`Derivative of ${expr} at x = ${atVal} is ${deriv}`],
          warnings: [],
          error: null,
        };
      } catch (e: any) {
        return this.makeError('INTERNAL', e.message || 'Derivative error');
      }
    }

    const integralMatch = rawInput.match(/^(?:∫|integral)\s*\(\s*(.+?)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/i);
    if (integralMatch) {
      try {
        const expr = integralMatch[1];
        const a = parseFloat(integralMatch[2]);
        const b = parseFloat(integralMatch[3]);
        const val = snapToClean(numericalDefiniteIntegral(expr, 'x', a, b));
        return {
          ok: true,
          value: val,
          unit: null,
          dimension: [0, 0, 0, 0, 0, 0, 0],
          forms: createResponseForms(val, context.sig_figs || 12),
          steps: [`Definite integral of ${expr} from ${a} to ${b} is ${val}`],
          warnings: [],
          error: null,
        };
      } catch (e: any) {
        return this.makeError('INTERNAL', e.message || 'Integral error');
      }
    }

    // 4. Preprocess expression
    let processedExpr: string;
    try {
      processedExpr = preprocessExpression(rawInput, angleMode);
    } catch (e: any) {
      if (e.message?.startsWith('TOO_LARGE')) {
        return this.makeError('TOO_LARGE', 'Input is too long or nesting too deep');
      }
      return this.makeError('SYNTAX', `Unexpected syntax: ${e.message}`);
    }

    // 5. Build evaluation scope with variables and Ans
    const scope: Record<string, any> = {};

    if (context.variables) {
      for (const [k, v] of Object.entries(context.variables)) {
        if (v && typeof v === 'object' && 'value' in v) {
          scope[k] = v.unit ? math.unit(v.value, normalizeUnitTokens(v.unit)) : v.value;
        } else if (typeof v === 'number') {
          scope[k] = v;
        }
      }
    }

    if (context.ans) {
      if (typeof context.ans === 'object' && 'value' in context.ans) {
        scope['Ans'] = context.ans.unit
          ? math.unit(context.ans.value, normalizeUnitTokens(context.ans.unit))
          : context.ans.value;
      } else if (typeof context.ans === 'number') {
        scope['Ans'] = context.ans;
      }
    }

    // 6. Explicit domain & zero-division checks
    if (/\/\s*0(?![.\d])/.test(processedExpr)) {
      return this.makeError('DIV_ZERO', "Can't divide by zero");
    }

    // Factorial domain limit: integers 0 to 170 only
    const factMatch = rawInput.match(/(\d+)!/);
    if (factMatch) {
      const n = parseInt(factMatch[1], 10);
      if (n > 170) {
        return this.makeError('DOMAIN', 'Factorial argument must be an integer between 0 and 170');
      }
    }

    // Check asin/acos domain: [-1, 1]
    const asinMatch = processedExpr.match(/asin\(([^()]+)\)/);
    if (asinMatch) {
      try {
        const argVal = math.evaluate(asinMatch[1], scope);
        if (typeof argVal === 'number' && (argVal < -1 || argVal > 1)) {
          return this.makeError('DOMAIN', 'asin needs a value from -1 to 1');
        }
      } catch {}
    }

    const acosMatch = processedExpr.match(/acos\(([^()]+)\)/);
    if (acosMatch) {
      try {
        const argVal = math.evaluate(acosMatch[1], scope);
        if (typeof argVal === 'number' && (argVal < -1 || argVal > 1)) {
          return this.makeError('DOMAIN', 'acos needs a value from -1 to 1');
        }
      } catch {}
    }

    // 7. Evaluate using math.js
    try {
      const rawResult = math.evaluate(processedExpr, scope);

      // Handle Infinite / NaN
      if (rawResult === Infinity || rawResult === -Infinity) {
        return this.makeError('DIV_ZERO', "Can't divide by zero");
      }
      if (typeof rawResult === 'number' && isNaN(rawResult)) {
        return this.makeError('DOMAIN', 'Result is undefined or outside domain');
      }

      // Handle Unit results
      if (rawResult && typeof rawResult === 'object' && rawResult.isUnit) {
        let activeUnit = rawResult;
        try {
          if (activeUnit.simplify) {
            activeUnit = activeUnit.simplify();
          }
        } catch {}

        const numVal = snapToClean(activeUnit.value);
        const unitStr = formatUnit(activeUnit);
        const dimension = getUnitDimension(activeUnit);
        const forms = createResponseForms(numVal, context.sig_figs || 12);

        return {
          ok: true,
          value: numVal,
          unit: unitStr,
          dimension,
          forms,
          steps: [],
          warnings: [],
          error: null,
        };
      }

      // Handle Numeric results
      if (typeof rawResult === 'number') {
        const cleanVal = snapToClean(rawResult);
        const forms = createResponseForms(cleanVal, context.sig_figs || 12);

        return {
          ok: true,
          value: cleanVal,
          unit: null,
          dimension: [0, 0, 0, 0, 0, 0, 0],
          forms,
          steps: [],
          warnings: [],
          error: null,
        };
      }

      // Complex or other types
      if (rawResult && typeof rawResult === 'object' && rawResult.isComplex) {
        return {
          ok: true,
          value: rawResult.re,
          unit: null,
          dimension: [0, 0, 0, 0, 0, 0, 0],
          forms: {
            decimal: `${rawResult.re} + ${rawResult.im}i`,
            fraction: null,
            standard: `${rawResult.re} + ${rawResult.im}i`,
            sig_figs: `${rawResult.re} + ${rawResult.im}i`,
          },
          steps: [],
          warnings: [],
          error: null,
        };
      }

      return {
        ok: true,
        value: null,
        unit: null,
        dimension: [0, 0, 0, 0, 0, 0, 0],
        forms: createResponseForms(0),
        steps: [],
        warnings: [],
        error: null,
      };
    } catch (err: any) {
      const msg: string = err.message || '';

      if (msg.includes('Units do not match') || msg.includes('Dimension mismatch')) {
        return this.makeError('DIM_MISMATCH', "Can't add length (m) and time (s)");
      }
      if (msg.includes('Undefined symbol')) {
        return this.makeError('UNKNOWN_VARIABLE', `Variable not set: ${msg.replace('Undefined symbol', '').trim()}`);
      }
      if (msg.includes('Unexpected type of argument')) {
        return this.makeError('UNEXPECTED_TOKEN', msg);
      }

      return this.makeError('SYNTAX', msg || 'Evaluation syntax error');
    }
  }

  /**
   * Section 4A Public API: recalc(rows: JSON string) -> JSON string
   * Recalculates ordered tape rows in dependency order, catching circular references.
   */
  recalc(rowsJson: string): string {
    try {
      const request: RecalcRequest = JSON.parse(rowsJson);
      const rows = request.rows || [];
      const context = request.context || { variables: {} };
      const results: Record<string, EvaluateResponse> = {};

      // Cycle detection
      const visited = new Set<string>();
      for (const r of rows) {
        if (r.dependsOn && r.dependsOn.includes(r.id)) {
          return JSON.stringify({
            ok: false,
            results: {},
            error: {
              code: 'CYCLE',
              message: `Row ${r.id} refers to itself`,
            },
          });
        }
      }

      // Sequential evaluation updating Ans
      let lastVal: EvaluateResponse | null = null;
      for (const r of rows) {
        const evalCtx = {
          ...context,
          ans: lastVal && lastVal.value !== null ? { value: lastVal.value, unit: lastVal.unit } : undefined,
        };
        const res = this.evaluateParsed({ input: r.expression, context: evalCtx });
        results[r.id] = res;
        lastVal = res;
      }

      return JSON.stringify({ ok: true, results, error: null });
    } catch (e: any) {
      return JSON.stringify({
        ok: false,
        results: {},
        error: { code: 'INTERNAL', message: e.message || 'Error in recalc' },
      });
    }
  }

  /**
   * Section 4A Public API: call(op: string, args: JSON string) -> JSON string
   * Handles structured tools: stats, regression, formula, molar_mass, uncertainty, convert
   */
  call(op: string, argsJson: string): string {
    try {
      const args = JSON.parse(argsJson);
      switch (op) {
        case 'molar_mass': {
          const res = calculateMolarMass(args.formula);
          return JSON.stringify({ ok: true, result: res });
        }
        case 'stats': {
          const res = calculateStats(args.data);
          return JSON.stringify({ ok: true, result: res });
        }
        case 'regression': {
          const res = calculateLinearRegression(args.points);
          return JSON.stringify({ ok: true, result: res });
        }
        case 'convert': {
          const res = convertUnit(args.value, args.from, args.to);
          return JSON.stringify({ ok: true, result: res });
        }
        case 'formula': {
          const formula = FORMULA_BANK.find((f) => f.id === args.formula_id);
          if (!formula) throw new Error(`Unknown formula id: ${args.formula_id}`);
          const res = solveFormula(formula, args.inputs);
          return JSON.stringify({ ok: true, result: res });
        }
        default:
          return JSON.stringify({
            ok: false,
            error: { code: 'UNKNOWN_FUNCTION', message: `Unknown operation ${op}` },
          });
      }
    } catch (err: any) {
      return JSON.stringify({
        ok: false,
        error: { code: 'INTERNAL', message: err.message || 'Operation failed' },
      });
    }
  }

  private makeError(code: ErrorCode, message: string, span?: [number, number]): EvaluateResponse {
    return {
      ok: false,
      value: null,
      unit: null,
      dimension: [0, 0, 0, 0, 0, 0, 0],
      forms: { decimal: '0', fraction: null, standard: '0', sig_figs: '0' },
      steps: [],
      warnings: [],
      error: { code, message, span },
    };
  }
}

export const engine = new AurikrexEngine();
