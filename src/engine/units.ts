// Aurikrex Calc Units & Dimensional Analysis Engine (PRD v2 Section 4A & 7)
import { all, create } from 'mathjs';
import { Dimension, DIMENSIONS } from './contract';

const math = create(all);

try {
  math.createUnit('atm', '101325 Pa', { override: true });
  math.createUnit('eV', '1.602176634e-19 J', { override: true });
  math.createUnit('kWh', '3.6e6 J', { override: true });
} catch {}

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
  res = res.replace(/(?:³|\u00B3)(?!√)/g, '^3');
  res = res.replace(/²|\u00B2/g, '^2');
  res = res.replace(/⁴|\u2074/g, '^4');
  res = res.replace(/⁻¹|\u207B\u00B9/g, '^-1');
  res = res.replace(/⁻²|\u207B\u00B2/g, '^-2');
  res = res.replace(/⁻³|\u207B\u00B3/g, '^-3');
  res = res.replace(/Ω/g, 'ohm');
  res = res.replace(/μ/g, 'u');
  res = res.replace(/°C/g, 'degC');
  return res;
}

/**
 * Format mathjs unit nicely to display string
 */
export function formatUnit(u: any): string {
  if (!u) return '';
  if (typeof u === 'string') return u;
  try {
    let simplified = u.simplify ? u.simplify() : u;
    let str = simplified.formatUnits();
    str = str.replace(/\(m s\)\s*\/\s*s\^2/g, 'm/s');
    str = str.replace(/m\s*\/\s*s/g, 'm/s');
    str = str.replace(/ohm/g, 'Ω');
    return str;
  } catch (e) {
    return String(u);
  }
}

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
