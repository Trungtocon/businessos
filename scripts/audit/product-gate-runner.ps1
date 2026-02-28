<#
.SYNOPSIS
Business OS Product Gate Runner V4.5 (Lean V1)

.DESCRIPTION
Runs the Next.js production build and executes the Playwright smoke tests to evaluate Lean V1 time-to-value readiness.
#>

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " PRODUCT READINESS GATE (LEAN V1 V4.5)  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] Verifying Application Build..." -ForegroundColor Yellow
$Env:NEXT_TELEMETRY_DISABLED = "1"
npm run build
$buildExit = $LASTEXITCODE
if ($buildExit -ne 0) {
    Write-Host "❌ Production build failed. NO-GO." -ForegroundColor Red
    exit $buildExit
}
Write-Host "✅ Production build passed." -ForegroundColor Green
Write-Host ""

Write-Host "[2/2] Running Product Gate Playwright Specs..." -ForegroundColor Yellow
Write-Host "(Note: Expecting failures due to missing UI features noted in gap analysis)" -ForegroundColor DarkGray

npx playwright test scripts/uat/product-gate-v4-5.spec.ts
$pwExit = $LASTEXITCODE

Write-Host "========================================" -ForegroundColor Cyan
if ($pwExit -ne 0) {
    Write-Host " ❌ PRODUCT GATE FAILED (NO-GO) " -ForegroundColor Red
    Write-Host " Review docs/PRODUCT_GATE_V4_5.md for details." -ForegroundColor Gray
}
else {
    Write-Host " ✅ PRODUCT GATE PASSED (GO) " -ForegroundColor Green
}
Write-Host "========================================" -ForegroundColor Cyan

# We don't exit with $pwExit immediately so we can let CI scripts continue, 
# but for the sake of the gate, it's a NO-GO.
exit $pwExit
