# SourcingOS 完整实现指南

## 项目概述

**SourcingOS（链智云）** 是一个 AI 驱动的跨境产业带场景化采购平台，通过数字化手段打通"设计-制造-履约"全链路，帮助客户完成从需求提交到整柜交付的全流程采购。

### 核心价值主张

1. **C2M 柔性反向定制引擎**：让产能适配需求，而非让需求迁就库存。支持"小单快返"模式，起订量(MOQ)低至 50 件。

2. **产业带集货"拼柜"中枢**：中小工厂货量不够整柜？AI 智能拼柜系统自动匹配同航线货源，散货变整柜，物流成本降低 50%。

### 核心业务流程

```
Module 01: 需求上传 → Module 02: AI 拆单 → Module 03: 智能寻源 → Module 04: 整柜交付
```

---

## 技术栈

### 前端
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Animation**: Framer Motion
- **3D Visualization**: Three.js + React Three Fiber
- **Charts**: Recharts

### 后端
- **Headless CMS**: Directus
- **Database**: PostgreSQL (Directus 内置)
- **API**: REST API (Directus 自动生成)

### AI 集成
- **LLM**: OpenAI GPT-4
- **Use Cases**: 需求解析、智能拆单、物料推荐

---

## 已完成的工作

### 1. Directus 数据模型设计

已创建以下 Collections：

#### `demands` (需求订单)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| project_name | String | 项目名称 |
| room_count | Integer | 房间数量 |
| style | String | 风格 |
| budget | Decimal | 预算（美元） |
| description | Text | 详细描述 |
| status | String | 状态（pending/processing/completed） |

#### `materials` (物料库)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name_zh | String | 中文名称 |
| name_en | String | 英文名称 |
| category | String | 类别（主材/软装面料） |
| grade | String | 等级 |
| price_coefficient | Decimal | 价格系数 |
| is_premium | Boolean | 是否为基准价 |

#### `markets` (终端市场)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name_zh | String | 中文名称 |
| name_en | String | 英文名称 |
| region | String | 区域代码 |

#### `suppliers` (供应商)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name | String | 工厂名称 |
| location | String | 所在地 |
| category | String | 主营品类 |
| moq | Integer | 起订量 |

### 2. 演示数据

已成功创建：
- ✅ 8 种物料（北美白橡木、美国黑胡桃木、俄罗斯白蜡木、E0级环保多层板、亚麻混纺、意大利绒布、头层牛皮、科技布）
- ✅ 4 个终端市场（北美、欧盟、中东、东南亚）
- ✅ 4 家供应商（佛山陶瓷、东莞家具、江门纺织、中山灯饰）

---

## 前端模块实现指南

### Module 01: 需求上传

**位置**: `/web/src/components/industrial-os-components/hero-section.tsx`

**功能要求**：
1. 用户输入场景化需求（项目名称、房间数量、风格、预算）
2. 系统解析需求并提取关键信息
3. 提交后跳转到 AI 拆单页面

**实现代码示例**：

```typescript
// /web/src/lib/directus.ts
import { createDirectus, rest, authentication } from '@directus/sdk';

const directus = createDirectus('https://admin.cnsubscribe.xyz')
  .with(authentication())
  .with(rest());

export async function createDemand(data: {
  project_name: string;
  room_count: number;
  style: string;
  budget: number;
  description: string;
}) {
  const response = await directus.request(
    createItem('demands', {
      ...data,
      status: 'pending',
      id: crypto.randomUUID()
    })
  );
  return response;
}

// /web/src/components/industrial-os-components/demand-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDemand } from '@/lib/directus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function DemandForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_name: '',
    room_count: 200,
    style: '东南亚风格',
    budget: 800000,
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const demand = await createDemand(formData);
      // 跳转到 AI 拆单页面
      router.push(`/industrial-os/breakdown/${demand.id}`);
    } catch (error) {
      console.error('Failed to create demand:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="项目名称"
          value={formData.project_name}
          onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="房间数量"
          value={formData.room_count}
          onChange={(e) => setFormData({ ...formData, room_count: parseInt(e.target.value) })}
          required
        />
      </div>
      
      <Input
        placeholder="风格（如：东南亚风格）"
        value={formData.style}
        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
        required
      />
      
      <Input
        type="number"
        placeholder="预算（美元）"
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
        required
      />
      
      <Textarea
        placeholder="详细描述"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={4}
      />
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? '提交中...' : '立即匹配产能 →'}
      </Button>
    </form>
  );
}
```

