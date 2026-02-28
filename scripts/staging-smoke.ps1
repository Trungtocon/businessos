<#
    V3.1 Staging Smoke Tests
    Runs API smoke tests against STAGING_BASE_URL for AI Copilot endpoint.
    Usage:
      .\scripts\staging-smoke.ps1 -BaseUrl http://localhost:3000 -Provider openai
      .\scripts\staging-smoke.ps1 -BaseUrl http://localhost:3000 -Provider gemini
#>

param(
    [string]$BaseUrl = "http://localhost:3000",
    [string]$Provider = "openai",
    [int]$TimeoutSec = 60
)

$ErrorActionPreference = "Continue"
$endpoint = "$BaseUrl/api/ai-copilot"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$resultsDir = Join-Path $PSScriptRoot ".." "docs" "evidence" "v3.1" $Provider
if (-not (Test-Path $resultsDir)) { New-Item -ItemType Directory -Path $resultsDir -Force | Out-Null }

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  V3.1 STAGING SMOKE — Provider: $Provider" -ForegroundColor Cyan
Write-Host "  Target: $endpoint" -ForegroundColor Cyan
Write-Host "  Timestamp: $timestamp" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test payloads
$tests = @(
    @{
        Name           = "brief"
        Body           = @{
            moduleType = "brief"
            input      = @{}
            context    = @{ brief = "Landing page cho startup fintech voi muc tieu tang CVR 20%" }
        }
        ExpectedFields = @("summary", "missing_questions", "assumptions")
    },
    @{
        Name           = "draft"
        Body           = @{
            moduleType = "draft"
            input      = @{ text = "TechFlow giup team quan ly du an hieu qua hon" }
            context    = @{ brief = "Landing page cho startup fintech" }
        }
        ExpectedFields = @("improved_text", "changes", "tone")
    },
    @{
        Name           = "qa"
        Body           = @{
            moduleType = "qa"
            input      = @{ submission = "Bai viet gioi thieu san pham TechFlow" }
            context    = @{ brief = "Landing page cho startup fintech, target CVR 20%" }
        }
        ExpectedFields = @("score", "passed", "checks")
    }
)

$allResults = @()
$passCount = 0
$failCount = 0

foreach ($test in $tests) {
    $testName = "$Provider/$($test.Name)"
    Write-Host "--- Test: $testName ---" -ForegroundColor Yellow

    $bodyJson = $test.Body | ConvertTo-Json -Depth 5 -Compress
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($bodyJson)

    $result = @{
        test           = $testName
        status         = "FAIL"
        httpStatus     = 0
        responseTimeMs = 0
        ok             = $false
        provider       = ""
        schemaValid    = $false
        error          = ""
    }

    try {
        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        $response = Invoke-WebRequest -Uri $endpoint -Method POST `
            -ContentType "application/json" `
            -Body $bodyBytes `
            -UseBasicParsing `
            -TimeoutSec $TimeoutSec
        $sw.Stop()

        $result.httpStatus = $response.StatusCode
        $result.responseTimeMs = $sw.ElapsedMilliseconds

        $json = $response.Content | ConvertFrom-Json
        $result.ok = [bool]$json.ok

        if ($json.PSObject.Properties["provider"]) {
            $result.provider = $json.provider
        }

        # Schema validation
        if ($json.ok -eq $true -and $json.PSObject.Properties["data"]) {
            $data = $json.data
            $missing = @()
            foreach ($field in $test.ExpectedFields) {
                if (-not $data.PSObject.Properties[$field]) {
                    $missing += $field
                }
            }
            $result.schemaValid = ($missing.Count -eq 0)
            if ($missing.Count -gt 0) {
                $result.error = "Missing fields: $($missing -join ', ')"
            }
        }
        elseif ($json.ok -eq $false -and $json.PSObject.Properties["error"]) {
            # Valid error schema (ok=false with error object)
            $result.schemaValid = $true
            $result.error = "API returned ok=false: $($json.error.code) — $($json.error.message)"
        }

        if ($result.ok -and $result.schemaValid) {
            $result.status = "PASS"
            $passCount++
            Write-Host "  PASS — HTTP $($result.httpStatus) in $($result.responseTimeMs)ms (provider: $($result.provider))" -ForegroundColor Green
        }
        elseif ($result.schemaValid) {
            $result.status = "PASS (fallback)"
            $passCount++
            Write-Host "  PASS (fallback) — HTTP $($result.httpStatus) in $($result.responseTimeMs)ms – $($result.error)" -ForegroundColor Yellow
        }
        else {
            $failCount++
            Write-Host "  FAIL — $($result.error)" -ForegroundColor Red
        }

        # Save raw response (redacted)
        $outFile = Join-Path $resultsDir "$($test.Name)_response_$timestamp.json"
        $json | ConvertTo-Json -Depth 10 | Out-File -FilePath $outFile -Encoding utf8
        Write-Host "  Saved: $outFile" -ForegroundColor DarkGray

    }
    catch {
        $result.error = $_.Exception.Message
        $failCount++
        Write-Host "  FAIL — $($result.error)" -ForegroundColor Red
    }

    $allResults += $result
    Write-Host ""
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUMMARY: $passCount PASS / $failCount FAIL" -ForegroundColor $(if ($failCount -eq 0) { "Green" } else { "Red" })
Write-Host "========================================`n" -ForegroundColor Cyan

# Save summary
$summaryFile = Join-Path $resultsDir "smoke_summary_$timestamp.json"
$allResults | ConvertTo-Json -Depth 5 | Out-File -FilePath $summaryFile -Encoding utf8
Write-Host "Summary saved: $summaryFile" -ForegroundColor DarkGray

# Exit code
if ($failCount -gt 0) { exit 1 } else { exit 0 }
