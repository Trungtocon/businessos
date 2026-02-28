// ERPNext Connector — Actions
// Maps ErpActionType -> ERPNext REST API calls.

import { erpFetch } from "./erpnext.client";
import { getAuthHeaders } from "./auth";
import { ErpNextError } from "./errors";
import type {
    ErpAction,
    ErpActionResult,
    LeadPayload,
    ToDoPayload,
} from "./types";

const BASE_URL = process.env.ERPNEXT_BASE_URL || "http://localhost:8081";

/**
 * Execute an approved ERP action against the ERPNext API.
 */
export async function executeAction(action: ErpAction): Promise<ErpActionResult> {
    if (action.status !== "approved") {
        throw new ErpNextError(
            `Action ${action.id} is not approved (status: ${action.status})`,
            403,
            "ERP_NOT_APPROVED"
        );
    }

    switch (action.type) {
        case "ERP.CREATE_LEAD":
            return createLead(action.payload as unknown as LeadPayload);
        case "ERP.CREATE_TODO":
            return createToDo(action.payload as unknown as ToDoPayload);
        default:
            throw new ErpNextError(`Unknown action type: ${action.type}`, 400, "ERP_UNKNOWN_ACTION");
    }
}

async function createLead(payload: LeadPayload): Promise<ErpActionResult> {
    const headers = getAuthHeaders();
    const res = await erpFetch<{ data: { name: string } }>("/api/resource/Lead", {
        method: "POST",
        headers,
        body: payload,
    });

    const name = res.data?.data?.name ?? "unknown";
    return {
        ok: true,
        doctype: "Lead",
        name,
        url: `${BASE_URL}/app/lead/${name}`,
    };
}

async function createToDo(payload: ToDoPayload): Promise<ErpActionResult> {
    const headers = getAuthHeaders();
    const res = await erpFetch<{ data: { name: string } }>("/api/resource/ToDo", {
        method: "POST",
        headers,
        body: payload,
    });

    const name = res.data?.data?.name ?? "unknown";
    return {
        ok: true,
        doctype: "ToDo",
        name,
        url: `${BASE_URL}/app/todo/${name}`,
    };
}

/**
 * Test auth by calling /api/method/frappe.auth.get_logged_user
 */
export async function testAuth(): Promise<{ ok: boolean; user?: string; error?: string }> {
    try {
        const headers = getAuthHeaders();
        const res = await erpFetch<{ message: string }>("/api/method/frappe.auth.get_logged_user", {
            headers,
        });
        return { ok: true, user: res.data?.message };
    } catch (err) {
        return {
            ok: false,
            error: err instanceof Error ? err.message : String(err),
        };
    }
}
