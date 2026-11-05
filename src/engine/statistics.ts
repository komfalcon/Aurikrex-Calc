// Aurikrex Statistics & Regression Engine (FR-20)

export interface StatsSummary {
  n: number;
  mean: number;
  median: number;
  mode: number[];
  variance: number;
  stdDev: number; // σ
  sum: number;
  sumSquares: number;
  min: number;
  max: number;
}

export interface LinearRegressionResult {
  n: number;
  slope: number; // gradient m
  intercept: number; // c
  r: number; // Pearson correlation coefficient
  rSquared: number;
  formula: string; // y = mx + c
}

export function calculateStats(data: number[]): StatsSummary {
  if (!data || data.length === 0) {
    throw new Error('No data points provided');
  }

  const n = data.length;
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;

  // Sorted for median and min/max
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  let median: number;
  const mid = Math.floor(n / 2);
  if (n % 2 !== 0) {
    median = sorted[mid];
  } else {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Mode
  const freq: Record<number, number> = {};
  let maxFreq = 0;
  for (const x of data) {
    freq[x] = (freq[x] || 0) + 1;
    if (freq[x] > maxFreq) maxFreq = freq[x];
  }
  const mode = Object.keys(freq)
    .filter((k) => freq[Number(k)] === maxFreq && maxFreq > 1)
    .map(Number);

  // Variance & Standard deviation (sample and population)
  const sumSquares = data.reduce((acc, val) => acc + val * val, 0);
  const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  return {
    n,
    mean,
    median,
    mode,
    variance,
    stdDev,
    sum,
    sumSquares,
    min,
    max,
  };
}

export function calculateLinearRegression(points: { x: number; y: number }[]): LinearRegressionResult {
  const n = points.length;
  if (n < 2) throw new Error('At least 2 points are required for linear regression');

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (const pt of points) {
    sumX += pt.x;
    sumY += pt.y;
    sumXY += pt.x * pt.y;
    sumX2 += pt.x * pt.x;
    sumY2 += pt.y * pt.y;
  }

  const denominatorM = n * sumX2 - sumX * sumX;
  if (Math.abs(denominatorM) < 1e-12) {
    throw new Error('Vertical line detected, slope is undefined');
  }

  const slope = (n * sumXY - sumX * sumY) / denominatorM;
  const intercept = (sumY - slope * sumX) / n;

  // Correlation r
  const numR = n * sumXY - sumX * sumY;
  const denR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const r = denR === 0 ? 0 : numR / denR;
  const rSquared = r * r;

  const sign = intercept >= 0 ? '+' : '-';
  const formula = `y = ${slope.toFixed(4)}x ${sign} ${Math.abs(intercept).toFixed(4)}`;

  return {
    n,
    slope,
    intercept,
    r,
    rSquared,
    formula,
  };
}
