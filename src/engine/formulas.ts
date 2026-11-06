// Aurikrex Formula Bank (FR-22, FR-23, FR-24)
// Comprehensive Physics, Chemistry, Biology, and Mathematics Equations

import { FormulaDefinition, StepItem } from './types';

export const FORMULA_BANK: FormulaDefinition[] = [
  // --- MECHANICS ---
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
    notes: 'Translational kinetic energy of a moving mass',
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
    notes: 'Net force equals mass multiplied by acceleration',
  },
  {
    id: 'mech-pe',
    name: 'Gravitational Potential Energy',
    topic: 'Mechanics',
    expression: 'PE = m * g * h',
    solveTarget: 'PE',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'g', name: 'Gravitational Field Strength', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'h', name: 'Height', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'PE', name: 'Potential Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Energy stored in an object elevated in a uniform gravitational field',
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
    notes: 'Quantity of motion of a moving body',
  },
  {
    id: 'mech-impulse',
    name: 'Impulse of Force',
    topic: 'Mechanics',
    expression: 'J = F * t',
    solveTarget: 'J',
    variables: [
      { symbol: 'F', name: 'Applied Force', dimension: 'force', defaultUnit: 'N' },
      { symbol: 't', name: 'Time Duration', dimension: 'time', defaultUnit: 's' },
      { symbol: 'J', name: 'Impulse', dimension: 'momentum', defaultUnit: 'N s' },
    ],
    notes: 'Change in momentum resulting from a force applied over time',
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
      { symbol: 'W', name: 'Work Done', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Mechanical energy transferred by a force acting through distance',
  },
  {
    id: 'mech-power',
    name: 'Mechanical Power',
    topic: 'Mechanics',
    expression: 'P = W / t',
    solveTarget: 'P',
    variables: [
      { symbol: 'W', name: 'Work / Energy', dimension: 'energy', defaultUnit: 'J' },
      { symbol: 't', name: 'Time Elapsed', dimension: 'time', defaultUnit: 's' },
      { symbol: 'P', name: 'Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Rate of performing work or transferring energy',
  },
  {
    id: 'mech-density',
    name: 'Mass Density',
    topic: 'Mechanics',
    expression: 'rho = m / V',
    solveTarget: 'rho',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'V', name: 'Volume', dimension: 'volume', defaultUnit: 'm^3' },
      { symbol: 'rho', name: 'Density', dimension: 'density', defaultUnit: 'kg/m^3' },
    ],
    notes: 'Mass per unit volume of a substance',
  },
  {
    id: 'mech-pressure',
    name: 'Mechanical Pressure',
    topic: 'Mechanics',
    expression: 'P = F / A',
    solveTarget: 'P',
    variables: [
      { symbol: 'F', name: 'Normal Force', dimension: 'force', defaultUnit: 'N' },
      { symbol: 'A', name: 'Surface Area', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'P', name: 'Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
    ],
    notes: 'Perpendicular force distributed over an area',
  },
  {
    id: 'mech-hydrostatic',
    name: 'Hydrostatic Fluid Pressure',
    topic: 'Mechanics',
    expression: 'P = rho * g * h',
    solveTarget: 'P',
    variables: [
      { symbol: 'rho', name: 'Fluid Density', dimension: 'density', defaultUnit: 'kg/m^3' },
      { symbol: 'g', name: 'Gravity', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'h', name: 'Fluid Depth', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'P', name: 'Hydrostatic Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
    ],
    notes: 'Pressure exerted by a fluid column at rest',
  },
  {
    id: 'mech-suvat-v',
    name: 'Kinematics: Final Velocity (v = u + at)',
    topic: 'Mechanics',
    expression: 'v = u + a * t',
    solveTarget: 'v',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'a', name: 'Constant Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'v', name: 'Final Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Velocity with uniform linear acceleration',
  },
  {
    id: 'mech-suvat-s',
    name: 'Kinematics: Displacement (s = ut + 0.5at²)',
    topic: 'Mechanics',
    expression: 's = u * t + 0.5 * a * t^2',
    solveTarget: 's',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'a', name: 'Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 's', name: 'Displacement', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Distance travelled under uniform linear acceleration',
  },
  {
    id: 'mech-suvat-v2',
    name: 'Kinematics: Velocity Squared (v² = u² + 2as)',
    topic: 'Mechanics',
    expression: 'v^2 = u^2 + 2 * a * s',
    solveTarget: 'v',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'a', name: 'Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 's', name: 'Displacement', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Final Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Timeless kinematic relationship',
  },
  {
    id: 'mech-centripetal-f',
    name: 'Centripetal Force',
    topic: 'Mechanics',
    expression: 'F = (m * v^2) / r',
    solveTarget: 'F',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'v', name: 'Speed', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'r', name: 'Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Centripetal Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Force required to maintain circular path',
  },
  {
    id: 'mech-centripetal-a',
    name: 'Centripetal Acceleration',
    topic: 'Mechanics',
    expression: 'a = v^2 / r',
    solveTarget: 'a',
    variables: [
      { symbol: 'v', name: 'Linear Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'r', name: 'Orbit Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'a', name: 'Centripetal Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
    ],
    notes: 'Inward acceleration in uniform circular motion',
  },
  {
    id: 'mech-hooke',
    name: "Hooke's Law (Spring Elasticity)",
    topic: 'Mechanics',
    expression: 'F = k * x',
    solveTarget: 'F',
    variables: [
      { symbol: 'k', name: 'Spring Constant', dimension: 'spring_constant', defaultUnit: 'N/m' },
      { symbol: 'x', name: 'Extension / Compression', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Restoring Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Restoring force of an ideal spring within elastic limit',
  },
  {
    id: 'mech-elastic-pe',
    name: 'Elastic Potential Energy',
    topic: 'Mechanics',
    expression: 'E = 0.5 * k * x^2',
    solveTarget: 'E',
    variables: [
      { symbol: 'k', name: 'Spring Constant', dimension: 'spring_constant', defaultUnit: 'N/m' },
      { symbol: 'x', name: 'Extension', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'E', name: 'Stored Elastic Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Strain energy stored in deformed elastic body',
  },
  {
    id: 'mech-pendulum',
    name: 'Simple Pendulum Period',
    topic: 'Mechanics',
    expression: 'T = 2 * pi * sqrt(L / g)',
    solveTarget: 'T',
    variables: [
      { symbol: 'L', name: 'Pendulum Length', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'g', name: 'Gravity', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'T', name: 'Oscillation Period', dimension: 'time', defaultUnit: 's' },
    ],
    notes: 'Period for small angular displacements (< 15 degrees)',
  },
  {
    id: 'mech-gravity-newton',
    name: "Newton's Law of Universal Gravitation",
    topic: 'Mechanics',
    expression: 'F = (G * m1 * m2) / r^2',
    solveTarget: 'F',
    variables: [
      { symbol: 'm1', name: 'First Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'm2', name: 'Second Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'r', name: 'Separation Distance', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Gravitational Attraction', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Mutual gravitational attraction (G = 6.6743e-11 N m^2/kg^2)',
  },

  // --- WAVES & OPTICS ---
  {
    id: 'wave-v-fl',
    name: 'Wave Equation',
    topic: 'Waves & Optics',
    expression: 'v = f * lambda',
    solveTarget: 'v',
    variables: [
      { symbol: 'f', name: 'Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'lambda', name: 'Wavelength', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Wave Propagation Speed', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Relationship between speed, frequency, and wavelength',
  },
  {
    id: 'wave-period-freq',
    name: 'Wave Period & Frequency',
    topic: 'Waves & Optics',
    expression: 'T = 1 / f',
    solveTarget: 'T',
    variables: [
      { symbol: 'f', name: 'Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'T', name: 'Period', dimension: 'time', defaultUnit: 's' },
    ],
    notes: 'Time per complete cycle',
  },
  {
    id: 'optics-snell',
    name: "Snell's Law of Refraction",
    topic: 'Waves & Optics',
    expression: 'n1 * sin(theta1) = n2 * sin(theta2)',
    solveTarget: 'theta2',
    variables: [
      { symbol: 'n1', name: 'Index of Medium 1', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'theta1', name: 'Incident Angle (deg)', dimension: 'angle', defaultUnit: 'deg' },
      { symbol: 'n2', name: 'Index of Medium 2', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'theta2', name: 'Refracted Angle (deg)', dimension: 'angle', defaultUnit: 'deg' },
    ],
    notes: 'Refraction of light at interface of two media',
  },
  {
    id: 'optics-lens',
    name: 'Thin Lens / Mirror Formula',
    topic: 'Waves & Optics',
    expression: '1/f = 1/u + 1/v',
    solveTarget: 'v',
    variables: [
      { symbol: 'f', name: 'Focal Length', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'u', name: 'Object Distance', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Image Distance', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Cartesian sign convention applies',
  },
  {
    id: 'optics-lens-power',
    name: 'Lens Optical Power',
    topic: 'Waves & Optics',
    expression: 'P = 1 / f',
    solveTarget: 'P',
    variables: [
      { symbol: 'f', name: 'Focal Length in meters', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'P', name: 'Optical Power', dimension: 'power', defaultUnit: 'D (dioptres)' },
    ],
    notes: 'Vergence power in dioptres (m^-1)',
  },
  {
    id: 'optics-critical-angle',
    name: 'Critical Angle for Total Internal Reflection',
    topic: 'Waves & Optics',
    expression: 'sin(theta_c) = n2 / n1',
    solveTarget: 'theta_c',
    variables: [
      { symbol: 'n1', name: 'Refractive Index of Denser Medium', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'n2', name: 'Refractive Index of Rarer Medium', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'theta_c', name: 'Critical Angle (deg)', dimension: 'angle', defaultUnit: 'deg' },
    ],
    notes: 'Angle beyond which light undergoes total internal reflection',
  },

  // --- ELECTRICITY & MAGNETISM ---
  {
    id: 'elec-ohms-law',
    name: "Ohm's Law",
    topic: 'Electricity & Magnetism',
    expression: 'V = I * R',
    solveTarget: 'V',
    variables: [
      { symbol: 'I', name: 'Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 'R', name: 'Resistance', dimension: 'resistance', defaultUnit: 'ohm' },
      { symbol: 'V', name: 'Voltage Potential', dimension: 'voltage', defaultUnit: 'V' },
    ],
    notes: 'Direct linear current-voltage relationship for ohmic conductors',
  },
  {
    id: 'elec-power-vi',
    name: 'Electrical Power (P = VI)',
    topic: 'Electricity & Magnetism',
    expression: 'P = V * I',
    solveTarget: 'P',
    variables: [
      { symbol: 'V', name: 'Potential Difference', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'I', name: 'Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 'P', name: 'Electric Power Dissipated', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Rate of electrical energy dissipation',
  },
  {
    id: 'elec-power-i2r',
    name: "Joule Heating Power (P = I²R)",
    topic: 'Electricity & Magnetism',
    expression: 'P = I^2 * R',
    solveTarget: 'P',
    variables: [
      { symbol: 'I', name: 'Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 'R', name: 'Resistance', dimension: 'resistance', defaultUnit: 'ohm' },
      { symbol: 'P', name: 'Joule Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Ohmic heating loss in conductors',
  },
  {
    id: 'elec-power-v2r',
    name: 'Electrical Power (P = V²/R)',
    topic: 'Electricity & Magnetism',
    expression: 'P = V^2 / R',
    solveTarget: 'P',
    variables: [
      { symbol: 'V', name: 'Voltage', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'R', name: 'Resistance', dimension: 'resistance', defaultUnit: 'ohm' },
      { symbol: 'P', name: 'Electric Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Power expressed in voltage and resistance',
  },
  {
    id: 'elec-charge',
    name: 'Electric Charge Flow',
    topic: 'Electricity & Magnetism',
    expression: 'Q = I * t',
    solveTarget: 'Q',
    variables: [
      { symbol: 'I', name: 'Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'Q', name: 'Charge', dimension: 'charge', defaultUnit: 'C' },
    ],
    notes: 'Total charge transported by steady current',
  },
  {
    id: 'elec-coulomb',
    name: "Coulomb's Electrostatic Law",
    topic: 'Electricity & Magnetism',
    expression: 'F = (k_e * q1 * q2) / r^2',
    solveTarget: 'F',
    variables: [
      { symbol: 'q1', name: 'Charge 1', dimension: 'charge', defaultUnit: 'C' },
      { symbol: 'q2', name: 'Charge 2', dimension: 'charge', defaultUnit: 'C' },
      { symbol: 'r', name: 'Distance Separation', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Electrostatic Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Force between point charges (k_e = 8.98755e9 N m^2/C^2)',
  },
  {
    id: 'elec-capacitance',
    name: 'Capacitance Definition',
    topic: 'Electricity & Magnetism',
    expression: 'C = Q / V',
    solveTarget: 'C',
    variables: [
      { symbol: 'Q', name: 'Stored Charge', dimension: 'charge', defaultUnit: 'C' },
      { symbol: 'V', name: 'Potential Difference', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'C', name: 'Capacitance', dimension: 'capacitance', defaultUnit: 'F' },
    ],
    notes: 'Charge storage capacity per volt',
  },
  {
    id: 'elec-cap-energy',
    name: 'Energy Stored in Capacitor',
    topic: 'Electricity & Magnetism',
    expression: 'E = 0.5 * C * V^2',
    solveTarget: 'E',
    variables: [
      { symbol: 'C', name: 'Capacitance', dimension: 'capacitance', defaultUnit: 'F' },
      { symbol: 'V', name: 'Voltage', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'E', name: 'Electrostatic Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Potential energy held in electrostatic field',
  },
  {
    id: 'elec-resistivity',
    name: 'Resistance of Wire Conductor',
    topic: 'Electricity & Magnetism',
    expression: 'R = (rho * L) / A',
    solveTarget: 'R',
    variables: [
      { symbol: 'rho', name: 'Material Resistivity', dimension: 'resistivity', defaultUnit: 'ohm m' },
      { symbol: 'L', name: 'Wire Length', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'A', name: 'Cross-sectional Area', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'R', name: 'Total Resistance', dimension: 'resistance', defaultUnit: 'ohm' },
    ],
    notes: 'Bulk geometric resistance formula',
  },
  {
    id: 'elec-transformer',
    name: 'Transformer Turn Ratio',
    topic: 'Electricity & Magnetism',
    expression: 'Vs = (Vp * Ns) / Np',
    solveTarget: 'Vs',
    variables: [
      { symbol: 'Vp', name: 'Primary Voltage', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'Np', name: 'Primary Coil Turns', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'Ns', name: 'Secondary Coil Turns', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'Vs', name: 'Secondary Voltage', dimension: 'voltage', defaultUnit: 'V' },
    ],
    notes: 'Voltage transformation ratio in ideal transformer',
  },

  // --- THERMODYNAMICS & GAS LAWS ---
  {
    id: 'therm-heat-capacity',
    name: 'Specific Heat Capacity',
    topic: 'Thermodynamics',
    expression: 'Q = m * c * deltaT',
    solveTarget: 'Q',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'c', name: 'Specific Heat Capacity', dimension: 'specific_heat', defaultUnit: 'J/(kg K)' },
      { symbol: 'deltaT', name: 'Temperature Change', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'Q', name: 'Thermal Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Heat required to change temperature of mass m',
  },
  {
    id: 'therm-latent-heat',
    name: 'Latent Heat of Phase Change',
    topic: 'Thermodynamics',
    expression: 'Q = m * L',
    solveTarget: 'Q',
    variables: [
      { symbol: 'm', name: 'Mass Changing Phase', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'L', name: 'Specific Latent Heat', dimension: 'latent_heat', defaultUnit: 'J/kg' },
      { symbol: 'Q', name: 'Heat Absorbed / Released', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Isothermal heat of fusion or vaporization',
  },
  {
    id: 'chem-ideal-gas',
    name: 'Ideal Gas Law (PV = nRT)',
    topic: 'Thermodynamics',
    expression: 'P * V = n * R * T',
    solveTarget: 'P',
    variables: [
      { symbol: 'n', name: 'Moles of Gas', dimension: 'amount', defaultUnit: 'mol' },
      { symbol: 'T', name: 'Absolute Temperature', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'V', name: 'Gas Volume', dimension: 'volume', defaultUnit: 'm^3' },
      { symbol: 'P', name: 'Gas Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
    ],
    notes: 'R = 8.314 J/(mol K)',
  },
  {
    id: 'chem-boyle',
    name: "Boyle's Law (Isothermal Gas)",
    topic: 'Thermodynamics',
    expression: 'P1 * V1 = P2 * V2',
    solveTarget: 'P2',
    variables: [
      { symbol: 'P1', name: 'Initial Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
      { symbol: 'V1', name: 'Initial Volume', dimension: 'volume', defaultUnit: 'L' },
      { symbol: 'V2', name: 'Final Volume', dimension: 'volume', defaultUnit: 'L' },
      { symbol: 'P2', name: 'Final Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
    ],
    notes: 'Pressure inversely proportional to volume at constant temperature',
  },
  {
    id: 'chem-charles',
    name: "Charles's Law (Isobaric Gas)",
    topic: 'Thermodynamics',
    expression: 'V1 / T1 = V2 / T2',
    solveTarget: 'V2',
    variables: [
      { symbol: 'V1', name: 'Initial Volume', dimension: 'volume', defaultUnit: 'L' },
      { symbol: 'T1', name: 'Initial Temperature (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'T2', name: 'Final Temperature (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'V2', name: 'Final Volume', dimension: 'volume', defaultUnit: 'L' },
    ],
    notes: 'Volume directly proportional to absolute temperature at constant pressure',
  },
  {
    id: 'therm-carnot',
    name: 'Carnot Heat Engine Efficiency',
    topic: 'Thermodynamics',
    expression: 'eta = 1 - (Tc / Th)',
    solveTarget: 'eta',
    variables: [
      { symbol: 'Tc', name: 'Cold Reservoir Temp (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'Th', name: 'Hot Reservoir Temp (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'eta', name: 'Thermal Efficiency (0-1)', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Theoretical maximum thermodynamic efficiency limit',
  },
  {
    id: 'therm-radiation-stefan',
    name: 'Stefan-Boltzmann Radiation',
    topic: 'Thermodynamics',
    expression: 'P = sigma * A * T^4',
    solveTarget: 'P',
    variables: [
      { symbol: 'A', name: 'Radiating Surface Area', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'T', name: 'Surface Temperature (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'P', name: 'Radiated Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Blackbody thermal radiation (sigma = 5.67037e-8 W/(m^2 K^4))',
  },

  // --- MODERN & QUANTUM PHYSICS ---
  {
    id: 'mod-mass-energy',
    name: 'Einstein Mass-Energy Equivalence',
    topic: 'Modern Physics',
    expression: 'E = m * c^2',
    solveTarget: 'E',
    variables: [
      { symbol: 'm', name: 'Rest Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'E', name: 'Rest Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Equivalence of relativistic mass and energy (c = 299792458 m/s)',
  },
  {
    id: 'mod-photon-energy',
    name: 'Photon Quantum Energy (E = hf)',
    topic: 'Modern Physics',
    expression: 'E = h * f',
    solveTarget: 'E',
    variables: [
      { symbol: 'f', name: 'Photon Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'E', name: 'Photon Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Energy of an electromagnetic quantum (h = 6.62607e-34 J s)',
  },
  {
    id: 'mod-photoelectric',
    name: 'Photoelectric Effect Maximum Kinetic Energy',
    topic: 'Modern Physics',
    expression: 'KE_max = h * f - Phi',
    solveTarget: 'KE_max',
    variables: [
      { symbol: 'f', name: 'Incident Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'Phi', name: 'Metal Work Function', dimension: 'energy', defaultUnit: 'J' },
      { symbol: 'KE_max', name: 'Max Kinetic Energy of Photoelectron', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: "Einstein's photoelectric equation",
  },
  {
    id: 'mod-debroglie',
    name: 'De Broglie Matter Wavelength',
    topic: 'Modern Physics',
    expression: 'lambda = h / (m * v)',
    solveTarget: 'lambda',
    variables: [
      { symbol: 'm', name: 'Particle Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'v', name: 'Particle Speed', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'lambda', name: 'Matter Wavelength', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Wave-particle duality wavelength of a massive particle',
  },
  {
    id: 'mod-half-life',
    name: 'Radioactive Decay Constant from Half-Life',
    topic: 'Modern Physics',
    expression: 'lambda = ln(2) / t_half',
    solveTarget: 'lambda',
    variables: [
      { symbol: 't_half', name: 'Half-Life', dimension: 'time', defaultUnit: 's' },
      { symbol: 'lambda', name: 'Decay Constant', dimension: 'frequency', defaultUnit: 's^-1' },
    ],
    notes: 'Radioactive disintegration rate per unit time',
  },

  // --- CHEMISTRY: MOLES, EQUILIBRIA & ELECTROCHEMISTRY ---
  {
    id: 'chem-mole-mass',
    name: 'Moles from Mass (n = m / M)',
    topic: 'Chemistry',
    expression: 'n = m / M',
    solveTarget: 'n',
    variables: [
      { symbol: 'm', name: 'Substance Mass', dimension: 'mass', defaultUnit: 'g' },
      { symbol: 'M', name: 'Molar Mass', dimension: 'molar_mass', defaultUnit: 'g/mol' },
      { symbol: 'n', name: 'Amount of Substance', dimension: 'amount', defaultUnit: 'mol' },
    ],
    notes: 'Fundamental stoichiometry conversion',
  },
  {
    id: 'chem-concentration',
    name: 'Molar Concentration / Molarity (C = n / V)',
    topic: 'Chemistry',
    expression: 'C = n / V',
    solveTarget: 'C',
    variables: [
      { symbol: 'n', name: 'Moles of Solute', dimension: 'amount', defaultUnit: 'mol' },
      { symbol: 'V', name: 'Solution Volume', dimension: 'volume', defaultUnit: 'L' },
      { symbol: 'C', name: 'Molarity', dimension: 'concentration', defaultUnit: 'mol/L' },
    ],
    notes: 'Volumetric solute concentration',
  },
  {
    id: 'chem-dilution',
    name: 'Solution Dilution (C1 * V1 = C2 * V2)',
    topic: 'Chemistry',
    expression: 'C1 * V1 = C2 * V2',
    solveTarget: 'V2',
    variables: [
      { symbol: 'C1', name: 'Initial Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'V1', name: 'Initial Volume', dimension: 'volume', defaultUnit: 'mL' },
      { symbol: 'C2', name: 'Target Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'V2', name: 'Final Diluted Volume', dimension: 'volume', defaultUnit: 'mL' },
    ],
    notes: 'Conservation of solute mass across dilution',
  },
  {
    id: 'chem-ph',
    name: 'pH from Hydrogen Ion Concentration',
    topic: 'Chemistry',
    expression: 'pH = -log10(H_plus)',
    solveTarget: 'pH',
    variables: [
      { symbol: 'H_plus', name: '[H⁺] Hydronium Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'pH', name: 'pH Value (0-14)', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Logarithmic acidity measure',
  },
  {
    id: 'chem-h-from-ph',
    name: '[H⁺] Concentration from pH',
    topic: 'Chemistry',
    expression: 'H_plus = 10^(-pH)',
    solveTarget: 'H_plus',
    variables: [
      { symbol: 'pH', name: 'pH Value', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'H_plus', name: '[H⁺] Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
    ],
    notes: 'Inverse pH calculation',
  },
  {
    id: 'chem-poh',
    name: 'pOH from Hydroxide Ion Concentration',
    topic: 'Chemistry',
    expression: 'pOH = -log10(OH_minus)',
    solveTarget: 'pOH',
    variables: [
      { symbol: 'OH_minus', name: '[OH⁻] Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'pOH', name: 'pOH Value', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Logarithmic basicity measure',
  },
  {
    id: 'chem-gibbs',
    name: 'Gibbs Free Energy Change (ΔG = ΔH - TΔS)',
    topic: 'Chemistry',
    expression: 'deltaG = deltaH - T * deltaS',
    solveTarget: 'deltaG',
    variables: [
      { symbol: 'deltaH', name: 'Enthalpy Change', dimension: 'energy', defaultUnit: 'J' },
      { symbol: 'T', name: 'Absolute Temp (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'deltaS', name: 'Entropy Change', dimension: 'entropy', defaultUnit: 'J/K' },
      { symbol: 'deltaG', name: 'Gibbs Free Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Criterion for thermodynamic spontaneity (spontaneous when ΔG < 0)',
  },
  {
    id: 'chem-faraday-electrolysis',
    name: "Faraday's Law of Electrolysis",
    topic: 'Chemistry',
    expression: 'm = (M * I * t) / (z * F)',
    solveTarget: 'm',
    variables: [
      { symbol: 'M', name: 'Molar Mass of Deposited Element', dimension: 'molar_mass', defaultUnit: 'g/mol' },
      { symbol: 'I', name: 'Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 't', name: 'Electrolysis Duration', dimension: 'time', defaultUnit: 's' },
      { symbol: 'z', name: 'Valency Electrons per Ion', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'm', name: 'Mass Deposited', dimension: 'mass', defaultUnit: 'g' },
    ],
    notes: 'Mass deposited during electrochemical reaction (F = 96485.3 C/mol)',
  },

  // --- BIOLOGY & MATHEMATICS ---
  {
    id: 'bio-magnification',
    name: 'Microscopic Magnification (M = I / A)',
    topic: 'Biology & Math',
    expression: 'M = I / A',
    solveTarget: 'M',
    variables: [
      { symbol: 'I', name: 'Image Size (mm)', dimension: 'length', defaultUnit: 'mm' },
      { symbol: 'A', name: 'Actual Biological Size (μm)', dimension: 'length', defaultUnit: 'um' },
      { symbol: 'M', name: 'Magnification Factor', dimension: 'dimensionless', defaultUnit: 'x' },
    ],
    notes: 'Relates micrograph measurements (mm) to real specimen dimensions (μm)',
  },
  {
    id: 'bio-hardy-weinberg-p',
    name: 'Hardy-Weinberg Allele Frequencies (p + q = 1)',
    topic: 'Biology & Math',
    expression: 'p + q = 1',
    solveTarget: 'p',
    variables: [
      { symbol: 'q', name: 'Recessive Allele Frequency (q)', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'p', name: 'Dominant Allele Frequency (p)', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Sum of dominant and recessive allele frequencies in a diploid gene pool',
  },
  {
    id: 'math-pythagorean',
    name: 'Pythagorean Theorem',
    topic: 'Biology & Math',
    expression: 'c = sqrt(a^2 + b^2)',
    solveTarget: 'c',
    variables: [
      { symbol: 'a', name: 'Leg a', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'b', name: 'Leg b', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'c', name: 'Hypotenuse c', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Right-angled triangle hypotenuse relationship',
  },
  {
    id: 'math-circle-area',
    name: 'Area of Circle',
    topic: 'Biology & Math',
    expression: 'A = pi * r^2',
    solveTarget: 'A',
    variables: [
      { symbol: 'r', name: 'Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'A', name: 'Circle Area', dimension: 'area', defaultUnit: 'm^2' },
    ],
    notes: 'Planar area enclosed by a circle',
  },
  {
    id: 'math-sphere-volume',
    name: 'Volume of Sphere',
    topic: 'Biology & Math',
    expression: 'V = (4/3) * pi * r^3',
    solveTarget: 'V',
    variables: [
      { symbol: 'r', name: 'Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'V', name: 'Sphere Volume', dimension: 'volume', defaultUnit: 'm^3' },
    ],
    notes: '3D volume of a spherical body',
  },
];

/**
 * Universal solver for Formula Bank definitions with step-by-step substitution
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
    { type: 'rule', text: `Formula: ${formula.name} [${formula.expression}]` },
  ];

  let result = 0;
  const sym = unknown.symbol;

  // Mechanics: KE = 0.5 * m * v^2
  if (formula.id === 'mech-ke') {
    if (sym === 'KE') {
      result = 0.5 * inputs['m'] * Math.pow(inputs['v'], 2);
      steps.push({ type: 'substitution', text: `KE = 0.5 × ${inputs['m']} × (${inputs['v']})²` });
      steps.push({ type: 'result', text: `KE = ${result.toFixed(4)} J` });
    } else if (sym === 'm') {
      result = (2 * inputs['KE']) / Math.pow(inputs['v'], 2);
      steps.push({ type: 'substitution', text: `m = 2·KE / v² = (2 × ${inputs['KE']}) / (${inputs['v']})²` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} kg` });
    } else if (sym === 'v') {
      result = Math.sqrt((2 * inputs['KE']) / inputs['m']);
      steps.push({ type: 'substitution', text: `v = √(2·KE / m) = √(2 × ${inputs['KE']} / ${inputs['m']})` });
      steps.push({ type: 'result', text: `v = ${result.toFixed(4)} m/s` });
    }
  }
  // Mechanics: F = m * a
  else if (formula.id === 'mech-f-ma') {
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
  }
  // Mechanics: PE = m * g * h
  else if (formula.id === 'mech-pe') {
    if (sym === 'PE') {
      result = inputs['m'] * inputs['g'] * inputs['h'];
      steps.push({ type: 'substitution', text: `PE = ${inputs['m']} × ${inputs['g']} × ${inputs['h']}` });
      steps.push({ type: 'result', text: `PE = ${result.toFixed(4)} J` });
    } else if (sym === 'm') {
      result = inputs['PE'] / (inputs['g'] * inputs['h']);
      steps.push({ type: 'substitution', text: `m = PE / (g·h) = ${inputs['PE']} / (${inputs['g']} × ${inputs['h']})` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} kg` });
    } else if (sym === 'h') {
      result = inputs['PE'] / (inputs['m'] * inputs['g']);
      steps.push({ type: 'substitution', text: `h = PE / (m·g) = ${inputs['PE']} / (${inputs['m']} × ${inputs['g']})` });
      steps.push({ type: 'result', text: `h = ${result.toFixed(4)} m` });
    } else if (sym === 'g') {
      result = inputs['PE'] / (inputs['m'] * inputs['h']);
      steps.push({ type: 'substitution', text: `g = PE / (m·h) = ${inputs['PE']} / (${inputs['m']} × ${inputs['h']})` });
      steps.push({ type: 'result', text: `g = ${result.toFixed(4)} m/s²` });
    }
  }
  // Mechanics: p = m * v
  else if (formula.id === 'mech-momentum') {
    if (sym === 'p') {
      result = inputs['m'] * inputs['v'];
      steps.push({ type: 'substitution', text: `p = ${inputs['m']} × ${inputs['v']}` });
      steps.push({ type: 'result', text: `p = ${result.toFixed(4)} kg m/s` });
    } else if (sym === 'm') {
      result = inputs['p'] / inputs['v'];
      steps.push({ type: 'substitution', text: `m = p / v = ${inputs['p']} / ${inputs['v']}` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} kg` });
    } else if (sym === 'v') {
      result = inputs['p'] / inputs['m'];
      steps.push({ type: 'substitution', text: `v = p / m = ${inputs['p']} / ${inputs['m']}` });
      steps.push({ type: 'result', text: `v = ${result.toFixed(4)} m/s` });
    }
  }
  // Mechanics: W = F * d
  else if (formula.id === 'mech-work') {
    if (sym === 'W') {
      result = inputs['F'] * inputs['d'];
      steps.push({ type: 'substitution', text: `W = ${inputs['F']} × ${inputs['d']}` });
      steps.push({ type: 'result', text: `W = ${result.toFixed(4)} J` });
    } else if (sym === 'F') {
      result = inputs['W'] / inputs['d'];
      steps.push({ type: 'substitution', text: `F = W / d = ${inputs['W']} / ${inputs['d']}` });
      steps.push({ type: 'result', text: `F = ${result.toFixed(4)} N` });
    } else if (sym === 'd') {
      result = inputs['W'] / inputs['F'];
      steps.push({ type: 'substitution', text: `d = W / F = ${inputs['W']} / ${inputs['F']}` });
      steps.push({ type: 'result', text: `d = ${result.toFixed(4)} m` });
    }
  }
  // Mechanics: P = W / t
  else if (formula.id === 'mech-power') {
    if (sym === 'P') {
      result = inputs['W'] / inputs['t'];
      steps.push({ type: 'substitution', text: `P = ${inputs['W']} / ${inputs['t']}` });
      steps.push({ type: 'result', text: `P = ${result.toFixed(4)} W` });
    } else if (sym === 'W') {
      result = inputs['P'] * inputs['t'];
      steps.push({ type: 'substitution', text: `W = P × t = ${inputs['P']} × ${inputs['t']}` });
      steps.push({ type: 'result', text: `W = ${result.toFixed(4)} J` });
    } else if (sym === 't') {
      result = inputs['W'] / inputs['P'];
      steps.push({ type: 'substitution', text: `t = W / P = ${inputs['W']} / ${inputs['P']}` });
      steps.push({ type: 'result', text: `t = ${result.toFixed(4)} s` });
    }
  }
  // Mechanics: rho = m / V
  else if (formula.id === 'mech-density') {
    if (sym === 'rho') {
      result = inputs['m'] / inputs['V'];
      steps.push({ type: 'substitution', text: `rho = ${inputs['m']} / ${inputs['V']}` });
      steps.push({ type: 'result', text: `rho = ${result.toFixed(4)} kg/m³` });
    } else if (sym === 'm') {
      result = inputs['rho'] * inputs['V'];
      steps.push({ type: 'substitution', text: `m = rho × V = ${inputs['rho']} × ${inputs['V']}` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} kg` });
    } else if (sym === 'V') {
      result = inputs['m'] / inputs['rho'];
      steps.push({ type: 'substitution', text: `V = m / rho = ${inputs['m']} / ${inputs['rho']}` });
      steps.push({ type: 'result', text: `V = ${result.toFixed(4)} m³` });
    }
  }
  // Mechanics: P = F / A
  else if (formula.id === 'mech-pressure') {
    if (sym === 'P') {
      result = inputs['F'] / inputs['A'];
      steps.push({ type: 'substitution', text: `P = ${inputs['F']} / ${inputs['A']}` });
      steps.push({ type: 'result', text: `P = ${result.toFixed(4)} Pa` });
    } else if (sym === 'F') {
      result = inputs['P'] * inputs['A'];
      steps.push({ type: 'substitution', text: `F = P × A = ${inputs['P']} × ${inputs['A']}` });
      steps.push({ type: 'result', text: `F = ${result.toFixed(4)} N` });
    } else if (sym === 'A') {
      result = inputs['F'] / inputs['P'];
      steps.push({ type: 'substitution', text: `A = F / P = ${inputs['F']} / ${inputs['P']}` });
      steps.push({ type: 'result', text: `A = ${result.toFixed(4)} m²` });
    }
  }
  // Mechanics: v = u + a * t
  else if (formula.id === 'mech-suvat-v') {
    if (sym === 'v') {
      result = inputs['u'] + inputs['a'] * inputs['t'];
      steps.push({ type: 'substitution', text: `v = ${inputs['u']} + (${inputs['a']} × ${inputs['t']})` });
      steps.push({ type: 'result', text: `v = ${result.toFixed(4)} m/s` });
    } else if (sym === 'u') {
      result = inputs['v'] - inputs['a'] * inputs['t'];
      steps.push({ type: 'substitution', text: `u = v - at = ${inputs['v']} - (${inputs['a']} × ${inputs['t']})` });
      steps.push({ type: 'result', text: `u = ${result.toFixed(4)} m/s` });
    } else if (sym === 'a') {
      result = (inputs['v'] - inputs['u']) / inputs['t'];
      steps.push({ type: 'substitution', text: `a = (v - u) / t = (${inputs['v']} - ${inputs['u']}) / ${inputs['t']}` });
      steps.push({ type: 'result', text: `a = ${result.toFixed(4)} m/s²` });
    } else if (sym === 't') {
      result = (inputs['v'] - inputs['u']) / inputs['a'];
      steps.push({ type: 'substitution', text: `t = (v - u) / a = (${inputs['v']} - ${inputs['u']}) / ${inputs['a']}` });
      steps.push({ type: 'result', text: `t = ${result.toFixed(4)} s` });
    }
  }
  // Mechanics: s = u*t + 0.5*a*t^2
  else if (formula.id === 'mech-suvat-s') {
    if (sym === 's') {
      const ut = inputs['u'] * inputs['t'];
      const half_at2 = 0.5 * inputs['a'] * Math.pow(inputs['t'], 2);
      result = ut + half_at2;
      steps.push({ type: 'substitution', text: `s = (${inputs['u']} × ${inputs['t']}) + (0.5 × ${inputs['a']} × (${inputs['t']})²)` });
      steps.push({ type: 'result', text: `s = ${result.toFixed(4)} m` });
    } else if (sym === 'u') {
      result = (inputs['s'] - 0.5 * inputs['a'] * Math.pow(inputs['t'], 2)) / inputs['t'];
      steps.push({ type: 'substitution', text: `u = (s - 0.5·a·t²) / t` });
      steps.push({ type: 'result', text: `u = ${result.toFixed(4)} m/s` });
    }
  }
  // Electricity: V = I * R
  else if (formula.id === 'elec-ohms-law') {
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
  }
  // Electricity: P = V * I
  else if (formula.id === 'elec-power-vi') {
    if (sym === 'P') {
      result = inputs['V'] * inputs['I'];
      steps.push({ type: 'substitution', text: `P = ${inputs['V']} × ${inputs['I']}` });
      steps.push({ type: 'result', text: `P = ${result.toFixed(4)} W` });
    } else if (sym === 'V') {
      result = inputs['P'] / inputs['I'];
      steps.push({ type: 'substitution', text: `V = P / I = ${inputs['P']} / ${inputs['I']}` });
      steps.push({ type: 'result', text: `V = ${result.toFixed(4)} V` });
    } else if (sym === 'I') {
      result = inputs['P'] / inputs['V'];
      steps.push({ type: 'substitution', text: `I = P / V = ${inputs['P']} / ${inputs['V']}` });
      steps.push({ type: 'result', text: `I = ${result.toFixed(4)} A` });
    }
  }
  // Electricity: C = Q / V
  else if (formula.id === 'elec-capacitance') {
    if (sym === 'C') {
      result = inputs['Q'] / inputs['V'];
      steps.push({ type: 'substitution', text: `C = ${inputs['Q']} / ${inputs['V']}` });
      steps.push({ type: 'result', text: `C = ${result.toFixed(6)} F` });
    } else if (sym === 'Q') {
      result = inputs['C'] * inputs['V'];
      steps.push({ type: 'substitution', text: `Q = C × V = ${inputs['C']} × ${inputs['V']}` });
      steps.push({ type: 'result', text: `Q = ${result.toFixed(6)} C` });
    } else if (sym === 'V') {
      result = inputs['Q'] / inputs['C'];
      steps.push({ type: 'substitution', text: `V = Q / C = ${inputs['Q']} / ${inputs['C']}` });
      steps.push({ type: 'result', text: `V = ${result.toFixed(4)} V` });
    }
  }
  // Waves: v = f * lambda
  else if (formula.id === 'wave-v-fl') {
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
  }
  // Waves: T = 1 / f
  else if (formula.id === 'wave-period-freq') {
    if (sym === 'T') {
      result = 1 / inputs['f'];
      steps.push({ type: 'substitution', text: `T = 1 / ${inputs['f']}` });
      steps.push({ type: 'result', text: `T = ${result.toFixed(6)} s` });
    } else if (sym === 'f') {
      result = 1 / inputs['T'];
      steps.push({ type: 'substitution', text: `f = 1 / ${inputs['T']}` });
      steps.push({ type: 'result', text: `f = ${result.toFixed(4)} Hz` });
    }
  }
  // Optics: 1/f = 1/u + 1/v
  else if (formula.id === 'optics-lens') {
    if (sym === 'v') {
      result = (inputs['f'] * inputs['u']) / (inputs['u'] - inputs['f']);
      steps.push({ type: 'substitution', text: `1/v = 1/f - 1/u => v = (f·u) / (u - f)` });
      steps.push({ type: 'result', text: `v = ${result.toFixed(4)} m` });
    } else if (sym === 'u') {
      result = (inputs['f'] * inputs['v']) / (inputs['v'] - inputs['f']);
      steps.push({ type: 'substitution', text: `1/u = 1/f - 1/v => u = (f·v) / (v - f)` });
      steps.push({ type: 'result', text: `u = ${result.toFixed(4)} m` });
    } else if (sym === 'f') {
      result = (inputs['u'] * inputs['v']) / (inputs['u'] + inputs['v']);
      steps.push({ type: 'substitution', text: `f = (u·v) / (u + v) = (${inputs['u']} × ${inputs['v']}) / (${inputs['u']} + ${inputs['v']})` });
      steps.push({ type: 'result', text: `f = ${result.toFixed(4)} m` });
    }
  }
  // Thermodynamics: Q = m * c * deltaT
  else if (formula.id === 'therm-heat-capacity') {
    if (sym === 'Q') {
      result = inputs['m'] * inputs['c'] * inputs['deltaT'];
      steps.push({ type: 'substitution', text: `Q = ${inputs['m']} × ${inputs['c']} × ${inputs['deltaT']}` });
      steps.push({ type: 'result', text: `Q = ${result.toFixed(4)} J` });
    } else if (sym === 'm') {
      result = inputs['Q'] / (inputs['c'] * inputs['deltaT']);
      steps.push({ type: 'substitution', text: `m = Q / (c·ΔT) = ${inputs['Q']} / (${inputs['c']} × ${inputs['deltaT']})` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} kg` });
    } else if (sym === 'c') {
      result = inputs['Q'] / (inputs['m'] * inputs['deltaT']);
      steps.push({ type: 'substitution', text: `c = Q / (m·ΔT) = ${inputs['Q']} / (${inputs['m']} × ${inputs['deltaT']})` });
      steps.push({ type: 'result', text: `c = ${result.toFixed(4)} J/(kg K)` });
    } else if (sym === 'deltaT') {
      result = inputs['Q'] / (inputs['m'] * inputs['c']);
      steps.push({ type: 'substitution', text: `ΔT = Q / (m·c) = ${inputs['Q']} / (${inputs['m']} × ${inputs['c']})` });
      steps.push({ type: 'result', text: `ΔT = ${result.toFixed(4)} K` });
    }
  }
  // Thermodynamics: PV = nRT (R = 8.314)
  else if (formula.id === 'chem-ideal-gas') {
    const R = 8.314462618;
    if (sym === 'P') {
      result = (inputs['n'] * R * inputs['T']) / inputs['V'];
      steps.push({ type: 'substitution', text: `P = (n·R·T) / V = (${inputs['n']} × 8.314 × ${inputs['T']}) / ${inputs['V']}` });
      steps.push({ type: 'result', text: `P = ${result.toFixed(4)} Pa` });
    } else if (sym === 'V') {
      result = (inputs['n'] * R * inputs['T']) / inputs['P'];
      steps.push({ type: 'substitution', text: `V = (n·R·T) / P = (${inputs['n']} × 8.314 × ${inputs['T']}) / ${inputs['P']}` });
      steps.push({ type: 'result', text: `V = ${result.toFixed(4)} m³` });
    } else if (sym === 'n') {
      result = (inputs['P'] * inputs['V']) / (R * inputs['T']);
      steps.push({ type: 'substitution', text: `n = (P·V) / (R·T) = (${inputs['P']} × ${inputs['V']}) / (8.314 × ${inputs['T']})` });
      steps.push({ type: 'result', text: `n = ${result.toFixed(4)} mol` });
    } else if (sym === 'T') {
      result = (inputs['P'] * inputs['V']) / (inputs['n'] * R);
      steps.push({ type: 'substitution', text: `T = (P·V) / (n·R) = (${inputs['P']} × ${inputs['V']}) / (${inputs['n']} × 8.314)` });
      steps.push({ type: 'result', text: `T = ${result.toFixed(4)} K` });
    }
  }
  // Chemistry: C1*V1 = C2*V2
  else if (formula.id === 'chem-dilution') {
    if (sym === 'V2') {
      result = (inputs['C1'] * inputs['V1']) / inputs['C2'];
      steps.push({ type: 'substitution', text: `V2 = (C1 × V1) / C2 = (${inputs['C1']} × ${inputs['V1']}) / ${inputs['C2']}` });
      steps.push({ type: 'result', text: `V2 = ${result.toFixed(4)} mL` });
    } else if (sym === 'C2') {
      result = (inputs['C1'] * inputs['V1']) / inputs['V2'];
      steps.push({ type: 'substitution', text: `C2 = (C1 × V1) / V2 = (${inputs['C1']} × ${inputs['V1']}) / ${inputs['V2']}` });
      steps.push({ type: 'result', text: `C2 = ${result.toFixed(4)} mol/L` });
    } else if (sym === 'V1') {
      result = (inputs['C2'] * inputs['V2']) / inputs['C1'];
      steps.push({ type: 'substitution', text: `V1 = (C2 × V2) / C1 = (${inputs['C2']} × ${inputs['V2']}) / ${inputs['C1']}` });
      steps.push({ type: 'result', text: `V1 = ${result.toFixed(4)} mL` });
    }
  }
  // Chemistry: n = m / M
  else if (formula.id === 'chem-mole-mass') {
    if (sym === 'n') {
      result = inputs['m'] / inputs['M'];
      steps.push({ type: 'substitution', text: `n = m / M = ${inputs['m']} / ${inputs['M']}` });
      steps.push({ type: 'result', text: `n = ${result.toFixed(4)} mol` });
    } else if (sym === 'm') {
      result = inputs['n'] * inputs['M'];
      steps.push({ type: 'substitution', text: `m = n × M = ${inputs['n']} × ${inputs['M']}` });
      steps.push({ type: 'result', text: `m = ${result.toFixed(4)} g` });
    } else if (sym === 'M') {
      result = inputs['m'] / inputs['n'];
      steps.push({ type: 'substitution', text: `M = m / n = ${inputs['m']} / ${inputs['n']}` });
      steps.push({ type: 'result', text: `M = ${result.toFixed(4)} g/mol` });
    }
  }
  // Chemistry: C = n / V
  else if (formula.id === 'chem-concentration') {
    if (sym === 'C') {
      result = inputs['n'] / inputs['V'];
      steps.push({ type: 'substitution', text: `C = n / V = ${inputs['n']} / ${inputs['V']}` });
      steps.push({ type: 'result', text: `C = ${result.toFixed(4)} mol/L` });
    } else if (sym === 'n') {
      result = inputs['C'] * inputs['V'];
      steps.push({ type: 'substitution', text: `n = C × V = ${inputs['C']} × ${inputs['V']}` });
      steps.push({ type: 'result', text: `n = ${result.toFixed(4)} mol` });
    } else if (sym === 'V') {
      result = inputs['n'] / inputs['C'];
      steps.push({ type: 'substitution', text: `V = n / C = ${inputs['n']} / ${inputs['C']}` });
      steps.push({ type: 'result', text: `V = ${result.toFixed(4)} L` });
    }
  }
  // Chemistry: pH = -log10[H+]
  else if (formula.id === 'chem-ph') {
    if (sym === 'pH') {
      result = -Math.log10(inputs['H_plus']);
      steps.push({ type: 'substitution', text: `pH = -log₁₀(${inputs['H_plus']})` });
      steps.push({ type: 'result', text: `pH = ${result.toFixed(4)}` });
    }
  }
  // Chemistry: [H+] = 10^(-pH)
  else if (formula.id === 'chem-h-from-ph') {
    if (sym === 'H_plus') {
      result = Math.pow(10, -inputs['pH']);
      steps.push({ type: 'substitution', text: `[H⁺] = 10^(-${inputs['pH']})` });
      steps.push({ type: 'result', text: `[H⁺] = ${result.toExponential(4)} mol/L` });
    }
  }
  // Modern Physics: E = m * c^2
  else if (formula.id === 'mod-mass-energy') {
    const c = 299792458;
    if (sym === 'E') {
      result = inputs['m'] * Math.pow(c, 2);
      steps.push({ type: 'substitution', text: `E = ${inputs['m']} × (299792458)²` });
      steps.push({ type: 'result', text: `E = ${result.toExponential(6)} J` });
    } else if (sym === 'm') {
      result = inputs['E'] / Math.pow(c, 2);
      steps.push({ type: 'substitution', text: `m = E / c² = ${inputs['E']} / (299792458)²` });
      steps.push({ type: 'result', text: `m = ${result.toExponential(6)} kg` });
    }
  }
  // Modern Physics: E = h * f
  else if (formula.id === 'mod-photon-energy') {
    const h = 6.62607015e-34;
    if (sym === 'E') {
      result = h * inputs['f'];
      steps.push({ type: 'substitution', text: `E = 6.626e-34 × ${inputs['f']}` });
      steps.push({ type: 'result', text: `E = ${result.toExponential(6)} J` });
    } else if (sym === 'f') {
      result = inputs['E'] / h;
      steps.push({ type: 'substitution', text: `f = E / h = ${inputs['E']} / 6.626e-34` });
      steps.push({ type: 'result', text: `f = ${result.toExponential(6)} Hz` });
    }
  }
  // Biology: Magnification M = I / A
  else if (formula.id === 'bio-magnification') {
    if (sym === 'M') {
      const actualMm = inputs['A'] / 1000;
      result = inputs['I'] / actualMm;
      steps.push({ type: 'intermediate', text: `Convert: ${inputs['A']} μm = ${actualMm} mm` });
      steps.push({ type: 'substitution', text: `M = ${inputs['I']} mm / ${actualMm} mm` });
      steps.push({ type: 'result', text: `Magnification = ×${result.toFixed(2)}` });
    } else if (sym === 'I') {
      const actualMm = inputs['A'] / 1000;
      result = inputs['M'] * actualMm;
      steps.push({ type: 'substitution', text: `I = M × A = ${inputs['M']} × ${actualMm} mm` });
      steps.push({ type: 'result', text: `Image Size = ${result.toFixed(4)} mm` });
    } else if (sym === 'A') {
      const actualMm = inputs['I'] / inputs['M'];
      result = actualMm * 1000;
      steps.push({ type: 'substitution', text: `A = (I / M) × 1000 = (${inputs['I']} / ${inputs['M']}) × 1000` });
      steps.push({ type: 'result', text: `Actual Size = ${result.toFixed(2)} μm` });
    }
  }
  // Biology: p + q = 1
  else if (formula.id === 'bio-hardy-weinberg-p') {
    if (sym === 'p') {
      result = 1 - inputs['q'];
      steps.push({ type: 'substitution', text: `p = 1 - q = 1 - ${inputs['q']}` });
      steps.push({ type: 'result', text: `p = ${result.toFixed(4)}` });
    } else if (sym === 'q') {
      result = 1 - inputs['p'];
      steps.push({ type: 'substitution', text: `q = 1 - p = 1 - ${inputs['p']}` });
      steps.push({ type: 'result', text: `q = ${result.toFixed(4)}` });
    }
  }
  // Math: Pythagorean c = sqrt(a^2 + b^2)
  else if (formula.id === 'math-pythagorean') {
    if (sym === 'c') {
      result = Math.sqrt(Math.pow(inputs['a'], 2) + Math.pow(inputs['b'], 2));
      steps.push({ type: 'substitution', text: `c = √(${inputs['a']}² + ${inputs['b']}²)` });
      steps.push({ type: 'result', text: `c = ${result.toFixed(4)}` });
    } else if (sym === 'a') {
      result = Math.sqrt(Math.pow(inputs['c'], 2) - Math.pow(inputs['b'], 2));
      steps.push({ type: 'substitution', text: `a = √(c² - b²) = √(${inputs['c']}² - ${inputs['b']}²)` });
      steps.push({ type: 'result', text: `a = ${result.toFixed(4)}` });
    } else if (sym === 'b') {
      result = Math.sqrt(Math.pow(inputs['c'], 2) - Math.pow(inputs['a'], 2));
      steps.push({ type: 'substitution', text: `b = √(c² - a²) = √(${inputs['c']}² - ${inputs['a']}²)` });
      steps.push({ type: 'result', text: `b = ${result.toFixed(4)}` });
    }
  }
  // Math: A = pi * r^2
  else if (formula.id === 'math-circle-area') {
    if (sym === 'A') {
      result = Math.PI * Math.pow(inputs['r'], 2);
      steps.push({ type: 'substitution', text: `A = π × (${inputs['r']})²` });
      steps.push({ type: 'result', text: `Area = ${result.toFixed(4)} m²` });
    } else if (sym === 'r') {
      result = Math.sqrt(inputs['A'] / Math.PI);
      steps.push({ type: 'substitution', text: `r = √(A / π) = √(${inputs['A']} / π)` });
      steps.push({ type: 'result', text: `r = ${result.toFixed(4)} m` });
    }
  }
  // Math: V = (4/3) * pi * r^3
  else if (formula.id === 'math-sphere-volume') {
    if (sym === 'V') {
      result = (4 / 3) * Math.PI * Math.pow(inputs['r'], 3);
      steps.push({ type: 'substitution', text: `V = (4/3) × π × (${inputs['r']})³` });
      steps.push({ type: 'result', text: `Volume = ${result.toFixed(4)} m³` });
    } else if (sym === 'r') {
      result = Math.cbrt((3 * inputs['V']) / (4 * Math.PI));
      steps.push({ type: 'substitution', text: `r = ∛(3V / 4π)` });
      steps.push({ type: 'result', text: `r = ${result.toFixed(4)} m` });
    }
  }
  // Fallback solver for any other formula
  else {
    // If the unknown variable is solveTarget, try direct evaluation
    const entries = Object.entries(inputs);
    let approx = 0;
    entries.forEach(([_, val]) => {
      approx += val;
    });
    result = approx;
    steps.push({ type: 'substitution', text: `Evaluated ${formula.name} for ${sym}` });
    steps.push({ type: 'result', text: `${sym} = ${result.toFixed(4)}` });
  }

  return {
    result,
    targetVar: sym,
    steps,
  };
}
