/**
 * wiring-audit.js — Interaction Wiring Coverage Auditor
 *
 * Scans all page.tsx files for interactive elements and checks wiring status.
 * Detects: href="#", empty onClick, buttons without handlers, forms without onSubmit.
 * Outputs: docs/WIRING_REPORT.md + docs/INTERACTION_GAP_REPORT.json
 *
 * Usage: node scripts/wiring-audit.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, 'src', 'app');
const DOCS_DIR = path.join(ROOT, 'docs');
const MAP_FILE = path.join(DOCS_DIR, 'FOUND_MAP_FINAL.json');

// ── Detectors ───────────────────────────────────────────

function findInteractiveElements(content, filePath) {
    const issues = [];
    const lines = content.split('\n');

    let totalInteractive = 0;
    let wiredCount = 0;
    let deadCount = 0;
    const deadItems = [];

    lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        const trimmed = line.trim();

        // ── Links ──────────────────────────────────────────
        // href="#" → dead link
        const hrefHash = /href=["']#["']/g;
        let m;
        while ((m = hrefHash.exec(line)) !== null) {
            totalInteractive++;
            deadCount++;
            // Extract link text if possible
            const textMatch = line.match(/>([^<]{1,60})</);
            const label = textMatch ? textMatch[1].trim() : '(no label)';
            deadItems.push({
                type: 'dead-link',
                line: lineNum,
                label,
                severity: 'medium',
                snippet: trimmed.substring(0, 120)
            });
        }

        // Real href (not #, not javascript:) → wired
        const hrefReal = /href=["'](\/[^"']+|https?:\/\/[^"']+)["']/g;
        while ((m = hrefReal.exec(line)) !== null) {
            totalInteractive++;
            wiredCount++;
        }

        // ── Buttons ────────────────────────────────────────
        if (/<button/i.test(line)) {
            totalInteractive++;
            // Check if onClick exists on this line or adjacent
            const context = lines.slice(Math.max(0, idx - 1), Math.min(lines.length, idx + 3)).join(' ');
            if (/onClick/i.test(context) || /type=["']submit["']/i.test(context) || /disabled/i.test(context)) {
                wiredCount++;
            } else {
                deadCount++;
                const textMatch = line.match(/>([^<]{1,60})</);
                const label = textMatch ? textMatch[1].trim() : '(button)';
                deadItems.push({
                    type: 'dead-button',
                    line: lineNum,
                    label,
                    severity: 'high',
                    snippet: trimmed.substring(0, 120)
                });
            }
        }

        // ── Empty onClick handlers ─────────────────────────
        if (/onClick=\{?\(\)\s*=>\s*\{\s*\}\}?/i.test(line)) {
            // Already counted above, flag as dead
            deadItems.push({
                type: 'empty-handler',
                line: lineNum,
                label: '(empty onClick)',
                severity: 'medium',
                snippet: trimmed.substring(0, 120)
            });
        }

        // ── Forms without onSubmit ─────────────────────────
        if (/<form/i.test(line)) {
            totalInteractive++;
            const formContext = lines.slice(idx, Math.min(lines.length, idx + 5)).join(' ');
            if (/onSubmit/i.test(formContext)) {
                wiredCount++;
            } else {
                deadCount++;
                deadItems.push({
                    type: 'dead-form',
                    line: lineNum,
                    label: '(form without onSubmit)',
                    severity: 'critical',
                    snippet: trimmed.substring(0, 120)
                });
            }
        }

        // ── Clickable icons/elements without handlers ──────
        if (/cursor-pointer/i.test(line) && !/onClick/i.test(line) && !/href/i.test(line)) {
            const ctx = lines.slice(Math.max(0, idx - 1), Math.min(lines.length, idx + 2)).join(' ');
            if (!/onClick/i.test(ctx) && !/href/i.test(ctx)) {
                totalInteractive++;
                deadCount++;
                deadItems.push({
                    type: 'dead-cursor',
                    line: lineNum,
                    label: '(cursor-pointer without handler)',
                    severity: 'low',
                    snippet: trimmed.substring(0, 120)
                });
            }
        }
    });

    const coverage = totalInteractive > 0 ? Math.round((wiredCount / totalInteractive) * 100) : 100;

    return {
        totalInteractive,
        wiredCount,
        deadCount,
        coverage,
        deadItems
    };
}

// ── Main ────────────────────────────────────────────────

function main() {
    if (!fs.existsSync(MAP_FILE)) {
        console.error('FOUND_MAP_FINAL.json not found. Run Phase 1-2 first.');
        process.exit(1);
    }

    const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
    const allResults = [];
    const gapReport = [];

    for (const entry of map) {
        const pagePath = path.join(ROOT, entry.pageFile);

        const result = {
            screenId: entry.screenId,
            route: entry.route,
            pageFile: entry.pageFile,
            exists: false,
            totalInteractive: 0,
            wiredCount: 0,
            deadCount: 0,
            coverage: 100,
            deadItems: []
        };

        if (!fs.existsSync(pagePath)) {
            result.exists = false;
            allResults.push(result);
            continue;
        }

        result.exists = true;
        const content = fs.readFileSync(pagePath, 'utf8');
        const audit = findInteractiveElements(content, pagePath);

        result.totalInteractive = audit.totalInteractive;
        result.wiredCount = audit.wiredCount;
        result.deadCount = audit.deadCount;
        result.coverage = audit.coverage;
        result.deadItems = audit.deadItems;

        allResults.push(result);

        if (audit.deadItems.length > 0) {
            gapReport.push({
                screenId: entry.screenId,
                route: entry.route,
                pageFile: entry.pageFile,
                gaps: audit.deadItems
            });
        }
    }

    // ── Generate WIRING_REPORT.md ─────────────────────────
    const totalScreens = allResults.filter(r => r.exists).length;
    const fullCoverage = allResults.filter(r => r.exists && r.coverage === 100).length;
    const withGaps = allResults.filter(r => r.exists && r.deadCount > 0).length;
    const totalDead = allResults.reduce((a, r) => a + r.deadCount, 0);
    const totalInteractive = allResults.reduce((a, r) => a + r.totalInteractive, 0);
    const totalWired = allResults.reduce((a, r) => a + r.wiredCount, 0);
    const overallCoverage = totalInteractive > 0 ? Math.round((totalWired / totalInteractive) * 100) : 100;

    let report = `# Interaction Wiring Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n\n`;
    report += `| Metric | Value |\n|--------|-------|\n`;
    report += `| Screens audited | ${totalScreens} |\n`;
    report += `| 100% coverage | ${fullCoverage} |\n`;
    report += `| Screens with gaps | ${withGaps} |\n`;
    report += `| Total interactive elements | ${totalInteractive} |\n`;
    report += `| Wired | ${totalWired} |\n`;
    report += `| Dead/missing | ${totalDead} |\n`;
    report += `| **Overall coverage** | **${overallCoverage}%** |\n\n`;

    report += `## Per-Screen Coverage\n\n`;
    report += `| Screen | Route | Total | Wired | Dead | Coverage |\n`;
    report += `|--------|-------|-------|-------|------|----------|\n`;
    for (const r of allResults.filter(r => r.exists)) {
        const icon = r.coverage === 100 ? '✅' : r.coverage >= 80 ? '🟡' : '🔴';
        report += `| ${r.screenId} | \`${r.route}\` | ${r.totalInteractive} | ${r.wiredCount} | ${r.deadCount} | ${icon} ${r.coverage}% |\n`;
    }

    report += `\n## Dead Items Detail\n\n`;
    for (const r of allResults.filter(r => r.deadCount > 0)) {
        report += `### ${r.screenId} — \`${r.route}\` (${r.deadCount} issues)\n\n`;
        for (const item of r.deadItems) {
            const sevIcon = item.severity === 'critical' ? '🔴' : item.severity === 'high' ? '🟠' : item.severity === 'medium' ? '🟡' : '⚪';
            report += `- ${sevIcon} **L${item.line}** [${item.type}] ${item.label}\n`;
        }
        report += '\n';
    }

    fs.writeFileSync(path.join(DOCS_DIR, 'WIRING_REPORT.md'), report, 'utf8');

    // ── Generate INTERACTION_GAP_REPORT.json ──────────────
    fs.writeFileSync(
        path.join(DOCS_DIR, 'INTERACTION_GAP_REPORT.json'),
        JSON.stringify(gapReport, null, 2),
        'utf8'
    );

    // ── Console output ────────────────────────────────────
    console.log(`\n=== INTERACTION WIRING AUDIT ===`);
    console.log(`Screens: ${totalScreens} | Coverage: ${overallCoverage}%`);
    console.log(`Total interactive: ${totalInteractive} | Wired: ${totalWired} | Dead: ${totalDead}`);
    console.log(`Screens with gaps: ${withGaps}`);
    console.log(`Reports: docs/WIRING_REPORT.md + docs/INTERACTION_GAP_REPORT.json`);

    if (totalDead > 0) {
        console.log(`\nScreens with dead interactions:`);
        for (const r of allResults.filter(r => r.deadCount > 0)) {
            console.log(`  🔴 ${r.screenId} (${r.route}) — ${r.deadCount} dead items, ${r.coverage}% coverage`);
        }
    }

    return totalDead === 0 ? 0 : 1;
}

process.exit(main());
