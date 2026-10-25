@echo off
cd /d "%~dp0"
echo Higital lokaal starten. Open daarna http://localhost:5173
call npm.cmd run dev
if errorlevel 1 pause
