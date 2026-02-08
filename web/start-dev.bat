@echo off
REM Showrooms预订系统 - Windows快速启动脚本

echo ======================================
echo Demand-OS Showrooms预订系统
echo ======================================
echo.

REM 检查Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 未找到Node.js，请先安装Node.js
    echo 下载地址: https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js版本: %NODE_VERSION%
echo.

REM 进入web目录
cd /d "%~dp0"

REM 检查依赖
echo 检查项目依赖...
if not exist "node_modules" (
    echo 安装依赖...
    call npm install
)

echo.
echo ======================================
echo 启动开发服务器...
echo ======================================
echo.
echo ✓ 本地地址: http://localhost:3000
echo ✓ 网络地址: http://0.0.0.0:3000
echo.
echo 📋 测试页面: http://localhost:3000/showrooms
echo.
echo 按 Ctrl+C 停止服务器
echo.

REM 启动开发服务器
call npm run dev

pause
