# Demand OS - 工业绿洲

> AI 驱动的全球需求实时对接系统 | Global Demand Real-time Docking System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black)
![Directus](https://img.shields.io/badge/Directus-11.1.1-purple)

## 📋 项目概述

Demand OS 是一个面向全球贸易的智能需求对接平台，通过 AI 技术实时采集、分析和展示全球电商平台的采购需求，帮助供应商精准匹配商业机会。

### 核心特性

- 🌐 **全球需求聚合** - 实时采集 Amazon、阿里巴巴、eBay 等平台数据
- 🤖 **AI 智能分析** - 商业价值评估与需求匹配
- ⚡ **实时瀑布流** - WebSocket 驱动的动态需求展示
- 🎨 **赛博朋克 UI** - 沉浸式霓虹风格视觉体验
- 📊 **数据看板** - 多维度统计与趋势分析

## 🏗️ 技术架构

```
┌──────────────────────────────────────────────────────────┐
│                      前端 (Next.js 15)                    │
│  demand.cnsubscribe.xyz                                  │
│  ├── App Router + React 19                               │
│  ├── Tailwind CSS + 自定义赛博朋克主题                    │
│  ├── Framer Motion 动画                                  │
│  └── WebSocket 实时订阅                                   │
├──────────────────────────────────────────────────────────┤
│                      后端 (Directus 11)                   │
│  admin.cnsubscribe.xyz                                   │
│  ├── RESTful API + GraphQL                               │
│  ├── WebSocket 实时推送                                   │
│  └── 管理后台                                             │
├──────────────────────────────────────────────────────────┤
│                      数据层 (Docker)                      │
│  ├── PostgreSQL 14 (主数据库)                             │
│  └── Redis 7 (缓存)                                       │
├──────────────────────────────────────────────────────────┤
│                      AI Agent (Node.js)                   │
│  ├── 需求数据生成/采集                                    │
│  ├── LLM 商业价值分析                                     │
│  └── Directus 数据写入                                    │
└──────────────────────────────────────────────────────────┘
```

## 📁 项目结构与文档

### 文档位置
为了保持项目文件整洁，所有文档已移动到 [`docs/`](./docs/) 文件夹：

- 📚 [**完整文档索引**](./docs/INDEX.md) - 所有文档的分类导航
- 📖 部署、配置、开发指南等都在 `docs/` 文件夹内

### 项目文件结构

```
Demand-os-v4/
├── web/                          # Next.js 前端
│   ├── src/
│   │   ├── app/                  # App Router 页面
│   │   │   ├── api/              # API 路由
│   │   │   ├── globals.css       # 全局样式
│   │   │   ├── layout.tsx        # 根布局
│   │   │   └── page.tsx          # 首页
│   │   ├── components/           # React 组件
│   │   │   ├── HeroSection.tsx   # 主视觉区
│   │   │   ├── DemandWaterfall.tsx # 瀑布流
│   │   │   ├── DemandCard.tsx    # 需求卡片
│   │   │   ├── StatsPanel.tsx    # 统计面板
│   │   │   └── ...
│   │   ├── hooks/                # 自定义 Hooks
│   │   ├── lib/                  # 工具库
│   │   └── types/                # TypeScript 类型
│   ├── .env.local                # 本地环境变量
│   └── .env.production           # 生产环境变量
│
├── industrial-oasis-backend/     # Directus 后端
│   ├── docker-compose.yml        # Docker 编排
│   ├── .env.example              # 环境变量模板
│   └── schema/                   # 数据库 Schema
│
├── scripts/                      # AI Agent 脚本
│   ├── listening-agent.ts        # 主 Agent
│   └── test-connection.ts        # 连接测试
│
└── deploy/                       # 部署配置
    ├── setup-server.sh           # 服务器初始化
    └── nginx.conf                # Nginx 配置
```

## 🚀 快速开始

### 环境要求

- Node.js 20+
- Docker & Docker Compose
- pnpm (推荐) 或 npm

### 1. 克隆项目

```bash
git clone https://github.com/your-org/demand-os-v4.git
cd demand-os-v4
```

### 2. 安装依赖

```bash
# 安装所有依赖
pnpm install

# 或分别安装
cd web && pnpm install
cd ../scripts && pnpm install
```

### 3. 启动后端 (Directus)

```bash
cd industrial-oasis-backend

# 复制环境变量
cp .env.example .env
# 编辑 .env 设置密码

# 启动服务
docker compose up -d

# 查看日志
docker compose logs -f directus
```

访问 `http://localhost:8055` 进入 Directus 管理后台。

### 4. 创建数据库 Schema

1. 登录 Directus 管理后台
2. 进入 Settings > Data Model
3. 创建 `demands` 集合，字段参考 `schema/demands-collection.json`

### 5. 启动前端

```bash
cd web

# 开发模式
pnpm dev

# 生产构建
pnpm build
pnpm start
```

访问 `http://localhost:3000` 查看前端页面。

### 6. 运行 AI Agent

```bash
cd scripts

# 测试连接
npx tsx test-connection.ts

# 启动 Agent
npx tsx listening-agent.ts
```

## ⚙️ 配置说明

### 前端环境变量 (web/.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8055
DIRECTUS_TOKEN=your-static-token
```

### 后端环境变量 (industrial-oasis-backend/.env)

```env
POSTGRES_PASSWORD=强密码
DIRECTUS_SECRET=随机密钥
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=管理员密码
DIRECTUS_STATIC_TOKEN=API访问令牌
```

### AI Agent 配置 (scripts/listening-agent.ts)

```typescript
const CONFIG = {
  MODE: "mock",  // "mock" 或 "ai"
  DIRECTUS_URL: "https://admin.cnsubscribe.xyz",
  DIRECTUS_TOKEN: "your-token",
  LLM_KEY: "sk-xxx",  // AI 模式需要
  BATCH_SIZE: 5,
  INTERVAL_MS: 30000,
};
```

## 🌐 部署指南

### 服务器准备

```bash
# 上传部署脚本
scp deploy/setup-server.sh root@47.99.205.136:/root/

# SSH 登录并执行
ssh root@47.99.205.136
chmod +x setup-server.sh
./setup-server.sh
```

### 部署后端

```bash
# 上传后端配置
scp -r industrial-oasis-backend root@47.99.205.136:/var/www/demand-os/backend/

# SSH 登录并启动
cd /var/www/demand-os/backend
docker compose up -d
```

### 部署前端

```bash
# 本地构建
cd web
pnpm build

# 上传到服务器
rsync -avz .next package.json root@47.99.205.136:/var/www/demand-os/frontend/

# SSH 登录并启动
cd /var/www/demand-os/frontend
npm install --production
pm2 start npm --name "demand-frontend" -- start
pm2 save
```

### 配置 SSL

```bash
certbot --nginx -d demand.cnsubscribe.xyz -d admin.cnsubscribe.xyz
```

## 📊 API 文档

### 获取需求列表

```http
GET /items/demands?sort=-date_created&limit=20
Authorization: Bearer <token>
```

### 获取统计数据

```http
GET /items/demands?aggregate[count]=id
Authorization: Bearer <token>
```

### WebSocket 订阅

```javascript
const ws = new WebSocket('wss://admin.cnsubscribe.xyz/websocket');
ws.send(JSON.stringify({
  type: 'subscribe',
  collection: 'demands',
  uid: 'unique-id',
}));
```

## 🎨 设计规范

### 颜色系统

| 名称 | 色值 | 用途 |
|------|------|------|
| Cyber Cyan | `#00FFFF` | 主强调色 |
| Cyber Purple | `#9D4EDD` | 次强调色 |
| Cyber Pink | `#FF006E` | 警示/紧急 |
| Background | `#0a0a0f` | 背景色 |

### 动画规范

- 过渡时长: 300ms
- 缓动函数: `ease-out`
- 入场动画: 从下方淡入
- 悬停效果: 发光 + 缩放

## 🔧 开发指南

### 添加新组件

```bash
# 在 components 目录创建
touch web/src/components/NewComponent.tsx

# 导出到 index.ts
echo "export * from './NewComponent';" >> web/src/components/index.ts
```

### 修改主题

编辑 `web/tailwind.config.ts` 中的 `theme.extend.colors`。

### 扩展 API

在 `web/src/app/api/` 下创建新的路由文件。

## 🐛 常见问题

### Q: Directus 连接失败

1. 检查 Docker 容器状态: `docker compose ps`
2. 查看日志: `docker compose logs directus`
3. 确认端口未被占用: `lsof -i :8055`

### Q: WebSocket 无法连接

1. 确认 `WEBSOCKETS_ENABLED=true`
2. 检查 Nginx 配置中的 WebSocket 代理
3. 确认 SSL 证书有效

### Q: AI Agent 写入失败

1. 运行 `test-connection.ts` 检查连接
2. 确认 Token 权限正确
3. 检查 demands 集合是否存在

## 📝 更新日志

### v1.0.0 (2024-12)

- ✨ 初始版本发布
- 🎨 赛博朋克 UI 设计
- 🤖 AI Agent 需求生成
- 📊 实时瀑布流展示

## 📄 许可证

MIT License © 2024 Demand OS Team

---

<p align="center">
  <strong>Demand OS - 工业绿洲</strong><br>
  <em>连接全球需求，创造无限商机</em>
</p>
