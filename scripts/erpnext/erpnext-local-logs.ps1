Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ProjectName = "erpnext"
$TargetFolder = "E:\erpnext_local\frappe_docker"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ERPNext Local - LOGS                  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (-Not (Test-Path $TargetFolder)) {
    Write-Host "Target folder '$TargetFolder' does not exist. ERPNext is likely not installed." -ForegroundColor Red
    exit 1
}

Set-Location $TargetFolder

Write-Host "Tailing logs for ERPNext containers. Press Ctrl+C to exit." -ForegroundColor Cyan
try {
    docker compose --project-name $ProjectName logs -f
}
catch {
    Write-Host "Error tailing logs. Ensure Docker Desktop is running." -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
    exit 1
}
