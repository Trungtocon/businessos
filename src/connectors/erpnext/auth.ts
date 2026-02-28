// ERPNext Connector — Auth
// Builds auth headers for ERPNext API calls. Server-only.

import { ErpNextError } from "./errors";

export interface ErpAuthHeaders {
    [key: string]: string;
    Authorization: string;
    "X-Frappe-Site-Name": string;
    "Content-Type": string;
}

/**
 * Build ERPNext auth headers from environment variables.
 * Throws if key/secret are not configured.
 */
export function getAuthHeaders(): ErpAuthHeaders {
    const key = process.env.ERPNEXT_API_KEY;
    const secret = process.env.ERPNEXT_API_SECRET;
    const site = process.env.ERPNEXT_SITE || "local.site";

    if (!key || !secret) {
        throw ErpNextError.missingConfig("ERPNEXT_API_KEY / ERPNEXT_API_SECRET");
    }

    return {
        Authorization: `token ${key}:${secret}`,
        "X-Frappe-Site-Name": site,
        "Content-Type": "application/json",
    };
}

/**
 * Check if ERPNext credentials are configured (non-throwing).
 */
export function hasAuthConfig(): boolean {
    return !!(process.env.ERPNEXT_API_KEY && process.env.ERPNEXT_API_SECRET);
}
