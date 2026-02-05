# SourcingOS 前端开发进度报告

**更新日期**: 2026年2月5日
**开发阶段**: 前端 UI/UX 实现中
**完成度**: 50% (Module 01 & 02 已完成)

---

## 已完成的工作 ✅

### 1. 开发环境配置

- ✅ 安装 Directus SDK (`@directus/sdk`)
- ✅ 创建环境变量配置文件 (`.env.local`)
- ✅ 配置 Directus API 连接

### 2. Directus API 封装

**文件**: `/web/src/lib/directus.ts`

已实现的功能：
- ✅ Directus 客户端初始化
- ✅ TypeScript 类型定义（Demand, Material, Market, Supplier） 
- ✅ API 函数封装：
  - `createDemand()` - 创建需求订单
  - `getMaterials()` - 获取物料列表
  - `getMarkets()` - 获取市场列表
  - `getSuppliers()` - 获取供应商列表
  - `getDemand()` - 获取单个需求订单

### 3. Module 01: 需求上传 ✅

**文件**:
- `/web/src/components/industrial-os-components/demand-form.tsx` (新建)
- `/web/src/components/industrial-os-components/hero-section.tsx` (修改)

**功能实现**：
- ✅ 需求提交表单（项目名称、房间数量、风格、预算、描述）
- ✅ 表单验证
- ✅ 提交到 Directus API
- ✅ 提交成功后跳转到 AI 拆单页面
- ✅ 集成到 Hero Section（使用 Dialog 弹窗）

**交互流程**：
1. 用户点击"立即匹配产能"按钮
2. 弹出需求提交表单
3. 填写项目信息
4. 提交后创建 Demand 记录
5. 自动跳转到 `/industrial-os/breakdown/[id]` 页面

### 4. Module 02: AI 拆单（C2M 引擎）✅

**文件**: `/web/src/app/industrial-os/breakdown/[id]/page.tsx` (新建)

**功能实现**：
- ✅ 从 Directus 加载物料、市场、供应商数据
- ✅ 主材选型界面（显示价格系数）
- ✅ 终端市场偏好选择
- ✅ 软装面料选择
- ✅ 预算控制滑块（¥200K - ¥1,000K）
- ✅ 起订量（MOQ）滑块（30 - 500 件）
- ✅ 实时价格计算（基准价 × 价格系数）
- ✅ 配置摘要展示
- ✅ 预算符合性检查
- ✅ 供应商匹配（根据 MOQ 筛选）
- ✅ 跳转到拼柜页面按钮

**核心算法**：
```typescript
// 价格计算公式
finalPrice = basePrice × (1 + materialCoefficient) × (1 + fabricCoefficient)

// 预算检查
isWithinBudget = finalPrice <= targetBudget

// 供应商匹配
matchedSuppliers = suppliers.filter(s => s.moq <= moq)
```

---

## 待完成的工作 ⏳

### Module 03: 智能寻源（拼柜中枢）

**文件**: `/web/src/app/industrial-os/container/[id]/page.tsx` (待创建)

**功能要求**：
1. 3D 集装箱可视化（使用 Three.js + React Three Fiber）
2. 装载率展示（进度条 + 百分比）
3. 配载清单（物品名称、数量、重量、体积）
4. 风险提示（重货/泡货比、装载过载、爆仓概率）
5. 跳转到时间线对比页面

**实现提示**：
```typescript
// 安装依赖
npm install three @react-three/fiber @react-three/drei

// 3D 容器组件
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

function Container3D() {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* 集装箱外框 */}
      <Box args={[12, 2.4, 2.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e0e0e0" wireframe />
      </Box>

      {/* 货物（不同颜色表示不同物品）*/}
      <Box args={[2, 1, 1]} position={[-4, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
      <Box args={[2, 1, 1]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Box>

      <OrbitControls />
    </Canvas>
  );
}
```

**配载清单数据结构**：
```typescript
interface CargoItem {
  id: string;
  name: string;
  quantity: number;
  weight: number; // kg
  volume: number; // CBM
  color: string; // 3D 显示颜色
}

const cargoItems: CargoItem[] = [
  { id: 'PLT-001', name: 'Bed Frames', quantity: 200, weight: 1200, volume: 8.5, color: '#3b82f6' },
  { id: 'PLT-002', name: 'Nightstands', quantity: 400, weight: 480, volume: 3.2, color: '#10b981' },
  // ...
];
```

---

### Module 04: 整柜交付（时间线对比）

**文件**: `/web/src/app/industrial-os/timeline/[id]/page.tsx` (待创建)

**功能要求**：
1. 甘特图对比（传统模式 vs AI 平台）
2. 时间节点标注（寻源/打样、样品确认、推单/生产、报关/物流）
3. 关键指标展示（节省时间、提前开业收益、资金效率提升）
4. 风险点标注（如"错过酒店开业期 14 天"）

**实现提示**：
```typescript
// 安装 Recharts
npm install recharts

// 甘特图数据结构
interface TimelinePhase {
  name: string;
  start: number; // 天数
  duration: number; // 天数
  status: 'completed' | 'in-progress' | 'delayed' | 'at-risk';
}

const traditionalTimeline: TimelinePhase[] = [
  { name: '寻源/打样', start: 0, duration: 45, status: 'completed' },
  { name: '样品确认', start: 45, duration: 14, status: 'delayed' },
  { name: '推单/生产', start: 59, duration: 60, status: 'in-progress' },
  { name: '报关/物流', start: 119, duration: 60, status: 'at-risk' },
];

const aiTimeline: TimelinePhase[] = [
  { name: 'AI 匹配', start: 0, duration: 3, status: 'completed' },
  { name: '推单/生产', start: 3, duration: 30, status: 'completed' },
  { name: '报关/物流', start: 33, duration: 12, status: 'completed' },
];
```

