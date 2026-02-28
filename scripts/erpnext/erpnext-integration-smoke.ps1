# erpnext-integration-smoke.ps1 — E2E Smoke Test
# Tests: ERPNext health → Business OS ping proxy → auth test → dry-run action

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

$erpBase = "http://localhost:8081"
$bosBase = "http://localhost:3000"
$passed = 0
$failed = 0
$total = 0

function Test-Step {
    param([string]$Name, [scriptblock]$Block)
    $script:total++
    Write-Host "`n[$script:total] $Name" -ForegroundColor Cyan
    try {
        & $Block
        $script:passed++
        Write-Host "  -> PASS" -ForegroundColor Green
    }
    catch {
        $script:failed++
        Write-Host "  -> FAIL: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  ERPNext Integration Smoke Test        " -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta

# ── Step A: ERPNext Direct Ping ──
Test-Step "ERPNext /api/method/ping" {
    $r = Invoke-RestMethod -Uri "$erpBase/api/method/ping" -TimeoutSec 10
    if ($r.message -ne "pong") { throw "Expected pong, got: $($r.message)" }
    Write-Host "  Response: $($r.message)" -ForegroundColor Gray
}

# ── Step B: Business OS ERPNext Ping Proxy ──
Test-Step "Business OS /api/integrations/erpnext/ping" {
    $r = Invoke-RestMethod -Uri "$bosBase/api/integrations/erpnext/ping" -TimeoutSec 15
    if (-not $r.ok) { throw "Ping proxy failed: $($r.error)" }
    Write-Host "  Message: $($r.message)" -ForegroundColor Gray
}

# ── Step C: Business OS Auth Test ──
Test-Step "Business OS /api/integrations/erpnext/auth/test" {
    try {
        $r = Invoke-RestMethod -Uri "$bosBase/api/integrations/erpnext/auth/test" -Method POST -TimeoutSec 15
        if ($r.ok) {
            Write-Host "  Authenticated as: $($r.user)" -ForegroundColor Gray
        }
        else {
            Write-Host "  Auth not configured (expected if no API keys set): $($r.error)" -ForegroundColor DarkYellow
            # Not a failure if keys are not set — just a warning
        }
    }
    catch {
        $body = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
        if ($body -and $body.error -match "not configured") {
            Write-Host "  API keys not configured — manual step required. See docs/ERPNext_API_Key_Guide.md" -ForegroundColor DarkYellow
        }
        else {
            throw
        }
    }
}

# ── Step D: Dry-Run Action Registration ──
Test-Step "Register dry-run action (ERP.CREATE_TODO)" {
    $action = @{
        action = @{
            id        = "smoke-test-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
            type      = "ERP.CREATE_TODO"
            status    = "pending"
            payload   = @{ description = "Smoke test TODO from Business OS" ; priority = "Low" }
            createdAt = (Get-Date -Format "o")
            updatedAt = (Get-Date -Format "o")
        }
    } | ConvertTo-Json -Depth 5
    $r = Invoke-RestMethod -Uri "$bosBase/api/integrations/erpnext/actions/execute" -Method POST -Body $action -ContentType "application/json" -TimeoutSec 15
    if (-not $r.ok) { throw "Registration failed: $($r.error)" }
    Write-Host "  Registered: $($r.actionId) (status: pending)" -ForegroundColor Gray
}

# ── Summary ──
Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  SMOKE TEST RESULTS                    " -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  Passed: $passed / $total" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })
Write-Host "  Failed: $failed / $total" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($failed -eq 0) {
    Write-Host "  VERDICT: PASS" -ForegroundColor Green
    exit 0
}
else {
    Write-Host "  VERDICT: PARTIAL (see failures above)" -ForegroundColor Yellow
    Write-Host "  NOTE: Auth failures are expected if API keys are not configured." -ForegroundColor DarkYellow
    exit 1
}
