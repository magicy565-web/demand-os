# 🤖 Demand-OS Discord Agent

TikTok 产品识别 + 智能报价 + 工厂匹配的 Discord Bot

## 🚀 快速开始

### 1. 环境准备

```bash
cd agent

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填写：

```bash
cp .env.example .env
```

需要配置：
- `DISCORD_TOKEN`: Discord Bot Token (从 Discord Developer Portal 获取)
- `OPENAI_API_KEY`: OpenAI API Key (用于 GPT-4o Vision)
- `DIRECTUS_URL`: Directus 后端地址
- `DIRECTUS_TOKEN`: Directus API Token

### 3. 创建 Discord Bot

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 创建新应用 (New Application)
3. 进入 Bot 页面，创建 Bot
4. 复制 Token 到 `.env`
5. 开启以下权限：
   - `MESSAGE CONTENT INTENT`
   - `SERVER MEMBERS INTENT`
6. 生成邀请链接 (OAuth2 > URL Generator)：
   - Scopes: `bot`, `applications.commands`
   - Permissions: `Send Messages`, `Embed Links`, `Read Message History`

### 4. 启动 Bot

```bash
python bot.py
```

看到以下输出表示启动成功：

```
╔══════════════════════════════════════════════════════════════╗
║   🚀 Demand-OS Agent 已上线                                  ║
║   Bot: Demand-OS Bot#1234                                    ║
║   Servers: 1                                                 ║
╚══════════════════════════════════════════════════════════════╝
```

## 📋 功能说明

### TikTok 产品识别

在任意频道发送 TikTok 链接：

```
https://www.tiktok.com/@user/video/7281234567890123456
```

Bot 会自动：
1. 📹 下载视频关键帧
2. 🤖 GPT-4o 视觉分析产品
3. 🏭 匹配园区认证工厂
4. 💰 生成 FOB 报价单

### 命令列表

| 命令 | 说明 |
|------|------|
| `!help` | 显示帮助信息 |
| `!history` | 查看询盘历史 |
| `!search [关键词]` | 搜索供应商 |

## 🗄️ Directus 数据模型

需要在 Directus 中创建以下 Collection：

### `sourcing_requests` (询盘请求)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| status | Dropdown | draft, processing, quoted, completed |
| platform | String | Discord, TikTok, Web |
| user_id | String | Discord 用户 ID |
| user_name | String | 用户名 |
| product_name | String | AI 识别的产品名 |
| video_url | String | 原始链接 |
| visual_analysis | JSON | GPT-4o 分析结果 |
| quote_price_usd | Float | FOB 价格 |
| date_created | DateTime | 创建时间 |

### `suppliers` (供应商) - 可选

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name | String | 工厂名称 |
| name_en | String | 英文名 |
| category | String | 主营类目 |
| location | String | 所在地 |
| moq | Integer | 最小起订量 |
| rating | Float | 评分 |
| certifications | JSON | 认证列表 |

## 🔧 架构说明

```
agent/
├── bot.py              # Discord Bot 主入口
├── directus_client.py  # Directus API 客户端
├── tiktok_hunter.py    # TikTok 视频分析模块
├── requirements.txt    # Python 依赖
├── .env               # 环境变量 (不提交)
└── .env.example       # 环境变量模板
```

## 🔗 与现有系统集成

```
Demand-OS/
├── web/                    # Next.js 前端 (展示询盘数据)
├── industrial-oasis-backend/  # Directus 后端 (数据存储)
├── scripts/                # TypeScript 脚本
└── agent/                  # 👈 本 Python Agent
```

数据流：
1. Discord 用户发送 TikTok 链接
2. Python Agent 分析并写入 Directus
3. Next.js 前端实时展示询盘数据
4. 管理员可在 Directus 后台人工审核

## 📝 License

MIT
