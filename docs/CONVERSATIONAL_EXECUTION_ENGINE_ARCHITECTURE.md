# Demand-OS: 对话式执行引擎架构

**版本**: 1.0  
**日期**: 2026-02-07  
**作者**: Manus AI

---

## 1. 概述

本文档旨在设计一个**对话式执行引擎**。该引擎的核心目标是**引导用户**通过一系列预定义的步骤完成一个复杂任务，整个过程以**聊天对话**的形式进行。这与之前“生成工作流图”的方案完全不同，它是一个**状态机驱动的对话系统**。

### 核心理念

- **用户不可见工作流**: 工作流（例如“海外寻源”）在后端定义，用户只通过对话与系统交互，看不到任何流程图。
- **状态驱动**: 系统始终追踪当前对话处于哪个工作流的哪个步骤，并知道下一步需要什么信息。
- **一问一答**: 交互模式是“系统提问 -> 用户回答 -> 系统执行 -> 系统提问下一个问题”。

### 示例对话流程

```
系统: 您好！欢迎使用 Demand-OS。请选择您需要启动的服务：
      [海外寻源] [工厂委托开发]

用户: (点击 [海外寻源])

系统: (启动“海外寻源”工作流，进入步骤 1)
      好的，我们开始海外寻源。第一步，请提供您想分析的 TikTok 视频链接。

用户: https://tiktok.com/xxx

系统: (执行步骤 1: 分析视频) 正在分析... 
      (执行完毕，进入步骤 2)
      分析完成！这是一个美妆产品视频，市场潜力评级为“高”。
      接下来，我将为您提取产品关键信息。请确认是否继续？

用户: 继续

系统: (执行步骤 2: 提取信息) 正在提取...
      (执行完毕，进入步骤 3)
      已提取产品信息：口红，色号 #FF006E。现在我将为您匹配合适的工厂。是否开始匹配？

用户: 是

系统: (执行步骤 3: 匹配工厂) ...
```

---

## 2. 状态机与工作流定义

后端需要定义结构化的工作流模板，这些模板就是状态机的“图纸”。

### 工作流模板 (`workflow-templates.ts`)

我们将用 TypeScript 定义一个工作流模板的结构。

```typescript
// 定义单个步骤的结构
interface WorkflowStep {
  id: string; // 步骤 ID, e.g., "step1_analyze_video"
  type: 'user_input' | 'system_action'; // 步骤类型
  message: string; // 系统向用户展示的消息/问题
  inputKey?: string; // 如果是 user_input，用户输入存储在上下文的哪个字段
  action?: (context: any) => Promise<any>; // 如果是 system_action，要执行的后台函数
  transitions: {
    target: string; // 下一个步骤的 ID
    condition?: (context: any) => boolean; // 跳转条件，用于分支
  }[];
}

// 定义整个工作流的结构
interface WorkflowTemplate {
  id: string; // 工作流 ID, e.g., "overseas-sourcing"
  name: string; // 工作流名称
  initialStep: string; // 起始步骤的 ID
  steps: Record<string, WorkflowStep>; // 所有步骤的集合
}
```

### 示例：海外寻源工作流

```typescript
const overseasSourcingWorkflow: WorkflowTemplate = {
  id: 'overseas-sourcing',
  name: '海外寻源',
  initialStep: 'step1_prompt_for_url',
  steps: {
    'step1_prompt_for_url': {
      id: 'step1_prompt_for_url',
      type: 'user_input',
      message: '好的，我们开始海外寻源。第一步，请提供您想分析的 TikTok 视频链接。',
      inputKey: 'tiktok_url',
      transitions: [{ target: 'step2_analyze_video' }]
    },
    'step2_analyze_video': {
      id: 'step2_analyze_video',
      type: 'system_action',
      message: '正在分析视频...',
      action: async (context) => {
        // 调用 AI 分析视频 context.tiktok_url
        const analysisResult = await ai.analyzeVideo(context.tiktok_url);
        return { analysisResult };
      },
      transitions: [{ target: 'step3_confirm_product_extraction' }]
    },
    'step3_confirm_product_extraction': {
      id: 'step3_confirm_product_extraction',
      type: 'user_input',
      message: '分析完成！市场潜力评级为“{{analysisResult.rating}}”。\n接下来，我将为您提取产品关键信息。请确认是否继续？',
      inputKey: 'confirmation',
      transitions: [
        { target: 'step4_extract_product_info', condition: (ctx) => ctx.confirmation === '是' },
        { target: 'end_flow_cancelled', condition: (ctx) => ctx.confirmation !== '是' }
      ]
    },
    // ... more steps
  }
};
```

