# Portfolio Frontend Restart Script
# This will restart the Next.js development server

Write-Host "🔄 Restarting Next.js Frontend..." -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
Set-Location "d:\comuputer language material\NewDownLoads\Interview\frontend"

# Kill any existing node processes running on port 3000
Write-Host "Stopping any existing dev server..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
foreach ($proc in $processes) {
    Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 2

# Start the dev server
Write-Host "Starting fresh dev server..." -ForegroundColor Green
npm run dev
