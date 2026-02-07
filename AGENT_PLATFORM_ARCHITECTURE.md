# Demand-OS Agent 平台架构文档

## 项目概述

Demand-OS 是一个对标 Accio 的智能体系统，专门为中国产业园提供**海外寻源**和**工厂委托开发**服务。这是一个基于 Next.js 15 + Directus 的 AI Agent 平台，通过对话式界面帮助用户分析 TikTok 爆款产品、匹配工厂产能、生成采购决策。

### 核心特点

1. **自有工厂数据库**：使用产业园自有工厂数据库（而非公开市场数据），提供协议价格和真实产能信息
2. **多场景 Agent 模板**：预置 5+ 个专业 Agent 模板，覆盖海外寻源、委托开发、产能管理等场景
3. **工作流可视化**：基于 React Flow 的可视化编辑器，支持拖拽编辑和实时预览
4. **对话式交互**：流式响应、历史记录、图片上传等完整对话体验
5. **可扩展架构**：预留海关数据、市场趋势数据接口，支持自定义节点和数据源

---

## 技术栈

### 前端
- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **UI 库**：React 19、Tailwind CSS、Shadcn/ui
- **状态管理**：Zustand
- **可视化**：React Flow (工作流编辑器)
- **代码编辑**：Monaco Editor

### 后端
- **API**：Next.js API Routes
- **数据库**：Directus (部署在阿里云)
- **AI 服务**：Nova AI Vision (图片分析)
- **流式响应**：Server-Sent Events (SSE)

### 数据库 (Directus)
- **URL**: https://admin.cnsubscribe.xyz
- **Collections**: 
  - `factories`: 工厂信息
  - `conversations`: 对话历史
  - `image_analyses`: 图片分析记录
  - `demands`: 需求管理
  - `materials`: 原材料数据
  - `markets`: 市场数据
  - `suppliers`: 供应商信息
  - `rfqs`: 询价单

---

## 系统架构

### 1. Agent 工作流引擎

#### 核心组件
```
/web/src/lib/agent-workflow-engine.ts
```

**功能**：
- 定义工作流节点类型（input、datasource、ai、condition、transform、output）
- 执行工作流（拓扑排序、节点执行、结果收集）
- 日志记录和错误处理

**节点类型**：
| 类型 | 说明 | 示例 |
|------|------|------|
| `input` | 用户输入节点 | TikTok URL、产品需求 |
| `datasource` | 数据源查询节点 | Directus、TikTok API、海关数据 |
| `ai` | AI 分析节点 | Nova AI、GPT-4 |
| `condition` | 条件判断节点 | 产能检查、价格筛选 |
| `transform` | 数据转换节点 | 映射、过滤、聚合 |
| `output` | 输出节点 | 采购方案、开发报告 |

#### 执行流程
```
1. 用户输入 → 2. 构建执行图 → 3. 拓扑排序 → 4. 按序执行节点 → 5. 收集输出
```

---

### 2. Agent 模板库

#### 预置模板
```
/web/src/lib/agent-templates.ts
```

**1. 海外寻源 Agent** (`overseas-sourcing`)
- **场景**：分析 TikTok 爆款产品，匹配国内工厂
- **流程**：TikTok 视频分析 → 产品特征提取 → 工厂数据查询 → 智能匹配 → 采购方案
- **节点数**：6 个节点，5 个连接

**2. 工厂委托开发 Agent** (`factory-odm`)
- **场景**：基于产品需求，评估工厂开发能力
- **流程**：需求分析 → 工厂能力查询 → 工厂评估 → 成本估算 → 开发方案
- **节点数**：6 个节点，5 个连接

**3. 产能分析 Agent** (`capacity-analysis`)
- **场景**：分析工厂产能利用率，预测可用产能
- **流程**：工厂数据 + 订单数据 → 产能计算 → 趋势预测 → 产能报告
- **节点数**：6 个节点，6 个连接

**4. 订单匹配 Agent** (`order-matching`)
- **场景**：根据订单需求，智能分配工厂
- **流程**：需求解析 → 可用工厂查询 → 智能匹配 → 产能检查 → 分配方案
- **节点数**：6 个节点，5 个连接

