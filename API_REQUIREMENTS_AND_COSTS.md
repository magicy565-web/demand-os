# API 接口需求和成本分析

## 📋 智能图片分析所需 API

---

## 1️⃣ 核心 AI 服务

### Nova AI（已有）✅

**用途**：
- 图片视觉识别
- 深度产品分析
- 采购决策建议生成

**已有配置**：
- API Key: `sk-SqCEqx9Vz5sYgmXOXvjZQBaOPFjjxpfcPPEJHXmPCrLVpBXp`
- 模型: `[逆次]o4-mini`
- Endpoint: `https://once.novai.su/v1`

**成本**：
- 已有账号，具体定价需确认
- 预估：$0.01-0.05 / 次分析
- 月度预估（1000次）：**$10-50**

**替代方案**：
- OpenAI GPT-4 Vision ($0.01/image)
- Google Gemini Pro Vision (免费额度)
- Claude 3 Vision ($0.015/image)

---

## 2️⃣ 市场数据 API

### A. TikTok API

**用途**：
- 获取产品热度数据
- 视频观看数、点赞数、评论数
- 趋势分数计算

**选项 1：TikTok Official API** ⭐ 推荐
- **申请方式**：https://developers.tiktok.com/
- **成本**：免费（需要申请开发者账号）
- **限制**：10,000 请求/天
- **数据**：官方数据，最准确

**选项 2：第三方 API（RapidAPI）**
- **服务商**：TikTok API by Toolhouse
- **成本**：
  - 免费版：100 请求/月
  - 基础版：$9.99/月，1000 请求
  - 专业版：$49.99/月，10000 请求
- **推荐**：基础版 **$9.99/月**

**选项 3：自建爬虫**
- **成本**：开发时间 + 服务器
- **风险**：可能违反 ToS，不稳定
- **不推荐**

**推荐方案**：TikTok Official API（免费）  
**备选方案**：RapidAPI 基础版（$9.99/月）

---

### B. 电商价格数据 API

**用途**：
- 获取产品价格区间
- 竞品价格对比
- 市场价格趋势

**选项 1：1688 Open API** ⭐ 推荐
- **申请方式**：https://open.1688.com/
- **成本**：免费（需要企业认证）
- **数据**：批发价格、MOQ、供应商信息
- **限制**：需要企业账号

**选项 2：Alibaba Product API**
- **服务商**：RapidAPI - Alibaba Data Scraper
- **成本**：
  - 免费版：50 请求/月
  - 基础版：$19.99/月，1000 请求
  - 专业版：$99.99/月，10000 请求
- **推荐**：基础版 **$19.99/月**

**选项 3：Amazon Product API**
- **服务商**：Amazon Product Data API
- **成本**：$29.99/月，5000 请求
- **数据**：零售价格、评分、销量排名

**推荐方案**：1688 Open API（免费）+ Alibaba API（$19.99/月）  
**备选方案**：Amazon API（$29.99/月）

---

### C. Google Trends API

**用途**：
- 搜索趋势数据
- 关键词热度
- 地区兴趣分布

**选项 1：Google Trends Unofficial API** ⭐ 推荐
- **库**：`pytrends`（Python）
- **成本**：**免费**
- **限制**：请求频率限制（需要加延迟）
- **数据**：完整的 Google Trends 数据

```python
from pytrends.request import TrendReq
pytrends = TrendReq(hl='en-US', tz=360)
```

**选项 2：SerpAPI Google Trends**
- **成本**：$50/月，5000 请求
- **优势**：更稳定，无需担心被封

**推荐方案**：pytrends（免费）  
**备选方案**：SerpAPI（$50/月）

---

## 3️⃣ 可选增强 API

### D. 图片搜索 API（找相似产品）

**用途**：
- 以图搜图
- 找到相似产品
- 竞品发现

**选项 1：Google Custom Search API**
- **成本**：
  - 免费版：100 请求/天
  - 付费版：$5/1000 请求
- **推荐**：免费版足够

**选项 2：Bing Image Search API**
- **成本**：
  - 免费版：1000 请求/月
  - S1 层：$3/1000 请求
- **推荐**：免费版

**推荐方案**：Google Custom Search（免费 100/天）

---

### E. 汇率 API（成本计算）

**用途**：
- 实时汇率转换
- 多币种价格计算

**选项 1：ExchangeRate-API** ⭐ 推荐
- **成本**：**免费**（1500 请求/月）
- **数据**：实时汇率，170+ 货币

**选项 2：Fixer.io**
- **成本**：免费版 100 请求/月

**推荐方案**：ExchangeRate-API（免费）

---

### F. 物流成本 API（可选）

**用途**：
- 运费估算
- 物流时效

**选项 1：Shippo API**
- **成本**：按实际使用付费
- **功能**：运费计算、标签打印

**选项 2：EasyShip API**
- **成本**：免费（需要注册）

**推荐方案**：暂不集成，使用固定估算

---

## 💰 成本总结

### 方案 A：最小成本方案（推荐）

| API | 服务商 | 成本 | 说明 |
|-----|--------|------|------|
| AI 分析 | Nova AI | $10-50/月 | 已有账号 |
| TikTok 数据 | TikTok Official | **免费** | 需申请 |
| 价格数据 | 1688 Open API | **免费** | 需企业认证 |
| 搜索趋势 | pytrends | **免费** | 开源库 |
| 图片搜索 | Google Custom Search | **免费** | 100/天 |
| 汇率 | ExchangeRate-API | **免费** | 1500/月 |

