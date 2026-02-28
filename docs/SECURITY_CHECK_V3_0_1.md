# Security Check — V3.0.1

**Date**: 2026-02-16

## Server/Client Boundary

| Check | Result |
|---|---|
| `"use client"` in provider files | ✅ 0 found |
| Static SDK imports in client code | ✅ 0 (dynamic `import()` only) |
| `NEXT_PUBLIC_` on API keys | ✅ 0 (only feature flags use NEXT_PUBLIC_) |
| Shared JS bundle size | 86.9 kB (no increase) |

## Key Safety

| Check | Result |
|---|---|
| API keys in console.log | ✅ 0 |
| API keys in audit events | ✅ 0 (audit logs provider name only) |
| API keys in parity JSON output | ✅ Redacted by `redactSecrets()` |
| `.env.local` in `.gitignore` | ✅ Yes |

## Provider Security

| Check | Result |
|---|---|
| Cooldown prevents API hammering | ✅ 90s cooldown after 429 |
| AbortSignal timeout on all calls | ✅ 30s |
| Error messages sanitized (no keys) | ✅ Only status codes logged |

## Build Verification

```
npm run build → exit 0
Next.js 14.2.0
Shared JS: 86.9 kB
```

**Verdict**: ✅ PASS — no security regressions
