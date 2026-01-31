#!/bin/bash

# 快速部署脚本 - 推送最新前端到生产

set -e

echo "=========================================="
echo "快速部署最新前端到生产服务器"
echo "=========================================="

PROD_SERVER="47.99.205.136"
PROD_USER="root"
PROD_DIR="/var/www/demand-os"

echo ""
echo "1. 准备源代码..."
cd "$(dirname "$0")"

# 确保最新构建
cd web
echo "清理旧构建..."
rm -rf .next out

echo "✓ 准备完成"
echo ""

echo "2. 推送到服务器..."

# 使用 git push 推送代码
git push origin main

echo "✓ 代码已推送"
echo ""

echo "3. 在服务器上拉取最新代码..."

ssh "$PROD_USER@$PROD_SERVER" bash << 'REMOTECMDS'
set -e
echo "在服务器上..."
cd /var/www/demand-os

echo "拉取最新代码..."
git pull origin main

echo "安装依赖..."
cd web
npm install --production

echo "构建项目..."
npm run build

echo "重启应用..."
pm2 restart demand-frontend || pm2 start ecosystem.config.js --name demand-frontend

echo "重启 nginx..."
systemctl reload nginx

echo "✓ 部署完成！"
curl -s http://localhost:3000 > /dev/null && echo "✓ 服务正在运行" || echo "✗ 服务可能有问题"

REMOTECMDS

echo ""
echo "=========================================="
echo "✓ 生产环境已更新到最新版本！"
echo "前端地址: https://demand.cnsubscribe.xyz"
echo "=========================================="
