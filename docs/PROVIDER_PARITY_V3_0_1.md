# Provider Parity Check — V3.0.1

| Field | Value |
|---|---|
| **Date** | 2026-02-15 |
| **API** | http://localhost:3002/api/ai-copilot |
| **Threshold** | 85% |

---

## Module: `brief`

### Schema Validation (gemini)

| Metric | Value |
|---|---|
| Provider | gemini |
| HTTP Status | 200 |
| Response Time | 15196ms |
| Schema Valid | ✅ Yes |
| Keys Present | summary, missing_questions, assumptions, recommended_kpis, risks, next_actions |

---

## Module: `draft`

### Schema Validation (gemini)

| Metric | Value |
|---|---|
| Provider | gemini |
| HTTP Status | 200 |
| Response Time | 468ms |
| Schema Valid | ✅ Yes |
| Keys Present | improved_text, changes, tone, seo_notes |

---

## Module: `qa`

### Schema Validation (gemini)

| Metric | Value |
|---|---|
| Provider | gemini |
| HTTP Status | 200 |
| Response Time | 576ms |
| Schema Valid | ✅ Yes |
| Keys Present | score, passed, checks, blocking_issues, fix_suggestions |

---

## Summary

| Metric | Value |
|---|---|
| Average Schema Score | 100% |
| All Schemas Valid | ✅ |
| Verdict | **✅ PASS** |
