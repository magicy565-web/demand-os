# Vercel 部署完整方案 - Directus + Next.js 前端

## 📋 部署架构

```
┌─────────────────────────────────────┐
│   Vercel Frontend                   │
│   (Next.js Web Application)         │
│   https://yourdomain.vercel.app     │
└──────────────┬──────────────────────┘
               │ 
               ├─ REST API 调用
               ├─ WebSocket 连接
               │
┌──────────────▼──────────────────────┐
│   Vercel Backend (Directus)         │
│   https://directus-yourproject...   │
│                                      │
│   ┌─────────────────────────────┐   │
│   │   Directus CMS              │   │
│   │   (Node.js 应用)             │   │
│   └────────────┬────────────────┘   │
└────────────────┼────────────────────┘
                 │
┌────────────────▼────────────────────┐
│   Vercel PostgreSQL 或外部数据库   │
│   (PostgreSQL Database)              │
└──────────────────────────────────────┘
```

## 🚀 部署步骤

### 阶段 1：准备数据库（5 分钟）

#### 选项 A：使用 Vercel PostgreSQL（推荐）
1. 进入 Vercel 控制面板
2. 选择你的项目 → Storage → Connect Store → Create New → PostgreSQL
3. 配置数据库（Database Name: `directus`）
4. 完成后，Vercel 自动将连接信息添加到环境变量

#### 选项 B：使用免费的 Neon
1. 访问 https://console.neon.tech
2. 注册并创建项目
3. 创建数据库 `directus`
4. 获取连接字符串（形如：`postgresql://user:password@host:port/database`）
5. 在 Vercel 项目设置中手动添加环境变量

### 阶段 2：部署 Directus 后端（10 分钟）

#### 步骤 1：为 Directus 创建新的 Vercel 项目

```bash
# 进入后端目录
cd industrial-oasis-backend

# 创建 Git 仓库（如果还没有）
git init

# 提交文件
git add .
git commit -m "Init Directus for Vercel"

# 关联到 GitHub（可选，但推荐）
git remote add origin https://github.com/yourusername/directus-backend.git
git push -u origin main
```

#### 步骤 2：在 Vercel 创建新项目

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署（在 industrial-oasis-backend 目录下）
vercel
```

按照提示：
- Project name: `directus-backend` 或自定义名称
- Select Scope: 选择你的 Vercel 账户
- Overwrite? 选择 No（第一次部署）

#### 步骤 3：配置环境变量

在 Vercel 控制面板 → 你的项目 → Settings → Environment Variables，添加：

**数据库配置：**
```
DB_HOST=           (从 Vercel PostgreSQL 或 Neon 获取)
DB_PORT=5432
DB_DATABASE=directus
DB_USER=           (从数据库获取)
DB_PASSWORD=       (从数据库获取)
```

**Directus 核心配置：**
```
SECRET=your-secure-secret-key-min-32-chars
PUBLIC_URL=https://directus-yourproject.vercel.app
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=StrongPassword@2024!
```

**CORS 配置（关键！）：**
```
CORS_ENABLED=true
CORS_ORIGIN=https://yourdomain.vercel.app,https://www.yourdomain.com,http://localhost:3000
CORS_METHODS=GET,POST,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true
```

**WebSocket 和存储：**
```
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_ENABLED=true
STORAGE_LOCATIONS=local
STORAGE_LOCAL_ROOT=/tmp/directus-uploads
```

**限流（防止滥用）：**
```
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=100
RATE_LIMITER_DURATION=1
```

#### 步骤 4：生成安全的 SECRET

在终端运行：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

复制输出（32 字符的随机字符串），用于 `SECRET` 环境变量。

#### 步骤 5：重新部署

设置完环境变量后，在 Vercel 控制面板点击 "Redeploy" 或运行：
```bash
vercel --prod
```

### 阶段 3：验证 Directus 后端（3 分钟）

1. 访问 `https://directus-yourproject.vercel.app`
2. 使用 ADMIN_EMAIL 和 ADMIN_PASSWORD 登录
3. 检查是否能访问 "demands" 集合
4. 测试 API：访问 `https://directus-yourproject.vercel.app/items/demands`

### 阶段 4：部署前端到 Vercel（5 分钟）

#### 步骤 1：更新前端环境配置

编辑 [web/.env.production](../web/.env.production)：

```
NEXT_PUBLIC_DIRECTUS_URL=https://directus-yourproject.vercel.app
NEXT_PUBLIC_API_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_WS_URL=wss://directus-yourproject.vercel.app/websocket
```

#### 步骤 2：部署前端

```bash
cd web

# 关联 Vercel 项目
vercel link

# 部署
vercel --prod
```

或者使用 GitHub 集成：
1. 推送代码到 GitHub
2. 在 Vercel 控制面板导入 GitHub 仓库
3. Vercel 自动部署

