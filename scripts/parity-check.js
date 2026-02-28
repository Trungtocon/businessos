/**
 * parity-check.js — Structural Design Parity Checker
 * 
 * Compares stitch code.html structural signatures against page.tsx implementations.
 * Outputs: docs/PARITY_REPORT.md + docs/PARITY_MATRIX.md
 * 
 * Usage: node scripts/parity-check.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STITCH_DIR = path.join(ROOT, 'stitch_bussines_os');
const APP_DIR = path.join(ROOT, 'src', 'app');
const DOCS_DIR = path.join(ROOT, 'docs');
const MAP_FILE = path.join(DOCS_DIR, 'FOUND_MAP_FINAL.json');

// ── Helpers ─────────────────────────────────────────────

function extractTextBlocks(html) {
    // Remove script/style tags
    let clean = html.replace(/<script[\s\S]*?<\/script>/gi, '');
    clean = clean.replace(/<style[\s\S]*?<\/style>/gi, '');

    const results = { headings: [], buttons: [], labels: [], inputs: [], tables: 0, forms: 0, cards: 0, tabs: [] };

    // Headings (h1-h6)
    const headingRe = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
    let m;
    while ((m = headingRe.exec(clean)) !== null) {
        const text = m[1].replace(/<[^>]+>/g, '').trim();
        if (text) results.headings.push(text);
    }

    // Buttons
    const btnRe = /<button[^>]*>([\s\S]*?)<\/button>/gi;
    while ((m = btnRe.exec(clean)) !== null) {
        const text = m[1].replace(/<[^>]+>/g, '').trim();
        if (text && text.length < 100) results.buttons.push(text);
    }

    // Labels / placeholders
    const labelRe = /<label[^>]*>([\s\S]*?)<\/label>/gi;
    while ((m = labelRe.exec(clean)) !== null) {
        const text = m[1].replace(/<[^>]+>/g, '').trim();
        if (text) results.labels.push(text);
    }

    // Input fields
    const inputRe = /<input[^>]*(placeholder=["']([^"']+)["'])?[^>]*>/gi;
    while ((m = inputRe.exec(clean)) !== null) {
        if (m[2]) results.inputs.push(m[2]);
    }

    // Count tables
    results.tables = (clean.match(/<table/gi) || []).length;

    // Count forms
    results.forms = (clean.match(/<form/gi) || []).length;

    // Count card-like elements (divs with card/rounded patterns)
    results.cards = (clean.match(/class="[^"]*card[^"]*"/gi) || []).length;

    // Tab-like elements
    const tabRe = /role="tab"[^>]*>([\s\S]*?)</gi;
    while ((m = tabRe.exec(clean)) !== null) {
        const text = m[1].replace(/<[^>]+>/g, '').trim();
        if (text) results.tabs.push(text);
    }

    return results;
}

function extractTsxBlocks(tsx) {
    const results = { headings: [], buttons: [], labels: [], inputs: [], tables: 0, forms: 0, cards: 0, tabs: [] };

    // Headings
    const headingRe = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
    let m;
    while ((m = headingRe.exec(tsx)) !== null) {
        const text = m[1].replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '').trim();
        if (text) results.headings.push(text);
    }

    // Buttons
    const btnRe = /<button[^>]*>([\s\S]*?)<\/button>/gi;
    while ((m = btnRe.exec(tsx)) !== null) {
        const text = m[1].replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '').trim();
        if (text && text.length < 100) results.buttons.push(text);
    }

    // Tables
    results.tables = (tsx.match(/<table/gi) || []).length;

    // Forms
    results.forms = (tsx.match(/<form/gi) || []).length;

    // Cards
    results.cards = (tsx.match(/rounded-(xl|2xl|lg)/gi) || []).length;

    return results;
}

function similarity(stitchBlocks, tsxBlocks) {
    let score = 0;
    let total = 0;
    const mismatches = [];

    // Heading presence
    if (stitchBlocks.headings.length > 0) {
        total++;
        const stitchSet = new Set(stitchBlocks.headings.map(h => h.toLowerCase().substring(0, 30)));
        const tsxSet = new Set(tsxBlocks.headings.map(h => h.toLowerCase().substring(0, 30)));
        const overlap = [...stitchSet].filter(h => tsxSet.has(h)).length;
        if (overlap > 0 || tsxBlocks.headings.length >= stitchBlocks.headings.length * 0.5) {
            score++;
        } else {
            mismatches.push(`Headings: stitch has ${stitchBlocks.headings.length}, code has ${tsxBlocks.headings.length}`);
        }
    }

    // Button presence
    if (stitchBlocks.buttons.length > 0) {
        total++;
        if (tsxBlocks.buttons.length >= stitchBlocks.buttons.length * 0.5) {
            score++;
        } else {
            mismatches.push(`Buttons: stitch has ${stitchBlocks.buttons.length}, code has ${tsxBlocks.buttons.length}`);
        }
    }

    // Table presence
    if (stitchBlocks.tables > 0) {
        total++;
        if (tsxBlocks.tables > 0) {
            score++;
        } else {
            mismatches.push(`Tables: stitch has ${stitchBlocks.tables}, code has 0`);
        }
    }

    // Form presence
    if (stitchBlocks.forms > 0) {
        total++;
        if (tsxBlocks.forms > 0) {
            score++;
        } else {
            mismatches.push(`Forms: stitch has ${stitchBlocks.forms}, code has 0`);
        }
    }

    // Overall structure density
    total++;
    const stitchDensity = stitchBlocks.headings.length + stitchBlocks.buttons.length + stitchBlocks.tables + stitchBlocks.forms;
    const tsxDensity = tsxBlocks.headings.length + tsxBlocks.buttons.length + tsxBlocks.tables + tsxBlocks.forms;
    if (stitchDensity === 0 || tsxDensity >= stitchDensity * 0.4) {
        score++;
    } else {
        mismatches.push(`Density: stitch=${stitchDensity} elements, code=${tsxDensity} elements`);
    }

    return {
        score: total > 0 ? Math.round((score / total) * 100) : 100,
        total,
        matched: score,
        mismatches
    };
}

// ── Main ────────────────────────────────────────────────

function main() {
    if (!fs.existsSync(MAP_FILE)) {
        console.error('FOUND_MAP_FINAL.json not found. Run Phase 1-2 first.');
        process.exit(1);
    }

    const map = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'));
    const results = [];

    for (const entry of map) {
        const stitchPath = path.join(STITCH_DIR, entry.stitchFolder, 'code.html');
        const pagePath = path.join(ROOT, entry.pageFile);

        const result = {
            screenId: entry.screenId,
            route: entry.route,
            stitchFolder: entry.stitchFolder,
            status: 'SKIP',
            score: 0,
            mismatches: [],
            stitchExists: false,
            pageExists: false
        };

        result.stitchExists = fs.existsSync(stitchPath);
        result.pageExists = fs.existsSync(pagePath);

        if (!result.stitchExists) {
            result.status = 'SKIP';
            result.mismatches.push('No stitch code.html found');
            results.push(result);
            continue;
        }

        if (!result.pageExists) {
            result.status = 'FAIL';
            result.mismatches.push('Page file missing');
            results.push(result);
            continue;
        }

        try {
            const stitchHtml = fs.readFileSync(stitchPath, 'utf8');
            const pageTsx = fs.readFileSync(pagePath, 'utf8');

            const stitchBlocks = extractTextBlocks(stitchHtml);
            const tsxBlocks = extractTsxBlocks(pageTsx);
            const sim = similarity(stitchBlocks, tsxBlocks);

            result.score = sim.score;
            result.mismatches = sim.mismatches;
            result.status = sim.score >= 60 ? 'PASS' : 'FAIL';
            result.stitchSignature = {
                headings: stitchBlocks.headings.length,
                buttons: stitchBlocks.buttons.length,
                tables: stitchBlocks.tables,
                forms: stitchBlocks.forms
            };
            result.codeSignature = {
                headings: tsxBlocks.headings.length,
                buttons: tsxBlocks.buttons.length,
                tables: tsxBlocks.tables,
                forms: tsxBlocks.forms
            };
        } catch (err) {
            result.status = 'ERROR';
            result.mismatches.push(err.message);
        }

        results.push(result);
    }

    // ── Generate PARITY_REPORT.md ─────────────────────────
    const passCount = results.filter(r => r.status === 'PASS').length;
    const failCount = results.filter(r => r.status === 'FAIL').length;
    const skipCount = results.filter(r => r.status === 'SKIP').length;

    let report = `# Design Parity Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n\n`;
    report += `| Status | Count |\n|--------|-------|\n`;
    report += `| ✅ PASS | ${passCount} |\n`;
    report += `| ❌ FAIL | ${failCount} |\n`;
    report += `| ⏭️ SKIP | ${skipCount} |\n`;
    report += `| **Total** | **${results.length}** |\n\n`;

    report += `## Per-Screen Results\n\n`;
    for (const r of results) {
        const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⏭️';
        report += `### ${icon} ${r.screenId} — \`${r.route}\`\n\n`;
        report += `- **Status**: ${r.status} (${r.score}%)\n`;
        report += `- **Stitch**: \`${r.stitchFolder}\`\n`;
        if (r.stitchSignature) {
            report += `- **Stitch signature**: ${r.stitchSignature.headings}h / ${r.stitchSignature.buttons}btn / ${r.stitchSignature.tables}tbl / ${r.stitchSignature.forms}form\n`;
        }
        if (r.codeSignature) {
            report += `- **Code signature**: ${r.codeSignature.headings}h / ${r.codeSignature.buttons}btn / ${r.codeSignature.tables}tbl / ${r.codeSignature.forms}form\n`;
        }
        if (r.mismatches.length > 0) {
            report += `- **Mismatches**:\n`;
            for (const m of r.mismatches) {
                report += `  - ${m}\n`;
            }
        }
        report += '\n';
    }

    fs.writeFileSync(path.join(DOCS_DIR, 'PARITY_REPORT.md'), report, 'utf8');

    // ── Generate PARITY_MATRIX.md ─────────────────────────
    let matrix = `# Design Parity Matrix\n\n`;
    matrix += `Generated: ${new Date().toISOString()}\n\n`;
    matrix += `| Screen | Route | Stitch | Page | Score | Status |\n`;
    matrix += `|--------|-------|--------|------|-------|--------|\n`;
    for (const r of results) {
        const icon = r.status === 'PASS' ? '✅' : r.status === 'FAIL' ? '❌' : '⏭️';
        matrix += `| ${r.screenId} | \`${r.route}\` | ${r.stitchExists ? '✓' : '✗'} | ${r.pageExists ? '✓' : '✗'} | ${r.score}% | ${icon} ${r.status} |\n`;
    }

    fs.writeFileSync(path.join(DOCS_DIR, 'PARITY_MATRIX.md'), matrix, 'utf8');

    // ── Console output ────────────────────────────────────
    console.log(`\n=== DESIGN PARITY CHECK ===`);
    console.log(`PASS: ${passCount} | FAIL: ${failCount} | SKIP: ${skipCount}`);
    console.log(`Reports written to docs/PARITY_REPORT.md and docs/PARITY_MATRIX.md`);

    if (failCount > 0) {
        console.log(`\nFailed screens:`);
        for (const r of results.filter(r => r.status === 'FAIL')) {
            console.log(`  ❌ ${r.screenId} (${r.route}) — ${r.mismatches.join(', ')}`);
        }
    }

    return failCount === 0 ? 0 : 1;
}

process.exit(main());