---

### Module 02: AI 拆单（C2M 引擎）

**位置**: `/web/src/components/industrial-os-components/style-tuner.tsx`

**功能要求**：
1. 展示主材选型（从 Directus `materials` 表读取，category='主材'）
2. 展示终端市场偏好（从 Directus `markets` 表读取）
3. 展示软装面料选择（从 Directus `materials` 表读取，category='软装面料'）
4. 实时计算预估总价（基准价 × 价格系数）
5. 显示配置摘要（主材、市场风格、面料、有效MOQ、预估总价）

**实现代码示例**：

```typescript
// /web/src/app/industrial-os/breakdown/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { readItems } from '@directus/sdk';
import { directus } from '@/lib/directus';

interface Material {
  id: string;
  name_zh: string;
  name_en: string;
  category: string;
  grade: string;
  price_coefficient: number;
  is_premium: boolean;
}

export default function BreakdownPage({ params }: { params: { id: string } }) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [markets, setMarkets] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [basePrice, setBasePrice] = useState(414000);
  const [targetBudget, setTargetBudget] = useState(500000);
  const [moq, setMoq] = useState(50);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    // 加载主材
    const mainMaterials = await directus.request(
      readItems('materials', {
        filter: { category: { _eq: '主材' } }
      })
    );
    
    // 加载软装面料
    const fabrics = await directus.request(
      readItems('materials', {
        filter: { category: { _eq: '软装面料' } }
      })
    );
    
    // 加载市场
    const marketData = await directus.request(readItems('markets'));
    
    setMaterials([...mainMaterials, ...fabrics]);
    setMarkets(marketData);
  }

  // 计算最终价格
  const calculatePrice = () => {
    let price = basePrice;
    
    if (selectedMaterial) {
      const material = materials.find(m => m.id === selectedMaterial);
      if (material) {
        price *= (1 + material.price_coefficient);
      }
    }
    
    if (selectedFabric) {
      const fabric = materials.find(m => m.id === selectedFabric);
      if (fabric) {
        price *= (1 + fabric.price_coefficient);
      }
    }
    
    return Math.round(price);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">C2M 柔性反向定制引擎</h1>
      <p className="text-muted-foreground mb-12">
        让产能适配需求，而非让需求迁就库存。支持"小单快返"模式，起订量(MOQ)低至 50 件。
      </p>
      
      <div className="grid grid-cols-2 gap-8">
        {/* 左侧：主材选型 */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">主材选型 / MATERIAL_SELECT</h2>
          
          <div className="space-y-4">
            {materials.filter(m => m.category === '主材').map((material) => (
              <div
                key={material.id}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedMaterial === material.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedMaterial(material.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{material.name_zh}</h3>
                    <p className="text-sm text-muted-foreground">{material.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      material.is_premium ? 'text-primary' : 
                      material.price_coefficient > 0 ? 'text-orange-500' : 'text-green-500'
                    }`}>
                      {material.is_premium ? '基准价' : 
                        `${material.price_coefficient > 0 ? '+' : ''}${(material.price_coefficient * 100).toFixed(0)}%`
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 终端市场偏好 */}
          <h2 className="text-xl font-semibold mt-8">终端市场偏好</h2>
          <div className="grid grid-cols-2 gap-4">
            {markets.map((market: any) => (
              <div
                key={market.id}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedMarket === market.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedMarket(market.id)}
              >
                <h3 className="font-medium">{market.name_zh}</h3>
                <p className="text-sm text-muted-foreground">{market.name_en}</p>
              </div>
            ))}
          </div>
          
          {/* 软装面料 */}
          <h2 className="text-xl font-semibold mt-8">软装面料</h2>
          <div className="space-y-4">
            {materials.filter(m => m.category === '软装面料').map((fabric) => (
              <div
                key={fabric.id}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedFabric === fabric.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedFabric(fabric.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{fabric.name_zh}</h3>
                    <p className="text-sm text-muted-foreground">{fabric.grade}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {fabric.is_premium ? '¥85/㎡' : 
                        `¥${Math.round(85 * (1 + fabric.price_coefficient))}/㎡`
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 预算控制 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">目标成本控制</h2>
            <div>
              <label className="text-sm text-muted-foreground">预算范围</label>
              <input
                type="range"
                min="200000"
                max="1000000"
                step="10000"
                value={targetBudget}
                onChange={(e) => setTargetBudget(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>¥200K</span>
                <span className="font-semibold">¥{(targetBudget / 1000).toFixed(0)}K</span>
                <span>¥1,000K</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">起订量 (MOQ)</label>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={moq}
                onChange={(e) => setMoq(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>30 件</span>
                <span className="font-semibold">{moq} 件/款</span>
                <span>500 件</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧：配置摘要 */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-6">配置摘要 / CONFIG_SUMMARY</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">主材</span>
                <span className="font-medium">
                  {selectedMaterial ? 
                    materials.find(m => m.id === selectedMaterial)?.name_zh : 
                    '未选择'
                  }
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">市场风格</span>
                <span className="font-medium">
                  {selectedMarket ? 
                    markets.find((m: any) => m.id === selectedMarket)?.name_zh : 
                    '未选择'
                  }
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">面料</span>
                <span className="font-medium">
                  {selectedFabric ? 
                    materials.find(m => m.id === selectedFabric)?.name_zh : 
                    '未选择'
                  }
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">有效MOQ</span>
                <span className="font-medium">{moq} 件</span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">预估总价</span>
                  <span className="text-2xl font-bold text-primary">
                    ¥{calculatePrice().toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-green-900">符合预算</p>
                    <p className="text-sm text-green-700">差额预算: ¥86,000</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>3 家工厂</strong> 已匹配
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-700">
                  <li>• 佛山陶瓷-华美建材 (45天)</li>
                  <li>• 东莞家具-鸿运家私 (52天)</li>
                  <li>• 江门纺织-永泰实业 (49天)</li>
                </ul>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
              确认配置，进入拼柜环节 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Module 03: 智能寻源（拼柜中枢）

**位置**: `/web/src/components/industrial-os-components/container-loader.tsx`

**功能要求**：
1. 可视化展示 40ft HC 集装箱拼柜方案
2. 显示装载率、剩余容量
3. 展示配载清单（物品名称、数量、重量、体积）
4. 风险提示（重货/泡货比不匹配、装载过载、爆仓概率）

**实现提示**：
- 使用 Three.js 绘制 3D 集装箱模型
- 使用不同颜色的框表示不同物品（蓝色、绿色、橙色、红色）
- 装载率用进度条展示
- 配载清单用表格展示

---

### Module 04: 整柜交付（时间线对比）

**位置**: `/web/src/components/industrial-os-components/timeline-wars.tsx`

**功能要求**：
1. 对比传统采购模式 vs AI 平台的时间线
2. 使用甘特图展示各环节（寻源/打样、样品确认、推单/生产、报关/物流）
3. 显示关键指标（节省时间、提前开业收益、资金效率提升）
4. 标注风险点（如"公共红线：错过酒店开业期 14 天"）

**实现提示**：
- 使用 Recharts 或自定义 SVG 绘制甘特图
- 传统模式用灰色/红色表示，AI 平台用绿色表示
- 添加动画效果，逐步展示时间节省

---

## AI 拆单逻辑实现

### 使用 OpenAI API 实现智能拆单

```typescript
// /web/src/lib/ai-breakdown.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateBOM(demand: {
  project_name: string;
  room_count: number;
  style: string;
  budget: number;
  description: string;
}) {
  const prompt = `
你是一个专业的酒店采购顾问。请根据以下需求，生成详细的物料清单（BOM）：

项目名称：${demand.project_name}
房间数量：${demand.room_count}
风格：${demand.style}
预算：$${demand.budget}
描述：${demand.description}

请生成以下物料清单，包括：
1. 床架（Bed Frames）
2. 床头柜（Nightstands）
3. 椅子（Chairs）
4. 灯具（Lamps）
5. 桌子（Tables）

对于每个物品，请提供：
- 物品名称
- 建议数量
- 预估单价（美元）
- 预估总价
- 建议的起订量（MOQ）

请以 JSON 格式返回，格式如下：
{
  "items": [
    {
      "name": "Bed Frames",
      "quantity": 200,
      "unit_price": 150,
      "total_price": 30000,
      "moq": 50
    }
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: '你是一个专业的酒店采购顾问，擅长根据需求生成详细的物料清单。'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: 'json_object' }
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return result.items || [];
}

// API Route: /web/src/app/api/ai-breakdown/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateBOM } from '@/lib/ai-breakdown';

export async function POST(request: NextRequest) {
  try {
    const demand = await request.json();
    const bom = await generateBOM(demand);
    
    return NextResponse.json({ success: true, data: bom });
  } catch (error) {
    console.error('AI breakdown error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate BOM' },
      { status: 500 }
    );
  }
}
```

---

## 演示动画制作指南

### 使用 Puppeteer 录制 GIF

```bash
# 安装依赖
npm install --save-dev puppeteer puppeteer-screen-recorder

# 创建录制脚本
```

```typescript
// /web/scripts/record-demo.ts
import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

async function recordDemo() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);
  
  // Module 01: 需求上传
  await recorder.start('./demos/module-01-demand-upload.mp4');
  await page.goto('http://localhost:3000/industrial-os');
  await page.waitForTimeout(2000);
  
  // 填写表单
  await page.type('input[placeholder="项目名称"]', '东南亚风情精品酒店');
  await page.waitForTimeout(500);
  await page.type('input[placeholder="房间数量"]', '200');
  await page.waitForTimeout(500);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  
  await recorder.stop();
  
  // Module 02: AI 拆单
  await recorder.start('./demos/module-02-ai-breakdown.mp4');
  // ... 继续录制其他模块
  
  await browser.close();
}

recordDemo();
```

### 转换为 GIF

```bash
# 使用 ffmpeg 转换
ffmpeg -i module-01-demand-upload.mp4 -vf "fps=10,scale=1280:-1:flags=lanczos" -c:v gif module-01-demand-upload.gif
```

---

## 部署指南

### 1. 前端部署（Vercel）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
cd web
vercel --prod
```

### 2. Directus 配置

确保 Directus 的 CORS 设置允许前端域名访问：

```env
# Directus .env
CORS_ENABLED=true
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### 3. 环境变量配置

```env
# /web/.env.local
NEXT_PUBLIC_DIRECTUS_URL=https://admin.cnsubscribe.xyz
DIRECTUS_TOKEN=your-directus-token
OPENAI_API_KEY=your-openai-api-key
```

---

## 下一步工作

### 短期（1-2周）
- [ ] 完成 Module 01-04 的前端实现
- [ ] 集成 Directus API
- [ ] 实现 AI 拆单逻辑
- [ ] 制作演示 GIF/视频

### 中期（1个月）
- [ ] 添加用户认证系统
- [ ] 实现订单追踪功能
- [ ] 添加供应商管理后台
- [ ] 优化移动端体验

### 长期（3个月）
- [ ] 接入真实支付系统
- [ ] 对接物流 API
- [ ] 实现多语言支持
- [ ] 添加数据分析仪表板

---

## 联系与支持

- **Directus Admin**: https://admin.cnsubscribe.xyz
- **前端演示**: https://www.cnsubscribe.xyz/industrial-os
- **GitHub**: https://github.com/magicy565-web/demand-os

---

**Created by Manus AI** | 2026-02-05
