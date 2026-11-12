// Aurikrex IndexedDB Storage Layer using Dexie
import Dexie, { type Table } from 'dexie';
import { AngleMode, ResultDisplayForm } from '../engine/types';

export interface StoredTapeRow {
  id: string;
  expression: string;
  value: string | null;
  numericValue: number | null;
  unit: string | null;
  error: string | null;
  forms: {
    decimal: string;
    fraction: string | null;
    standardForm: string;
    engineering: string;
  };
  dependsOn: string[];
  createdAt: number;
  updatedAt: number;
}

export interface StoredVariable {
  name: string; // 'A' | 'B' | 'C' | 'X' | 'Y' | 'M' | 'Ans'
  value: number;
  unit?: string | null;
  updatedAt: number;
}

export interface StoredSettings {
  id: string;
  angleMode: AngleMode;
  resultForm: ResultDisplayForm;
  sigFigs: number;
  lastCategory: string;
}

export class AurikrexDatabase extends Dexie {
  tape!: Table<StoredTapeRow, string>;
  variables!: Table<StoredVariable, string>;
  settings!: Table<StoredSettings, string>;

  constructor() {
    super('AurikrexCalcDB');
    this.version(1).stores({
      tape: 'id, createdAt, updatedAt',
      variables: 'name, updatedAt',
      settings: 'id',
    });
  }
}

export const db = new AurikrexDatabase();

/**
 * Request persistent storage from the browser
 */
export async function initStoragePersistence() {
  if (typeof window !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      const isPersisted = await navigator.storage.persist();
      console.log(`[Aurikrex Storage] Persisted: ${isPersisted}`);
    } catch (e) {
      console.warn('[Aurikrex Storage] Persistence request failed:', e);
    }
  }
}

/**
 * Export all data to JSON string for backup
 */
export async function exportDatabaseToJSON(): Promise<string> {
  const tape = await db.tape.toArray();
  const variables = await db.variables.toArray();
  const settings = await db.settings.toArray();

  const backup = {
    app: 'Aurikrex Calculator',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    data: {
      tape,
      variables,
      settings,
    },
  };

  return JSON.stringify(backup, null, 2);
}

/**
 * Import database from JSON string
 */
export async function importDatabaseFromJSON(jsonStr: string): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || !parsed.data) {
      throw new Error('Invalid Aurikrex backup format');
    }

    await db.transaction('rw', db.tape, db.variables, db.settings, async () => {
      if (parsed.data.tape && Array.isArray(parsed.data.tape)) {
        await db.tape.clear();
        await db.tape.bulkPut(parsed.data.tape);
      }
      if (parsed.data.variables && Array.isArray(parsed.data.variables)) {
        await db.variables.clear();
        await db.variables.bulkPut(parsed.data.variables);
      }
      if (parsed.data.settings && Array.isArray(parsed.data.settings)) {
        await db.settings.clear();
        await db.settings.bulkPut(parsed.data.settings);
      }
    });

    return true;
  } catch (err) {
    console.error('[Aurikrex Storage] Import failed:', err);
    throw err;
  }
}
