<#
    V3.1 Staging Evidence Pack Builder
    Creates evidence directory structure and indexes all evidence files.
    Usage: .\scripts\staging-evidence-pack.ps1
#>

$ErrorActionPreference = "Continue"
$rootDir = Join-Path $PSScriptRoot ".." "docs" "evidence" "v3.1"

Write-Host "`n=== V3.1 Evidence Pack Builder ===" -ForegroundColor Cyan

# Create directory structure
$dirs = @("openai", "gemini", "browser", "audit")
foreach ($d in $dirs) {
    $path = Join-Path $rootDir $d
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "  Created: $path" -ForegroundColor Green
    }
    else {
        Write-Host "  Exists:  $path" -ForegroundColor Gray
    }
}

# Index all evidence files
Write-Host "`n--- Evidence Index ---" -ForegroundColor Yellow
$allFiles = Get-ChildItem -Path $rootDir -Recurse -File | Sort-Object FullName
if ($allFiles.Count -eq 0) {
    Write-Host "  No evidence files found yet. Run smoke tests first." -ForegroundColor Yellow
}
else {
    $index = @()
    foreach ($f in $allFiles) {
        $relPath = $f.FullName.Replace($rootDir, "").TrimStart("\", "/")
        $entry = @{
            file     = $relPath
            size     = "$([math]::Round($f.Length / 1KB, 1)) KB"
            modified = $f.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
        }
        $index += $entry
        Write-Host ("  {0,-50} {1,10} {2}" -f $relPath, $entry.size, $entry.modified) -ForegroundColor White
    }

    # Write index JSON
    $indexFile = Join-Path $rootDir "evidence_index.json"
    $index | ConvertTo-Json -Depth 3 | Out-File -FilePath $indexFile -Encoding utf8
    Write-Host "`n  Index written: $indexFile" -ForegroundColor Green
}

Write-Host "`n=== Evidence Pack Complete ===" -ForegroundColor Cyan
Write-Host "Total files: $($allFiles.Count)" -ForegroundColor White
Write-Host ""
