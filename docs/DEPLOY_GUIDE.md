# Demand OS 服务器部署指南

## 服务器信息
- **服务器 IP**: 47.99.205.136
- **前端域名**: demand.cnsubscribe.xyz
- **后端域名**: admin.cnsubscribe.xyz
- **Directus Token**: N1pdvaUmZXAR9fkTfaL4xlsXsyiEzWvT

---

## 第一步：连接服务器

```bash
ssh root@47.99.205.136
```

---

## 第二步：上传部署脚本并执行

### 方式 A：使用 SCP 上传整个项目
在本地 PowerShell 执行：
```powershell
# 上传项目到服务器
scp -r D:\Demand-os-v4\* root@47.99.205.136:/tmp/demand-os-upload/
```

然后在服务器上：
```bash
# 创建目录
mkdir -p /var/www/demand-os

# 复制部署脚本
cp /tmp/demand-os-upload/deploy/server-setup-complete.sh /root/
chmod +x /root/server-setup-complete.sh

# 执行完整部署 (包括 Docker、Nginx、SSL、Directus)
sudo /root/server-setup-complete.sh
```

### 方式 B：直接在服务器上执行命令

```bash
# 1. 更新系统
apt update && apt upgrade -y

# 2. 安装必要软件
apt install -y curl wget git nginx certbot python3-certbot-nginx

# 3. 安装 Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker && systemctl start docker

# 4. 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
```

---

## 第三步：申请 SSL 证书

```bash
# 停止 nginx 以便 certbot 使用 80 端口
systemctl stop nginx

# 申请前端域名证书
certbot certonly --standalone -d demand.cnsubscribe.xyz --agree-tos --email admin@cnsubscribe.xyz

# 申请后端域名证书  
certbot certonly --standalone -d admin.cnsubscribe.xyz --agree-tos --email admin@cnsubscribe.xyz

# 重启 nginx
systemctl start nginx
```

---

## 第四步：启动 Directus 后端

```bash
# 创建后端目录
mkdir -p /var/www/demand-os/backend/data/{postgres,redis,uploads}
cd /var/www/demand-os/backend

# 创建 docker-compose.yml (从项目复制)
# 或直接 scp:
# scp D:\Demand-os-v4\industrial-oasis-backend\docker-compose.yml root@47.99.205.136:/var/www/demand-os/backend/

# 启动服务
docker compose up -d

# 检查状态
docker compose ps
docker compose logs -f directus
```

等待约 30 秒后，访问 https://admin.cnsubscribe.xyz 应该能看到 Directus 登录页面。

**默认管理员账号**:
- 邮箱: admin@cnsubscribe.xyz
- 密码: Admin@2024!

---

## 第五步：部署前端

```bash
# 复制前端代码
mkdir -p /var/www/demand-os/web
# 上传代码 (在本地执行)
# scp -r D:\Demand-os-v4\web\* root@47.99.205.136:/var/www/demand-os/web/

# 在服务器上
cd /var/www/demand-os/web

# 安装依赖
npm install

# 构建生产版本
npm run build

# 使用 PM2 启动
pm2 start npm --name "demand-os-web" -- start
pm2 save
pm2 startup
```

---

## 第六步：配置 Nginx

将以下配置保存到 `/etc/nginx/sites-available/demand-os`:

```bash
cat > /etc/nginx/sites-available/demand-os << 'EOF'
# 前端 - HTTP 重定向
server {
    listen 80;
    server_name demand.cnsubscribe.xyz;
    return 301 https://$server_name$request_uri;
}

# 前端 - HTTPS
server {
    listen 443 ssl http2;
    server_name demand.cnsubscribe.xyz;

    ssl_certificate /etc/letsencrypt/live/demand.cnsubscribe.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demand.cnsubscribe.xyz/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 后端 - HTTP 重定向
server {
    listen 80;
    server_name admin.cnsubscribe.xyz;
    return 301 https://$server_name$request_uri;
}

# 后端 - HTTPS
server {
    listen 443 ssl http2;
    server_name admin.cnsubscribe.xyz;

    ssl_certificate /etc/letsencrypt/live/admin.cnsubscribe.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.cnsubscribe.xyz/privkey.pem;

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:8055;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /websocket {
        proxy_pass http://127.0.0.1:8055;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400s;
    }
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/demand-os /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

---

## 验证部署

1. **检查 Directus**: https://admin.cnsubscribe.xyz
2. **检查前端**: https://demand.cnsubscribe.xyz
3. **检查服务状态**:
   ```bash
   # Docker 状态
   docker compose -f /var/www/demand-os/backend/docker-compose.yml ps
   
   # PM2 状态
   pm2 status
   
   # Nginx 状态
   systemctl status nginx
   ```

---

## 常用命令

```bash
# 重启 Directus
cd /var/www/demand-os/backend && docker compose restart

# 重启前端
pm2 restart demand-os-web

# 查看日志
docker compose -f /var/www/demand-os/backend/docker-compose.yml logs -f
pm2 logs demand-os-web

# 更新前端代码后重新部署
cd /var/www/demand-os/web
git pull  # 或重新上传代码
npm install
npm run build
pm2 restart demand-os-web
```

---

## 使用 Token 访问 API

您的 Directus Token: `N1pdvaUmZXAR9fkTfaL4xlsXsyiEzWvT`

测试 API:
```bash
curl -H "Authorization: Bearer N1pdvaUmZXAR9fkTfaL4xlsXsyiEzWvT" \
     https://admin.cnsubscribe.xyz/items/demands
```