---

## 3. API 设计

我们需要一个 API 端点来处理整个对话流程。

### `POST /api/chat/converse`

这个 API 将处理用户的每一次回复，并返回系统的下一个响应。

#### 请求体 (Request Body)

```json
{
  "sessionId": "user-session-12345",
  "userInput": "https://tiktok.com/xxx" // 用户本次的输入
}
```

| 字段 | 类型 | 描述 | 是否必须 |
| :--- | :--- | :--- | :--- |
| `sessionId` | `string` | 唯一会话 ID，用于在后端缓存中存取对话状态。 | 是 |
| `userInput` | `string` | 用户的回复内容。对于初次请求，可以为空。 | 否 |

#### 对话状态 (Session State)

后端需要一个缓存（如 Redis）来存储每个 `sessionId` 的当前状态。

```json
{
  "currentWorkflowId": "overseas-sourcing",
  "currentStepId": "step1_prompt_for_url",
  "context": {
    "tiktok_url": null, // 等待用户输入
    "analysisResult": null
  }
}
```

#### 响应体 (Response Body)

API 返回系统的下一条消息和一些前端需要的状态。

```json
{
  "sessionId": "user-session-12345",
  "systemMessage": "好的，我们开始海外寻源。第一步，请提供您想分析的 TikTok 视频链接。",
  "isWaitingForInput": true, // 前端是否需要显示输入框
  "isCompleted": false // 对话是否结束
}
```

---

## 4. 后端执行逻辑

`converse` API 的核心逻辑如下：

1.  **获取会话状态**: 根据 `sessionId` 从缓存中读取当前状态。如果是新会话，则初始化状态。
2.  **处理用户输入**: 如果 `userInput` 存在，将其更新到会话状态的 `context` 中。
3.  **执行当前步骤**:
    -   找到当前工作流 (`currentWorkflowId`) 和当前步骤 (`currentStepId`)。
    -   如果当前步骤是 `system_action`，执行其 `action` 函数，并将结果更新到 `context`。
4.  **确定下一个步骤**:
    -   根据当前步骤的 `transitions` 和 `context`，确定下一个步骤的 `target`。
    -   更新会话状态中的 `currentStepId`。
5.  **准备系统响应**:
    -   获取新步骤的 `message`，并用 `context` 中的数据进行模板替换。
    -   判断新步骤是否需要用户输入 (`isWaitingForInput`)。
6.  **保存会话状态**: 将更新后的状态写回缓存。
7.  **返回响应**: 将 `systemMessage` 等信息返回给前端。

---

## 5. 前端交互设计

前端需要实现一个经典的聊天界面。

- **消息列表**: 显示用户和系统之间的对话历史。
- **输入区域**: 当 `isWaitingForInput` 为 `true` 时，显示一个文本输入框和发送按钮。
- **加载指示**: 当系统正在执行 `system_action` 时，显示“正在处理...”或类似的加载提示。
- **会话管理**: 前端生成一个 `sessionId` 并在整个对话过程中保持不变。

---

## 6. 实施计划

| 阶段 | 核心任务 | 涉及文件 | 预计时间 |
| :--- | :--- | :--- | :--- |
| **1. 架构设计** | - 编写本文档，明确状态机、API 和数据结构。 | `docs/CONVERSATIONAL_EXECUTION_ENGINE_ARCHITECTURE.md` | 1 天 |
| **2. 后端实现** | - 定义工作流模板结构和“海外寻源”模板。<br>- 创建 `/api/chat/converse` API。<br>- 实现状态机执行逻辑和会话管理。 | `lib/workflow-templates.ts`<br>`app/api/chat/converse/route.ts` | 2-3 天 |
| **3. 前端开发** | - 创建一个新的聊天页面。<br>- 实现消息展示、输入处理、API 调用和加载状态。 | `app/chat/page.tsx`<br>`components/chat-message.tsx` | 2-3 天 |
| **4. 整合测试** | - 进行端到端测试，模拟完整的“海外寻源”对话流程。<br>- 优化对话的流畅性和用户体验。 | - | 1-2 天 |

**总计**: 约 6-9 天。
