// Aurikrex Calc Units & Dimensional Analysis Engine (PRD v2 Section 4A & 7)
import { all, create } from 'mathjs';
import { Dimension, DIMENSIONS } from './contract';

const math = create(all);

/**
 * Register the named SI units that Math.js does not ship with, plus the
 * accepted and widely used physics/chemistry extensions. Semantic units such
 * as Gy and Sv are deliberately registered separately even though both reduce
 * dimensionally to m²/s².
 */
export function registerScienceUnits(target: any): void {
  const definitions: Array<[string, string]> = [
    // Remaining SI derived units with special names.
    ['sr', '1'],
    ['lm', '1 cd'],
    ['lx', '1 cd/m^2'],
    ['Bq', '1/s'],
    ['Gy', '1 m^2/s^2'],
    ['Sv', '1 m^2/s^2'],
    ['kat', '1 mol/s'],

    // Accepted or established non-SI units used in physics and chemistry.
    ['atm', '101325 Pa'],
    ['eV', '1.602176634e-19 J'],
    ['kWh', '3.6e6 J'],
    ['Da', '1.66053906660e-27 kg'],
    ['ua', '149597870700 m'],
    ['angstrom', '1e-10 m'],
    ['barn', '1e-28 m^2'],
    ['bar', '1e5 Pa'],
    ['mmHg', '133.322387415 Pa'],

    // Common CGS and legacy laboratory units.
    ['dyn', '1e-5 N'],
    ['erg', '1e-7 J'],
    ['P', '0.1 Pa s'],
    ['St', '1e-4 m^2/s'],
    ['Gal', '0.01 m/s^2'],

    // Atomic-unit anchors useful in spectroscopy and quantum chemistry.
    ['bohr', '5.29177210903e-11 m'],
    ['hartree', '4.3597447222071e-18 J'],
  ];

  for (const [name, definition] of definitions) {
    try {
      target.createUnit(name, definition, { override: true });
    } catch {}
  }
}

registerScienceUnits(math);

export interface UnitCategory {
  name: string;
  dimensionName: string;
  chips: string[];
  baseUnit: string;
}

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    name: 'Length',
    dimensionName: 'length',
    chips: ['m', 'cm', 'mm', 'km', 'nm', 'um'],
    baseUnit: 'm',
  },
  {
    name: 'Mass',
    dimensionName: 'mass',
    chips: ['kg', 'g', 'mg', 't'],
    baseUnit: 'kg',
  },
  {
    name: 'Time',
    dimensionName: 'time',
    chips: ['s', 'ms', 'min', 'h', 'day'],
    baseUnit: 's',
  },
  {
    name: 'Force',
    dimensionName: 'force',
    chips: ['N', 'kN', 'mN'],
    baseUnit: 'N',
  },
  {
    name: 'Energy',
    dimensionName: 'energy',
    chips: ['J', 'kJ', 'MJ', 'eV', 'kWh', 'cal'],
    baseUnit: 'J',
  },
  {
    name: 'Electric',
    dimensionName: 'electric',
    chips: ['V', 'A', 'ohm', 'W', 'kW', 'C', 'F'],
    baseUnit: 'V',
  },
];

export const COMPATIBLE_CONVERSIONS: Record<string, string[]> = {
  'm/s': ['m/s', 'km/h', 'mph'],
  'km/h': ['km/h', 'm/s', 'mph'],
  'm': ['m', 'cm', 'mm', 'km'],
  'cm': ['cm', 'm', 'mm', 'km'],
  'mm': ['mm', 'cm', 'm', 'km'],
  'km': ['km', 'm', 'cm'],
  'kg': ['kg', 'g', 'mg', 't'],
  'g': ['g', 'kg', 'mg'],
  'mg': ['mg', 'g', 'kg'],
  's': ['s', 'ms', 'min', 'h'],
  'min': ['min', 's', 'h'],
  'h': ['h', 'min', 's'],
  'N': ['N', 'kN', 'mN'],
  'kN': ['kN', 'N'],
  'J': ['J', 'kJ', 'MJ', 'eV', 'kWh', 'cal'],
  'kJ': ['kJ', 'J', 'MJ', 'kWh'],
  'MJ': ['MJ', 'kJ', 'J', 'kWh'],
  'kWh': ['kWh', 'MJ', 'kJ', 'J'],
  'eV': ['eV', 'J', 'kJ'],
  'Pa': ['Pa', 'kPa', 'bar', 'atm', 'mmHg'],
  'atm': ['atm', 'Pa', 'kPa', 'bar'],
  'V': ['V', 'mV', 'kV'],
  'A': ['A', 'mA', 'kA'],
  'W': ['W', 'kW', 'MW'],
  'ohm': ['ohm', 'kohm', 'Mohm'],
  'L': ['L', 'mL', 'm^3', 'cm^3'],
};

/**
 * Normalise superscripts and Unicode unit symbols in input strings:
 * ² -> ^2, ³ -> ^3, ⁴ -> ^4, ⁻¹ -> ^-1, etc.
 * Ω -> ohm
 */
