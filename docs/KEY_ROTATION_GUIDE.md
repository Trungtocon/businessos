# Key Rotation Guide — BusinessOS

## Why Rotate

`.env.local` with real API keys was previously committed in git history. Although the history has been scrubbed with `git filter-branch`, **all exposed keys should be rotated** as a security best practice.

## Keys to Rotate

### 1. OpenAI API Key
- **Dashboard:** https://platform.openai.com/api-keys
- **Steps:** Create new key → copy → update `.env.local` → delete old key
- **Var:** `OPENAI_API_KEY`

### 2. Google Gemini API Key
- **Dashboard:** https://aistudio.google.com/app/apikey
- **Steps:** Create new key → copy → update `.env.local` → revoke old key
- **Var:** `GEMINI_API_KEY`

### 3. ERPNext API Key + Secret
- **Dashboard:** ERPNext → User → Administrator → API Access
- **Steps:** Generate new keys → copy both → update `.env.local`
- **Vars:** `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`

## After Rotation

```powershell
# Verify new keys work
npm run build
npm run gate:all:prod
# ERPNext ping
curl http://localhost:8081/api/method/ping -H "Authorization: token NEW_KEY:NEW_SECRET"
```

> ⚠ **Never commit `.env.local`** — it is in `.gitignore`.
