// Client-side helper for the app's JSON API ({ success, data } / { success: false, error }).

import type { ApiErrorCode } from "@/lib/api";

export type ApiFailure = {
  ok: false;
  status: number;
  code: ApiErrorCode | "NETWORK";
  message: string;
  meta?: Record<string, unknown>;
};

export type ApiResult<T> = { ok: true; data: T } | ApiFailure;

export async function apiFetch<T>(url: string, init?: RequestInit): Promise<ApiResult<T>> {
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
    });
  } catch {
    return {
      ok: false,
      status: 0,
      code: "NETWORK",
      message: "Could not reach the server. Check your connection and try again.",
    };
  }

  const body = await res.json().catch(() => null);
  if (res.ok && body?.success) {
    return { ok: true, data: body.data as T };
  }
  return {
    ok: false,
    status: res.status,
    code: body?.error?.code ?? "INTERNAL",
    message: body?.error?.message ?? "Something went wrong. Please try again.",
    meta: body?.error?.meta,
  };
}

/** Errors where pressing "Try again" right away can help. */
export function isRetryable(err: ApiFailure) {
  return !["VALIDATION_ERROR", "QUOTA_EXCEEDED", "NOT_FOUND", "UNAUTHORIZED"].includes(err.code);
}

export type { UsageSummary } from "@/lib/usage";
