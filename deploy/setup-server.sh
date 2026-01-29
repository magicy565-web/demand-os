#!/bin/bash

#############################################
# Demand OS - 服务器初始化脚本
# 
# 适用于: Ubuntu 20.04/22.04 LTS
# 服务器: 阿里云 ECS (47.99.205.136)
#
# 使用方法:
#   chmod +x setup-server.sh
#   sudo ./setup-server.sh
#############################################

set -e

echo "
╔══════════════════════════════════════════════════════════╗
║          DEMAND OS - Server Setup Script                 ║
║               服务器初始化脚本 v1.0.0                      ║
╚══════════════════════════════════════════════════════════╝
"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root
if [ "$EUID" -ne 0 ]; then
    log_error "请使用 root 权限运行此脚本"
    exit 1
fi

#############################################
# 1. 系统更新
#############################################
log_info "更新系统包..."
apt-get update -y
apt-get upgrade -y

#############################################
# 2. 安装基础工具
#############################################
log_info "安装基础工具..."
apt-get install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    unzip \
    ca-certificates \
    gnupg \
    lsb-release

#############################################
# 3. 安装 Docker
#############################################
log_info "安装 Docker..."

# 移除旧版本
apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# 添加 Docker 官方 GPG key
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# 添加仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动 Docker
systemctl enable docker
systemctl start docker

log_info "Docker 版本: $(docker --version)"
log_info "Docker Compose 版本: $(docker compose version)"

#############################################
# 4. 安装 Node.js 20.x
#############################################
log_info "安装 Node.js 20.x..."

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

log_info "Node.js 版本: $(node --version)"
log_info "npm 版本: $(npm --version)"

# 安装 pnpm
npm install -g pnpm

log_info "pnpm 版本: $(pnpm --version)"

#############################################
# 5. 安装 PM2
#############################################
log_info "安装 PM2..."
npm install -g pm2

# 设置 PM2 开机启动
pm2 startup systemd -u root --hp /root
systemctl enable pm2-root

log_info "PM2 版本: $(pm2 --version)"

#############################################
# 6. 安装 Nginx
#############################################
log_info "安装 Nginx..."
apt-get install -y nginx

# 启动 Nginx
systemctl enable nginx
systemctl start nginx

log_info "Nginx 版本: $(nginx -v 2>&1)"

#############################################
# 7. 安装 Certbot (SSL 证书)
#############################################
log_info "安装 Certbot..."
apt-get install -y certbot python3-certbot-nginx

#############################################
# 8. 配置防火墙
#############################################
log_info "配置防火墙..."

# 安装 ufw
apt-get install -y ufw

# 配置规则
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 8055  # Directus

# 启用防火墙 (如果需要)
# ufw --force enable

log_warn "防火墙规则已配置，但未启用。如需启用请运行: ufw enable"

#############################################
# 9. 创建项目目录
#############################################
log_info "创建项目目录..."

mkdir -p /var/www/demand-os
mkdir -p /var/www/demand-os/backend
mkdir -p /var/www/demand-os/frontend
mkdir -p /var/log/demand-os

# 设置权限
chown -R www-data:www-data /var/www/demand-os
chmod -R 755 /var/www/demand-os

#############################################
# 10. 配置 Nginx
#############################################
log_info "配置 Nginx..."

# 复制 Nginx 配置 (假设配置文件已存在)
if [ -f "./nginx.conf" ]; then
    cp ./nginx.conf /etc/nginx/sites-available/demand-os
    ln -sf /etc/nginx/sites-available/demand-os /etc/nginx/sites-enabled/
    
    # 测试配置
    nginx -t
    systemctl reload nginx
    log_info "Nginx 配置已更新"
else
    log_warn "nginx.conf 文件不存在，请手动配置 Nginx"
fi

#############################################
# 11. 申请 SSL 证书
#############################################
log_info "SSL 证书配置..."

read -p "是否现在申请 SSL 证书? (y/n): " ssl_choice
if [ "$ssl_choice" = "y" ]; then
    certbot --nginx -d demand.cnsubscribe.xyz -d admin.cnsubscribe.xyz
    log_info "SSL 证书申请完成"
    
    # 设置自动续期
    (crontab -l 2>/dev/null; echo "0 0 * * * /usr/bin/certbot renew --quiet") | crontab -
    log_info "已设置证书自动续期"
else
    log_warn "跳过 SSL 证书申请，请稍后手动运行: certbot --nginx"
fi

#############################################
# 12. 系统优化
#############################################
log_info "系统优化..."

# 增加文件描述符限制
cat >> /etc/security/limits.conf << EOF
* soft nofile 65535
* hard nofile 65535
root soft nofile 65535
root hard nofile 65535
EOF

# 优化内核参数
cat >> /etc/sysctl.conf << EOF
# TCP 优化
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.tcp_fin_timeout = 30
net.ipv4.tcp_keepalive_time = 600
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.tcp_keepalive_intvl = 15

# 内存优化
vm.swappiness = 10
EOF

sysctl -p

#############################################
# 完成
#############################################

echo "
╔══════════════════════════════════════════════════════════╗
║                    安装完成！                              ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  已安装:                                                  ║
║    ✓ Docker & Docker Compose                             ║
║    ✓ Node.js 20.x & pnpm                                 ║
║    ✓ PM2 进程管理器                                       ║
║    ✓ Nginx Web 服务器                                     ║
║    ✓ Certbot SSL 工具                                     ║
║                                                          ║
║  项目目录:                                                ║
║    /var/www/demand-os/backend  - 后端服务                 ║
║    /var/www/demand-os/frontend - 前端静态文件             ║
║                                                          ║
║  下一步:                                                  ║
║    1. 部署后端: cd /var/www/demand-os/backend             ║
║       docker compose up -d                               ║
║                                                          ║
║    2. 部署前端: 上传构建产物到 frontend 目录               ║
║       pm2 start ecosystem.config.js                      ║
║                                                          ║
║    3. 配置 SSL: certbot --nginx                          ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
"
