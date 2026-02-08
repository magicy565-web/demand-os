#!/bin/bash
# Showrooms预订系统 - 快速启动脚本

echo "======================================"
echo "Demand-OS Showrooms预订系统"
echo "======================================"
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未找到Node.js，请先安装Node.js"
    exit 1
fi

echo "✓ Node.js版本: $(node --version)"
echo ""

# 进入web目录
cd "$(dirname "$0")"

# 检查依赖
echo "检查项目依赖..."
if [ ! -d "node_modules" ]; then
    echo "安装依赖..."
    npm install
fi

echo ""
echo "======================================"
echo "启动开发服务器..."
echo "======================================"
echo ""
echo "✓ 本地地址: http://localhost:3000"
echo "✓ 网络地址: http://0.0.0.0:3000"
echo ""
echo "📋 测试页面: http://localhost:3000/showrooms"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev

