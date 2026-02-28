# Rate-Limit Hardening — V3.0.1

## Problem
Gemini API returns HTTP 429 (RESOURCE_EXHAUSTED) under free-tier quota. V2.9 used fixed 1s retry delay with MAX_RETRIES=1, causing unnecessary API hammering.

## Changes

### `provider.gemini.ts`
| Parameter | Before (V2.9) | After (V3.0.1) |
|---|---|---|
| MAX_RETRIES | 1 | **2** |
| Retry delay | Fixed 1,000ms | **Exponential: 2s × 2^attempt + jitter** |
| Cooldown | None | **90s in-memory cooldown after 429** |
| Rate-limit detection | Status 429 only | **429 + RESOURCE_EXHAUSTED + quota regex** |

### Backoff Formula
```
delay = BASE_DELAY_MS × 2^attempt + random(0, BASE_DELAY_MS / 2)
```
- Attempt 1: 4s + 0–1s jitter = 4–5s
- Attempt 2: 8s + 0–1s jitter = 8–9s

### Cooldown Mechanism
- Module-level `cooldownUntil` timestamp
- On 429 → set `cooldownUntil = now + 90s`
- On entry → if `now < cooldownUntil`, throw immediately (forces mock fallback, zero wasted API calls)
- On success → clear cooldown (`cooldownUntil = 0`)

### New Audit Events (`audit.ts`)
| Event | When |
|---|---|
| `provider_rate_limited` | 429 detected, retry/cooldown active |
| `provider_retry_exhausted` | All retries failed |
| `provider_fallback_mock_used` | Fallback to mock with `reason: rate_limited\|provider_error` |

### `ai.service.ts`
- Rate-limit detection via regex on error message
- `provider_fallback_mock_used` replaces generic `provider_fallback_used` with reason field

## Verification
- `npm run build` → exit 0, 86.9 kB shared JS
- 0 server module leaks to client
- OpenAI parity: 100% PASS
- Gemini parity: 100% PASS
