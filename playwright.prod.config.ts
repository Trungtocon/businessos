import { defineConfig } from "@playwright/test";

/**
 * Production Playwright config — Sprint 6.1
 * Runs against a production build (next start on port 3005)
 * to eliminate dev-server cold-start flakiness.
 */
export default defineConfig({
    testMatch: ["**/scripts/uat/**/*.spec.ts"],
    timeout: 30_000,
    retries: 1,
    workers: 1,
    use: {
        baseURL: "http://localhost:3005",
        headless: true,
        screenshot: "only-on-failure",
        viewport: { width: 1440, height: 900 },
    },
    outputDir: "docs/evidence/playwright-prod",
    webServer: {
        command: "npx next start -p 3005",
        port: 3005,
        timeout: 30_000,
        reuseExistingServer: true,
    },
});
