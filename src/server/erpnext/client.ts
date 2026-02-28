// ERPNext REST Client — server-only
// Auth: Token-based (api_key:api_secret)
// Retry: 2 retries on 429/5xx with exponential backoff

export interface ErpConfig {
    baseUrl: string;
    apiKey: string;
    apiSecret: string;
    verifyTls: boolean;
    defaultOwner?: string;
    defaultAssignee?: string;
}

export interface ErpResult {
    ok: boolean;
    doctype?: string;
    name?: string;
    data?: Record<string, unknown>;
    error?: { code: string; message: string; httpStatus?: number };
}

function getConfig(): ErpConfig | null {
    const baseUrl = process.env.ERPNEXT_BASE_URL;
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;
    if (!baseUrl || !apiKey || !apiSecret) return null;
    return {
        baseUrl: baseUrl.replace(/\/$/, ""),
        apiKey,
        apiSecret,
        verifyTls: process.env.ERPNEXT_VERIFY_TLS !== "false",
        defaultOwner: process.env.ERPNEXT_DEFAULT_OWNER,
        defaultAssignee: process.env.ERPNEXT_DEFAULT_ASSIGNEE,
    };
}

export function hasErpConfig(): boolean {
    return getConfig() !== null;
}

export function getErpConfig(): ErpConfig {
    const cfg = getConfig();
    if (!cfg) throw new Error("ERPNext env vars missing (ERPNEXT_BASE_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET)");
    return cfg;
}

async function erpFetch(
    cfg: ErpConfig,
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    body?: Record<string, unknown>,
    retries = 2,
): Promise<ErpResult> {
    const url = `${cfg.baseUrl}${path}`;
    const headers: Record<string, string> = {
        Authorization: `token ${cfg.apiKey}:${cfg.apiSecret}`,
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 30_000);

            const res = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
            clearTimeout(timeout);

            if (res.ok) {
                const json = await res.json();
                return {
                    ok: true,
                    doctype: json.data?.doctype,
                    name: json.data?.name,
                    data: json.data,
                };
            }

            // Retry on 429 or 5xx
            if ((res.status === 429 || res.status >= 500) && attempt < retries) {
                const backoff = Math.pow(2, attempt) * 500;
                await new Promise(r => setTimeout(r, backoff));
                continue;
            }

            // Map error
            if (res.status === 401 || res.status === 403) {
                return { ok: false, error: { code: "auth_failed", message: `ERPNext auth failed (${res.status})`, httpStatus: res.status } };
            }
            if (res.status === 417 || res.status === 422) {
                const errBody = await res.json().catch(() => ({}));
                return { ok: false, error: { code: "validation_error", message: errBody._server_messages || errBody.message || `Validation error (${res.status})`, httpStatus: res.status } };
            }

            return { ok: false, error: { code: "erp_error", message: `ERPNext returned ${res.status}`, httpStatus: res.status } };
        } catch (err) {
            if (attempt < retries) {
                const backoff = Math.pow(2, attempt) * 500;
                await new Promise(r => setTimeout(r, backoff));
                continue;
            }
            const msg = err instanceof Error ? err.message : "Unknown error";
            if (msg.includes("abort")) {
                return { ok: false, error: { code: "timeout", message: "ERPNext request timed out (30s)" } };
            }
            return { ok: false, error: { code: "unreachable", message: `Cannot reach ERPNext: ${msg}` } };
        }
    }

    return { ok: false, error: { code: "max_retries", message: "ERPNext request failed after retries" } };
}

// ─── Public API ───────────────────────────────────────────────────────

export async function createDocument(
    cfg: ErpConfig,
    doctype: string,
    fields: Record<string, unknown>,
): Promise<ErpResult> {
    return erpFetch(cfg, "POST", `/api/resource/${doctype}`, fields);
}

export async function getDocument(
    cfg: ErpConfig,
    doctype: string,
    name: string,
): Promise<ErpResult> {
    return erpFetch(cfg, "GET", `/api/resource/${doctype}/${name}`);
}

export async function listDocuments(
    cfg: ErpConfig,
    doctype: string,
    filters?: Record<string, unknown>,
    limit = 20,
): Promise<ErpResult> {
    const params = new URLSearchParams({ limit_page_length: String(limit) });
    if (filters) params.set("filters", JSON.stringify(filters));
    return erpFetch(cfg, "GET", `/api/resource/${doctype}?${params}`);
}

export async function ping(cfg: ErpConfig): Promise<ErpResult> {
    return erpFetch(cfg, "GET", "/api/method/frappe.auth.get_logged_user", undefined, 0);
}
