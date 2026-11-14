export const DEFAULT_AI_MODEL = '@cf/meta/llama-3.1-8b-instruct';
export const DAILY_FREE_NEURON_LIMIT = 10_000;
export const USD_PER_1_000_NEURONS = 0.011;

export interface ModelNeuronPricing {
  inputNeuronsPerMillion: number;
  outputNeuronsPerMillion: number;
  inputUsdPerMillion: number;
  outputUsdPerMillion: number;
}

// Rates published by Cloudflare Workers AI. Keep these tied to model IDs;
// input and output token prices are deliberately not treated as interchangeable.
export const MODEL_NEURON_PRICING: Record<string, ModelNeuronPricing> = {
  '@cf/meta/llama-3.1-8b-instruct': {
    inputNeuronsPerMillion: 25_608,
    outputNeuronsPerMillion: 75_147,
    inputUsdPerMillion: 0.282,
    outputUsdPerMillion: 0.827,
  },
  '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b': {
    inputNeuronsPerMillion: 45_170,
    outputNeuronsPerMillion: 443_756,
    inputUsdPerMillion: 0.497,
    outputUsdPerMillion: 4.881,
  },
};

export interface AIUsageSummary {
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  neuronsConsumed: number | null;
  costUsd: number | null;
  exact: boolean;
}

export interface DailyNeuronUsage {
  utcDay: string;
  neuronsUsed: number;
  inputTokens: number;
  outputTokens: number;
}

export function getUtcDayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function createEmptyDailyUsage(utcDay = getUtcDayKey()): DailyNeuronUsage {
  return { utcDay, neuronsUsed: 0, inputTokens: 0, outputTokens: 0 };
}

export function normalizeDailyUsage(value: unknown, utcDay = getUtcDayKey()): DailyNeuronUsage {
  if (!value || typeof value !== 'object') return createEmptyDailyUsage(utcDay);
  const record = value as Partial<DailyNeuronUsage>;
  if (record.utcDay !== utcDay) return createEmptyDailyUsage(utcDay);

  const nonNegative = (n: unknown) =>
    typeof n === 'number' && Number.isFinite(n) && n >= 0 ? n : 0;

  return {
    utcDay,
    neuronsUsed: nonNegative(record.neuronsUsed),
    inputTokens: nonNegative(record.inputTokens),
    outputTokens: nonNegative(record.outputTokens),
  };
}

export function addUsageToDaily(
  current: DailyNeuronUsage,
  usage: AIUsageSummary,
  utcDay = getUtcDayKey(),
): DailyNeuronUsage {
  const today = current.utcDay === utcDay ? normalizeDailyUsage(current, utcDay) : createEmptyDailyUsage(utcDay);
  return {
    utcDay,
    neuronsUsed: today.neuronsUsed + (usage.neuronsConsumed ?? 0),
    inputTokens: today.inputTokens + usage.promptTokens,
    outputTokens: today.outputTokens + usage.completionTokens,
  };
}

export function calculateModelUsage(
  model: string,
  promptTokens: number,
  completionTokens: number,
  exact: boolean,
): AIUsageSummary | null {
  if (
    !Number.isFinite(promptTokens) || promptTokens < 0 ||
    !Number.isFinite(completionTokens) || completionTokens < 0
  ) return null;

  const pricing = MODEL_NEURON_PRICING[model];
  const neuronsConsumed = pricing
    ? (promptTokens * pricing.inputNeuronsPerMillion + completionTokens * pricing.outputNeuronsPerMillion) / 1_000_000
    : null;
  const costUsd = pricing
    ? (promptTokens * pricing.inputUsdPerMillion + completionTokens * pricing.outputUsdPerMillion) / 1_000_000
    : null;

  return {
    model,
    promptTokens,
    completionTokens,
    totalTokens: promptTokens + completionTokens,
    neuronsConsumed,
    costUsd,
    exact,
  };
}

// Fallback only: byte/text length is not the model tokenizer, so callers must
// mark results from this helper as estimated rather than measured.
export function estimateTokensFromText(text: string): number {
  const bytes = new TextEncoder().encode(text).length;
  return Math.ceil(bytes / 4);
}
