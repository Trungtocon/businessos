# Release Push Proof — v1.0.0-lean

**Date:** 2026-02-28 09:10
**Remote:** `https://github.com/Trungtocon/businessos.git`

## Local State ✅

| Check | Result |
|-------|--------|
| Branch | `release/v3.1-staging-gate` |
| HEAD | `1c1ec6b4` |
| Tag | `v1.0.0-lean` → HEAD ✅ |
| Git status | Clean ✅ |
| History scrubbed | .env.local + .next + node_modules removed ✅ |
| `gate:all:prod` | EXIT 0 (29/29 PASS) ✅ |

## Push Results

| Action | Result | Exit |
|--------|--------|------|
| `git push origin release/v1.0.0-lean` | ⚠ exit 0 but not visible on remote | 0 |
| `git push origin v1.0.0-lean` | ❌ GH013 repo rule violation | 1 |
| `git push --force-with-lease release/v3.1-staging-gate` | ❌ GH013 repo rule violation | 1 |

## Root Cause

GitHub repository rulesets (`GH013`) are blocking:
1. **Force pushes** to `release/*` branches
2. **Tag creation** via push

## Fix Required (User Action)

### Option A: Disable Rulesets Temporarily
1. Go to: https://github.com/Trungtocon/businessos/settings/rules
2. Find the rule blocking `release/**` and tags
3. Either **delete** or **disable** the ruleset
4. Then re-run push commands:

```powershell
git push --force-with-lease origin release/v3.1-staging-gate
git push origin v1.0.0-lean
```

5. Re-enable rulesets after push

### Option B: Push to Unprotected Branch
```powershell
git push origin release/v3.1-staging-gate:refs/heads/main
git push origin v1.0.0-lean
```

### Option C: Create Release via GitHub UI
1. Go to: https://github.com/Trungtocon/businessos/releases/new
2. Tag: `v1.0.0-lean`
3. Target: `release/v1.0.0-lean` (or `main`)
4. Upload evidence ZIP as attachment

## Verify After Push

```powershell
git ls-remote --heads origin
git ls-remote --tags origin v1.0.0-lean
```
