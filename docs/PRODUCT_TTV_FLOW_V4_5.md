# Product Time-To-Value (TTV) Flow V4.5

**Date:** 2026-02-27
**Target:** First Sprint completed in <= 30 minutes.

## Desired Happy Path (Lean V1)

| Step | Action | Time Estimate | Current Status |
|------|--------|---------------|----------------|
| 1 | Land on `/virtual` (CEO Cockpit) | 1 min | ✅ Works |
| 2 | Click "Sprint Pack" entry point | 1 min | ❌ Missing UI |
| 3 | Enter Minimal Context (Industry, Offer, Target, Budget, Tone) | 5 mins | ❌ Missing UI |
| 4 | Click "Generate Pack" | 1 min | ❌ Missing Logic |
| 5 | AI Generates multi-part deliverables | 1-2 mins | ❌ Missing Prompts/Schemas |
| 6 | User reviews Outputs (Lead/Content/Report) | 15 mins | ❌ Missing UI |
| 7 | User clicks "Approve & Sync to CRM/Tasks" | 2 mins | ⚠️ Logic exists (ERPNext connector), but UI missing |
| 8 | User clicks "Export to Markdown/JSON" | 1 min | ❌ Missing UI |

**Total Estimated TTV:** ~28 Minutes (Passes < 30m constraint)

## Reality Check
Currently, the application supports generic AI tasks (Brief Analysis, Outline, Draft, QA) via the Copilot Drawer. It **does not** support the cohesive "Sprint Pack" UX required for a structured marketing service. 
