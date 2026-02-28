# History Scrub Report — v1.0.0-lean

**Date:** 2026-02-27
**Method:** `git filter-branch --index-filter`

## What Was Scrubbed

| File | Content | Commits Affected |
|------|---------|-----------------|
| `.env.local` | Real API keys (OpenAI, Gemini, ERPNext) | All 4 commits |

## Scrub Commands Executed

```powershell
# 1. Remove .env.local from all commits
git filter-branch --force --index-filter `
  "git rm --cached --ignore-unmatch .env.local" `
  --prune-empty -- --all

# 2. Delete old tag, recreate on new commit
git tag -d v1.0.0-lean
git tag -a v1.0.0-lean -m "Release v1.0.0-lean (history scrubbed)"

# 3. Purge old refs + gc
git update-ref -d refs/original/refs/heads/release/v3.1-staging-gate
git update-ref -d refs/original/refs/tags/v1.0.0-lean
git reflog expire --expire=now --all
git gc --prune=now
```

## Verification

```powershell
# Must return EMPTY (no commits touching .env.local)
git log --all --oneline -- .env.local

# Must return 0 matches
git log --all -p | Select-String 'sk-proj' | Measure-Object
```

## Result

| Check | Status |
|-------|--------|
| `.env.local` in commits | ✅ Removed |
| `refs/original/` | ✅ Purged |
| `sk-proj` in diffs | ✅ 0 matches |
| `AIzaSy` in diffs | ✅ 0 matches |
| Tag `v1.0.0-lean` | ✅ Recreated on new HEAD |

## Commit Hash Changes

| Before Scrub | After Scrub | Message |
|-------------|-------------|---------|
| `5bc8f769` | (rewritten) | feat: V3.1 staging release gate |
| `ab6426b9` | (rewritten) | docs: V3.1 staging gate FULL GO |
| `4bc44ae5` | `140c7d68` | chore(repo): stop tracking .env.local |
| `5b0a3043` | `8e801756` | chore(release): v1.0.0-lean |

> **Important:** If this repo was EVER pushed to a remote before scrubbing, the old commits with secrets may still exist on that remote. You must `git push --force` and verify.
