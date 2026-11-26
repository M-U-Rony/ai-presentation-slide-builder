import { OpenRouter } from "@openrouter/sdk";
import * as orErrors from "@openrouter/sdk/models/errors";
import { ApiError } from "@/lib/api";
import { getEnv } from "@/lib/env";

let client: OpenRouter | null = null;

export function getAIClient(): OpenRouter {
  if (!client) {
    client = new OpenRouter({ apiKey: getEnv().OPENROUTER_API_KEY });
  }
  return client;
}

export type ChatSend = OpenRouter["chat"]["send"];

/**
 * Request options for every AI call. The SDK's default retry policy retries
 * connection errors with backoff for up to an hour, which made requests hang
 * indefinitely; we disable it and do our own single retry where it helps.
 */
export function requestOptions(timeoutMs: number) {
  return { timeoutMs, retries: { strategy: "none" as const } };
}

/** Maps SDK/network errors to client-safe ApiErrors (keeping the cause for logs). */
export function toApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;

  let mapped: ApiError;
  if (
    err instanceof orErrors.RequestTimeoutError ||
    err instanceof orErrors.RequestAbortedError ||
    err instanceof orErrors.RequestTimeoutResponseError ||
    err instanceof orErrors.EdgeNetworkTimeoutResponseError
  ) {
    mapped = new ApiError("AI_TIMEOUT", "The AI provider took too long to respond. Please try again.");
  } else {
    mapped = new ApiError("AI_PROVIDER_ERROR", "The AI provider returned an error. Please try again.");
  }
  mapped.cause = err;
  return mapped;
}
