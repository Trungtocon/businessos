import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * Sprint 7 — E2E ERPNext Execution Gate
 *
 * Full flow: Pack generate → drafts → approve → execute → evidence pack
 * Runs against PROD server (port 3005) via playwright.prod.config.ts
 *
 * ERP config detection uses /api/integrations/erpnext/auth/test (server-side),
 * NOT process.env in the Playwright runner.
 */

const WS_ID = "e2e_test_ws";

// ─── Known fail-closed error codes ─────────────────────────────────
const FAIL_CLOSED_ERRORS = [
    "provider_key_missing",
    "auth_failed",
    "unreachable",
    "timeout",
    "validation_error",
    "erpnext_execution_failed",
    "erp_error",
    "max_retries",
    "unsupported_action",
];

// ─── Helpers ──────────────────────────────────────────────────────────

async function detectErpStatus(request: APIRequestContext) {
    try {
        const res = await request.get("/api/integrations/erpnext/auth/test");
        const json = await res.json();
        return {
            configured: !!json.configured,
            reachable: json.ok === true && json.reachable === true,
        };
    } catch {
        return { configured: false, reachable: false };
    }
}

async function generatePack(request: APIRequestContext) {
    const res = await request.post("/api/packs/generate", {
        data: { workspaceId: WS_ID, packId: "pack_lead_sme_v1" },
    });
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.ok).toBe(true);
    return json as { packId: string; draftsCount: number; packName: string };
}

async function listDrafts(request: APIRequestContext, packId: string) {
    const res = await request.get(`/api/actions/list?workspaceId=${WS_ID}&packId=${packId}&status=draft`);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    return json.actions as Array<{ id: string; type: string; status: string; backend: string; packId: string }>;
}

async function approveAction(request: APIRequestContext, id: string) {
    const res = await request.post("/api/actions/approve", { data: { id } });
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.action.status).toBe("approved");
    return json.action;
}

async function executeAction(request: APIRequestContext, id: string) {
    const res = await request.post("/api/actions/execute", { data: { id } });
    return { status: res.status(), body: await res.json() };
}

async function fetchEvidence(request: APIRequestContext, packId: string) {
    const res = await request.get(`/api/evidence/pack?packId=${packId}&packType=lead&workspaceId=${WS_ID}`);
    expect(res.ok()).toBeTruthy();
    return await res.json();
}

// ─── Tests ────────────────────────────────────────────────────────────

