<#
.SYNOPSIS
Business OS Comprehensive Audit Runner V4.4

.DESCRIPTION
Runs the full suite of static analysis and validation scripts for the Business OS application.
Includes:
1. Static code linting (if enabled)
2. Type checking
3. Navigation routing integrity (nav-validate)
4. Production build test

.EXAMPLE
.\audit-runner.ps1
#>

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " BUSINESS OS FULL AUDIT RUNNER (V4.4) " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Navigation Registration Validation
Write-Host "[1/4] Running Navigation Validation..." -ForegroundColor Yellow
npx tsx scripts/nav/nav-validate.ts
$navExit = $LASTEXITCODE
if ($navExit -ne 0) {
    Write-Host "❌ Navigation validation failed." -ForegroundColor Red
    exit $navExit
}
Write-Host "✅ Navigation validation passed." -ForegroundColor Green
Write-Host ""

# 2. Type Checking Validations (tsc)
Write-Host "[2/4] Running TypeScript Compiler Checks..." -ForegroundColor Yellow
npx tsc --noEmit
$tscExit = $LASTEXITCODE
if ($tscExit -ne 0) {
    Write-Host "❌ Type checking failed." -ForegroundColor Red
    exit $tscExit
}
Write-Host "✅ Type checking passed." -ForegroundColor Green
Write-Host ""

# 3. Code Linting (Next.js Lint)
Write-Host "[3/4] Running Next.js Lint..." -ForegroundColor Yellow
npm run lint --if-present
$lintExit = $LASTEXITCODE
if ($lintExit -ne 0) {
    Write-Host "⚠️ Linting warnings or errors detected (Continuing...)" -ForegroundColor DarkYellow
}
else {
    Write-Host "✅ Linting passed." -ForegroundColor Green
}
Write-Host ""

# 4. Production Build Test
Write-Host "[4/4] Running Production Build Test..." -ForegroundColor Yellow
$Env:NEXT_TELEMETRY_DISABLED = "1"
npm run build
$buildExit = $LASTEXITCODE
if ($buildExit -ne 0) {
    Write-Host "❌ Production build failed." -ForegroundColor Red
    exit $buildExit
}
Write-Host "✅ Production build passed." -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " 🎉 ALL GATES PASSED. SYSTEM IS STABLE. " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
exit 0
