# Sprint Pack Spec — Sprint 2

## Input Model (8 fields, 4 required)

| Field | Type | Required | Default |
|-------|------|----------|---------|
| industry | string | ✅ | - |
| offer | string | ✅ | - |
| targetCustomer | string | ✅ | - |
| goal7d | string | ✅ | - |
| primaryChannel | enum | ❌ | multi |
| budgetRange | enum | ❌ | mid |
| tone | enum | ❌ | expert |
| constraints | string | ❌ | "" |

## Pack Definitions of Done

### Lead/CRM Pack
- ✅ ICP with who, painPoints, triggers, exclusions
- ✅ Persona with name, context, objections, desiredOutcome
- ✅ 3 Offer Angles with angle, promise, proof, cta
- ✅ 4-step Funnel Plan with channel, asset, metric
- ✅ 5-stage CRM Pipeline
- ✅ 2 Nurture Sequences (5+3 items)
- ✅ 7-day Follow-up Checklist
- ✅ Next Actions

### Content Pack
- ✅ 14-day Content Calendar with theme, format, hook, cta
- ✅ 10 Hooks
- ✅ 10 CTAs
- ✅ 10 Posts with title, caption, channel, hashtags, visualBrief
- ✅ 3 Video Scripts with title, script, shots
- ✅ Key Visual Brief with concept, colors, typography, do, dont
- ✅ Next Actions

### Weekly Report
- ✅ 5 KPI rows with current, target, gap, note
- ✅ 3 Insights
- ✅ 3 Decisions
- ✅ 5 Prioritized Tasks with impact/effort (1-5), owner, due
- ✅ Risks
- ✅ Next Actions

## API Endpoint
`POST /api/sprint/generate`

Request: `{ packType: "lead"|"content"|"report", input: SprintInput }`
Response: `{ ok, packType, data, qa: { score, blockingIssues[] }, raw? }`

Schema validation is fail-closed. If validation fails, returns 422 with error details and `raw` in dev mode only.
