@echo off
setlocal

node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo  [ERROR] Node.js is not installed or not on PATH.
    echo  Download from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Check if port 3000 is already in use and offer to free it
netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo.
    echo  [WARN] Port 3000 is already in use.
    echo  Attempting to stop existing process...
    for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
        taskkill /F /PID %%p >nul 2>&1
    )
    timeout /t 1 /nobreak >nul
)

echo.
echo  Starting IT Roles Library...
echo.

:: Open browser after a short delay (fires and forgets)
start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

node "%~dp0server.js"
