# Demand-OS: 基于 YSK-0509 的 Agent 升级方案

**版本**: 1.0  
**日期**: 2026-02-07  
**作者**: Manus AI  
**目标**: 将 YSK-0509 仓库中的工厂委托功能，升级为对标 Accio 的 Agent 模式。

---

## 1. YSK-0509 现有实现分析

YSK-0509 是一个基于 Vite + React 的单页面应用，实现了一个**线性的、硬编码的**工厂委托流程。核心特点如下：

### 1.1 核心流程

```
InfoForm (输入产品信息)
    ↓
StateAnalysis (AI 分析市场，展示结果)
    ↓
StateStrategy (展示策略，用户确认)
    ↓
StateDeal (用户填写工厂资质)
    ↓
SuccessState (提交成功)
```

### 1.2 优点

- **UI 组件可复用**: `InfoForm`, `StateAnalysis`, `StateDeal` 等组件的 UI 设计和表单逻辑可以复用。
- **AI 服务可参考**: `aiService.ts` 中的 `getAnalysis` 方法，其 Prompt 和数据结构可以作为 Agent 的基础。
- **数据类型已定义**: `types.ts` 中定义了 `InfoFormData`, `AnalysisData`, `FactoryQualification` 等核心数据类型。

### 1.3 缺点

- **线性流程，非动态**: 流程是硬编码的，无法根据用户输入动态调整。
- **无 Agent 概念**: 只是一个固定的多步骤表单，不是一个可扩展的 Agent 系统。
- **无实时进度**: 加载过程是模拟的，不是真实的后台任务进度。
- **结果呈现单一**: 结果展示是固定的，不够灵活。

---

## 2. Agent 升级方案

我们将把 YSK-0509 的核心逻辑，整合到 Demand-OS 的 Agent 架构中。

### 2.1 创建 `factory-odm-agent`

我们将创建一个新的 Agent，其步骤将映射到 YSK-0509 的现有页面/组件。

```typescript
// file: lib/agents/factory-odm-agent.ts

export const factoryODMAgent: Agent = {
  id: 'factory-odm-agent',
  name: '工厂委托开发助手',
  description: '评估产品生产产能需求，匹配合适的工厂，并生成委托开发方案。',
  triggers: ['工厂', '委托开发', '生产', '产能', 'ODM'],
  
  planner: async (prompt: string, context: any): Promise<Step[]> => {
    // YSK-0509 的流程是固定的，所以 planner 暂时返回固定步骤
    return [
      {
        id: 'step1_collect_info',
        name: '收集产品信息',
        description: '需要您提供产品的基本信息',
        action: collectProductInfo, // 这个 action 会在前端触发 InfoForm
      },
      {
        id: 'step2_analyze_market',
        name: '市场分析',
        description: 'AI 正在分析市场潜力...',
        action: analyzeMarket, // 复用 aiService.getAnalysis
      },
      {
        id: 'step3_define_strategy',
        name: '定义合作策略',
        description: '请确认合作策略',
        action: defineStrategy, // 对应 StateStrategy
      },
      {
        id: 'step4_qualify_factory',
        name: '工厂资质审核',
        description: '请提供工厂的详细资质',
        action: qualifyFactory, // 对应 StateDeal
      },
      {
        id: 'step5_submit_application',
        name: '提交申请',
        description: '正在提交您的申请...',
        action: submitApplication, // 复用 aiService.submitApplication
      },
    ];
  },
};
```

### 2.2 改造交互模式

我们将抛弃 YSK-0509 的多页面跳转模式，改为在**单一的聊天界面**中，通过**对话和嵌入式组件**来完成整个流程。

**交互流程示例**:

```
系统: "您好！我是工厂委托开发助手。请告诉我您想开发的产品。"

用户: "我想开发一款智能蓝牙音箱"

系统: "好的，为了更好地评估，请填写以下产品信息："
      (在聊天界面中嵌入 <InfoForm /> 组件)

[用户填写表单并提交]

系统: "感谢您提供信息！AI 正在为您分析市场潜力..."
      (显示 ExecutionPlanCard，'市场分析' 步骤为 running)

[分析完成后]

系统: "分析完成！这是您的市场分析报告："
      (在聊天界面中嵌入 <StateAnalysis /> 组件)
      "请确认分析结果，如果没问题，我们将继续定义合作策略。"

用户: "确认"

系统: "好的，这是我们建议的合作策略："
      (在聊天界面中嵌入 <StateStrategy /> 组件)
      "请确认策略。"

...
```

### 2.3 复用与改造

| YSK-0509 组件/服务 | 复用方式 | 改造点 |
| :--- | :--- | :--- |
| `InfoForm` | **复用** | 改造为在聊天界面中嵌入，`onSubmit` 调用 Agent API |
| `StateAnalysis` | **复用** | 改造为接收 `AnalysisData` props，在聊天界面中渲染 |
| `StateStrategy` | **复用** | 改造为在聊天界面中渲染，`onApprove` 触发下一步 |
| `StateDeal` | **复用** | 改造为在聊天界面中嵌入，`onApprove` 提交工厂资质 |
| `aiService.getAnalysis` | **复用** | 作为 `step2_analyze_market` 的 `action` 实现 |
| `aiService.submitApplication` | **复用** | 作为 `step5_submit_application` 的 `action` 实现 |
| `types.ts` | **合并** | 将 YSK-0509 的类型定义合并到 Demand-OS 的 `types.ts` 中 |

### 2.4 Directus 后端整合

- **Agent 模板**: `factory-odm-agent` 的定义将存储在 Directus 的 `agents` Collection 中。
- **任务记录**: 每次用户发起对话，都会在 `tasks` 和 `task_steps` 中创建记录。
- **结果存储**: `StateAnalysis` 的结果、`StateDeal` 的表单数据，都将作为对应步骤的 `result` 存储在 `task_steps` 中。

---

## 3. 实施计划

1.  **代码迁移与合并**
    - 将 YSK-0509 的 `components`, `services`, `types.ts` 迁移到 Demand-OS 项目中。
    - 解决依赖和路径问题。

2.  **创建 `factory-odm-agent`**
    - 在 `lib/agents` 目录下创建 `factory-odm-agent.ts`。
    - 实现 `planner` 和每个 `step` 的 `action` 函数（复用 `aiService`）。

3.  **改造前端交互**
    - 创建一个新的聊天页面 `/factory-odm`。
    - 实现一个 `StepRenderer` 组件，根据当前步骤的类型，动态渲染不同的组件（如 `InfoForm`, `StateAnalysis`）。

4.  **整合后端 API**
    - 确保 `/api/agent/start` 和 WebSocket API 能够正确处理 `factory-odm-agent` 的执行流程。
    - 将 `aiService` 的 API 调用指向真实的 Directus 后端。

---

## 4. 总结

通过这个方案，我们可以最大限度地复用 YSK-0509 的现有成果，同时将其升级为真正对标 Accio 的、动态的、可扩展的 Agent 模式。

**核心改变**: 从**多页面、线性流程**，升级为**单页面、对话式、动态嵌入组件**的交互模式。

这将为用户带来更流畅、更智能的体验，也为未来扩展更多 Agent 打下坚实的基础。
