Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ProjectName = "erpnext"
$TargetFolder = "E:\erpnext_local\frappe_docker"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ERPNext Local - RESET                 " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "WARNING: This will destroy all containers, volumes, and database data for the ERPNext local setup." -ForegroundColor Red
Write-Host ""

$Confirmation = Read-Host "Are you sure you want to proceed? Type 'yes' to confirm"
if ($Confirmation -cne "yes") {
    Write-Host "Reset aborted." -ForegroundColor Yellow
    exit 0
}

if (-Not (Test-Path $TargetFolder)) {
    Write-Host "Target folder '$TargetFolder' does not exist. Nothing to reset." -ForegroundColor Yellow
    exit 0
}

Set-Location $TargetFolder

Write-Host "Stopping and removing containers and volumes..." -ForegroundColor Cyan
try {
    $composeArgs = @(
        "compose", "--project-name", $ProjectName,
        "-f", "compose.yaml",
        "-f", "overrides/compose.mariadb.yaml",
        "-f", "overrides/compose.redis.yaml",
        "-f", "overrides/compose.noproxy.yaml",
        "down", "-v"
    )
    $process = Start-Process -FilePath "docker" -ArgumentList $composeArgs -PassThru -Wait -NoNewWindow
    if ($process.ExitCode -ne 0) { throw "Docker compose down failed." }
    Write-Host "Reset complete. All data destroyed." -ForegroundColor Green
}
catch {
    Write-Host "Error during reset. Ensure Docker Desktop is running and try again." -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
    exit 1
}