**使用 Recharts 实现甘特图**：
```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function TimelineGantt() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">传统采购模式</h3>
        <BarChart width={800} height={100} data={traditionalData} layout="horizontal">
          <XAxis type="number" domain={[0, 200]} />
          <YAxis type="category" dataKey="name" />
          <Bar dataKey="duration" fill="#ef4444" stackId="a" />
        </BarChart>
        <p className="text-sm text-muted-foreground mt-2">
          总周期: <strong>179 天</strong> (约 6 个月)
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">AI 智能采购平台</h3>
        <BarChart width={800} height={100} data={aiData} layout="horizontal">
          <XAxis type="number" domain={[0, 200]} />
          <YAxis type="category" dataKey="name" />
          <Bar dataKey="duration" fill="#10b981" stackId="a" />
        </BarChart>
        <p className="text-sm text-muted-foreground mt-2">
          总周期: <strong>45 天</strong> (约 1.5 个月)
        </p>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">节省时间</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-primary">134</p>
            <p className="text-sm text-muted-foreground">天 (约 4.5 个月)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">提前开业收益</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-green-600">$150K</p>
            <p className="text-sm text-muted-foreground">额外营收 (按200间房计)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">资金效率提升</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold text-orange-600">4×</p>
            <p className="text-sm text-muted-foreground">资金周转率提升</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## 测试指南

### 1. 本地开发测试

```bash
# 进入 web 目录
cd /home/ubuntu/demand-os/web

# 启动开发服务器
npm run dev

# 访问
# http://localhost:3000/industrial-os
```

### 2. 功能测试清单

**Module 01 测试**：
- [ ] 点击"立即匹配产能"按钮，弹出表单
- [ ] 填写所有必填字段
- [ ] 提交表单，检查是否创建 Demand 记录
- [ ] 检查是否跳转到 breakdown 页面

**Module 02 测试**：
- [ ] 页面加载，检查是否显示物料、市场、供应商数据
- [ ] 选择不同主材，检查价格是否实时更新
- [ ] 选择不同面料，检查价格是否实时更新
- [ ] 调整预算滑块，检查预算符合性提示
- [ ] 调整 MOQ 滑块，检查匹配的供应商数量
- [ ] 点击"确认配置"按钮，检查是否跳转到 container 页面

**Module 03 测试**（待实现）：
- [ ] 3D 集装箱是否正常渲染
- [ ] 装载率是否正确计算
- [ ] 配载清单是否完整显示
- [ ] 风险提示是否准确

**Module 04 测试**（待实现）：
- [ ] 甘特图是否正确显示
- [ ] 时间对比是否准确
- [ ] 关键指标是否正确计算

### 3. API 测试

```bash
# 测试 Directus 连接
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://admin.cnsubscribe.xyz/items/materials

# 测试创建 Demand
curl -X POST https://admin.cnsubscribe.xyz/items/demands \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-uuid",
    "project_name": "测试项目",
    "room_count": 100,
    "style": "现代简约",
    "budget": 500000,
    "description": "测试描述",
    "status": "pending"
  }'
```

---

## 部署指南

### 1. 环境变量配置

在 Vercel 或其他部署平台上配置以下环境变量：

```env
NEXT_PUBLIC_DIRECTUS_URL=https://admin.cnsubscribe.xyz
NEXT_PUBLIC_DIRECTUS_TOKEN=your-directus-token
OPENAI_API_KEY=your-openai-api-key
```

### 2. 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd /home/ubuntu/demand-os/web
vercel --prod
```

### 3. 部署后测试

- [ ] 访问生产环境 URL
- [ ] 测试所有功能是否正常
- [ ] 检查 Directus API 连接
- [ ] 检查页面加载速度

---

## 下一步工作计划

### 短期（本周）
1. ✅ 完成 Module 01 & 02
2. ⏳ 实现 Module 03（拼柜可视化）
3. ⏳ 实现 Module 04（时间线对比）
4. ⏳ 全流程测试

### 中期（下周）
1. 制作演示动画 GIF
2. 优化移动端体验
3. 添加加载动画和过渡效果
4. 性能优化

### 长期（本月）
1. 集成 AI 拆单逻辑（OpenAI API）
2. 添加用户认证系统
3. 实现订单追踪功能
4. 添加供应商管理后台

---

## 技术债务

1. **Token 过期问题**：当前使用的 Directus Token 会在 15 分钟后过期，需要实现 Token 刷新机制
2. **错误处理**：需要添加更完善的错误处理和用户提示
3. **加载状态**：需要为所有异步操作添加加载状态
4. **类型安全**：需要为所有 API 响应添加完整的 TypeScript 类型
5. **单元测试**：需要添加单元测试和集成测试

---

## 常见问题

### Q: Directus API 返回 401 错误
**A**: Token 可能已过期，需要重新登录获取新 Token：
```bash
curl -X POST https://admin.cnsubscribe.xyz/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"magic@gmail.com","password":"wysk1214"}'
```

### Q: 页面加载很慢
**A**: 可能是 Directus API 响应慢，可以：
1. 添加数据缓存
2. 使用 SWR 或 React Query 进行数据管理
3. 优化 API 查询（减少字段、添加索引）

### Q: 3D 集装箱渲染卡顿
**A**: Three.js 性能优化：
1. 降低模型复杂度
2. 使用 LOD（Level of Detail）
3. 启用 GPU 加速

---

## 联系与支持

- **GitHub**: https://github.com/magicy565-web/demand-os
- **Directus Admin**: https://admin.cnsubscribe.xyz
- **前端演示**: https://www.cnsubscribe.xyz/industrial-os

---

**报告生成时间**: 2026年2月5日
**报告生成者**: Manus AI
