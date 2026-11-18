'use client';

import React, { useMemo, useState } from 'react';
import { ArrowLeft, Calculator, Check, Copy, Grid2X2, Search, Sparkles } from 'lucide-react';

interface GuidedToolsProps {
  onInsert: (token: string) => void;
  onOpenConstants: () => void;
  onOpenFormulaBank: () => void;
  onOpenChem: () => void;
  onOpenStats: () => void;
  onExpertMode: () => void;
}

type ToolId = 'system' | 'matrix';
type Matrix = number[][];

const parseNumber = (value: string) => {
  const number = Number(value.trim());
  return Number.isFinite(number) ? number : null;
};

const determinant = (input: Matrix): number => {
  const matrix = input.map((row) => [...row]);
  let sign = 1;
  let result = 1;
  for (let column = 0; column < matrix.length; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < matrix.length; row += 1) {
      if (Math.abs(matrix[row][column]) > Math.abs(matrix[pivot][column])) pivot = row;
    }
    if (Math.abs(matrix[pivot][column]) < 1e-12) return 0;
    if (pivot !== column) {
      [matrix[pivot], matrix[column]] = [matrix[column], matrix[pivot]];
      sign *= -1;
    }
    const pivotValue = matrix[column][column];
    result *= pivotValue;
    for (let row = column + 1; row < matrix.length; row += 1) {
      const factor = matrix[row][column] / pivotValue;
      for (let current = column + 1; current < matrix.length; current += 1) {
        matrix[row][current] -= factor * matrix[column][current];
      }
    }
  }
  return result * sign;
};

const solveSystem = (coefficients: Matrix, constants: number[]): number[] | null => {
  const n = coefficients.length;
  const augmented = coefficients.map((row, index) => [...row, constants[index]]);
  for (let column = 0; column < n; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < n; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
    }
    if (Math.abs(augmented[pivot][column]) < 1e-12) return null;
    [augmented[pivot], augmented[column]] = [augmented[column], augmented[pivot]];
    const pivotValue = augmented[column][column];
    for (let current = column; current <= n; current += 1) augmented[column][current] /= pivotValue;
    for (let row = 0; row < n; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      for (let current = column; current <= n; current += 1) {
        augmented[row][current] -= factor * augmented[column][current];
      }
    }
  }
  return augmented.map((row) => row[n]);
};

const matrixExpression = (matrix: Array<Array<number | string>>) => `[[${matrix.map((row) => row.join(', ')).join('], [')}]]`;
const clean = (value: number) => Math.abs(value) < 1e-10 ? 0 : Number(value.toFixed(10));

const blankMatrix = (size: number): string[][] => Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
const blankVector = (size: number): string[] => Array.from({ length: size }, () => '');

