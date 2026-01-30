#!/bin/bash
#############################################
# Demand OS - 一键部署脚本（生产）
#
# 用途：在生产服务器上更新代码、构建前端、重启服务、部署 nginx 并可选申请证书
# 说明：在服务器上以 root 或使用 sudo 运行此脚本
#
# 使用示例：
#   sudo ./deploy_production.sh \
#     --repo-dir /var/www/demand-os \
#     --branch main \
#     --email admin@yourdomain.com
#############################################

set -euo pipefail

print_usage() {
  cat <<EOF
Usage: $0 [--repo-dir DIR] [--branch BRANCH] [--email EMAIL] [--no-cert]

Options:
  --repo-dir DIR   项目根目录 (默认: /var/www/demand-os)
  --branch BRANCH  Git 分支 (默认: main)
  --email EMAIL    用于 certbot 的邮箱 (若不提供则跳过自动申请证书)
  --no-cert        跳过 certbot 申请/续期步骤
  -h, --help       显示帮助
EOF
}

# 默认配置
REPO_DIR="/var/www/demand-os"
BRANCH="main"
EMAIL=""
SKIP_CERT=0

while [[ $# -gt 0 ]]; do
  case $1 in
    --repo-dir) REPO_DIR="$2"; shift 2 ;;
    --branch) BRANCH="$2"; shift 2 ;;
    --email) EMAIL="$2"; shift 2 ;;
    --no-cert) SKIP_CERT=1; shift 1 ;;
    -h|--help) print_usage; exit 0 ;;
    *) echo "Unknown arg: $1"; print_usage; exit 2 ;;
  esac
done

WEB_DIR="$REPO_DIR/web"
NGINX_SRC="$REPO_DIR/deploy/nginx.conf"
NGINX_DEST="/etc/nginx/sites-available/demand-os"

echo "[INFO] 部署开始: repo=$REPO_DIR branch=$BRANCH"

if [ "$EUID" -ne 0 ]; then
  echo "请使用 root 权限运行此脚本（sudo）。" >&2
  exit 1
fi

if [ ! -d "$REPO_DIR" ]; then
  echo "仓库目录不存在: $REPO_DIR" >&2
  exit 1
fi

cd "$REPO_DIR"

echo "[1/6] 拉取最新代码 (git fetch & pull)..."
git fetch origin --all
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

if [ ! -d "$WEB_DIR" ]; then
  echo "找不到 web 目录: $WEB_DIR" >&2
  exit 1
fi

cd "$WEB_DIR"

echo "[2/6] 安装 node 依赖并构建前端..."
# 优先使用 pnpm/npm/yarn 中可用的包管理器
if command -v pnpm >/dev/null 2>&1; then
  pnpm install
  pnpm build
elif command -v npm >/dev/null 2>&1; then
  npm ci
  npm run build
else
  echo "未找到 pnpm 或 npm，请先安装 Node.js 与包管理器" >&2
  exit 1
fi

echo "[3/6] 使用 PM2 启动前端进程..."
# 使用 pm2 启动 npm start
if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 未安装，正在安装..."
  npm install -g pm2
fi

APP_NAME="demand-os-web"
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start
pm2 save

echo "[4/6] 部署 nginx 配置并重载..."
if [ -f "$NGINX_SRC" ]; then
  cp "$NGINX_SRC" "$NGINX_DEST"
  ln -sf "$NGINX_DEST" /etc/nginx/sites-enabled/demand-os
  nginx -t
  systemctl reload nginx
  echo "nginx 配置部署完成"
else
  echo "未找到部署模板: $NGINX_SRC，跳过 nginx 部署" >&2
fi

echo "[5/6] 检查并申请 SSL 证书 (可选)..."
if [ $SKIP_CERT -eq 0 ] && [ -n "$EMAIL" ]; then
  if command -v certbot >/dev/null 2>&1; then
    DOMAIN_MAIN="saas.cnsubscribe.xyz"
    DOMAIN_ADMIN="admin.cnsubscribe.xyz"
    echo "运行 certbot 为 $DOMAIN_MAIN 和 $DOMAIN_ADMIN 申请证书 (email=$EMAIL)"
    certbot --nginx -n --agree-tos -m "$EMAIL" -d "$DOMAIN_MAIN" -d "$DOMAIN_ADMIN" --redirect || 
      echo "certbot 运行失败，请检查网络/域名解析或手动运行 certbot" >&2
  else
    echo "未安装 certbot，跳过证书申请。若需要请运行: apt install certbot python3-certbot-nginx" >&2
  fi
else
  echo "跳过证书申请 (SKIP_CERT=$SKIP_CERT, EMAIL='$EMAIL')"
fi

echo "[6/6] 清理缓存并完成部署..."

echo "部署完成。前端 (默认端口 443) 应由 nginx 代理到 PM2 进程。"
echo "请访问: https://saas.cnsubscribe.xyz"

exit 0
