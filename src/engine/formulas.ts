// Aurikrex Formula Bank (FR-22, FR-23, FR-24)
import { FormulaDefinition, StepItem } from './types';

export const FORMULA_BANK: FormulaDefinition[] = [
  // Mechanics
  {
    id: 'mech-ke',
    name: 'Kinetic Energy',
    topic: 'Mechanics',
    expression: 'KE = 0.5 * m * v^2',
    solveTarget: 'KE',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'v', name: 'Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'KE', name: 'Kinetic Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Translational kinetic energy of a point mass',
  },
  {
    id: 'mech-f-ma',
    name: "Newton's Second Law",
    topic: 'Mechanics',
    expression: 'F = m * a',
    solveTarget: 'F',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'a', name: 'Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'F', name: 'Net Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Net force equals mass times acceleration',
  },
  {
    id: 'mech-momentum',
    name: 'Linear Momentum',
    topic: 'Mechanics',
    expression: 'p = m * v',
    solveTarget: 'p',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'v', name: 'Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'p', name: 'Momentum', dimension: 'momentum', defaultUnit: 'kg m/s' },
    ],
    notes: 'Linear momentum',
  },
  {
    id: 'mech-work',
    name: 'Work Done',
    topic: 'Mechanics',
    expression: 'W = F * d',
    solveTarget: 'W',
    variables: [
      { symbol: 'F', name: 'Force', dimension: 'force', defaultUnit: 'N' },
      { symbol: 'd', name: 'Displacement', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'W', name: 'Work', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Work done along line of action of force',
  },
  {
    id: 'mech-power',
    name: 'Power',
    topic: 'Mechanics',
    expression: 'P = W / t',
    solveTarget: 'P',
    variables: [
      { symbol: 'W', name: 'Work Done / Energy', dimension: 'energy', defaultUnit: 'J' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'P', name: 'Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Rate of doing work',
  },
  {
    id: 'mech-suvat-v',
    name: 'SUVAT: Velocity-Time',
    topic: 'Mechanics',
    expression: 'v = u + a * t',
    solveTarget: 'v',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'a', name: 'Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'v', name: 'Final Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Constant acceleration kinematic equation',
  },
  {
    id: 'mech-suvat-s',
    name: 'SUVAT: Displacement',
    topic: 'Mechanics',
    expression: 's = u * t + 0.5 * a * t^2',
    solveTarget: 's',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'a', name: 'Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 's', name: 'Displacement', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Displacement with constant acceleration',
  },
  {
    id: 'mech-grav-pe',
    name: 'Gravitational Potential Energy',
    topic: 'Mechanics',
    expression: 'PE = m * g * h',
    solveTarget: 'PE',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'g', name: 'Acceleration due to gravity', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'h', name: 'Height', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'PE', name: 'Potential Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Near Earth surface gravitational potential energy',
  },

  // Waves
  {
    id: 'wave-v-fl',
    name: 'Wave Speed Equation',
    topic: 'Waves',
    expression: 'v = f * lambda',
    solveTarget: 'v',
    variables: [
      { symbol: 'f', name: 'Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'lambda', name: 'Wavelength', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Wave Speed', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Relationship between wave speed, frequency and wavelength',
  },
  {
    id: 'wave-snell',
    name: "Snell's Law",
    topic: 'Waves',
    expression: 'n1 * sin(theta1) = n2 * sin(theta2)',
    solveTarget: 'n2',
    variables: [
      { symbol: 'n1', name: 'Refractive Index 1', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'theta1', name: 'Angle of Incidence (deg)', dimension: 'angle', defaultUnit: 'deg' },
      { symbol: 'n2', name: 'Refractive Index 2', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'theta2', name: 'Angle of Refraction (deg)', dimension: 'angle', defaultUnit: 'deg' },
    ],
    notes: 'Refraction across a planar boundary',
  },
  {
    id: 'wave-period-freq',
    name: 'Time Period & Frequency',
    topic: 'Waves',
    expression: 'T = 1 / f',
    solveTarget: 'T',
    variables: [
      { symbol: 'f', name: 'Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'T', name: 'Period', dimension: 'time', defaultUnit: 's' },
    ],
    notes: 'Reciprocal relation between period and frequency',
  },

  // Electricity
  {
    id: 'elec-ohms-law',
    name: "Ohm's Law",
    topic: 'Electricity',
    expression: 'V = I * R',
    solveTarget: 'V',
    variables: [
      { symbol: 'I', name: 'Current', dimension: 'electric', defaultUnit: 'A' },
      { symbol: 'R', name: 'Resistance', dimension: 'electric', defaultUnit: 'ohm' },
      { symbol: 'V', name: 'Potential Difference', dimension: 'electric', defaultUnit: 'V' },
    ],
    notes: "Voltage drop across an ohmic conductor",
  },
  {
    id: 'elec-power',
    name: 'Electrical Power',
    topic: 'Electricity',
    expression: 'P = V * I',
    solveTarget: 'P',
    variables: [
      { symbol: 'V', name: 'Voltage', dimension: 'electric', defaultUnit: 'V' },
      { symbol: 'I', name: 'Current', dimension: 'electric', defaultUnit: 'A' },
      { symbol: 'P', name: 'Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Electric power dissipation',
  },
  {
    id: 'elec-charge',
    name: 'Electric Charge',
    topic: 'Electricity',
    expression: 'Q = I * t',
    solveTarget: 'Q',
    variables: [
      { symbol: 'I', name: 'Current', dimension: 'electric', defaultUnit: 'A' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'Q', name: 'Charge', dimension: 'electric', defaultUnit: 'C' },
    ],
    notes: 'Charge delivered by steady current',
  },
  {
    id: 'elec-coulomb',
    name: "Coulomb's Law",
    topic: 'Electricity',
    expression: 'F = (8.98755e9 * q1 * q2) / r^2',
    solveTarget: 'F',
    variables: [
      { symbol: 'q1', name: 'Charge 1', dimension: 'electric', defaultUnit: 'C' },
      { symbol: 'q2', name: 'Charge 2', dimension: 'electric', defaultUnit: 'C' },
      { symbol: 'r', name: 'Separation', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Electrostatic Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Electrostatic force between two point charges',
  },

  // Thermal
  {
    id: 'therm-heat-capacity',
    name: 'Specific Heat Capacity',
    topic: 'Thermal',
    expression: 'Q = m * c * deltaT',
    solveTarget: 'Q',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'c', name: 'Specific Heat Capacity', dimension: 'heat_capacity', defaultUnit: 'J/(kg K)' },
      { symbol: 'deltaT', name: 'Temperature Change', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'Q', name: 'Heat Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Thermal energy transferred during temperature change',
  },
  {
    id: 'therm-latent-heat',
    name: 'Specific Latent Heat',
    topic: 'Thermal',
    expression: 'Q = m * L',
    solveTarget: 'Q',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'L', name: 'Latent Heat', dimension: 'latent_heat', defaultUnit: 'J/kg' },
      { symbol: 'Q', name: 'Heat Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Heat required for phase change at constant temperature',
  },

  // Moles and gas laws
  {
    id: 'gas-ideal',
    name: 'Ideal Gas Equation',
    topic: 'Moles and gas laws',
    expression: 'P * V = n * R * T',
    solveTarget: 'P',
    variables: [
      { symbol: 'n', name: 'Amount of Substance', dimension: 'amount', defaultUnit: 'mol' },
      { symbol: 'R', name: 'Gas Constant (8.314)', dimension: 'gas_const', defaultUnit: 'J/(mol K)' },
      { symbol: 'T', name: 'Absolute Temperature', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'V', name: 'Volume', dimension: 'volume', defaultUnit: 'm^3' },
      { symbol: 'P', name: 'Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
    ],
    notes: 'Ideal gas law PV = nRT',
  },
  {
    id: 'chem-mole-mass',
    name: 'Moles and Molar Mass',
    topic: 'Moles and gas laws',
    expression: 'n = m / M',
    solveTarget: 'n',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'g' },
      { symbol: 'M', name: 'Molar Mass', dimension: 'molar_mass', defaultUnit: 'g/mol' },
      { symbol: 'n', name: 'Moles', dimension: 'amount', defaultUnit: 'mol' },
    ],
    notes: 'Relates mass, molar mass, and mole quantity',
  },
  {
    id: 'chem-concentration',
    name: 'Molar Concentration',
    topic: 'Moles and gas laws',
    expression: 'c = n / V',
    solveTarget: 'c',
    variables: [
      { symbol: 'n', name: 'Moles of Solute', dimension: 'amount', defaultUnit: 'mol' },
      { symbol: 'V', name: 'Volume of Solution', dimension: 'volume', defaultUnit: 'L' },
      { symbol: 'c', name: 'Molarity', dimension: 'concentration', defaultUnit: 'mol/L' },
    ],
    notes: 'Molar concentration c = n/V',
  },

  // pH and equilibria
  {
    id: 'chem-ph',
    name: 'pH from [H+]',
    topic: 'pH and equilibria',
    expression: 'pH = -log10(H_plus)',
    solveTarget: 'pH',
    variables: [
      { symbol: 'H_plus', name: '[H+] Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'pH', name: 'pH Value', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'pH calculation from hydrogen ion concentration',
  },
  {
    id: 'chem-h-from-ph',
    name: '[H+] from pH',
    topic: 'pH and equilibria',
    expression: 'H_plus = 10^(-pH)',
    solveTarget: 'H_plus',
    variables: [
      { symbol: 'pH', name: 'pH Value', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'H_plus', name: '[H+] Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
    ],
    notes: 'Hydrogen ion concentration from pH',
  },

  // Genetics & Biology
  {
    id: 'bio-hardy-weinberg',
    name: 'Hardy-Weinberg Principle',
    topic: 'Genetics',
    expression: 'p^2 + 2*p*q + q^2 = 1',
    solveTarget: 'q',
    variables: [
      { symbol: 'p', name: 'Dominant Allele Frequency', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'q', name: 'Recessive Allele Frequency', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Allele and genotype frequencies in a non-evolving population (p + q = 1)',
  },
  {
    id: 'bio-magnification',
    name: 'Microscope Magnification',
    topic: 'Magnification',
    expression: 'M = I / A',
    solveTarget: 'M',
    variables: [
      { symbol: 'I', name: 'Image Size', dimension: 'length', defaultUnit: 'mm' },
      { symbol: 'A', name: 'Actual Size', dimension: 'length', defaultUnit: 'um' },
      { symbol: 'M', name: 'Magnification', dimension: 'dimensionless', defaultUnit: 'x' },
    ],
    notes: 'M = Image size / Actual size (ensure units match before dividing!)',
  },

  // Modern Physics
  {
    id: 'phys-photon-energy',
    name: 'Photon Energy',
    topic: 'Modern physics',
    expression: 'E = (6.62607e-34) * f',
    solveTarget: 'E',
    variables: [
      { symbol: 'f', name: 'Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'E', name: 'Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Planck relation E = h * f',
  },
  {
    id: 'phys-mass-energy',
    name: 'Mass-Energy Equivalence',
    topic: 'Modern physics',
    expression: 'E = m * (299792458)^2',
    solveTarget: 'E',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'E', name: 'Rest Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Einstein equation E = mc²',
  },

  // Mathematics
  {
    id: 'math-quadratic',
    name: 'Quadratic Discriminant',
    topic: 'Mathematics',
    expression: 'D = b^2 - 4 * a * c',
    solveTarget: 'D',
    variables: [
      { symbol: 'a', name: 'Coefficient a', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'b', name: 'Coefficient b', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'c', name: 'Coefficient c', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'D', name: 'Discriminant', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Determines nature of roots of ax² + bx + c = 0',
  },
];

/**
 * Solve a formula given known input variable values
 */
export function solveFormula(
  formula: FormulaDefinition,
  inputs: Record<string, number>
): { result: number; targetVar: string; steps: StepItem[] } {
  // Find unknown variable (the one not provided)
  const unknown = formula.variables.find((v) => inputs[v.symbol] === undefined || isNaN(inputs[v.symbol]));
  
  if (!unknown) {
    throw new Error('All variables already have values. Leave one blank to solve.');
  }

  const steps: StepItem[] = [
    { type: 'rule', text: `Formula: ${formula.name} (${formula.expression})` },
  ];

  let result = 0;
  const sym = unknown.symbol;

  if (formula.id === 'mech-ke') {
    if (sym === 'KE') {
      const m = inputs['m'];
      const v = inputs['v'];
      result = 0.5 * m * Math.pow(v, 2);
      steps.push({ type: 'substitution', text: `Substitute: KE = 0.5 × ${m} × (${v})²` });
      steps.push({ type: 'intermediate', text: `v² = ${(v * v).toFixed(4)}` });
      steps.push({ type: 'result', text: `KE = ${result.toFixed(4)} J` });
    } else if (sym === 'm') {
      const KE = inputs['KE'];
      const v = inputs['v'];
      result = (2 * KE) / Math.pow(v, 2);
      steps.push({ type: 'substitution', text: `Rearrange: m = 2·KE / v² = (2 × ${KE}) / (${v})²` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} kg` });
    } else if (sym === 'v') {
      const KE = inputs['KE'];
      const m = inputs['m'];
      result = Math.sqrt((2 * KE) / m);
      steps.push({ type: 'substitution', text: `Rearrange: v = √(2·KE / m) = √(2 × ${KE} / ${m})` });
      steps.push({ type: 'result', text: `v = ${result.toFixed(4)} m/s` });
    }
  } else if (formula.id === 'mech-f-ma') {
    if (sym === 'F') {
      result = inputs['m'] * inputs['a'];
      steps.push({ type: 'substitution', text: `F = ${inputs['m']} × ${inputs['a']}` });
      steps.push({ type: 'result', text: `F = ${result.toFixed(4)} N` });
    } else if (sym === 'm') {
      result = inputs['F'] / inputs['a'];
      steps.push({ type: 'substitution', text: `m = F / a = ${inputs['F']} / ${inputs['a']}` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} kg` });
    } else if (sym === 'a') {
      result = inputs['F'] / inputs['m'];
      steps.push({ type: 'substitution', text: `a = F / m = ${inputs['F']} / ${inputs['m']}` });
      steps.push({ type: 'result', text: `a = ${result.toFixed(4)} m/s²` });
    }
  } else if (formula.id === 'elec-ohms-law') {
    if (sym === 'V') {
      result = inputs['I'] * inputs['R'];
      steps.push({ type: 'substitution', text: `V = ${inputs['I']} × ${inputs['R']}` });
      steps.push({ type: 'result', text: `V = ${result.toFixed(4)} V` });
    } else if (sym === 'I') {
      result = inputs['V'] / inputs['R'];
      steps.push({ type: 'substitution', text: `I = V / R = ${inputs['V']} / ${inputs['R']}` });
      steps.push({ type: 'result', text: `I = ${result.toFixed(4)} A` });
    } else if (sym === 'R') {
      result = inputs['V'] / inputs['I'];
      steps.push({ type: 'substitution', text: `R = V / I = ${inputs['V']} / ${inputs['I']}` });
      steps.push({ type: 'result', text: `R = ${result.toFixed(4)} Ω` });
    }
  } else if (formula.id === 'wave-v-fl') {
    if (sym === 'v') {
      result = inputs['f'] * inputs['lambda'];
      steps.push({ type: 'substitution', text: `v = ${inputs['f']} × ${inputs['lambda']}` });
      steps.push({ type: 'result', text: `v = ${result.toFixed(4)} m/s` });
    } else if (sym === 'f') {
      result = inputs['v'] / inputs['lambda'];
      steps.push({ type: 'substitution', text: `f = v / λ = ${inputs['v']} / ${inputs['lambda']}` });
      steps.push({ type: 'result', text: `f = ${result.toFixed(4)} Hz` });
    } else if (sym === 'lambda') {
      result = inputs['v'] / inputs['f'];
      steps.push({ type: 'substitution', text: `λ = v / f = ${inputs['v']} / ${inputs['f']}` });
      steps.push({ type: 'result', text: `λ = ${result.toFixed(4)} m` });
    }
  } else if (formula.id === 'chem-ph') {
    if (sym === 'pH') {
      result = -Math.log10(inputs['H_plus']);
      steps.push({ type: 'substitution', text: `pH = -log₁₀(${inputs['H_plus']})` });
      steps.push({ type: 'result', text: `pH = ${result.toFixed(4)}` });
    }
  } else if (formula.id === 'chem-h-from-ph') {
    if (sym === 'H_plus') {
      result = Math.pow(10, -inputs['pH']);
      steps.push({ type: 'substitution', text: `[H⁺] = 10^(-${inputs['pH']})` });
      steps.push({ type: 'result', text: `[H⁺] = ${result.toExponential(4)} mol/L` });
    }
  } else if (formula.id === 'bio-magnification') {
    if (sym === 'M') {
      // In mm and um, 1 mm = 1000 um
      const imageMm = inputs['I'];
      const actualUm = inputs['A'];
      const actualMm = actualUm / 1000;
      result = imageMm / actualMm;
      steps.push({ type: 'intermediate', text: `Convert actual size: ${actualUm} μm = ${actualMm} mm` });
      steps.push({ type: 'substitution', text: `M = ${imageMm} mm / ${actualMm} mm` });
      steps.push({ type: 'result', text: `Magnification = ×${result.toFixed(2)}` });
    }
  } else {
    // Default fallback
    throw new Error(`Formula ${formula.name} solver is being initialized.`);
  }

  return {
    result,
    targetVar: sym,
    steps,
  };
}
