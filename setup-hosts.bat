@echo off
:: 修改 Windows Hosts 文件以支持本地开发
:: 需要以管理员身份运行此脚本

echo.
echo ======================================
echo 修改 Windows Hosts 文件
echo ======================================
echo.

setlocal enabledelayedexpansion

set "hostFile=C:\Windows\System32\drivers\etc\hosts"

:: 检查是否以管理员身份运行
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [错误] 需要以管理员身份运行此脚本！
    echo 请右键点击此脚本，选择"以管理员身份运行"
    pause
    exit /b 1
)

echo [检查中] 检查当前 hosts 文件...
type "%hostFile%" | findstr "saas.cnsubscribe" >nul
if %errorLevel% equ 0 (
    echo [提示] 已存在 cnsubscribe 配置
    echo.
    echo 当前配置:
    echo ----------
    type "%hostFile%" | findstr "cnsubscribe"
    echo ----------
) else (
    echo [提示] 未找到 cnsubscribe 配置，将添加
)

echo.
echo [添加中] 添加以下条目到 hosts 文件:
echo   127.0.0.1  saas.cnsubscribe.com
echo   127.0.0.1  saas.cnsubscribe.xyz
echo   127.0.0.1  admin.cnsubscribe.xyz
echo.

:: 添加新的条目
(
    echo.
    echo # Demand OS Development Environment
    echo 127.0.0.1  saas.cnsubscribe.com
    echo 127.0.0.1  saas.cnsubscribe.xyz
    echo 127.0.0.1  admin.cnsubscribe.xyz
) >> "%hostFile%"

echo [完成] hosts 文件已更新！
echo.
echo [刷新中] 刷新 DNS 缓存...
ipconfig /flushdns
echo.
echo [验证中] 验证配置...
type "%hostFile%" | findstr "cnsubscribe"
echo.
echo ======================================
echo 完成！你现在可以使用以下域名访问:
echo   http://saas.cnsubscribe.com:3000
echo   http://saas.cnsubscribe.xyz:3000
echo   http://admin.cnsubscribe.xyz:3000
echo.
echo 确保前端开发服务器运行在 localhost:3000
echo ======================================
echo.
pause
