// Aurikrex Calc v2 - Section 4A JSON Contract Specification

export type AngleUnit = 'deg' | 'rad';
export type ResultForm = 'decimal' | 'fraction' | 'standard';

export type Dimension = [
  length: number,
  mass: number,
  time: number,
  current: number,
  temperature: number,
  amount: number,
  luminous_intensity: number
];

export const DIMENSIONS = {
  DIMENSIONLESS: [0, 0, 0, 0, 0, 0, 0] as Dimension,
  LENGTH: [1, 0, 0, 0, 0, 0, 0] as Dimension,
  MASS: [0, 1, 0, 0, 0, 0, 0] as Dimension,
  TIME: [0, 0, 1, 0, 0, 0, 0] as Dimension,
  CURRENT: [0, 0, 0, 1, 0, 0, 0] as Dimension,
  TEMPERATURE: [0, 0, 0, 0, 1, 0, 0] as Dimension,
  AMOUNT: [0, 0, 0, 0, 0, 1, 0] as Dimension,
  LUMINOUS_INTENSITY: [0, 0, 0, 0, 0, 0, 1] as Dimension,
  VELOCITY: [1, 0, -1, 0, 0, 0, 0] as Dimension,
  ACCELERATION: [1, 0, -2, 0, 0, 0, 0] as Dimension,
  FORCE: [1, 1, -2, 0, 0, 0, 0] as Dimension,
  ENERGY: [2, 1, -2, 0, 0, 0, 0] as Dimension,
  POWER: [2, 1, -3, 0, 0, 0, 0] as Dimension,
  PRESSURE: [-1, 1, -2, 0, 0, 0, 0] as Dimension,
  ELECTRIC_CHARGE: [0, 0, 1, 1, 0, 0, 0] as Dimension,
  VOLTAGE: [2, 1, -3, -1, 0, 0, 0] as Dimension,
  RESISTANCE: [2, 1, -3, -2, 0, 0, 0] as Dimension,
};

export type ErrorCode =
  | 'SYNTAX'
  | 'UNEXPECTED_TOKEN'
  | 'UNKNOWN_FUNCTION'
  | 'UNKNOWN_UNIT'
  | 'UNKNOWN_VARIABLE'
  | 'ARITY'
  | 'DIV_ZERO'
  | 'DOMAIN'
  | 'OVERFLOW'
  | 'DIM_MISMATCH'
  | 'BAD_EXPONENT_UNIT'
  | 'CYCLE'
  | 'NO_SOLUTION'
  | 'NOT_CONVERGED'
  | 'SINGULAR_MATRIX'
  | 'TOO_LARGE'
  | 'INTERNAL';

export interface EngineError {
  code: ErrorCode;
  message: string;
  span?: [number, number];
  details?: any;
}

export interface VariableValue {
  value: number;
  unit?: string | null;
}

export interface EvaluateContext {
  angle?: AngleUnit;
  ans?: VariableValue | null;
  variables?: Record<string, VariableValue>;
  sig_figs?: number | null;
  result_form?: ResultForm;
  seed?: number;
}

export interface EvaluateRequest {
  input: string;
  context?: EvaluateContext;
}

export interface ResponseForms {
  decimal: string;
  fraction: string | null;
  standard: string;
  sig_figs: string;
}

export interface EvaluateResponse {
  ok: boolean;
  value: number | null;
  unit: string | null;
  dimension: Dimension;
  forms: ResponseForms;
  steps: string[];
  warnings: string[];
  error: EngineError | null;
}

export interface TapeRecalcRow {
  id: string;
  expression: string;
  dependsOn?: string[];
}

export interface RecalcRequest {
  rows: TapeRecalcRow[];
  context?: EvaluateContext;
}

export interface RecalcResponse {
  ok: boolean;
  results: Record<string, EvaluateResponse>;
  error?: EngineError | null;
}