export function normalizeUnitTokens(input: string): string {
  let res = input;
  // People commonly omit the multiplication dot in compound units. Keep this
  // deliberately narrow so km (kilometre) and other valid unit tokens remain
  // unambiguous: kgm/s² becomes kg*m/s².
  res = res.replace(/\b[Kk]gm(?=\s*(?:\^?[²³⁴]|[/*)]|$))/g, 'kg*m');
  res = res.replace(/(?:³|\u00B3)(?!√)/g, '^3');
  res = res.replace(/²|\u00B2/g, '^2');
  res = res.replace(/⁴|\u2074/g, '^4');
  res = res.replace(/⁻¹|\u207B\u00B9/g, '^-1');
  res = res.replace(/⁻²|\u207B\u00B2/g, '^-2');
  res = res.replace(/⁻³|\u207B\u00B3/g, '^-3');
  res = res.replace(/Ω/g, 'ohm');
  res = res.replace(/μ/g, 'u');
  res = res.replace(/°C/g, 'degC');
  // Common scientific aliases that are not safe to register globally in
  // Math.js because they collide with variables or prefix syntax.
  res = res.replace(/\b(?:dalton|amu)\b/gi, 'Da');
  res = res.replace(/Å/g, 'angstrom');
  res = res.replace(/\b(?:AU|au|astronomical\s+unit)\b/g, 'ua');
  res = res.replace(/\bdyne\b/gi, 'dyn');
  res = res.replace(/\bcalorie\b/gi, 'cal');
  return res;
}

/**
 * Format mathjs unit nicely to display string
 */
export function formatUnit(u: any): string {
  if (!u) return '';
  if (typeof u === 'string') return u;
  try {
    // Do not call Unit.simplify() here. Math.js may choose a convenient but
    // surprising equivalent such as kWh for a result that should display as J.
    const unitObj = u;
    let str = unitObj.formatUnits();
    const derived = DERIVED_UNIT_BY_DIMENSION[getUnitDimension(unitObj).join(',')];
    // Composite SI dimensions are easier to read as their named derived unit:
    // kg·m/s² → N, kg·m²/s² → J, kg·m²/s³ → W, and so on. Explicit units such
    // as kN already have a named format and are intentionally left unchanged.
    if (derived && !/^[A-Za-zΩ]+$/.test(str.trim())) return derived;
    str = str.replace(/\(m s\)\s*\/\s*s\^2/g, 'm/s');
    str = str.replace(/m\s*\/\s*s/g, 'm/s');
    str = str.replace(/ohm/g, 'Ω');
    return str;
  } catch (e) {
    return String(u);
  }
}

/** Canonical SI derived units, keyed by [L, M, T, I, Θ, N, J]. */
const DERIVED_UNIT_BY_DIMENSION: Record<string, string> = {
  '0,0,-1,0,0,0,0': 'Hz',
  '1,1,-2,0,0,0,0': 'N',
  '-1,1,-2,0,0,0,0': 'Pa',
  '2,1,-2,0,0,0,0': 'J',
  '2,1,-3,0,0,0,0': 'W',
  '0,0,1,1,0,0,0': 'C',
  '2,1,-3,-1,0,0,0': 'V',
  '2,1,-3,-2,0,0,0': 'Ω',
  '-2,-1,3,2,0,0,0': 'S',
  '2,1,-2,-1,0,0,0': 'Wb',
  '0,1,-2,-1,0,0,0': 'T',
  '2,1,-2,-2,0,0,0': 'H',
  '-2,-1,4,2,0,0,0': 'F',
};

/**
 * Extract 7-integer SI Dimension array:
 * [length, mass, time, current, temperature, amount, luminous_intensity]
 */
export function getUnitDimension(u: any): Dimension {
  if (!u) return [0, 0, 0, 0, 0, 0, 0];
  try {
    const unitObj = typeof u === 'string' ? math.unit(normalizeUnitTokens(u)) : u;
    const dims = unitObj.dimensions;
    if (Array.isArray(dims) && dims.length >= 7) {
      // PRD v2 Section 4A order: [length, mass, time, current, temperature, amount, luminous intensity]
      return [
        Math.round(dims[1] || 0), // length
        Math.round(dims[0] || 0), // mass
        Math.round(dims[2] || 0), // time
        Math.round(dims[3] || 0), // current
        Math.round(dims[4] || 0), // temperature
        Math.round(dims[6] || 0), // amount
        Math.round(dims[5] || 0), // luminous intensity
      ];
    }
  } catch {}
  return [0, 0, 0, 0, 0, 0, 0];
}

/**
 * Convert value with fromUnit to toUnit using mathjs
 */
export function convertUnit(value: number, fromUnit: string, toUnit: string): { value: number; formatted: string } {
  const normFrom = normalizeUnitTokens(fromUnit);
  const normTo = normalizeUnitTokens(toUnit);
  try {
    const valWithUnit = math.unit(value, normFrom);
    const converted = valWithUnit.to(normTo);
    return {
      value: converted.toNumber(),
      formatted: `${converted.toNumber()} ${toUnit}`,
    };
  } catch (err: any) {
    throw new Error(`Cannot convert ${fromUnit} to ${toUnit}: ${err.message}`);
  }
}

/**
 * Get dimension description for error reporting
 */
export function describeUnitDimension(u: any): string {
  if (!u) return 'dimensionless';
  try {
    const unitObj = typeof u === 'string' ? math.unit(normalizeUnitTokens(u)) : u;
    const dims = unitObj.dimensions;
    if (dims[0] === 1 && dims[1] === 0 && dims[2] === 0) return 'length (m)';
    if (dims[0] === 0 && dims[1] === 1 && dims[2] === 0) return 'mass (kg)';
    if (dims[0] === 0 && dims[1] === 0 && dims[2] === 1) return 'time (s)';
    if (dims[0] === 1 && dims[1] === 1 && dims[2] === -2) return 'force (N)';
    if (dims[0] === 2 && dims[1] === 1 && dims[2] === -2) return 'energy (J)';
    if (dims[0] === 1 && dims[1] === 0 && dims[2] === -1) return 'velocity (m/s)';
    if (dims[0] === 1 && dims[1] === 0 && dims[2] === -2) return 'acceleration (m/s²)';
    return unitObj.formatUnits();
  } catch {
    return 'unknown dimension';
  }
}