**5. 市场趋势分析 Agent** (`market-trend`)
- **场景**：分析市场趋势，预测爆款产品
- **流程**：TikTok 趋势 + 海关数据 + 市场数据库 → 数据聚合 → 趋势预测 → 趋势报告
- **节点数**：7 个节点，8 个连接

---

### 3. 用户界面

#### 页面结构
```
/web/src/app/
├── layout.tsx              # 全局布局（导航栏）
├── page.tsx                # 首页
├── chat/                   # 对话界面
│   └── page.tsx
├── agents/                 # Agent 市场
│   ├── page.tsx            # Agent 列表
│   └── [id]/
│       ├── page.tsx        # Agent 详情
│       ├── preview/        # 工作流预览
│       └── execute/        # Agent 执行
├── data/                   # 数据管理
│   └── page.tsx
└── settings/               # 设置
    └── page.tsx
```

#### 核心组件
```
/web/src/components/
├── main-header.tsx         # 主导航栏
├── main-nav.tsx            # 导航菜单
├── theme-toggle.tsx        # 主题切换
├── workflow-visualizer.tsx # 工作流可视化
├── conversation-sidebar.tsx # 对话历史
└── image-upload-zone.tsx   # 图片上传
```

---

### 4. API 接口

#### 已实现的 API
| 接口 | 路径 | 功能 |
|------|------|------|
| TikTok 视频分析 | `/api/agent/analyze-tiktok-video` | 提取视频元数据和趋势分数 |
| 工厂匹配 | `/api/agent/match-factories-directus` | 智能匹配工厂并评分 |
| 流式分析 | `/api/agent/stream-analysis` | 实时推送 Agent 执行状态 |
| 对话管理 | `/api/conversations` | CRUD 对话历史 |
| 图片分析 | `/api/agent/analyze-image` | Nova AI Vision 图片分析 |

#### 待实现的 API
- `/api/agent/execute-workflow`: 执行自定义工作流
- `/api/agent/save-workflow`: 保存用户自定义工作流
- `/api/datasources/customs`: 海关数据查询
- `/api/datasources/market-trends`: 市场趋势数据

---

## 核心功能实现状态

### ✅ 已完成 (Phase 1-2)
- [x] TikTok 视频分析 API
- [x] Directus 数据库集成
- [x] 流式响应功能
- [x] 对话历史记录
- [x] 图片上传分析
- [x] 深色模式

### ✅ 已完成 (当前阶段)
- [x] Agent 工作流引擎
- [x] 5 个预置 Agent 模板
- [x] Agent 市场页面
- [x] Agent 详情页面（可视化、代码、节点详情）
- [x] 工作流可视化组件 (React Flow)
- [x] 主导航栏

### 🚧 进行中
- [ ] Agent 执行页面（参数配置、实时执行、结果展示）
- [ ] 工作流编辑器（拖拽编辑、节点库、JSON 同步）
- [ ] 自定义数据源接口

### 📋 待开发
- [ ] 海关数据接入
- [ ] 市场趋势数据接入
- [ ] 用户权限管理
- [ ] 工作流版本控制
- [ ] Agent 性能监控

---

## 数据流设计

### 1. 海外寻源场景
```
用户输入 TikTok URL
    ↓
TikTok API 提取视频元数据
    ↓
Nova AI 分析产品特征（类别、规格、目标市场）
    ↓
Directus 查询工厂数据（按类别、产能筛选）
    ↓
AI 智能匹配（评分、排序）
    ↓
生成采购方案（工厂推荐、价格、交付时间）
```

### 2. 工厂委托开发场景
```
用户输入产品需求（文字/图片）
    ↓
AI 分析需求（规格、技术要求、质量标准）
    ↓
Directus 查询 ODM 工厂（开发能力、案例）
    ↓
AI 评估工厂（质量控制、交付能力）
    ↓
计算开发成本（人工、材料、时间）
    ↓
生成开发方案（工厂推荐、开发周期、成本预算）
```

