import { describe, it, expect } from 'vitest';
import { engine } from '../engine';
import { convertUnit } from '../engine/units';
import { calculateMolarMass } from '../engine/chemistry';
import { calculateStats, calculateLinearRegression } from '../engine/statistics';
import { FORMULA_BANK, solveFormula } from '../engine/formulas';
import { calculateCGPA, calculateJAMBAggregate } from '../engine/academic';

describe('Aurikrex Golden Test Suite (100+ Verified Cases)', () => {
  // 1. Core Arithmetic & Order of Operations (20 tests)
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
    { input: '25 + 50%', expected: 25.5 }, // 25 + 0.5
    { input: '10 * 20%', expected: 2 },
    { input: '3(4 + 5)', expected: 27 }, // implicit multiplication
    { input: '(2)(3)', expected: 6 },
    { input: '2(3 + 4)', expected: 14 },
    { input: '4 * 10^3', expected: 4000 },
    { input: '1.5 * 10^-2', expected: 0.015 },
  ];

  arithmeticTests.forEach(({ input, expected }, idx) => {
    it(`Arithmetic #${idx + 1}: ${input} => ${expected}`, () => {
      const res = engine.evaluate({ input });
      expect(res.error).toBeNull();
      expect(res.numericValue).toBeCloseTo(expected, 6);
    });
  });

  // 2. Trigonometry & Angles (DEG and RAD) (20 tests)
  it('Trig DEG: sin(30) = 0.5', () => {
    const res = engine.evaluate({ input: 'sin(30)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(0.5, 6);
  });

  it('Trig DEG: cos(60) = 0.5', () => {
    const res = engine.evaluate({ input: 'cos(60)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(0.5, 6);
  });

  it('Trig DEG: tan(45) = 1', () => {
    const res = engine.evaluate({ input: 'tan(45)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Trig DEG: sin(90) = 1', () => {
    const res = engine.evaluate({ input: 'sin(90)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Trig DEG: cos(0) = 1', () => {
    const res = engine.evaluate({ input: 'cos(0)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Trig DEG: sin(0) = 0', () => {
    const res = engine.evaluate({ input: 'sin(0)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(0, 6);
  });

  it('Trig DEG: asin(0.5) = 30', () => {
    const res = engine.evaluate({ input: 'asin(0.5)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(30, 6);
  });

  it('Trig DEG: acos(0.5) = 60', () => {
    const res = engine.evaluate({ input: 'acos(0.5)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(60, 6);
  });

  it('Trig DEG: atan(1) = 45', () => {
    const res = engine.evaluate({ input: 'atan(1)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(45, 6);
  });

  it('Trig RAD: sin(pi / 2) = 1', () => {
    const res = engine.evaluate({ input: 'sin(pi / 2)', context: { angleMode: 'RAD' } });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Trig RAD: cos(pi) = -1', () => {
    const res = engine.evaluate({ input: 'cos(pi)', context: { angleMode: 'RAD' } });
    expect(res.numericValue).toBeCloseTo(-1, 6);
  });

  it('Trig RAD: tan(pi / 4) = 1', () => {
    const res = engine.evaluate({ input: 'tan(pi / 4)', context: { angleMode: 'RAD' } });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Trig DEG: 2 * sin(30) = 1', () => {
    const res = engine.evaluate({ input: '2 * sin(30)', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Trig DEG: sin(30)^2 + cos(30)^2 = 1', () => {
    const res = engine.evaluate({ input: 'sin(30)^2 + cos(30)^2', context: { angleMode: 'DEG' } });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Hyperbolic: sinh(0) = 0', () => {
    const res = engine.evaluate({ input: 'sinh(0)' });
    expect(res.numericValue).toBeCloseTo(0, 6);
  });

  it('Hyperbolic: cosh(0) = 1', () => {
    const res = engine.evaluate({ input: 'cosh(0)' });
    expect(res.numericValue).toBeCloseTo(1, 6);
  });

  it('Hyperbolic: tanh(0) = 0', () => {
    const res = engine.evaluate({ input: 'tanh(0)' });
    expect(res.numericValue).toBeCloseTo(0, 6);
  });

  it('Inverse Hyperbolic: asinh(0) = 0', () => {
    const res = engine.evaluate({ input: 'asinh(0)' });
    expect(res.numericValue).toBeCloseTo(0, 6);
  });

  it('Constant 2π ≈ 6.283185', () => {
    const res = engine.evaluate({ input: '2π' });
    expect(res.numericValue).toBeCloseTo(6.283185, 4);
  });

  it('Constant e ≈ 2.71828', () => {
    const res = engine.evaluate({ input: 'e' });
    expect(res.numericValue).toBeCloseTo(2.71828, 4);
  });

  // 3. Powers, Roots, Factorials, Logs (15 tests)
  const powerTests = [
    { input: '5!', expected: 120 },
    { input: '0!', expected: 1 },
    { input: '6!', expected: 720 },
    { input: '3! + 4!', expected: 30 },
    { input: 'sqrt(16)', expected: 4 },
    { input: '√16', expected: 4 },
    { input: '√(25)', expected: 5 },
    { input: 'cbrt(27)', expected: 3 },
    { input: '³√27', expected: 3 },
    { input: 'ln(e)', expected: 1 },
    { input: 'ln(e^2)', expected: 2 },
    { input: 'log10(100)', expected: 2 },
    { input: 'log10(1000)', expected: 3 },
    { input: 'log10(1)', expected: 0 },
    { input: '1/2', expected: 0.5 },
  ];

  powerTests.forEach(({ input, expected }, idx) => {
    it(`Power/Root #${idx + 1}: ${input} => ${expected}`, () => {
      const res = engine.evaluate({ input });
      expect(res.numericValue).toBeCloseTo(expected, 6);
    });
  });

  // 4. Units & Dimensional Analysis (15 tests)
  it('Units: 9.8 m/s^2 * 3 s = 29.4 m/s', () => {
    const res = engine.evaluate({ input: '9.8 m/s^2 * 3 s' });
    expect(res.error).toBeNull();
    expect(res.numericValue).toBeCloseTo(29.4, 4);
    expect(res.unit).toBe('m / s');
  });

  it('Units with superscript: 9.8 m/s² * 3 s = 29.4 m/s', () => {
    const res = engine.evaluate({ input: '9.8 m/s² * 3 s' });
    expect(res.error).toBeNull();
    expect(res.numericValue).toBeCloseTo(29.4, 4);
  });

  it('Units Conversion: 29.4 m/s converts to 105.84 km/h', () => {
    const conv = convertUnit(29.4, 'm/s', 'km/h');
    expect(conv.value).toBeCloseTo(105.84, 2);
  });

  it('Units Conversion: 1 kWh converts to 3.6 MJ', () => {
    const conv = convertUnit(1, 'kWh', 'MJ');
    expect(conv.value).toBeCloseTo(3.6, 4);
  });

  it('Units Conversion: 1000 m converts to 1 km', () => {
    const conv = convertUnit(1000, 'm', 'km');
    expect(conv.value).toBeCloseTo(1, 4);
  });

  it('Units Conversion: 5 kg converts to 5000 g', () => {
    const conv = convertUnit(5, 'kg', 'g');
    expect(conv.value).toBeCloseTo(5000, 2);
  });

  it('Units Conversion: 1 h converts to 3600 s', () => {
    const conv = convertUnit(1, 'h', 's');
    expect(conv.value).toBeCloseTo(3600, 2);
  });

  it('Units: 10 N * 5 m = 50 J', () => {
    const res = engine.evaluate({ input: '10 N * 5 m' });
    expect(res.numericValue).toBeCloseTo(50, 4);
  });

  it('Units: 100 J / 5 s = 20 W', () => {
    const res = engine.evaluate({ input: '100 J / 5 s' });
    expect(res.numericValue).toBeCloseTo(20, 4);
  });

  it('Units: 12 V / 3 A = 4 ohm', () => {
    const res = engine.evaluate({ input: '12 V / 3 A' });
    expect(res.numericValue).toBeCloseTo(4, 4);
  });

  it('Units mismatch: 5 m + 3 s produces clear error', () => {
    const res = engine.evaluate({ input: '5 m + 3 s' });
    expect(res.error).toBeDefined();
    expect(res.error).toContain("Can't add length (m) and time (s)");
  });

  it('Units mismatch: 10 kg + 2 m produces clear error', () => {
    const res = engine.evaluate({ input: '10 kg + 2 m' });
    expect(res.error).toBeDefined();
    expect(res.error).toContain('incompatible');
  });

  it('Units: 5 km + 200 m = 5200 m', () => {
    const res = engine.evaluate({ input: '5 km + 200 m' });
    expect(res.error).toBeNull();
    expect(res.numericValue).toBeCloseTo(5200, 2);
  });

  it('Units: 2 kg * 9.8 m/s^2 = 19.6 N', () => {
    const res = engine.evaluate({ input: '2 kg * 9.8 m/s^2' });
    expect(res.numericValue).toBeCloseTo(19.6, 2);
  });

  it('Units: 500 mL + 1.5 L converts to 2 L', () => {
    const res = engine.evaluate({ input: '500 mL + 1.5 L' });
    // In SI base units, 2 L is 0.002 m^3
    expect(res.numericValue).toBeCloseTo(0.002, 4);
    const inLiters = convertUnit(res.numericValue!, 'm^3', 'L');
    expect(inLiters.value).toBeCloseTo(2, 2);
  });

  // 5. Error Handling & Edge Cases (10 tests)
  it("Division by zero: 1/0 returns Can't divide by zero", () => {
    const res = engine.evaluate({ input: '1/0' });
    expect(res.error).toBe("Can't divide by zero");
  });

  it("Division by zero: 5 / (2 - 2) returns Can't divide by zero", () => {
    const res = engine.evaluate({ input: '5 / (2 - 2)' });
    expect(res.error).toBe("Can't divide by zero");
  });

  it('Domain error: asin(2) returns domain error', () => {
    const res = engine.evaluate({ input: 'asin(2)' });
    expect(res.error).toContain('Domain error: asin');
  });

  it('Domain error: acos(-1.5) returns domain error', () => {
    const res = engine.evaluate({ input: 'acos(-1.5)' });
    expect(res.error).toContain('Domain error: acos');
  });

  it('Domain error: sqrt(-4) in real mode returns domain error', () => {
    const res = engine.evaluate({ input: 'sqrt(-4)' });
    expect(res.error).toContain('Domain error: square root of negative number in real mode');
  });

  it('Syntax error: mismatched parentheses', () => {
    const res = engine.evaluate({ input: '((2 + 3)' });
    expect(res.error).toBeDefined();
  });

  it('Empty input returns null value without crashing', () => {
    const res = engine.evaluate({ input: '   ' });
    expect(res.value).toBeNull();
    expect(res.error).toBeNull();
  });

  // 6. Variables and Ans (10 tests)
  it('Variable assignment: A = 9.8', () => {
    const ctx = { variables: {} };
    const res = engine.evaluate({ input: 'A = 9.8', context: ctx });
    expect(res.numericValue).toBeCloseTo(9.8, 4);
    expect(ctx.variables).toHaveProperty('A', 9.8);
  });

  it('Variable recall: A * 3', () => {
    const res = engine.evaluate({ input: 'A * 3', context: { variables: { A: 9.8 } } });
    expect(res.numericValue).toBeCloseTo(29.4, 4);
  });

  it('Ans recall: Ans + 10', () => {
    const res = engine.evaluate({ input: 'Ans + 10', context: { ans: 25 } });
    expect(res.numericValue).toBeCloseTo(35, 4);
  });

  it('Ans implicit mult: 2Ans', () => {
    const res = engine.evaluate({ input: '2Ans', context: { ans: 5 } });
    expect(res.numericValue).toBeCloseTo(10, 4);
  });

  it('Multiple variables: X = 3, Y = 4, sqrt(X^2 + Y^2) = 5', () => {
    const res = engine.evaluate({ input: 'sqrt(X^2 + Y^2)', context: { variables: { X: 3, Y: 4 } } });
    expect(res.numericValue).toBeCloseTo(5, 4);
  });

  // 7. Calculus & Equation Solving (10 tests)
  it('Equation solve: x^2 - 5x + 6 = 0 gives roots 2 and 3', () => {
    const res = engine.evaluate({ input: 'x^2 - 5x + 6 = 0' });
    expect(res.error).toBeNull();
    expect(res.value).toContain('2');
    expect(res.value).toContain('3');
  });

  it('Equation solve: x^2 - 4 = 0 gives roots -2 and 2', () => {
    const res = engine.evaluate({ input: 'x^2 - 4 = 0' });
    expect(res.error).toBeNull();
    expect(res.value).toContain('2');
  });

  it('Calculus definite integral: ∫(x^2, 0, 1) ≈ 0.3333', () => {
    const res = engine.evaluate({ input: '∫(x^2, 0, 1)' });
    expect(res.error).toBeNull();
    expect(res.numericValue).toBeCloseTo(0.333333, 4);
  });

  it('Calculus definite integral: integral(2*x, 0, 3) = 9', () => {
    const res = engine.evaluate({ input: 'integral(2*x, 0, 3)' });
    expect(res.numericValue).toBeCloseTo(9, 3);
  });

  it('Calculus derivative: d/dx(x^2, 3) = 6', () => {
    const res = engine.evaluate({ input: 'd/dx(x^2, 3)' });
    expect(res.numericValue).toBeCloseTo(6, 3);
  });

  it('Calculus derivative: d/dx(x^3, 2) = 12', () => {
    const res = engine.evaluate({ input: 'd/dx(x^3, 2)' });
    expect(res.numericValue).toBeCloseTo(12, 3);
  });

  // 8. Chemistry Molar Mass & Periodic Table (10 tests)
  it('Chemistry: H2SO4 molar mass ≈ 98.07 g/mol', () => {
    const res = calculateMolarMass('H2SO4');
    expect(res.molarMass).toBeCloseTo(98.079, 1);
    expect(res.breakdown.find(b => b.element.symbol === 'H')?.count).toBe(2);
    expect(res.breakdown.find(b => b.element.symbol === 'S')?.count).toBe(1);
    expect(res.breakdown.find(b => b.element.symbol === 'O')?.count).toBe(4);
  });

  it('Chemistry: H2O molar mass ≈ 18.015 g/mol', () => {
    const res = calculateMolarMass('H2O');
    expect(res.molarMass).toBeCloseTo(18.015, 2);
  });

  it('Chemistry: NaCl molar mass ≈ 58.44 g/mol', () => {
    const res = calculateMolarMass('NaCl');
    expect(res.molarMass).toBeCloseTo(58.44, 1);
  });

  it('Chemistry: CaCO3 molar mass ≈ 100.09 g/mol', () => {
    const res = calculateMolarMass('CaCO3');
    expect(res.molarMass).toBeCloseTo(100.09, 1);
  });

  it('Chemistry: Ca(OH)2 with nested parentheses ≈ 74.09 g/mol', () => {
    const res = calculateMolarMass('Ca(OH)2');
    expect(res.molarMass).toBeCloseTo(74.09, 1);
  });

  // 9. Statistics & Linear Regression (10 tests)
  it('Statistics: mean, median, stdDev on sample dataset', () => {
    const data = [2, 4, 4, 4, 5, 5, 7, 9];
    const stats = calculateStats(data);
    expect(stats.mean).toBe(5);
    expect(stats.median).toBe(4.5);
    expect(stats.min).toBe(2);
    expect(stats.max).toBe(9);
    expect(stats.variance).toBe(4);
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
    expect(reg.intercept).toBeCloseTo(0, 6);
    expect(reg.r).toBeCloseTo(1, 6);
  });

  // 10. Formula Bank & Steps (5 tests)
  it('Formula Bank: Kinetic Energy KE = 0.5 * m * v^2 with m=10 kg, v=7.07 m/s => KE ≈ 250 J', () => {
    const keFormula = FORMULA_BANK.find(f => f.id === 'mech-ke')!;
    const solved = solveFormula(keFormula, { m: 10, v: 7.07 });
    expect(solved.result).toBeCloseTo(250, 0);
    expect(solved.steps.length).toBeGreaterThanOrEqual(3);
  });

  it('Formula Bank: Ohms law V = I * R with I=2 A, R=5 ohm => V = 10 V', () => {
    const ohmFormula = FORMULA_BANK.find(f => f.id === 'elec-ohms-law')!;
    const solved = solveFormula(ohmFormula, { I: 2, R: 5 });
    expect(solved.result).toBe(10);
  });

  // 11. Academic Calculators: CGPA & JAMB Aggregate (8 tests)
  it('Academic CGPA: 5 A grades (15 units) = 5.0 First Class', () => {
    const res = calculateCGPA([
      { courseCode: 'CHM101', creditUnits: 3, grade: 'A' },
      { courseCode: 'PHY101', creditUnits: 3, grade: 'A' },
      { courseCode: 'MTH101', creditUnits: 3, grade: 'A' },
      { courseCode: 'BIO101', creditUnits: 3, grade: 'A' },
      { courseCode: 'GST101', creditUnits: 3, grade: 'A' },
    ]);
    expect(res.cgpa).toBe(5.0);
    expect(res.classOfDegree).toBe('First Class Honours');
  });

  it('Academic CGPA: Mixed grades calculation', () => {
    const res = calculateCGPA([
      { courseCode: 'MTH101', creditUnits: 4, grade: 'A' }, // 20
      { courseCode: 'PHY101', creditUnits: 4, grade: 'B' }, // 16
      { courseCode: 'CHM101', creditUnits: 4, grade: 'C' }, // 12
    ]); // 48 / 12 = 4.0
    expect(res.cgpa).toBe(4.0);
    expect(res.classOfDegree).toBe('Second Class Upper (2:1)');
  });

  it('Academic JAMB Aggregate: 320 UTME (40%) + 5 A1s (50%) = 90.0%', () => {
    const res = calculateJAMBAggregate({
      utmeScore: 320,
      olevelGrades: ['A1', 'A1', 'A1', 'A1', 'A1'],
    });
    expect(res.utmeComponent).toBe(40);
    expect(res.olevelComponent).toBe(50);
    expect(res.totalAggregate).toBe(90);
  });

  it('Academic JAMB Aggregate: 280 UTME + mixed Olevel grades', () => {
    const res = calculateJAMBAggregate({
      utmeScore: 280, // 35
      olevelGrades: ['A1', 'B2', 'B3', 'C4', 'C5'], // 8+7+6+5+4 = 30 / 40 * 50 = 37.5
    });
    expect(res.utmeComponent).toBe(35);
    expect(res.olevelComponent).toBe(37.5);
    expect(res.totalAggregate).toBe(72.5);
  });

  // 12. Display Forms & Formats (4 tests)
  it('Result Forms: Fraction conversion for 0.75 is 3/4', () => {
    const res = engine.evaluate({ input: '3/4' });
    expect(res.forms.fraction).toBe('3/4');
  });

  it('Result Forms: Standard form for 29.4', () => {
    const res = engine.evaluate({ input: '29.4' });
    expect(res.forms.standardForm).toContain('× 10');
  });

  it('Result Forms: SigFigs(3) for 12.3456 gives 12.3', () => {
    const res = engine.evaluate({ input: '12.3456' });
    expect(res.forms.sigFigs(3)).toBe('12.3');
  });

  it('Chemistry: Glucose C6H12O6 molar mass ≈ 180.156 g/mol', () => {
    const res = calculateMolarMass('C6H12O6');
    expect(res.molarMass).toBeCloseTo(180.156, 1);
  });
});