export const GuidedTools: React.FC<GuidedToolsProps> = ({
  onInsert,
  onOpenConstants,
  onOpenFormulaBank,
  onOpenChem,
  onOpenStats,
  onExpertMode,
}) => {
  const [query, setQuery] = useState('');
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [size, setSize] = useState(2);
  const [matrix, setMatrix] = useState<string[][]>(() => blankMatrix(2));
  const [vector, setVector] = useState<string[]>(() => blankVector(2));
  const [matrixOperation, setMatrixOperation] = useState<'det' | 'transpose' | 'inverse'>('det');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    const all = [
      { id: 'system' as const, title: 'System of equations', description: 'Solve 2×2 or 3×3 linear systems', icon: 'Σ' },
      { id: 'matrix' as const, title: 'Matrix operations', description: 'Determinant, inverse, and transpose', icon: '▦' },
    ];
    if (!query.trim()) return all;
    return all.filter((tool) => `${tool.title} ${tool.description}`.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const resize = (nextSize: number) => {
    setSize(nextSize);
    setMatrix(Array.from({ length: nextSize }, (_, row) => Array.from({ length: nextSize }, (_, column) => matrix[row]?.[column] || '')));
    setVector(Array.from({ length: nextSize }, (_, index) => vector[index] || ''));
    setResult(null);
    setError(null);
  };

  const readMatrix = (): Matrix | null => {
    const parsed = matrix.map((row) => row.map(parseNumber));
    if (parsed.some((row) => row.some((value) => value === null))) {
      setError('Enter a number in every matrix cell.');
      return null;
    }
    return parsed as Matrix;
  };

  const runSystem = () => {
    const coefficients = readMatrix();
    if (!coefficients) return;
    const constants = vector.map(parseNumber);
    if (constants.some((value) => value === null)) {
      setError('Enter a constant for every equation.');
      return;
    }
    const solved = solveSystem(coefficients, constants as number[]);
    if (!solved) {
      setError('This system has no unique solution. Check the equations or use a different matrix.');
      setResult(null);
      return;
    }
    setError(null);
    setResult(solved.map((value, index) => `${String.fromCharCode(120 + index)} = ${clean(value)}`).join('   '));
  };

  const runMatrix = () => {
    const input = readMatrix();
    if (!input) return;
    if (matrixOperation === 'det') {
      setResult(`det(A) = ${clean(determinant(input))}`);
      setError(null);
      return;
    }
    if (matrixOperation === 'transpose') {
      const transposed = input[0].map((_, column) => input.map((row) => row[column]));
      setResult(matrixExpression(transposed));
      setError(null);
      return;
    }
    const det = determinant(input);
    if (Math.abs(det) < 1e-12) {
      setError('This matrix is singular, so it has no inverse.');
      setResult(null);
      return;
    }
    if (size === 2) {
      const inverse = [[input[1][1] / det, -input[0][1] / det], [-input[1][0] / det, input[0][0] / det]];
      setResult(matrixExpression(inverse.map((row) => row.map(clean))));
      setError(null);
      return;
    }
    setError('The guided inverse currently supports 2×2 matrices. Use Expert keypad for larger inverses.');
    setResult(null);
  };

  const activeTitle = activeTool === 'system' ? 'Solve a system' : 'Matrix operations';
  const filledMatrixExpression = matrixExpression(matrix.map((row) => row.map((value) => value || '0')));
  const filledExpression = activeTool === 'system'
    ? `lusolve(${filledMatrixExpression}, [${vector.map((value) => value || '0').join(', ')}])`
    : `${matrixOperation}(${filledMatrixExpression})`;
  const expressionPreview = activeTool === 'system'
    ? `lusolve(${matrixExpression(matrix.map((row) => row.map((value) => value || '?')))}, [${vector.map((value) => value || '?').join(', ')}])`
    : `${matrixOperation}(${matrixExpression(matrix.map((row) => row.map((value) => value || '?')))})`;

  return (
    <div className="guided-tools">
      {!activeTool ? (
        <>
          <div className="guided-search-wrap">
            <Search className="guided-search-icon" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools, e.g. matrix or equations" aria-label="Search advanced tools" />
          </div>
          <div className="guided-section-label">Suggested tools</div>
          <div className="guided-tool-list">
            {filteredTools.map((tool) => (
              <button type="button" key={tool.id} className="guided-tool-card" onClick={() => { setActiveTool(tool.id); setResult(null); setError(null); }}>
                <span className="guided-tool-icon">{tool.icon}</span>
                <span className="guided-tool-copy"><strong>{tool.title}</strong><small>{tool.description}</small></span>
                <span className="guided-tool-arrow">›</span>
              </button>
            ))}
          </div>
          <div className="guided-section-label">More tools</div>
          <div className="guided-mini-grid">
            <button type="button" onClick={onOpenStats}><Calculator size={16} /> Statistics</button>
            <button type="button" onClick={onOpenFormulaBank}><Sparkles size={16} /> Formula bank</button>
            <button type="button" onClick={onOpenConstants}><Grid2X2 size={16} /> Constants</button>
            <button type="button" onClick={onOpenChem}><span className="guided-mini-symbol">H</span> Chemistry</button>
          </div>
          <button type="button" className="guided-expert-link" onClick={onExpertMode}>Open expert keypad</button>
        </>
      ) : (
        <>
          <div className="guided-tool-heading">
            <button type="button" onClick={() => setActiveTool(null)} aria-label="Back to advanced tools"><ArrowLeft size={18} /></button>
            <div><strong>{activeTitle}</strong><small>Fill the fields; the calculator builds the syntax for you.</small></div>
          </div>
          <div className="guided-size-row">
            <span>Matrix size</span>
            {[2, 3].map((value) => <button type="button" key={value} className={size === value ? 'selected' : ''} onClick={() => resize(value)}>{value} × {value}</button>)}
          </div>
          <div className="guided-matrix-layout">
            <div>
              <label className="guided-field-label">{activeTool === 'system' ? 'Coefficients (A)' : 'Matrix A'}</label>
              <div className="guided-matrix-grid" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
                {matrix.flatMap((row, rowIndex) => row.map((value, columnIndex) => (
                  <input key={`${rowIndex}-${columnIndex}`} inputMode="decimal" aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}`} value={value} onChange={(event) => setMatrix((current) => current.map((currentRow, r) => r === rowIndex ? currentRow.map((cell, c) => c === columnIndex ? event.target.value : cell) : currentRow))} placeholder="0" />
                )))}
              </div>
            </div>
            {activeTool === 'system' && (
              <div>
                <label className="guided-field-label">Right side (b)</label>
                <div className="guided-vector-grid">{vector.map((value, index) => <input key={index} inputMode="decimal" aria-label={`Equation ${index + 1} constant`} value={value} onChange={(event) => setVector((current) => current.map((cell, i) => i === index ? event.target.value : cell))} placeholder="0" />)}</div>
              </div>
            )}
          </div>
          {activeTool === 'system' && <p className="guided-equation-hint">Rows represent equations: <code>a₁x + a₂y = b</code>. For 3×3, the third column is <code>z</code>.</p>}
          {activeTool === 'matrix' && <div className="guided-operation-row">{(['det', 'transpose', 'inverse'] as const).map((operation) => <button type="button" key={operation} className={matrixOperation === operation ? 'selected' : ''} onClick={() => { setMatrixOperation(operation); setResult(null); }}>{operation === 'det' ? 'Determinant' : operation[0].toUpperCase() + operation.slice(1)}</button>)}</div>}
          <div className="guided-preview"><span>Preview</span><code>{expressionPreview}</code></div>
          <button type="button" className="guided-calculate" onClick={activeTool === 'system' ? runSystem : runMatrix}><Check size={17} /> Calculate</button>
          {error && <div className="guided-error">{error}</div>}
          {result && <div className="guided-result"><span>Result</span><strong>{result}</strong><button type="button" onClick={() => onInsert(filledExpression)} title="Insert generated expression"><Copy size={15} /> Insert syntax</button></div>}
        </>
      )}
    </div>
  );
};
