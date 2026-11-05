// Aurikrex Chemistry Engine (FR-25)

export interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  category: 'nonmetal' | 'noble-gas' | 'alkali-metal' | 'alkaline-earth' | 'transition-metal' | 'post-transition' | 'metalloid' | 'halogen';
}

export const PERIODIC_TABLE: Record<string, ElementData> = {
  H: { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, category: 'nonmetal' },
  He: { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.0026, category: 'noble-gas' },
  Li: { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, category: 'alkali-metal' },
  Be: { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.0122, category: 'alkaline-earth' },
  B: { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.81, category: 'metalloid' },
  C: { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.011, category: 'nonmetal' },
  N: { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.007, category: 'nonmetal' },
  O: { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 15.999, category: 'nonmetal' },
  F: { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 18.998, category: 'halogen' },
  Ne: { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.180, category: 'noble-gas' },
  Na: { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.990, category: 'alkali-metal' },
  Mg: { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: 24.305, category: 'alkaline-earth' },
  Al: { symbol: 'Al', name: 'Aluminium', atomicNumber: 13, atomicMass: 26.982, category: 'post-transition' },
  Si: { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: 28.085, category: 'metalloid' },
  P: { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: 30.974, category: 'nonmetal' },
  S: { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: 32.06, category: 'nonmetal' },
  Cl: { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, category: 'halogen' },
  Ar: { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: 39.948, category: 'noble-gas' },
  K: { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: 39.098, category: 'alkali-metal' },
  Ca: { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: 40.078, category: 'alkaline-earth' },
  Fe: { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: 55.845, category: 'transition-metal' },
  Cu: { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: 63.546, category: 'transition-metal' },
  Zn: { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: 65.38, category: 'transition-metal' },
  Br: { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: 79.904, category: 'halogen' },
  Ag: { symbol: 'Ag', name: 'Silver', atomicNumber: 47, atomicMass: 107.87, category: 'transition-metal' },
  I: { symbol: 'I', name: 'Iodine', atomicNumber: 53, atomicMass: 126.90, category: 'halogen' },
  Ba: { symbol: 'Ba', name: 'Barium', atomicNumber: 56, atomicMass: 137.33, category: 'alkaline-earth' },
  Au: { symbol: 'Au', name: 'Gold', atomicNumber: 79, atomicMass: 196.97, category: 'transition-metal' },
  Pb: { symbol: 'Pb', name: 'Lead', atomicNumber: 82, atomicMass: 207.2, category: 'post-transition' },
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
    // Match groups like (SO4)3 or individual elements like Fe2
    let i = 0;
    while (i < sub.length) {
      if (sub[i] === '(') {
        // Find matching closing paren
        let depth = 1;
        let j = i + 1;
        while (j < sub.length && depth > 0) {
          if (sub[j] === '(') depth++;
          else if (sub[j] === ')') depth--;
          j++;
        }
        if (depth !== 0) throw new Error('Mismatched parentheses in formula');
        const innerContent = sub.substring(i + 1, j - 1);
        // Find multiplier after ')'
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
        // Element symbol
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
        throw new Error(`Unexpected character '${sub[i]}' in chemical formula`);
      }
    }
    return counts;
  }

  const elementCounts = parseSubformula(clean);
  let totalMass = 0;
  const breakdown: MolarMassResult['breakdown'] = [];

  for (const [sym, count] of Object.entries(elementCounts)) {
    const el = PERIODIC_TABLE[sym];
    if (!el) {
      throw new Error(`Unknown element '${sym}' in formula`);
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
  for (const item of breakdown) {
    item.percentage = (item.subtotal / totalMass) * 100;
  }

  return {
    formula: clean,
    molarMass: totalMass,
    breakdown,
  };
}
