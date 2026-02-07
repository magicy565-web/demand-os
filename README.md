# Demand OS - 工业绿洲

> AI 驱动的全球需求实时对接系统 | Global Demand Real-time Docking System

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black)
![Directus](https://img.shields.io/badge/Directus-11.1.1-purple)

## 📋 项目概述

Demand OS 是一个面向全球贸易的智能需求对接平台，通过 AI 技术实时采集、分析和展示全球电商平台的采购需求，帮助供应商精准匹配商业机会。

### 核心特性

- 🌐 **全球需求聚合** - 实时采集 Amazon、阿里巴巴、eBay 等平台数据
- 🤖 **AI 智能分析** - 商业价值评估与需求匹配
- 💬 **对话式工作流生成 (新)** - 对标 Accio，通过自然语言自动生成专业工作流
- 🛠️ **交互式工作流编辑器 (新)** - 拖拽式编辑、节点配置、实时预览
- ⚡ **实时瀑布流** - WebSocket 驱动的动态需求展示
- 🎨 **简约科技感 UI** - 遵循 Demand-OS UI/UX 设计指南的高级视觉体验

## 🏗️ 技术架构

```
┌──────────────────────────────────────────────────────────┐
│                      前端 (Next.js 15)                    │
│  ├── 对话式工作流引擎 (AI-Powered Workflow Engine)          │
│  ├── React Flow 可视化画布                                │
│  ├── Tailwind CSS + 高级 UI/UX 设计指南                    │
│  └── WebSocket 实时订阅                                   │
├──────────────────────────────────────────────────────────┤
│                      后端 (Directus 11)                   │
│  ├── AI 工作流生成 API (/api/agent/generate-from-text)     │
│  ├── RESTful API + GraphQL                               │
│  └── 管理后台                                             │
├──────────────────────────────────────────────────────────┤
│                      数据层 (Docker)                      │
│  ├── PostgreSQL 14 (主数据库)                             │
│  └── Redis 7 (缓存)                                       │
└──────────────────────────────────────────────────────────┘
```

## 🚀 新增核心功能

### 1. 对话式工作流生成 (Conversational Workflow)
对标 Accio 的核心体验，用户只需输入自然语言需求，AI 即可自动生成完整的工作流图。
- **访问入口**: `/chat-to-workflow`
- **技术原理**: LLM 解析语义 -> 动态生成节点/连接 JSON -> React Flow 实时渲染

### 2. 交互式工作流编辑器 (Workflow Editor)
专业级工作流编辑环境，支持深度定制。
- **访问入口**: `/workflow-editor/[id]`
- **功能**: 节点库拖拽、参数配置面板、执行日志查看、JSON 导入导出

### 3. 优化版 Agent 市场
更直观的 Agent 模板浏览与预览。
- **访问入口**: `/agents-v2`
- **功能**: 卡片/列表视图切换、工作流实时预览模态框、模板克隆

## 📁 项目结构与文档

### 文档位置
为了保持项目文件整洁，所有文档已移动到 [`docs/`](./docs/) 文件夹：

- 📚 [**完整文档索引**](./docs/INDEX.md) - 所有文档的分类导航
- 📄 [**对话式生成架构**](./CONVERSATIONAL_WORKFLOW_GENERATION_ARCHITECTURE.md) - 核心 AI 生成逻辑说明
- 📄 [**UI/UX 优化报告**](./PHASE3_UI_UX_IMPLEMENTATION_REPORT.md) - 视觉与交互升级记录

### 项目文件结构

```
Demand-os/
├── web/                          # Next.js 前端
│   ├── src/
│   │   ├── app/                  # App Router 页面
│   │   │   ├── chat-to-workflow/ # 对话式生成页面 (New)
│   │   │   ├── workflow-editor/  # 工作流编辑器 (New)
│   │   │   ├── agents-v2/        # 优化版 Agent 市场 (New)
│   │   │   └── api/agent/        # AI 生成 API (New)
│   │   ├── components/           # React 组件
│   │   │   ├── workflow-editor/  # 编辑器核心组件 (New)
│   │   │   └── ...
│   │   └── lib/                  # 工具库 (Agent 引擎)
```

## ⚙️ 快速开始

### 1. 环境准备
确保已安装 Node.js 20+ 和 pnpm。

### 2. 安装依赖
```bash
cd web && pnpm install
```

### 3. 配置环境变量
在 `web/.env.local` 中添加：
```env
OPENAI_API_KEY=your-api-key
NEXT_PUBLIC_API_URL=http://localhost:8055
```

### 4. 启动开发服务器
```bash
pnpm dev
```
访问 `http://localhost:3000/chat-to-workflow` 开始体验对话式工作流生成。

## 🎨 设计规范
本项目严格遵循 [Demand-OS UI/UX 设计指南](./Demand-OSUI_UX设计指南.md)，追求“简约、科技、高效”的展示风格，专为政府和产业园区演示优化。

## 📄 许可证
MIT License © 2024 Demand OS Team

---

<p align="center">
  <strong>Demand OS - 工业绿洲</strong><br>
  <em>连接全球需求，通过 AI 创造无限商机</em>
</p>
