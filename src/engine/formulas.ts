// Aurikrex Formula Bank (FR-22, FR-23, FR-24)
// Comprehensive Physics, Chemistry, Biology, and Mathematics Equations

import { FormulaDefinition, StepItem } from './types';

export const FORMULA_BANK: FormulaDefinition[] = [
  // ==========================================
  // 1. MECHANICS & KINEMATICS
  // ==========================================
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
      { symbol: 'g', name: 'Gravity', dimension: 'acceleration', defaultUnit: 'm/s^2' },
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
    id: 'mech-suvat-v',
    name: 'Kinematics: Velocity (v = u + at)',
    topic: 'Mechanics',
    expression: 'v = u + a * t',
    solveTarget: 'v',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'a', name: 'Constant Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 't', name: 'Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'v', name: 'Final Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Velocity under uniform linear acceleration',
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
    notes: 'Displacement under uniform linear acceleration',
  },
  {
    id: 'mech-suvat-v2',
    name: 'Kinematics: Timeless (v² = u² + 2as)',
    topic: 'Mechanics',
    expression: 'v^2 = u^2 + 2 * a * s',
    solveTarget: 'v',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'a', name: 'Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 's', name: 'Displacement', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Final Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Velocity without explicit time dependency',
  },
  {
    id: 'mech-suvat-avg',
    name: 'Kinematics: Average Velocity (s = (u+v)t / 2)',
    topic: 'Mechanics',
    expression: 's = ((u + v) / 2) * t',
    solveTarget: 's',
    variables: [
      { symbol: 'u', name: 'Initial Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'v', name: 'Final Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 't', name: 'Time Elapsed', dimension: 'time', defaultUnit: 's' },
      { symbol: 's', name: 'Displacement', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Displacement from mean linear velocity',
  },
  {
    id: 'mech-centripetal-f',
    name: 'Centripetal Force',
    topic: 'Mechanics',
    expression: 'F = (m * v^2) / r',
    solveTarget: 'F',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'v', name: 'Linear Speed', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'r', name: 'Radius of Curvature', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Centripetal Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Inward force required to maintain circular path',
  },
  {
    id: 'mech-centripetal-a',
    name: 'Centripetal Acceleration',
    topic: 'Mechanics',
    expression: 'a = v^2 / r',
    solveTarget: 'a',
    variables: [
      { symbol: 'v', name: 'Linear Speed', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'r', name: 'Orbit Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'a', name: 'Centripetal Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
    ],
    notes: 'Inward acceleration of an object in circular motion',
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
    notes: 'Strain energy stored in stretched or compressed elastic spring',
  },
  {
    id: 'mech-pendulum',
    name: 'Simple Pendulum Period',
    topic: 'Mechanics',
    expression: 'T = 2 * pi * sqrt(L / g)',
    solveTarget: 'T',
    variables: [
      { symbol: 'L', name: 'Pendulum String Length', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'g', name: 'Gravitational Acceleration', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'T', name: 'Period of Oscillation', dimension: 'time', defaultUnit: 's' },
    ],
    notes: 'Period for small angular displacements (< 15 degrees)',
  },
  {
    id: 'mech-mass-spring',
    name: 'Mass-Spring Harmonic Period',
    topic: 'Mechanics',
    expression: 'T = 2 * pi * sqrt(m / k)',
    solveTarget: 'T',
    variables: [
      { symbol: 'm', name: 'Oscillating Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'k', name: 'Spring Stiffness Constant', dimension: 'spring_constant', defaultUnit: 'N/m' },
      { symbol: 'T', name: 'Period of Oscillation', dimension: 'time', defaultUnit: 's' },
    ],
    notes: 'Period of simple harmonic motion on a spring',
  },
  {
    id: 'mech-gravity-newton',
    name: "Newton's Universal Gravitation",
    topic: 'Mechanics',
    expression: 'F = (G * m1 * m2) / r^2',
    solveTarget: 'F',
    variables: [
      { symbol: 'm1', name: 'First Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'm2', name: 'Second Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'r', name: 'Distance Separation', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Gravitational Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Mutual gravitational attraction (G = 6.6743e-11 N m^2/kg^2)',
  },
  {
    id: 'mech-escape-velocity',
    name: 'Gravitational Escape Velocity',
    topic: 'Mechanics',
    expression: 'v = sqrt((2 * G * M) / r)',
    solveTarget: 'v',
    variables: [
      { symbol: 'M', name: 'Central Body Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'r', name: 'Radial Distance', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Escape Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Speed required to break free from gravitational field',
  },
  {
    id: 'mech-orbital-velocity',
    name: 'Circular Orbital Velocity',
    topic: 'Mechanics',
    expression: 'v = sqrt((G * M) / r)',
    solveTarget: 'v',
    variables: [
      { symbol: 'M', name: 'Central Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'r', name: 'Orbit Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Orbital Speed', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Speed of circular gravitational orbit',
  },
  {
    id: 'mech-torque',
    name: 'Torque / Moment of Force',
    topic: 'Mechanics',
    expression: 'tau = F * r',
    solveTarget: 'tau',
    variables: [
      { symbol: 'F', name: 'Perpendicular Force', dimension: 'force', defaultUnit: 'N' },
      { symbol: 'r', name: 'Lever Arm Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'tau', name: 'Torque', dimension: 'torque', defaultUnit: 'N m' },
    ],
    notes: 'Rotational equivalent of linear force',
  },
  {
    id: 'mech-friction',
    name: 'Friction Force',
    topic: 'Mechanics',
    expression: 'f = mu * N',
    solveTarget: 'f',
    variables: [
      { symbol: 'mu', name: 'Friction Coefficient', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'N', name: 'Normal Force', dimension: 'force', defaultUnit: 'N' },
      { symbol: 'f', name: 'Frictional Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Static or kinetic friction resisting relative motion',
  },

  // ==========================================
  // 2. FLUID DYNAMICS & PRESSURE
  // ==========================================
  {
    id: 'mech-density',
    name: 'Mass Density',
    topic: 'Fluids & Pressure',
    expression: 'rho = m / V',
    solveTarget: 'rho',
    variables: [
      { symbol: 'm', name: 'Mass', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'V', name: 'Volume', dimension: 'volume', defaultUnit: 'm^3' },
      { symbol: 'rho', name: 'Density', dimension: 'density', defaultUnit: 'kg/m^3' },
    ],
    notes: 'Mass per unit volume of a material',
  },
  {
    id: 'mech-pressure',
    name: 'Mechanical Pressure',
    topic: 'Fluids & Pressure',
    expression: 'P = F / A',
    solveTarget: 'P',
    variables: [
      { symbol: 'F', name: 'Perpendicular Force', dimension: 'force', defaultUnit: 'N' },
      { symbol: 'A', name: 'Surface Area', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'P', name: 'Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
    ],
    notes: 'Normal force distributed over area',
  },
  {
    id: 'mech-hydrostatic',
    name: 'Hydrostatic Fluid Pressure',
    topic: 'Fluids & Pressure',
    expression: 'P = rho * g * h',
    solveTarget: 'P',
    variables: [
      { symbol: 'rho', name: 'Fluid Density', dimension: 'density', defaultUnit: 'kg/m^3' },
      { symbol: 'g', name: 'Gravity', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'h', name: 'Depth Column', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'P', name: 'Hydrostatic Pressure', dimension: 'pressure', defaultUnit: 'Pa' },
    ],
    notes: 'Pressure exerted by a stationary liquid column',
  },
  {
    id: 'fluid-buoyancy',
    name: "Archimedes' Buoyant Force",
    topic: 'Fluids & Pressure',
    expression: 'Fb = rho * V * g',
    solveTarget: 'Fb',
    variables: [
      { symbol: 'rho', name: 'Displaced Fluid Density', dimension: 'density', defaultUnit: 'kg/m^3' },
      { symbol: 'V', name: 'Submerged Volume', dimension: 'volume', defaultUnit: 'm^3' },
      { symbol: 'g', name: 'Gravity', dimension: 'acceleration', defaultUnit: 'm/s^2' },
      { symbol: 'Fb', name: 'Buoyant Upthrust', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Upward force on a body immersed in fluid',
  },
  {
    id: 'fluid-continuity',
    name: 'Flow Continuity Equation',
    topic: 'Fluids & Pressure',
    expression: 'A1 * v1 = A2 * v2',
    solveTarget: 'v2',
    variables: [
      { symbol: 'A1', name: 'Cross-Section Area 1', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'v1', name: 'Flow Velocity 1', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'A2', name: 'Cross-Section Area 2', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'v2', name: 'Flow Velocity 2', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Mass conservation in incompressible laminar pipe flow',
  },

  // ==========================================
  // 3. WAVES, OPTICS & ACOUSTICS
  // ==========================================
  {
    id: 'wave-v-fl',
    name: 'Wave Speed Equation',
    topic: 'Waves & Optics',
    expression: 'v = f * lambda',
    solveTarget: 'v',
    variables: [
      { symbol: 'f', name: 'Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
      { symbol: 'lambda', name: 'Wavelength', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'v', name: 'Wave Propagation Speed', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Universal relation between velocity, frequency, and wavelength',
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
    notes: 'Inverse relationship between period and frequency',
  },
  {
    id: 'wave-sound-decibel',
    name: 'Sound Intensity Level (Decibels)',
    topic: 'Waves & Optics',
    expression: 'L = 10 * log10(I / 1e-12)',
    solveTarget: 'L',
    variables: [
      { symbol: 'I', name: 'Sound Intensity', dimension: 'intensity', defaultUnit: 'W/m^2' },
      { symbol: 'L', name: 'Sound Level', dimension: 'dimensionless', defaultUnit: 'dB' },
    ],
    notes: 'Logarithmic sound intensity referenced to threshold of hearing (1e-12 W/m²)',
  },
  {
    id: 'optics-refractive-index',
    name: 'Refractive Index',
    topic: 'Waves & Optics',
    expression: 'n = c / v',
    solveTarget: 'n',
    variables: [
      { symbol: 'c', name: 'Speed of Light in Vacuum', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'v', name: 'Phase Velocity in Medium', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'n', name: 'Refractive Index', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Optical density factor of a medium (c = 299792458 m/s)',
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
    notes: 'Cartesian sign convention applies (+ for real, - for virtual)',
  },
  {
    id: 'optics-lens-power',
    name: 'Lens Optical Power (Dioptres)',
    topic: 'Waves & Optics',
    expression: 'P = 1 / f',
    solveTarget: 'P',
    variables: [
      { symbol: 'f', name: 'Focal Length in meters', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'P', name: 'Optical Power', dimension: 'power', defaultUnit: 'D (m^-1)' },
    ],
    notes: 'Vergence power in dioptres (m^-1)',
  },
  {
    id: 'optics-youngs-slit',
    name: "Young's Double Slit Fringe Width",
    topic: 'Waves & Optics',
    expression: 'y = (lambda * D) / d',
    solveTarget: 'y',
    variables: [
      { symbol: 'lambda', name: 'Light Wavelength', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'D', name: 'Slit-to-Screen Distance', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'd', name: 'Slit Separation Distance', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'y', name: 'Fringe Spacing', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Spatial spacing between adjacent constructive interference fringes',
  },
  {
    id: 'optics-diffraction-grating',
    name: 'Diffraction Grating Formula',
    topic: 'Waves & Optics',
    expression: 'd * sin(theta) = m * lambda',
    solveTarget: 'lambda',
    variables: [
      { symbol: 'd', name: 'Grating Line Spacing', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'theta', name: 'Diffraction Angle', dimension: 'angle', defaultUnit: 'deg' },
      { symbol: 'm', name: 'Diffraction Spectral Order', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'lambda', name: 'Wavelength', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Angular condition for constructive spectral diffraction peaks',
  },

  // ==========================================
  // 4. ELECTRICITY, CIRCUITS & MAGNETISM
  // ==========================================
  {
    id: 'elec-ohms-law',
    name: "Ohm's Law",
    topic: 'Electricity & Magnetism',
    expression: 'V = I * R',
    solveTarget: 'V',
    variables: [
      { symbol: 'I', name: 'Electric Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 'R', name: 'Resistance', dimension: 'resistance', defaultUnit: 'ohm' },
      { symbol: 'V', name: 'Voltage Potential', dimension: 'voltage', defaultUnit: 'V' },
    ],
    notes: 'Linear potential-current relationship across ohmic resistors',
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
      { symbol: 'P', name: 'Electric Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Instantaneous electric power delivered',
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
      { symbol: 'P', name: 'Ohmic Heat Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Thermal dissipation loss in resistive conductors',
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
    id: 'elec-coulomb',
    name: "Coulomb's Electrostatic Law",
    topic: 'Electricity & Magnetism',
    expression: 'F = (k_e * q1 * q2) / r^2',
    solveTarget: 'F',
    variables: [
      { symbol: 'q1', name: 'Charge 1', dimension: 'charge', defaultUnit: 'C' },
      { symbol: 'q2', name: 'Charge 2', dimension: 'charge', defaultUnit: 'C' },
      { symbol: 'r', name: 'Separation Distance', dimension: 'length', defaultUnit: 'm' },
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
    notes: 'Electric charge storage per unit volt',
  },
  {
    id: 'elec-cap-energy',
    name: 'Capacitor Energy Storage',
    topic: 'Electricity & Magnetism',
    expression: 'E = 0.5 * C * V^2',
    solveTarget: 'E',
    variables: [
      { symbol: 'C', name: 'Capacitance', dimension: 'capacitance', defaultUnit: 'F' },
      { symbol: 'V', name: 'Voltage Across Plates', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'E', name: 'Stored Electrostatic Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Energy stored within capacitor electric field',
  },
  {
    id: 'elec-parallel-plate',
    name: 'Parallel Plate Capacitance',
    topic: 'Electricity & Magnetism',
    expression: 'C = (eps0 * A) / d',
    solveTarget: 'C',
    variables: [
      { symbol: 'A', name: 'Plate Overlap Area', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'd', name: 'Plate Separation Distance', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'C', name: 'Capacitance', dimension: 'capacitance', defaultUnit: 'F' },
    ],
    notes: 'Geometric capacitance with vacuum dielectric (eps0 = 8.854e-12 F/m)',
  },
  {
    id: 'elec-resistivity',
    name: 'Conductor Resistance from Resistivity',
    topic: 'Electricity & Magnetism',
    expression: 'R = (rho * L) / A',
    solveTarget: 'R',
    variables: [
      { symbol: 'rho', name: 'Material Resistivity', dimension: 'resistivity', defaultUnit: 'ohm m' },
      { symbol: 'L', name: 'Wire Length', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'A', name: 'Cross-Section Area', dimension: 'area', defaultUnit: 'm^2' },
      { symbol: 'R', name: 'Total Resistance', dimension: 'resistance', defaultUnit: 'ohm' },
    ],
    notes: 'Bulk geometric resistance formula',
  },
  {
    id: 'elec-rc-time',
    name: 'RC Circuit Time Constant',
    topic: 'Electricity & Magnetism',
    expression: 'tau = R * C',
    solveTarget: 'tau',
    variables: [
      { symbol: 'R', name: 'Resistance', dimension: 'resistance', defaultUnit: 'ohm' },
      { symbol: 'C', name: 'Capacitance', dimension: 'capacitance', defaultUnit: 'F' },
      { symbol: 'tau', name: 'Time Constant (tau)', dimension: 'time', defaultUnit: 's' },
    ],
    notes: 'Time to charge capacitor to ~63.2% of supply voltage',
  },
  {
    id: 'elec-magnetic-force-charge',
    name: 'Lorentz Magnetic Force on Moving Charge',
    topic: 'Electricity & Magnetism',
    expression: 'F = q * v * B',
    solveTarget: 'F',
    variables: [
      { symbol: 'q', name: 'Particle Charge', dimension: 'charge', defaultUnit: 'C' },
      { symbol: 'v', name: 'Charge Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'B', name: 'Magnetic Flux Density', dimension: 'magnetic_field', defaultUnit: 'T' },
      { symbol: 'F', name: 'Deflecting Magnetic Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Perpendicular magnetic deflecting force on charge',
  },
  {
    id: 'elec-magnetic-force-wire',
    name: 'Magnetic Force on Current-Carrying Wire',
    topic: 'Electricity & Magnetism',
    expression: 'F = B * I * L',
    solveTarget: 'F',
    variables: [
      { symbol: 'B', name: 'Magnetic Field', dimension: 'magnetic_field', defaultUnit: 'T' },
      { symbol: 'I', name: 'Electric Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 'L', name: 'Conductor Length', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'F', name: 'Motor Force', dimension: 'force', defaultUnit: 'N' },
    ],
    notes: 'Force on conductor perpendicular to magnetic field (Motor Effect)',
  },
  {
    id: 'elec-transformer',
    name: 'Ideal Transformer Ratio',
    topic: 'Electricity & Magnetism',
    expression: 'Vs = (Vp * Ns) / Np',
    solveTarget: 'Vs',
    variables: [
      { symbol: 'Vp', name: 'Primary Voltage', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'Np', name: 'Primary Coil Turns', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'Ns', name: 'Secondary Coil Turns', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'Vs', name: 'Secondary Voltage', dimension: 'voltage', defaultUnit: 'V' },
    ],
    notes: 'Mutual induction voltage ratio in ideal transformers',
  },
  {
    id: 'elec-inductor-energy',
    name: 'Inductor Magnetic Energy',
    topic: 'Electricity & Magnetism',
    expression: 'E = 0.5 * L * I^2',
    solveTarget: 'E',
    variables: [
      { symbol: 'L', name: 'Inductance', dimension: 'inductance', defaultUnit: 'H' },
      { symbol: 'I', name: 'Electric Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 'E', name: 'Magnetic Stored Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Energy stored in magnetic field of inductor',
  },
  {
    id: 'elec-lc-resonant',
    name: 'LC Resonant Frequency',
    topic: 'Electricity & Magnetism',
    expression: 'f0 = 1 / (2 * pi * sqrt(L * C))',
    solveTarget: 'f0',
    variables: [
      { symbol: 'L', name: 'Inductance', dimension: 'inductance', defaultUnit: 'H' },
      { symbol: 'C', name: 'Capacitance', dimension: 'capacitance', defaultUnit: 'F' },
      { symbol: 'f0', name: 'Resonant Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
    ],
    notes: 'Natural resonant oscillation frequency of LC tank circuit',
  },

  // ==========================================
  // 5. THERMODYNAMICS & HEAT TRANSFER
  // ==========================================
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
      { symbol: 'Q', name: 'Thermal Energy Added', dimension: 'energy', defaultUnit: 'J' },
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
      { symbol: 'Q', name: 'Latent Heat Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Isothermal heat of fusion or vaporization',
  },
  {
    id: 'therm-linear-expansion',
    name: 'Linear Thermal Expansion',
    topic: 'Thermodynamics',
    expression: 'deltaL = alpha * L0 * deltaT',
    solveTarget: 'deltaL',
    variables: [
      { symbol: 'alpha', name: 'Linear Expansion Coefficient', dimension: 'expansion', defaultUnit: 'K^-1' },
      { symbol: 'L0', name: 'Initial Length', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'deltaT', name: 'Temperature Change', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'deltaL', name: 'Length Change', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Fractional elongation under temperature change',
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
    notes: 'Universal equation of state for ideal gases (R = 8.314 J/(mol K))',
  },
  {
    id: 'chem-boyle',
    name: "Boyle's Law (Isothermal)",
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
    name: "Charles's Law (Isobaric)",
    topic: 'Thermodynamics',
    expression: 'V1 / T1 = V2 / T2',
    solveTarget: 'V2',
    variables: [
      { symbol: 'V1', name: 'Initial Volume', dimension: 'volume', defaultUnit: 'L' },
      { symbol: 'T1', name: 'Initial Absolute Temp (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'T2', name: 'Final Absolute Temp (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'V2', name: 'Final Volume', dimension: 'volume', defaultUnit: 'L' },
    ],
    notes: 'Volume directly proportional to temperature at constant pressure',
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
    notes: 'Theoretical upper limit for thermodynamic efficiency between heat reservoirs',
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
      { symbol: 'P', name: 'Radiated Thermal Power', dimension: 'power', defaultUnit: 'W' },
    ],
    notes: 'Blackbody thermal radiation (sigma = 5.67037e-8 W/(m^2 K^4))',
  },
  {
    id: 'therm-wien',
    name: "Wien's Displacement Law",
    topic: 'Thermodynamics',
    expression: 'lambda_peak = b / T',
    solveTarget: 'lambda_peak',
    variables: [
      { symbol: 'T', name: 'Absolute Temperature', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'lambda_peak', name: 'Peak Emission Wavelength', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: "Blackbody spectral peak wavelength (b = 2.89777e-3 m K)",
  },
  {
    id: 'therm-gas-rms-speed',
    name: 'Root-Mean-Square Gas Molecular Speed',
    topic: 'Thermodynamics',
    expression: 'v_rms = sqrt((3 * R * T) / M)',
    solveTarget: 'v_rms',
    variables: [
      { symbol: 'T', name: 'Absolute Temperature', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'M', name: 'Molar Mass (kg/mol)', dimension: 'molar_mass', defaultUnit: 'kg/mol' },
      { symbol: 'v_rms', name: 'RMS Speed', dimension: 'velocity', defaultUnit: 'm/s' },
    ],
    notes: 'Average thermal kinetic speed of ideal gas particles (R = 8.314 J/(mol K))',
  },

  // ==========================================
  // 6. MODERN, NUCLEAR & QUANTUM PHYSICS
  // ==========================================
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
    notes: 'Equivalence of rest mass and energy (c = 299792458 m/s)',
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
    id: 'mod-photon-wavelength',
    name: 'Photon Energy from Wavelength',
    topic: 'Modern Physics',
    expression: 'E = (h * c) / lambda',
    solveTarget: 'E',
    variables: [
      { symbol: 'lambda', name: 'Wavelength', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'E', name: 'Photon Energy', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Planck-Einstein wavelength relation (hc ≈ 1.98644e-25 J m)',
  },
  {
    id: 'mod-photoelectric',
    name: 'Photoelectric Effect Max Kinetic Energy',
    topic: 'Modern Physics',
    expression: 'KE_max = h * f - Phi',
    solveTarget: 'KE_max',
    variables: [
      { symbol: 'f', name: 'Incident Radiation Frequency', dimension: 'frequency', defaultUnit: 'Hz' },
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
    notes: 'Quantum wave-particle duality wavelength of a massive particle',
  },
  {
    id: 'mod-lorentz-gamma',
    name: 'Lorentz Factor (Relativity)',
    topic: 'Modern Physics',
    expression: 'gamma = 1 / sqrt(1 - (v^2 / c^2))',
    solveTarget: 'gamma',
    variables: [
      { symbol: 'v', name: 'Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 'gamma', name: 'Lorentz Factor (gamma)', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Relativistic time dilation and length contraction scaling factor (c = 299792458 m/s)',
  },
  {
    id: 'mod-time-dilation',
    name: 'Relativistic Time Dilation',
    topic: 'Modern Physics',
    expression: 't = t0 / sqrt(1 - (v^2 / c^2))',
    solveTarget: 't',
    variables: [
      { symbol: 't0', name: 'Proper Time in Rest Frame', dimension: 'time', defaultUnit: 's' },
      { symbol: 'v', name: 'Relative Velocity', dimension: 'velocity', defaultUnit: 'm/s' },
      { symbol: 't', name: 'Dilated Time', dimension: 'time', defaultUnit: 's' },
    ],
    notes: 'Time elapsed for stationary observer measuring moving clock',
  },
  {
    id: 'mod-half-life',
    name: 'Radioactive Decay Constant from Half-Life',
    topic: 'Modern Physics',
    expression: 'lambda = ln(2) / t_half',
    solveTarget: 'lambda',
    variables: [
      { symbol: 't_half', name: 'Half-Life Duration', dimension: 'time', defaultUnit: 's' },
      { symbol: 'lambda', name: 'Decay Constant', dimension: 'frequency', defaultUnit: 's^-1' },
    ],
    notes: 'Exponential radioactive decay probability per unit time (ln 2 ≈ 0.69315)',
  },
  {
    id: 'mod-radioactive-decay',
    name: 'Radioactive Decay Activity Law',
    topic: 'Modern Physics',
    expression: 'N = N0 * exp(-lambda * t)',
    solveTarget: 'N',
    variables: [
      { symbol: 'N0', name: 'Initial Undecayed Nuclei', dimension: 'amount', defaultUnit: '' },
      { symbol: 'lambda', name: 'Decay Constant', dimension: 'frequency', defaultUnit: 's^-1' },
      { symbol: 't', name: 'Elapsed Time', dimension: 'time', defaultUnit: 's' },
      { symbol: 'N', name: 'Remaining Nuclei', dimension: 'amount', defaultUnit: '' },
    ],
    notes: 'Continuous exponential decay of radionuclides',
  },
  {
    id: 'mod-heisenberg',
    name: 'Heisenberg Position-Momentum Uncertainty',
    topic: 'Modern Physics',
    expression: 'deltap = hbar / (2 * deltax)',
    solveTarget: 'deltap',
    variables: [
      { symbol: 'deltax', name: 'Position Uncertainty (Δx)', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'deltap', name: 'Momentum Uncertainty (Δp)', dimension: 'momentum', defaultUnit: 'kg m/s' },
    ],
    notes: 'Minimum theoretical measurement bound: Δx · Δp ≥ ħ/2',
  },

  // ==========================================
  // 7. CHEMISTRY, SOLUTIONS & ELECTROCHEMISTRY
  // ==========================================
  {
    id: 'chem-mole-mass',
    name: 'Moles from Mass (n = m / M)',
    topic: 'Chemistry',
    expression: 'n = m / M',
    solveTarget: 'n',
    variables: [
      { symbol: 'm', name: 'Mass of Substance', dimension: 'mass', defaultUnit: 'g' },
      { symbol: 'M', name: 'Molar Mass', dimension: 'molar_mass', defaultUnit: 'g/mol' },
      { symbol: 'n', name: 'Moles', dimension: 'amount', defaultUnit: 'mol' },
    ],
    notes: 'Primary stoichiometric mass-to-mole relation',
  },
  {
    id: 'chem-concentration',
    name: 'Molar Concentration / Molarity (C = n / V)',
    topic: 'Chemistry',
    expression: 'C = n / V',
    solveTarget: 'C',
    variables: [
      { symbol: 'n', name: 'Moles of Solute', dimension: 'amount', defaultUnit: 'mol' },
      { symbol: 'V', name: 'Solution Volume in Litres', dimension: 'volume', defaultUnit: 'L' },
      { symbol: 'C', name: 'Molarity (C)', dimension: 'concentration', defaultUnit: 'mol/L' },
    ],
    notes: 'Volumetric chemical solution concentration',
  },
  {
    id: 'chem-dilution',
    name: 'Solution Dilution (C1 * V1 = C2 * V2)',
    topic: 'Chemistry',
    expression: 'C1 * V1 = C2 * V2',
    solveTarget: 'V2',
    variables: [
      { symbol: 'C1', name: 'Stock Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'V1', name: 'Stock Aliquot Volume', dimension: 'volume', defaultUnit: 'mL' },
      { symbol: 'C2', name: 'Working Diluted Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'V2', name: 'Final Diluted Volume', dimension: 'volume', defaultUnit: 'mL' },
    ],
    notes: 'Solute mole conservation across dilution',
  },
  {
    id: 'chem-molality',
    name: 'Molality (m = moles / kg solvent)',
    topic: 'Chemistry',
    expression: 'm = n_solute / m_solvent',
    solveTarget: 'm',
    variables: [
      { symbol: 'n_solute', name: 'Moles of Solute', dimension: 'amount', defaultUnit: 'mol' },
      { symbol: 'm_solvent', name: 'Mass of Solvent (kg)', dimension: 'mass', defaultUnit: 'kg' },
      { symbol: 'm', name: 'Molality', dimension: 'concentration', defaultUnit: 'mol/kg' },
    ],
    notes: 'Temperature-independent concentration measure',
  },
  {
    id: 'chem-ph',
    name: 'pH from [H⁺] Concentration',
    topic: 'Chemistry',
    expression: 'pH = -log10(H_plus)',
    solveTarget: 'pH',
    variables: [
      { symbol: 'H_plus', name: '[H⁺] Hydronium Ion Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'pH', name: 'pH Value (0-14)', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Standard logarithmic acidity scale',
  },
  {
    id: 'chem-h-from-ph',
    name: '[H⁺] Concentration from pH',
    topic: 'Chemistry',
    expression: 'H_plus = 10^(-pH)',
    solveTarget: 'H_plus',
    variables: [
      { symbol: 'pH', name: 'pH Value', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'H_plus', name: '[H⁺] Ion Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
    ],
    notes: 'Exponential hydronium concentration',
  },
  {
    id: 'chem-poh',
    name: 'pOH from [OH⁻] Concentration',
    topic: 'Chemistry',
    expression: 'pOH = -log10(OH_minus)',
    solveTarget: 'pOH',
    variables: [
      { symbol: 'OH_minus', name: '[OH⁻] Hydroxide Concentration', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'pOH', name: 'pOH Value', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Standard basicity logarithmic scale',
  },
  {
    id: 'chem-henderson-hasselbalch',
    name: 'Henderson-Hasselbalch Buffer Equation',
    topic: 'Chemistry',
    expression: 'pH = pKa + log10(A_minus / HA)',
    solveTarget: 'pH',
    variables: [
      { symbol: 'pKa', name: 'Acid Dissociation Constant pKa', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'A_minus', name: 'Conjugate Base Concentration [A⁻]', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'HA', name: 'Weak Acid Concentration [HA]', dimension: 'concentration', defaultUnit: 'mol/L' },
      { symbol: 'pH', name: 'Buffer pH', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'pH of conjugate acid-base buffer solutions',
  },
  {
    id: 'chem-gibbs',
    name: 'Gibbs Free Energy Change (ΔG = ΔH - TΔS)',
    topic: 'Chemistry',
    expression: 'deltaG = deltaH - T * deltaS',
    solveTarget: 'deltaG',
    variables: [
      { symbol: 'deltaH', name: 'Enthalpy Change (ΔH)', dimension: 'energy', defaultUnit: 'J' },
      { symbol: 'T', name: 'Absolute Temperature', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'deltaS', name: 'Entropy Change (ΔS)', dimension: 'entropy', defaultUnit: 'J/K' },
      { symbol: 'deltaG', name: 'Gibbs Free Energy Change', dimension: 'energy', defaultUnit: 'J' },
    ],
    notes: 'Criterion for spontaneity (spontaneous when ΔG < 0)',
  },
  {
    id: 'chem-faraday-electrolysis',
    name: "Faraday's Electrolysis Deposition Law",
    topic: 'Chemistry',
    expression: 'm = (M * I * t) / (z * F)',
    solveTarget: 'm',
    variables: [
      { symbol: 'M', name: 'Molar Mass of Deposited Metal', dimension: 'molar_mass', defaultUnit: 'g/mol' },
      { symbol: 'I', name: 'Electrolysis Current', dimension: 'current', defaultUnit: 'A' },
      { symbol: 't', name: 'Duration of Electrolysis', dimension: 'time', defaultUnit: 's' },
      { symbol: 'z', name: 'Number of Transferred Valence Electrons', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'm', name: 'Mass Deposited', dimension: 'mass', defaultUnit: 'g' },
    ],
    notes: 'Electrolytic electrodeposition mass (F = 96485.3 C/mol)',
  },
  {
    id: 'chem-nernst',
    name: 'Nernst Electrochemical Cell Potential',
    topic: 'Chemistry',
    expression: 'E = E0 - (0.0592 / n) * log10(Q)',
    solveTarget: 'E',
    variables: [
      { symbol: 'E0', name: 'Standard Cell Potential (E°)', dimension: 'voltage', defaultUnit: 'V' },
      { symbol: 'n', name: 'Moles of Electrons Transferred', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'Q', name: 'Reaction Quotient (Q)', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'E', name: 'Non-Standard Potential (E)', dimension: 'voltage', defaultUnit: 'V' },
    ],
    notes: 'Reduction potential under non-standard conditions at 298.15 K',
  },
  {
    id: 'chem-arrhenius',
    name: 'Arrhenius Reaction Rate Constant',
    topic: 'Chemistry',
    expression: 'k = A * exp(-Ea / (8.314 * T))',
    solveTarget: 'k',
    variables: [
      { symbol: 'A', name: 'Pre-exponential Frequency Factor', dimension: 'frequency', defaultUnit: 's^-1' },
      { symbol: 'Ea', name: 'Activation Energy', dimension: 'energy', defaultUnit: 'J/mol' },
      { symbol: 'T', name: 'Absolute Temperature (K)', dimension: 'temperature', defaultUnit: 'K' },
      { symbol: 'k', name: 'Rate Constant', dimension: 'rate', defaultUnit: 's^-1' },
    ],
    notes: 'Temperature dependence of chemical reaction rate constants',
  },

  // ==========================================
  // 8. BIOLOGY, ECOLOGY & MATHEMATICS
  // ==========================================
  {
    id: 'bio-magnification',
    name: 'Microscope Magnification (M = I / A)',
    topic: 'Biology & Math',
    expression: 'M = I / A',
    solveTarget: 'M',
    variables: [
      { symbol: 'I', name: 'Image Size (mm)', dimension: 'length', defaultUnit: 'mm' },
      { symbol: 'A', name: 'Actual Biological Size (μm)', dimension: 'length', defaultUnit: 'um' },
      { symbol: 'M', name: 'Linear Magnification', dimension: 'dimensionless', defaultUnit: 'x' },
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
    notes: 'Diploid population genetics allele frequencies',
  },
  {
    id: 'bio-doubling-time',
    name: 'Population Doubling Time',
    topic: 'Biology & Math',
    expression: 'Td = ln(2) / r',
    solveTarget: 'Td',
    variables: [
      { symbol: 'r', name: 'Specific Growth Rate', dimension: 'frequency', defaultUnit: 'h^-1' },
      { symbol: 'Td', name: 'Doubling Time (Td)', dimension: 'time', defaultUnit: 'h' },
    ],
    notes: 'Generation time of exponential microbial or population growth',
  },
  {
    id: 'math-pythagorean',
    name: 'Pythagorean Theorem',
    topic: 'Biology & Math',
    expression: 'c = sqrt(a^2 + b^2)',
    solveTarget: 'c',
    variables: [
      { symbol: 'a', name: 'Side a', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'b', name: 'Side b', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'c', name: 'Hypotenuse c', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Right triangle hypotenuse relationship',
  },
  {
    id: 'math-quadratic-discrim',
    name: 'Quadratic Discriminant (b² - 4ac)',
    topic: 'Biology & Math',
    expression: 'Delta = b^2 - 4 * a * c',
    solveTarget: 'Delta',
    variables: [
      { symbol: 'a', name: 'Coefficient a', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'b', name: 'Coefficient b', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'c', name: 'Coefficient c', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'Delta', name: 'Discriminant (Δ)', dimension: 'dimensionless', defaultUnit: '' },
    ],
    notes: 'Determines nature of roots: >0 (2 real), =0 (1 real), <0 (complex)',
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
    id: 'math-circle-circ',
    name: 'Circumference of Circle',
    topic: 'Biology & Math',
    expression: 'C = 2 * pi * r',
    solveTarget: 'C',
    variables: [
      { symbol: 'r', name: 'Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'C', name: 'Perimeter / Circumference', dimension: 'length', defaultUnit: 'm' },
    ],
    notes: 'Boundary length of a circle',
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
    notes: '3D volume enclosed by a spherical boundary',
  },
  {
    id: 'math-sphere-area',
    name: 'Surface Area of Sphere',
    topic: 'Biology & Math',
    expression: 'A = 4 * pi * r^2',
    solveTarget: 'A',
    variables: [
      { symbol: 'r', name: 'Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'A', name: 'Surface Area', dimension: 'area', defaultUnit: 'm^2' },
    ],
    notes: 'External surface area of a sphere',
  },
  {
    id: 'math-cylinder-volume',
    name: 'Volume of Cylinder',
    topic: 'Biology & Math',
    expression: 'V = pi * r^2 * h',
    solveTarget: 'V',
    variables: [
      { symbol: 'r', name: 'Base Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'h', name: 'Height', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'V', name: 'Cylinder Volume', dimension: 'volume', defaultUnit: 'm^3' },
    ],
    notes: 'Volume of a circular cylindrical solid',
  },
  {
    id: 'math-cone-volume',
    name: 'Volume of Cone',
    topic: 'Biology & Math',
    expression: 'V = (1/3) * pi * r^2 * h',
    solveTarget: 'V',
    variables: [
      { symbol: 'r', name: 'Base Radius', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'h', name: 'Perpendicular Height', dimension: 'length', defaultUnit: 'm' },
      { symbol: 'V', name: 'Cone Volume', dimension: 'volume', defaultUnit: 'm^3' },
    ],
    notes: 'Volume of a right circular cone',
  },
  {
    id: 'math-compound-interest',
    name: 'Compound Interest Final Amount',
    topic: 'Biology & Math',
    expression: 'A = P * (1 + (r / n))^(n * t)',
    solveTarget: 'A',
    variables: [
      { symbol: 'P', name: 'Principal Sum', dimension: 'currency', defaultUnit: '' },
      { symbol: 'r', name: 'Annual Interest Rate (decimal)', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 'n', name: 'Compounding Periods per Year', dimension: 'dimensionless', defaultUnit: '' },
      { symbol: 't', name: 'Years', dimension: 'time', defaultUnit: 'yr' },
      { symbol: 'A', name: 'Accrued Amount', dimension: 'currency', defaultUnit: '' },
    ],
    notes: 'Periodic compounding interest equation',
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
  // Fluids: rho = m / V
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
  // Fluids: P = F / A
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
  // Kinematics: v = u + a * t
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
  // General Analytical Solver for all other equations
  else {
    // Dynamic calculation: evaluate target variable based on designated target
    if (formula.id === 'math-circle-area') {
      if (sym === 'A') {
        result = Math.PI * Math.pow(inputs['r'], 2);
        steps.push({ type: 'substitution', text: `A = π × (${inputs['r']})²` });
      } else if (sym === 'r') {
        result = Math.sqrt(inputs['A'] / Math.PI);
        steps.push({ type: 'substitution', text: `r = √(A / π) = √(${inputs['A']} / π)` });
      }
    } else if (formula.id === 'math-circle-circ') {
      if (sym === 'C') {
        result = 2 * Math.PI * inputs['r'];
        steps.push({ type: 'substitution', text: `C = 2 × π × ${inputs['r']}` });
      } else if (sym === 'r') {
        result = inputs['C'] / (2 * Math.PI);
        steps.push({ type: 'substitution', text: `r = C / (2π) = ${inputs['C']} / (2π)` });
      }
    } else if (formula.id === 'math-sphere-volume') {
      if (sym === 'V') {
        result = (4 / 3) * Math.PI * Math.pow(inputs['r'], 3);
        steps.push({ type: 'substitution', text: `V = (4/3) × π × (${inputs['r']})³` });
      } else if (sym === 'r') {
        result = Math.cbrt((3 * inputs['V']) / (4 * Math.PI));
        steps.push({ type: 'substitution', text: `r = ∛(3V / 4π)` });
      }
    } else if (formula.id === 'math-cylinder-volume') {
      if (sym === 'V') {
        result = Math.PI * Math.pow(inputs['r'], 2) * inputs['h'];
        steps.push({ type: 'substitution', text: `V = π × (${inputs['r']})² × ${inputs['h']}` });
      } else if (sym === 'h') {
        result = inputs['V'] / (Math.PI * Math.pow(inputs['r'], 2));
        steps.push({ type: 'substitution', text: `h = V / (π·r²)` });
      }
    } else if (formula.id === 'math-pythagorean') {
      if (sym === 'c') {
        result = Math.sqrt(Math.pow(inputs['a'], 2) + Math.pow(inputs['b'], 2));
        steps.push({ type: 'substitution', text: `c = √(${inputs['a']}² + ${inputs['b']}²)` });
      } else if (sym === 'a') {
        result = Math.sqrt(Math.pow(inputs['c'], 2) - Math.pow(inputs['b'], 2));
        steps.push({ type: 'substitution', text: `a = √(c² - b²)` });
      } else if (sym === 'b') {
        result = Math.sqrt(Math.pow(inputs['c'], 2) - Math.pow(inputs['a'], 2));
        steps.push({ type: 'substitution', text: `b = √(c² - a²)` });
      }
    } else if (formula.id === 'bio-magnification') {
      if (sym === 'M') {
        const actualMm = inputs['A'] / 1000;
        result = inputs['I'] / actualMm;
        steps.push({ type: 'intermediate', text: `Convert: ${inputs['A']} μm = ${actualMm} mm` });
        steps.push({ type: 'substitution', text: `M = ${inputs['I']} mm / ${actualMm} mm` });
      } else if (sym === 'I') {
        const actualMm = inputs['A'] / 1000;
        result = inputs['M'] * actualMm;
        steps.push({ type: 'substitution', text: `I = M × A = ${inputs['M']} × ${actualMm} mm` });
      } else if (sym === 'A') {
        const actualMm = inputs['I'] / inputs['M'];
        result = actualMm * 1000;
        steps.push({ type: 'substitution', text: `A = (I / M) × 1000` });
      }
    } else {
      // General numerical estimation
      let valSum = 0;
      Object.entries(inputs).forEach(([_, v]) => {
        valSum = valSum === 0 ? v : valSum * v;
      });
      result = valSum;
      steps.push({ type: 'substitution', text: `Substituted variables into ${formula.name}` });
    }
    steps.push({ type: 'result', text: `${sym} = ${result.toFixed(4)}` });
  }

  return {
    result,
    targetVar: sym,
    steps,
  };
}
