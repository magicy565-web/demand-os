# SourcingOS Module 03 开发建议：智能拼柜中枢

**作者**: Manus AI  
**日期**: 2026年2月5日

## 1. 引言

Module 03 “产业带集货‘拼柜’中枢”是 SourcingOS 平台的核心亮点之一，它直观展示了 AI 如何优化物流，将散货智能拼装成整柜，从而显著降低成本。本指南将为您提供该模块的完整开发建议，涵盖视觉设计、核心功能逻辑及代码实现思路，并附带可供 Claude Sonnet 4.5 使用的 Prompt 示例。

## 2. 视觉设计核心：CAD 工业风与数据透明化

该模块的视觉目标是传达**专业、高效、智能和数据透明**。我们将采用类似 CAD 图纸的工业设计风格，避免过于写实的 3D 渲染，以突出数字化和算法的优势。

### 2.1 整体布局

参考设计稿，页面应分为左右两大部分：
*   **左侧**：集装箱可视化区域，展示货柜的 3D 结构和内部货物摆放。
*   **右侧**：数据面板，包含装载率、成本效益、配载清单和风险提示。

### 2.2 集装箱可视化 (Container Visualization)

*   **风格**：**CAD 线框图或半透明几何体**。使用 Tailwind CSS 的 `border`, `opacity`, `skew`, `rotate` 属性或 SVG 来模拟 3D 效果，而非引入复杂的 Three.js。
*   **柜型**：默认展示 40ft HC (High Cube) 集装箱，可考虑提供切换不同柜型（如 20ft GP）的选项。
*   **货物表示**：
    *   **颜色编码**：不同类型的货物（如主材、软装、配件）或来自不同供应商的货物，用不同的颜色块表示。
    *   **标签**：每个货物块上可显示简短的 ID (如 `PLT-001`)。
    *   **交互**：鼠标悬停在货物块上时，该块高亮，并在右侧配载清单中同步高亮对应项。
*   **装载率**：
    *   **视觉反馈**：集装箱内部可有一个动态填充的“水位”或“进度条”，直观展示装载率。
    *   **动画**：装载率变化时，填充效果应有平滑的动画。

### 2.3 数据面板 (Data Panel)

*   **装载率**：
    *   **核心指标**：醒目显示百分比（如 `62%`）。
    *   **进度条**：使用环形或条形进度条，颜色与品牌色一致，并带有平滑的动画效果。
*   **成本效益**：
    *   **头程快船成本**：显示优化后的成本（如 `$28,000`）。
    *   **货物总体积/重量**：显示 `67.8 CBM` / `10.8 吨`。
*   **配载清单 (Cargo List)**：
    *   **详细信息**：列出每个货物的 ID、名称、数量、重量和体积。
    *   **联动**：与左侧可视化区域联动，点击清单项时，对应货物块高亮。
*   **风险提示 (Risk Alerts)**：
    *   **醒目显示**：使用红色或橙色背景，配合 `AlertTriangle` 图标。
    *   **具体内容**：如“重货/泡货比不匹配”、“装载过载风险”、“爆仓概率”。

## 3. 核心功能逻辑与数据模型

### 3.1 数据来源

*   **需求订单**：从 Directus `demands` Collection 获取当前需求 ID。
*   **物料清单**：根据需求 ID，模拟 AI 拆单后生成的物料清单。在 Demo 阶段，这部分数据可以是硬编码的模拟数据，或者通过一个简单的规则生成。
*   **拼柜方案**：模拟 AI 计算出的货物摆放位置、装载率、总体积/重量等。

### 3.2 数据模型 (Directus Collections 扩展建议)

为了支持 Module 03，可能需要新增或扩展以下 Collections：

#### `container_plans` (拼柜方案)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| demand_id | ManyToOne | 关联 `demands` 表 |
| container_type | String | 柜型 (e.g., '40ft HC', '20ft GP') |
| total_volume | Decimal | 货物总体积 (CBM) |
| total_weight | Decimal | 货物总重量 (KG) |
| loading_rate | Decimal | 装载率 (0-1) |
| head_haul_cost | Decimal | 头程快船成本 |
| risk_alerts | JSON | 风险提示列表 (e.g., ['overload', 'imbalance']) |

