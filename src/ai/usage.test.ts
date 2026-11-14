import { describe, expect, it } from 'vitest';
import {
  addUsageToDaily,
  calculateModelUsage,
  createEmptyDailyUsage,
  getUtcDayKey,
  normalizeDailyUsage,
} from './usage';

describe('Workers AI neuron accounting', () => {
  it('uses separate published Llama 3.1 8B input and output rates', () => {
    const usage = calculateModelUsage('@cf/meta/llama-3.1-8b-instruct', 1_000_000, 1_000_000, true);

    expect(usage).not.toBeNull();
    expect(usage?.neuronsConsumed).toBe(100_755);
    expect(usage?.costUsd).toBeCloseTo(1.109, 9);
    expect(usage?.totalTokens).toBe(2_000_000);
    expect(usage?.exact).toBe(true);
  });

  it('does not apply a known model rate to an unknown model', () => {
    const usage = calculateModelUsage('unknown/model', 100, 20, true);

    expect(usage?.neuronsConsumed).toBeNull();
    expect(usage?.costUsd).toBeNull();
  });

  it('resets a stale daily record when the UTC date changes', () => {
    const stale = { utcDay: '2026-11-13', neuronsUsed: 900, inputTokens: 1000, outputTokens: 200 };

    expect(normalizeDailyUsage(stale, '2026-11-14')).toEqual(createEmptyDailyUsage('2026-11-14'));
  });

  it('adds request token counts and neuron usage to the current UTC day', () => {
    const previous = { utcDay: '2026-11-14', neuronsUsed: 12.5, inputTokens: 300, outputTokens: 60 };
    const request = calculateModelUsage('@cf/meta/llama-3.1-8b-instruct', 1000, 200, false)!;
    const next = addUsageToDaily(previous, request, '2026-11-14');

    expect(next.utcDay).toBe('2026-11-14');
    expect(next.neuronsUsed).toBeCloseTo(12.5 + (1000 * 25_608 + 200 * 75_147) / 1_000_000, 12);
    expect(next.inputTokens).toBe(1300);
    expect(next.outputTokens).toBe(260);
  });

  it('uses UTC, not the device local timezone, to select the Cloudflare quota day', () => {
    expect(getUtcDayKey(new Date('2026-11-14T23:59:59.000Z'))).toBe('2026-11-14');
    expect(getUtcDayKey(new Date('2026-11-15T00:00:00.000Z'))).toBe('2026-11-15');
  });
});