---

## 扩展性设计

### 1. 自定义数据源
```typescript
// 注册自定义数据源
engine.registerNodeHandler('datasource', new CustomDatasourceHandler({
  customs: async (query) => {
    // 调用海关数据 API
  },
  market_trends: async (query) => {
    // 调用市场趋势 API
  },
}));
```

### 2. 自定义节点类型
```typescript
// 注册自定义节点
engine.registerNodeHandler('custom_node', new CustomNodeHandler());
```

### 3. 工作流模板扩展
```typescript
// 添加新模板
export const customAgent: AgentWorkflow = {
  id: 'custom-agent',
  name: '自定义 Agent',
  // ...
};
```

---

## 部署和运维

### 开发环境
```bash
cd /home/ubuntu/demand-os/web
pnpm install
pnpm run dev
```

### 生产环境
```bash
pnpm run build
pnpm run start
```

### 环境变量
```env
# Directus
DIRECTUS_URL=https://admin.cnsubscribe.xyz
DIRECTUS_TOKEN=PWpQxh--xpot-Kf2amz5Zs6w8a1AyLnX

# Nova AI
NOVA_AI_API_KEY=your_api_key

# Next.js
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 下一步开发计划

### 短期目标 (1-2 周)
1. **Agent 执行页面**
   - 参数配置表单
   - 实时执行状态
   - 结果展示和导出

2. **工作流编辑器基础功能**
   - 节点库（拖拽添加）
   - 连接线编辑
   - JSON 配置同步

3. **数据源接口规范**
   - 定义统一的数据源接口
   - 实现 Mock 数据源（用于测试）

### 中期目标 (2-4 周)
1. **工作流编辑器高级功能**
   - 节点参数配置
   - 条件分支编辑
   - 实时预览

2. **数据源集成**
   - 海关数据 API
   - 市场趋势数据 API
   - 第三方数据源（可选）

3. **用户系统**
   - 登录/注册
   - 工作流保存和分享
   - 权限管理

### 长期目标 (1-3 月)
1. **高级功能**
   - 工作流版本控制
   - A/B 测试
   - 性能监控和优化

2. **数据分析**
   - Agent 使用统计
   - 用户行为分析
   - 工厂匹配效果评估

3. **生态建设**
   - Agent 模板市场
   - 第三方插件系统
   - API 开放平台

---

## 技术债务和优化

### 当前问题
1. ⚠️ Directus 连接存在权限问题（403 Forbidden）
   - 可能原因：阿里云网络延迟、Token 过期
   - 解决方案：检查 Token、配置 CORS、使用代理

2. ⚠️ Phase 3 的功能（搜索、导出）偏离核心定位
   - 解决方案：重构为 Agent 平台功能

3. ⚠️ 缺少错误处理和日志系统
   - 解决方案：集成 Sentry、完善日志记录

### 性能优化
- [ ] React Flow 大规模节点渲染优化
- [ ] Directus 查询缓存
- [ ] 流式响应性能优化
- [ ] 图片上传压缩

### 代码质量
- [ ] 单元测试（Jest + React Testing Library）
- [ ] E2E 测试（Playwright）
- [ ] TypeScript 类型完善
- [ ] 代码规范（ESLint + Prettier）

---

## 参考资料

### 对标产品
- **Accio**: https://www.accio.com/
  - Agent 工作流设计
  - 对话式交互
  - 数据源集成

### 技术文档
- **Next.js 15**: https://nextjs.org/docs
- **React Flow**: https://reactflow.dev/
- **Directus**: https://docs.directus.io/
- **Zustand**: https://zustand-demo.pmnd.rs/

---

## 贡献指南

### 开发流程
1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/xxx`)
3. 提交代码 (`git commit -m 'Add xxx'`)
4. 推送到分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

### 代码规范
- 使用 TypeScript
- 遵循 ESLint 规则
- 组件使用函数式组件 + Hooks
- 文件命名使用 kebab-case

---

**文档版本**: v1.0.0  
**最后更新**: 2026-02-07  
**维护者**: Demand-OS Team
