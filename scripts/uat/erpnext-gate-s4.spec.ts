import { test, expect } from "@playwright/test";

/**
 * Sprint 4 — ERPNext Connector Gate
 *
 * Tests:
 * 1) Execute erpnext action with missing env → provider_key_missing (expected fail-closed)
 * 2) set-backend API works
 * 3) Smoke test: if ERP env present, create ToDo via execute
 */

test.describe("Sprint 4 — ERPNext Gate", () => {
    test.describe.configure({ timeout: 30_000 });

    test("Execute erpnext action → fail-closed (provider_key_missing or erpnext_execution_failed)", async ({ request }) => {
        // 1) Generate pack
        const genRes = await request.post("/api/sprint/generate", {
            data: {
                packType: "lead",
                input: {
                    industry: "Retail",
                    offer: "POS System",
                    targetCustomer: "SME Shops",
                    primaryChannel: "google",
                    budgetRange: "mid",
                    tone: "expert",
                    goal7d: "10 demos",
                },
            },
        });
        const genJson = await genRes.json();
        expect(genJson.ok).toBe(true);

        // 2) Create drafts
        const packId = `test_erp_${Date.now()}`;
        const createRes = await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "lead", input: {}, data: genJson.data },
        });
        const createJson = await createRes.json();
        expect(createJson.ok).toBe(true);
        const draftId = createJson.drafts[0].id;

        // 3) Switch backend to erpnext
        const backendRes = await request.post("/api/actions/set-backend", {
            data: { id: draftId, backend: "erpnext" },
        });
        expect(backendRes.ok()).toBeTruthy();
        const backendJson = await backendRes.json();
        expect(backendJson.action.backend).toBe("erpnext");

        // 4) Approve
        const approveRes = await request.post("/api/actions/approve", {
            data: { id: draftId },
        });
        expect(approveRes.ok()).toBeTruthy();

        // 5) Execute → should fail (either missing keys or ERP call failure)
        const execRes = await request.post("/api/actions/execute", {
            data: { id: draftId },
        });
        expect(execRes.status()).toBe(422);
        const execJson = await execRes.json();
        // Fail-closed: error must be one of the known codes
        const validErrors = ["provider_key_missing", "erpnext_execution_failed"];
        expect(validErrors).toContain(execJson.error);
        expect(execJson.action.status).toBe("failed");
        // Error code in action.error must match
        const validCodes = ["provider_key_missing", "erp_execution_failed"];
        expect(validCodes).toContain(execJson.action.error.code);
    });

    test("set-backend API: switch draft to erpnext", async ({ request }) => {
        const genRes = await request.post("/api/sprint/generate", {
            data: { packType: "content", input: { industry: "F&B", offer: "Catering", targetCustomer: "Corp", primaryChannel: "facebook", budgetRange: "high", tone: "friendly", goal7d: "50 orders" } },
        });
        const genJson = await genRes.json();
        const packId = `test_backend_${Date.now()}`;
        const createRes = await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "content", input: {}, data: genJson.data },
        });
        const createJson = await createRes.json();
        const draftId = createJson.drafts[0].id;

        // Switch to erpnext
        const res = await request.post("/api/actions/set-backend", {
            data: { id: draftId, backend: "erpnext" },
        });
        expect(res.ok()).toBeTruthy();
        const json = await res.json();
        expect(json.action.backend).toBe("erpnext");

        // Verify in list
        const listRes = await request.get(`/api/actions/list?packId=${packId}`);
        const listJson = await listRes.json();
        const found = listJson.actions.find((a: { id: string }) => a.id === draftId);
        expect(found.backend).toBe("erpnext");
    });

    test("set-backend rejects non-draft actions", async ({ request }) => {
        const genRes = await request.post("/api/sprint/generate", {
            data: { packType: "report", input: { industry: "IT", offer: "Cloud", targetCustomer: "Enterprise", primaryChannel: "linkedin", budgetRange: "high", tone: "expert", goal7d: "5 MQLs" } },
        });
        expect(genRes.ok()).toBeTruthy();
        const genJson = await genRes.json();
        const packId = `test_guard2_${Date.now()}`;
        const createRes = await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "report", input: {}, data: genJson.data },
        });
        expect(createRes.ok()).toBeTruthy();
        const createJson = await createRes.json();
        expect(createJson.drafts.length).toBeGreaterThan(0);
        const draftId = createJson.drafts[0].id;

        // Approve first
        const appRes = await request.post("/api/actions/approve", { data: { id: draftId } });
        expect(appRes.ok()).toBeTruthy();

        // Try to change backend on approved action
        const res = await request.post("/api/actions/set-backend", {
            data: { id: draftId, backend: "erpnext" },
        });
        expect(res.status()).toBe(400);
    });

    test("Internal execution still works (regression)", async ({ request }) => {
        const genRes = await request.post("/api/sprint/generate", {
            data: { packType: "lead", input: { industry: "Gym", offer: "PT", targetCustomer: "Youth", primaryChannel: "instagram", budgetRange: "low", tone: "friendly", goal7d: "20 trials" } },
        });
        expect(genRes.ok()).toBeTruthy();
        const genJson = await genRes.json();
        const packId = `test_internal_${Date.now()}`;
        const createRes = await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "lead", input: {}, data: genJson.data },
        });
        expect(createRes.ok()).toBeTruthy();
        const createJson = await createRes.json();
        expect(createJson.drafts.length).toBeGreaterThan(0);
        const draftId = createJson.drafts[0].id;

        const appRes = await request.post("/api/actions/approve", { data: { id: draftId } });
        expect(appRes.ok()).toBeTruthy();

        const execRes = await request.post("/api/actions/execute", { data: { id: draftId } });
        expect(execRes.ok()).toBeTruthy();
        const execJson = await execRes.json();
        expect(execJson.action.status).toBe("executed");
        expect(execJson.action.result.provider).toBe("internal");
    });
});
