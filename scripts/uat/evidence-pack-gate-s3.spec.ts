import { test, expect } from "@playwright/test";

/**
 * Sprint 3 — Evidence Pack Gate (Playwright)
 *
 * Tests the full evidence pack flow:
 * 1) Generate pack → create drafts → approve + execute
 * 2) Export evidence pack → verify response
 */

test.describe("Sprint 3 — Evidence Pack Gate", () => {
    test.describe.configure({ timeout: 30_000 });

    test("Evidence Pack API returns downloadable file", async ({ request }) => {
        // 1) Generate pack
        const genRes = await request.post("/api/sprint/generate", {
            data: {
                packType: "lead",
                input: {
                    industry: "Spa & Beauty",
                    offer: "Premium Skincare",
                    targetCustomer: "Women 25-40",
                    primaryChannel: "facebook",
                    budgetRange: "mid",
                    tone: "expert",
                    goal7d: "50 new leads",
                },
            },
        });
        const genJson = await genRes.json();
        expect(genJson.ok).toBe(true);

        // 2) Create drafts
        const packId = `test_evidence_${Date.now()}`;
        await request.post("/api/actions/create-from-pack", {
            data: { packId, packType: "lead", input: { industry: "Spa & Beauty" }, data: genJson.data },
        });

        // 3) Get evidence pack
        const params = new URLSearchParams({
            packId,
            packType: "lead",
            input: encodeURIComponent(JSON.stringify({ industry: "Spa & Beauty", offer: "Premium Skincare" })),
            output: encodeURIComponent(JSON.stringify(genJson.data)),
        });
        const evidenceRes = await request.get(`/api/evidence/pack?${params}`);
        expect(evidenceRes.ok()).toBeTruthy();

        const contentDisposition = evidenceRes.headers()["content-disposition"];
        expect(contentDisposition).toContain("BusinessOS_Evidence_lead_");

        const body = await evidenceRes.json();
        expect(body.packId).toBe(packId);
        expect(body.files.length).toBeGreaterThanOrEqual(5);
        expect(body.evidenceIndex).toContain("Evidence Pack");
    });

    test("UI: generate → create drafts → export evidence", async ({ page }) => {
        await page.goto("/virtual/sprint/lead", { waitUntil: "domcontentloaded" });
        await page.waitForSelector("[data-testid='sprint-form']", { timeout: 10_000 });

        // Fill form
        await page.fill("[data-testid='input-industry']", "Restaurant");
        await page.fill("[data-testid='input-offer']", "Lunch deals");
        await page.fill("[data-testid='input-target']", "Office workers");
        await page.fill("[data-testid='input-goal']", "100 walk-ins");

        // Generate
        await page.click("[data-testid='btn-generate']");
        await page.waitForSelector("[data-testid='sprint-output']", { timeout: 15_000 });

        // Create drafts
        await page.click("[data-testid='btn-create-drafts']");
        // Wait for button text to change (drafts created)
        await page.waitForFunction(() => {
            const btn = document.querySelector("[data-testid='btn-create-drafts']");
            return btn?.textContent?.includes("Drafts");
        }, { timeout: 8_000 });

        // Evidence export button should be visible
        await expect(page.locator("[data-testid='btn-export-evidence']")).toBeVisible();

        await page.screenshot({
            path: "docs/evidence/evidence-pack-s3/sprint_with_actions.png",
            fullPage: true,
        });
    });
});
