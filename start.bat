@echo off
setlocal enabledelayedexpansion

node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo  [ERROR] Node.js is not installed or not on PATH.
    echo  Download from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Find a free port starting at 3000, without touching whatever else is
:: listening on a busy one -- never force-kill another process.
set PORT=3000
:port_check
netstat -ano | findstr ":!PORT! " | findstr "LISTENING" >nul 2>&1
if not errorlevel 1 (
    if !PORT! geq 3010 (
        echo.
        echo  [ERROR] Ports 3000-3010 are all in use. Free one and retry,
        echo  or set PORT yourself: set PORT=8080 ^&^& node server.js
        echo.
        pause
        exit /b 1
    )
    set /a PORT+=1
    goto port_check
)

echo.
echo  Starting IT Roles Library on port !PORT!...
echo.

:: Open browser after a short delay (fires and forgets)
start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:!PORT!"

node "%~dp0server.js"
