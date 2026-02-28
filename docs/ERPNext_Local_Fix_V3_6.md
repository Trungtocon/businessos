# ERPNext Local Fix V3.6 — Site Routing

## Problem

`http://localhost:8081/api/method/ping` returned **404 "localhost does not exist"** after site creation.

## Root Causes

### 1. Nginx `FRAPPE_SITE_NAME_HEADER` set to `$host`

The default `compose.yaml` uses `FRAPPE_SITE_NAME_HEADER: ${FRAPPE_SITE_NAME_HEADER:-$$host}`, which passes the browser's `Host` header (`localhost`) as the Frappe site name. Since the site directory is `sites/local.site` (not `sites/localhost`), Frappe returns 404.

**Fix:** Set `FRAPPE_SITE_NAME_HEADER=local.site` in `.env` so nginx always sends `local.site` as the site header.

### 2. MariaDB user permissions missing

After fixing the 404, a **500 Internal Server Error** appeared. The auto-generated DB user (`_122f05bbaacad151`) lacked `GRANT` permissions on its database.

**Fix:** `Fix-SiteRouting` now reads `site_config.json`, extracts `db_name`/`db_password`, and runs `GRANT ALL PRIVILEGES` automatically.

## What Changed

| File | Change |
|------|--------|
| `erpnext-local-up.ps1` | Added `FRAPPE_SITE_NAME_HEADER` to `.env` generation |
| `erpnext-local-up.ps1` | Added `--force-recreate` to `docker compose up` |
| `erpnext-local-up.ps1` | New `Fix-SiteRouting` function: writes `domains.json`+`currentsite.txt` via python, grants DB permissions, restarts backend |
| `erpnext-local-up.ps1` | Updated `Print-Summary` with fallback URL and hosts file guidance |

## Verification

```powershell
# Ping test — expect 200 OK
Invoke-WebRequest -Uri "http://localhost:8081/api/method/ping" -UseBasicParsing
# Output: StatusCode: 200, Content: {"message":"pong"}
```

## Fallback

If `localhost:8081` still returns 404 after a fresh run, add to `C:\Windows\System32\drivers\etc\hosts`:
```
127.0.0.1  local.site
```
Then access: `http://local.site:8081`
