# Phase 2 开发计划

**版本**: 1.0  
**日期**: 2026年2月7日  
**状态**: 规划中

---

## 📋 概述

基于 Phase 1 的成功实现，Phase 2 将继续扩展功能，添加更多用户交互特性和数据持久化能力。

**Phase 1 完成情况**:
- ✅ TikTok 视频分析 (1,381 行代码)
- ✅ Directus 数据库集成
- ✅ 流式响应 (SSE)
- ✅ 代码已推送到 GitHub

---

## 🎯 Phase 2 核心功能

### 1️⃣ **对话历史记录**

#### 功能描述
用户可以保存、查看和管理之前的分析记录，支持快速重复分析。

#### 实现方案

**前端部分**:
```typescript
// 使用 localStorage 或 IndexedDB
interface ConversationRecord {
  id: string;
  timestamp: number;
  tiktokUrl: string;
  productName: string;
  category: string;
  result: AnalysisResult;
  notes?: string;
}

// 侧边栏组件
<ConversationSidebar>
  - 历史记录列表
  - 搜索功能
  - 删除/导出功能
  - 时间戳显示
</ConversationSidebar>
```

**后端部分** (可选升级到 web-db-user):
```typescript
// 数据库表结构
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  tiktok_url VARCHAR(500),
  product_name VARCHAR(255),
  category VARCHAR(100),
  result JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

// API 路由
POST /api/conversations - 创建记录
GET /api/conversations - 获取历史
DELETE /api/conversations/:id - 删除记录
```

#### 技术栈
- 前端: localStorage / IndexedDB
- 库: zustand (状态管理)
- UI: shadcn/ui Card + List 组件

#### 完成时间估计
- 前端: 2-3 天
- 后端 (可选): 1-2 天

---

### 2️⃣ **图片上传和分析**

#### 功能描述
用户可以上传产品图片，系统使用 CLIP 或其他视觉识别技术进行分析，支持"以图搜品"功能。

#### 实现方案

**前端部分**:
```typescript
// 文件上传组件
import { useDropzone } from 'react-dropzone';

<ImageUploadZone>
  - 拖拽上传
  - 点击选择
  - 图片预览
  - 进度条显示
  - 支持多图上传
</ImageUploadZone>

// 图片分析结果展示
<ImageAnalysisResult>
  - 识别的产品类别
  - 相似度评分
  - 推荐工厂
  - 定价建议
</ImageAnalysisResult>
```

**后端部分**:
```typescript
// API 路由
POST /api/agent/analyze-image - 上传并分析图片
  - 接收 multipart/form-data
  - 调用 CLIP 或 Vision API
  - 返回识别结果

// 使用 Nova AI 的视觉能力
const response = await fetch('https://once.novai.su/v1/vision/analyze', {
  method: 'POST',
  body: FormData with image,
  headers: {
    'Authorization': `Bearer ${NOVA_AI_API_KEY}`
  }
});
```

#### 技术栈
- 前端: react-dropzone, react-image-gallery
- 后端: multer (文件上传), sharp (图片处理)
- AI: Nova AI Vision API 或 CLIP
- 存储: S3 (使用 manus-upload-file)

#### 完成时间估计
- 前端: 3-4 天
- 后端: 2-3 天

---

### 3️⃣ **深色模式**

#### 功能描述
支持浅色/深色主题切换，改善用户体验，减少眼睛疲劳。

#### 实现方案

**前端部分**:
```typescript
// 使用 next-themes
import { ThemeProvider, useTheme } from 'next-themes';

// 主题切换按钮
<ThemeToggle>
  - 显示当前主题
  - 点击切换主题
  - 保存用户偏好
</ThemeToggle>

// CSS 变量更新
:root {
  --background: light-color;
  --foreground: dark-color;
}

.dark {
  --background: dark-color;
  --foreground: light-color;
}
```

**设计指南**:
```css
/* 浅色模式 */
- 背景: #FFFFFF / oklch(1 0 0)
- 文字: #1a1a1a / oklch(0.15 0.01 265)
- 强调: oklch(0.55 0.25 265) (蓝紫色)

/* 深色模式 */
- 背景: #0f0f1f / oklch(0.12 0.01 265)
- 文字: #e8e8f0 / oklch(0.92 0.005 265)
- 强调: oklch(0.65 0.25 265) (亮蓝紫色)
```

#### 技术栈
- 库: next-themes
- 存储: localStorage
- CSS: CSS 变量 + Tailwind

#### 完成时间估计
- 1-2 天

---

### 4️⃣ **高级搜索和筛选**

#### 功能描述
增强搜索功能，支持多条件筛选、排序和高级查询。

#### 实现方案

**搜索条件**:
```typescript
interface SearchFilters {
  // 产品相关
  productName?: string;
  category?: string;
  trendScore?: [number, number]; // 范围
  
  // 工厂相关
  factoryCountry?: string;
  moqRange?: [number, number];
  certifications?: string[];
  
  // 价格相关
  priceRange?: [number, number];
  
  // 时间相关
  dateRange?: [Date, Date];
}

// 搜索 API
POST /api/search/advanced
  - 接收多条件查询
  - 返回排序结果
  - 支持分页
```

**UI 组件**:
```typescript
<AdvancedSearchPanel>
  - 多条件输入
  - 范围滑块
  - 标签选择
  - 排序选项
  - 结果数量显示
</AdvancedSearchPanel>

<SearchResults>
  - 结果卡片网格
  - 分页控制
  - 结果导出
  - 结果保存
</SearchResults>
```

