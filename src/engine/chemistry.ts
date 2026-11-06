// Aurikrex Chemistry Engine (FR-25)
// Complete 118 Chemical Elements

export type ElementCategory =
  | 'nonmetal'
  | 'noble-gas'
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition'
  | 'metalloid'
  | 'halogen'
  | 'lanthanide'
  | 'actinide';

export interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  group: number; // 1 to 18 (18 is Group 0)
  period: number; // 1 to 7
  category: ElementCategory;
  radioactive: boolean;
}

export const PERIODIC_TABLE: Record<string, ElementData> = {
  // Period 1
  H: { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, group: 1, period: 1, category: 'nonmetal', radioactive: false },
  He: { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.0026, group: 18, period: 1, category: 'noble-gas', radioactive: false },

  // Period 2
  Li: { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, group: 1, period: 2, category: 'alkali-metal', radioactive: false },
  Be: { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.0122, group: 2, period: 2, category: 'alkaline-earth', radioactive: false },
  B: { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.81, group: 13, period: 2, category: 'metalloid', radioactive: false },
  C: { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.011, group: 14, period: 2, category: 'nonmetal', radioactive: false },
  N: { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.007, group: 15, period: 2, category: 'nonmetal', radioactive: false },
  O: { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 15.999, group: 16, period: 2, category: 'nonmetal', radioactive: false },
  F: { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 18.998, group: 17, period: 2, category: 'halogen', radioactive: false },
  Ne: { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.180, group: 18, period: 2, category: 'noble-gas', radioactive: false },

  // Period 3
  Na: { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.990, group: 1, period: 3, category: 'alkali-metal', radioactive: false },
  Mg: { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: 24.305, group: 2, period: 3, category: 'alkaline-earth', radioactive: false },
  Al: { symbol: 'Al', name: 'Aluminium', atomicNumber: 13, atomicMass: 26.982, group: 13, period: 3, category: 'post-transition', radioactive: false },
  Si: { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: 28.085, group: 14, period: 3, category: 'metalloid', radioactive: false },
  P: { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: 30.974, group: 15, period: 3, category: 'nonmetal', radioactive: false },
  S: { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: 32.06, group: 16, period: 3, category: 'nonmetal', radioactive: false },
  Cl: { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, group: 17, period: 3, category: 'halogen', radioactive: false },
  Ar: { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: 39.948, group: 18, period: 3, category: 'noble-gas', radioactive: false },

  // Period 4
  K: { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: 39.098, group: 1, period: 4, category: 'alkali-metal', radioactive: false },
  Ca: { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: 40.078, group: 2, period: 4, category: 'alkaline-earth', radioactive: false },
  Sc: { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, atomicMass: 44.956, group: 3, period: 4, category: 'transition-metal', radioactive: false },
  Ti: { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, atomicMass: 47.867, group: 4, period: 4, category: 'transition-metal', radioactive: false },
  V: { symbol: 'V', name: 'Vanadium', atomicNumber: 23, atomicMass: 50.942, group: 5, period: 4, category: 'transition-metal', radioactive: false },
  Cr: { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, atomicMass: 51.996, group: 6, period: 4, category: 'transition-metal', radioactive: false },
  Mn: { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, atomicMass: 54.938, group: 7, period: 4, category: 'transition-metal', radioactive: false },
  Fe: { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: 55.845, group: 8, period: 4, category: 'transition-metal', radioactive: false },
  Co: { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, atomicMass: 58.933, group: 9, period: 4, category: 'transition-metal', radioactive: false },
  Ni: { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, atomicMass: 58.693, group: 10, period: 4, category: 'transition-metal', radioactive: false },
  Cu: { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: 63.546, group: 11, period: 4, category: 'transition-metal', radioactive: false },
  Zn: { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: 65.38, group: 12, period: 4, category: 'transition-metal', radioactive: false },
  Ga: { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, atomicMass: 69.723, group: 13, period: 4, category: 'post-transition', radioactive: false },
  Ge: { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, atomicMass: 72.630, group: 14, period: 4, category: 'metalloid', radioactive: false },
  As: { symbol: 'As', name: 'Arsenic', atomicNumber: 33, atomicMass: 74.922, group: 15, period: 4, category: 'metalloid', radioactive: false },
  Se: { symbol: 'Se', name: 'Selenium', atomicNumber: 34, atomicMass: 78.971, group: 16, period: 4, category: 'nonmetal', radioactive: false },
  Br: { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: 79.904, group: 17, period: 4, category: 'halogen', radioactive: false },
  Kr: { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, atomicMass: 83.798, group: 18, period: 4, category: 'noble-gas', radioactive: false },

  // Period 5
  Rb: { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, atomicMass: 85.468, group: 1, period: 5, category: 'alkali-metal', radioactive: false },
  Sr: { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, atomicMass: 87.62, group: 2, period: 5, category: 'alkaline-earth', radioactive: false },
  Y: { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, atomicMass: 88.906, group: 3, period: 5, category: 'transition-metal', radioactive: false },
  Zr: { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, atomicMass: 91.224, group: 4, period: 5, category: 'transition-metal', radioactive: false },
  Nb: { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, atomicMass: 92.906, group: 5, period: 5, category: 'transition-metal', radioactive: false },
  Mo: { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, atomicMass: 95.95, group: 6, period: 5, category: 'transition-metal', radioactive: false },
  Tc: { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, atomicMass: 98.0, group: 7, period: 5, category: 'transition-metal', radioactive: true },
  Ru: { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, atomicMass: 101.07, group: 8, period: 5, category: 'transition-metal', radioactive: false },
  Rh: { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, atomicMass: 102.91, group: 9, period: 5, category: 'transition-metal', radioactive: false },
  Pd: { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, atomicMass: 106.42, group: 10, period: 5, category: 'transition-metal', radioactive: false },
  Ag: { symbol: 'Ag', name: 'Silver', atomicNumber: 47, atomicMass: 107.87, group: 11, period: 5, category: 'transition-metal', radioactive: false },
  Cd: { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, atomicMass: 112.41, group: 12, period: 5, category: 'transition-metal', radioactive: false },
  In: { symbol: 'In', name: 'Indium', atomicNumber: 49, atomicMass: 114.82, group: 13, period: 5, category: 'post-transition', radioactive: false },
  Sn: { symbol: 'Sn', name: 'Tin', atomicNumber: 50, atomicMass: 118.71, group: 14, period: 5, category: 'post-transition', radioactive: false },
  Sb: { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, atomicMass: 121.76, group: 15, period: 5, category: 'metalloid', radioactive: false },
  Te: { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, atomicMass: 127.60, group: 16, period: 5, category: 'metalloid', radioactive: false },
  I: { symbol: 'I', name: 'Iodine', atomicNumber: 53, atomicMass: 126.90, group: 17, period: 5, category: 'halogen', radioactive: false },
  Xe: { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, atomicMass: 131.29, group: 18, period: 5, category: 'noble-gas', radioactive: false },

  // Period 6
  Cs: { symbol: 'Cs', name: 'Caesium', atomicNumber: 55, atomicMass: 132.91, group: 1, period: 6, category: 'alkali-metal', radioactive: false },
  Ba: { symbol: 'Ba', name: 'Barium', atomicNumber: 56, atomicMass: 137.33, group: 2, period: 6, category: 'alkaline-earth', radioactive: false },
  // Lanthanides (Period 6, Group 3)
  La: { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, atomicMass: 138.91, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Ce: { symbol: 'Ce', name: 'Cerium', atomicNumber: 58, atomicMass: 140.12, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Pr: { symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, atomicMass: 140.91, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Nd: { symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, atomicMass: 144.24, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Pm: { symbol: 'Pm', name: 'Promethium', atomicNumber: 61, atomicMass: 145.0, group: 3, period: 6, category: 'lanthanide', radioactive: true },
  Sm: { symbol: 'Sm', name: 'Samarium', atomicNumber: 62, atomicMass: 150.36, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Eu: { symbol: 'Eu', name: 'Europium', atomicNumber: 63, atomicMass: 151.96, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Gd: { symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, atomicMass: 157.25, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Tb: { symbol: 'Tb', name: 'Terbium', atomicNumber: 65, atomicMass: 158.93, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Dy: { symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, atomicMass: 162.50, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Ho: { symbol: 'Ho', name: 'Holmium', atomicNumber: 67, atomicMass: 164.93, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Er: { symbol: 'Er', name: 'Erbium', atomicNumber: 68, atomicMass: 167.26, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Tm: { symbol: 'Tm', name: 'Thulium', atomicNumber: 69, atomicMass: 168.93, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Yb: { symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, atomicMass: 173.05, group: 3, period: 6, category: 'lanthanide', radioactive: false },
  Lu: { symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, atomicMass: 174.97, group: 3, period: 6, category: 'lanthanide', radioactive: false },

  // Rest of Period 6
  Hf: { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, atomicMass: 178.49, group: 4, period: 6, category: 'transition-metal', radioactive: false },
  Ta: { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, atomicMass: 180.95, group: 5, period: 6, category: 'transition-metal', radioactive: false },
  W: { symbol: 'W', name: 'Tungsten', atomicNumber: 74, atomicMass: 183.84, group: 6, period: 6, category: 'transition-metal', radioactive: false },
  Re: { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, atomicMass: 186.21, group: 7, period: 6, category: 'transition-metal', radioactive: false },
  Os: { symbol: 'Os', name: 'Osmium', atomicNumber: 76, atomicMass: 190.23, group: 8, period: 6, category: 'transition-metal', radioactive: false },
  Ir: { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, atomicMass: 192.22, group: 9, period: 6, category: 'transition-metal', radioactive: false },
  Pt: { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, atomicMass: 195.08, group: 10, period: 6, category: 'transition-metal', radioactive: false },
  Au: { symbol: 'Au', name: 'Gold', atomicNumber: 79, atomicMass: 196.97, group: 11, period: 6, category: 'transition-metal', radioactive: false },
  Hg: { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, atomicMass: 200.59, group: 12, period: 6, category: 'transition-metal', radioactive: false },
  Tl: { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, atomicMass: 204.38, group: 13, period: 6, category: 'post-transition', radioactive: false },
  Pb: { symbol: 'Pb', name: 'Lead', atomicNumber: 82, atomicMass: 207.2, group: 14, period: 6, category: 'post-transition', radioactive: false },
  Bi: { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, atomicMass: 208.98, group: 15, period: 6, category: 'post-transition', radioactive: false },
  Po: { symbol: 'Po', name: 'Polonium', atomicNumber: 84, atomicMass: 209.0, group: 16, period: 6, category: 'metalloid', radioactive: true },
  At: { symbol: 'At', name: 'Astatine', atomicNumber: 85, atomicMass: 210.0, group: 17, period: 6, category: 'halogen', radioactive: true },
  Rn: { symbol: 'Rn', name: 'Radon', atomicNumber: 86, atomicMass: 222.0, group: 18, period: 6, category: 'noble-gas', radioactive: true },

  // Period 7
  Fr: { symbol: 'Fr', name: 'Francium', atomicNumber: 87, atomicMass: 223.0, group: 1, period: 7, category: 'alkali-metal', radioactive: true },
  Ra: { symbol: 'Ra', name: 'Radium', atomicNumber: 88, atomicMass: 226.0, group: 2, period: 7, category: 'alkaline-earth', radioactive: true },
  // Actinides (Period 7, Group 3)
  Ac: { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, atomicMass: 227.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Th: { symbol: 'Th', name: 'Thorium', atomicNumber: 90, atomicMass: 232.04, group: 3, period: 7, category: 'actinide', radioactive: true },
  Pa: { symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, atomicMass: 231.04, group: 3, period: 7, category: 'actinide', radioactive: true },
  U: { symbol: 'U', name: 'Uranium', atomicNumber: 92, atomicMass: 238.03, group: 3, period: 7, category: 'actinide', radioactive: true },
  Np: { symbol: 'Np', name: 'Neptunium', atomicNumber: 93, atomicMass: 237.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Pu: { symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, atomicMass: 244.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Am: { symbol: 'Am', name: 'Americium', atomicNumber: 95, atomicMass: 243.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Cm: { symbol: 'Cm', name: 'Curium', atomicNumber: 96, atomicMass: 247.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Bk: { symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, atomicMass: 247.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Cf: { symbol: 'Cf', name: 'Californium', atomicNumber: 98, atomicMass: 251.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Es: { symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, atomicMass: 252.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Fm: { symbol: 'Fm', name: 'Fermium', atomicNumber: 100, atomicMass: 257.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Md: { symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, atomicMass: 258.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  No: { symbol: 'No', name: 'Nobelium', atomicNumber: 102, atomicMass: 259.0, group: 3, period: 7, category: 'actinide', radioactive: true },
  Lr: { symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, atomicMass: 266.0, group: 3, period: 7, category: 'actinide', radioactive: true },

  // Rest of Period 7 (Transactinides)
  Rf: { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, atomicMass: 267.0, group: 4, period: 7, category: 'transition-metal', radioactive: true },
  Db: { symbol: 'Db', name: 'Dubnium', atomicNumber: 105, atomicMass: 268.0, group: 5, period: 7, category: 'transition-metal', radioactive: true },
  Sg: { symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, atomicMass: 269.0, group: 6, period: 7, category: 'transition-metal', radioactive: true },
  Bh: { symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, atomicMass: 270.0, group: 7, period: 7, category: 'transition-metal', radioactive: true },
  Hs: { symbol: 'Hs', name: 'Hassium', atomicNumber: 108, atomicMass: 277.0, group: 8, period: 7, category: 'transition-metal', radioactive: true },
  Mt: { symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, atomicMass: 278.0, group: 9, period: 7, category: 'transition-metal', radioactive: true },
  Ds: { symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, atomicMass: 281.0, group: 10, period: 7, category: 'transition-metal', radioactive: true },
  Rg: { symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, atomicMass: 282.0, group: 11, period: 7, category: 'transition-metal', radioactive: true },
  Cn: { symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, atomicMass: 285.0, group: 12, period: 7, category: 'transition-metal', radioactive: true },
  Nh: { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, atomicMass: 286.0, group: 13, period: 7, category: 'post-transition', radioactive: true },
  Fl: { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, atomicMass: 289.0, group: 14, period: 7, category: 'post-transition', radioactive: true },
  Mc: { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, atomicMass: 290.0, group: 15, period: 7, category: 'post-transition', radioactive: true },
  Lv: { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, atomicMass: 293.0, group: 16, period: 7, category: 'post-transition', radioactive: true },
  Ts: { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, atomicMass: 294.0, group: 17, period: 7, category: 'halogen', radioactive: true },
  Og: { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, atomicMass: 294.0, group: 18, period: 7, category: 'noble-gas', radioactive: true },
};

export interface MolarMassResult {
  formula: string;
  molarMass: number;
  breakdown: {
    element: ElementData;
    count: number;
    subtotal: number;
    percentage: number;
  }[];
}

/**
 * Parse chemical formula with nested parentheses, e.g. Ca(OH)2, Fe2(SO4)3, H2SO4, C6H12O6
 */
export function calculateMolarMass(formulaStr: string): MolarMassResult {
  const clean = formulaStr.trim().replace(/\s+/g, '');
  if (!clean) throw new Error('Empty formula provided');

  function parseSubformula(sub: string): Record<string, number> {
    const counts: Record<string, number> = {};
    let i = 0;
    while (i < sub.length) {
      if (sub[i] === '(') {
        let depth = 1;
        let j = i + 1;
        while (j < sub.length && depth > 0) {
          if (sub[j] === '(') depth++;
          else if (sub[j] === ')') depth--;
          j++;
        }
        if (depth !== 0) throw new Error('Mismatched parentheses in formula');
        const innerContent = sub.substring(i + 1, j - 1);
        let multStr = '';
        while (j < sub.length && /[0-9]/.test(sub[j])) {
          multStr += sub[j];
          j++;
        }
        const mult = multStr ? parseInt(multStr, 10) : 1;
        const innerCounts = parseSubformula(innerContent);
        for (const [el, cnt] of Object.entries(innerCounts)) {
          counts[el] = (counts[el] || 0) + cnt * mult;
        }
        i = j;
      } else if (/[A-Z]/.test(sub[i])) {
        let el = sub[i];
        let j = i + 1;
        if (j < sub.length && /[a-z]/.test(sub[j])) {
          el += sub[j];
          j++;
        }
        let cntStr = '';
        while (j < sub.length && /[0-9]/.test(sub[j])) {
          cntStr += sub[j];
          j++;
        }
        const count = cntStr ? parseInt(cntStr, 10) : 1;
        counts[el] = (counts[el] || 0) + count;
        i = j;
      } else {
        throw new Error(`Unexpected character in formula: '${sub[i]}'`);
      }
    }
    return counts;
  }

  const counts = parseSubformula(clean);
  let totalMass = 0;
  const breakdown: MolarMassResult['breakdown'] = [];

  for (const [sym, count] of Object.entries(counts)) {
    const el = PERIODIC_TABLE[sym];
    if (!el) {
      throw new Error(`Unknown element symbol: "${sym}"`);
    }
    const subtotal = el.atomicMass * count;
    totalMass += subtotal;
    breakdown.push({
      element: el,
      count,
      subtotal,
      percentage: 0,
    });
  }

  // Calculate percentages
  breakdown.forEach((item) => {
    item.percentage = totalMass > 0 ? (item.subtotal / totalMass) * 100 : 0;
  });

  return {
    formula: clean,
    molarMass: totalMass,
    breakdown,
  };
}
