# SourcingOS 3D SVG 地图设计方案与视觉规范

**作者**: Manus AI  
**日期**: 2026年2月5日

## 1. 引言

本设计方案旨在为 SourcingOS 平台构建一个具有高视觉冲击力和实用信息价值的“中国产业带数字化作战大屏”。该大屏将作为平台的核心入口，通过 3D SVG 地图的形式，直观展示中国各产业带的分布、特性与优势，帮助海外采购商快速了解中国供应链格局。

## 2. 技术方案：轻量级 3D SVG

为了在保证视觉效果的同时，兼顾性能和开发效率，我们将采用基于 **SVG + React + Tailwind CSS + Framer Motion** 的轻量级 3D 模拟方案，而非引入复杂的三维渲染库（如 Three.js）。

### 2.1 核心技术栈
*   **SVG (Scalable Vector Graphics)**：用于绘制中国地图的省份轮廓和产业带区域。我们将使用优化后的 SVG 路径数据，确保文件大小和渲染性能。
*   **React**：作为前端框架，管理组件状态和渲染。
*   **Tailwind CSS**：提供原子化 CSS 样式，快速构建 UI 布局和基础视觉效果。
*   **Framer Motion**：用于实现平滑的动画、交互动效和布局过渡，增强科技感和用户体验。

### 2.2 3D 效果实现原理
我们将通过以下技术组合模拟 3D 效果：
*   **SVG `filter` 属性**：利用 `feDropShadow` 等滤镜模拟深度和阴影效果。
*   **CSS `transform` 属性**：对 SVG 元素应用 `rotateX`, `rotateY`, `skew` 等变换，结合 `perspective` 属性，创建伪 3D 视角。
*   **多层 SVG 叠加**：创建多个 SVG 层，通过微小的位移和颜色差异，模拟立体感。

## 3. 视觉规范：科技感与专业性

### 3.1 配色方案 (Color Palette)
整体采用**暗色系科技感**风格，以深蓝、深灰为主色调，辅以亮色（青色、紫色、橙色）作为强调色和动效色。

| 颜色名称 | HEX 值 | 用途 |
| :------- | :----- | :--- |
| 背景深蓝 | `#0A192F` | 地图背景、整体底色 |
| 地图轮廓 | `#1E3A8A` | 省份/区域边框 |
| 产业带高亮 | `#00E0FF` | 活跃产业带、热力点 |
| 强调色1 | `#8B5CF6` | 动态光流、连接线 |
| 强调色2 | `#F97316` | 风险提示、警告 |
| 文字颜色 | `#E2E8F0` | 主要信息文字 |
| 次要文字 | `#94A3B8` | 辅助信息文字 |

### 3.2 字体 (Typography)
*   **主标题**：`'Orbitron', sans-serif` (或类似科技感字体)，粗体，大字号。
*   **正文/数据**：`'Inter', sans-serif` (或类似现代无衬线字体)，确保可读性。

### 3.3 动画与动效 (Animations & Effects)
*   **背景光流**：地图背景有缓慢、连续的粒子流或光线流动效果，增加科技感。
*   **产业带脉冲**：核心产业带节点有周期性的发光脉冲动画。
*   **连接线动画**：从产业带向外辐射的连接线有“生长”或“流动”的动画效果。
*   **悬停反馈**：鼠标悬停在产业带区域时，该区域轻微放大、边框高亮，并弹出信息卡片。
*   **页面过渡**：从大屏进入 Module 01 时，有平滑的缩放或淡入淡出过渡。

## 4. 数据集成与组件结构

### 4.1 Directus 数据模型 (`industrial_belts`)
我们将扩展 Directus 中的 `industrial_belts` Collection，存储以下关键信息：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| id | UUID | 主键 |
| name | String | 产业带名称 (e.g., '佛山家具产业带') |
| province | String | 所属省份 (e.g., '广东') |
| coordinates | JSON | 地理坐标 (用于地图定位，e.g., `{ lat: 23.02, lng: 113.12 }`) |
| svg_path_id | String | 对应 SVG 地图中的路径 ID |
| core_products | String | 核心产品 (e.g., '家具、陶瓷、家电') |
| advantages | Text | 产业带优势描述 |
| factory_count | Integer | 入驻 SourcingOS 的工厂数量 |
| status | String | 活跃状态 (e.g., 'active', 'developing') |

### 4.2 前端组件结构

```typescript
// /web/src/app/page.tsx (首页，即作战大屏)
export default function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background-dark">
      <ChinaIndustrialMap />
      <GlobalDataTicker /> {/* 顶部滚动数据 */}
      <CallToActionOverlay /> {/* 引导进入 Module 01 */}
    </div>
  );
}

// /web/src/components/ChinaIndustrialMap.tsx
interface ChinaIndustrialMapProps {
  industrialBelts: IndustrialBelt[];
}

export default function ChinaIndustrialMap({ industrialBelts }: ChinaIndustrialMapProps) {
  return (
    <svg className="w-full h-full" viewBox="0 0 1000 800"> {/* 优化后的中国地图 SVG */}
      {/* 基础地图层 */}
      <g className="base-map-layer">
        {/* 各省份 SVG Path */}
      </g>
      {/* 产业带标注层 */}
      <g className="industrial-belt-layer">
        {industrialBelts.map(belt => (
          <IndustrialBeltMarker key={belt.id} belt={belt} />
        ))}
      </g>
      {/* 动态光流层 */}
      <g className="flow-lines-layer">
        {/* 使用 SVG Path 或 Line 元素实现光流动画 */}
      </g>
    </svg>
  );
}

// /web/src/components/IndustrialBeltMarker.tsx
interface IndustrialBeltMarkerProps {
  belt: IndustrialBelt;
}

export default function IndustrialBeltMarker({ belt }: IndustrialBeltMarkerProps) {
  return (
    <motion.g
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }}
      // ... 悬停弹出信息卡片逻辑
    >
      <circle cx={belt.coordinates.lng} cy={belt.coordinates.lat} r="5" className="fill-industrial-highlight pulse-animation" />
      <text x={belt.coordinates.lng + 10} y={belt.coordinates.lat} className="text-xs fill-text-light">{belt.name}</text>
    </motion.g>
  );
}

// /web/src/components/GlobalDataTicker.tsx (顶部滚动数据)
// /web/src/components/CallToActionOverlay.tsx (引导进入 Module 01)
```

## 5. 总结与后续步骤

该 3D SVG 地图将是 SourcingOS 平台最引人注目的部分。通过上述设计方案，我们可以在有限的时间内，利用现代前端技术栈，实现一个既美观又功能强大的数字化作战大屏。

**后续步骤**：
1.  **SVG 地图数据准备**：获取中国各省份和主要城市的 SVG 路径数据，并进行优化。
2.  **Directus 数据填充**：根据 `industrial_belt_data.md` 中的信息，填充 `industrial_belts` Collection。
3.  **组件开发**：按照上述结构，逐步实现 `ChinaIndustrialMap`、`IndustrialBeltMarker` 等组件。
4.  **动效集成**：利用 Framer Motion 和 CSS 动画，实现所有视觉规范中提到的动效。

这份设计方案将作为明天开发的核心指引。
