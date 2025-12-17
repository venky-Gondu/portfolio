# Write-Host "Starting Portfolio Website..." -ForegroundColor Green

# Start Backend
Write-Host "`n🚀 Starting Flask Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\comuputer language material\NewDownLoads\Interview\backend'; python app.py"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🚀 Starting Next.js Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\comuputer language material\NewDownLoads\Interview\frontend'; npm run dev"

Write-Host "`n✅ Both servers are starting..." -ForegroundColor Green
Write-Host "`nFrontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Admin: http://localhost:3000/admin/login" -ForegroundColor Yellow