### 阶段 5：配置自定义域名（可选，5 分钟）

#### 前端域名配置：
1. Vercel 控制面板 → 项目 → Settings → Domains
2. 添加自定义域名
3. 更新 DNS 记录（按 Vercel 指示）

#### 后端域名配置：
1. 为 Directus 项目配置自定义域名（同上）
2. 更新环境变量 `PUBLIC_URL` 为新域名
3. 重新部署

## 🧪 测试连接

### 测试 1：检查 Directus 可用性

```bash
curl https://directus-yourproject.vercel.app
```

应该返回 JSON 响应。

### 测试 2：检查 API 端点

```bash
curl https://directus-yourproject.vercel.app/items/demands
```

如果返回 401，需要检查身份验证配置。

### 测试 3：检查 CORS

在浏览器控制台运行：
```javascript
fetch('https://directus-yourproject.vercel.app/items/demands')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));
```

### 测试 4：检查 WebSocket

```javascript
const ws = new WebSocket('wss://directus-yourproject.vercel.app/websocket');
ws.onopen = () => console.log('Connected');
ws.onerror = (e) => console.error('Error:', e);
```

## 🔄 数据迁移（如果有现有数据）

### 导出旧数据库：

```bash
# 从阿里云导出
pg_dump -h admin.cnsubscribe.xyz -U directus -d demand_os \
  -W > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 导入到新数据库：

```bash
# 导入到 Vercel PostgreSQL
psql postgresql://user:password@host:port/database < backup.sql
```

或者通过 Vercel 数据库控制面板直接导入。

## ⚡ 性能优化建议

### 1. 启用缓存

在 Vercel 环境变量中添加：
```
CACHE_ENABLED=true
CACHE_STORE=memory
```

### 2. 配置 CDN

将 Directus 配置域名到 CDN（如 Cloudflare）。

### 3. 监控性能

在 Vercel 控制面板查看：
- Function Duration
- Memory Usage
- Error Rate

### 4. 启用持久存储

对于文件上传，建议配置 S3：
```
STORAGE_LOCATIONS=s3
STORAGE_S3_DRIVER=s3
STORAGE_S3_BUCKET=your-bucket
STORAGE_S3_REGION=us-east-1
STORAGE_S3_KEY=your-key
STORAGE_S3_SECRET=your-secret
```

## 🔒 安全建议

- ✅ 使用强密码（最少 16 字符，包含大小写、数字、特殊字符）
- ✅ SECRET 密钥应该是 32 字符的随机字符串
- ✅ 定期更新 Directus 版本
- ✅ 在 CORS_ORIGIN 中只列出允许的域名
- ✅ 启用速率限制防止 DDoS
- ✅ 定期备份数据库
- ✅ 使用 HTTPS（Vercel 自动提供）
- ✅ 配置 API 权限和角色

## 📊 监控和故障排查

### 查看日志

```bash
# 查看 Vercel 日志
vercel logs industrial-oasis-backend --prod
```

### 常见问题

#### 问题 1：CORS 错误
**解决方案：**
- 检查 CORS_ORIGIN 是否包含你的前端域名
- 确保 CORS_CREDENTIALS=true
- 重新部署

#### 问题 2：数据库连接失败
**解决方案：**
- 验证 DB_HOST, DB_PORT, DB_USER, DB_PASSWORD
- 检查数据库防火墙是否允许 Vercel IP
- 查看 Vercel 日志

#### 问题 3：WebSocket 连接失败
**解决方案：**
- 确保 Vercel Pro 或更高计划（免费计划不支持 WebSocket）
- 检查 WEBSOCKETS_ENABLED=true
- 查看浏览器控制台错误

#### 问题 4：文件上传失败
**解决方案：**
- Vercel 临时存储有限制，大文件上传后会丢失
- 建议配置 S3 或其他对象存储
- 或在本地开发时使用，生产环境禁用

## 📚 相关文件

- 后端配置：[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- 前端配置：[../web/.env.production](../web/.env.production)
- Docker 配置：[docker-compose.yml](./docker-compose.yml)

## 🎯 下一步

1. ✅ 部署 Directus 到 Vercel
2. ✅ 部署前端到 Vercel
3. ✅ 配置自定义域名
4. ✅ 设置自动备份
5. ✅ 监控性能和错误
6. ✅ 定期更新依赖

## 💡 成本估算

- **Vercel**: 按使用计费（前端 Pro $20/月起，后端按函数调用计费）
- **PostgreSQL**: Vercel 数据库 $15/月起，或 Neon 免费/按用量计费
- **总体成本**: 相比 2G 内存的阿里云服务器，Vercel 提供无限扩容和更好的可靠性

---

**部署耗时：**大约 30-45 分钟
**难度级别：**中等
**推荐人员：**有 Node.js 和数据库基础知识的开发者
