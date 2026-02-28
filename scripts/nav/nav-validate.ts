/**
 * Nav Validation Script
 * Validates that every active nav item in nav.registry.ts resolves to an actual page.
 *
 * Usage: npx tsx scripts/nav/nav-validate.ts
 */

import * as fs from "fs";
import * as path from "path";

// ── Import registry (we can't use path aliases in scripts, so resolve manually) ──
const registryPath = path.resolve(__dirname, "../../src/config/nav.registry.ts");

// We load the registry by requiring it via tsx
// eslint-disable-next-line @typescript-eslint/no-require-imports
const registry = require(registryPath);

const APP_DIR = path.resolve(__dirname, "../../src/app");

interface ValidationResult {
    id: string;
    screenId: string;
    route: string;
    label: string;
    status: "OK" | "MISSING" | "DYNAMIC";
    filePath?: string;
}

/**
 * Convert a route like "/classic/finance" to potential page file paths
 */
function routeToPagePaths(route: string): string[] {
    const segments = route.split("/").filter(Boolean);
    const routeGroups = ["(admin)", "(portal)", "(auth)"];
    const pageName = "page.tsx";

    const paths: string[] = [];

    // Direct match: src/app/[segments]/page.tsx
    paths.push(path.join(APP_DIR, ...segments, pageName));

    // With route groups
    for (const group of routeGroups) {
        paths.push(path.join(APP_DIR, group, ...segments, pageName));
    }

    return paths;
}

function isDynamicRoute(route: string): boolean {
    return route.includes("[");
}

function validateRoute(item: { id: string; screenId: string; route: string; label: string; status: string }): ValidationResult {
    if (item.status !== "active") {
        return { id: item.id, screenId: item.screenId, route: item.route, label: item.label, status: "OK", filePath: "(inactive)" };
    }

    if (isDynamicRoute(item.route)) {
        return { id: item.id, screenId: item.screenId, route: item.route, label: item.label, status: "DYNAMIC", filePath: "(dynamic pattern)" };
    }

    const candidatePaths = routeToPagePaths(item.route);
    for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
            return { id: item.id, screenId: item.screenId, route: item.route, label: item.label, status: "OK", filePath: path.relative(path.resolve(__dirname, "../.."), p) };
        }
    }

    return { id: item.id, screenId: item.screenId, route: item.route, label: item.label, status: "MISSING" };
}

// ── Run ──
const allItems = registry.ALL_NAV_ITEMS as Array<{ id: string; screenId: string; route: string; label: string; status: string }>;
const results: ValidationResult[] = allItems.map(validateRoute);

const okCount = results.filter(r => r.status === "OK").length;
const dynamicCount = results.filter(r => r.status === "DYNAMIC").length;
const missingCount = results.filter(r => r.status === "MISSING").length;

// ── Output Markdown ──
const docsDir = path.resolve(__dirname, "../../docs");
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

let md = `# Nav Validation Report V4.2\n\n`;
md += `**Date:** ${new Date().toISOString().split("T")[0]}\n`;
md += `**Total Items:** ${results.length}\n`;
md += `**OK:** ${okCount} | **Dynamic:** ${dynamicCount} | **Missing:** ${missingCount}\n\n`;
md += `| Status | ID | Screen | Route | File |\n`;
md += `|--------|----|--------|-------|------|\n`;
for (const r of results) {
    md += `| ${r.status === "OK" ? "✅" : r.status === "DYNAMIC" ? "🔹" : "❌"} | ${r.id} | ${r.screenId} | \`${r.route}\` | ${r.filePath || "—"} |\n`;
}

fs.writeFileSync(path.join(docsDir, "NAV_VALIDATION_REPORT_V4_2.md"), md);
fs.writeFileSync(
    path.join(docsDir, "NAV_VALIDATION_REPORT_V4_2.json"),
    JSON.stringify({ date: new Date().toISOString(), total: results.length, ok: okCount, dynamic: dynamicCount, missing: missingCount, results }, null, 2)
);

console.log(`\n=== Nav Validation Report ===`);
console.log(`OK: ${okCount} | Dynamic: ${dynamicCount} | Missing: ${missingCount}`);
if (missingCount > 0) {
    console.error(`\n❌ FAIL — ${missingCount} active routes have no page file:`);
    results.filter(r => r.status === "MISSING").forEach(r => console.error(`  ${r.id}: ${r.route}`));
    process.exit(1);
} else {
    console.log(`\n✅ PASS — All active routes have pages.`);
    process.exit(0);
}
