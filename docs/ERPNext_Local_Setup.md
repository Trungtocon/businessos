# ERPNext Local Setup

This folder contains automated PowerShell scripts for setting up, managing, and resetting a local instance of ERPNext via Docker Desktop.

## Prerequisites

- **OS**: Windows 10/11
- **Docker Desktop**: Must be installed and running.
  - Linux containers must be enabled.
  - WSL2 backend or Hyper-V backend enabled.
- **Git** (optional, but recommended): Used to download the Docker configuration from Frappe.

## Quick Start

You can run these scripts via npm from the overarching `bussines_os` folder, or directly via PowerShell.

```bash
# To start the ERPNext setup
npm run erpnext:up

# To view logs of running containers
npm run erpnext:logs

# To completely destroy the local setup and delete all data
npm run erpnext:reset
```

## Running Directly from PowerShell

If you prefer calling PowerShell directly from the root of the repository:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\erpnext\erpnext-local-up.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\erpnext\erpnext-local-logs.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\erpnext\erpnext-local-reset.ps1
```

## Typical Flow

1. **Up**: The `erpnext-local-up.ps1` script will:
   - Check if Docker and Git are working.
   - Clone the official `frappe_docker` repository to `E:\erpnext_local\frappe_docker`.
   - Setup a `.env` file pointing to ERPNext v15.
   - Start all the required Docker containers (MariaDB, Redis, Backend, Frontend, Websocket).
   - Create the default site `local.site` if it doesn't already exist.
   - Verify health and wait for the site to come online.
   - Output a READY SUMMARY to the console containing your URL, Admin credentials, and container status.

2. **Work**: Develop locally using the printed credentials. Use `npm run erpnext:logs` to tail logs.

3. **Reset**: When finished, or if you need to wipe everything and start fresh, run the `erpnext-local-reset.ps1`. This will prompt for confirmation before deleting containers and site data.

## Common Issues & Troubleshooting

### Docker Pipe Not Found / Unreachable Engine
- **Symptom**: `Cannot connect to Docker engine. Start Docker Desktop / switch to Linux containers / enable WSL2 engine.`
- **Fix**: Open Docker Desktop and wait for it to fully start. Ensure it is set to use Linux containers instead of Windows containers. Ensure either WSL2 or Hyper-V is enabled in Docker Desktop settings.

### Site Creation Timed Out
- **Symptom**: Container health checks pass, but the site creation hangs.
- **Fix**: Sometimes downloading the images and starting mariadb for the first time takes a few minutes. If it failed, simply run `npm run erpnext:up` again. The scripts are idempotent and will resume from where they left off.

### Port Conflicts
- **Symptom**: Failed to bind port 8080.
- **Fix**: Make sure you don't have another application or local web server running on port 8080. Change the port mapping if necessary.
