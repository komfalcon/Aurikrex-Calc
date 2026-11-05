// Aurikrex Science Constants Library

export interface PhysicalConstant {
  symbol: string;
  name: string;
  value: number;
  unit: string;
  expression: string;
  description: string;
}

export const CONSTANTS: PhysicalConstant[] = [
  {
    symbol: 'g',
    name: 'Standard Gravity',
    value: 9.80665,
    unit: 'm/s^2',
    expression: '9.80665 m/s^2',
    description: 'Acceleration due to gravity at Earth sea level',
  },
  {
    symbol: 'c',
    name: 'Speed of Light',
    value: 299792458,
    unit: 'm/s',
    expression: '299792458 m/s',
    description: 'Speed of light in vacuum',
  },
  {
    symbol: 'h',
    name: 'Planck Constant',
    value: 6.62607015e-34,
    unit: 'J s',
    expression: '6.62607015e-34 J s',
    description: 'Quantum of electromagnetic action',
  },
  {
    symbol: 'N_A',
    name: 'Avogadro Constant',
    value: 6.02214076e23,
    unit: 'mol^-1',
    expression: '6.02214076e23 mol^-1',
    description: 'Number of constituent particles per mole',
  },
  {
    symbol: 'R',
    name: 'Molar Gas Constant',
    value: 8.314462618,
    unit: 'J/(mol K)',
    expression: '8.314462618 J/(mol K)',
    description: 'Universal gas constant',
  },
  {
    symbol: 'k_B',
    name: 'Boltzmann Constant',
    value: 1.380649e-23,
    unit: 'J/K',
    expression: '1.380649e-23 J/K',
    description: 'Relates thermal energy to temperature',
  },
  {
    symbol: 'e',
    name: 'Elementary Charge',
    value: 1.602176634e-19,
    unit: 'C',
    expression: '1.602176634e-19 C',
    description: 'Electric charge carried by a single proton',
  },
  {
    symbol: 'G',
    name: 'Gravitational Constant',
    value: 6.6743e-11,
    unit: 'N m^2/kg^2',
    expression: '6.6743e-11 N m^2/kg^2',
    description: 'Newtonian gravitational constant',
  },
  {
    symbol: 'ε_0',
    name: 'Vacuum Permittivity',
    value: 8.8541878128e-12,
    unit: 'F/m',
    expression: '8.8541878128e-12 F/m',
    description: 'Permittivity of free space',
  },
  {
    symbol: 'μ_0',
    name: 'Vacuum Permeability',
    value: 1.25663706212e-6,
    unit: 'N/A^2',
    expression: '1.25663706212e-6 N/A^2',
    description: 'Magnetic permeability of free space',
  },
  {
    symbol: 'm_e',
    name: 'Electron Mass',
    value: 9.1093837015e-31,
    unit: 'kg',
    expression: '9.1093837015e-31 kg',
    description: 'Rest mass of an electron',
  },
  {
    symbol: 'm_p',
    name: 'Proton Mass',
    value: 1.67262192369e-27,
    unit: 'kg',
    expression: '1.67262192369e-27 kg',
    description: 'Rest mass of a proton',
  },
];
