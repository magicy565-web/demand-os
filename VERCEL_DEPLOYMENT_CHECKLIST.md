# Vercel 部署快速检查清单

## 📋 部署前准备

- [ ] Vercel 账户已创建
- [ ] GitHub 账户已创建（可选但推荐）
- [ ] PostgreSQL 数据库已准备（Vercel 或 Neon）
- [ ] 获取数据库连接信息：
  - [ ] DB_HOST
  - [ ] DB_PORT
  - [ ] DB_DATABASE
  - [ ] DB_USER
  - [ ] DB_PASSWORD

## 🔐 生成必要的密钥

```bash
# 生成 SECRET 密钥（复制输出）
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- [ ] SECRET 密钥已生成：`_______________________________`
- [ ] ADMIN_EMAIL 已确定：`_______________________________`
- [ ] ADMIN_PASSWORD 已设置：强密码已记录

## 🚀 阶段 1：部署 Directus 后端

### 本地准备
- [ ] 进入 `industrial-oasis-backend` 目录
- [ ] 安装 Vercel CLI：`npm install -g vercel`
- [ ] 登录 Vercel：`vercel login`

### 创建项目
- [ ] 运行 `vercel`
- [ ] 项目名称：`directus-backend`（或自定义）
- [ ] 部署完成，获得 URL：`https://directus-yourproject.vercel.app`

### 配置环境变量

在 Vercel 控制面板 → Settings → Environment Variables 添加：

**数据库配置**
```
DB_HOST=xxxx
DB_PORT=5432
DB_DATABASE=directus
DB_USER=xxx
DB_PASSWORD=xxx
```

**Directus 配置**
```
SECRET=xxxxxxxxxxxxxxx（刚才生成的）
PUBLIC_URL=https://directus-yourproject.vercel.app
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=YourStrongPassword
```

**CORS 配置**（重要！）
```
CORS_ENABLED=true
CORS_ORIGIN=https://yourdomain.vercel.app,http://localhost:3000
CORS_METHODS=GET,POST,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true
```

**WebSocket 和存储**
```
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_ENABLED=true
STORAGE_LOCATIONS=local
STORAGE_LOCAL_ROOT=/tmp/directus-uploads
```

**限流**
```
RATE_LIMITER_ENABLED=true
RATE_LIMITER_POINTS=100
RATE_LIMITER_DURATION=1
```

- [ ] 所有环境变量已添加
- [ ] 点击 "Redeploy" 重新部署

### 验证后端

```bash
# 检查 Directus 是否启动
curl https://directus-yourproject.vercel.app

# 检查 API 端点
curl https://directus-yourproject.vercel.app/items/demands
```

- [ ] 访问 `https://directus-yourproject.vercel.app` 可以登录
- [ ] 使用 ADMIN_EMAIL 和 ADMIN_PASSWORD 成功登录
- [ ] 可以访问 "demands" 集合

## 🚀 阶段 2：部署前端

### 更新配置

编辑 `web/.env.production`：
```
NEXT_PUBLIC_DIRECTUS_URL=https://directus-yourproject.vercel.app
NEXT_PUBLIC_API_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_WS_URL=wss://directus-yourproject.vercel.app/websocket
```

- [ ] `.env.production` 已更新

### 部署前端

```bash
cd web
vercel --prod
```

或使用 GitHub 集成：
- [ ] 代码已推送到 GitHub
- [ ] Vercel 已导入 GitHub 仓库
- [ ] 前端自动部署完成

- [ ] 前端 URL 已获得：`https://yourdomain.vercel.app`

### 验证前端

- [ ] 访问前端 URL 可以打开应用
- [ ] 页面加载没有 CORS 错误
- [ ] 可以成功获取数据（查看浏览器网络标签）
- [ ] WebSocket 连接正常（查看浏览器控制台）

## 📊 测试 API 连接

在浏览器控制台运行：

```javascript
// 测试 REST API
fetch('https://directus-yourproject.vercel.app/items/demands')
  .then(r => r.json())
  .then(d => console.log('Data:', d))
  .catch(e => console.error('Error:', e));

// 测试 WebSocket
const ws = new WebSocket('wss://directus-yourproject.vercel.app/websocket');
ws.onopen = () => console.log('✓ WebSocket Connected');
ws.onerror = (e) => console.error('✗ WebSocket Error:', e);
ws.onclose = () => console.log('✗ WebSocket Closed');
```

- [ ] REST API 调用成功
- [ ] WebSocket 连接成功
- [ ] 数据能正确显示

## 🔄 数据迁移（如适用）

如果你有旧数据库的数据：

```bash
# 导出旧数据库
pg_dump -h admin.cnsubscribe.xyz -U directus -d demand_os \
  -W > backup.sql

# 导入到新数据库
psql [新数据库连接字符串] < backup.sql
```

- [ ] 旧数据已导出（可选）
- [ ] 数据已导入新数据库（可选）
- [ ] 数据完整性已验证

## 🌐 配置自定义域名（可选）

### 前端域名

在 Vercel 控制面板：
- [ ] Settings → Domains → Add
- [ ] 输入自定义域名
- [ ] 更新 DNS 记录（按 Vercel 指示）

### 后端域名（如需要）

- [ ] 为 Directus 项目配置自定义域名
- [ ] 更新环境变量 `PUBLIC_URL`
- [ ] 重新部署

## 📈 监控和优化

- [ ] 检查 Vercel 控制面板的性能指标
- [ ] 查看日志是否有错误
- [ ] 配置自动备份（在数据库提供商配置）
- [ ] 设置告警（Vercel Pro 功能）

## ✅ 最终检查

- [ ] 前端和后端都已在 Vercel 上运行
- [ ] 数据可以正确同步
- [ ] 没有 CORS 或连接错误
- [ ] 性能满足要求
- [ ] 安全配置已启用（CORS、速率限制等）
- [ ] 数据已备份

## 🔗 重要链接

- 前端项目：[生成的 Vercel URL]
- 后端项目：[生成的 Vercel URL]
- Directus 管理后台：[后端 URL]/admin
- Vercel 控制面板：https://vercel.com/dashboard

## 📞 故障排查

**问题：CORS 错误**
- 检查 CORS_ORIGIN 环境变量
- 确保包含前端的完整 URL
- 重新部署

**问题：数据库连接失败**
- 验证环境变量中的数据库连接信息
- 检查防火墙设置
- 查看 Vercel 日志：`vercel logs [project-name] --prod`

**问题：WebSocket 不工作**
- 检查 Vercel Pro 或更高计划
- 确保 WEBSOCKETS_ENABLED=true
- 查看浏览器控制台错误

---

**✨ 部署完成时间：30-45 分钟**

完成后删除此文件或保存为参考。
