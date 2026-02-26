# PostgreSQL Setup Script for Windows PowerShell
# Update the password below with your actual PostgreSQL password

$PGPASSWORD = "p9qgp2lq2"  # <-- CHANGE THIS TO YOUR PASSWORD
$POSTGRES_PATH = "C:\Program Files\PostgreSQL\18\bin"
$PGHOST = "localhost"
$PGUSER = "postgres"

# Add PostgreSQL to PATH
$env:Path += ";$POSTGRES_PATH"
$env:PGPASSWORD = $PGPASSWORD

Write-Host "============================================"
Write-Host "PostgreSQL Database Setup"
Write-Host "============================================"
Write-Host ""

# Create database
Write-Host "Creating vaux_db database..."
& "$POSTGRES_PATH\psql.exe" -U $PGUSER -h $PGHOST -c "CREATE DATABASE vaux_db;" 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Database created successfully" -ForegroundColor Green
} else {
    Write-Host "[INFO] Database might already exist" -ForegroundColor Yellow
}

Write-Host ""

# Verify database
Write-Host "Verifying vaux_db connection..."
& "$POSTGRES_PATH\psql.exe" -U $PGUSER -h $PGHOST -d vaux_db -c "SELECT 'Connection successful!';" 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] vaux_db is ready to use!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Could not connect to vaux_db" -ForegroundColor Red
}

Write-Host ""
Write-Host "Update your application.properties with:" -ForegroundColor Cyan
Write-Host "spring.datasource.password=$PGPASSWORD"
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
