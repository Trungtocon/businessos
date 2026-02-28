#!/usr/bin/env node
// Prewarm script — Sprint 6.1
// Fetches key pages to ensure server is fully ready before Playwright tests run.

const BASE = process.env.BASE_URL || "http://localhost:3005";
const URLS = [
    "/virtual",
    "/virtual/packs",
    "/virtual/onboarding",
    "/api/packs/list?workspaceId=default",
    "/api/workspaces/list",
];

const MAX_RETRIES = 3;
const DELAY_MS = 500;

async function fetchWithRetry(url, retries) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
            if (res.status >= 500) throw new Error(`HTTP ${res.status}`);
            return res.status;
        } catch (err) {
            if (i < retries - 1) {
                await new Promise(r => setTimeout(r, DELAY_MS * (i + 1)));
            } else {
                return `ERR: ${err.message}`;
            }
        }
    }
}

async function main() {
    console.log(`\n  🔥 Prewarm — ${BASE}`);
    console.log(`  ─────────────────────────────────`);

    for (const path of URLS) {
        const url = `${BASE}${path}`;
        const status = await fetchWithRetry(url, MAX_RETRIES);
        const icon = typeof status === "number" && status < 400 ? "✅" : "⚠ ";
        console.log(`  ${icon} ${path} → ${status}`);
        await new Promise(r => setTimeout(r, DELAY_MS));
    }

    console.log(`  ─────────────────────────────────\n`);
}

main();
