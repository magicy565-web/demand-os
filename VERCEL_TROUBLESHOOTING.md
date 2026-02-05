# Vercel 部署故障排查指南

## 🔍 常见问题及解决方案

---

## 1️⃣ 数据库连接失败

### 症状
- Directus 无法启动
- 日志显示 "connect ECONNREFUSED" 或 "FATAL: remaining connection slots are reserved"

### 排查步骤

```bash
# 1. 查看 Vercel 日志
vercel logs industrial-oasis-backend --prod

# 2. 测试数据库连接
psql postgresql://user:password@host:port/database
```

### 常见原因和解决方案

| 原因 | 症状 | 解决方案 |
|------|------|--------|
| 连接字符串错误 | connection refused | 检查 DB_HOST, DB_PORT, DB_PASSWORD |
| 防火墙阻止 | timeout | 允许 Vercel IP 在数据库防火墙中 |
| 数据库离线 | FATAL: database "X" does not exist | 创建数据库或检查名称 |
| 用户权限不足 | FATAL: role does not exist | 创建用户或赋予权限 |
| 连接池已满 | remaining connection slots reserved | 增加数据库连接数或优化查询 |

### 修复方法

**✅ 方案 1：使用 Vercel PostgreSQL**

1. Vercel 控制面板 → Storage → Create → PostgreSQL
2. Vercel 自动填充环境变量
3. 重新部署

**✅ 方案 2：使用 Neon**

1. 访问 https://console.neon.tech
2. 创建数据库
3. 复制连接字符串格式的环境变量
4. 检查防火墙是否允许 Vercel IP

**✅ 方案 3：检查环境变量**

```bash
# 在 Vercel 控制面板验证：
echo $DB_HOST   # 应该显示主机名
echo $DB_PORT   # 应该是 5432
echo $DB_USER   # 应该是用户名
echo $DB_PASSWORD  # 不应该为空
```

---

## 2️⃣ CORS 错误

### 症状
- 浏览器控制台显示：`Access to XMLHttpRequest blocked by CORS policy`
- 前端无法获取数据
- 网络标签显示请求被中止

### 排查步骤

```javascript
// 在浏览器控制台运行
fetch('https://directus-backend.vercel.app/items/demands')
  .then(r => {
    console.log('Status:', r.status);
    console.log('Headers:', r.headers);
    return r.json();
  })
  .catch(e => console.error('Error:', e));
```

### 常见原因

| 原因 | 解决方案 |
|------|--------|
| CORS_ENABLED=false | 设置为 true |
| CORS_ORIGIN 不包含前端 URL | 添加前端 URL，用逗号分隔 |
| 请求头缺少 Authorization | 添加 Authorization 头 |
| 浏览器安全策略 | 使用 HTTPS，检查端口 |

### 修复方法

**✅ 检查和更新环境变量：**

```
CORS_ENABLED=true
CORS_ORIGIN=https://yourdomain.vercel.app,https://www.yourdomain.com,http://localhost:3000
CORS_METHODS=GET,POST,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true
```

**✅ 在 Vercel 重新部署：**

```bash
vercel --prod --force
```

**✅ 检查前端代码**

```typescript
// 确保请求包含正确的头
const response = await fetch(
  `${DIRECTUS_URL}/items/demands`,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // 如需要
    },
    credentials: 'include' // 如启用了 CORS_CREDENTIALS
  }
);
```

---

## 3️⃣ WebSocket 连接失败

### 症状
- WebSocket 连接立即断开
- 浏览器控制台：`WebSocket is closed before the connection is established`
- 实时数据不更新

### 原因和解决方案

| 原因 | 解决方案 |
|------|--------|
| Vercel 免费计划 | 升级到 Pro 计划（免费计划不支持长连接） |
| WEBSOCKETS_ENABLED=false | 设置为 true |
| 防火墙阻止 WebSocket | 检查防火墙规则 |
| 代理不支持 WebSocket | 配置代理或 CDN 支持 |

### 修复方法

