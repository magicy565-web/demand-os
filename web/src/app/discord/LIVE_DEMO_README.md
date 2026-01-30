# Discord 实时演示功能

## 概述

为 Discord 页面添加了全新的实时演示系统，可以自动模拟用户和 AI 助手之间的真实对话场景。

## 新增功能

### 1. **实时打字效果**
- 模拟真实的打字动画
- 可配置打字速度和时长
- 显示"正在输入..."状态指示器

### 2. **实时消息流**
- 自动化的消息序列播放
- 可配置消息延迟时间
- 支持文本、Embed 卡片、表情反应等多种消息类型

### 3. **演示控制面板**
- 开始/暂停演示
- 重置并切换到下一个场景
- 实时显示演示进度
- 演示状态指示器

### 4. **多场景支持**
内置三个预设演示场景：
- **TikTok 产品询价** - 演示如何通过 TikTok 链接快速获取产品报价
- **快速 RFQ 询价** - 演示 RFQ 需求提交和供应商匹配流程
- **市场趋势分析** - 演示 AI 提供的市场洞察和数据分析

## 文件结构

```
web/src/
├── app/discord/
│   └── page.tsx                          # Discord 主页（已更新）
├── components/discord/
│   ├── ChatArea.tsx                      # 聊天区域（已更新）
│   ├── LiveDemoController.tsx            # 实时演示控制器（新增）
│   └── index.ts                          # 组件导出（已更新）
└── lib/
    └── liveDemoData.ts                   # 演示数据和场景配置（新增）
```

## 使用方法

### 访问演示页面

访问 `/discord` 路由即可看到实时演示功能。

### 控制演示

1. **开始演示** - 点击右下角控制面板的"开始演示"按钮
2. **暂停演示** - 在演示过程中点击"暂停"按钮
3. **重置/切换场景** - 点击"重置"按钮会停止当前演示并切换到下一个场景

### 自定义演示场景

编辑 `src/lib/liveDemoData.ts` 文件来添加新的演示场景：

```typescript
const newScenario: DemoScenario = {
  id: "custom-scenario",
  name: "自定义场景",
  description: "场景描述",
  messages: [
    {
      id: "msg-1",
      user: { name: "用户名", avatar: "/path/to/avatar.png" },
      content: "消息内容",
      delay: 1000,              // 发送前等待时间（毫秒）
      typingDuration: 2000,     // 打字效果时长（毫秒）
    },
    // ... 更多消息
  ],
};
```

### 消息配置选项

每个消息支持以下配置：

- `id` - 消息唯一标识符
- `user` - 用户信息（名称、头像、是否为 Bot）
- `content` - 消息文本内容
- `timestamp` - 时间戳（可选，默认使用当前时间）
- `embed` - Embed 卡片数据（可选）
- `reactions` - 表情反应（可选）
- `delay` - 发送延迟，单位毫秒（可选，默认 1000）
- `typingDuration` - 打字效果时长，单位毫秒（可选，0 表示无打字效果）

### Embed 卡片配置

```typescript
embed: {
  type: "quote" | "info" | "success" | "error",
  title: "卡片标题",
  description: "描述文本（可选）",
  fields: [
    { 
      name: "字段名", 
      value: "字段值", 
      inline: true/false 
    }
  ],
  footer: "页脚文本（可选）",
  color: "#HEX颜色代码",
}
```

## 技术实现

### 核心技术栈
- **React** - 组件化开发
- **TypeScript** - 类型安全
- **Framer Motion** - 动画效果
- **Next.js 14** - 应用框架

### 关键特性
- 使用 `useEffect` 和 `setTimeout` 实现定时消息发送
- 使用 `setInterval` 实现逐字打字效果
- 使用 Framer Motion 实现流畅的进入/退出动画
- 完全响应式设计，适配各种屏幕尺寸

## 演示效果

### 打字效果
消息会逐字显示，并在光标位置显示闪烁的打字指示器。

### 动画效果
- Embed 卡片以淡入 + 向上滑动的方式出现
- 表情反应以缩放动画的方式出现
- 控制面板支持展开/收起动画

### 用户体验
- 模拟真实的对话节奏
- 视觉反馈清晰
- 可以随时暂停和重置
- 多场景自动轮播

## 最佳实践

1. **消息延迟**：建议设置为 1-3 秒，模拟真实对话节奏
2. **打字时长**：根据消息长度设置，短消息 1-2 秒，长消息 2-4 秒
3. **场景设计**：每个场景 5-8 条消息为宜，展示完整的交互流程
4. **内容质量**：使用真实、有价值的示例数据，突出产品特点

## 未来扩展

可以考虑添加：
- 更多演示场景
- 语音通话演示
- 屏幕共享演示
- 自定义场景编辑器
- 演示数据从后端加载
- 用户互动式演示（允许用户中途参与）

## 相关资源

- [Framer Motion 文档](https://www.framer.com/motion/)
- [Next.js 文档](https://nextjs.org/docs)
- [Discord Design Guidelines](https://discord.com/branding)
