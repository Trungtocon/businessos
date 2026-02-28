# Provider Smoke Tests — V2.8

## Prerequisites

```powershell
npm run dev   # Server must be running on http://localhost:3000
```

---

## Test 1: Mock Provider (default)

```powershell
# PowerShell
$body = '{"moduleType":"brief","input":{},"context":{"brief":"Test project"}}'
Invoke-RestMethod -Uri "http://localhost:3000/api/ai-copilot" -Method POST -ContentType "application/json" -Body $body | ConvertTo-Json -Depth 5
```

```bash
# bash
curl -s -X POST http://localhost:3000/api/ai-copilot \
  -H "Content-Type: application/json" \
  -d '{"moduleType":"brief","input":{},"context":{"brief":"Test project"}}' | jq .
```

**Expected**: `ok: true`, Vietnamese mock data, `provider: "mock"`.

---

## Test 2: OpenAI with Missing Key → Fallback

Set in `.env.local`:
```env
AI_PROVIDER=openai
OPENAI_API_KEY=
```

Restart dev server, then run Test 1 command again.

**Expected**: `ok: true`, mock data returned, console audit log shows `provider_key_missing`.

---

## Test 3: Gemini with Missing Key → Fallback

Set in `.env.local`:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=
```

Restart dev server, then run Test 1 command again.

**Expected**: `ok: true`, mock data returned, console audit log shows `provider_key_missing`.

---

## Test 4: All Four Module Types

```powershell
$modules = @("brief","outline","draft","qa")
foreach ($m in $modules) {
    $body = @{moduleType=$m; input=@{text="Test text"; submission="Test submission"}; context=@{brief="Test"}} | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "http://localhost:3000/api/ai-copilot" -Method POST -ContentType "application/json" -Body $body
    Write-Host "$m => ok=$($r.ok)"
}
```

**Expected**: All 4 return `ok: True`.

---

## Test 5: Build Verification

```powershell
npm run build
```

**Expected**: Exit code 0, no errors.
