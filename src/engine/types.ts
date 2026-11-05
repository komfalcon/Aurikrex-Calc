export type AngleMode = 'DEG' | 'RAD';

export type ResultDisplayForm = 'decimal' | 'fraction' | 'standard' | 'engineering';

export interface ResultForms {
  decimal: string;
  fraction: string | null;
  standardForm: string;
  engineering: string;
  sigFigs: (n: number) => string;
}

export interface StepItem {
  type: 'rule' | 'substitution' | 'intermediate' | 'result';
  text: string;
  latex?: string;
}

export interface VariableItem {
  name: string;
  value: number;
  unit?: string | null;
}

export interface EngineContext {
  angleMode?: AngleMode;
  variables?: Record<string, number | { value: number; unit?: string | null }>;
  ans?: number | string | { value: number; unit?: string | null };
  precision?: number;
}

export interface EvaluationResult {
  value: number | string | null;
  numericValue: number | null;
  unit: string | null;
  dimension?: string | null;
  forms: ResultForms;
  steps?: StepItem[];
  error: string | null;
  raw?: any;
}

export interface FormulaDefinition {
  id: string;
  name: string;
  topic: 'Mechanics' | 'Waves' | 'Electricity' | 'Thermal' | 'Modern physics' | 'Moles and gas laws' | 'Electrochemistry' | 'pH and equilibria' | 'Genetics' | 'Magnification' | 'Mathematics';
  expression: string;
  variables: {
    symbol: string;
    name: string;
    dimension: string;
    defaultUnit: string;
  }[];
  solveTarget?: string;
  notes?: string;
}
