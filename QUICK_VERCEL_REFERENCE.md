# 🚀 Vercel 迁移 - 快速参考卡

## 📌 核心信息

| 项目 | 说明 |
|------|------|
| **前端部署地址** | https://yourdomain.vercel.app |
| **后端部署地址** | https://directus-yourproject.vercel.app |
| **后端管理后台** | https://directus-yourproject.vercel.app/admin |
| **API 基础 URL** | https://directus-yourproject.vercel.app |
| **WebSocket URL** | wss://directus-yourproject.vercel.app/websocket |

## 🔐 需要生成的密钥

```bash
# 生成 SECRET（32 字符随机字符串）
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

复制输出，这就是你的 SECRET。

## 📝 必需的环境变量（Directus）

```
# 数据库
DB_HOST=xxxx
DB_PORT=5432
DB_DATABASE=directus
DB_USER=xxxx
DB_PASSWORD=xxxx

# 核心配置
SECRET=从上面生成的值
PUBLIC_URL=https://directus-yourproject.vercel.app
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=StrongPassword123!

# CORS（重要！）
CORS_ENABLED=true
CORS_ORIGIN=https://yourdomain.vercel.app,http://localhost:3000
CORS_METHODS=GET,POST,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true

# WebSocket
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_ENABLED=true

# 存储
STORAGE_LOCATIONS=local
STORAGE_LOCAL_ROOT=/tmp/directus-uploads

# 限流
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=100
RATE_LIMITER_DURATION=1
```

## 📝 前端环境变量（`.env.production`）

```
NEXT_PUBLIC_DIRECTUS_URL=https://directus-yourproject.vercel.app
NEXT_PUBLIC_API_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_WS_URL=wss://directus-yourproject.vercel.app/websocket
```

## ⚡ 部署命令速查

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署后端
cd industrial-oasis-backend
vercel

# 部署前端
cd ../web
vercel --prod

# 查看日志
vercel logs [project-name] --prod --tail

# 检查环境变量
vercel env list
```

## 🧪 测试命令

```bash
# 测试后端可用性
curl https://directus-yourproject.vercel.app

# 测试 API 端点
curl https://directus-yourproject.vercel.app/items/demands

# 测试数据库连接
psql $DATABASE_URL -c "SELECT version();"
```

## 📊 部署阶段

1. **准备数据库** (5 min)
   - Vercel PostgreSQL / Neon / Supabase

2. **部署 Directus** (10 min)
   - `vercel` 部署后端
   - 配置环境变量

3. **验证后端** (3 min)
   - 访问管理后台
   - 测试 API

4. **部署前端** (5 min)
   - 更新 `.env.production`
   - `vercel --prod`

5. **最终验证** (3 min)
   - 测试 API 连接
   - 测试 WebSocket
   - 查看实时日志

## 🆘 常见问题速解

| 问题 | 解决方案 |
|------|--------|
| CORS 错误 | 检查 CORS_ORIGIN，确保包含前端 URL |
| 数据库连接失败 | 验证 DB_HOST, DB_PORT, 用户名密码 |
| WebSocket 不工作 | 需要 Vercel Pro，启用 WEBSOCKETS_ENABLED |
| 502 错误 | 查看日志：`vercel logs [project] --prod` |
| 文件上传丢失 | 配置 S3 或其他对象存储 |

## 📚 完整文档

- [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) - 迁移总结
- [VERCEL_MIGRATION_GUIDE.md](VERCEL_MIGRATION_GUIDE.md) - 完整指南
- [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) - 检查清单
- [VERCEL_ENV_TEMPLATE.md](VERCEL_ENV_TEMPLATE.md) - 环境变量模板
- [VERCEL_TROUBLESHOOTING.md](VERCEL_TROUBLESHOOTING.md) - 故障排查

## 💡 关键提示

✅ **务必做**
- 使用强密码（16+ 字符）
- 生成安全的 SECRET
- 设置正确的 CORS_ORIGIN
- 启用速率限制
- 定期备份数据库

❌ **千万别做**
- 在代码中硬编码密钥
- 使用简单密码
- 允许所有来源 CORS (`*`)
- 跳过环境变量配置
- 忘记重新部署

## 📞 需要帮助？

查看相应的文档：
1. [故障排查](VERCEL_TROUBLESHOOTING.md) - 常见问题
2. [环境变量](VERCEL_ENV_TEMPLATE.md) - 变量配置
3. [部署指南](VERCEL_MIGRATION_GUIDE.md) - 详细步骤
4. [检查清单](VERCEL_DEPLOYMENT_CHECKLIST.md) - 逐步跟踪

---

**预计完成时间：30-45 分钟**

**开始部署：** 按照 [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) 逐步进行

🚀 准备好了吗？Let's go!
