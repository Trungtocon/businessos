# Audit: Link Coverage & Dead Clicks V4.4

**Date:** 2026-02-27
**Status:** ⚠️ 50+ Dead Clicks Found

## Overview
A static scan for placeholder interactions (`onClick={() => {}}` and `href="#"`) reveals many un-wired elements across the application. While the core `/virtual` routing hub is fully wired via `nav.registry.ts`, child screens still rely heavily on placeholder alerts and no-ops.

## Priority Backlog: Dead Clicks (By Screen)

### Top Priority (P1) - Core Navigation
| File | Line | Element | Current State | Recommendation |
|------|------|---------|---------------|----------------|
| `src/app/(auth)/login/page.tsx` | 183 | Đăng ký ngay | `href="#"` (alert) | Wire to `/role` or `/onboarding` |
| `src/app/page.tsx` | 391 | Start button | `onClick={() => {}}` | Wire to `/virtual` |
| `src/app/pricing/page.tsx` | 89 | Login button | `onClick={() => {}}` | Wire to `/login` |
| `src/app/(portal)/freelancer/wallet/page.tsx` | 35 | Logout | `onClick={() => {}}` | Wire to `/splash` or Auth |
| `src/app/(portal)/freelancer/test/page.tsx` | 24 | Thoát bài thi | `onClick={() => {}}` | Wire to `/freelancer/skills` |
| `src/app/(portal)/freelancer/page.tsx` | 77 | Xem tất cả | `href="#"` (alert) | Wire to `/freelancer/jobs` |

### Medium Priority (P2) - Feature Placeholders
| File | Line | Element | Current State | Recommendation |
|------|------|---------|---------------|----------------|
| `src/app/(portal)/virtual/war-room/page.tsx` | 447 | Tool action | `onClick={}` | Wire action or remove if not ready |
| `src/app/(portal)/virtual/approval/page.tsx` | 436 | Tool action | `onClick={}` | Implement or hide |
| `src/app/(portal)/classic/team/page.tsx` | 85 | Filter tags | `onClick={}` | Implement state filter |
| `src/app/(portal)/freelancer/workspace/page.tsx` | 81 | Brand_Kit.zip | `href="#"` (alert) | Wire to actual download |
| `src/app/(portal)/classic/profile/page.tsx` | 55 | Edit Avatar | `onClick={}` | Implement modal |

### Low Priority (P3) - UI State
The following files contain empty `onClick` handlers for tabs, pagination, or cosmetic UI toggles that do not break page-to-page navigation:
- `src/app/team/page.tsx` (Tabs)
- `src/app/(portal)/search/page.tsx` (Tabs)
- `src/app/(portal)/freelancer/skills/page.tsx` (Tabs)
- `src/app/(portal)/classic/team/page.tsx` (Pagination)

## Next Steps
Only the P1 safe fixes (routing to existing pages without altering UI) will be implemented in this sprint. The rest will be documented in the Final Audit Fix Backlog.
