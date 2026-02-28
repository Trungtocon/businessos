// ERPNext Connector — HTTP Client
// Server-only fetch wrapper with retry, timeout, and error normalization.

import { ErpNextError } from "./errors";
import type { ErpApiResponse } from "./types";

const BASE_URL = process.env.ERPNEXT_BASE_URL || "http://localhost:8081";
const SITE = process.env.ERPNEXT_SITE || "local.site";
const TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2;

interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
    retries?: number;
}

/**
 * Low-level fetch to ERPNext with retry + timeout.
 */
export async function erpFetch<T = unknown>(
    path: string,
    opts: FetchOptions = {}
): Promise<ErpApiResponse<T>> {
    const { method = "GET", headers = {}, body, retries = MAX_RETRIES } = opts;

    const url = `${BASE_URL}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const reqHeaders: Record<string, string> = {
        "X-Frappe-Site-Name": SITE,
        "Content-Type": "application/json",
        ...headers,
    };

    const reqInit: RequestInit = {
        method,
        headers: reqHeaders,
        signal: controller.signal,
    };
    if (body) reqInit.body = JSON.stringify(body);

    let lastError: ErpNextError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, reqInit);
            clearTimeout(timer);

            if (res.ok) {
                const data = (await res.json()) as T;
                return { ok: true, provider: "erpnext", status: res.status, data };
            }

            // Non-retryable client errors
            if (res.status >= 400 && res.status < 500 && res.status !== 429) {
                let errBody: unknown;
                try { errBody = await res.json(); } catch { errBody = await res.text(); }
                throw ErpNextError.fromResponse(res.status, errBody);
            }

            // Retryable 5xx / 429
            lastError = ErpNextError.fromResponse(res.status, await res.text().catch(() => ""));
        } catch (err) {
            clearTimeout(timer);
            if (err instanceof ErpNextError) throw err;
            lastError = ErpNextError.network(err);
        }

        // Backoff before retry
        if (attempt < retries) {
            await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        }
    }

    throw lastError ?? new ErpNextError("Unknown error", 0, "ERP_UNKNOWN");
}

/**
 * Ping ERPNext (no auth required).
 */
export async function pingErpNext(): Promise<ErpApiResponse<{ message: string }>> {
    return erpFetch<{ message: string }>("/api/method/ping");
}
