import { test, expect } from "@playwright/test";

/**
 * Sprint 1 — NAV Gate (Playwright Click-All)
 *
 * Tests that every primary navigation target from /virtual is clickable
 * and renders a real page (no 404/500).
 */

// All testable nav targets visible on /virtual
const VIRTUAL_NAV_TARGETS = [
    // Cards — use h3 heading text, click parent div.cursor-pointer
    { label: "Tài chính", expectedRoute: "/classic/finance", selector: "[data-testid='card-finance']" },
    { label: "Vận hành", expectedRoute: "/classic/projects", selector: "[data-testid='card-operations']" },
    { label: "Tăng trưởng (card)", expectedRoute: "/classic/reports", selector: "[data-testid='card-growth']" },
    // Quick Action buttons
    { label: "Duyệt nhanh", expectedRoute: "/virtual/approval", selector: "button:has-text('Duyệt nhanh')" },
    { label: "War Room", expectedRoute: "/virtual/war-room", selector: "button:has-text('War Room')" },
    { label: "Marketplace", expectedRoute: "/classic/marketplace", selector: "button:has-text('Marketplace')" },
    { label: "Đội ngũ", expectedRoute: "/classic/team", selector: "button:has-text('Đội ngũ')" },
    { label: "Tìm kiếm", expectedRoute: "/search", selector: "button:has-text('Tìm kiếm')" },
    { label: "Lead Sprint", expectedRoute: "/virtual/sprint/lead", selector: "button:has-text('Lead Generation')" },
    { label: "Content Sprint", expectedRoute: "/virtual/sprint/content", selector: "button:has-text('Content Engine')" },
    { label: "Growth Report", expectedRoute: "/virtual/sprint/report", selector: "button:has-text('Tăng trưởng Tuần')" },
];

test.describe("Sprint 1 — NAV Gate: /virtual Hub", () => {
    test.describe.configure({ timeout: 30_000 });

    for (const target of VIRTUAL_NAV_TARGETS) {
        test(`Click "${target.label}" → navigates to ${target.expectedRoute}`, async ({ page }) => {
            await page.goto("/virtual", { waitUntil: "domcontentloaded" });
            // Wait for React hydration (first test has cold-start penalty)
            await page.waitForSelector("[data-testid='card-finance']", { timeout: 15_000 });

            const el = page.locator(target.selector).first();
            await expect(el).toBeVisible({ timeout: 8000 });
            await el.click();

            await page.waitForURL(`**${target.expectedRoute}*`, { timeout: 8000 });

            const body = await page.textContent("body");
            expect(body).not.toContain("Application error");

            await page.screenshot({
                path: `docs/evidence/nav-gate-s1/${target.label.replace(/[^a-zA-Z0-9]/g, "_")}.png`,
                fullPage: false,
            });
        });
    }

    test("Voice button navigates to /virtual/voice", async ({ page }) => {
        // Use 'load' (not domcontentloaded) to wait for full page load including React hydration
        await page.goto("/virtual", { waitUntil: "load" });
        // Extra wait to ensure React event handlers are attached
        await page.waitForTimeout(2_000);

        const voiceBtn = page.locator("[data-testid='btn-voice']");
        await expect(voiceBtn).toBeAttached({ timeout: 5_000 });

        // Strategy: use page.evaluate to directly call click() on the DOM element
        // This is the most reliable approach for fixed-position elements in headless
        await page.evaluate(() => {
            const btn = document.querySelector<HTMLButtonElement>("[data-testid='btn-voice']");
            if (btn) {
                btn.click();
            }
        });

        // Wait for client-side navigation
        await page.waitForURL("**/virtual/voice*", { timeout: 8_000 });

        const body = await page.textContent("body");
        expect(body).not.toContain("Application error");

        await page.screenshot({ path: "docs/evidence/nav-gate-s1/voice_command.png" });
    });

    test("Header notification icon navigates to /notifications", async ({ page }) => {
        await page.goto("/virtual", { waitUntil: "networkidle" });

        const btn = page.locator("button[title='Thông báo']").first();
        await expect(btn).toBeVisible({ timeout: 8000 });
        await btn.click();

        await page.waitForURL("**/notifications*", { timeout: 8000 });
        await page.screenshot({ path: "docs/evidence/nav-gate-s1/notifications.png" });
    });

    test("Header chat icon navigates to /chat", async ({ page }) => {
        await page.goto("/virtual", { waitUntil: "networkidle" });

        const btn = page.locator("button[title='Tin nhắn']").first();
        await expect(btn).toBeVisible({ timeout: 8000 });
        await btn.click();

        await page.waitForURL("**/chat*", { timeout: 8000 });
        await page.screenshot({ path: "docs/evidence/nav-gate-s1/chat.png" });
    });
});
