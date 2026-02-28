# Audit Fix Backlog V4.4

**Date:** 2026-02-27

This backlog contains the prioritized list of latent risks and defects uncovered during the V4.4 Comprehensive Audit. These are strictly prioritized by risk impact.

## P1: Critical Functional Blockers & Missing Validations
*These items pose an immediate risk to runtime stability or integration data integrity.*

1. **Missing Zod Validation on API Endpoints**
   - **Path:** `src/app/api/integrations/erpnext/actions/execute/route.ts` & AI Connectors.
   - **Risk:** Type casting `as { actionId: string }` without runtime parsing could lead to 500 crashes on malformed requests.
   - **Fix:** Add `import { z } from "zod";` and parse bodies before execution.

2. **Zustand Hydration Mismatch**
   - **Path:** `src/lib/store.ts`
   - **Risk:** `persist` middleware is exported directly without a mount-delay wrapper. Next.js server render will clash with `localStorage` client values (e.g., Theme setting).
   - **Fix:** Create a custom hook `useHydratedStore` or suppress hydration warnings.

3. **ERPNext Ping Spam (Unbounded Fetch)**
   - **Path:** `src/app/(portal)/virtual/page.tsx`
   - **Risk:** The top-level component pings `http://localhost:8081` via internal proxy on every mount, hammering the dev server.
   - **Fix:** Abstract to SWR or caching wrapper.

## P2: Broken Connective Tissue (Dead Clicks)
*These items disrupt the user flow but do not crash the system.*

1. **Login Page Missing Auth Hookups**
   - **Path:** `src/app/(auth)/login/page.tsx`
   - **Issue:** "Đăng ký ngay" and "Quên mật khẩu" buttons have placeholder `href="#"`.
   - **Fix:** Wire to `/role` or password recovery flows.

2. **Wallet Disconnect (Logout)**
   - **Path:** `src/app/(portal)/freelancer/wallet/page.tsx`
   - **Issue:** The logout block relies on `onClick={() => {}}`.
   - **Fix:** Wire to `logout()` from Zustand and push to `/splash`.

3. **Project to Kanban Bridging**
   - **Path:** `src/app/(portal)/classic/projects/page.tsx`
   - **Issue:** Clicking project titles fires a dummy alert instead of navigating to Kanban.
   - **Fix:** Wire `onClick` to `router.push('/classic/projects/'+id+'/kanban')`.

## P3: Cosmetic & Tech Debt
*Minor risks that do not impede core operations.*

1. **AI Copilot Strictness Prompting**
   - **Path:** `src/modules/ai-copilot/providers/provider.openai.ts`
   - **Risk:** Prompts could be injected.
   - **Fix:** Escalate prompt instruction strictness.

2. **Static Mock Usage**
   - **Path:** Codebase-wide.
   - **Risk:** Lists and tables are fully disconnected from a DB proxy.
   - **Fix:** Shift mock data from store variables to API mocks.
