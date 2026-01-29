#!/bin/bash
#############################################
# Demand OS - 完整服务器部署脚本
# 
# 服务器信息:
#   IP: 47.99.205.136
#   前端域名: demand.cnsubscribe.xyz
#   后端域名: admin.cnsubscribe.xyz
#   Directus Token: N1pdvaUmZXAR9fkTfaL4xlsXsyiEzWvT
#
# 使用方法:
#   chmod +x server-setup-complete.sh
#   sudo ./server-setup-complete.sh
#############################################

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() { echo -e "${CYAN}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "=============================================="
echo "  Demand OS - 服务器完整部署脚本"
echo "=============================================="

# 检查 root 权限
if [ "$EUID" -ne 0 ]; then
    log_error "请使用 root 权限运行此脚本: sudo ./server-setup-complete.sh"
    exit 1
fi

# ========== 1. 系统更新和基础软件安装 ==========
log_info "步骤 1/8: 更新系统并安装基础软件..."

apt update && apt upgrade -y
apt install -y curl wget git nginx certbot python3-certbot-nginx \
    build-essential apt-transport-https ca-certificates gnupg lsb-release

log_success "基础软件安装完成"

# ========== 2. 安装 Docker ==========
log_info "步骤 2/8: 安装 Docker..."

if ! command -v docker &> /dev/null; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    systemctl enable docker
    systemctl start docker
    log_success "Docker 安装完成"
else
    log_info "Docker 已安装，跳过..."
fi

# ========== 3. 安装 Node.js 20 ==========
log_info "步骤 3/8: 安装 Node.js 20..."

if ! command -v node &> /dev/null || [[ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 20 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    npm install -g pm2
    log_success "Node.js 20 和 PM2 安装完成"
else
    log_info "Node.js 已安装: $(node -v)"
fi

# ========== 4. 创建项目目录 ==========
log_info "步骤 4/8: 创建项目目录..."

PROJECT_DIR="/var/www/demand-os"
mkdir -p $PROJECT_DIR/{web,backend}
cd $PROJECT_DIR

log_success "项目目录创建完成: $PROJECT_DIR"

# ========== 5. 配置 Nginx (临时，用于获取 SSL) ==========
log_info "步骤 5/8: 配置 Nginx (HTTP 模式用于 SSL 验证)..."

# 创建临时 Nginx 配置用于 SSL 证书申请
cat > /etc/nginx/sites-available/demand-os-temp << 'NGINX_TEMP'
# 临时配置 - 用于 Let's Encrypt 验证
server {
    listen 80;
    server_name demand.cnsubscribe.xyz admin.cnsubscribe.xyz;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 200 'Demand OS - SSL Setup in progress...';
        add_header Content-Type text/plain;
    }
}
NGINX_TEMP

# 启用配置
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/demand-os-temp /etc/nginx/sites-enabled/demand-os
nginx -t && systemctl reload nginx

log_success "Nginx 临时配置完成"

# ========== 6. 申请 SSL 证书 ==========
log_info "步骤 6/8: 申请 Let's Encrypt SSL 证书..."

# 申请前端域名证书
if [ ! -f "/etc/letsencrypt/live/demand.cnsubscribe.xyz/fullchain.pem" ]; then
    certbot certonly --nginx -d demand.cnsubscribe.xyz --non-interactive --agree-tos --email admin@cnsubscribe.xyz || {
        log_warning "前端域名 SSL 申请失败，尝试 standalone 模式..."
        systemctl stop nginx
        certbot certonly --standalone -d demand.cnsubscribe.xyz --non-interactive --agree-tos --email admin@cnsubscribe.xyz
        systemctl start nginx
    }
    log_success "前端 SSL 证书申请成功"
else
    log_info "前端 SSL 证书已存在，跳过..."
fi

# 申请后端域名证书
if [ ! -f "/etc/letsencrypt/live/admin.cnsubscribe.xyz/fullchain.pem" ]; then
    certbot certonly --nginx -d admin.cnsubscribe.xyz --non-interactive --agree-tos --email admin@cnsubscribe.xyz || {
        log_warning "后端域名 SSL 申请失败，尝试 standalone 模式..."
        systemctl stop nginx
        certbot certonly --standalone -d admin.cnsubscribe.xyz --non-interactive --agree-tos --email admin@cnsubscribe.xyz
        systemctl start nginx
    }
    log_success "后端 SSL 证书申请成功"
else
    log_info "后端 SSL 证书已存在，跳过..."
fi

# 设置自动续期
echo "0 3 * * * root certbot renew --quiet --post-hook 'systemctl reload nginx'" > /etc/cron.d/certbot-renew

# ========== 7. 配置正式 Nginx ==========
log_info "步骤 7/8: 配置正式 Nginx..."

cat > /etc/nginx/sites-available/demand-os << 'NGINX_CONF'
#############################################
# Demand OS - Nginx 配置
#############################################

# 前端 - Next.js (HTTP -> HTTPS 重定向)
server {
    listen 80;
    listen [::]:80;
    server_name demand.cnsubscribe.xyz;
    return 301 https://$server_name$request_uri;
}

# 前端 - Next.js (HTTPS)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name demand.cnsubscribe.xyz;

    # SSL 证书
    ssl_certificate /etc/letsencrypt/live/demand.cnsubscribe.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demand.cnsubscribe.xyz/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # 日志
    access_log /var/log/nginx/demand-frontend-access.log;
    error_log /var/log/nginx/demand-frontend-error.log;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # 代理到 Next.js (PM2 运行在 3000 端口)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源长缓存
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}

# 后端 - Directus (HTTP -> HTTPS 重定向)
server {
    listen 80;
    listen [::]:80;
    server_name admin.cnsubscribe.xyz;
    return 301 https://$server_name$request_uri;
}

# 后端 - Directus (HTTPS)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name admin.cnsubscribe.xyz;

    # SSL 证书
    ssl_certificate /etc/letsencrypt/live/admin.cnsubscribe.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.cnsubscribe.xyz/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # 日志
    access_log /var/log/nginx/demand-backend-access.log;
    error_log /var/log/nginx/demand-backend-error.log;

    # 上传文件大小限制
    client_max_body_size 100M;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;

    # 代理到 Directus (Docker 运行在 8055 端口)
    location / {
        proxy_pass http://127.0.0.1:8055;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }

    # WebSocket 支持
    location /websocket {
        proxy_pass http://127.0.0.1:8055;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400s;
    }

    # 静态资源缓存
    location /assets {
        proxy_pass http://127.0.0.1:8055;
        add_header Cache-Control "public, max-age=2592000";
    }
}
NGINX_CONF

# 启用正式配置
rm -f /etc/nginx/sites-enabled/demand-os
ln -sf /etc/nginx/sites-available/demand-os /etc/nginx/sites-enabled/demand-os

nginx -t && systemctl reload nginx

log_success "Nginx 正式配置完成"

# ========== 8. 启动后端 Directus ==========
log_info "步骤 8/8: 启动 Directus 后端..."

# 创建后端目录和配置
mkdir -p $PROJECT_DIR/backend/data/{postgres,redis,uploads}

# 创建 docker-compose.yml
cat > $PROJECT_DIR/backend/docker-compose.yml << 'DOCKER_COMPOSE'
version: "3.8"

services:
  postgres:
    image: postgres:14-alpine
    container_name: demand-os-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: directus_secret_2024
      POSTGRES_DB: demand_os
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    networks:
      - demand-os-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U directus -d demand_os"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: demand-os-redis
    restart: unless-stopped
    volumes:
      - ./data/redis:/data
    networks:
      - demand-os-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  directus:
    image: directus/directus:11.1.1
    container_name: demand-os-directus
    restart: unless-stopped
    ports:
      - "127.0.0.1:8055:8055"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      PUBLIC_URL: "https://admin.cnsubscribe.xyz"
      SECRET: "demand-os-super-secret-key-2024-production"
      
      DB_CLIENT: pg
      DB_HOST: postgres
      DB_PORT: 5432
      DB_DATABASE: demand_os
      DB_USER: directus
      DB_PASSWORD: directus_secret_2024
      
      CACHE_ENABLED: "true"
      CACHE_STORE: redis
      REDIS: redis://redis:6379
      
      ADMIN_EMAIL: admin@cnsubscribe.xyz
      ADMIN_PASSWORD: Admin@2024!
      
      CORS_ENABLED: "true"
      CORS_ORIGIN: "https://demand.cnsubscribe.xyz,http://localhost:3000"
      CORS_METHODS: "GET,POST,PATCH,DELETE,OPTIONS"
      CORS_ALLOWED_HEADERS: "Content-Type,Authorization"
      CORS_CREDENTIALS: "true"
      
      WEBSOCKETS_ENABLED: "true"
      
      RATE_LIMITER_ENABLED: "true"
      RATE_LIMITER_STORE: redis
      RATE_LIMITER_POINTS: 100
      RATE_LIMITER_DURATION: 1
      
      LOG_LEVEL: "info"
      LOG_STYLE: "pretty"
    volumes:
      - ./data/uploads:/directus/uploads
    networks:
      - demand-os-network

networks:
  demand-os-network:
    driver: bridge
DOCKER_COMPOSE

# 启动 Docker 服务
cd $PROJECT_DIR/backend
docker compose down 2>/dev/null || true
docker compose up -d

# 等待服务启动
log_info "等待 Directus 启动 (约30秒)..."
sleep 30

# 检查服务状态
if curl -s http://127.0.0.1:8055/server/health | grep -q "ok"; then
    log_success "Directus 后端启动成功!"
else
    log_warning "Directus 可能还在启动中，请稍后检查..."
fi

# ========== 完成 ==========
echo ""
echo "=============================================="
echo -e "${GREEN}  部署完成！${NC}"
echo "=============================================="
echo ""
echo "后端管理面板: https://admin.cnsubscribe.xyz"
echo "  - 邮箱: admin@cnsubscribe.xyz"
echo "  - 密码: Admin@2024!"
echo ""
echo "前端网站: https://demand.cnsubscribe.xyz"
echo "  (需要上传前端代码并启动 PM2)"
echo ""
echo "下一步操作:"
echo "  1. 将前端代码上传到 $PROJECT_DIR/web"
echo "  2. cd $PROJECT_DIR/web && npm install && npm run build"
echo "  3. pm2 start npm --name 'demand-os-web' -- start"
echo ""
echo "检查状态:"
echo "  - docker compose -f $PROJECT_DIR/backend/docker-compose.yml ps"
echo "  - pm2 status"
echo "  - nginx -t"
echo ""
