import { test, expect } from "@playwright/test";

/**
 * Sprint 3 — Approval Gate (Playwright)
 *
 * Tests:
 * 1) Generate pack → create drafts → verify drafts exist
 * 2) Open Approval Console → see actions
 * 3) Approve + Execute one action
 * 4) API: create-from-pack, list, approve, execute
 */

test.describe("Sprint 3 — Approval Gate", () => {
    test.describe.configure({ timeout: 30_000 });

    test("Full flow: generate → drafts → approve → execute", async ({ page, request }) => {
        // 1) Generate a Lead pack
        const genRes = await request.post("/api/sprint/generate", {
            data: {
                packType: "lead",
                input: {
                    industry: "Education",
                    offer: "Online Courses",
                    targetCustomer: "Students",
                    primaryChannel: "facebook",
                    budgetRange: "mid",
                    tone: "expert",
                    goal7d: "100 signups",
                },
            },
        });
        expect(genRes.ok()).toBeTruthy();
        const genJson = await genRes.json();
        expect(genJson.ok).toBe(true);

        // 2) Create drafts from pack
        const packId = `test_pack_${Date.now()}`;
        const createRes = await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "lead", input: {}, data: genJson.data },
        });
        expect(createRes.ok()).toBeTruthy();
        const createJson = await createRes.json();
        expect(createJson.ok).toBe(true);
        expect(createJson.drafts.length).toBeGreaterThan(0);
        const firstDraftId = createJson.drafts[0].id;

        // 3) List actions
        const listRes = await request.get(`/api/actions/list?packId=${packId}`);
        const listJson = await listRes.json();
        expect(listJson.ok).toBe(true);
        expect(listJson.actions.length).toBe(createJson.drafts.length);

        // 4) Approve first draft
        const approveRes = await request.post("/api/actions/approve", {
            data: { id: firstDraftId },
        });
        expect(approveRes.ok()).toBeTruthy();
        const approveJson = await approveRes.json();
        expect(approveJson.action.status).toBe("approved");

        // 5) Execute approved action
        const execRes = await request.post("/api/actions/execute", {
            data: { id: firstDraftId },
        });
        expect(execRes.ok()).toBeTruthy();
        const execJson = await execRes.json();
        expect(execJson.action.status).toBe("executed");
        expect(execJson.action.result).toBeDefined();
    });

    test("API: reject draft", async ({ request }) => {
        // Create a pack + draft
        const genRes = await request.post("/api/sprint/generate", {
            data: { packType: "report", input: { industry: "Tech", offer: "SaaS", targetCustomer: "SME", primaryChannel: "google", budgetRange: "high", tone: "expert", goal7d: "Launch" } },
        });
        const genJson = await genRes.json();
        const packId = `test_reject_${Date.now()}`;
        const createRes = await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "report", input: {}, data: genJson.data },
        });
        const createJson = await createRes.json();
        const draftId = createJson.drafts[0].id;

        const rejectRes = await request.post("/api/actions/reject", {
            data: { id: draftId, reason: "Not needed" },
        });
        expect(rejectRes.ok()).toBeTruthy();
        const rejectJson = await rejectRes.json();
        expect(rejectJson.action.status).toBe("rejected");
    });

    test("API: cannot execute un-approved action", async ({ request }) => {
        const genRes = await request.post("/api/sprint/generate", {
            data: { packType: "content", input: { industry: "Food", offer: "Delivery", targetCustomer: "Families", primaryChannel: "tiktok", budgetRange: "low", tone: "friendly", goal7d: "500 followers" } },
        });
        const genJson = await genRes.json();
        const packId = `test_guard_${Date.now()}`;
        const createRes = await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "content", input: {}, data: genJson.data },
        });
        const createJson = await createRes.json();

        const execRes = await request.post("/api/actions/execute", {
            data: { id: createJson.drafts[0].id },
        });
        expect(execRes.status()).toBe(400);
    });

    test("Approval Console UI renders", async ({ page }) => {
        // Navigate with retry — dev server may need time to pick up new route
        await page.goto("/virtual/approvals", { waitUntil: "load", timeout: 15_000 });
        await page.waitForTimeout(3_000);

        // If we got a 404, the dev server hasn't picked up the route yet — reload
        const pageContent = await page.textContent("body");
        if (pageContent?.includes("404")) {
            await page.reload({ waitUntil: "load", timeout: 15_000 });
            await page.waitForTimeout(3_000);
        }

        // Page should show either the filters or the no-actions message
        const filtersOrEmpty = page.locator("[data-testid='approval-filters'], [data-testid='no-actions']").first();
        await expect(filtersOrEmpty).toBeVisible({ timeout: 10_000 });

        await page.screenshot({
            path: "docs/evidence/approval-gate-s3/approvals_page.png",
            fullPage: true,
        });
    });
});