**月度总成本**：**$10-50**  
**年度总成本**：**$120-600**

---

### 方案 B：稳定商用方案

| API | 服务商 | 成本 | 说明 |
|-----|--------|------|------|
| AI 分析 | Nova AI | $50/月 | 更高配额 |
| TikTok 数据 | RapidAPI | $9.99/月 | 1000 请求 |
| 价格数据 | Alibaba API | $19.99/月 | 1000 请求 |
| 搜索趋势 | SerpAPI | $50/月 | 5000 请求 |
| 图片搜索 | Google Custom Search | $5/1000 | 按需付费 |
| 汇率 | ExchangeRate-API | **免费** | 1500/月 |

**月度总成本**：**$130-150**  
**年度总成本**：**$1,560-1,800**

---

### 方案 C：企业级方案

| API | 服务商 | 成本 | 说明 |
|-----|--------|------|------|
| AI 分析 | OpenAI GPT-4 Vision | $100-200/月 | 更强能力 |
| TikTok 数据 | RapidAPI Pro | $49.99/月 | 10000 请求 |
| 价格数据 | Alibaba API Pro | $99.99/月 | 10000 请求 |
| 搜索趋势 | SerpAPI | $50/月 | 5000 请求 |
| 图片搜索 | Google Custom Search | $50/月 | 10000 请求 |
| 汇率 | ExchangeRate-API | **免费** | 1500/月 |

**月度总成本**：**$350-450**  
**年度总成本**：**$4,200-5,400**

---

## 📊 推荐方案

### 阶段 1：MVP 测试（1-3个月）

**使用方案 A（最小成本）**
- 月成本：$10-50
- 足够验证功能和用户需求
- 所有核心功能都能实现

### 阶段 2：正式运营（3-12个月）

**使用方案 B（稳定商用）**
- 月成本：$130-150
- 更稳定可靠
- 支持更高并发

### 阶段 3：规模化（12个月+）

**使用方案 C（企业级）**
- 月成本：$350-450
- 企业级 SLA
- 支持大规模用户

---

## 🚀 立即行动

### 需要申请的 API（免费）

1. **TikTok Official API**
   - 访问：https://developers.tiktok.com/
   - 申请开发者账号
   - 创建应用获取 API Key
   - 预计时间：1-3 天审核

2. **1688 Open API**
   - 访问：https://open.1688.com/
   - 需要企业支付宝账号
   - 完成企业认证
   - 预计时间：3-7 天

3. **Google Custom Search API**
   - 访问：https://developers.google.com/custom-search
   - 创建搜索引擎
   - 获取 API Key
   - 预计时间：立即可用

### 需要购买的 API（付费）

**如果免费 API 申请困难，备选方案**：

1. **RapidAPI 账号**
   - 访问：https://rapidapi.com/
   - 注册账号
   - 订阅需要的 API
   - 月成本：$30-50

---

## 🔧 技术实现

### 环境变量配置

```env
# Nova AI
NOVA_AI_API_KEY=sk-SqCEqx9Vz5sYgmXOXvjZQBaOPFjjxpfcPPEJHXmPCrLVpBXp
NOVA_AI_API_URL=https://once.novai.su/v1

# TikTok
TIKTOK_API_KEY=your_tiktok_api_key
TIKTOK_API_SECRET=your_tiktok_secret

# 1688/Alibaba
ALIBABA_APP_KEY=your_app_key
ALIBABA_APP_SECRET=your_app_secret

# Google
GOOGLE_CUSTOM_SEARCH_KEY=your_google_key
GOOGLE_SEARCH_ENGINE_ID=your_engine_id

# ExchangeRate
EXCHANGE_RATE_API_KEY=your_exchange_rate_key
```

### API 调用示例

```typescript
// 1. TikTok 热度数据
const tiktokData = await fetch(`https://api.tiktok.com/v1/video/info`, {
  headers: { 'Authorization': `Bearer ${TIKTOK_API_KEY}` }
});

// 2. 1688 价格数据
const priceData = await fetch1688Prices(productKeywords);

// 3. Google Trends
import { TrendReq } from 'pytrends';
const trends = await pytrends.interestOverTime(keywords);

// 4. 图片搜索
const similarProducts = await googleCustomSearch(imageUrl);
```

---

## ❓ 常见问题

**Q: 可以完全免费实现吗？**  
A: 可以！使用方案 A，除了 Nova AI 的少量费用（$10-50/月），其他都是免费的。

**Q: 如果免费 API 申请不下来怎么办？**  
A: 使用 RapidAPI 的付费服务，月成本增加 $30-50。

**Q: 需要多久能申请到所有 API？**  
A: Google API 立即可用，TikTok 1-3天，1688 需要 3-7天（需要企业认证）。

**Q: 数据准确性如何？**  
A: 官方 API（TikTok、1688）数据最准确。第三方 API 可能有延迟，但足够使用。

---

## 📝 下一步

1. **确认方案**：选择方案 A、B 或 C
2. **申请免费 API**：TikTok、1688、Google
3. **配置环境变量**：添加所有 API Key
4. **开始开发**：实现智能分析功能
5. **测试验证**：确保所有 API 正常工作

---

**创建时间**：2026-02-07  
**推荐方案**：方案 A（最小成本，$10-50/月）  
**预计开发时间**：6-9 天
