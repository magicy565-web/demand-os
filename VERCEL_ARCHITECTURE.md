# 🏗️ Vercel 部署架构和流程

## 📊 新的系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                      用户浏览器                                    │
│                  (用户访问你的应用)                              │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   Vercel Edge      │
                    │   (全球 CDN)        │
                    └─────────┬──────────┘
           ┌────────────────┬─┴──────────────┬──────────────┐
           │                │                │              │
    ┌──────▼─────┐  ┌──────▼────────┐  ┌───▼──────┐  ┌──────▼────┐
    │  静态资源   │  │  API 代理      │  │WebSocket │  │  分析    │
    │  (JS/CSS)  │  │  (/api/...)    │  │ 长连接   │  │  服务   │
    └────────────┘  └──────┬────────┘  └───┬──────┘  └─────────┘
                           │               │
           ┌───────────────┴─────┬─────────┴────────────┐
           │                     │                      │
    ┌──────▼──────────┐  ┌──────▼──────────┐  ┌────────▼──────┐
    │  前端应用       │  │  后端 API       │  │  WebSocket    │
    │  (Next.js)      │  │ (Directus)      │  │  连接         │
    │  yourdomain.    │  │ directus-proj.  │  │ 实时推送      │
    │  vercel.app     │  │ vercel.app      │  │               │
    └─────────────────┘  └──────┬──────────┘  └───────┬────────┘
                                 │                    │
                          ┌──────▼────────────┬───────▼──┐
                          │                   │          │
                    ┌─────▼──────┐    ┌──────▼──┐   ┌───▼──┐
                    │ PostgreSQL  │    │ 身份    │   │ 日志 │
                    │ 数据库      │    │ 认证    │   │ 管理 │
                    │             │    │         │   │      │
                    └─────────────┘    └─────────┘   └──────┘
```

## 🚀 部署流程图

```
START
  │
  ▼
┌─────────────────────────────────────┐
│ 1. 准备数据库 (5 min)               │
│   - Vercel PostgreSQL 或 Neon      │
│   - 获取连接信息                    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 2. 生成密钥 (2 min)                 │
│   - SECRET (32 字符)                │
│   - ADMIN_PASSWORD (强密码)          │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 3. 部署 Directus (10 min)           │
│   - vercel login                    │
│   - vercel deploy                   │
│   - 获取部署 URL                    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 4. 配置环境变量 (5 min)             │
│   - DB 连接信息                     │
│   - CORS 配置                       │
│   - SECRET 和密码                   │
│   - WebSocket 设置                  │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 5. 重新部署 (2 min)                 │
│   - Vercel: Redeploy                │
│   - 等待部署完成                    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 6. 验证后端 (3 min)                 │
│   - 访问管理后台                    │
│   - 测试 API 端点                   │
│   - 检查数据库连接                  │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 7. 更新前端配置 (2 min)             │
│   - 编辑 .env.production            │
│   - 更新 DIRECTUS_URL               │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 8. 部署前端 (5 min)                 │
│   - vercel --prod                   │
│   - 等待部署完成                    │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│ 9. 最终测试 (3 min)                 │
│   - 测试 API 连接                   │
│   - 测试 WebSocket                  │
│   - 检查数据同步                    │
└─────────────┬───────────────────────┘
              │
              ▼
           SUCCESS ✅
         约 30-45 分钟
```

## 🔄 数据流向

### API 请求流程

```
浏览器
  │ fetch('/api/demands')
  ▼
Next.js 前端 (yourdomain.vercel.app)
  │ 请求 /api/demands
  ▼
Vercel Edge Router
  │ 路由到后端
  ▼
Vercel Functions
  │ 转发到 https://directus-project.vercel.app
  ▼
Directus API
  │ 查询数据库
  ▼
PostgreSQL 数据库
  │ 返回数据
  ▼
Directus API
  │ 格式化响应
  ▼
浏览器
  │ 接收 JSON
  ▼
