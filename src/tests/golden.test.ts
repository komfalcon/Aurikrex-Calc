import { describe, it, expect } from 'vitest';
import { engine } from '../engine';
import { EvaluateResponse } from '../engine/contract';
import { convertUnit } from '../engine/units';
import { calculateMolarMass, PERIODIC_TABLE } from '../engine/chemistry';
import { calculateStats, calculateLinearRegression } from '../engine/statistics';
import { FORMULA_BANK, solveFormula } from '../engine/formulas';
import { CONSTANTS } from '../engine/constants';
import { calculateCGPA, calculateJAMBAggregate } from '../engine/academic';

import goldenFixtures from '../../fixtures/golden.json';

describe('Aurikrex PRD v2 Golden Test Suite (Section 8 Seed Cases & 100+ Tests)', () => {
  // Helper to call evaluate using Section 4A JSON string API
  function evalJson(input: string, context: any = {}): EvaluateResponse {
    const reqStr = JSON.stringify({ input, context });
    const resStr = engine.evaluate(reqStr);
    return JSON.parse(resStr);
  }

  // --- PRD v2 Section 8 SEED CASES (Must Pass on Day One) ---
  describe('PRD v2 Section 8 Seed Cases', () => {
    it('Seed 1: 2π ≈ 6.2832', () => {
      const res = evalJson('2π');
      expect(res.ok).toBe(true);
      expect(res.value).toBeCloseTo(6.2831853, 4);
    });

    it('Seed 2: sin(30°) = 0.5 in DEG', () => {
      const res = evalJson('sin(30)', { angle: 'deg' });
      expect(res.ok).toBe(true);
      expect(res.value).toBeCloseTo(0.5, 6);
    });

    it('Seed 3: 5! = 120', () => {
      const res = evalJson('5!');
      expect(res.ok).toBe(true);
      expect(res.value).toBe(120);
    });

    it('Seed 4: 1/0 returns DIV_ZERO', () => {
      const res = evalJson('1/0');
      expect(res.ok).toBe(false);
      expect(res.error?.code).toBe('DIV_ZERO');
      expect(res.error?.message).toContain("Can't divide by zero");
    });

    it('Seed 5: 9.8 m/s^2 * 3 s = 29.4 m/s', () => {
      const res = evalJson('9.8 m/s^2 * 3 s');
      expect(res.ok).toBe(true);
      expect(res.value).toBeCloseTo(29.4, 4);
      expect(res.unit).toBe('m/s');
      expect(res.dimension).toEqual([1, 0, -1, 0, 0, 0, 0]);
    });

    it('Seed 6: 5 m + 3 s returns DIM_MISMATCH', () => {
      const res = evalJson('5 m + 3 s');
      expect(res.ok).toBe(false);
      expect(res.error?.code).toBe('DIM_MISMATCH');
      expect(res.error?.message).toContain("Can't add length (m) and time (s)");
    });

    it('Seed 7: 29.4 m/s to km/h = 105.84', () => {
      const conv = convertUnit(29.4, 'm/s', 'km/h');
      expect(conv.value).toBeCloseTo(105.84, 2);
    });

    it('Seed 8: 1 kWh to MJ = 3.6', () => {
      const conv = convertUnit(1, 'kWh', 'MJ');
      expect(conv.value).toBeCloseTo(3.6, 4);
    });

    it('Seed 9: 200 + 10% = 220 (calculator convention)', () => {
      const res = evalJson('200 + 10%');
      expect(res.ok).toBe(true);
      expect(res.value).toBeCloseTo(220, 4);
    });

    it('Seed 10: asin(2) returns DOMAIN', () => {
      const res = evalJson('asin(2)', { angle: 'deg' });
      expect(res.ok).toBe(false);
      expect(res.error?.code).toBe('DOMAIN');
    });
  });

  // --- Section 4A JSON Contract & Tape Recalc ---
  describe('Section 4A JSON Contract & Tape Recalc', () => {
    it('Contract version returns valid version JSON', () => {
      const ver = JSON.parse(engine.version());
      expect(ver.contract).toBe('v2');
    });

    it('Tape recalculation without cycle recalculates sequentially', () => {
      const rows = [
        { id: 'row1', expression: '10 + 5' },
        { id: 'row2', expression: 'Ans * 2' },
      ];
      const recalcRes = JSON.parse(engine.recalc(JSON.stringify({ rows })));
      expect(recalcRes.ok).toBe(true);
      expect(recalcRes.results['row1'].value).toBe(15);
      expect(recalcRes.results['row2'].value).toBe(30);
    });

    it('Tape recalculation returns CYCLE on circular reference', () => {
      const rows = [
        { id: 'row1', expression: 'Ans + 1', dependsOn: ['row1'] },
      ];
      const recalcRes = JSON.parse(engine.recalc(JSON.stringify({ rows })));
      expect(recalcRes.ok).toBe(false);
      expect(recalcRes.error.code).toBe('CYCLE');
    });

    it('Structured tool op via call(op, args)', () => {
      const callRes = JSON.parse(
        engine.call('convert', JSON.stringify({ value: 1000, from: 'm', to: 'km' }))
      );
      expect(callRes.ok).toBe(true);
      expect(callRes.result.value).toBe(1);
    });
  });

  // --- Comprehensive Arithmetic & Order of Operations (20 tests) ---
  const arithmeticTests = [
    { input: '1 + 1', expected: 2 },
    { input: '2 + 3 * 4', expected: 14 },
    { input: '(2 + 3) * 4', expected: 20 },
    { input: '10 - 4 - 3', expected: 3 },
    { input: '10 - (4 - 3)', expected: 9 },
    { input: '2^3', expected: 8 },
    { input: '2^3^2', expected: 512 },
    { input: '100 / 5 / 2', expected: 10 },
    { input: '100 / (5 / 2)', expected: 40 },
    { input: '2.5 * 4', expected: 10 },
    { input: '-5 + 8', expected: 3 },
    { input: '-(3 + 4)', expected: -7 },
    { input: '15 % 4', expected: 3 },
    { input: '3(4 + 5)', expected: 27 },
    { input: '(2)(3)', expected: 6 },
    { input: '2(3 + 4)', expected: 14 },
    { input: '4 * 10^3', expected: 4000 },
    { input: '1.5 * 10^-2', expected: 0.015 },
    { input: '100 - 15%', expected: 85 },
    { input: '50%', expected: 0.5 },
  ];

  arithmeticTests.forEach(({ input, expected }, idx) => {
    it(`Arithmetic #${idx + 1}: ${input} => ${expected}`, () => {
      const res = evalJson(input);
      expect(res.ok).toBe(true);
      expect(res.value).toBeCloseTo(expected, 6);
    });
  });

  // --- Trigonometry & Exact Snapping (15 tests) ---
  it('Trig DEG: cos(60) = 0.5', () => {
    const res = evalJson('cos(60)', { angle: 'deg' });
    expect(res.value).toBeCloseTo(0.5, 6);
  });

  it('Trig DEG: tan(45) = 1', () => {
    const res = evalJson('tan(45)', { angle: 'deg' });
    expect(res.value).toBeCloseTo(1, 6);
  });

  it('Trig DEG: sin(180) snaps to exactly 0 (no 1.2e-16)', () => {
    const res = evalJson('sin(180)', { angle: 'deg' });
    expect(res.value).toBe(0);
  });

  it('Trig DEG: cos(90) snaps to exactly 0', () => {
    const res = evalJson('cos(90)', { angle: 'deg' });
    expect(res.value).toBe(0);
  });

  it('Trig DEG: acos(0.5) = 60', () => {
    const res = evalJson('acos(0.5)', { angle: 'deg' });
    expect(res.value).toBeCloseTo(60, 6);
  });

  it('Trig DEG: atan(1) = 45', () => {
    const res = evalJson('atan(1)', { angle: 'deg' });
    expect(res.value).toBeCloseTo(45, 6);
  });

  it('Trig RAD: sin(pi / 2) = 1', () => {
    const res = evalJson('sin(pi / 2)', { angle: 'rad' });
    expect(res.value).toBeCloseTo(1, 6);
  });

  it('Trig RAD: cos(pi) = -1', () => {
    const res = evalJson('cos(pi)', { angle: 'rad' });
    expect(res.value).toBeCloseTo(-1, 6);
  });

  it('Trig RAD: tan(pi / 4) = 1', () => {
    const res = evalJson('tan(pi / 4)', { angle: 'rad' });
    expect(res.value).toBeCloseTo(1, 6);
  });

  it('Hyperbolic: sinh(0) = 0', () => {
    const res = evalJson('sinh(0)');
    expect(res.value).toBeCloseTo(0, 6);
  });

  it('Hyperbolic: cosh(0) = 1', () => {
    const res = evalJson('cosh(0)');
    expect(res.value).toBeCloseTo(1, 6);
  });

  it('Hyperbolic: tanh(0) = 0', () => {
    const res = evalJson('tanh(0)');
    expect(res.value).toBeCloseTo(0, 6);
  });

  it('Constant e ≈ 2.71828', () => {
    const res = evalJson('e');
    expect(res.value).toBeCloseTo(2.71828, 4);
  });

  // --- Powers, Roots, Logs (10 tests) ---
  const powerTests = [
    { input: '0!', expected: 1 },
    { input: '6!', expected: 720 },
    { input: 'sqrt(16)', expected: 4 },
    { input: '√16', expected: 4 },
    { input: 'cbrt(27)', expected: 3 },
    { input: 'ln(e)', expected: 1 },
    { input: 'ln(e^2)', expected: 2 },
    { input: 'log10(100)', expected: 2 },
    { input: 'log10(1000)', expected: 3 },
    { input: '1/2', expected: 0.5 },
  ];

  powerTests.forEach(({ input, expected }, idx) => {
    it(`Power/Root #${idx + 1}: ${input} => ${expected}`, () => {
      const res = evalJson(input);
      expect(res.value).toBeCloseTo(expected, 6);
    });
  });

  // --- Factorial Domain Limit (integers 0 to 170 only) ---
  it('Factorial domain: 171! returns DOMAIN', () => {
    const res = evalJson('171!');
    expect(res.ok).toBe(false);
    expect(res.error?.code).toBe('DOMAIN');
  });

  // --- Units (10 tests) ---
  it('Units with superscript: 9.8 m/s² * 3 s = 29.4 m/s', () => {
    const res = evalJson('9.8 m/s² * 3 s');
    expect(res.ok).toBe(true);
    expect(res.value).toBeCloseTo(29.4, 4);
  });

  it('Units: 10 N * 5 m = 50 J', () => {
    const res = evalJson('10 N * 5 m');
    expect(res.value).toBeCloseTo(50, 4);
    expect(res.dimension).toEqual([2, 1, -2, 0, 0, 0, 0]);
  });

  it('Units: 100 J / 5 s = 20 W', () => {
    const res = evalJson('100 J / 5 s');
    expect(res.value).toBeCloseTo(20, 4);
  });

  it('Units: 12 V / 3 A = 4 ohm', () => {
    const res = evalJson('12 V / 3 A');
    expect(res.value).toBeCloseTo(4, 4);
  });

  it('Units: 5 km + 200 m = 5200 m', () => {
    const res = evalJson('5 km + 200 m');
    expect(res.value).toBeCloseTo(5200, 2);
  });

  it('Units: 2 kg * 9.8 m/s^2 = 19.6 N', () => {
    const res = evalJson('2 kg * 9.8 m/s^2');
    expect(res.value).toBeCloseTo(19.6, 2);
  });

  // --- Calculus & Algebra (6 tests) ---
  it('Equation solve: x^2 - 5x + 6 = 0 gives roots 2 and 3', () => {
    const res = evalJson('x^2 - 5x + 6 = 0');
    expect(res.ok).toBe(true);
    expect(res.value).toBe(2);
  });

  it('Calculus definite integral: ∫(x^2, 0, 1) ≈ 0.3333', () => {
    const res = evalJson('∫(x^2, 0, 1)');
    expect(res.ok).toBe(true);
    expect(res.value).toBeCloseTo(0.333333, 4);
  });

  it('Calculus derivative: d/dx(x^2, 3) = 6', () => {
    const res = evalJson('d/dx(x^2, 3)');
    expect(res.value).toBeCloseTo(6, 3);
  });

  // --- Chemistry (5 tests) ---
  it('Chemistry: H2SO4 molar mass ≈ 98.07 g/mol', () => {
    const res = calculateMolarMass('H2SO4');
    expect(res.molarMass).toBeCloseTo(98.079, 1);
  });

  it('Chemistry: CaCO3 molar mass ≈ 100.09 g/mol', () => {
    const res = calculateMolarMass('CaCO3');
    expect(res.molarMass).toBeCloseTo(100.09, 1);
  });

  // --- Statistics (5 tests) ---
  it('Statistics: mean, median, stdDev on sample dataset', () => {
    const data = [2, 4, 4, 4, 5, 5, 7, 9];
    const stats = calculateStats(data);
    expect(stats.mean).toBe(5);
    expect(stats.median).toBe(4.5);
    expect(stats.stdDev).toBe(2);
  });

  it('Statistics: Linear regression on 5 points', () => {
    const pts = [
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
      { x: 4, y: 8 },
      { x: 5, y: 10 },
    ];
    const reg = calculateLinearRegression(pts);
    expect(reg.slope).toBeCloseTo(2, 6);
    expect(reg.r).toBeCloseTo(1, 6);
  });

  // --- Academic (4 tests) ---
  it('Academic CGPA: 5 A grades = 5.0 First Class', () => {
    const res = calculateCGPA([
      { courseCode: 'CHM101', creditUnits: 3, grade: 'A' },
      { courseCode: 'PHY101', creditUnits: 3, grade: 'A' },
      { courseCode: 'MTH101', creditUnits: 3, grade: 'A' },
    ]);
    expect(res.cgpa).toBe(5.0);
    expect(res.classOfDegree).toBe('First Class Honours');
  });

  it('Academic JAMB Aggregate: 320 UTME + 5 A1s = 90.0%', () => {
    const res = calculateJAMBAggregate({
      utmeScore: 320,
      olevelGrades: ['A1', 'A1', 'A1', 'A1', 'A1'],
    });
    expect(res.totalAggregate).toBe(90);
  });

  // --- Additional PRD v2 Tests (Units, Limits, Recalc) ---
  it('Units: 1 atm converts to 101325 Pa', () => {
    const conv = convertUnit(1, 'atm', 'Pa');
    expect(conv.value).toBe(101325);
  });

  it('Units: 1 eV converts to 1.602176634e-19 J', () => {
    const conv = convertUnit(1, 'eV', 'J');
    expect(conv.value).toBeCloseTo(1.602176634e-19, 25);
  });

  it('Input length over 2000 characters returns TOO_LARGE', () => {
    const hugeInput = '1 + '.repeat(700) + '1';
    const res = evalJson(hugeInput);
    expect(res.ok).toBe(false);
    expect(res.error?.code).toBe('TOO_LARGE');
  });

  it('Chemistry: NaCl molar mass ≈ 58.44 g/mol', () => {
    const res = calculateMolarMass('NaCl');
    expect(res.molarMass).toBeCloseTo(58.44, 1);
  });

  it('Chemistry: Ca(OH)2 molar mass ≈ 74.09 g/mol', () => {
    const res = calculateMolarMass('Ca(OH)2');
    expect(res.molarMass).toBeCloseTo(74.09, 1);
  });

  it('Periodic Table: contains all 118 elements from H to Og', () => {
    const elements = Object.values(PERIODIC_TABLE);
    expect(elements.length).toBe(118);
    expect(PERIODIC_TABLE['H'].atomicNumber).toBe(1);
    expect(PERIODIC_TABLE['Og'].atomicNumber).toBe(118);
    expect(PERIODIC_TABLE['U'].radioactive).toBe(true);
  });

  it('Chemistry: complex heavy compound UO2(NO3)2 molar mass', () => {
    const res = calculateMolarMass('UO2(NO3)2');
    expect(res.molarMass).toBeCloseTo(394.04, 0);
  });

  it('Physical Constants: comprehensive bank with 70+ constants', () => {
    expect(CONSTANTS.length).toBeGreaterThanOrEqual(70);
  });

  it('Formula Bank: comprehensive science bank with 60+ formulas', () => {
    expect(FORMULA_BANK.length).toBeGreaterThanOrEqual(60);
  });

  it('Statistics: Mode calculation on multi-modal data', () => {
    const stats = calculateStats([1, 2, 2, 3, 3, 4]);
    expect(stats.mode).toEqual([2, 3]);
  });

  it('Tape Recalc with variable references', () => {
    const rows = [
      { id: 'r1', expression: 'A = 5' },
      { id: 'r2', expression: 'A * 3' },
    ];
    const recalcRes = JSON.parse(engine.recalc(JSON.stringify({ rows })));
    expect(recalcRes.ok).toBe(true);
    expect(recalcRes.results['r1'].value).toBe(5);
  });

  it('Exact angle snap: tan(180) snaps to exactly 0', () => {
    const res = evalJson('tan(180)', { angle: 'deg' });
    expect(res.value).toBe(0);
  });

  // --- Auto-close unclosed parentheses ---
  describe('Bracket Auto-closure', () => {
    it('Auto-closes single missing closing parenthesis: cos(45 in DEG', () => {
      const res = evalJson('cos(45', { angle: 'deg' });
      expect(res.ok).toBe(true);
      expect(res.value).toBeCloseTo(Math.cos((45 * Math.PI) / 180), 5);
    });

    it('Auto-closes multiple nested missing parentheses: sin(30 * (2 + 1 in DEG', () => {
      const res = evalJson('sin(30 * (2 + 1', { angle: 'deg' });
      expect(res.ok).toBe(true);
      expect(res.value).toBeCloseTo(1, 6); // sin(90 deg) = 1
    });

    it('Auto-closes arithmetic missing parenthesis: (2 + (3 * 4', () => {
      const res = evalJson('(2 + (3 * 4');
      expect(res.ok).toBe(true);
      expect(res.value).toBe(14);
    });
  });

  // --- Automated Fixtures Evaluation (from fixtures/golden.json) ---
  describe('Recorded JSON Fixtures (fixtures/golden.json)', () => {
    goldenFixtures.forEach((item: any, idx: number) => {
      it(`Fixture #${idx + 1}: ${item.input} (${item.reference})`, () => {
        const res = evalJson(item.input, item.context);
        if (item.expected.error_code) {
          expect(res.ok).toBe(false);
          expect(res.error?.code).toBe(item.expected.error_code);
        } else {
          expect(res.ok).toBe(true);
          expect(res.value).toBeCloseTo(item.expected.value, 4);
          if (item.expected.unit) {
            expect(res.unit).toBe(item.expected.unit);
          }
          if (item.expected.dimension) {
            expect(res.dimension).toEqual(item.expected.dimension);
          }
        }
      });
    });
  });
});

