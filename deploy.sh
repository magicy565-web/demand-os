#!/bin/bash

# 部署脚本 - 将本地代码推送到生产服务器并部署

set -e

echo "=========================================="
echo "开始部署到生产环境"
echo "=========================================="

PROD_SERVER="47.99.205.136"
PROD_USER="root"
PROD_DIR="/var/www/demand-os"

echo ""
echo "1. 构建前端项目..."
cd "$(dirname "$0")"
cd web

# 清理旧的 build
rm -rf .next out

# 构建
npm run build

echo "✓ 前端构建完成"
echo ""

echo "2. 压缩构建文件..."
cd ..

# 压缩 .next 文件夹供部署
tar -czf next_build.tar.gz -C web .next .env.production 2>/dev/null || true

echo "✓ 构建文件已压缩"
echo ""

echo "3. 上传到服务器..."
rsync -avz -e ssh next_build.tar.gz "$PROD_USER@$PROD_SERVER:/tmp/" 

echo "✓ 文件已上传"
echo ""

echo "4. 在服务器上进行部署..."
ssh "$PROD_USER@$PROD_SERVER" bash <<'REMOTECMDS'
set -e
echo "正在服务器上更新代码..."

cd /var/www/demand-os

# 备份当前的 .next 文件夹
if [ -d ".next" ]; then
    mv .next .next.backup.$(date +%s)
fi

# 解压新的构建
tar -xzf /tmp/next_build.tar.gz

# 重启 PM2 应用
echo "重启前端服务..."
pm2 restart demand-frontend || pm2 start ecosystem.config.js --name demand-frontend

# 重启 nginx
echo "重启 nginx..."
systemctl reload nginx

# 验证
echo "等待 30 秒以验证服务..."
sleep 30

if curl -s -I http://localhost:3000 | grep -q "200\|302"; then
    echo "✓ 前端服务运行正常"
else
    echo "✗ 前端服务可能有问题，请检查日志"
    pm2 logs demand-frontend | tail -20
fi

REMOTECMDS

echo ""
echo "=========================================="
echo "✓ 部署完成！"
echo "前端地址: https://demand.cnsubscribe.xyz"
echo "=========================================="
