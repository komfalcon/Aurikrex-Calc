interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CF_API_TOKEN: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  AI_MODEL?: string;
}

type FormulaSummary = {
  id: string;
  name: string;
  expression: string;
  variables: { symbol: string; name: string; defaultUnit: string }[];
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

function extractModelText(payload: any): string {
  const response = payload?.result?.response ?? payload?.response ?? payload?.result;
  if (typeof response === 'string') return response;
  if (response && typeof response === 'object') {
    const choice = response.choices?.[0]?.message?.content ?? response.choices?.[0]?.text;
    if (typeof choice === 'string') return choice;
  }
  return '';
}

function parseJsonObject(text: string): any | null {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start < 0 || end <= start) return null;
    try {
      return JSON.parse(cleaned.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

async function handleAsk(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!env.CF_API_TOKEN || !env.CLOUDFLARE_ACCOUNT_ID) {
    return json({ error: 'Workers AI is not configured on this deployment.' }, 503);
  }

  let body: { prompt?: string; formulas?: FormulaSummary[] };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt || prompt.length > 4000) return json({ error: 'Prompt must be between 1 and 4000 characters.' }, 400);

  const formulas = Array.isArray(body.formulas) ? body.formulas.slice(0, 160) : [];
  const formulaCatalog = formulas
    .map((f) => `${f.id} | ${f.name} | ${f.expression} | variables: ${f.variables.map((v) => `${v.symbol} (${v.name}, ${v.defaultUnit || 'unitless'})`).join(', ')}`)
    .join('\n');

  const systemPrompt = `You are Aurikrex Calc AI. Help with general questions and science/math word problems.
Return exactly one JSON object and no markdown. Use one of these shapes:
{"kind":"answer","answer":"short helpful answer"}
{"kind":"formula","formulaId":"exact-id-from-catalog","variables":{"symbol":number},"explanation":"brief explanation"}
For a formula response, choose only an exact formula id from the catalog, copy only numeric values explicitly present in the problem, and leave exactly one formula variable unknown for the calculator engine to solve. Never invent missing values. If the question is not a solvable calculator word problem, return kind=answer instead. Keep general answers concise and factual.
Formula catalog:
${formulaCatalog}`;

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(env.CLOUDFLARE_ACCOUNT_ID)}/ai/run/${env.AI_MODEL || '@cf/meta/llama-3.1-8b-instruct'}`;
  let aiResponse: Response;
  try {
    aiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.CF_API_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${systemPrompt}\n\nUser question:\n${prompt}`,
        max_tokens: 700,
      }),
    });
  } catch {
    return json({ error: 'Unable to reach Cloudflare Workers AI.' }, 502);
  }

  const payload = await aiResponse.json().catch(() => null) as any;
  if (!aiResponse.ok || payload?.success === false) {
    return json({ error: 'Cloudflare Workers AI rejected the request.', details: payload?.errors ?? [] }, 502);
  }

  const text = extractModelText(payload);
  const parsed = parseJsonObject(text);
  if (parsed?.kind === 'formula' && typeof parsed.formulaId === 'string' && parsed.variables && typeof parsed.variables === 'object') {
    return json({
      kind: 'formula',
      formulaId: parsed.formulaId,
      variables: parsed.variables,
      explanation: typeof parsed.explanation === 'string' ? parsed.explanation : '',
    });
  }
  if (parsed?.kind === 'answer' && typeof parsed.answer === 'string') {
    return json({ kind: 'answer', answer: parsed.answer });
  }
  return json({ kind: 'answer', answer: text || 'I could not produce a reliable answer for that question.' });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/ask') return handleAsk(request, env);
    return env.ASSETS.fetch(request);
  },
};
