# Vercel 环境变量完整模板

## 使用方法
1. 复制以下每个环境变量
2. 在 Vercel 控制面板 → Settings → Environment Variables 中添加
3. 根据实际情况修改值
4. 每个项目（Directus 和前端）都需要分别配置

---

## 🔵 Directus 后端项目环境变量

### 1️⃣ 数据库配置

使用 Vercel PostgreSQL 时，这些值由 Vercel 自动提供。
如果使用 Neon，则手动添加。

```
DB_HOST=postgres.vercel-storage.com
DB_PORT=5432
DB_DATABASE=directus
DB_USER=default
DB_PASSWORD=your_strong_password
```

### 2️⃣ Directus 核心配置

```
# 生成方式: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SECRET=生成的32字符随机字符串

# 你的 Directus 后端公开 URL
PUBLIC_URL=https://directus-yourproject.vercel.app

# 或使用自定义域名
PUBLIC_URL=https://directus.yourdomain.com

# 首次启动时的管理员账户
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=StrongPassword@2024!Minimum16Chars
```

### 3️⃣ CORS 配置（关键！）

```
CORS_ENABLED=true
CORS_ORIGIN=https://yourdomain.vercel.app,https://www.yourdomain.com,http://localhost:3000
CORS_METHODS=GET,POST,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true
```

### 4️⃣ WebSocket 配置

```
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_ENABLED=true
WEBSOCKETS_GRAPHQL_ENABLED=false
```

### 5️⃣ 存储配置

```
# 本地存储（临时，不适合生产）
STORAGE_LOCATIONS=local
STORAGE_LOCAL_ROOT=/tmp/directus-uploads

# 或使用 S3（生产推荐）
# STORAGE_LOCATIONS=s3
# STORAGE_S3_DRIVER=s3
# STORAGE_S3_BUCKET=your-bucket-name
# STORAGE_S3_REGION=us-east-1
# STORAGE_S3_KEY=your-access-key
# STORAGE_S3_SECRET=your-secret-key
# STORAGE_S3_ACL=public-read
```

### 6️⃣ 缓存配置

```
# 禁用缓存（内存有限时）
CACHE_ENABLED=false

# 或启用内存缓存
CACHE_ENABLED=true
CACHE_STORE=memory
```

### 7️⃣ 限流和安全

```
# 防止滥用和 DDoS
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=100
RATE_LIMITER_DURATION=1

# 扩展和插件
EXTENSIONS_AUTO_RELOAD=false
```

### 8️⃣ 日志配置

```
LOG_LEVEL=info
LOG_STYLE=pretty

# 生产环境建议改为 json
# LOG_STYLE=json
```

### 9️⃣ Node.js 配置

```
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=512
```

### 🔟 可选：邮件配置

```
# 用于发送邮件通知（如重置密码）
# MAIL_FROM=noreply@yourdomain.com
# MAIL_TRANSPORT=smtp
# MAIL_SMTP_HOST=smtp.mailtrap.io
# MAIL_SMTP_PORT=465
# MAIL_SMTP_USER=your_username
# MAIL_SMTP_PASSWORD=your_password
```

---

## 🟠 前端项目环境变量（Next.js）

### 前端的 `.env.production` 或 Vercel 环境变量

```
# Directus 后端 API URL
NEXT_PUBLIC_DIRECTUS_URL=https://directus-yourproject.vercel.app

# 或使用自定义域名
NEXT_PUBLIC_DIRECTUS_URL=https://directus.yourdomain.com

# 前端 API URL
NEXT_PUBLIC_API_URL=https://yourdomain.vercel.app

# WebSocket 连接 URL
NEXT_PUBLIC_WS_URL=wss://directus-yourproject.vercel.app/websocket

# 或使用自定义域名
NEXT_PUBLIC_WS_URL=wss://directus.yourdomain.com/websocket

# Node 环境
NODE_ENV=production

# Next.js 配置（可选）
# NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
```

---

## 📋 变量值获取指南

### 🔸 SECRET（必需）

生成 32 字符的随机密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

输出示例：
```
a7b3c9d2e8f1g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x
```

### 🔸 DB_HOST, DB_PORT, DB_DATABASE 等

如果使用 Vercel PostgreSQL：
1. Vercel 控制面板 → Storage → 你的数据库
2. 在 ".env.local" 或 "Postgres" 标签页可以看到

连接字符串示例：
```
postgresql://default:password@host:port/directus
```

从中提取：
- DB_HOST=host
- DB_PORT=port
- DB_DATABASE=directus
- DB_USER=default
- DB_PASSWORD=password

### 🔸 CORS_ORIGIN

你的前端部署地址，例如：
```
https://app.vercel.app
https://www.example.com
http://localhost:3000（开发时）
```

### 🔸 ADMIN_EMAIL 和 ADMIN_PASSWORD

- ADMIN_EMAIL：你常用的邮箱
- ADMIN_PASSWORD：强密码，至少 16 字符，包含大小写字母、数字、特殊字符

---

## ✅ 配置检查清单

在 Vercel 部署前，确认：

- [ ] 所有必需变量已添加（SECRET, DB_HOST, DB_PORT 等）
- [ ] 没有空值或占位符值
- [ ] CORS_ORIGIN 包含你的前端 URL
- [ ] ADMIN_PASSWORD 足够强
- [ ] DATABASE 连接信息正确
- [ ] PUBLIC_URL 与实际部署 URL 一致

---

## 🚀 部署后的变更

### 变更 Directus URL

如果后续更改域名或更新 URL：

1. 更新 Vercel 环境变量：PUBLIC_URL
2. 运行 `vercel --prod` 重新部署
3. 更新前端的 NEXT_PUBLIC_DIRECTUS_URL

### 变更密码

在 Directus 管理后台登录后可以更改。

### 更新数据库

在保持环境变量不变的情况下，数据会自动持久化。

---

## 🔒 安全最佳实践

✅ **DO:**
- 使用强、随机的 SECRET
- 定期更新 ADMIN_PASSWORD
- 在 CORS_ORIGIN 中仅列出需要的域名
- 启用限流防止滥用
- 定期备份数据库
- 使用 HTTPS（Vercel 自动提供）

❌ **DON'T:**
- 在代码中硬编码密钥
- 使用简单或通用密码
- 允许所有来源的 CORS (`*`)
- 在版本控制中提交 `.env` 文件
- 将密钥分享给他人

---

## 📞 需要帮助？

1. 检查 [VERCEL_MIGRATION_GUIDE.md](./VERCEL_MIGRATION_GUIDE.md) 完整指南
2. 查看 Vercel 日志：`vercel logs [project] --prod`
3. 访问 Directus 文档：https://docs.directus.io

---

**最后更新：2026-02-05**
