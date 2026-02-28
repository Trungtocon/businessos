import { defineConfig } from "@playwright/test";

export default defineConfig({
    testMatch: ["**/scripts/uat/**/*.spec.ts"],
    timeout: 15_000,
    retries: 1,
    workers: 1,
    use: {
        baseURL: "http://localhost:3000",
        headless: true,
        screenshot: "only-on-failure",
        viewport: { width: 1440, height: 900 },
    },
    outputDir: "docs/evidence/playwright",
    webServer: {
        command: "npm run dev",
        port: 3000,
        timeout: 60_000,
        reuseExistingServer: true,
    },
});
