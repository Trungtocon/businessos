# erpnext-local-health.ps1 - ERPNext Health Check with Retries
# Usage: powershell -ExecutionPolicy Bypass -File scripts/erpnext/erpnext-local-health.ps1

Set-StrictMode -Version Latest

$port = 8081
$maxAttempts = 30
$backoffSec = 10
$url = "http://localhost:${port}/api/method/ping"

Write-Host ''
Write-Host '========================================' -ForegroundColor Cyan
Write-Host '  ERPNext Health Check                  ' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ''
Write-Host "[INFO] Target: $url" -ForegroundColor Gray
Write-Host ''

for ($i = 1; $i -le $maxAttempts; $i++) {
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        if ($resp.StatusCode -eq 200) {
            $body = $resp.Content | ConvertFrom-Json
            if ($body.message -eq 'pong') {
                Write-Host '[PASS] ERPNext is healthy - ping returned 200 pong' -ForegroundColor Green
                Write-Host ''
                exit 0
            }
        }
        Write-Host "[$i/$maxAttempts] Unexpected response: $($resp.StatusCode)" -ForegroundColor Yellow
    }
    catch {
        $msg = $_.Exception.Message
        if ($msg -match '404') {
            Write-Host "[$i/$maxAttempts] 404 - site routing not resolved yet..." -ForegroundColor Yellow
        }
        elseif ($msg -match '502') {
            Write-Host "[$i/$maxAttempts] 502 - backend still starting..." -ForegroundColor Yellow
        }
        else {
            Write-Host "[$i/$maxAttempts] $msg" -ForegroundColor Yellow
        }
    }
    Start-Sleep -Seconds $backoffSec
}

Write-Host ''
Write-Host '[FAIL] ERPNext did not become healthy in time.' -ForegroundColor Red
Write-Host '  Try: npm run erpnext:logs' -ForegroundColor Yellow
exit 1
