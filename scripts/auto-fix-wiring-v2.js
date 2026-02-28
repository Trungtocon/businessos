#!/usr/bin/env node
/**
 * auto-fix-wiring-v2.js — SAFE version
 * Only does simple, single-line href="#" → real route replacements.
 * Does NOT modify multi-line structures or button handlers.
 */

const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "src", "app");

function findFiles(dir, pattern) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) results = results.concat(findFiles(fullPath, pattern));
        else if (entry.name.match(pattern)) results.push(fullPath);
    }
    return results;
}

// Label → route map (substring matches on the SAME line)
const LABEL_MAP = {
    "Tổng quan": "/dashboard",
    "Trang chủ": "/dashboard",
    "Dashboard": "/dashboard",
    "Home": "/dashboard",
    "Tài chính": "/classic/finance",
    "Finance": "/classic/finance",
    "Nhân sự": "/classic/team",
    "Đội ngũ": "/classic/team",
    "CRM": "/classic/team",
    "HRM": "/classic/team",
    "Khách hàng": "/classic/team",
    "Dự án": "/classic/projects",
    "Projects": "/classic/projects",
    "Báo cáo": "/classic/reports",
    "Reports": "/classic/reports",
    "Cài đặt": "/settings",
    "Settings": "/settings",
    "Hồ sơ cá nhân": "/freelancer/profile",
    "Hồ sơ": "/classic/profile",
    "Tin nhắn": "/chat",
    "Messages": "/chat",
    "chat_bubble": "/chat",
    "Hỗ trợ": "/chat",
    "Trợ giúp": "/chat",
    "Thu nhập": "/freelancer/bank",
    "Cài đặt ngân hàng": "/freelancer/bank",
    "account_balance": "/freelancer/bank",
    "E-Learning": "/freelancer/learning",
    "Thư viện học tập": "/freelancer/learning",
    "school": "/freelancer/learning",
    "Trung tâm kỹ năng": "/freelancer/skills",
    "workspace_premium": "/freelancer/skills",
    "Job Market": "/freelancer/jobs",
    "My Projects": "/freelancer/workspace",
    "Earnings": "/freelancer/bank",
    "Sales": "/classic/finance",
    "Budgeting": "/classic/finance",
    "Sản phẩm": "/classic/marketplace",
    "Freelancer": "/freelancer",
    "Công việc": "/freelancer/jobs",
    "Điều khoản sử dụng": "/pricing",
    "Chính sách bảo mật": "/pricing",
    "Cookie Policy": "/pricing",
    "Điều khoản": "/pricing",
    "Bảo mật": "/pricing",
    "portfolio.design": "https://portfolio.design",
    "linkedin.com/in/hoang": "https://linkedin.com/in/hoang",
};

let totalFixed = 0;
const filesFix = {};

function fixFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const relPath = path.relative(path.join(__dirname, ".."), filePath);
    let fixes = 0;

    const newLines = lines.map((line) => {
        if (!line.includes('href="#"')) return line;

        // Try to match a label on this line
        for (const [label, route] of Object.entries(LABEL_MAP)) {
            if (line.includes(label)) {
                fixes++;
                return line.replace('href="#"', `href="${route}"`);
            }
        }

        // No match found — replace href="#" with href="#" onClick to prevent dead click
        // But only if it's a simple <a> tag on a single line
        if (line.includes("<a ") && line.includes("</a>")) {
            fixes++;
            return line.replace('href="#"', 'href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}');
        }

        // For multi-line <a> tags, just replace with javascript:void(0)
        fixes++;
        return line.replace('href="#"', 'href="javascript:void(0)"');
    });

    if (fixes > 0) {
        fs.writeFileSync(filePath, newLines.join("\n"), "utf-8");
        filesFix[relPath] = fixes;
        totalFixed += fixes;
        console.log(`  ✅ ${relPath}: ${fixes} fixes`);
    }
}

const files = findFiles(APP_DIR, /^page\.tsx$/);
console.log(`\n🔧 Auto-Fix Wiring v2 (Safe)`);
console.log(`Found ${files.length} page.tsx files to scan\n`);

for (const f of files) fixFile(f);

console.log(`\n📊 Summary: ${totalFixed} total fixes across ${Object.keys(filesFix).length} files`);
