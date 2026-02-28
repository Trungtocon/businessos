import { test, expect } from "@playwright/test";

test.describe("Sprint 6 — Packs Gate", () => {
    test.describe.configure({ timeout: 30_000 });

    // ─── API Tests ──────────────────────────────────────────────────

    test("GET /api/packs/list returns 3 packs", async ({ request }) => {
        const res = await request.get("/api/packs/list");
        expect(res.ok()).toBeTruthy();
        const json = await res.json();
        expect(json.ok).toBe(true);
        expect(json.packs.length).toBe(3);
        expect(json.packs[0]).toHaveProperty("id");
        expect(json.packs[0]).toHaveProperty("packType");
        expect(json.packs[0]).toHaveProperty("actions");
        expect(json.packs[0]).toHaveProperty("inputs");
    });

    test("POST /api/packs/generate creates drafts (lead)", async ({ request }) => {
        const res = await request.post("/api/packs/generate", {
            data: { workspaceId: "default", packId: "pack_lead_sme_v1" },
        });
        expect(res.ok()).toBeTruthy();
        const json = await res.json();
        expect(json.ok).toBe(true);
        expect(json.draftsCount).toBe(3);
        expect(json.approvalUrl).toBe("/virtual/approvals");
        expect(json.packName).toContain("Lead");
    });

    test("POST /api/packs/generate rejects unknown packId", async ({ request }) => {
        const res = await request.post("/api/packs/generate", {
            data: { workspaceId: "default", packId: "nonexistent_pack" },
        });
        expect(res.status()).toBe(404);
    });

    test("POST /api/packs/generate content pack → 2 drafts", async ({ request }) => {
        const res = await request.post("/api/packs/generate", {
            data: { workspaceId: "default", packId: "pack_content_14d_v1" },
        });
        expect(res.ok()).toBeTruthy();
        const json = await res.json();
        expect(json.ok).toBe(true);
        expect(json.draftsCount).toBe(2);
    });

    test("POST /api/packs/generate report pack → 1 draft", async ({ request }) => {
        const res = await request.post("/api/packs/generate", {
            data: { workspaceId: "default", packId: "pack_report_weekly_v1" },
        });
        expect(res.ok()).toBeTruthy();
        const json = await res.json();
        expect(json.ok).toBe(true);
        expect(json.draftsCount).toBe(1);
    });

    // ─── UI Tests (hydration-hardened) ──────────────────────────────

    test("Packs page renders with cards", async ({ page }) => {
        test.setTimeout(60_000);

        await page.goto("/virtual/packs", { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => { });

        // Hydration guard: if pack-card not found after hydration, reload once
        let found = await page.locator("[data-testid='pack-card']").first().isVisible().catch(() => false);
        if (!found) {
            // Wait a moment for late hydration
            await page.waitForSelector("[data-testid='pack-card']", { timeout: 5000 }).catch(() => { });
            found = await page.locator("[data-testid='pack-card']").first().isVisible().catch(() => false);
        }
        if (!found) {
            // One reload to recover from hydration miss
            await page.reload({ waitUntil: "domcontentloaded", timeout: 15000 });
            await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => { });
            await page.waitForSelector("[data-testid='pack-card']", { timeout: 10000 });
        }

        const cards = await page.locator("[data-testid='pack-card']").count();
        expect(cards).toBeGreaterThanOrEqual(3);

        // Verify filter controls exist
        await expect(page.locator("[data-testid='pack-filters']")).toBeVisible();

        // Verify "Dùng gói này" button exists on each card
        const useBtn = page.locator("[data-testid='btn-use-pack']").first();
        await expect(useBtn).toBeVisible();
    });

    test("Onboarding wizard renders", async ({ page }) => {
        test.setTimeout(30_000);

        await page.goto("/virtual/onboarding", { waitUntil: "domcontentloaded", timeout: 15000 });
        await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => { });

        await page.waitForSelector("[data-testid='step-workspace']", { timeout: 10000 });
        const nextBtn = page.locator("[data-testid='btn-next']");
        await expect(nextBtn).toBeVisible();
    });
});
