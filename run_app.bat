@echo off
echo ==========================================
echo Starting MindCare AI - Social Anxiety Detection
echo ==========================================

echo [INFO] Running from: %~dp0

rem Move to script directory
pushd "%~dp0"

rem Optional: activate a local virtualenv if present
if exist ".venv\Scripts\activate.bat" (
	echo [INFO] Activating .venv
	call ".venv\Scripts\activate.bat"
)

echo [1/3] Starting Backend Server (FastAPI)...
start "Backend Server" cmd /k "cd /d %~dp0 & python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"

timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend Server (Vite)...
start "Frontend Server" cmd /k "cd /d %~dp0frontend & npm run dev"

timeout /t 5 /nobreak >nul

echo [3/3] Opening Application in Browser...
start http://localhost:5173

echo.
echo Application is running!
echo Backend API: http://localhost:8000
echo Frontend UI: http://localhost:5173
echo.
echo Press any key to close this window (servers will keep running)...
popd
pause >nul
