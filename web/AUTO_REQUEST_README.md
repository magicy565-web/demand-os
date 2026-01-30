# Auto Request Beta 功能文档

## 🎯 功能概述

Auto Request 是 Demand-OS 的 Beta 功能，允许用户通过**自然语言**描述采购需求，系统会：
1. 智能解析需求特征
2. 在产品库中搜索匹配产品
3. 如果没有匹配，**自动创建人工寻源工单**

## 🏗️ 技术架构

```
用户输入 (Discord UI)
    ↓
前端 AIChatBot.tsx
    ↓
API Route: /api/chat/auto-request
    ↓
AI 意图解析 (OpenAI GPT-4o-mini)
    ↓
产品搜索引擎 (lib/product-search.ts)
    ↓
决策引擎
    ├─ 匹配成功 → 返回产品列表
    └─ 匹配失败 → 创建 SourcingRequest 工单
```

## 📁 文件结构

### 核心模块

```
web/src/
├── types/
│   └── auto-request.ts           # 类型定义
├── lib/
│   ├── ai-parser.ts              # AI 意图解析服务
│   ├── product-search.ts         # 产品搜索引擎
│   └── sourcing-system.ts        # 工单系统
├── app/api/chat/auto-request/
│   └── route.ts                  # API 路由
└── components/
    └── AIChatBot.tsx             # 前端聊天组件
```

## 🚀 快速开始

### 1. 环境配置

在 `.env.local` 中添加 OpenAI API Key（可选）：

```bash
OPENAI_API_KEY=sk-xxx...
```

> **注意**：如果未配置 OpenAI API Key，系统会自动降级到基于规则的解析器。

### 2. 启动开发服务器

```bash
cd web
npm run dev
```

### 3. 测试功能

打开浏览器，点击右下角的 AI 聊天图标，尝试以下指令：

#### 成功匹配示例（返回产品列表）
```
帮我找一款 TWS 蓝牙耳机，带主动降噪，10 刀以内，支持一件代发
```

**预期结果**：
- ✅ 找到匹配产品
- 显示产品卡片（价格、MOQ、供应商）
- 匹配分数和理由

#### 触发 Auto Request 示例（创建工单）
```
找一个超薄的折叠手机，价格 $500 左右
```

**预期结果**：
- ❌ 库内无匹配
- 🎫 自动创建工单 `#RFQ-20240130-XXXX`
- 📬 提示 2 小时内获得人工报价

## 📊 工作流程

### 1. AI 意图解析

用户输入 → OpenAI GPT-4o-mini → 结构化查询对象

**输入示例**：
```
想找类似 Apple Watch 的智能手表，要有血氧功能，15 刀左右，500 件起订
```

**输出结构**：
```json
{
  "intent": "sourcing_request",
  "category": "Consumer Electronics",
  "keywords": ["Smart Watch", "Blood Oxygen", "SpO2"],
  "target_price": { "min": 12, "max": 18, "currency": "USD" },
  "moq": { "min": 500, "unit": "pcs" },
  "confidence": 0.88
}
```

### 2. 产品搜索与评分

基于结构化查询，系统会：

1. **初筛**：类别、价格、MOQ 过滤
2. **精排**：计算匹配分数（0-100）
   - 关键词匹配 (40分)
   - 价格匹配 (25分)
   - MOQ 匹配 (15分)
   - 特殊要求 (10分)
   - 认证匹配 (5分)
   - 供应商评分 (5分)

### 3. 决策逻辑

```
if (最高分 >= 70) {
  ✅ 返回产品列表
} else if (最高分 >= 50) {
  ⚠️ 返回产品列表 + 创建工单
} else {
  ❌ 创建工单 + 触发人工寻源
}
```

### 4. 工单系统

工单自动包含：
- 用户原始输入
- AI 解析的结构化需求
- 优先级（基于价格/MOQ/紧急词判定）
- 自动分配给产业带采购员
- 预计响应时间（默认 2 小时）

## 🎨 前端 UI 状态

聊天界面显示三种处理状态气泡：

1. **Analyzing** 🔍
   ```
   正在解析您的采购需求...
   ```

2. **Searching** 📦
   ```
   正在检索内部供应商库...
   ```

3. **Escalating** ⚡
   ```
   库内未匹配，正在创建人工寻源工单...
   ```

## 🧪 测试用例

### Case 1: 高匹配度（返回产品）
```
输入: "找 TWS 耳机，带降噪，8 刀左右，支持代发"
预期: 返回 TWS Pro 主动降噪蓝牙耳机（匹配度 85+）
```

### Case 2: 中等匹配（产品 + 工单）
```
输入: "智能手表，血氧监测，20 刀以内"
预期: 返回智能手环 + 创建工单寻找更高端产品
```

### Case 3: 无匹配（纯工单）
```
输入: "找一个 1000 刀的工业级激光切割机"
预期: 创建工单 #RFQ-xxx，分配给综合采购团队
```

## 🔧 扩展与定制

### 添加新产品

编辑 `lib/product-search.ts` 的 `MOCK_PRODUCTS` 数组：

```typescript
{
  id: "p6",
  name: "你的新产品",
  category: "Consumer Electronics",
  keywords: ["关键词1", "关键词2"],
  fob_price: 15.0,
  moq: 500,
  supplier: { /* ... */ },
  supports_dropshipping: true,
  certifications: ["CE", "FCC"],
  delivery_time: "15-20天",
}
```

### 调整匹配阈值

编辑 `app/api/chat/auto-request/route.ts`：

```typescript
const MATCH_THRESHOLD = {
  HIGH: 70,   // 高置信度匹配
  MEDIUM: 50, // 中等匹配
};
```

### 自定义工单分配逻辑

编辑 `lib/sourcing-system.ts` 的 `assignToProcurementAgent()` 函数。

## 📈 数据流转

### 开发环境（当前）
```
用户输入 → AI 解析 → 内存搜索 → 工单存储在内存中
```

### 生产环境（推荐）
```
用户输入 → AI 解析 → Directus API 搜索 → 工单写入 Directus
                                      ↓
                                 触发 Webhook
                                      ↓
                            通知采购员（邮件/Slack）
```

## 🎯 下一步改进

- [ ] 集成真实数据库（Directus/PostgreSQL）
- [ ] 添加用户认证和工单历史查询
- [ ] 实时通知系统（WebSocket）
- [ ] 多轮对话支持（澄清需求）
- [ ] 图片识别（上传产品图片自动识别）
- [ ] 价格走势预测
- [ ] 供应商直接对接接口

## 🐛 常见问题

### Q: OpenAI API 调用失败怎么办？
**A**: 系统会自动降级到基于规则的解析器，精度略低但可用。

### Q: 为什么有些产品搜不到？
**A**: 当前使用 Mock 数据（5个产品），实际应连接 Directus 产品库。

### Q: 工单创建后在哪里查看？
**A**: 当前存储在内存中，刷新页面会丢失。生产环境应使用持久化数据库。

### Q: 如何测试人工报价功能？
**A**: 工单创建后，5秒后会自动模拟添加 2 份报价（见 `simulateManualQuote`）。

## 📞 技术支持

如有问题，请查看：
- 浏览器控制台日志
- 服务器终端输出（`[Auto Request]` 前缀）
- Next.js Dev Server 错误信息

---

**版本**: 1.0.0-beta  
**最后更新**: 2026-01-30
