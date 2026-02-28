import { test, expect } from '@playwright/test';

// V4.5 Product Readiness Smoke Test
// NOTE: Since the UI for Sprint Packs does not yet exist, this spec tests the intended happy path and is expected to FAIL.

test.describe('Lean V1 Product Gate (TTV Flow)', () => {
    test.beforeEach(async ({ page }) => {
        // Assume auth is bypassed or handled via mock state
        await page.goto('http://localhost:3000/virtual');
    });

    test('Gate 1: Can navigate to Lead/CRM Sprint Pack', async ({ page }) => {
        // Expected: A quick action or card linking to the Sprint Packs
        const packButton = page.getByRole('button', { name: /Lead Sprint Pack/i });
        await expect(packButton).toBeVisible({ timeout: 2000 });
        await packButton.click();

        await expect(page).toHaveURL(/.*\/virtual\/sprint\/lead/);
    });

    test('Gate 2: Fill minimal inputs and generate', async ({ page }) => {
        await page.goto('http://localhost:3000/virtual/sprint/lead');

        // Fill the 5 minimal inputs
        await page.fill('input[name="industry"]', 'Real Estate Software');
        await page.fill('input[name="offer"]', 'CRM for small agencies');
        await page.fill('input[name="target"]', 'Agency Founders');
        await page.selectOption('select[name="channel"]', 'zalo');
        await page.selectOption('select[name="tone"]', 'professional');

        const generateBtn = page.getByRole('button', { name: /Generate Pack/i });
        await expect(generateBtn).toBeEnabled();
        await generateBtn.click();

        // Wait for AI generation
        await expect(page.locator('.sprint-pack-result')).toBeVisible({ timeout: 15000 });

        // Check for specific deliverables being rendered (not raw JSON)
        await expect(page.getByText('ICP & Persona')).toBeVisible();
        await expect(page.getByText('Funnel Strategy')).toBeVisible();
    });

    test('Gate 3: Export functionality exists', async ({ page }) => {
        await page.goto('http://localhost:3000/virtual/sprint/lead');
        // Assume pack is generated via mock URL query or state

        const exportBtn = page.getByRole('button', { name: /Download Markdown/i });
        await expect(exportBtn).toBeVisible();
    });

    test('Gate 4: Backend Ping Safety', async ({ request }) => {
        // The API must not 500 even if ERPNext is off. It should return ok: false or ok: true.
        const res = await request.get('/api/integrations/erpnext/ping');
        expect(res.status()).toBe(200);
        const json = await res.json();
        expect(typeof json.ok).toBe('boolean');
    });
});
