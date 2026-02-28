# Staging Runbook — Business OS

## Prerequisites

- Node.js 18+
- Docker (for ERPNext, optional)
- Playwright browsers: `npx playwright install`

## Environment Template

Create `.env.local` from `.env.local.example`:

```env
# AI (optional for lean release)
AI_PROVIDER=openai
OPENAI_API_KEY=<your-key>
OPENAI_MODEL=gpt-4o-mini

# ERPNext (optional — graceful fail if missing)
ERPNEXT_BASE_URL=http://localhost:8081
ERPNEXT_API_KEY=<your-key>
ERPNEXT_API_SECRET=<your-secret>
ERPNEXT_SITE=local.site
```

> ⚠ Never commit `.env.local`. It is in `.gitignore`.

## Deploy to Staging

```powershell
# 1. Build
npm ci
npm run build

# 2. Run gate
npm run gate:all:prod

# 3. Start staging server
npm run start -- -p 3005

# 4. Verify
curl http://localhost:3005/api/integrations/erpnext/auth/test
```

## Verify Checklist

- [ ] `gate:all:prod` → Exit 0
- [ ] Homepage loads at /
- [ ] `/virtual/approvals` UI renders
- [ ] `/virtual/packs` shows pack cards
- [ ] ERP auth/test returns `{configured: true}` or `{configured: false}`
- [ ] No secrets in browser Network tab
