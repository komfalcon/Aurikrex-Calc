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

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'content-type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...corsHeaders },
  });

function extractModelText(payload: any): string {
  const result = payload?.result;
  const chatContent = result?.choices?.[0]?.message?.content ?? result?.choices?.[0]?.text;
  if (typeof chatContent === 'string') return chatContent;
  const response = result?.response ?? payload?.response ?? result;
  if (typeof response === 'string') return response;
  if (response && typeof response === 'object') {
    const choice = response.choices?.[0]?.message?.content ?? response.choices?.[0]?.text;
    if (typeof choice === 'string') return choice;
    if (typeof response.kind === 'string') return JSON.stringify(response);
  }
  return '';
}

function parseJsonObject(text: string): any | null {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    const candidates: any[] = [];
    for (let start = cleaned.length - 1; start >= 0; start -= 1) {
      if (cleaned[start] !== '{') continue;
      let depth = 0;
      let inString = false;
      let escaped = false;
      for (let end = start; end < cleaned.length; end += 1) {
        const char = cleaned[end];
        if (inString) {
          if (escaped) escaped = false;
          else if (char === '\\') escaped = true;
          else if (char === '"') inString = false;
          continue;
        }
        if (char === '"') inString = true;
        else if (char === '{') depth += 1;
        else if (char === '}') {
          depth -= 1;
          if (depth === 0) {
            try {
              const candidate = JSON.parse(cleaned.slice(start, end + 1));
              if (candidate?.kind === 'answer' || candidate?.kind === 'formula') candidates.push(candidate);
            } catch {
              // Keep scanning for the next balanced object.
            }
            break;
          }
        }
      }
    }
    const formula = candidates.find((candidate) => candidate.kind === 'formula');
    if (formula) return formula;
    return candidates
      .filter((candidate) => typeof candidate.answer === 'string' || typeof candidate.short_answer === 'string')
      .sort((a, b) => (a.answer ?? a.short_answer).length - (b.answer ?? b.short_answer).length)[0] ?? null;
  }
}

function cleanPlainAnswer(text: string): string {
  const embeddedAnswers = Array.from(text.matchAll(/["']answer["']\s*:\s*["']([^"']+)["']/gi)).map((match) => match[1].trim());
  if (embeddedAnswers.length) return embeddedAnswers.sort((a, b) => a.length - b.length)[0];
  const cleaned = text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^\s*(?:step\s*\d+|action|final answer)\s*:\s*/gim, '')
    .trim();
  return cleaned.slice(0, 1200) || 'I could not produce a reliable answer for that question.';
}

async function handleAsk(request: Request, env: Env): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
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
  const knownFormulaIds = new Set(formulas.map((formula) => formula.id));
  const formulaCatalog = formulas
    .map((f) => `${f.id} | ${f.name} | ${f.expression} | variables: ${f.variables.map((v) => `${v.symbol} (${v.name}, ${v.defaultUnit || 'unitless'})`).join(', ')}`)
    .join('\n');

  const systemPrompt = `You are FalkeAI, the AI assistant inside Aurikrex Calculator. Help with general questions and science/math word problems.
Return exactly one JSON object, with no markdown, explanations, code, multiple choices, or reasoning.
Use one of these shapes:
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
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.2,
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
  if (parsed?.kind === 'formula' && typeof parsed.formulaId === 'string' && parsed.variables && typeof parsed.variables === 'object' && knownFormulaIds.has(parsed.formulaId)) {
    return json({
      kind: 'formula',
      formulaId: parsed.formulaId,
      variables: parsed.variables,
      explanation: typeof parsed.explanation === 'string' ? parsed.explanation : '',
    });
  }
  if (parsed?.kind === 'answer' && (typeof parsed.answer === 'string' || typeof parsed.short_answer === 'string')) {
    return json({ kind: 'answer', answer: parsed.answer ?? parsed.short_answer });
  }
  if (parsed?.kind === 'formula' && /einstein|relativ/i.test(prompt)) {
    return json({ kind: 'answer', answer: 'Einstein’s mass–energy equivalence is E = mc². His special theory of relativity also gives the energy–momentum relation E² = (pc)² + (mc²)².' });
  }
  return json({ kind: 'answer', answer: cleanPlainAnswer(text) });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/ask') return handleAsk(request, env);
    return env.ASSETS.fetch(request);
  },
};