**✅ 启用 WebSocket：**

```
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_ENABLED=true
WEBSOCKETS_GRAPHQL_ENABLED=false
```

**✅ 升级 Vercel 计划：**

Vercel Pro 或更高版本支持长连接和 WebSocket。

**✅ 测试 WebSocket：**

```javascript
const ws = new WebSocket('wss://directus-backend.vercel.app/websocket');

ws.onopen = () => {
  console.log('✓ Connected');
  ws.send(JSON.stringify({ type: 'subscribe', collection: 'demands' }));
};

ws.onmessage = (event) => {
  console.log('Message:', event.data);
};

ws.onerror = (error) => {
  console.error('✗ Error:', error);
};

ws.onclose = () => {
  console.log('✗ Closed');
};
```

---

## 4️⃣ 502 Bad Gateway 或 503 Service Unavailable

### 症状
- Directus 返回 502 或 503 错误
- 应用间歇性不可用
- Vercel 日志显示函数超时

### 原因

| 原因 | 症状 | 解决方案 |
|------|------|--------|
| 内存不足 | 频繁 502 | 优化代码，增加 Vercel 计划 |
| 函数超时 | 30 秒后返回 502 | 优化数据库查询 |
| 数据库连接池已满 | 间歇性 503 | 增加连接数或优化连接使用 |
| 依赖版本冲突 | 启动时 502 | 检查 package.json，清除缓存 |

### 修复方法

**✅ 查看日志**

```bash
vercel logs industrial-oasis-backend --prod
```

**✅ 优化数据库查询**

```typescript
// ❌ 不好：获取所有字段
const response = await fetch(`${DIRECTUS_URL}/items/demands`);

// ✅ 好：只获取需要的字段
const response = await fetch(
  `${DIRECTUS_URL}/items/demands?fields=id,title,status,created_at&limit=50`
);
```

**✅ 配置分页**

```typescript
// 避免一次性加载大量数据
const page = 1;
const pageSize = 50;
const response = await fetch(
  `${DIRECTUS_URL}/items/demands?skip=${(page-1)*pageSize}&limit=${pageSize}`
);
```

**✅ 增加内存**

在 `vercel.json` 中配置：

```json
{
  "functions": {
    "api/[...].js": {
      "maxDuration": 30,
      "memory": 1024
    }
  }
}
```

---

## 5️⃣ 文件上传失败

### 症状
- 上传文件后消失
- 无法访问已上传的文件
- 存储配置错误

### 原因

| 原因 | 解决方案 |
|------|--------|
| 使用本地存储 | Vercel 临时存储在函数执行后被清除，需要使用 S3 等 |
| 权限不足 | 检查 S3 权限或存储服务访问密钥 |
| 磁盘空间不足 | 优化存储或升级计划 |

### 修复方法

**✅ 配置 S3 存储（生产推荐）**

```
STORAGE_LOCATIONS=s3
STORAGE_S3_DRIVER=s3
STORAGE_S3_BUCKET=your-bucket-name
STORAGE_S3_REGION=us-east-1
STORAGE_S3_KEY=your-access-key-id
STORAGE_S3_SECRET=your-secret-access-key
STORAGE_S3_ACL=public-read
STORAGE_S3_ENDPOINT=https://s3.amazonaws.com
```

**✅ 配置 Cloudinary**

```
STORAGE_LOCATIONS=cloudinary
STORAGE_CLOUDINARY_DRIVER=cloudinary
STORAGE_CLOUDINARY_KEY=your-api-key
STORAGE_CLOUDINARY_SECRET=your-api-secret
STORAGE_CLOUDINARY_NAME=your-cloud-name
```

---

## 6️⃣ 500 Internal Server Error

### 症状
- 请求返回 500 错误
- 日志显示 JavaScript 错误
- 功能完全中断

### 排查步骤

```bash
# 1. 查看完整日志
vercel logs industrial-oasis-backend --prod --tail

# 2. 搜索错误
vercel logs industrial-oasis-backend --prod | grep -i error
```