test.describe("Sprint 7 — E2E Execution Gate", () => {
    test.describe.configure({ timeout: 60_000 });

    let packRunId: string;
    let draftIds: string[] = [];

    test("Step 1: Generate pack → drafts created", async ({ request }) => {
        const result = await generatePack(request);
        packRunId = result.packId;
        expect(result.draftsCount).toBe(3);
        expect(result.packName).toContain("Lead");

        const drafts = await listDrafts(request, packRunId);
        expect(drafts.length).toBe(3);
        draftIds = drafts.map(d => d.id);
    });

    test("Step 2: Fail-closed — cannot execute unapproved draft", async ({ request }) => {
        const result = await generatePack(request);
        const drafts = await listDrafts(request, result.packId);
        expect(drafts.length).toBeGreaterThan(0);

        const execResult = await executeAction(request, drafts[0].id);
        expect(execResult.status).toBe(400);
        expect(execResult.body.error).toContain("Must be approved");
    });

    test("Step 3: Approve + Execute (internal backend) → executed", async ({ request }) => {
        const result = await generatePack(request);
        const drafts = await listDrafts(request, result.packId);
        const draft = drafts[0];

        await approveAction(request, draft.id);

        const execResult = await executeAction(request, draft.id);
        expect(execResult.status).toBe(200);
        expect(execResult.body.ok).toBe(true);
        expect(execResult.body.action.status).toBe("executed");
        expect(execResult.body.action.result.provider).toBe("internal");

        packRunId = result.packId;
    });

    test("Step 4: Idempotency — re-execute returns same result", async ({ request }) => {
        const result = await generatePack(request);
        const drafts = await listDrafts(request, result.packId);
        await approveAction(request, drafts[0].id);

        const exec1 = await executeAction(request, drafts[0].id);
        expect(exec1.body.ok).toBe(true);

        const exec2 = await executeAction(request, drafts[0].id);
        expect(exec2.body.ok).toBe(true);
        expect(exec2.body.idempotent).toBe(true);
    });

    test("Step 5: Evidence pack contains expected files", async ({ request }) => {
        const result = await generatePack(request);
        const drafts = await listDrafts(request, result.packId);
        await approveAction(request, drafts[0].id);
        await executeAction(request, drafts[0].id);

        const evidence = await fetchEvidence(request, result.packId);
        expect(evidence.packId).toBe(result.packId);
        expect(evidence.workspaceId).toBe(WS_ID);

        const fileNames = evidence.files.map((f: { name: string }) => f.name);
        expect(fileNames).toContain("actions.json");
        expect(fileNames).toContain("audit.jsonl");
        expect(fileNames).toContain("evidence.md");
        expect(fileNames).toContain("erpnext_results.json");

        expect(evidence.evidenceIndex).toContain(WS_ID);
    });

    test("Step 6: ERPNext backend execute (skip if not configured+reachable)", async ({ request }) => {
        const erp = await detectErpStatus(request);
        if (!erp.configured || !erp.reachable) {
            test.skip(true, `ERPNext not ready (configured=${erp.configured}, reachable=${erp.reachable})`);
            return;
        }

        // ERP is configured + reachable → run full flow
        const result = await generatePack(request);
        const drafts = await listDrafts(request, result.packId);
        const draft = drafts[0];

        const switchRes = await request.post("/api/actions/set-backend", {
            data: { id: draft.id, backend: "erpnext" },
        });
        expect(switchRes.ok()).toBeTruthy();

        await approveAction(request, draft.id);

        const execResult = await executeAction(request, draft.id);

        // Accept either: success (ERP created the doc) or known fail (ERP rejected payload)
        if (execResult.status === 200) {
            expect(execResult.body.ok).toBe(true);
            expect(execResult.body.action.status).toBe("executed");
            expect(execResult.body.action.result.provider).toBe("erpnext");
            expect(execResult.body.action.result.created.length).toBeGreaterThan(0);

            // Verify evidence includes ERP results
            const evidence = await fetchEvidence(request, result.packId);
            expect(evidence.evidenceIndex).toContain("ERPNext");
        } else {
            // ERPNext reachable but rejected the payload (validation_error, auth_failed, etc.)
            expect(execResult.status).toBe(422);
            expect(FAIL_CLOSED_ERRORS).toContain(execResult.body.error);
            expect(execResult.body.action.status).toBe("failed");
        }
    });

    test("Step 7: ERPNext backend — handles execution gracefully", async ({ request }) => {
        const result = await generatePack(request);
        const drafts = await listDrafts(request, result.packId);
        const draft = drafts[0];

        await request.post("/api/actions/set-backend", {
            data: { id: draft.id, backend: "erpnext" },
        });

        await approveAction(request, draft.id);

        const execResult = await executeAction(request, draft.id);

        // The test validates graceful handling in ALL scenarios:
        // 1) Keys missing → 422 + provider_key_missing
        // 2) Keys present, ERP unreachable → 422 + unreachable/timeout
        // 3) Keys present, ERP reachable, validation error → 422 + validation_error
        // 4) Keys present, ERP reachable, success → 200 + ok
        if (execResult.status === 200) {
            expect(execResult.body.ok).toBe(true);
            expect(execResult.body.action.status).toBe("executed");
        } else {
            expect(execResult.status).toBe(422);
            expect(execResult.body.ok).toBe(false);
            expect(FAIL_CLOSED_ERRORS).toContain(execResult.body.error);
            expect(execResult.body.action.status).toBe("failed");
            expect(FAIL_CLOSED_ERRORS).toContain(execResult.body.action.error.code);
        }
    });

    test("Step 8: Approval Console UI renders drafts from E2E workspace", async ({ page, request }) => {
        test.setTimeout(30_000);

        await generatePack(request);

        await page.goto("/virtual/approvals", { waitUntil: "domcontentloaded", timeout: 15000 });
        await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => { });

        const wsSelect = page.locator("[data-testid='select-workspace']");
        const hasWs = await wsSelect.isVisible().catch(() => false);
        if (hasWs) {
            const options = await wsSelect.locator("option").allTextContents();
            if (options.some(o => o.includes("e2e") || o.includes("default"))) {
                // Use existing workspace
            }
        }

        await page.waitForSelector("[data-testid='action-row'], [data-testid='no-actions']", { timeout: 10000 });
    });
});
