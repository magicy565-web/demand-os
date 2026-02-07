#!/usr/bin/env pwsh
# 项目清理和性能优化脚本

param(
    [switch]$Full = $false
)

$ErrorActionPreference = "SilentlyContinue"

Write-Host @"
╔════════════════════════════════════════════════════════════╗
║         🧹 项目清理和性能优化脚本                           ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# 获取初始大小
$beforeWeb = (Get-ChildItem web -Recurse -File | Measure-Object -Property Length -Sum).Sum
$beforeTotal = (Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum

Write-Host "`n📊 优化前大小："
Write-Host "  • web/: $([math]::Round($beforeWeb/1MB, 2)) MB"
Write-Host "  • 总计: $([math]::Round($beforeTotal/1MB, 2)) MB"

Write-Host "`n🔄 执行清理步骤...`n"

# 1. 删除 .next 缓存
Write-Host "1️⃣  清理 .next 构建缓存..." -ForegroundColor Yellow
Remove-Item web/.next -Recurse -Force
Write-Host "   ✅ 完成" -ForegroundColor Green

# 2. 清理 .turbo 缓存
Write-Host "2️⃣  清理 .turbo 缓存..." -ForegroundColor Yellow
Remove-Item web/.turbo -Recurse -Force
Remove-Item .turbo -Recurse -Force
Write-Host "   ✅ 完成" -ForegroundColor Green

# 3. 清理构建输出
Write-Host "3️⃣  清理构建输出..." -ForegroundColor Yellow
Remove-Item web/out -Recurse -Force
Remove-Item web/dist -Recurse -Force
Remove-Item dist -Recurse -Force
Write-Host "   ✅ 完成" -ForegroundColor Green

# 4. 清理临时文件
Write-Host "4️⃣  清理临时文件..." -ForegroundColor Yellow
Remove-Item web/temp-* -Recurse -Force
Remove-Item web/.temp -Recurse -Force
Remove-Item temp -Recurse -Force
Remove-Item .temp -Recurse -Force
Write-Host "   ✅ 完成" -ForegroundColor Green

# 5. 如果指定了 -Full，清理 node_modules
if ($Full) {
    Write-Host "5️⃣  清理 node_modules (完全模式)..." -ForegroundColor Yellow
    Remove-Item web/node_modules -Recurse -Force
    Remove-Item node_modules -Recurse -Force
    Write-Host "   ⏳ 重新安装依赖..."
    
    cd web
    pnpm install
    cd ..
    
    Write-Host "   ✅ 完成" -ForegroundColor Green
}

# 获取优化后的大小
$afterWeb = (Get-ChildItem web -Recurse -File | Measure-Object -Property Length -Sum).Sum
$afterTotal = (Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum

Write-Host "`n📊 优化后大小："
Write-Host "  • web/: $([math]::Round($afterWeb/1MB, 2)) MB"
Write-Host "  • 总计: $([math]::Round($afterTotal/1MB, 2)) MB"

$freedWeb = [math]::Round(($beforeWeb - $afterWeb)/1MB, 2)
$freedTotal = [math]::Round(($beforeTotal - $afterTotal)/1MB, 2)

Write-Host "`n💾 释放空间："
Write-Host "  • web/: -$freedWeb MB"
Write-Host "  • 总计: -$freedTotal MB"

if ($freedTotal -gt 500) {
    Write-Host "`n✨ 优化效果显著！性能应该有明显改善。" -ForegroundColor Green
} elseif ($freedTotal -gt 100) {
    Write-Host "`n✓ 优化完成，项目应该更流畅了。" -ForegroundColor Green
} else {
    Write-Host "`nℹ️  项目已经相对干净。" -ForegroundColor Yellow
}

Write-Host "`n💡 建议："
Write-Host "  • 定期运行此脚本保持项目清洁"
Write-Host "  • 使用 -Full 参数彻底清理和重建"
Write-Host "  • 查看 docs/PERFORMANCE_OPTIMIZATION.md 了解更多"

Write-Host "`n╔════════════════════════════════════════════════════════════╗"
Write-Host "║              ✅ 清理完成！                                   ║"
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green
