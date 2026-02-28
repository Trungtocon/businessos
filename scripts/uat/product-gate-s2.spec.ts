import { test, expect } from "@playwright/test";

/**
 * Sprint 2 — Product Gate (Playwright)
 *
 * Tests all 3 Sprint Packs:
 * 1) Navigate from /virtual to pack route
 * 2) Fill minimal inputs (3 required fields)
 * 3) Click Generate
 * 4) Assert key output sections render
 * 5) Assert export buttons are present
 */

const PACKS = [
    {
        name: "Lead/CRM",
        route: "/virtual/sprint/lead",
        sections: ["section-icp", "section-persona", "section-offers", "section-funnel", "section-pipeline", "section-actions"],
    },
    {
        name: "Content Engine",
        route: "/virtual/sprint/content",
        sections: ["section-calendar", "section-hooks", "section-ctas", "section-posts", "section-videos", "section-visual", "section-actions"],
    },
    {
        name: "Weekly Report",
        route: "/virtual/sprint/report",
        sections: ["section-kpi", "section-insights", "section-decisions", "section-tasks", "section-risks", "section-actions"],
    },
];

test.describe("Sprint 2 — Product Gate", () => {
    test.describe.configure({ timeout: 30_000 });

    for (const pack of PACKS) {
        test(`${pack.name}: form → generate → output → export`, async ({ page }) => {
            // 1) Navigate to pack page
            await page.goto(pack.route, { waitUntil: "domcontentloaded" });
            await page.waitForSelector("[data-testid='sprint-form']", { timeout: 10_000 });

            // 2) Fill minimal inputs
            await page.fill("[data-testid='input-industry']", "Spa & Beauty");
            await page.fill("[data-testid='input-offer']", "Gói chăm sóc da cao cấp");
            await page.fill("[data-testid='input-target']", "Phụ nữ 25-40 tuổi");
            await page.fill("[data-testid='input-goal']", "50 leads mới qua Facebook");

            // 3) Click Generate
            await page.click("[data-testid='btn-generate']");

            // 4) Wait for output to render
            await page.waitForSelector("[data-testid='sprint-output']", { timeout: 15_000 });

            // 5) Assert key sections exist
            for (const section of pack.sections) {
                const el = page.locator(`[data-testid='${section}']`);
                await expect(el).toBeVisible({ timeout: 5_000 });
            }

            // 6) Assert export bar and buttons
            await expect(page.locator("[data-testid='export-bar']")).toBeVisible();
            await expect(page.locator("[data-testid='btn-export-json']")).toBeVisible();
            await expect(page.locator("[data-testid='btn-export-md']")).toBeVisible();

            // 7) Screenshot as evidence
            await page.screenshot({
                path: `docs/evidence/product-gate-s2/${pack.name.replace(/[^a-zA-Z0-9]/g, "_")}_output.png`,
                fullPage: true,
            });
        });
    }

    test("API: POST /api/sprint/generate returns valid response", async ({ request }) => {
        const res = await request.post("/api/sprint/generate", {
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
        expect(res.ok()).toBeTruthy();
        const json = await res.json();
        expect(json.ok).toBe(true);
        expect(json.packType).toBe("lead");
        expect(json.qa.score).toBe(100);
        expect(json.data.icp).toBeDefined();
        expect(json.data.persona).toBeDefined();
        expect(json.data.offerAngles).toBeDefined();
        expect(json.data.nextActions).toBeDefined();
    });

    test("API: rejects invalid packType", async ({ request }) => {
        const res = await request.post("/api/sprint/generate", {
            data: { packType: "invalid", input: { industry: "X", offer: "Y", targetCustomer: "Z", goal7d: "A" } },
        });
        expect(res.status()).toBe(400);
    });

    test("API: rejects missing required fields", async ({ request }) => {
        const res = await request.post("/api/sprint/generate", {
            data: { packType: "lead", input: { industry: "", offer: "", targetCustomer: "", goal7d: "" } },
        });
        expect(res.status()).toBe(400);
    });
});
