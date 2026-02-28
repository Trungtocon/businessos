# ERPNext API Key & Integration User Guide

## Overview
ERPNext uses **token-based authentication** for API access. You need to create an **Integration User** and generate API key + secret.

## Steps

### 1. Access ERPNext Admin Panel
Open: **http://localhost:8081**
Login: `Administrator` / `admin`

### 2. Create API User
1. Go to **Setup → User** (or URL: `/app/user`)
2. Click **+ Add User**
3. Fill in:
   - Email: `api@business-os.local`
   - First Name: `Business OS`
   - Send welcome email: **uncheck**
4. Save, then set password (e.g. `apiuser123`)

### 3. Assign Roles
On the user page, under **Roles**:
- Add: `All`, `System Manager` (for dev — restrict in production)

### 4. Generate API Key & Secret
1. On the user page, click **Settings** tab
2. Scroll to **API Access**
3. Click **Generate Keys**
4. **Copy the API Secret immediately** (shown only once)
5. The API Key is visible on the page

### 5. Configure Business OS
Add to `E:\bussines_os\.env.local`:
```env
ERPNEXT_API_KEY=<your-api-key>
ERPNEXT_API_SECRET=<your-api-secret>
```

### 6. Verify
```powershell
# Restart Business OS dev server, then:
Invoke-RestMethod -Uri "http://localhost:3000/api/integrations/erpnext/auth/test" -Method POST
# Expected: { ok: true, user: "api@business-os.local" }
```

## Security Notes
- **Never commit** `.env.local` to git (already in `.gitignore`)
- In production, use a dedicated user with **minimal roles**
- Rotate keys periodically via ERPNext UI
