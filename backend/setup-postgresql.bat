@echo off
REM PostgreSQL Setup Script for Windows
REM Update the password below with your actual PostgreSQL password

set PGPASSWORD=postgres
set POSTGRES_PATH=C:\Program Files\PostgreSQL\18\bin

REM Add PostgreSQL to PATH
set PATH=%PATH%;%POSTGRES_PATH%

echo ============================================
echo PostgreSQL Database Setup
echo ============================================
echo.

REM Create database
echo Creating vaux_db database...
"%POSTGRES_PATH%\psql.exe" -U postgres -h localhost -c "CREATE DATABASE vaux_db;" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Database created successfully
) else (
    echo [INFO] Database might already exist (checking...)
)

REM Verify database was created
echo.
echo Verifying database...
"%POSTGRES_PATH%\psql.exe" -U postgres -h localhost -d vaux_db -c "SELECT 'Connection successful!'" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] vaux_db is ready to use
) else (
    echo [ERROR] Could not connect to vaux_db
)

echo.
echo Setup complete! Update your application.properties with:
echo spring.datasource.password=postgres
echo.
pause
