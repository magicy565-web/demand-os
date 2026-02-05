# Module 01 & 02 实现行动计划

**制定日期**: 2026年2月5日  
**优先级**: 🔴 高  
**预计工作量**: 12-16 小时

---

## 🎯 核心目标

完成以下文件实现，以支持 Vercel + Neon PostgreSQL 部署：

1. ✅ Directus API 客户端（`/web/src/lib/directus.ts`）
2. ✅ 需求表单组件（`/web/src/components/industrial-os-components/demand-form.tsx`）
3. ✅ AI 拆单页面（`/web/src/app/industrial-os/breakdown/[id]/page.tsx`）

---

## 📋 详细实现步骤

### 步骤 1: 创建 Directus API 客户端

**文件**: `/web/src/lib/directus.ts`

**预计代码**:
```typescript
import { createClient } from '@directus/sdk';
import type { 
  Schema,
  DirectusUser,
  SettingsType,
  ItemType,
  RelationshipType
} from '@directus/types';

// 类型定义
export interface Demand {
  id: string;
  project_name: string;
  room_count: number;
  style: string;
  budget: number;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Material {
  id: string;
  name: string;
  base_price: number;
  coefficient: number;
  category: string;
}

export interface Market {
  id: string;
  name: string;
  preference: string;
  coefficient: number;
}

export interface Supplier {
  id: string;
  name: string;
  moq: number;
  region: string;
  rating: number;
}

// Directus 客户端初始化
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.cnsubscribe.xyz';
const token = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

const client = createClient({
  url: directusUrl,
  token: token,
});

// API 函数
export async function createDemand(data: Omit<Demand, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const response = await fetch(`${directusUrl}/items/demands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating demand:', error);
    throw error;
  }
}

