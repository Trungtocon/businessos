# V3.1 Staging — Browser Smoke Checklist

## Prerequisites
- Staging running at `STAGING_BASE_URL` (default: `http://localhost:3000`)
- Browser: Chrome/Edge with Dev Tools open (Console tab)

---

## Matrix 1: Copilot OFF (`NEXT_PUBLIC_AI_COPILOT_ENABLED=false`)

| # | Route | Check | Expected | Screenshot Name |
|---|-------|-------|----------|-----------------|
| 1 | `/classic/projects/proj-1/task/task-1` (C11) | AI Copilot button | Hidden / not rendered | `c11_copilot_off.png` |
| 2 | `/freelancer/workspace` (F03) | AI Copilot button | Hidden / not rendered | `f03_copilot_off.png` |
| 3 | `/classic/projects/proj-1/task/task-1/submit` (F04) | QA Gate banner | No QA check runs | `f04_copilot_off.png` |
| 4 | Any page | Console errors | No JS errors | `console_copilot_off.png` |

## Matrix 2: Copilot ON (`NEXT_PUBLIC_AI_COPILOT_ENABLED=true`)

| # | Route | Check | Expected | Screenshot Name |
|---|-------|-------|----------|-----------------|
| 5 | `/classic/projects/proj-1/task/task-1` (C11) | AI Copilot button | Visible, clickable | `c11_copilot_on.png` |
| 6 | `/freelancer/workspace` (F03) | AI Copilot button | Visible, clickable | `f03_copilot_on.png` |
| 7 | `/classic/projects/proj-1/task/task-1/submit` (F04) | Submit → QA Gate | QA check runs before submit | `f04_copilot_on.png` |
| 8 | C11 → Click AI button | Drawer opens | Drawer slides in with module options | `c11_drawer_open.png` |
| 9 | Any page | Console `[AUDIT]` entries | Audit events logged | `console_audit_events.png` |

## Toggle Procedure
1. Edit `.env.local`: set `NEXT_PUBLIC_AI_COPILOT_ENABLED=true`
2. Restart dev server (`Ctrl+C` → `npm run dev`)
3. Hard refresh browser (`Ctrl+Shift+R`)

## Screenshot Storage
Save all screenshots to: `docs/evidence/v3.1/browser/`
