# Collaborator Reset Guide — After History Rewrite

## Why This Guide Exists

The repository history was rewritten to remove accidentally committed secrets (`.env.local` with real API keys). All commit hashes have changed. **All collaborators must reset their local repos.**

## Reset Steps

```powershell
# 1. Fetch the rewritten history
git fetch --all

# 2. Checkout the release branch
git checkout release/v3.1-staging-gate

# 3. Hard-reset to match remote (discards local changes!)
git reset --hard origin/release/v3.1-staging-gate

# 4. Clean untracked files
git clean -fd

# 5. Verify
git log -3 --oneline
# Should show commit 8ba2c9b8 at HEAD
```

## If You Have Local Branches

```powershell
# For each local branch based on old history:
git checkout your-branch
git rebase origin/release/v3.1-staging-gate
# Resolve any conflicts
```

## What Changed

- `.env.local` removed from ALL commits (was accidentally tracked)
- `.next/` (586 files) removed from tracking
- `node_modules/` removed from tracking
- `.gitignore` updated to prevent future leaks

## Important

- **Rotate any keys** you copied from the old `.env.local`
- Never commit `.env.local` — use `.env.local.example` as template
- See `docs/KEY_ROTATION_GUIDE.md` for key rotation steps
