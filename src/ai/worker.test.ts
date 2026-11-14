import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from '../worker';
import { DEFAULT_AI_MODEL } from './usage';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

function makeRequest() {
  return new Request('https://aurikrex-calc.moparaji57.workers.dev/api/ask', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ prompt: 'Rate my IQ', formulas: [] }),
  });
}

const env = {
  ASSETS: { fetch: async () => new Response('asset') },
  CF_API_TOKEN: 'test-only-token',
  CLOUDFLARE_ACCOUNT_ID: 'test-account',
  AI_MODEL: DEFAULT_AI_MODEL,
};

describe('Workers AI ask telemetry', () => {
  it('uses the Chat Completions endpoint and returns provider-reported token counts', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({ kind: 'answer', answer: 'A score cannot be inferred from a chat.' }) } }],
      usage: { prompt_tokens: 100, completion_tokens: 20, total_tokens: 120 },
    }), { status: 200, headers: { 'content-type': 'application/json' } }));

    const response = await worker.fetch(makeRequest(), env);
    const payload = await response.json() as any;

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(String(fetchMock.mock.calls[0][0])).toContain('/ai/v1/chat/completions');
    const requestBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(requestBody.model).toBe(DEFAULT_AI_MODEL);
    expect(requestBody.stream).toBe(false);
    expect(payload.usage).toMatchObject({
      model: DEFAULT_AI_MODEL,
      promptTokens: 100,
      completionTokens: 20,
      totalTokens: 120,
      neuronsConsumed: 4.06374,
      exact: true,
    });
  });

  it('marks text-length token fallback as estimated when provider usage is absent', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({ kind: 'answer', answer: 'A short answer.' }) } }],
    }), { status: 200, headers: { 'content-type': 'application/json' } }));

    const response = await worker.fetch(makeRequest(), env);
    const payload = await response.json() as any;

    expect(response.status).toBe(200);
    expect(payload.usage.exact).toBe(false);
    expect(payload.usage.promptTokens).toBeGreaterThan(0);
    expect(payload.usage.completionTokens).toBeGreaterThan(0);
    expect(payload.usage.neuronsConsumed).toBeGreaterThan(0);
  });
});