前端应用 (渲染 UI)
```

### WebSocket 实时推送流程

```
浏览器
  │ new WebSocket(wss://...)
  ▼
Vercel WebSocket Handler
  ▼
Directus WebSocket
  │ subscribe to collection
  ▼
数据库变更监听器
  │
  ├─ 插入新数据
  ├─ 更新现有数据
  └─ 删除数据
  │
  ▼
WebSocket Server
  │ broadcast 事件
  ▼
浏览器 (接收实时更新)
  │
  ▼
前端应用 (自动刷新 UI)
```

## 🏢 环境配置对应关系

```
┌───────────────────────────────────────────────────────────┐
│                  开发环境 (Development)                    │
├───────────────────────────────────────────────────────────┤
│ 前端: http://localhost:3000                              │
│ 后端: http://localhost:8055                              │
│ 数据库: localhost PostgreSQL                              │
│ CORS: 允许 localhost                                     │
│ WebSocket: ws://localhost:8055                           │
└───────────────────────────────────────────────────────────┘
                          │
                          ▼ git push
┌───────────────────────────────────────────────────────────┐
│                   生产环境 (Production)                    │
├───────────────────────────────────────────────────────────┤
│ 前端: https://yourdomain.vercel.app                      │
│ 后端: https://directus-project.vercel.app                │
│ 数据库: Vercel PostgreSQL / Neon                          │
│ CORS: 允许特定域名                                       │
│ WebSocket: wss://directus-project.vercel.app             │
│ CDN: Vercel 全球网络                                      │
│ SSL: 自动 HTTPS                                           │
│ 监控: Vercel Analytics                                   │
│ 扩容: 自动                                               │
└───────────────────────────────────────────────────────────┘
```

## 📁 文件结构变化

### 部署前

```
阿里云服务器 (2G 内存)
├── Directus (docker-compose)
│   ├── PostgreSQL
│   └── Redis
├── Nginx
└── 问题：并发能力弱 ❌
```

### 部署后

```
Vercel (全球 CDN + 自动扩容)
├── 前端 Function
│   └── Next.js 应用
├── 后端 Function
│   └── Directus 应用
└── 数据库
    └── PostgreSQL (Vercel 或 Neon)

优势：无限扩容、高可用、全球加速 ✅
```

## 🔌 连接验证检查点

```
┌─ 前端部署成功？
│  └─ ✅ yourdomain.vercel.app 可访问
│
├─ 后端部署成功？
│  └─ ✅ directus-project.vercel.app 可访问
│
├─ 数据库连接成功？
│  └─ ✅ Directus 管理后台可登录
│
├─ CORS 配置正确？
│  └─ ✅ API 调用无 CORS 错误
│
├─ WebSocket 连接成功？
│  └─ ✅ 实时数据推送正常
│
├─ 数据同步正常？
│  └─ ✅ 前端能获取后端数据
│
└─ 全部通过？
   └─ ✅ 迁移完成！🎉
```

## 🎯 性能指标

### 预期性能改进

| 指标 | 旧 (阿里云 2G) | 新 (Vercel) |
|------|---|---|
| 并发支持 | ~50 | 无限 |
| 响应时间 | 200-500ms | 50-150ms |
| 全球延迟 | 200-1000ms | 10-100ms* |
| 自动扩容 | ❌ 手动 | ✅ 自动 |
| 故障转移 | ❌ | ✅ |
| CDN | ❌ | ✅ |
| 可用性 | 99.5% | 99.95% |
| 成本 | 固定 ¥30-50/月 | 按用量 $0-50/月** |

*取决于用户地理位置
**根据实际流量

## 🔐 安全增强

```
┌─────────────────────────────────┐
│      安全层级                    │
├─────────────────────────────────┤
│ 1. 自动 HTTPS/TLS              │ Vercel
│ 2. DDoS 防护                    │ Vercel
│ 3. 速率限制                     │ Directus
│ 4. CORS 白名单                  │ Directus
│ 5. 身份认证                     │ Directus
│ 6. 数据库访问控制                │ PostgreSQL
│ 7. 环境变量加密                  │ Vercel
│ 8. API 权限管理                 │ Directus
│ 9. 自动备份                     │ PostgreSQL
│ 10. 审计日志                    │ Directus
└─────────────────────────────────┘
```

## 📊 监控和告警

```
Vercel Dashboard
├── 函数执行时间
├── 内存使用情况
├── 错误率
├── API 响应时间
└── 带宽使用

Directus
├── 用户活动日志
├── API 请求日志
├── 数据库连接池
└── 缓存命中率

PostgreSQL
├── 查询性能
├── 连接数
├── 磁盘使用
└── 备份状态
```

---

## 📝 文件对应表

| 文件 | 用途 |
|------|------|
| [QUICK_VERCEL_REFERENCE.md](QUICK_VERCEL_REFERENCE.md) | ⚡ 快速参考卡 |
| [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) | ✅ 部署检查清单 |
| [VERCEL_MIGRATION_GUIDE.md](VERCEL_MIGRATION_GUIDE.md) | 📖 完整部署指南 |
| [VERCEL_ENV_TEMPLATE.md](VERCEL_ENV_TEMPLATE.md) | 🔐 环境变量配置 |
| [VERCEL_TROUBLESHOOTING.md](VERCEL_TROUBLESHOOTING.md) | 🆘 故障排查 |
| [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md) | 📋 迁移总结 |

---

**预计部署时间：30-45 分钟**

**难度等级：⭐⭐ (中等)**

**推荐：** 从 [QUICK_VERCEL_REFERENCE.md](QUICK_VERCEL_REFERENCE.md) 开始，然后按 [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) 逐步部署。
