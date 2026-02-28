#!/usr/bin/env node
/**
 * fix-duplicate-onclick.js
 * Fixes duplicate onClick props introduced by the v2 wiring script.
 * Pattern: onClick={(e: React.MouseEvent) => e.preventDefault()} onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('...'); }}
 * Should become: onClick={(e: React.MouseEvent) => { e.preventDefault(); alert('...'); }}
 */

const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "src", "app");

function findFiles(dir, pattern) {
    let results = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) results = results.concat(findFiles(fullPath, pattern));
            else if (entry.name.match(pattern)) results.push(fullPath);
        }
    } catch (e) { }
    return results;
}

let totalFixed = 0;

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, "utf-8");
    const relPath = path.relative(path.join(__dirname, ".."), filePath);

    // Remove the first onClick that just does e.preventDefault(), keeping only the second one with alert
    const pattern = /onClick=\{\(e: React\.MouseEvent\) => e\.preventDefault\(\)\} onClick=/g;
    const matches = content.match(pattern);

    if (matches && matches.length > 0) {
        content = content.replace(pattern, "onClick=");
        fs.writeFileSync(filePath, content, "utf-8");
        totalFixed += matches.length;
        console.log(`  ✅ ${relPath}: ${matches.length} duplicate onClick(s) fixed`);
    }
}

const files = findFiles(APP_DIR, /^page\.tsx$/);
console.log(`\n🔧 Fix Duplicate onClick Props`);
console.log(`Scanning ${files.length} files...\n`);

for (const f of files) fixFile(f);

console.log(`\n📊 Total fixes: ${totalFixed}`);
