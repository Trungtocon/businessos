<#
.SYNOPSIS
Sets up and starts ERPNext locally via Docker Desktop.

.DESCRIPTION
This script verifies system prerequisites, clones the frappe_docker repository,
configures it, starts the necessary Docker containers, sets up an ERPNext site
if one does not already exist, and performs health checks.

.NOTES
Requirements:
- Windows 10/11
- Docker Desktop (with WSL2 or Hyper-V backends, Linux containers enabled)
- Git (optional, will download zip if missing)
#>
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Vars = @{
    TargetFolder   = "E:\erpnext_local\frappe_docker"
    RepoUrl        = "https://github.com/frappe/frappe_docker.git"
    ErpnextVersion = "v15"
    SiteName       = "local.site"
    AdminPass      = "admin"
    DbPass         = "admin"
    ProjectName    = "erpnext"
    ProfileName    = "erpnext"
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ERPNext Local - SETUP & STARTUP       " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ------------------------------------------------------------------------
# Helper Functions
# ------------------------------------------------------------------------

Function Get-Timestamp {
    return (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
}

Function Log-Info {
    param([string]$Message)
    Write-Host "[$(Get-Timestamp)] [INFO] $Message" -ForegroundColor Blue
}

Function Log-Success {
    param([string]$Message)
    Write-Host "[$(Get-Timestamp)] [SUCCESS] $Message" -ForegroundColor Green
}

Function Log-Error {
    param([string]$Message)
    Write-Host "[$(Get-Timestamp)] [ERROR] $Message" -ForegroundColor Red
}

Function Throw-Error {
    param([string]$Message)
    Log-Error $Message
    throw $Message
}

Function Check-Docker {
    Log-Info "Verifying Docker prerequisite..."
    try {
        $dockerVer = docker --version 2>&1
        if ($LASTEXITCODE -ne 0) { throw "Docker not found in PATH." }
        Log-Success "Docker available: $dockerVer"
    }
    catch {
        Throw-Error "Docker is not installed or not in PATH. Please install Docker Desktop."
    }

    try {
        $dcVer = docker compose version 2>&1
        if ($LASTEXITCODE -ne 0) { throw "Docker Compose not found." }
        Log-Success "Docker Compose available: $dcVer"
    }
    catch {
        Throw-Error "Docker Compose v2 is not available."
    }

    Log-Info "Checking Docker engine connection..."
    try {
        $null = docker ps 2>&1
        if ($LASTEXITCODE -ne 0) { throw "Docker engine unreachable" }
        Log-Success "Docker engine is reachable."
    }
    catch {
        Throw-Error "Cannot connect to Docker engine. Start Docker Desktop / switch to Linux containers / enable WSL2 engine."
    }
}

Function Ensure-Repo {
    Log-Info "Checking for frappe_docker folder at $($Vars.TargetFolder)..."
    if (-Not (Test-Path $Vars.TargetFolder)) {
        Log-Info "Creating $($Vars.TargetFolder) and cloning repository..."
        try {
            # Try to use Git
            $gitVer = git --version 2>&1
            if ($LASTEXITCODE -eq 0) {
                # Git is available
                git clone --depth 1 $Vars.RepoUrl $Vars.TargetFolder
                if ($LASTEXITCODE -ne 0) { throw "Git clone failed." }
                Log-Success "Successfully cloned frappe_docker via Git."
            }
            else { throw "Git not found." }
        }
        catch {
            Log-Info "Git not available or failed. Attempting direct zip download..."
            $parentFolder = Split-Path -Path $Vars.TargetFolder
            if (-Not (Test-Path $parentFolder)) { New-Item -ItemType Directory -Path $parentFolder | Out-Null }
            $zipPath = Join-Path $parentFolder "frappe_docker.zip"
            Invoke-WebRequest -Uri "https://github.com/frappe/frappe_docker/archive/refs/heads/main.zip" -OutFile $zipPath
            Expand-Archive -Path $zipPath -DestinationPath $parentFolder -Force
            Rename-Item -Path (Join-Path $parentFolder "frappe_docker-main") -NewName (Split-Path -Leaf $Vars.TargetFolder)
            Remove-Item -Path $zipPath -Force
            Log-Success "Successfully downloaded and extracted frappe_docker."
        }
    }
    else {
        Log-Info "Folder exists. We will use the existing folder."
        # If git repo exists, try to pull latest safely
        if (Test-Path (Join-Path $Vars.TargetFolder ".git")) {
            Log-Info "Updating git repository..."
            $prevDir = Get-Location
            Set-Location $Vars.TargetFolder
            try { git pull origin main 2>&1 | Out-Null } catch { Log-Info "Git pull skipped (offline or uncommitted changes)." }
            Set-Location $prevDir
        }
    }
}

Function Generate-Env {
    Log-Info "Generating .env configuration..."
    Set-Location $Vars.TargetFolder
    
    # Check if a custom proxy port is defined, if so use it, else default to 8080.
    # We will just write a standard env based on frappe_docker recommendations.
    $envContent = @"
ERPNEXT_VERSION=$($Vars.ErpnextVersion)
FRAPPE_VERSION=$($Vars.ErpnextVersion)
DB_PASSWORD=$($Vars.DbPass)
HTTP_PUBLISH_PORT=8081
FRAPPE_SITE_NAME_HEADER=$($Vars.SiteName)
"@
    Set-Content -Path ".env" -Value $envContent -Force
    # Copy example compose if default doesn't exist. Actually frappe_docker uses compose.yaml
    if (-Not (Test-Path "compose.yaml") -and (Test-Path "pwd.yml")) {
        Copy-Item -Path "pwd.yml" -Destination "compose.yaml" -Force
    }
    Log-Success ".env file created with ERPNEXT_VERSION=$($Vars.ErpnextVersion)"
}

Function Compose-Up {
    Log-Info "Starting Docker containers..."
    Set-Location $Vars.TargetFolder
    try {
        $composeArgs = @(
            "compose", "--project-name", $Vars.ProjectName,
            "-f", "compose.yaml",
            "-f", "overrides/compose.mariadb.yaml",
            "-f", "overrides/compose.redis.yaml",
            "-f", "overrides/compose.noproxy.yaml",
            "up", "-d", "--force-recreate"
        )
        $process = Start-Process -FilePath "docker" -ArgumentList $composeArgs -PassThru -Wait -NoNewWindow
        if ($process.ExitCode -ne 0) { throw "Docker compose up failed with exit code $($process.ExitCode)." }
        Log-Success "Containers started successfully."
    }
    catch {
        Throw-Error "Failed to start docker containers. Error: $_"
    }

    Log-Info "Waiting for services to initialize (up to 2 minutes)..."
    $maxWait = 120
    $waited = 0
    $backendReady = $false
    while ($waited -lt $maxWait) {
        $status = docker compose --project-name $Vars.ProjectName ps --format "{{.Service}}:{{.State}}"
        if ($status -match "backend:running") {
            $backendReady = $true
            break
        }
        Start-Sleep -Seconds 5
        $waited += 5
    }
    if (-Not $backendReady) {
        Log-Error "Backend container did not become ready within 2 minutes."
    }
    else {
        Log-Success "Backend container is running."
    }
}

Function Ensure-Site {
    # Temporarily allow non-terminating errors — docker writes diagnostics to
    # stderr which PowerShell converts to terminating errors under EA=Stop.
    $prevEA = $ErrorActionPreference
    $ErrorActionPreference = "Continue"

    Log-Info "Checking if site '$($Vars.SiteName)' exists..."
    Set-Location $Vars.TargetFolder

    # Robust filesystem check: login shell ensures env is loaded.
    $null = & docker compose --project-name $Vars.ProjectName exec -T backend bash -lc "test -d sites/$($Vars.SiteName)" 2>&1
    $siteExists = ($LASTEXITCODE -eq 0)

    if ($siteExists) {
        Log-Success "Site '$($Vars.SiteName)' already exists. Skipping site creation."
    }
    else {
        Log-Info "Site '$($Vars.SiteName)' does not exist. Creating..."
        Write-Host "[$(Get-Timestamp)] [RUN] docker compose exec backend bench new-site $($Vars.SiteName) ..."
        & docker compose --project-name $Vars.ProjectName exec -T backend `
            bench new-site $Vars.SiteName `
            --mariadb-root-password $Vars.DbPass `
            --admin-password $Vars.AdminPass `
            --install-app erpnext 2>&1 | ForEach-Object { Write-Host $_ }
        if ($LASTEXITCODE -ne 0) {
            $ErrorActionPreference = $prevEA
            Throw-Error "Bench new-site failed with exit code $LASTEXITCODE."
        }
        Log-Success "Site '$($Vars.SiteName)' created successfully."
    }

    # Always run migrate + disable maintenance mode (safe & idempotent)
    Log-Info "Running migrations and disabling maintenance mode..."

    & docker compose --project-name $Vars.ProjectName exec -T backend `
        bench --site $Vars.SiteName migrate 2>&1 | ForEach-Object { Write-Host $_ }
    if ($LASTEXITCODE -ne 0) {
        Log-Error "Migrate returned exit code $LASTEXITCODE (non-fatal, continuing)."
    }

    & docker compose --project-name $Vars.ProjectName exec -T backend `
        bench --site $Vars.SiteName set-maintenance-mode off 2>&1 | ForEach-Object { Write-Host $_ }
    if ($LASTEXITCODE -ne 0) {
        Log-Error "set-maintenance-mode off returned exit code $LASTEXITCODE (non-fatal, continuing)."
    }

    $ErrorActionPreference = $prevEA
    Log-Success "Site post-setup completed."
}

Function Health-Check {
    Log-Info "Performing health checks..."
    Set-Location $Vars.TargetFolder
    
    # Confirm containers running
    $containers = docker compose --project-name $Vars.ProjectName ps --format '{{.Service}}: {{.State}}' 2>&1
    if (-Not $containers) {
        Log-Error "No containers found running for project $($Vars.ProjectName)."
    }
    else {
        Log-Success "Containers running:`n$($containers -join "`n")"
    }

    # Find listening port for frontend
    $frontendPort = "8080" # Default frappe_docker maps frontend 8080 to host via noproxy
    try {
        $portOutput = docker compose --project-name $Vars.ProjectName port frontend 8080 2>&1
        if ($LASTEXITCODE -eq 0 -and $portOutput -match ":(\d+)$") {
            $frontendPort = $matches[1]
        }
    }
    catch {}

    Log-Info "Polling HTTP frontend on port $frontendPort (up to 2 minutes)..."
    $maxPoll = 24
    $waited = 0
    $httpReady = $false
    while ($waited -lt $maxPoll) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:$frontendPort/login" -UseBasicParsing -ErrorAction Ignore
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
                $httpReady = $true
                break
            }
        }
        catch {
            # Ignore connection refused
        }
        Start-Sleep -Seconds 5
        $waited++
    }

    if ($httpReady) {
        Log-Success "HTTP Health Check passed! ERPNext login page is responding."
        $script:frontendPort = $frontendPort
    }
    else {
        Log-Error "HTTP Health Check failed. Could not reach http://localhost:$frontendPort - It may still be initializing."
        $script:frontendPort = $frontendPort
    }
}

Function Fix-SiteRouting {
    $prevEA = $ErrorActionPreference
    $ErrorActionPreference = "Continue"

    Log-Info "Configuring site routing (domains.json + currentsite.txt)..."
    Set-Location $Vars.TargetFolder

    # Write domains.json via python (no heredoc — avoids PowerShell/bash quoting issues)
    $pyDomains = "import json,os; d={'localhost':'$($Vars.SiteName)','127.0.0.1':'$($Vars.SiteName)'}; f=open('sites/domains.json','w'); json.dump(d,f,indent=2); f.close(); os.chmod('sites/domains.json',0o644)"
    & docker compose --project-name $Vars.ProjectName exec -T backend python3 -c $pyDomains 2>&1 | ForEach-Object { Write-Host $_ }

    # Write currentsite.txt via python
    $pyCurrent = "f=open('sites/currentsite.txt','w'); f.write('$($Vars.SiteName)\n'); f.close(); import os; os.chmod('sites/currentsite.txt',0o644)"
    & docker compose --project-name $Vars.ProjectName exec -T backend python3 -c $pyCurrent 2>&1 | ForEach-Object { Write-Host $_ }

    # Fix host_name in common_site_config.json (must be string URL, not dict)
    $pyHostFix = "import json; f='sites/common_site_config.json'; d=json.load(open(f)); d['host_name']='http://localhost:8081'; d['default_site']='$($Vars.SiteName)'; json.dump(d,open(f,'w'),indent=2)"
    & docker compose --project-name $Vars.ProjectName exec -T backend python3 -c $pyHostFix 2>&1 | ForEach-Object { Write-Host $_ }

    # Verify
    $verifyOut = & docker compose --project-name $Vars.ProjectName exec -T backend bash -lc "cat sites/currentsite.txt" 2>&1
    if ($verifyOut -match $Vars.SiteName) {
        Log-Success "Site routing files written and verified."
    }
    else {
        Log-Error "Site routing verification failed."
    }

    # Grant DB user permissions via python temp script (avoids PowerShell backtick escaping)
    Log-Info "Ensuring DB user permissions..."
    $tmpFile = Join-Path $env:TEMP "erpnext_grant_db.py"
    $pyLines = @(
        "import json, pymysql"
        "cfg = json.load(open('sites/$($Vars.SiteName)/site_config.json'))"
        "common = json.load(open('sites/common_site_config.json'))"
        "db_name = cfg['db_name']"
        "db_pass = cfg['db_password']"
        "db_host = common.get('db_host', 'db')"
        "conn = pymysql.connect(host=db_host, user='root', password='$($Vars.DbPass)', charset='utf8mb4')"
        "cur = conn.cursor()"
        "bt = chr(96)"
        "sql = 'GRANT ALL PRIVILEGES ON ' + bt + db_name + bt + '.* TO %s@%s IDENTIFIED BY %s'"
        "cur.execute(sql, (db_name, chr(37), db_pass))"
        "cur.execute('FLUSH PRIVILEGES')"
        "conn.close()"
        "print('Granted permissions for ' + db_name)"
    )
    [IO.File]::WriteAllText($tmpFile, ($pyLines -join "`n"))
    $containerName = (docker compose --project-name $Vars.ProjectName ps -q backend 2>&1) | Select-Object -First 1
    & docker cp $tmpFile "${containerName}:/tmp/_grant_db.py" 2>&1 | ForEach-Object { Write-Host $_ }
    & docker compose --project-name $Vars.ProjectName exec -T backend /home/frappe/frappe-bench/env/bin/python3 /tmp/_grant_db.py 2>&1 | ForEach-Object { Write-Host $_ }
    if ($LASTEXITCODE -eq 0) {
        Log-Success "DB permissions granted."
    }
    else {
        Log-Error "DB grant failed (non-fatal, continuing)."
    }
    Remove-Item $tmpFile -ErrorAction SilentlyContinue

    # Restart backend to pick up DB fix
    Log-Info "Restarting backend..."
    & docker compose --project-name $Vars.ProjectName restart backend 2>&1 | ForEach-Object { Write-Host $_ }

    $ErrorActionPreference = $prevEA
}

Function Print-Summary {
    Log-Info "Generating Ready Summary..."
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "          READY SUMMARY                 " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  ERPNext URL     : http://localhost:$script:frontendPort" -ForegroundColor Cyan
    Write-Host "  Fallback URL    : http://local.site:$script:frontendPort (requires hosts file)" -ForegroundColor Cyan
    Write-Host "  Site Name       : $($Vars.SiteName)" -ForegroundColor Cyan
    Write-Host "  Admin Login     : Administrator" -ForegroundColor Cyan
    Write-Host "  Admin Password  : $($Vars.AdminPass)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  BusinessOS Environment Variables to set:" -ForegroundColor Magenta
    Write-Host "    ERPNEXT_BASE_URL=http://localhost:$script:frontendPort" -ForegroundColor DarkCyan
    Write-Host "    ERPNEXT_SITE=$($Vars.SiteName)" -ForegroundColor DarkCyan
    Write-Host ""
    Write-Host "  Container Status:" -ForegroundColor Yellow
    docker compose --project-name $Vars.ProjectName ps --format '{{.Name}} - {{.State}} ({{.Status}})' 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkYellow }
    Write-Host ""
    Write-Host "  NOTE: If http://localhost:$script:frontendPort returns 404, add to C:\Windows\System32\drivers\etc\hosts:" -ForegroundColor Yellow
    Write-Host "    127.0.0.1  local.site" -ForegroundColor Yellow
    Write-Host "  Then use: http://local.site:$script:frontendPort" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
}

# ------------------------------------------------------------------------
# Main Execution
# ------------------------------------------------------------------------

try {
    Check-Docker
    Ensure-Repo
    Generate-Env
    Compose-Up
    Ensure-Site
    Fix-SiteRouting
    Health-Check
    Print-Summary
    exit 0
}
catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  SETUP FAILED                          " -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Error details:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "To view logs, run: .\scripts\erpnext\erpnext-local-logs.ps1" -ForegroundColor Yellow
    exit 1
}
