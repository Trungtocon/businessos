# UAT Evidence Index — V3.0.1

| Route | Provider | Screenshot Path | Notes |
|---|---|---|---|
| `/classic/briefing` | OpenAI | `docs/evidence/v3.0.1/openai/classic_briefing.png` | FAB visible, AI button present |
| `/freelancer/workspace` | OpenAI | `docs/evidence/v3.0.1/openai/workspace.png` | 3-column, AI sidebar active |
| `/freelancer/submit` | OpenAI | `docs/evidence/v3.0.1/openai/submit.png` | Modal + Copilot FAB |
| `/classic/briefing` | Gemini | `docs/evidence/v3.0.1/gemini/briefing.png` | AI Auto-fill, FAB present |
| `/freelancer/workspace` | Gemini | `docs/evidence/v3.0.1/gemini/workspace.png` | AI sidebar "Creative Partner" |
| `/freelancer/submit` | Gemini | `docs/evidence/v3.0.1/gemini/submit.png` | Modal + Copilot icon |

## API Parity Evidence

| Module | Provider | HTTP | Latency | Schema | File |
|---|---|---|---|---|---|
| brief | OpenAI | 200 | 10.1s | ✅ Valid | `docs/PROVIDER_PARITY_RAW_V3_0_1.json` |
| draft | OpenAI | 200 | 2.9s | ✅ Valid | — |
| qa | OpenAI | 200 | 4.9s | ✅ Valid | — |
| brief | Gemini | 200 | 15.2s | ✅ Valid | `docs/PROVIDER_PARITY_RAW_V3_0_1.json` |
| draft | Gemini | 200 | 0.5s | ✅ Valid | — |
| qa | Gemini | 200 | 0.6s | ✅ Valid | — |

## Browser Recordings

| Provider | Recording | Path |
|---|---|---|
| OpenAI | Classic briefing flow | `openai_classic_briefing` |
| OpenAI | Workspace flow | `openai_workspace_r3` |
| OpenAI | Submit flow | `openai_submit_r3` |
| Gemini | Briefing flow | `gemini_briefing` |
| Gemini | Workspace flow | `gemini_workspace` |
| Gemini | Submit flow | `gemini_submit` |
