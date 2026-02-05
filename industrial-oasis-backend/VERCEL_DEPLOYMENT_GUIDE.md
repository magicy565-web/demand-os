# 部署 Directus 到 Vercel - 完整指南

## 概述
本指南帮助你将 Directus 后端部署到 Vercel，支持高并发和自动扩容。

## 前置要求
- Vercel 账户
- GitHub 账户（推荐使用 Git）
- PostgreSQL 数据库（选择下面的一种）

## 步骤 1：准备数据库

### 选项 A：使用 Vercel PostgreSQL (推荐)
1. 在 Vercel 项目中添加 PostgreSQL 数据库
2. Vercel 将自动设置环境变量：`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USER`, `DB_PASSWORD`

### 选项 B：使用 Neon（免费方案）
1. 访问 https://console.neon.tech
2. 创建项目和数据库
3. 获取连接字符串：`postgresql://user:password@host/database`
4. 在 Vercel 设置环境变量

### 选项 C：使用 Supabase
1. 访问 https://supabase.com
2. 创建项目
3. 获取数据库连接信息
4. 在 Vercel 设置环境变量

## 步骤 2：生成安全密钥

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
复制输出，用于 `SECRET` 环境变量。

## 步骤 3：配置 Vercel 环境变量

在 Vercel 项目设置中添加以下环境变量：

### 数据库配置
```
DB_HOST=xxxx.postgres.vercel-storage.com
DB_PORT=5432
DB_DATABASE=directus
DB_USER=default
DB_PASSWORD=your_password
```

### Directus 配置
```
SECRET=生成的密钥
PUBLIC_URL=https://directus-yourproject.vercel.app
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe@2024!
```

### CORS 配置
```
CORS_ENABLED=true
CORS_ORIGIN=https://yourdomain.vercel.app,https://www.yourdomain.com
CORS_METHODS=GET,POST,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true
```

### WebSocket 和存储
```
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_ENABLED=true
STORAGE_LOCATIONS=local
STORAGE_LOCAL_ROOT=/tmp/directus-uploads
```

### 限流
```
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=100
RATE_LIMITER_DURATION=1
```

## 步骤 4：部署到 Vercel

### 方法 1：通过 GitHub（推荐）
1. 将代码推送到 GitHub
2. 在 Vercel 中连接你的 GitHub 仓库
3. Vercel 将自动部署

### 方法 2：使用 Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## 步骤 5：迁移数据

如果你有现有的数据库数据：

1. **导出旧数据库（从阿里云）**
```bash
pg_dump -h admin.cnsubscribe.xyz -U directus -d demand_os > backup.sql
```

2. **导入到新数据库**
```bash
psql -h new_host -U user -d database < backup.sql
```

## 步骤 6：更新前端配置

### 更新 `.env.production`
```
NEXT_PUBLIC_DIRECTUS_URL=https://directus-yourproject.vercel.app
NEXT_PUBLIC_API_URL=https://yourdomain.vercel.app
```

### 更新代码中的硬编码 URL
项目中会自动使用环境变量。

## 步骤 7：测试连接

1. 访问 `https://directus-yourproject.vercel.app`
2. 登录管理界面
3. 检查 Demands 集合是否可以访问

## 常见问题

### Q: Vercel 是否支持 Directus？
A: Vercel 的自由计划有限制。建议使用付费计划以支持实时 WebSocket 连接。

### Q: 文件上传如何处理？
A: 
- 开发环境：使用本地存储
- 生产环境：建议配置 S3、Cloudinary 或其他对象存储

### Q: WebSocket 连接不工作？
A: 
- 确保你的 Vercel 项目使用 Pro 或更高计划
- 检查 WEBSOCKETS_ENABLED=true
- 检查 CORS 配置正确

### Q: 数据库连接失败？
A: 
1. 检查环境变量是否正确
2. 确保数据库允许 Vercel IP 连接
3. 检查防火墙规则

## 性能优化

### 启用缓存
```
CACHE_ENABLED=true
CACHE_STORE=memory
```

### 启用速率限制
```
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=100
RATE_LIMITER_DURATION=1
```

## 监控和日志

在 Vercel 控制面板查看：
- 部署日志
- 运行时错误
- 性能指标

## 安全建议

1. ✅ 使用强密码和 SECRET 密钥
2. ✅ 定期更新 Directus 版本
3. ✅ 启用 CORS 白名单
4. ✅ 启用速率限制
5. ✅ 定期备份数据库
6. ✅ 使用 HTTPS
7. ✅ 配置 API 密钥和权限

## 后续步骤

1. ✅ 配置自定义域名（可选）
2. ✅ 设置自动备份
3. ✅ 监控性能和错误
4. ✅ 定期更新依赖
