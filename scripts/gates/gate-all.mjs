#!/usr/bin/env node
// Gate All-in-One Orchestrator
// Usage: node scripts/gates/gate-all.mjs [--fast]

import { spawn } from "child_process";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const FAST = process.argv.includes("--fast");
const ROOT = process.cwd();
const DOCS_DIR = join(ROOT, "docs");

// ─── Step Definitions ─────────────────────────────────────────────────

const STEPS_FULL = [
    { name: "prod-gate", cmd: "node scripts/gates/prod-gate.mjs", required: true },
    { name: "build", cmd: "npm run build", required: true },
    { name: "nav:validate", cmd: "npm run nav:validate", required: true },
    { name: "uat:nav", cmd: "npm run uat:nav", required: true },
    { name: "uat:product", cmd: "npm run uat:product", required: true },
    { name: "uat:approval", cmd: "npm run uat:approval", required: true },
    { name: "uat:evidence", cmd: "npm run uat:evidence", required: true },
    {
        name: "uat:erpnext",
        cmd: "npm run uat:erpnext",
        required: false,
        skipUnless: () => !!(process.env.ERPNEXT_BASE_URL && process.env.ERPNEXT_API_KEY && process.env.ERPNEXT_API_SECRET),
        skipReason: "ERPNEXT env vars not set (ERPNEXT_BASE_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET)",
    },
];

const STEPS_FAST = [
    { name: "prod-gate", cmd: "node scripts/gates/prod-gate.mjs", required: true },
    { name: "build", cmd: "npm run build", required: true },
    { name: "nav:validate", cmd: "npm run nav:validate", required: true },
];

// ─── Runner ───────────────────────────────────────────────────────────

function runStep(cmd) {
    return new Promise((resolve) => {
        const start = Date.now();
        const lines = [];

        const proc = spawn(cmd, {
            shell: true,
            cwd: ROOT,
            stdio: ["ignore", "pipe", "pipe"],
            env: { ...process.env, FORCE_COLOR: "0" },
        });

        const collect = (data) => {
            const text = data.toString();
            for (const line of text.split("\n")) {
                if (line.trim()) lines.push(line.trim());
            }
        };

        proc.stdout.on("data", collect);
        proc.stderr.on("data", collect);

        proc.on("close", (code) => {
            resolve({
                exitCode: code ?? 1,
                ms: Date.now() - start,
                logTail: lines.slice(-30),
            });
        });

        proc.on("error", (err) => {
            resolve({
                exitCode: 1,
                ms: Date.now() - start,
                logTail: [...lines.slice(-25), `[spawn error] ${err.message}`],
            });
        });
    });
}

// ─── Main ─────────────────────────────────────────────────────────────

async function main() {
    const steps = FAST ? STEPS_FAST : STEPS_FULL;
    const mode = FAST ? "FAST" : "FULL";

    console.log(`\n${"═".repeat(60)}`);
    console.log(`  GATE ALL-IN-ONE (${mode})`);
    console.log(`  ${new Date().toISOString()}`);
    console.log(`${"═".repeat(60)}\n`);

    const results = [];
    let anyFail = false;

    for (const step of steps) {
        // Check skip condition
        if (step.skipUnless && !step.skipUnless()) {
            const entry = {
                name: step.name,
                cmd: step.cmd,
                status: "SKIPPED",
                ms: 0,
                exitCode: null,
                logTail: [step.skipReason || "Skipped"],
                required: step.required,
            };
            results.push(entry);
            console.log(`  ⏭  ${step.name.padEnd(18)} SKIPPED  (${step.skipReason})`);
            continue;
        }

        process.stdout.write(`  ⏳ ${step.name.padEnd(18)} running...`);
        const result = await runStep(step.cmd);

        const passed = result.exitCode === 0;
        const status = passed ? "PASS" : "FAIL";
        const icon = passed ? "✅" : "❌";
        const dur = (result.ms / 1000).toFixed(1);

        console.log(`\r  ${icon} ${step.name.padEnd(18)} ${status.padEnd(8)} ${dur}s`);

        results.push({
            name: step.name,
            cmd: step.cmd,
            status,
            ms: result.ms,
            exitCode: result.exitCode,
            logTail: result.logTail,
            required: step.required,
        });

        if (!passed && step.required) {
            anyFail = true;
            // Check if it's a Playwright issue
            const logText = result.logTail.join(" ");
            if (logText.includes("playwright") && logText.includes("Cannot find")) {
                console.log(`\n  💡 TIP: Run "npm run uat:install" or "npx playwright install" first.\n`);
            }
        }
    }

    // ─── Summary ──────────────────────────────────────────────────────

    const summary = {
        pass: results.filter(r => r.status === "PASS").length,
        fail: results.filter(r => r.status === "FAIL").length,
        skipped: results.filter(r => r.status === "SKIPPED").length,
        total: results.length,
    };

    const report = {
        timestamp: new Date().toISOString(),
        mode,
        baseUrl: "http://localhost:3000",
        steps: results,
        summary,
        verdict: anyFail ? "FAIL" : "PASS",
    };

    // Write reports
    if (!existsSync(DOCS_DIR)) mkdirSync(DOCS_DIR, { recursive: true });

    writeFileSync(join(DOCS_DIR, "GATE_ALL_REPORT.json"), JSON.stringify(report, null, 2), "utf-8");
    writeFileSync(join(DOCS_DIR, "GATE_ALL_REPORT.md"), generateMarkdownReport(report), "utf-8");

    // Print summary
    console.log(`\n${"─".repeat(60)}`);
    console.log(`  VERDICT: ${report.verdict === "PASS" ? "✅ PASS" : "❌ FAIL"}`);
    console.log(`  Pass: ${summary.pass}  Fail: ${summary.fail}  Skipped: ${summary.skipped}  Total: ${summary.total}`);
    console.log(`  Reports: docs/GATE_ALL_REPORT.md, docs/GATE_ALL_REPORT.json`);
    console.log(`${"─".repeat(60)}\n`);

    process.exit(anyFail ? 1 : 0);
}

// ─── Markdown Report Generator ────────────────────────────────────────

function generateMarkdownReport(report) {
    const rows = report.steps.map(s => {
        const icon = s.status === "PASS" ? "✅" : s.status === "FAIL" ? "❌" : "⏭";
        const dur = s.ms > 0 ? `${(s.ms / 1000).toFixed(1)}s` : "—";
        const notes = s.status === "SKIPPED" ? s.logTail[0] : "";
        return `| ${icon} ${s.name} | ${s.status} | ${dur} | ${notes} |`;
    }).join("\n");

    const failSections = report.steps
        .filter(s => s.status === "FAIL")
        .map(s => {
            const tail = s.logTail.slice(-30).join("\n");
            return `<details>\n<summary>❌ ${s.name} — last 30 lines</summary>\n\n\`\`\`\n${tail}\n\`\`\`\n</details>`;
        })
        .join("\n\n");

    return `# Gate All-in-One Report

**Timestamp:** ${report.timestamp}
**Mode:** ${report.mode}
**Verdict:** ${report.verdict === "PASS" ? "✅ PASS" : "❌ FAIL"}

## Results

| Step | Status | Duration | Notes |
|------|--------|----------|-------|
${rows}

## Summary

- **Pass:** ${report.summary.pass}
- **Fail:** ${report.summary.fail}
- **Skipped:** ${report.summary.skipped}
- **Total:** ${report.summary.total}

${failSections ? `## Failure Details\n\n${failSections}` : ""}
---
*Generated by gate-all.mjs*
`;
}

main();
