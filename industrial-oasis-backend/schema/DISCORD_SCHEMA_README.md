# Directus Schema Reference - Discord Agent Integration

> 本文档定义 Discord Agent 所需的 Directus 数据模型

## 数据流架构

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Discord Bot    │────▶│    Directus      │────▶│   Next.js Web    │
│  (Python Agent)  │     │    (Backend)     │     │   (Frontend)     │
└──────────────────┘     └──────────────────┘     └──────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
  - 监听 TikTok 链接       - 存储询盘请求           - Discord Clone UI
  - GPT-4o 视觉分析        - 供应商匹配             - 消息历史展示
  - 生成报价单             - 消息存档               - 实时状态更新
```

## 集合定义

### 1. `sourcing_requests` - 询盘请求

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 主键 |
| `status` | string | 状态: draft / processing / quoted / completed / cancelled |
| `platform` | string | 来源平台: Discord / TikTok / Web / API |
| `user_id` | string | Discord 用户 ID |
| `user_name` | string | 用户显示名称 |
| `product_name` | string | AI 识别的产品名称 |
| `video_url` | string | 原始 TikTok 链接 |
| `visual_analysis` | JSON | GPT-4o 分析结果 |
| `quote_price_usd` | float | FOB 报价 (USD) |
| `matched_factories` | JSON | 匹配的工厂列表 |
| `quote_pdf` | file | 报价单 PDF |
| `notes` | text | 备注 |
| `date_created` | timestamp | 创建时间 |
| `date_updated` | timestamp | 更新时间 |

**示例数据:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "quoted",
  "platform": "Discord",
  "user_id": "123456789012345678",
  "user_name": "TikTok用户#1234",
  "product_name": "USB 落地风扇",
  "video_url": "https://www.tiktok.com/@xxx/video/123",
  "visual_analysis": {
    "product_name_cn": "USB 落地风扇",
    "product_name_en": "USB Floor Fan",
    "material": "ABS 塑料",
    "dimensions": "40 x 40 x 120 cm",
    "features": ["可折叠", "三档风速", "遥控"],
    "estimated_weight": "2.5 kg"
  },
  "quote_price_usd": 12.50,
  "matched_factories": [
    { "id": "factory-001", "name": "顺德美的电器", "match_score": 0.92 },
    { "id": "factory-002", "name": "中山小熊电器", "match_score": 0.85 }
  ],
  "date_created": "2024-01-15T10:30:00Z"
}
```

### 2. `discord_messages` - 消息存档

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | UUID | 主键 |
| `channel_id` | string | Discord 频道 ID |
| `server_id` | string | Discord 服务器 ID |
| `user_id` | string | 发送者 Discord ID |
| `user_name` | string | 发送者名称 |
| `content` | text | 消息内容 (Markdown) |
| `is_bot` | boolean | 是否为 Bot 消息 |
| `embed_data` | JSON | Embed 卡片数据 |
| `attachments` | JSON | 附件列表 |
| `reply_to` | UUID | 回复消息 ID (M2O) |
| `date_created` | timestamp | 发送时间 |

**示例数据:**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "channel_id": "1234567890123456789",
  "server_id": "9876543210987654321",
  "user_name": "DemandOS Bot",
  "is_bot": true,
  "content": "📦 **TikTok Hunter 分析完成**",
  "embed_data": {
    "title": "USB 落地风扇 报价单",
    "color": "#5865F2",
    "fields": [
      { "name": "产品", "value": "USB Floor Fan", "inline": true },
      { "name": "FOB 价格", "value": "$12.50", "inline": true },
      { "name": "MOQ", "value": "500 pcs", "inline": true }
    ],
    "thumbnail": "https://example.com/product-thumb.jpg",
    "footer": "Powered by DemandOS"
  },
  "date_created": "2024-01-15T10:35:00Z"
}
```

### 3. `suppliers` - 供应商 (已存在，需扩展)

现有 `suppliers` 集合已定义，建议添加以下字段用于智能匹配:

| 新增字段 | 类型 | 说明 |
|----------|------|------|
| `ai_tags` | JSON | AI 生成的产品标签 |
| `response_rate` | float | 询盘响应率 |
| `avg_response_time` | integer | 平均响应时间 (小时) |
| `discord_enabled` | boolean | 是否接受 Discord 询盘 |

## API 端点映射

### Python Agent 调用的 API

```python
# 创建询盘
POST /items/sourcing_requests
Authorization: Bearer {DIRECTUS_TOKEN}
Content-Type: application/json

# 更新状态
PATCH /items/sourcing_requests/{id}

# 查询匹配工厂
GET /items/suppliers?filter[category][_eq]=Home%20Appliances

# 存储消息
POST /items/discord_messages

# 上传 PDF
POST /files
Content-Type: multipart/form-data
```

### 前端调用的 API

```typescript
// 获取消息历史
GET /items/discord_messages?filter[channel_id][_eq]=xxx&sort=-date_created

// 获取询盘详情
GET /items/sourcing_requests/{id}?fields=*,quote_pdf.*

// WebSocket 实时更新
// 通过 Directus Realtime / 自建 WebSocket
```

## 权限配置

建议创建以下角色:

1. **discord_agent** - Python Bot 专用
   - `sourcing_requests`: create, read, update
   - `discord_messages`: create, read
   - `suppliers`: read
   - `directus_files`: create, read

2. **web_frontend** - 前端公开 API
   - `discord_messages`: read (限特定频道)
   - `sourcing_requests`: read (限公开字段)

## 部署 Checklist

- [ ] 在 Directus 中导入 Schema
- [ ] 创建 API Token (discord_agent 角色)
- [ ] 配置 CORS 允许前端域名
- [ ] 启用 Directus Realtime (可选)
- [ ] 设置备份策略

---

> 📁 Schema 文件位置: `industrial-oasis-backend/schema/`
> - `sourcing-requests-collection.json`
> - `discord-messages-collection.json`
> - `suppliers-collection.json` (已存在)
