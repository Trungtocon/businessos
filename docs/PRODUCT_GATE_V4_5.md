# Product Readiness Gate V4.5 (Lean V1) — GO/NO-GO Report

**Date:** 2026-02-27
**Evaluation:** Can this be sold and used by SME in week 1?
**Decision:** 🚨 **NO-GO**

## Verdict
While the underlying technical pipeline is secure and architecturally sound (Safe Actions, Backend Fallbacks, AI Prompts mapping to JSON schemas), the *Product UX* for Lean V1 does not exist. A user attempting to buy and use a "Lead Sprint Pack" will hit a series of P0 blockers, as there are no buttons to start the pack, no UI to input minimal context, and no schema to generate the complex multi-part outputs required for our "Definition of Done".

## Critical Numbers
- **P0 Area Blockers:** 4 (Missing Entry Points, Missing Onboarding UI, Missing AI Sprint Schemas, Missing Export UI).
- **P1 Area Blockers:** 2 (Missing Connector Abstraction for FluentCRM, Disconnected Dashboards).
- **Time-To-Value Estimate:** ~28 mins (Assuming Happy Path is built), but currently **Blocked / Impossible**.

## Gate Summary
| Product Area | Status | Core Issue |
|---|---|---|
| **A. Time-To-Value** | 🚨 FAIL | No UI entry points on `/virtual` for specific Sprint Packs. |
| **B. Completeness** | 🚨 FAIL | AI only handles generic drafts, not 6-part Sprint Packs. |
| **C. Action Safety** | ✅ PASS | Excellent server-side approval state guards. |
| **D. Sellability/Export** | 🚨 FAIL | Cannot download or copy the AI deliverables easily. |
| **E. Backend Status** | ⚠️ WARN | ERPNext safe, but mapping to FluentCRM requires abstraction. |
| **F. Onboarding** | ⚠️ WARN | Relies on heavy free-text brief rather than a minimal 5-field wizard. |

## Next Sprint Scope (Fix First to Sell)
To pivot this from NO-GO to a sellable V1 "dịch vụ marketing chuẩn hóa" within the 6-month plan, execute the following strict backlog:

1. **AI Prompts & Schemas (Backend):**
   - Add schemas for `lead_pack`, `content_pack`, `report_pack` to `schemas.ts`.
   - Add massive multi-shot prompts to `prompts.ts` mapping to those schemas.
2. **Minimal Onboarding Wizard (Frontend):**
   - Build a 5-step form (Industry, Offer, Target, Channel, Tone) intercepting the user on `/virtual`.
3. **Sprint Pack Viewer (Frontend):**
   - Build a UI component to replace `JsonResultViewer` that cleanly displays tabular/checklist data.
4. **Export Buttons (Frontend):**
   - Add `Copy as Markdown` and `Download .md` to the results panel.
5. **CRM Action Contracts (Backend):**
   - Standardize `TYPES` to support both `ERPNext` and `FluentCRM` dynamically.