export async function getDemand(id: string) {
  try {
    const response = await fetch(`${directusUrl}/items/demands/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching demand:', error);
    throw error;
  }
}

export async function getMaterials() {
  try {
    const response = await fetch(`${directusUrl}/items/materials`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching materials:', error);
    throw error;
  }
}

export async function getMarkets() {
  try {
    const response = await fetch(`${directusUrl}/items/markets`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching markets:', error);
    throw error;
  }
}

export async function getSuppliers() {
  try {
    const response = await fetch(`${directusUrl}/items/suppliers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
}
```

**预计时间**: 1-2 小时

---

### 步骤 2: 创建需求表单组件

**文件**: `/web/src/components/industrial-os-components/demand-form.tsx`

**预计代码**:
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDemand } from '@/lib/directus';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DemandFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemandForm({ open, onOpenChange }: DemandFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    project_name: '',
    room_count: 100,
    style: '现代简约',
    budget: 500000,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createDemand({
        ...formData,
        status: 'pending',
      });

      // 跳转到 breakdown 页面
      router.push(`/industrial-os/breakdown/${response.data.id}`);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      // 显示错误提示
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>需求信息提交</DialogTitle>
          <DialogDescription>
            请填写您的项目基本信息，系统将为您匹配最优方案
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 项目名称 */}
          <div>
            <label className="text-sm font-medium">项目名称</label>
            <Input
              value={formData.project_name}
              onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
              placeholder="e.g. 北京西城区酒店项目"
              required
            />
          </div>

          {/* 房间数量 */}
          <div>
            <label className="text-sm font-medium">房间数量</label>
            <Input
              type="number"
              value={formData.room_count}
              onChange={(e) => setFormData({ ...formData, room_count: parseInt(e.target.value) })}
              min="1"
              required
            />
          </div>

          {/* 风格选择 */}
          <div>
            <label className="text-sm font-medium">装修风格</label>
            <Select value={formData.style} onValueChange={(style) => setFormData({ ...formData, style })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="现代简约">现代简约</SelectItem>
                <SelectItem value="欧式古典">欧式古典</SelectItem>
                <SelectItem value="中式传统">中式传统</SelectItem>
                <SelectItem value="混搭风格">混搭风格</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 预算 */}
          <div>
            <label className="text-sm font-medium">预算 (¥)</label>
            <Input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
              min="100000"
              step="10000"
              required
            />
          </div>

          {/* 项目描述 */}
          <div>
            <label className="text-sm font-medium">项目描述</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="请补充您的项目需求和特殊要求..."
              rows={3}
            />
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '提交中...' : '提交并查看方案'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

**预计时间**: 2-3 小时

---

### 步骤 3: 创建 AI 拆单页面

**文件**: `/web/src/app/industrial-os/breakdown/[id]/page.tsx`

**预计代码**:
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDemand, getMaterials, getMarkets, getSuppliers } from '@/lib/directus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Demand {
  id: string;
  project_name: string;
  room_count: number;
  budget: number;
}

interface Material {
  id: string;
  name: string;
  base_price: number;
  coefficient: number;
}

interface Market {
  id: string;
  name: string;
  coefficient: number;
}

interface Supplier {
  id: string;
  name: string;
  moq: number;
  rating: number;
}

export default function BreakdownPage() {
  const params = useParams();
  const router = useRouter();
  const demandId = params.id as string;

  const [demand, setDemand] = useState<Demand | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // 选项状态
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [budget, setBudget] = useState<number>(500000);
  const [moq, setMoq] = useState<number>(100);

  // 计算状态
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [isWithinBudget, setIsWithinBudget] = useState<boolean>(true);
  const [matchedSuppliers, setMatchedSuppliers] = useState<Supplier[]>([]);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [demandData, materialsData, marketsData, suppliersData] = await Promise.all([
          getDemand(demandId),
          getMaterials(),
          getMarkets(),
          getSuppliers(),
        ]);

        setDemand(demandData.data);
        setMaterials(materialsData);
        setMarkets(marketsData);
        setSuppliers(suppliersData);

        // 设置默认值
        if (materialsData.length > 0) setSelectedMaterial(materialsData[0].id);
        if (marketsData.length > 0) setSelectedMarket(marketsData[0].id);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [demandId]);

  // 计算价格
  useEffect(() => {
    if (selectedMaterial && selectedMarket) {
      const material = materials.find((m) => m.id === selectedMaterial);
      const market = markets.find((m) => m.id === selectedMarket);

      if (material && market) {
        const price = material.base_price * (1 + material.coefficient) * (1 + market.coefficient);
        setFinalPrice(price);
        setIsWithinBudget(price <= budget);
      }
    }
  }, [selectedMaterial, selectedMarket, budget, materials, markets]);

  // 匹配供应商
  useEffect(() => {
    const matched = suppliers.filter((s) => s.moq <= moq);
    setMatchedSuppliers(matched);
  }, [moq, suppliers]);

  const handleContinue = () => {
    // 跳转到 container 页面
    router.push(`/industrial-os/container/${demandId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI 智能拆单</h1>
          <p className="text-muted-foreground">
            项目: {demand?.project_name} | 房间数: {demand?.room_count}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 配置区域 */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="material" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="material">主材选型</TabsTrigger>
                <TabsTrigger value="market">市场偏好</TabsTrigger>
                <TabsTrigger value="budget">预算配置</TabsTrigger>
              </TabsList>

              {/* 主材选型 */}
              <TabsContent value="material">
                <Card>
                  <CardHeader>
                    <CardTitle>主材选型</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {materials.map((material) => (
                      <button
                        key={material.id}
                        onClick={() => setSelectedMaterial(material.id)}
                        className={`w-full p-4 border rounded-lg text-left transition ${
                          selectedMaterial === material.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-muted-foreground">
                              基准价: ¥{material.base_price.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-sm font-medium">
                            系数: {(material.coefficient * 100).toFixed(0)}%
                          </p>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 市场偏好 */}
              <TabsContent value="market">
                <Card>
                  <CardHeader>
                    <CardTitle>终端市场偏好</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {markets.map((market) => (
                      <button
                        key={market.id}
                        onClick={() => setSelectedMarket(market.id)}
                        className={`w-full p-4 border rounded-lg text-left transition ${
                          selectedMarket === market.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{market.name}</p>
                          <p className="text-sm font-medium">
                            系数: {(market.coefficient * 100).toFixed(0)}%
                          </p>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 预算配置 */}
              <TabsContent value="budget">
                <Card>
                  <CardHeader>
                    <CardTitle>预算配置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">总预算</label>
                        <span className="text-lg font-bold">¥{budget.toLocaleString()}</span>
                      </div>
                      <Slider
                        value={[budget]}
                        onValueChange={(v) => setBudget(v[0])}
                        min={200000}
                        max={1000000}
                        step={10000}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        范围: ¥200K - ¥1,000K
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">起订量 (MOQ)</label>
                        <span className="text-lg font-bold">{moq} 件</span>
                      </div>
                      <Slider
                        value={[moq]}
                        onValueChange={(v) => setMoq(v[0])}
                        min={30}
                        max={500}
                        step={10}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 摘要区域 */}
          <div className="space-y-6">
            {/* 价格摘要 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">配置摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">最终价格</span>
                    <span className="font-bold text-lg">¥{finalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">预算</span>
                    <span className="font-bold">¥{budget.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="text-muted-foreground">余额</span>
                    <span className={`font-bold ${isWithinBudget ? 'text-green-600' : 'text-red-600'}`}>
                      ¥{(budget - finalPrice).toLocaleString()}
                    </span>
                  </div>
                </div>

                {!isWithinBudget && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-800">
                    ⚠️ 超出预算 ¥{(finalPrice - budget).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 供应商匹配 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  匹配供应商 ({matchedSuppliers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {matchedSuppliers.map((supplier) => (
                    <div
                      key={supplier.id}
                      className="p-3 border rounded bg-slate-50 hover:bg-slate-100 transition"
                    >
                      <p className="font-medium text-sm">{supplier.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ⭐ {supplier.rating} | MOQ: {supplier.moq}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 继续按钮 */}
            <Button
              onClick={handleContinue}
              className="w-full"
              disabled={!isWithinBudget || matchedSuppliers.length === 0}
            >
              {isWithinBudget ? '确认配置 → 拼柜中枢' : '请调整预算'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**预计时间**: 3-4 小时

---

## 📝 测试检查清单

完成实现后，按以下顺序测试：

### 本地开发测试

```bash
# 1. 启动开发服务器
cd web
npm run dev

# 2. 访问首页
http://localhost:3000/industrial-os
```

### Module 01 测试

- [ ] 页面加载正常
- [ ] 点击"立即匹配产能"按钮，弹出表单
- [ ] 表单所有字段可以填写
- [ ] 表单验证工作正常（填写必填字段）
- [ ] 提交表单后，检查浏览器控制台是否有错误
- [ ] 提交成功后，重定向到 breakdown 页面

### Module 02 测试

- [ ] breakdown 页面加载正常
- [ ] 显示 demand 数据（项目名称、房间数量）
- [ ] Materials 标签页：
  - [ ] 显示所有物料列表
  - [ ] 可以选择不同物料
  - [ ] 选择后样式改变
  
- [ ] Markets 标签页：
  - [ ] 显示所有市场选项
  - [ ] 可以选择不同市场
  
- [ ] Budget 标签页：
  - [ ] 预算滑块可以调整
  - [ ] MOQ 滑块可以调整
  
- [ ] 右侧摘要区域：
  - [ ] 实时显示最终价格
  - [ ] 显示预算符合性
  - [ ] 显示匹配的供应商数量
  
- [ ] 点击"确认配置"按钮，重定向到 container 页面

---

## 🔗 环境变量配置

确保 `.env.local` 包含：

```env
NEXT_PUBLIC_DIRECTUS_URL=https://admin.cnsubscribe.xyz
NEXT_PUBLIC_DIRECTUS_TOKEN=your-directus-token
```

---

## 📊 工作量估计

| 任务 | 工作量 | 优先级 |
|------|--------|--------|
| directus.ts | 2 小时 | 🔴 高 |
| demand-form.tsx | 2-3 小时 | 🔴 高 |
| breakdown/[id]/page.tsx | 3-4 小时 | 🔴 高 |
| 集成和测试 | 2-3 小时 | 🟡 中 |
| **总计** | **9-12 小时** | - |

---

## 🚀 后续步骤

完成上述三个文件后：

1. ✅ 本地完整测试
2. ✅ 修改 hero-section.tsx 集成 DemandForm
3. ✅ 配置 Vercel 环境变量
4. ✅ 部署到 Vercel
5. ✅ 使用 Neon PostgreSQL 测试
6. ✅ 创建 container 和 timeline 页面

---

**预计完成日期**: 2026年2月6日  
**难度级别**: 中等  
**依赖项**: Directus 账户和 Token
