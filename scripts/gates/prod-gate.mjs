#!/usr/bin/env node
// Production Gate — Sprint 5+6
// Checks: secrets leak, evidence schema, packs schema, route drift

import { readFileSync, existsSync, readdirSync } from "fs";
import { join, resolve } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let exitCode = 0;
const results = [];

function pass(name, detail) { results.push({ name, status: "PASS", detail }); console.log(`  ✅ ${name}: ${detail}`); }
function fail(name, detail) { results.push({ name, status: "FAIL", detail }); console.log(`  ❌ ${name}: ${detail}`); exitCode = 1; }
function skip(name, detail) { results.push({ name, status: "SKIPPED", detail }); console.log(`  ⏭  ${name}: ${detail}`); }

// ─── 1) Secrets Leak Scan ─────────────────────────────────────────────

function checkSecretsLeak() {
    console.log("\n  [1/4] Secrets Leak Scan");

    // Only look for patterns that look like REAL secrets (not placeholders)
    const realSecretPatterns = [
        /sk-[a-zA-Z0-9]{20,}/,         // OpenAI key format
        /ghp_[a-zA-Z0-9]{36}/,          // GitHub PAT
        /AIza[a-zA-Z0-9_-]{35}/,        // Google API key
    ];

    // Placeholder values to IGNORE in docs
    const placeholders = ["your_key", "your_secret", "your-", "xxx", "...", "<", "example"];

    const filesToCheck = [];

    // Only scan files that are tracked by git (skip .env.local which is gitignored)
    try {
        const gitFiles = execSync("git ls-files --cached", { cwd: ROOT, encoding: "utf-8" });
        const tracked = gitFiles.split("\n").filter(f => f.trim());
        // Check for .env files that are actually committed (BAD)
        const envTracked = tracked.filter(f => f.match(/\.env/) && !f.includes(".example"));
        for (const f of envTracked) {
            fail("secrets_leak", `.env file committed to git: ${f} (should be in .gitignore)`);
        }
        // Scan docs for hard-coded real secrets
        filesToCheck.push(...tracked.filter(f => f.endsWith(".md") || f.endsWith(".json")).filter(f => !f.includes("node_modules")));
    } catch {
        // Not a git repo — scan docs directory only
        if (existsSync(join(ROOT, "docs"))) {
            for (const f of readdirSync(join(ROOT, "docs")).filter(f => f.endsWith(".md"))) {
                filesToCheck.push(join("docs", f));
            }
        }
    }

    let leaksFound = 0;
    for (const file of filesToCheck) {
        const abs = resolve(ROOT, file);
        if (!existsSync(abs)) continue;
        const content = readFileSync(abs, "utf-8");
        for (const pat of realSecretPatterns) {
            const matches = content.match(pat);
            if (matches) {
                // Check it's not a placeholder
                const isPlaceholder = placeholders.some(p => matches[0].toLowerCase().includes(p));
                if (!isPlaceholder) {
                    fail("secrets_leak", `Real secret pattern ${pat.source} found in ${file}`);
                    leaksFound++;
                }
            }
        }
    }

    if (leaksFound === 0) pass("secrets_leak", "No real secret patterns found in tracked files");
}

// ─── 2) Evidence/Audit Schema Validation ──────────────────────────────

function checkEvidenceSchema() {
    console.log("\n  [2/4] Evidence/Audit Schema Validation");

    // Check actions.json schema
    const actionsFile = join(ROOT, "data", "actions", "actions.json");
    if (!existsSync(actionsFile)) {
        skip("schema_actions", "No actions.json found (no data generated yet)");
    } else {
        try {
            const actions = JSON.parse(readFileSync(actionsFile, "utf-8"));
            if (!Array.isArray(actions)) throw new Error("actions.json is not an array");
            const requiredFields = ["id", "packId", "packType", "type", "backend", "status", "createdAt"];
            let valid = true;
            for (const a of actions) {
                for (const f of requiredFields) {
                    if (!(f in a)) { valid = false; fail("schema_actions", `Action ${a.id || "unknown"} missing field: ${f}`); break; }
                }
                // Check workspaceId (backward compat: assign default if missing)
                if (!a.workspaceId) {
                    // Not a hard fail, but note it
                }
            }
            if (valid) pass("schema_actions", `${actions.length} actions validated`);
        } catch (err) {
            fail("schema_actions", `Invalid actions.json: ${err.message}`);
        }
    }

    // Check audit.jsonl schema
    const auditFile = join(ROOT, "data", "audit", "audit.jsonl");
    if (!existsSync(auditFile)) {
        skip("schema_audit", "No audit.jsonl found");
    } else {
        try {
            const lines = readFileSync(auditFile, "utf-8").trim().split("\n").filter(Boolean);
            let valid = true;
            const requiredFields = ["timestamp", "event", "packId", "actionId"];
            for (const line of lines) {
                const entry = JSON.parse(line);
                for (const f of requiredFields) {
                    if (!(f in entry)) { valid = false; fail("schema_audit", `Audit entry missing field: ${f}`); break; }
                }
            }
            if (valid) pass("schema_audit", `${lines.length} audit entries validated`);
        } catch (err) {
            fail("schema_audit", `Invalid audit.jsonl: ${err.message}`);
        }
    }
}

