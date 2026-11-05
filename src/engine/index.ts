// Aurikrex Calculation Engine (Single Seam Interface)
import { all, create, Unit } from 'mathjs';
import { EngineContext, EvaluationResult, StepItem } from './types';
import { preprocessExpression } from './parser';
import { createResultForms } from './formatting';
import { formatUnit, describeUnitDimension, normalizeUnitTokens } from './units';
import { numericalDerivative, numericalDefiniteIntegral, solveEquation } from './calculus';

const math = create(all);

// Ensure custom units
try {
  math.createUnit('atm', '101325 Pa', { override: true });
  math.createUnit('eV', '1.602176634e-19 J', { override: true });
  math.createUnit('kWh', '3.6e6 J', { override: true });
} catch {
  // Ignored if already set
}

export class AurikrexEngine {
  /**
   * Main evaluation entry point implementing the JSON contract
   */
  evaluate(params: { input: string; context?: EngineContext }): EvaluationResult {
    const rawInput = params.input?.trim() || '';
    const context = params.context || {};
    const angleMode = context.angleMode || 'DEG';

    if (!rawInput) {
      return {
        value: null,
        numericValue: null,
        unit: null,
        forms: createResultForms(0),
        error: null,
      };
    }

    // 1. Check for variable assignment: e.g. "A = 9.8" or "X = 5 m"
    const assignMatch = rawInput.match(/^([A-Za-z])\s*=\s*(.+)$/);
    let targetVarName: string | null = null;
    let evalInput = rawInput;

    // Check if it's an equation to solve rather than simple assignment (e.g. "x^2 - 5x + 6 = 0")
    if (assignMatch) {
      const varName = assignMatch[1].toUpperCase();
      const rhs = assignMatch[2].trim();
      const isSimpleVar = ['A', 'B', 'C', 'X', 'Y', 'M'].includes(varName);
      
      // If RHS is not 0 and LHS is a single storage variable, handle as assignment
      if (isSimpleVar && !rhs.includes('x') && !rhs.includes('X') && rhs !== '0') {
        targetVarName = varName;
        evalInput = rhs;
      }
    }

    // 2. Check for equation solving: e.g. "x^2 - 5x + 6 = 0" or "Solve(x^2 - 4 = 0)"
    if (
      evalInput.toLowerCase().startsWith('solve(') ||
      (evalInput.includes('=') && (evalInput.includes('x') || evalInput.includes('X')))
    ) {
      try {
        let eqStr = evalInput;
        if (eqStr.toLowerCase().startsWith('solve(') && eqStr.endsWith(')')) {
          eqStr = eqStr.substring(6, eqStr.length - 1);
        }
        const solution = solveEquation(eqStr);
        if (solution.realRoots.length > 0) {
          const rootStr = solution.realRoots.map((r) => r.toString()).join(', ');
          const firstRoot = solution.realRoots[0];
          return {
            value: rootStr,
            numericValue: firstRoot,
            unit: null,
            forms: createResultForms(firstRoot),
            steps: [
              { type: 'rule', text: `Solving equation: ${eqStr}` },
              { type: 'result', text: `Roots: x = ${rootStr}` },
            ],
            error: null,
          };
        } else {
          return {
            value: 'No real roots',
            numericValue: null,
            unit: null,
            forms: createResultForms(0),
            error: 'No real roots found',
          };
        }
      } catch (e: any) {
        return {
          value: null,
          numericValue: null,
          unit: null,
          forms: createResultForms(0),
          error: `Solve error: ${e.message}`,
        };
      }
    }

    // 3. Check for calculus shortcuts:
    // e.g. d/dx(x^2, 3) or ∫(x^2, 0, 1) or integral(x^2, 0, 1)
    const derivMatch = evalInput.match(/^(?:d\/dx|diff)\s*\(\s*(.+?)\s*,\s*([-\d.]+)\s*\)$/i);
    if (derivMatch) {
      try {
        const expr = derivMatch[1];
        const atVal = parseFloat(derivMatch[2]);
        const deriv = numericalDerivative(expr, 'x', atVal);
        return {
          value: parseFloat(deriv.toFixed(6)),
          numericValue: deriv,
          unit: null,
          forms: createResultForms(deriv),
          steps: [
            { type: 'rule', text: `Derivative of ${expr} with respect to x at x = ${atVal}` },
            { type: 'result', text: `d/dx = ${deriv.toFixed(6)}` },
          ],
          error: null,
        };
      } catch (e: any) {
        return {
          value: null,
          numericValue: null,
          unit: null,
          forms: createResultForms(0),
          error: `Derivative error: ${e.message}`,
        };
      }
    }

    const integralMatch = evalInput.match(/^(?:∫|integral)\s*\(\s*(.+?)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/i);
    if (integralMatch) {
      try {
        const expr = integralMatch[1];
        const a = parseFloat(integralMatch[2]);
        const b = parseFloat(integralMatch[3]);
        const val = numericalDefiniteIntegral(expr, 'x', a, b);
        return {
          value: parseFloat(val.toFixed(6)),
          numericValue: val,
          unit: null,
          forms: createResultForms(val),
          steps: [
            { type: 'rule', text: `Definite integral of ${expr} from x = ${a} to x = ${b}` },
            { type: 'result', text: `∫ = ${val.toFixed(6)}` },
          ],
          error: null,
        };
      } catch (e: any) {
        return {
          value: null,
          numericValue: null,
          unit: null,
          forms: createResultForms(0),
          error: `Integral error: ${e.message}`,
        };
      }
    }

    // 4. Preprocess expression for standard arithmetic & functions
    let processedExpr: string;
    try {
      processedExpr = preprocessExpression(evalInput, angleMode);
    } catch (e: any) {
      return {
        value: null,
        numericValue: null,
        unit: null,
        forms: createResultForms(0),
        error: `Syntax error: ${e.message}`,
      };
    }

    // 5. Build evaluation scope with variables and Ans
    const scope: Record<string, any> = {};

    if (context.variables) {
      for (const [k, v] of Object.entries(context.variables)) {
        if (v !== undefined && v !== null) {
          if (typeof v === 'object' && 'value' in v) {
            scope[k] = v.unit ? math.unit(v.value, normalizeUnitTokens(v.unit)) : v.value;
          } else {
            scope[k] = v;
          }
        }
      }
    }

    if (context.ans !== undefined && context.ans !== null) {
      if (typeof context.ans === 'object' && 'value' in context.ans) {
        scope['Ans'] = context.ans.unit ? math.unit(context.ans.value, normalizeUnitTokens(context.ans.unit)) : context.ans.value;
      } else {
        scope['Ans'] = context.ans;
      }
    }

    // 6. Evaluate using math.js with robust error mapping
    try {
      // Pre-check for explicit division by 0 (e.g. /0 or / 0 without decimal)
      if (/\/\s*0(?![.\d])/.test(processedExpr)) {
        return {
          value: null,
          numericValue: null,
          unit: null,
          forms: createResultForms(0),
          error: "Can't divide by zero",
        };
      }

      // Check domain errors for asin, acos, sqrt on simple inputs
      const asinMatch = processedExpr.match(/asin\(([^()]+)\)/);
      if (asinMatch) {
        try {
          const argVal = math.evaluate(asinMatch[1], scope);
          if (typeof argVal === 'number' && (argVal < -1 || argVal > 1)) {
            return {
              value: null,
              numericValue: null,
              unit: null,
              forms: createResultForms(0),
              error: 'Domain error: asin argument must be between -1 and 1',
            };
          }
        } catch {}
      }

      const acosMatch = processedExpr.match(/acos\(([^()]+)\)/);
      if (acosMatch) {
        try {
          const argVal = math.evaluate(acosMatch[1], scope);
          if (typeof argVal === 'number' && (argVal < -1 || argVal > 1)) {
            return {
              value: null,
              numericValue: null,
              unit: null,
              forms: createResultForms(0),
              error: 'Domain error: acos argument must be between -1 and 1',
            };
          }
        } catch {}
      }

      const sqrtMatch = processedExpr.match(/sqrt\(([^()]+)\)/);
      if (sqrtMatch) {
        try {
          const argVal = math.evaluate(sqrtMatch[1], scope);
          if (typeof argVal === 'number' && argVal < 0) {
            return {
              value: null,
              numericValue: null,
              unit: null,
              forms: createResultForms(0),
              error: 'Domain error: square root of negative number in real mode',
            };
          }
        } catch {}
      }

      const rawResult = math.evaluate(processedExpr, scope);

      // Handle Division by Zero resulting in Infinity
      if (rawResult === Infinity || rawResult === -Infinity) {
        return {
          value: null,
          numericValue: null,
          unit: null,
          forms: createResultForms(0),
          error: "Can't divide by zero",
        };
      }

      // Handle Complex Numbers (if real mode is requested)
      if (rawResult && typeof rawResult === 'object' && rawResult.isComplex) {
        const re = rawResult.re;
        const im = rawResult.im;
        const sign = im >= 0 ? '+' : '-';
        const str = `${re} ${sign} ${Math.abs(im)}i`;
        return {
          value: str,
          numericValue: re,
          unit: null,
          forms: {
            decimal: str,
            fraction: null,
            standardForm: str,
            engineering: str,
            sigFigs: () => str,
          },
          error: null,
        };
      }

      // Handle Unit results (e.g. 29.4 m/s)
      if (rawResult && typeof rawResult === 'object' && rawResult.isUnit) {
        let activeUnit = rawResult;
        try {
          if (activeUnit.simplify) {
            activeUnit = activeUnit.simplify();
          }
        } catch {}

        const numVal = activeUnit.value;
        const unitStr = formatUnit(activeUnit);
        const dimension = describeUnitDimension(activeUnit);
        const forms = createResultForms(numVal);

        // If assignment was made, persist into context
        if (targetVarName && context.variables) {
          context.variables[targetVarName] = { value: numVal, unit: unitStr };
        }

        return {
          value: `${forms.decimal} ${unitStr}`,
          numericValue: numVal,
          unit: unitStr,
          dimension,
          forms,
          error: null,
          raw: activeUnit,
        };
      }

      // Handle Standard numeric results
      if (typeof rawResult === 'number') {
        // Clean tiny floating point noise (e.g. 1e-15 for sin(pi))
        let cleanVal = rawResult;
        if (Math.abs(cleanVal) < 1e-14) {
          cleanVal = 0;
        }

        const forms = createResultForms(cleanVal);

        if (targetVarName && context.variables) {
          context.variables[targetVarName] = cleanVal;
        }

        return {
          value: forms.decimal,
          numericValue: cleanVal,
          unit: null,
          forms,
          error: null,
          raw: cleanVal,
        };
      }

      // Handle Matrices or Arrays
      if (Array.isArray(rawResult) || (rawResult && rawResult.isMatrix)) {
        const arr = rawResult.toArray ? rawResult.toArray() : rawResult;
        const json = JSON.stringify(arr);
        return {
          value: json,
          numericValue: null,
          unit: null,
          forms: {
            decimal: json,
            fraction: null,
            standardForm: json,
            engineering: json,
            sigFigs: () => json,
          },
          error: null,
        };
      }

      return {
        value: String(rawResult),
        numericValue: null,
        unit: null,
        forms: createResultForms(0),
        error: null,
      };
    } catch (err: any) {
      let friendlyError = err.message || 'Evaluation error';

      // Friendly unit incompatibility error (FR-12)
      if (friendlyError.includes('Units do not match') || friendlyError.includes('Dimension mismatch')) {
        friendlyError = "Unit mismatch: Cannot add or combine incompatible dimensions";
        // Specific check for length and time
        if (rawInput.includes('m') && rawInput.includes('s')) {
          friendlyError = "Can't add length (m) and time (s)";
        }
      } else if (friendlyError.includes('Unexpected type of argument') || friendlyError.includes('Cannot convert')) {
        friendlyError = `Invalid argument: ${friendlyError}`;
      } else if (friendlyError.includes('Undefined symbol')) {
        friendlyError = `Undefined variable or unit: ${friendlyError.replace('Undefined symbol', '').trim()}`;
      }

      return {
        value: null,
        numericValue: null,
        unit: null,
        forms: createResultForms(0),
        error: friendlyError,
      };
    }
  }
}

export const engine = new AurikrexEngine();
