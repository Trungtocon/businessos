# Interaction Fix Plan V2.6

> Priority: P0 = 404-causing, P1 = broken nav flow, P2 = dead CTA, P3 = cosmetic href="#"

## Top 15 Fixes (by impact)

| # | ID | Page(s) | Issue | Fix | P |
|---|-----|---------|-------|-----|---|
| 1 | NAV-01 | Sidebar.tsx | 6 route mismatches → 404 clicks | Fix ROUTES const | P0 |
| 2 | AUTH-01 | login/page.tsx | Freelancer redirect → /freelancer/dashboard (404) | Fix to /freelancer | P0 |
| 3 | NAV-02 | timesheet/page.tsx | Inline sidebar href="/freelancer/dashboard" (404) | Fix to /freelancer | P0 |
| 4 | NAV-03 | wallet/page.tsx | 6 inline sidebar links → href="#" | Wire to real routes | P1 |
| 5 | NAV-04 | withdraw/page.tsx | 3 inline sidebar + 2 breadcrumb → href="#" | Wire to real routes | P1 |
| 6 | NAV-05 | timesheet/page.tsx | 2 remaining inline sidebar → href="#" | Wire to real routes | P1 |
| 7 | NAV-06 | workspace/page.tsx | Breadcrumbs href="#" | Wire to /freelancer, /classic/projects | P1 |
| 8 | FOOT-01 | page.tsx (landing) | Footer nav links all href="#" (Classic Mode, Virtual Mode, etc.) | Wire to real routes | P2 |
| 9 | FOOT-02 | pricing/page.tsx | Header/footer nav all href="#" | Wire to real routes | P2 |
| 10 | FOOT-03 | team/page.tsx | Header/footer nav all href="#" | Wire to real routes | P2 |
| 11 | CTA-01 | wallet/page.tsx | "Tải bảng sao kê (.csv)" href="#" | Add toast placeholder | P2 |
| 12 | CTA-02 | withdraw/page.tsx | "Trung tâm trợ giúp" href="#" | Link to /chat or toast | P2 |
| 13 | CTA-03 | workspace/page.tsx | File download links href="#" | Add toast placeholder | P3 |
| 14 | AUTH-02 | role/page.tsx → login | Role selection should lead to /login | Verify wired | P1 |
| 15 | AUTH-03 | splash/page.tsx → role | Splash should auto-advance or click to /role | Verify wired | P1 |

## Acceptance Criteria
- All P0 fixes: clicking the element navigates to a real, rendering page (no 404)
- All P1 fixes: sidebar/breadcrumb links navigate correctly between existing pages
- All P2 fixes: footer/header nav links go to real routes or show toast placeholder
- All P3 fixes: file-action buttons show toast feedback instead of silent noop
- Build: `npm run build` exit code 0 after each batch
- Design lock: ZERO changes to layout, spacing, typography, or colors

## Batch Plan
- **Batch 01** (done): NAV-01, AUTH-01, NAV-02 (Sidebar + login + timesheet 404 fixes)
- **Batch 02**: NAV-03 to NAV-06 (inline sidebar + breadcrumb wiring on 4 pages)
- **Batch 03**: FOOT-01 to FOOT-03, CTA-01 to CTA-03, AUTH-02, AUTH-03 (footer/CTA/auth flow)
