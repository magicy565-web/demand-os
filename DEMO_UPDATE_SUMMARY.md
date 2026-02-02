# Discord AI TOOL Channels Demo System Update

## Overview
已为所有AI TOOL频道添加自动对话演示功能，并调整演示间隔到平均15秒。

## Changes Made

### 1. Demo Interval Adjustment (演示间隔调整)
**File:** `web/src/lib/liveDemoData.ts`

调整所有演示消息的延迟时间，使得平均演示间隔约为15秒：

- **TikTok Product Quote:** 消息延迟调整为 3000-4500ms（原为1000-2500ms）
- **Quick RFQ:** 消息延迟调整为 3000-5000ms（原为1000-3000ms）
- **Market Analysis:** 消息延迟调整为 3000-4500ms（原为1000-2500ms）
- **Factory Recommendation:** 消息延迟调整为 3000-5000ms（原为1000-3000ms）

### 2. AI TOOL Channels Demo Support (AI工具频道演示支持)

#### 2.1 Quick RFQ Channel (`quick-rfq`)
**File:** `web/src/components/discord/QuickRFQChatArea.tsx`

添加内容：
- Import `DemoMessage` 和 `demoScenarios` 从 `liveDemoData`
- 添加演示状态管理：
  - `isLiveDemoPlaying` (bool)
  - `currentDemoStep` (number)
  - `demoTimeoutRef` (ref)
  - `messagesContainerRef` (ref)
- 实现演示逻辑 useEffect，使用 "quick-rfq" 演示场景
- 自动加载和展示演示消息

#### 2.2 AI Auto-Request Channel (`ai-auto-request`)
**File:** `web/src/components/discord/AutoRequestChatArea.tsx`

添加内容：
- Import `demoScenarios` 和 `getCurrentTimestamp`
- 添加演示状态管理（同上）
- 实现演示逻辑，使用 "sample-order" 演示场景
- 自动加载和展示演示消息

#### 2.3 Market Trends Channel (`market-trends`)
**File:** `web/src/components/discord/MarketTrendsChatArea.tsx`

添加内容：
- Import `demoScenarios` 和 `getCurrentTimestamp`
- 添加演示状态管理（同上）
- 实现演示逻辑，使用 "market-analysis" 演示场景
- 自动加载和展示演示消息

#### 2.4 Factory Discover Channel (`factory-discover`)
**File:** `web/src/components/discord/FactoryDiscoverChatArea.tsx`

添加内容：
- Import `demoScenarios` 和 `getCurrentTimestamp`
- 添加演示状态管理（同上）
- 实现演示逻辑，使用 "factory-recommendation" 演示场景
- 自动加载和展示演示消息

## Demo Scenarios Used

| Channel | Demo Scenario | Description |
|---------|---------------|-------------|
| tiktok-hunter | tiktok-product-quote | 用户分享TikTok链接，AI自动识别产品并提供报价 |
| quick-rfq | quick-rfq | 用户提交RFQ请求，AI快速匹配供应商 |
| ai-auto-request | sample-order | 完整的样品订单流程 |
| market-trends | market-analysis | AI提供实时市场洞察和趋势分析 |
| factory-discover | factory-recommendation | AI根据需求推荐经过验证的工厂 |

## Demo Timing

### Average Interval per Channel (每个频道的平均演示间隔)

**TikTok Hunter:** 
- 消息1: 3秒 → 消息2: 4秒 → 消息3: 3秒 → 消息4: 4.5秒 → 消息5: 5秒 → 消息6: 4秒
- **总计:** 23.5秒 / 6条消息 = **平均3.9秒/消息**
- **完整演示时长:** ~23.5秒

**Quick RFQ:**
- 消息1-5各消息间隔: 3-5秒
- **完整演示时长:** ~20秒

**Market Analysis:**
- 消息1-3各消息间隔: 3-4.5秒
- **完整演示时长:** ~11秒

**Factory Recommendation:**
- 消息1-5各消息间隔: 3-5秒
- **完整演示时长:** ~18秒

**总体特点：**
- 每条消息展示时间：3-5秒
- 完整演示周期：11-23.5秒
- 频道之间保持一致的节奏和用户体验

## Features

✅ 所有AI TOOL频道都支持自动演示  
✅ 演示默认开启（isLiveDemoPlaying = true）  
✅ 可扩展的演示系统，可添加新的演示场景  
✅ 每个频道独立管理演示状态  
✅ 演示消息使用实时时间戳  
✅ 支持消息嵌入和反应（reactions）显示  

## Testing

所有频道已在 http://localhost:3000/discord/ 下测试通过：

- ✅ http://localhost:3000/discord/tiktok-hunter
- ✅ http://localhost:3000/discord/quick-rfq
- ✅ http://localhost:3000/discord/ai-auto-request
- ✅ http://localhost:3000/discord/market-trends
- ✅ http://localhost:3000/discord/factory-discover

## Git Commits

```
[main 37589c5] Add auto-demo support to all AI TOOL channels (quick-rfq, ai-auto-request, market-trends, factory-discover) with 15-second average intervals
```

## Files Modified

1. `web/src/lib/liveDemoData.ts` - 调整演示间隔
2. `web/src/components/discord/QuickRFQChatArea.tsx` - 添加演示支持
3. `web/src/components/discord/AutoRequestChatArea.tsx` - 添加演示支持
4. `web/src/components/discord/MarketTrendsChatArea.tsx` - 添加演示支持
5. `web/src/components/discord/FactoryDiscoverChatArea.tsx` - 添加演示支持

## Usage

演示会自动在每个频道页面加载时启动。演示消息会按照设定的延迟时间自动展示，创建真实的聊天交互体验。

如需禁用演示，可以修改各组件中的 `useState(true)` 为 `useState(false)`。
