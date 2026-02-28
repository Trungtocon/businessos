# Release Push Checklist — v1.0.0-lean

## Pre-Push Verification

- [x] `.env.local` NOT tracked (`git ls-files .env.local` → empty)
- [x] `.next/` NOT tracked (0 files)
- [x] `node_modules/` NOT tracked
- [x] `.gitignore` includes `.env.local`, `.env.*.local`, `.next/`
- [x] History scrubbed (`git log --all -- .env.local` → empty)
- [x] `gate:all:prod` → EXIT 0
- [x] Tag `v1.0.0-lean` exists
- [ ] Keys rotated (see `docs/KEY_ROTATION_GUIDE.md`)
- [ ] Remote added + pushed

## Push Commands

```powershell
# 1. Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_ORG/bussines_os.git

# 2. Push branch (force required after history rewrite)
git push --force origin release/v3.1-staging-gate

# 3. Push tag
git push origin v1.0.0-lean

# 4. Verify on GitHub
# - Check Actions tab: gate-all-prod workflow should trigger
# - Check no .env.local in any commit
# - Check tag v1.0.0-lean appears in Releases
```

## Post-Push Verification

```powershell
# Verify remote matches local
git log --oneline origin/release/v3.1-staging-gate
# Should show same 4 commits as local, NO .env.local
```

## If Previously Pushed (with secrets)

```powershell
# Force push to overwrite old history
git push --force origin release/v3.1-staging-gate
# Then: rotate ALL keys immediately (see KEY_ROTATION_GUIDE.md)
# Then: contact GitHub support to purge cached commits
```
