# 修改 Windows Hosts 文件以支持本地开发
# 需要以管理员身份运行

$hostFile = "C:\Windows\System32\drivers\etc\hosts"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "修改 Windows Hosts 文件" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# 检查管理员权限
$currentPrincipal = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "[错误] 需要以管理员身份运行此脚本！" -ForegroundColor Red
    Write-Host "请用以下命令重新运行:" -ForegroundColor Yellow
    Write-Host "powershell -ExecutionPolicy Bypass -File setup-hosts.ps1" -ForegroundColor Yellow
    exit 1
}

# 检查当前配置
Write-Host "[检查中] 检查当前 hosts 文件..." -ForegroundColor Yellow
$hostContent = Get-Content $hostFile -ErrorAction SilentlyContinue
$hasCnsubscribe = $hostContent | Select-String "saas.cnsubscribe" -ErrorAction SilentlyContinue

if ($hasCnsubscribe) {
    Write-Host "[提示] 已存在 cnsubscribe 配置" -ForegroundColor Green
    Write-Host ""
    Write-Host "当前配置:" -ForegroundColor Cyan
    Write-Host "----------" -ForegroundColor Cyan
    $hostContent | Select-String "cnsubscribe"
    Write-Host "----------" -ForegroundColor Cyan
} else {
    Write-Host "[提示] 未找到 cnsubscribe 配置，将添加" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[添加中] 添加以下条目到 hosts 文件:" -ForegroundColor Yellow
Write-Host "  127.0.0.1  saas.cnsubscribe.com" -ForegroundColor White
Write-Host "  127.0.0.1  saas.cnsubscribe.xyz" -ForegroundColor White
Write-Host "  127.0.0.1  admin.cnsubscribe.xyz" -ForegroundColor White
Write-Host ""

# 添加新条目
$newEntries = @"

# Demand OS Development Environment
127.0.0.1  saas.cnsubscribe.com
127.0.0.1  saas.cnsubscribe.xyz
127.0.0.1  admin.cnsubscribe.xyz
"@

try {
    Add-Content -Path $hostFile -Value $newEntries -ErrorAction Stop
    Write-Host "[完成] ✓ hosts 文件已更新！" -ForegroundColor Green
} catch {
    Write-Host "[错误] ✗ 无法写入 hosts 文件: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[刷新中] 刷新 DNS 缓存..." -ForegroundColor Yellow
ipconfig /flushdns | Out-Null
Write-Host "[完成] ✓ DNS 缓存已刷新" -ForegroundColor Green

Write-Host ""
Write-Host "[验证中] 验证配置..." -ForegroundColor Yellow
Write-Host ""
Get-Content $hostFile | Select-String "cnsubscribe"

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "完成！" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "你现在可以使用以下域名访问:" -ForegroundColor Green
Write-Host "  ✓ http://saas.cnsubscribe.com:3000" -ForegroundColor White
Write-Host "  ✓ http://saas.cnsubscribe.xyz:3000" -ForegroundColor White
Write-Host "  ✓ http://admin.cnsubscribe.xyz:3000" -ForegroundColor White
Write-Host ""
Write-Host "确保前端开发服务器运行在 localhost:3000:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
