// Aurikrex Academic Calculators: CGPA on 5.0 scale & JAMB Aggregate (FR-29)

export interface CourseGrade {
  courseCode: string;
  creditUnits: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

export const GRADE_POINTS_5_0: Record<string, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

export interface CGPAResult {
  totalCreditUnits: number;
  totalQualityPoints: number;
  cgpa: number;
  classOfDegree: string;
}

export function calculateCGPA(courses: CourseGrade[]): CGPAResult {
  if (!courses || courses.length === 0) {
    throw new Error('At least one course is required');
  }

  let totalCreditUnits = 0;
  let totalQualityPoints = 0;

  for (const c of courses) {
    const pts = GRADE_POINTS_5_0[c.grade] ?? 0;
    totalCreditUnits += c.creditUnits;
    totalQualityPoints += c.creditUnits * pts;
  }

  const cgpa = totalCreditUnits > 0 ? totalQualityPoints / totalCreditUnits : 0;

  let classOfDegree = 'Pass';
  if (cgpa >= 4.5) classOfDegree = 'First Class Honours';
  else if (cgpa >= 3.5) classOfDegree = 'Second Class Upper (2:1)';
  else if (cgpa >= 2.4) classOfDegree = 'Second Class Lower (2:2)';
  else if (cgpa >= 1.5) classOfDegree = 'Third Class';

  return {
    totalCreditUnits,
    totalQualityPoints,
    cgpa: parseFloat(cgpa.toFixed(2)),
    classOfDegree,
  };
}

export interface JAMBAggregateParams {
  utmeScore: number; // out of 400
  olevelGrades: ('A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6')[]; // 5 subjects
}

export const OLEVEL_POINTS: Record<string, number> = {
  A1: 8,
  B2: 7,
  B3: 6,
  C4: 5,
  C5: 4,
  C6: 3,
};

export interface JAMBAggregateResult {
  utmeComponent: number; // 50%
  olevelComponent: number; // 50%
  totalAggregate: number; // 100%
}

export function calculateJAMBAggregate(params: JAMBAggregateParams): JAMBAggregateResult {
  const { utmeScore, olevelGrades } = params;
  if (utmeScore < 0 || utmeScore > 400) {
    throw new Error('UTME score must be between 0 and 400');
  }
  if (!olevelGrades || olevelGrades.length < 5) {
    throw new Error('5 core O-level subjects are required');
  }

  // UTME is 50%: (score / 400) * 50 = score / 8
  const utmeComponent = utmeScore / 8;

  // O-level is 50%: sum of points out of 40 (5 * 8 = 40), then (sum / 40) * 50 = (sum * 1.25)
  const olevelSum = olevelGrades.slice(0, 5).reduce((acc, g) => acc + (OLEVEL_POINTS[g] || 0), 0);
  const olevelComponent = (olevelSum / 40) * 50;

  const totalAggregate = utmeComponent + olevelComponent;

  return {
    utmeComponent: parseFloat(utmeComponent.toFixed(2)),
    olevelComponent: parseFloat(olevelComponent.toFixed(2)),
    totalAggregate: parseFloat(totalAggregate.toFixed(2)),
  };
}
