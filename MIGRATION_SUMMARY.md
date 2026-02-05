# Vercel 迁移方案总结

## 📋 问题回顾

❌ **原问题**：
- Directus 后端部署在阿里云 2G 内存服务器上（admin.cnsubscribe.xyz）
- 服务器无法支持高并发业务需求
- 后端地址已无法访问
- 前端已部署在 Vercel 上

✅ **决定**：迁移 Directus 到 Vercel

---

## 🔧 已完成的准备工作

### 1. 代码更新

我已经更新了以下文件中的所有硬编码 URL：

- ✅ [web/next.config.ts](web/next.config.ts) - 更新 CORS 规则和默认 URL
- ✅ [web/src/types/demand.ts](web/src/types/demand.ts) - 更新 API_CONFIG
- ✅ [web/src/app/api/demands/route.ts](web/src/app/api/demands/route.ts) - 更新 API 路由
- ✅ [web/.env.production](web/.env.production) - 更新环境变量

所有代码现在支持通过环境变量 `NEXT_PUBLIC_DIRECTUS_URL` 配置后端地址。

### 2. 后端配置文件

创建/更新了以下文件：

- ✅ [industrial-oasis-backend/package.json](industrial-oasis-backend/package.json) - Directus 依赖
- ✅ [industrial-oasis-backend/vercel.json](industrial-oasis-backend/vercel.json) - Vercel 部署配置
- ✅ [industrial-oasis-backend/.env.example](industrial-oasis-backend/.env.example) - 环境变量示例

### 3. 完整的部署文档

我创建了 4 份详细的指南文档：

| 文档 | 用途 |
|------|------|
| [VERCEL_MIGRATION_GUIDE.md](VERCEL_MIGRATION_GUIDE.md) | 📖 完整部署指南，包含每个阶段的详细步骤 |
| [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) | ✅ 部署检查清单，便于逐步跟踪进度 |
| [VERCEL_ENV_TEMPLATE.md](VERCEL_ENV_TEMPLATE.md) | 🔐 环境变量完整模板和获取指南 |
| [VERCEL_TROUBLESHOOTING.md](VERCEL_TROUBLESHOOTING.md) | 🆘 故障排查指南，包含 8 个常见问题 |

---

## 🚀 接下来你需要做的

### 第 1 步：准备数据库（5 分钟）

**选择一个数据库方案：**

1. **Vercel PostgreSQL**（推荐）
   - 进入 Vercel 控制面板 → Storage → Create → PostgreSQL
   - 自动配置，获得连接信息

2. **Neon**（免费方案）
   - 访问 https://console.neon.tech
   - 创建数据库，获取连接字符串

3. **Supabase**
   - 访问 https://supabase.com
   - 创建项目，获取连接信息

### 第 2 步：获取需要的信息

生成 SECRET 密钥：
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

准备以下信息：
- [ ] DB_HOST（数据库主机）
- [ ] DB_PORT（通常 5432）
- [ ] DB_USER（数据库用户）
- [ ] DB_PASSWORD（数据库密码）
- [ ] SECRET（刚才生成的）
- [ ] ADMIN_EMAIL（管理员邮箱）
- [ ] ADMIN_PASSWORD（管理员密码，16 字符以上）

### 第 3 步：部署 Directus

```bash
cd industrial-oasis-backend

# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel
```

### 第 4 步：在 Vercel 配置环境变量

1. 进入 Vercel 控制面板 → 选择 Directus 项目
2. Settings → Environment Variables
3. 添加所有环境变量（参考 [VERCEL_ENV_TEMPLATE.md](VERCEL_ENV_TEMPLATE.md)）
4. 点击 "Redeploy" 重新部署

### 第 5 步：验证后端

```bash
# 访问 Directus 管理后台
https://directus-yourproject.vercel.app

# 使用 ADMIN_EMAIL 和 ADMIN_PASSWORD 登录
```

### 第 6 步：更新前端配置

