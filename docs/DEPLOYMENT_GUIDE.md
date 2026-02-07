# 前端部署到 saas.cnsubscribe.xyz 指南

## 准备工作

### 1. 环境变量配置
已为生产环境配置了 `.env.production` 文件：
```env
NEXT_PUBLIC_API_URL=https://saas.cnsubscribe.xyz
NEXT_PUBLIC_DIRECTUS_URL=https://saas.cnsubscribe.xyz
NEXT_PUBLIC_WS_URL=wss://saas.cnsubscribe.xyz/websocket
```

### 2. Next.js 配置
`next.config.ts` 已更新以支持两个域名：
- admin.cnsubscribe.xyz (开发环境)
- saas.cnsubscribe.xyz (生产环境)

## 构建步骤

### 本地构建测试
```bash
# 安装依赖
cd web
npm install

# 构建应用（使用生产配置）
npm run build

# 验证构建是否成功
npm run start
```

### 验证构建产物
```bash
# 检查 .next 目录是否生成
ls -la .next/

# 检查生产配置是否已加载
grep NEXT_PUBLIC web/.env.production
```

## 部署选项

### 选项 A: 使用 Vercel (推荐)
```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 连接到 Vercel
vercel

# 3. 配置环境变量
vercel env add NEXT_PUBLIC_API_URL https://saas.cnsubscribe.xyz
vercel env add NEXT_PUBLIC_DIRECTUS_URL https://saas.cnsubscribe.xyz
vercel env add NEXT_PUBLIC_WS_URL wss://saas.cnsubscribe.xyz/websocket

# 4. 部署
vercel --prod
```

### 选项 B: 使用 Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制文件
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# 构建应用
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

部署命令：
```bash
docker build -t demand-os-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://saas.cnsubscribe.xyz \
  -e NEXT_PUBLIC_DIRECTUS_URL=https://saas.cnsubscribe.xyz \
  -e NEXT_PUBLIC_WS_URL=wss://saas.cnsubscribe.xyz/websocket \
  demand-os-frontend
```

### 选项 C: 使用 PM2 (传统服务器)
```bash
# 1. 全局安装 PM2
npm install -g pm2

# 2. 构建应用
npm run build

# 3. 启动应用
pm2 start npm --name "demand-os" -- start

# 4. 保存 PM2 进程列表
pm2 save

# 5. 启用 PM2 自启动
pm2 startup
```

## 域名配置

### DNS 配置 (在您的域名提供商处)
```
saas.cnsubscribe.xyz  IN  A  47.99.205.136
```

### Web 服务器配置 (Nginx)
```nginx
server {
    listen 443 ssl http2;
    server_name saas.cnsubscribe.xyz;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API rewrite
    location /api/directus {
        proxy_pass https://saas.cnsubscribe.xyz;
        proxy_set_header Host $host;
    }
}

# 重定向 HTTP 到 HTTPS
server {
    listen 80;
    server_name saas.cnsubscribe.xyz;
    return 301 https://$server_name$request_uri;
}
```

## 部署后验证

### 1. 检查前端可访问性
```bash
curl -I https://saas.cnsubscribe.xyz/
# 应该返回 200 状态码
```

### 2. 检查 API 配置
```bash
curl https://saas.cnsubscribe.xyz/api/config-test
# 应该返回配置信息 JSON
```

### 3. 验证 API 连接
前端应能正确连接到 Directus API：
```javascript
// 在浏览器控制台测试
fetch('https://saas.cnsubscribe.xyz/api/directus/server/info')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### 4. 检查 WebSocket 连接
```javascript
const ws = new WebSocket('wss://saas.cnsubscribe.xyz/websocket');
ws.onopen = () => console.log('WebSocket connected');
ws.onerror = (error) => console.log('WebSocket error:', error);
```

## 故障排除

### SSL/TLS 证书错误
- 确保证书有效且未过期
- 使用 Let's Encrypt 获取免费证书
- 检查证书是否在您的信任存储中

### API 连接失败
- 验证 `NEXT_PUBLIC_API_URL` 是否正确
- 检查 Directus 服务是否在 saas.cnsubscribe.xyz 运行
- 检查 CORS 配置

### WebSocket 连接超时
- 确保 WebSocket 在 `wss://saas.cnsubscribe.xyz/websocket` 可用
- 检查防火墙和代理配置
- 验证 Nginx/Apache 支持 WebSocket 升级

## 环境变量切换

### 开发环境（使用 .env.local）
```bash
npm run dev  # 使用 admin.cnsubscribe.xyz
```

### 生产环境（使用 .env.production）
```bash
npm run build  # 自动使用 .env.production
npm run start
```

## 监控和日志

### 关键指标
- 前端加载时间
- API 响应时间
- WebSocket 连接状态
- 错误率和错误日志

### 推荐工具
- PM2 Plus: 监控 Node.js 应用
- Sentry: 错误追踪
- DataDog: 性能监控
- ELK Stack: 日志管理

---
最后更新: 2026-01-31