#### 技术栈
- 前端: react-select, rc-slider, react-paginate
- 后端: Directus 高级查询, Elasticsearch (可选)

#### 完成时间估计
- 2-3 天

---

### 5️⃣ **数据导出和报告生成**

#### 功能描述
用户可以导出分析结果为 PDF、Excel、CSV 等格式，生成专业的商业报告。

#### 实现方案

**导出格式支持**:
```typescript
// PDF 导出
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Excel 导出
import ExcelJS from 'exceljs';

// CSV 导出
import { Parser } from 'json2csv';

// API 路由
POST /api/export/pdf - 生成 PDF 报告
POST /api/export/excel - 生成 Excel 文件
POST /api/export/csv - 生成 CSV 数据
```

**报告内容**:
- 产品分析摘要
- 趋势分析图表
- 工厂匹配列表
- 定价对比表
- ROI 预测
- 建议和洞察

#### 技术栈
- PDF: jsPDF, html2canvas, pdfkit
- Excel: ExcelJS, xlsx
- CSV: json2csv
- 图表: recharts (用于报告中的图表)

#### 完成时间估计
- 2-3 天

---

## 📊 Phase 2 时间表

| 功能 | 优先级 | 工作量 | 预计时间 |
|------|--------|--------|----------|
| 对话历史记录 | 高 | 中 | 3-5 天 |
| 图片上传分析 | 高 | 大 | 5-7 天 |
| 深色模式 | 中 | 小 | 1-2 天 |
| 高级搜索筛选 | 中 | 中 | 2-3 天 |
| 数据导出报告 | 中 | 中 | 2-3 天 |
| **总计** | - | - | **13-20 天** |

---

## 🔧 技术决策

### 数据库升级
**建议**: 升级到 `web-db-user` 功能
- 获得数据库支持 (PostgreSQL)
- 支持用户认证 (Manus OAuth)
- 支持文件存储 (S3)
- 支持后端 API 代理

**升级命令**:
```bash
webdev_add_feature --feature web-db-user
```

### 状态管理
**选择**: Zustand
- 轻量级 (仅 2KB)
- 简单易用
- 支持 TypeScript
- 与 React 18+ 兼容

### 文件上传
**选择**: 使用 Manus 内置 S3 存储
- 自动上传到 CDN
- 无需配置 AWS 凭证
- 返回公开 URL
- 使用 `manus-upload-file` 命令

---

## 🎨 UI/UX 改进

### 1. 响应式设计增强
- 移动端优化 (< 375px)
- 平板端优化 (768px - 1024px)
- 桌面端优化 (> 1024px)

### 2. 无障碍访问 (A11y)
- 完整的 ARIA 标签
- 键盘导航支持
- 屏幕阅读器兼容
- 对比度符合 WCAG AA 标准

### 3. 性能优化
- 代码分割 (Code Splitting)
- 图片懒加载
- 虚拟滚动 (长列表)
- 缓存策略

---

## 📋 开发检查清单

### 前期准备
- [ ] 升级到 web-db-user 功能
- [ ] 设置数据库迁移脚本
- [ ] 配置 S3 存储
- [ ] 更新环境变量

### 开发阶段
- [ ] 功能 1: 对话历史记录
- [ ] 功能 2: 图片上传分析
- [ ] 功能 3: 深色模式
- [ ] 功能 4: 高级搜索
- [ ] 功能 5: 数据导出

### 测试阶段
- [ ] 单元测试 (Jest)
- [ ] 集成测试 (Cypress)
- [ ] 性能测试
- [ ] 无障碍测试

### 部署阶段
- [ ] 代码审查
- [ ] 文档更新
- [ ] 部署到生产环境
- [ ] 监控和日志

---

## 🚀 后续 Phase 3 预告

Phase 3 将专注于 AI 增强和自动化：

1. **AI 驱动的产品推荐**
   - 基于历史数据的智能推荐
   - 个性化工厂匹配
   - 动态定价建议

2. **自动化工作流**
   - 定时任务 (Cron Jobs)
   - 批量分析
   - 自动报告生成

3. **实时协作功能**
   - 多用户工作空间
   - 实时评论和注释
   - 共享分析结果

4. **集成第三方服务**
   - Shopify 集成
   - Alibaba 集成
   - 支付网关 (Stripe)

---

## 📞 技术支持

### 常见问题

**Q: 是否需要立即升级到 web-db-user?**
A: 不需要。可以先用 localStorage 实现对话历史，后续再升级数据库。

**Q: 图片分析的准确率如何?**
A: 取决于使用的 AI 模型。Nova AI Vision API 准确率约 85-90%。

**Q: 深色模式会影响性能吗?**
A: 不会。使用 CSS 变量切换，性能开销极小。

---

## 📝 相关文档

- [Phase 1 实现报告](./PHASE1_IMPLEMENTATION_REPORT.md)
- [API 文档](./API_DOCUMENTATION.md) (待编写)
- [数据库架构](./DATABASE_SCHEMA.md) (待编写)
- [部署指南](./DEPLOYMENT_GUIDE.md) (待编写)

---

**下一步**: 确认 Phase 2 优先级，开始功能开发

**联系**: 提交 GitHub Issue 或 PR 讨论
