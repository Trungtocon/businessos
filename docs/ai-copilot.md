# AI Copilot — V1 Skeleton Documentation

## Overview
The AI Copilot is a feature-flagged assistant integrated into key BusinessOS screens.
In V1, it provides **skeleton UI only** — no real AI provider calls.

## Feature Flag
```env
NEXT_PUBLIC_AI_COPILOT_ENABLED=false  # Set to "true" to enable
```

## Architecture

### Files
| File | Purpose |
|------|---------|
| `src/modules/ai-copilot/store/aiCopilotStore.ts` | Zustand store: flag, drawer state, active tab |
| `src/modules/ai-copilot/ui/AICopilotDrawer.tsx` | Drawer component (4 tabs) + floating button |

### Drawer Tabs
1. **Brief** — AI-generated task brief summary
2. **Outline** — Auto-structured outline from requirements
3. **Draft** — AI-assisted first draft generation
4. **QA** — Quality assurance checklist & validation

### Integration Points
| Screen | Route | Integration |
|--------|-------|-------------|
| C11 Task Detail | `/classic/projects/[id]/task/[taskId]` | FAB button + Drawer |
| F03 Workspace | `/freelancer/workspace` | FAB button (has built-in AI panel) |
| F04 Submit Work | `/classic/projects/[id]/task/[taskId]/submit` | QA Gate banner |

## QA Gate (F04 Submit)
When `NEXT_PUBLIC_AI_COPILOT_ENABLED=true`, a banner appears on the submit form:
> "QA Gate sẽ chạy ở đây"

In V2, this will block submission until AI validation passes.

## V2 Roadmap
- [ ] Real AI provider integration (OpenAI/Gemini)
- [ ] Brief auto-generation from project context
- [ ] Outline creation from uploaded assets
- [ ] Draft generation with revision history
- [ ] QA Gate with blocking logic
- [ ] Streaming responses in drawer