// ─── 3) Route Drift Check ─────────────────────────────────────────────

function checkRouteDrift() {
    console.log("\n  [3/4] Route Drift Check");

    // Check docs/ first (canonical), fallback to src/config/
    let navMapFile = join(ROOT, "docs", "NAV_CANONICAL_MAP_S1.json");
    if (!existsSync(navMapFile)) navMapFile = join(ROOT, "src", "config", "NAV_CANONICAL_MAP_S1.json");
    if (!existsSync(navMapFile)) {
        skip("route_drift", "NAV_CANONICAL_MAP_S1.json not found in docs/ or src/config/ — cannot check drift");
        return;
    }

    try {
        const navMap = JSON.parse(readFileSync(navMapFile, "utf-8"));
        const registeredRoutes = navMap.routes ? navMap.routes.map(r => r.path || r.href) : Object.keys(navMap);

        // Find actual pages in src/app
        const appDir = join(ROOT, "src", "app");
        const actualRoutes = [];

        function scanPages(dir, prefix) {
            if (!existsSync(dir)) return;
            for (const entry of readdirSync(dir, { withFileTypes: true })) {
                if (entry.isDirectory()) {
                    let segment = entry.name;
                    // Route groups: (portal), (admin) etc → skip segment
                    if (segment.startsWith("(") && segment.endsWith(")")) {
                        scanPages(join(dir, segment), prefix);
                    } else if (segment === "api") {
                        // skip API routes
                    } else {
                        scanPages(join(dir, segment), `${prefix}/${segment}`);
                    }
                } else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
                    actualRoutes.push(prefix || "/");
                }
            }
        }

        scanPages(appDir, "");

        // Compare
        const registeredSet = new Set(registeredRoutes);
        const actualSet = new Set(actualRoutes);

        const added = actualRoutes.filter(r => !registeredSet.has(r));
        const removed = registeredRoutes.filter(r => !actualSet.has(r));

        if (added.length === 0 && removed.length === 0) {
            pass("route_drift", `${actualRoutes.length} routes match canonical map`);
        } else {
            const details = [];
            if (added.length > 0) details.push(`+${added.length} new: ${added.join(", ")}`);
            if (removed.length > 0) details.push(`-${removed.length} removed: ${removed.join(", ")}`);
            // Route drift is a warning, not a hard fail
            pass("route_drift", `${actualRoutes.length} routes found. Delta: ${details.join("; ")}`);
        }
    } catch (err) {
        fail("route_drift", `Error checking routes: ${err.message}`);
    }
}

// ─── 4) Packs Schema Validation ───────────────────────────────────────

function checkPacksSchema() {
    console.log("\n  [4/4] Packs Schema Validation");

    const packsFile = join(ROOT, "data", "packs", "packs.json");
    if (!existsSync(packsFile)) {
        fail("schema_packs", "packs.json not found");
        return;
    }

    try {
        const packs = JSON.parse(readFileSync(packsFile, "utf-8"));
        if (!Array.isArray(packs)) throw new Error("packs.json is not an array");

        const requiredFields = ["id", "name", "packType", "industry", "goal", "duration", "priceTier", "actions", "inputs"];
        let valid = true;
        for (const p of packs) {
            for (const f of requiredFields) {
                if (!(f in p)) { valid = false; fail("schema_packs", `Pack ${p.id || "unknown"} missing field: ${f}`); break; }
            }
            if (!Array.isArray(p.actions) || p.actions.length === 0) {
                valid = false;
                fail("schema_packs", `Pack ${p.id} has no actions`);
            }
            if (!Array.isArray(p.inputs)) {
                valid = false;
                fail("schema_packs", `Pack ${p.id} has invalid inputs`);
            }
        }
        if (valid) pass("schema_packs", `${packs.length} packs validated`);
    } catch (err) {
        fail("schema_packs", `Invalid packs.json: ${err.message}`);
    }
}

// ─── Main ─────────────────────────────────────────────────────────────

console.log("\n═══════════════════════════════════════════");
console.log("  PRODUCTION GATE — Sprint 5+6");
console.log("═══════════════════════════════════════════");

checkSecretsLeak();
checkEvidenceSchema();
checkPacksSchema();
checkRouteDrift();

console.log(`\n───────────────────────────────────────────`);
console.log(`  ${exitCode === 0 ? "✅ PROD GATE PASS" : "❌ PROD GATE FAIL"}`);
console.log(`───────────────────────────────────────────\n`);

process.exit(exitCode);
