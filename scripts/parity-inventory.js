#!/usr/bin/env node
/**
 * parity-inventory.js
 * Generates PARITY_MAP_V2_7_1.json and .md from FOUND_MAP_V2_5.json
 * Cross-references stitch folders, page files, and route groups
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FOUND_MAP = JSON.parse(fs.readFileSync(path.join(ROOT, "FOUND_MAP_V2_5.json"), "utf-8"));
const STITCH_DIR = path.join(ROOT, "stitch_bussines_os");
const APP_DIR = path.join(ROOT, "src", "app");

// Get all stitch folders
const stitchFolders = fs.readdirSync(STITCH_DIR).filter(f => fs.statSync(path.join(STITCH_DIR, f)).isDirectory());

// Get all page.tsx files
function findPages(dir, base = "") {
    let results = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const relPath = base ? `${base}/${entry.name}` : entry.name;
            if (entry.isDirectory()) results = results.concat(findPages(path.join(dir, entry.name), relPath));
            else if (entry.name === "page.tsx") results.push(`src/app/${base}/page.tsx`.replace(/\\/g, "/"));
        }
    } catch (e) { }
    return results;
}

const existingPages = findPages(APP_DIR);

// Build parity map
const parityMap = FOUND_MAP.map(screen => {
    const pageFile = screen.pageFile.replace(/\\/g, "/");
    const implementedFileExists = existingPages.includes(pageFile);

    // Check stitch folder exists
    const stitchFolder = screen.stitchFolder;
    const stitchExists = stitchFolders.some(f => f === stitchFolder || f.startsWith(stitchFolder.replace(/_$/, "")));

    // Find actual stitch folder (might have slightly different name)
    let actualStitchFolder = stitchFolders.find(f => f === stitchFolder) ||
        stitchFolders.find(f => f.startsWith(stitchFolder.split("_-_")[0])) ||
        "NOT_FOUND";

    // Get stitch design images
    let designImages = [];
    if (actualStitchFolder !== "NOT_FOUND") {
        try {
            const stitchPath = path.join(STITCH_DIR, actualStitchFolder);
            designImages = fs.readdirSync(stitchPath).filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f));
        } catch (e) { }
    }

    // Determine status
    let status = "MATCH";
    if (!implementedFileExists) {
        status = "MISSING_ROUTE";
    } else if (actualStitchFolder === "NOT_FOUND") {
        status = "MISSING_DESIGN";
    } else {
        status = "NEEDS_VISUAL_CHECK";
    }

    return {
        screenId: screen.screenId,
        screenName: screen.notes || screen.stitchFolder,
        route: screen.route,
        stitchFolder: actualStitchFolder,
        designImages: designImages.length,
        implementedFile: pageFile,
        implementedFileExists,
        confidence: screen.confidence,
        status
    };
});

// Generate JSON
const jsonPath = path.join(ROOT, "docs", "PARITY_MAP_V2_7_1.json");
fs.mkdirSync(path.join(ROOT, "docs"), { recursive: true });
fs.writeFileSync(jsonPath, JSON.stringify(parityMap, null, 2));

// Generate Markdown
let md = `# PARITY MAP V2.7.1\n\n`;
md += `Generated: ${new Date().toISOString()}\n\n`;

// Summary stats
const stats = {
    total: parityMap.length,
    needsCheck: parityMap.filter(p => p.status === "NEEDS_VISUAL_CHECK").length,
    missingRoute: parityMap.filter(p => p.status === "MISSING_ROUTE").length,
    missingDesign: parityMap.filter(p => p.status === "MISSING_DESIGN").length,
    match: parityMap.filter(p => p.status === "MATCH").length,
};

md += `## Summary\n`;
md += `| Metric | Count |\n|--------|-------|\n`;
md += `| Total screens | ${stats.total} |\n`;
md += `| Needs visual check | ${stats.needsCheck} |\n`;
md += `| Missing route | ${stats.missingRoute} |\n`;
md += `| Missing design | ${stats.missingDesign} |\n\n`;

// Group by category
const groups = {
    "System (s00-s06)": parityMap.filter(p => p.screenId.startsWith("s")),
    "Admin (a01-a11)": parityMap.filter(p => p.screenId.startsWith("a")),
    "Virtual/Classic (c01-c17)": parityMap.filter(p => p.screenId.startsWith("c")),
    "Freelancer (f01-f12)": parityMap.filter(p => p.screenId.startsWith("f")),
    "Other": parityMap.filter(p => !["s", "a", "c", "f"].includes(p.screenId[0])),
};

for (const [groupName, items] of Object.entries(groups)) {
    if (items.length === 0) continue;
    md += `## ${groupName}\n\n`;
    md += `| ScreenId | Name | Route | Stitch Folder | Design Imgs | Implemented | Status |\n`;
    md += `|----------|------|-------|---------------|-------------|-------------|--------|\n`;
    for (const item of items) {
        md += `| ${item.screenId} | ${item.screenName} | \`${item.route}\` | ${item.stitchFolder === "NOT_FOUND" ? "❌" : "✅"} | ${item.designImages} | ${item.implementedFileExists ? "✅" : "❌"} | ${item.status} |\n`;
    }
    md += `\n`;
}

const mdPath = path.join(ROOT, "docs", "PARITY_MAP_V2_7_1.md");
fs.writeFileSync(mdPath, md);

console.log(`\n📊 Parity Inventory Generated`);
console.log(`   Total: ${stats.total} screens`);
console.log(`   Needs visual check: ${stats.needsCheck}`);
console.log(`   Missing route: ${stats.missingRoute}`);
console.log(`   Missing design: ${stats.missingDesign}`);
console.log(`\n   JSON: docs/PARITY_MAP_V2_7_1.json`);
console.log(`   MD:   docs/PARITY_MAP_V2_7_1.md`);
