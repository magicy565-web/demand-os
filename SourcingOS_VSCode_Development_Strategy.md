# SourcingOS VS Code 开发与 AI 协作深度策略指南

**作者**: Manus AI  
**日期**: 2026年2月5日

## 1. 引言

为了让您在 VS Code 中配合 Claude Sonnet 4.5 高效地完成 SourcingOS 的后续开发，本指南将提供一套完整的协作策略。我们将重点放在如何通过精准的 Prompt 引导 AI 实现高审美、高交互性的 UI，以及如何快速构建 Module 03 和 04 的演示效果。

## 2. VS Code + Claude 协作环境配置

### 2.1 上下文注入 (Context Injection)
在 VS Code 中使用 Claude 时，建议先发送一个“环境初始化”指令，让它理解项目的全貌：

**初始化 Prompt 模板：**
> "我正在开发 SourcingOS 项目，这是一个基于 Next.js 15 和 Tailwind CSS 的跨境采购平台。后端使用 Directus。目前已完成 Module 01 和 02 的基础逻辑。
> 
> 请阅读以下核心文件以了解现状：
> 1. `web/src/lib/directus.ts` (API 封装)
> 2. `web/src/app/industrial-os/breakdown/[id]/page.tsx` (Module 02 逻辑)
> 
> 接下来的任务是：在不改变现有逻辑的前提下，大幅提升 UI 的视觉美感和交互动效。我们的设计风格是：科技感、专业、极简、高对比度。"

### 2.2 视觉规范约束
为了防止 Claude 生成平庸的 UI，请在每次请求前附加视觉约束：

*   **阴影与层次**：使用 `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05)` 级别的柔和阴影。
*   **圆角**：统一使用 `rounded-xl` (12px) 或 `rounded-2xl` (16px)。
*   **动效**：所有交互必须带有 `transition-all duration-300`。

## 3. Module 01 & 02 的视觉进化指令

### 3.1 打造“呼吸感”的表单 (Module 01)
**Prompt 建议：**
> "请重构 `demand-form.tsx`。我需要表单在弹出时带有 Framer Motion 的 `scale` 和 `opacity` 进场动画。输入框在 Focus 时，边框应有渐变光晕效果。提交按钮在点击后，背景色应有波纹扩散效果，并平滑切换到 Loading 状态。"

### 3.2 强化 C2M 引擎的实时感 (Module 02)
**Prompt 建议：**
> "优化 `breakdown/[id]/page.tsx` 的右侧配置摘要。我希望‘预估总价’的数字在变化时使用 `framer-motion` 实现数字滚动效果。当预算符合性发生变化时，背景色应有平滑的颜色过渡（从浅绿到浅红）。为左侧的物料选择卡片添加一个‘选中’的微动效：选中时卡片轻微放大 2% 并增加外发光。"

## 4. Module 03 & 04 的快速演示实现方案

由于 Module 03 (3D 拼柜) 和 Module 04 (甘特图) 涉及复杂的图形渲染，建议在 Demo 阶段采用“视觉优先”的简化方案：

### 4.1 Module 03: 伪 3D 拼柜可视化
**策略**：不使用复杂的 Three.js，而是使用 CSS 3D Transforms 或 SVG 绘制一个具有透视感的集装箱。

**Prompt 建议：**
> "请为 Module 03 创建一个 `container-viz.tsx` 组件。使用 Tailwind CSS 的 `skew` 和 `rotate` 属性创建一个具有 3D 透视感的长方体（代表集装箱）。内部使用不同颜色的矩形块代表货物。当用户鼠标悬停在货物上时，显示该货物的配载详情（重量、体积）。要求整体风格像 CAD 图纸一样专业。"

### 4.2 Module 04: 极简甘特图对比
**策略**：使用 Tailwind CSS 的进度条堆叠实现，而非引入沉重的图表库。

**Prompt 建议：**
> "请为 Module 04 实现一个时效对比组件。上方展示‘传统模式’的红色进度条，下方展示‘AI 平台’的绿色进度条。使用 Framer Motion 让进度条在页面加载时从左向右平滑伸展。在关键节点（如‘提前开业’）添加闪烁的标注点。"

## 5. 制作完美演示 GIF 的技巧

### 5.1 开启“演示模式”
在代码中添加一个隐藏的快捷键，触发后自动填充表单并执行点击流，方便录制。

**代码片段建议：**
```typescript
// 在页面组件中添加
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'D' && e.ctrlKey) {
      // 自动执行演示逻辑：填充数据 -> 点击提交 -> 切换配置
      runDemoSequence();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 5.2 录制工具推荐
*   **ScreenToGif (Windows)**：支持逐帧编辑，非常适合制作循环演示。
*   **Kap (Mac)**：导出高质量、小体积的 GIF。
*   **录制建议**：窗口比例固定为 16:9，使用 60fps 录制以确保动效丝滑。

## 6. 总结

利用 Claude Sonnet 4.5 进行开发的精髓在于：**给它明确的视觉参考，并要求它使用最现代的 CSS/动画库。** 不要让它只写逻辑，要不断要求它“Make it look more premium and professional”。

祝您的 SourcingOS 项目在视觉上达到顶尖水准！