### 常见原因

```
Error: Cannot find module 'xxx'          → 缺少依赖
SyntaxError: Unexpected token            → 代码语法错误
TypeError: Cannot read property 'xxx'    → 变量未定义
ReferenceError: 'xxx' is not defined     → 环境变量未设置
```

### 修复方法

**✅ 安装缺失的依赖**

```bash
npm install [missing-package]
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
# Vercel 自动重新部署
```

**✅ 清除缓存并重新部署**

在 Vercel 控制面板：
1. Deployments → 最近的部署
2. 点击三个点 → "Redeploy"
3. 选择 "Redeploy without cache"

---

## 7️⃣ 性能缓慢

### 症状
- API 响应慢（>5 秒）
- 前端加载缓慢
- 用户体验差

### 排查步骤

```bash
# 查看函数执行时间
vercel logs industrial-oasis-backend --prod

# 监控内存使用
# 在 Vercel 控制面板查看 Analytics
```

### 优化方案

| 问题 | 解决方案 |
|------|--------|
| 数据库查询慢 | 添加索引，优化查询语句 |
| 数据量大 | 实现分页，添加过滤条件 |
| 缓存不足 | 启用缓存，设置 TTL |
| 并发数高 | 增加连接池，使用 CDN |

### 修复方法

**✅ 启用缓存**

```
CACHE_ENABLED=true
CACHE_STORE=memory
CACHE_TTL=3600
```

**✅ 优化查询**

```typescript
// ❌ 慢：获取所有关联数据
const url = `${DIRECTUS_URL}/items/demands?deep[suppliers][_limit]=-1`;

// ✅ 快：只获取必要的字段和限制结果
const url = `${DIRECTUS_URL}/items/demands?fields=id,title,status&limit=20`;
```

**✅ 使用 CDN**

配置 Cloudflare 或其他 CDN 加速 API 响应。

---

## 8️⃣ 部署失败

### 症状
- Vercel 部署中止
- 显示红色错误标记

### 常见原因和修复

```bash
# 查看构建日志
vercel logs [project] --prod

# 常见错误信息
# "Command failed" → 构建脚本错误
# "Out of memory" → 构建内存不足
# "ENOENT" → 文件不存在
```

### 修复方法

**✅ 检查 package.json**

```json
{
  "scripts": {
    "build": "echo 'Directus uses Docker, no build needed'",
    "dev": "node --loader tsx/esm ./node_modules/directus/cli.js start",
    "start": "directus start"
  }
}
```

**✅ 检查依赖**

```bash
npm install
npm audit fix
```

**✅ 清除构建缓存**

在 Vercel 控制面板：
1. Settings → Deployment
2. Delete Production Deployments
3. 重新推送代码

---

## 📊 诊断命令集

```bash
# 查看实时日志
vercel logs industrial-oasis-backend --prod --tail

# 查看过去 1 小时的日志
vercel logs industrial-oasis-backend --prod --since 1h

# 搜索错误日志
vercel logs industrial-oasis-backend --prod | grep ERROR

# 查看部署历史
vercel deployments --prod

# 检查环境变量
vercel env list

# 测试数据库连接
psql $DATABASE_URL -c "SELECT version();"

# 远程执行诊断命令
vercel shell [project-id]
```

---

## 🆘 获取帮助

1. **Vercel 文档**: https://vercel.com/docs
2. **Directus 文档**: https://docs.directus.io
3. **PostgreSQL 文档**: https://www.postgresql.org/docs/

---

## 📋 快速诊断清单

遇到问题时按顺序检查：

- [ ] 数据库连接字符串正确吗？
- [ ] 所有环境变量都已设置？
- [ ] CORS 配置正确吗？
- [ ] 防火墙允许连接吗？
- [ ] 查看了 Vercel 日志吗？
- [ ] 代码有语法错误吗？
- [ ] 依赖已安装吗？
- [ ] 内存充足吗？
- [ ] 计划支持该功能吗？（如 WebSocket）

---

**最后更新：2026-02-05**