#### `cargo_items` (配载货物)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| container_plan_id | ManyToOne | 关联 `container_plans` 表 |
| material_id | ManyToOne | 关联 `materials` 表 (实际物料) |
| item_name | String | 货物名称 (e.g., 'Bed Frames') |
| quantity | Integer | 数量 |
| weight_per_unit | Decimal | 单件重量 |
| volume_per_unit | Decimal | 单件体积 |
| position_x | Decimal | 3D 坐标 X (用于可视化) |
| position_y | Decimal | 3D 坐标 Y |
| position_z | Decimal | 3D 坐标 Z |
| dimensions | JSON | 尺寸 (长宽高) |
| color | String | 可视化颜色 (e.g., '#3b82f6') |

### 3.3 核心逻辑伪代码

```typescript
// /web/src/lib/container-logic.ts (模拟拼柜算法)

interface CargoItemData {
  id: string;
  name: string;
  quantity: number;
  weight_per_unit: number;
  volume_per_unit: number;
  dimensions: { length: number; width: number; height: number };
  color: string;
}

interface ContainerPlan {
  container_type: string;
  total_volume: number;
  total_weight: number;
  loading_rate: number;
  head_haul_cost: number;
  risk_alerts: string[];
  cargo_placements: Array<CargoItemData & { x: number; y: number; z: number; rotated: boolean }>;
}

// 模拟 AI 拼柜算法
export function simulateContainerLoading(demandId: string, materials: CargoItemData[]): ContainerPlan {
  // 实际项目中，这里会调用复杂的算法或 AI 服务
  // 简化处理：假设所有货物都能放入 40ft HC
  const containerVolume = 76; // 40ft HC 内部体积 CBM
  const containerWeightCapacity = 26000; // KG

  let currentVolume = 0;
  let currentWeight = 0;
  const cargoPlacements = [];

  // 简单放置逻辑
  materials.forEach((item, index) => {
    const itemTotalVolume = item.quantity * item.volume_per_unit;
    const itemTotalWeight = item.quantity * item.weight_per_unit;

    if (currentVolume + itemTotalVolume <= containerVolume && currentWeight + itemTotalWeight <= containerWeightCapacity) {
      currentVolume += itemTotalVolume;
      currentWeight += itemTotalWeight;
      // 模拟放置位置
      cargoPlacements.push({ ...item, x: index * 0.5, y: 0, z: 0, rotated: false });
    }
  });

  const loadingRate = currentVolume / containerVolume;
  const headHaulCost = 28000; // 模拟成本
  const riskAlerts = [];

  if (loadingRate > 0.9) riskAlerts.push("装载率高，存在超载风险");
  if (currentWeight / currentVolume > 300) riskAlerts.push("重货比过高，重心偏移风险");

  return {
    container_type: "40ft HC",
    total_volume: parseFloat(currentVolume.toFixed(2)),
    total_weight: parseFloat(currentWeight.toFixed(2)),
    loading_rate: parseFloat(loadingRate.toFixed(2)),
    head_haul_cost: headHaulCost,
    risk_alerts: riskAlerts,
    cargo_placements: cargoPlacements,
  };
}

// /web/src/app/industrial-os/container/[id]/page.tsx (页面组件)

import { simulateContainerLoading } from "@/lib/container-logic";
import { getDemand, getMaterials } from "@/lib/directus";

export default function ContainerPage({ params }: { params: { id: string } }) {
  const [containerPlan, setContainerPlan] = useState<ContainerPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAndSimulate() {
      const demand = await getDemand(params.id);
      const materials = await getMaterials(); // 获取所有物料，然后根据demand筛选
      // 简化：假设 demand 已经包含了物料清单，或者从 Directus 获取关联的 BOM
      const demoMaterials: CargoItemData[] = [
        { id: 'PLT-001', name: 'Bed Frames', quantity: 200, weight_per_unit: 6, volume_per_unit: 0.04, dimensions: { length: 2, width: 1, height: 0.2 }, color: '#3b82f6' },
        { id: 'PLT-002', name: 'Nightstands', quantity: 400, weight_per_unit: 1.2, volume_per_unit: 0.008, dimensions: { length: 0.5, width: 0.5, height: 0.3 }, color: '#10b981' },
        { id: 'PLT-003', name: 'Chairs', quantity: 200, weight_per_unit: 3, volume_per_unit: 0.02, dimensions: { length: 0.6, width: 0.5, height: 0.8 }, color: '#f59e0b' },
        { id: 'PLT-004', name: 'Lamps', quantity: 100, weight_per_unit: 0.5, volume_per_unit: 0.005, dimensions: { length: 0.3, width: 0.3, height: 0.4 }, color: '#ef4444' },
      ];
      const plan = simulateContainerLoading(params.id, demoMaterials);
      setContainerPlan(plan);
      setLoading(false);
    }
    fetchAndSimulate();
  }, [params.id]);

  if (loading) return <LoadingSpinner />;
  if (!containerPlan) return <ErrorMessage />;

  return (
    <div className="container mx-auto py-12">
      {/* UI 布局，结合左侧可视化和右侧数据面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：集装箱可视化 */}
        <div className="lg:col-span-2">
          <ContainerVisualization cargoPlacements={containerPlan.cargo_placements} />
        </div>
        {/* 右侧：数据面板 */}
        <div className="lg:col-span-1">
          <DataPanel containerPlan={containerPlan} />
        </div>
      </div>
    </div>
  );
}
```

