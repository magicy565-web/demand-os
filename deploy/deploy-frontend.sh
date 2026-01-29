#!/bin/bash
#############################################
# Demand OS - 前端部署脚本
# 在服务器上执行此脚本部署前端
#############################################

set -e

PROJECT_DIR="/var/www/demand-os"
WEB_DIR="$PROJECT_DIR/web"

echo "======================================"
echo "  Demand OS - 前端部署"
echo "======================================"

cd $WEB_DIR

echo "[1/4] 安装依赖..."
npm install

echo "[2/4] 构建生产版本..."
npm run build

echo "[3/4] 配置 PM2..."
pm2 delete demand-os-web 2>/dev/null || true
pm2 start npm --name "demand-os-web" -- start
pm2 save

echo "[4/4] 检查状态..."
pm2 status demand-os-web

echo ""
echo "======================================"
echo "  部署完成!"
echo "======================================"
echo "前端地址: https://demand.cnsubscribe.xyz"
echo ""
