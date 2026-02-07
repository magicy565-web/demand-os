# Phase 3 开发规划

## 🎯 目标

在 Phase 1 和 Phase 2 的基础上，增强用户体验和数据管理能力，打造完整的 Agent Flow 应用。

---

## 📋 Phase 3 核心功能

### 1. 高级搜索和筛选 ⭐⭐⭐

**优先级**：高  
**预计时间**：3-4天

**功能描述**：
- 多条件组合搜索（产品类别、趋势分数范围、时间范围）
- 实时搜索建议
- 搜索历史记录
- 保存搜索条件为"收藏筛选器"
- 排序功能（按时间、趋势分数、置信度）

**技术实现**：
```typescript
// API 路由
/api/search/conversations
/api/search/factories
/api/search/products

// 前端组件
<AdvancedSearchPanel />
<SearchFilters />
<SavedFilters />
```

**数据库设计**：
```sql
-- saved_filters 表
{
  id: uuid,
  user_id: string,
  name: string,
  filters: json,  // 保存筛选条件
  created_at: timestamp
}
```

---

### 2. 数据导出功能 ⭐⭐⭐

**优先级**：高  
**预计时间**：2-3天

**功能描述**：
- 导出为 PDF 报告（包含图表和分析）
- 导出为 Excel（.xlsx）
- 导出为 CSV（原始数据）
- 批量导出多条记录
- 自定义导出字段
- 邮件发送报告

**技术实现**：
```typescript
// 依赖
pnpm add jspdf jspdf-autotable xlsx

// API 路由
/api/export/pdf
/api/export/excel
/api/export/csv

// 前端组件
<ExportDialog />
<ExportOptions />
```

**导出格式示例**：
- **PDF**: 包含封面、摘要、详细数据、图表
- **Excel**: 多个工作表（对话、工厂、分析结果）
- **CSV**: 单一数据表格

---

### 3. 数据可视化仪表板 ⭐⭐

**优先级**：中  
**预计时间**：3-4天

**功能描述**：
- 趋势分析图表（折线图、柱状图）
- 产品类别分布（饼图）
- 工厂匹配成功率（仪表盘）
- 时间线视图
- 实时数据更新
- 可交互的图表（点击查看详情）

**技术实现**：
```typescript
// 依赖
pnpm add recharts date-fns

// 组件
<DashboardOverview />
<TrendChart />
<CategoryDistribution />
<FactoryMatchRate />
<TimelineView />
```

**API 路由**：
```typescript
/api/analytics/trends
/api/analytics/categories
/api/analytics/factories
/api/analytics/timeline
```

---

### 4. 批量操作 ⭐⭐

**优先级**：中  
**预计时间**：2-3天

**功能描述**：
- 批量删除对话记录
- 批量导出
- 批量标记（已读/未读、重要/普通）
- 批量移动到文件夹
- 全选/反选
- 操作确认对话框

**技术实现**：
```typescript
// API 路由
/api/batch/delete
/api/batch/update
/api/batch/export

// 前端组件
<BatchActionBar />
<SelectionCheckbox />
<BulkConfirmDialog />
```

---

### 5. 用户偏好设置 ⭐

**优先级**：低  
**预计时间**：1-2天

**功能描述**：
- 默认搜索条件
- 默认排序方式
- 通知设置
- 显示设置（每页条数、卡片/列表视图）
- 语言设置
- 时区设置

**技术实现**：
```typescript
// API 路由
/api/user/preferences

// 前端组件
<UserPreferencesDialog />
<NotificationSettings />
<DisplaySettings />
```

**数据库**：使用已有的 `user_preferences` 表

---

### 6. 协作功能 ⭐

**优先级**：低  
**预计时间**：3-4天

**功能描述**：
- 分享对话记录（生成分享链接）
- 评论和注释
- 团队工作区
- 权限管理（查看/编辑/删除）
- 活动日志

**技术实现**：
```typescript
// 新增数据表
shared_conversations
comments
team_workspaces
permissions
activity_logs

// API 路由
/api/share/create
/api/comments
/api/teams
```

---

## 📊 Phase 3 优先级排序

| 功能 | 优先级 | 时间 | 用户价值 | 技术复杂度 |
|------|--------|------|----------|-----------|
| 高级搜索 | ⭐⭐⭐ | 3-4天 | 高 | 中 |
| 数据导出 | ⭐⭐⭐ | 2-3天 | 高 | 中 |
| 数据可视化 | ⭐⭐ | 3-4天 | 中 | 中 |
| 批量操作 | ⭐⭐ | 2-3天 | 中 | 低 |
| 用户偏好 | ⭐ | 1-2天 | 低 | 低 |
| 协作功能 | ⭐ | 3-4天 | 低 | 高 |

**总计**：14-24 天

---

## 🚀 推荐实施顺序

### 第一阶段（核心功能）- 5-7天
1. **高级搜索和筛选** - 提升数据查找效率
2. **数据导出** - 满足报告需求

### 第二阶段（增强体验）- 5-7天
3. **数据可视化仪表板** - 提供数据洞察
4. **批量操作** - 提高操作效率

### 第三阶段（扩展功能）- 4-6天
5. **用户偏好设置** - 个性化体验
6. **协作功能** - 团队协作（可选）

---

## 🛠️ 技术栈

**新增依赖**：
```json
{
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.8.2",
  "xlsx": "^0.18.5",
  "recharts": "^2.12.0",
  "date-fns": "^3.3.1",
  "react-select": "^5.8.0"
}
```

**已有技术**：
- Next.js 15
- React 19
- Directus
- Zustand
- Tailwind CSS

---

## 📈 成功指标

**Phase 3 完成标准**：
- ✅ 用户可以快速找到历史记录（搜索响应 < 500ms）
- ✅ 数据可以导出为 3 种格式（PDF、Excel、CSV）
- ✅ 仪表板实时展示数据趋势
- ✅ 批量操作支持 100+ 条记录
- ✅ 用户偏好持久化保存
- ✅ 所有功能有完整的错误处理

---

## 🔧 开发检查清单

### 高级搜索
- [ ] 搜索 API 实现
- [ ] 多条件筛选组件
- [ ] 实时搜索建议
- [ ] 保存筛选器功能
- [ ] 排序功能
- [ ] 响应式设计

### 数据导出
- [ ] PDF 导出（带图表）
- [ ] Excel 导出（多工作表）
- [ ] CSV 导出
- [ ] 批量导出
- [ ] 自定义字段选择
- [ ] 下载进度提示

### 数据可视化
- [ ] 趋势图表组件
- [ ] 类别分布图
- [ ] 工厂匹配率仪表盘
- [ ] 时间线视图
- [ ] 实时数据更新
- [ ] 图表交互功能

### 批量操作
- [ ] 全选/反选功能
- [ ] 批量删除 API
- [ ] 批量更新 API
- [ ] 确认对话框
- [ ] 操作撤销功能
- [ ] 进度提示

### 用户偏好
- [ ] 偏好设置 API
- [ ] 设置对话框组件
- [ ] 默认值应用
- [ ] 持久化存储
- [ ] 导入/导出设置

### 协作功能（可选）
- [ ] 分享链接生成
- [ ] 评论系统
- [ ] 权限管理
- [ ] 活动日志
- [ ] 团队工作区

---

## 📝 下一步行动

1. **确认优先级**：与团队讨论哪些功能最重要
2. **开始第一阶段**：实现高级搜索和数据导出
3. **持续测试**：每个功能完成后立即测试
4. **收集反馈**：从用户获取使用反馈

---

**创建时间**：2026-02-07  
**状态**：待开始  
**负责人**：开发团队