## 4. Claude Sonnet 4.5 开发 Prompt 示例

以下 Prompt 旨在引导 Claude 生成 Module 03 的 UI 组件和逻辑。请确保在发送 Prompt 前，已向 Claude 注入项目上下文（技术栈、Directus API 封装等）。

### 4.1 Prompt 1: 集装箱可视化组件 (ContainerVisualization)

**目标**：创建一个具有 CAD 工业风格的集装箱 3D 模拟图，内部展示不同颜色的货物块。

> "我需要一个名为 `ContainerVisualization.tsx` 的 React 组件，用于 Module 03。它应该接收 `cargoPlacements` 数组作为 props，每个元素包含 `x, y, z` 坐标、`dimensions` (长宽高) 和 `color`。请使用 Tailwind CSS 和纯 CSS 3D Transforms 来模拟一个 40ft HC 集装箱的线框图。集装箱内部应根据 `cargoPlacements` 渲染不同颜色的货物块。货物块在鼠标悬停时应有轻微的 `scale` 动画和边框高亮。整体风格要像 CAD 图纸一样简洁专业，避免使用 Three.js。"

### 4.2 Prompt 2: 数据面板组件 (DataPanel)

**目标**：展示装载率、成本效益、配载清单和风险提示。

> "请创建一个名为 `DataPanel.tsx` 的 React 组件，用于 Module 03 的右侧数据面板。它接收 `containerPlan` 对象作为 props。组件应包含：
> 1.  **装载率**：一个醒目的百分比数字和一个环形进度条（使用 Shadcn UI 的 `Progress` 组件或自定义 CSS 实现）。
> 2.  **成本效益**：显示‘头程快船成本’和‘货物总体积/重量’。
> 3.  **配载清单**：一个可滚动的列表，展示 `cargoPlacements` 中的每个货物项（名称、数量、重量、体积）。当列表项被点击时，应触发一个事件（例如 `onCargoSelect`），用于高亮左侧 3D 视图中的对应货物。
> 4.  **风险提示**：如果 `containerPlan.risk_alerts` 数组不为空，则显示一个红色的警告卡片，列出所有风险。"

### 4.3 Prompt 3: 页面集成与数据加载

**目标**：将 `ContainerVisualization` 和 `DataPanel` 集成到 `container/[id]/page.tsx` 页面，并处理数据加载。

> "请完善 `web/src/app/industrial-os/container/[id]/page.tsx` 页面。该页面应从 URL 参数中获取 `demandId`，然后调用 `simulateContainerLoading` 函数（假设已存在于 `@/lib/container-logic`）来获取 `containerPlan` 数据。页面应显示加载状态，并在数据加载完成后，将 `containerPlan` 数据传递给 `ContainerVisualization` 和 `DataPanel` 组件。确保页面布局符合左右分栏设计，并提供一个按钮，点击后跳转到 Module 04 的时间线对比页面。"

## 5. 总结与后续步骤

Module 03 的开发将是 SourcingOS 视觉和功能上的一个重要里程碑。通过遵循上述建议和利用 Claude 的强大能力，您将能够高效地构建出专业且富有交互性的“智能拼柜中枢”。

**后续步骤**：
1.  **Directus 集成**：根据 `container_plans` 和 `cargo_items` 的数据模型，更新 Directus Schema，并编写相应的 API 函数。
2.  **真实数据模拟**：如果时间允许，可以进一步细化 `simulateContainerLoading` 函数，使其生成更真实的拼柜数据。
3.  **交互优化**：增加更多微交互和动画，提升用户体验。
4.  **GIF 演示**：根据 Module 03 的功能特点，设计并录制演示 GIF。

祝您开发顺利！
