# Runbook — Business OS Release

## 1. Run All Gates

```powershell
cd E:\bussines_os
npm run gate:all:prod
```

This runs: build → gate:prod → nav:validate → uat:packs:prod → uat:e2e:prod

**Expected:** Exit 0, 8/8 E2E tests pass.

## 2. Enable ERPNext

1. Start ERPNext Docker:
   ```powershell
   npm run erpnext:up
   ```
2. Generate API keys: ERPNext → User → Administrator → API Access → Generate Keys
3. Add to `.env.local`:
   ```
   ERPNEXT_BASE_URL=http://localhost:8081
   ERPNEXT_API_KEY=<your-key>
   ERPNEXT_API_SECRET=<your-secret>
   ERPNEXT_SITE=local.site
   ```
4. Verify:
   ```powershell
   npm run build
   npm run uat:erpnext
   ```

## 3. Rollback

```powershell
# Revert to previous release
git checkout main
npm ci
npm run build

# If ERPNext issues: restart Docker
docker compose -p erpnext down
npm run erpnext:up
```

## 4. Troubleshooting

| Issue | Fix |
|-------|-----|
| Gate fails with "route drift not found" | Ensure `docs/NAV_CANONICAL_MAP_S1.json` exists |
| ERPNext CSS broken | `docker compose -p erpnext down && npm run erpnext:up` |
| E2E tests timeout | Increase timeout in `playwright.prod.config.ts` |
| `provider_key_missing` | Check `.env.local` has all 3 ERPNEXT_* vars |