编辑 `.env.production`：
```
NEXT_PUBLIC_DIRECTUS_URL=https://directus-yourproject.vercel.app
NEXT_PUBLIC_API_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_WS_URL=wss://directus-yourproject.vercel.app/websocket
```

部署前端：
```bash
cd web
vercel --prod
```

---

## 📊 架构对比

### 旧架构（有问题）
```
阿里云 2G 服务器（单点故障）
├── Directus (admin.cnsubscribe.xyz)
├── PostgreSQL
└── Redis
    ↑ 无法访问 ❌
```

### 新架构（推荐）
```
Vercel（全球 CDN + 自动扩容）
├── 前端 Next.js (yourdomain.vercel.app)
└── 后端 Directus (directus-yourproject.vercel.app)
    ↓
Vercel PostgreSQL 或 Neon（托管数据库）
    ↓
自动备份、监控、高可用 ✅
```

### 优势
- ✅ **自动扩容**：支持高并发，不用担心内存
- ✅ **全球部署**：自动分布在全球各地，加速访问
- ✅ **零维护**：无需管理服务器、操作系统、补丁
- ✅ **高可用**：自动故障转移、冗余备份
- ✅ **成本合理**：按使用付费，无固定成本
- ✅ **开发友好**：Git 集成、自动部署、实时日志

---

## 💰 成本估算

| 服务 | 价格 | 说明 |
|------|------|------|
| Vercel 前端 Pro | $20/月 | 包含自动部署、CDN、分析 |
| Vercel 后端函数 | $0.15-0.50/M请求 | 按调用计费 |
| Vercel PostgreSQL | $15-100/月 | 根据存储和计算能力 |
| **总计** | **$35-120/月** | 根据实际使用量 |

相比阿里云 2G 服务器（~$30-50/月），提供了更好的性能和可靠性。

---

## 🧪 测试清单

部署后验证以下项目：

```javascript
// 1. 测试 API 连接
fetch('https://directus-yourproject.vercel.app/items/demands')
  .then(r => r.json())
  .then(d => console.log('✓ API works', d))
  .catch(e => console.error('✗ API failed', e));

// 2. 测试 CORS
fetch('https://yourdomain.vercel.app/api/directus/items/demands')
  .then(r => r.json())
  .then(d => console.log('✓ CORS works'))
  .catch(e => console.error('✗ CORS failed', e));

// 3. 测试 WebSocket
const ws = new WebSocket('wss://directus-yourproject.vercel.app/websocket');
ws.onopen = () => console.log('✓ WebSocket works');
ws.onerror = () => console.error('✗ WebSocket failed');

// 4. 测试前端功能
// 浏览应用，确保数据正确加载
```

---

## 📞 遇到问题？

1. **查看详细故障排查**: [VERCEL_TROUBLESHOOTING.md](VERCEL_TROUBLESHOOTING.md)
2. **查看完整部署指南**: [VERCEL_MIGRATION_GUIDE.md](VERCEL_MIGRATION_GUIDE.md)
3. **环境变量配置**: [VERCEL_ENV_TEMPLATE.md](VERCEL_ENV_TEMPLATE.md)
4. **部署进度跟踪**: [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md)

---

## ✅ 总结

| 项目 | 状态 | 说明 |
|------|------|------|
| 代码更新 | ✅ 完成 | 所有硬编码 URL 已替换为环境变量 |
| 后端配置 | ✅ 完成 | Vercel 部署配置已就位 |
| 文档 | ✅ 完成 | 4 份详细指南已创建 |
| 部署 | ⏳ 待做 | 按照指南部署 Directus |
| 验证 | ⏳ 待做 | 验证所有功能正常工作 |

---

## 🎯 预计时间

- **数据库准备**: 5 分钟
- **后端部署**: 10 分钟
- **环境配置**: 5 分钟
- **验证测试**: 5 分钟
- **前端更新**: 3 分钟

**总计**: 约 30-45 分钟即可完全迁移！

---

**现在就开始吧！** 参考 [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) 逐步完成部署。

如有任何疑问，查看对应的文档或故障排查指南。

🚀 祝部署顺利！
