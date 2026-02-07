# Phase 2 实现指南

**状态**: 开发中  
**开始日期**: 2026年2月7日  
**目标**: 实现对话历史记录、图片上传分析、深色模式

---

## ✅ 已完成

- ✅ Directus 连接验证
- ✅ 4个核心 Collections 创建（conversations, factories, image_analyses, user_preferences）
- ✅ 环境变量配置（.env.local）
- ✅ API Token 获取方式

---

## 📋 Phase 2 功能实现顺序

### 1️⃣ 对话历史记录（Conversation History）

**优先级**: 🔴 高  
**预计时间**: 3-5 天  
**复杂度**: ⭐⭐⭐

#### 功能需求

用户可以：
- 保存每次 TikTok 分析的结果
- 查看历史分析列表
- 快速重新分析之前的视频
- 添加个人备注
- 删除或存档记录

#### 技术实现

**后端 API** (`/api/agent/conversations`):
```typescript
// GET /api/agent/conversations - 获取用户的对话历史
// POST /api/agent/conversations - 创建新的对话记录
// GET /api/agent/conversations/:id - 获取单条对话
// PUT /api/agent/conversations/:id - 更新对话（备注、状态）
// DELETE /api/agent/conversations/:id - 删除对话
```

**前端组件**:
```
components/
  ├── ConversationSidebar.tsx      # 历史记录侧边栏
  ├── ConversationList.tsx         # 列表显示
  ├── ConversationCard.tsx         # 单条记录卡片
  └── ConversationDetail.tsx       # 详情视图

pages/
  └── conversations/
      ├── page.tsx                 # 历史记录页面
      └── [id].tsx                 # 单条记录详情页
```

**数据库操作**:
```typescript
// Directus SDK 使用示例
import { createDirectus, rest, readItems, createItem } from '@directus/sdk';

const client = createDirectus('https://admin.cnsubscribe.xyz').with(rest());

// 获取用户对话历史
const conversations = await client.request(
  readItems('conversations', {
    filter: {
      user_id: { _eq: userId }
    },
    sort: ['-created_at'],
    limit: 20
  })
);

// 创建新对话记录
const newConversation = await client.request(
  createItem('conversations', {
    user_id: userId,
    tiktok_url: url,
    product_name: name,
    category: category,
    trend_score: score,
    result: analysisResult,
    status: 'published'
  })
);
```

#### 实现步骤

1. **安装依赖**
   ```bash
   pnpm add @directus/sdk
   ```

2. **创建 Directus 客户端**
   ```typescript
   // lib/directus-client.ts
   import { createDirectus, rest } from '@directus/sdk';
   
   export const directusClient = createDirectus(
     process.env.NEXT_PUBLIC_DIRECTUS_URL
   ).with(rest());
   ```

3. **创建 API 路由**
   ```typescript
   // app/api/conversations/route.ts
   export async function GET(request: Request) {
     // 获取用户对话历史
   }
   
   export async function POST(request: Request) {
     // 创建新对话记录
   }
   ```

4. **创建前端组件和页面**

5. **集成到现有流程**
   - 分析完成后自动保存到数据库
   - 在侧边栏显示历史记录

---

### 2️⃣ 图片上传和分析（Image Upload & Analysis）

**优先级**: 🔴 高  
**预计时间**: 5-7 天  
**复杂度**: ⭐⭐⭐⭐

#### 功能需求

用户可以：
- 拖拽或点击上传产品图片
- 系统自动识别产品类别
- 显示识别置信度
- 推荐相似产品和工厂
- 保存分析结果

#### 技术实现

**前端组件**:
```typescript
components/
  ├── ImageUploadZone.tsx          # 拖拽上传区域
  ├── ImagePreview.tsx             # 图片预览
  ├── ImageAnalysisResult.tsx       # 分析结果展示
  └── FactoryRecommendation.tsx     # 工厂推荐
```

**后端 API**:
```typescript
// POST /api/agent/analyze-image
// 接收 multipart/form-data
// 返回识别结果和推荐
```

**使用 Nova AI Vision API**:
```typescript
const response = await fetch('https://once.novai.su/v1/vision/analyze', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${NOVA_AI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_url: uploadedImageUrl,
    task: 'product_classification'
  })
});
```

#### 实现步骤

1. **安装文件上传库**
   ```bash
   pnpm add react-dropzone sharp
   ```

2. **创建图片上传处理**
   - 验证文件类型和大小
   - 上传到 S3 (使用 manus-upload-file)
   - 获取 CDN URL

3. **集成 Vision AI**
   - 调用 Nova AI Vision API
   - 解析识别结果
   - 保存到 image_analyses collection

4. **创建前端 UI**
   - 拖拽上传区域
   - 进度条显示
   - 结果展示

---

### 3️⃣ 深色模式（Dark Mode）

**优先级**: 🟡 中  
**预计时间**: 1-2 天  
**复杂度**: ⭐⭐

#### 功能需求

- 支持浅色/深色/自动主题
- 保存用户偏好设置
- 平滑的主题切换动画
- 所有组件适配深色模式

#### 技术实现

**使用 next-themes**:
```typescript
// lib/theme-provider.tsx
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

**主题切换组件**:
```typescript
// components/ThemeToggle.tsx
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

**CSS 变量更新**:
```css
/* 浅色模式 */
:root {
  --background: #ffffff;
  --foreground: #000000;
}

/* 深色模式 */
.dark {
  --background: #0f0f1f;
  --foreground: #ffffff;
}
```

#### 实现步骤

1. 安装 next-themes
2. 配置 ThemeProvider
3. 创建主题切换组件
4. 更新所有 CSS 变量
5. 测试所有页面的深色模式

---

## 🔧 开发环境设置

### 环境变量 (.env.local)

```env
# Directus
NEXT_PUBLIC_DIRECTUS_URL=https://admin.cnsubscribe.xyz
DIRECTUS_TOKEN=<获取新的token>
DIRECTUS_EMAIL=magic@gmail.com
DIRECTUS_PASSWORD=wysk1214

# Nova AI
NOVA_AI_API_KEY=sk-SqCEqx9Vz5sYgmXOXvjZQBaOPFjjxpfcPPEJHXmPCrLVpBXp
NOVA_AI_API_URL=https://once.novai.su/v1

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=wss://admin.cnsubscribe.xyz/websocket
```

### 依赖安装

```bash
cd /home/ubuntu/demand-os/web

# 安装必要的包
pnpm add @directus/sdk next-themes react-dropzone sharp

# 开发服务器
pnpm dev
```

---

## 📊 开发时间表

| 功能 | 预计时间 | 状态 |
|------|---------|------|
| 对话历史记录 | 3-5 天 | ⏳ 待开始 |
| 图片上传分析 | 5-7 天 | ⏳ 待开始 |
| 深色模式 | 1-2 天 | ⏳ 待开始 |
| 测试和优化 | 2-3 天 | ⏳ 待开始 |
| **总计** | **11-17 天** | - |

---

## 🧪 测试清单

### 对话历史记录
- [ ] 创建新对话记录
- [ ] 查询历史列表
- [ ] 更新备注
- [ ] 删除记录
- [ ] 分页功能
- [ ] 搜索功能

### 图片上传
- [ ] 拖拽上传
- [ ] 点击选择
- [ ] 文件验证
- [ ] 上传进度
- [ ] 错误处理
- [ ] 图片预览

### 深色模式
- [ ] 主题切换
- [ ] 主题持久化
- [ ] 所有页面适配
- [ ] 所有组件适配
- [ ] 平滑过渡

---

## 📝 代码规范

### TypeScript
- 所有函数必须有类型注解
- 使用 interface 定义数据结构
- 避免使用 any

### React
- 使用函数组件
- 合理使用 hooks
- 避免 prop drilling

### 样式
- 使用 Tailwind CSS
- 遵循现有的设计系统
- 响应式设计优先

---

## 🚀 下一步

1. 开始实现对话历史记录功能
2. 创建必要的 API 路由
3. 构建前端组件
4. 集成 Directus 数据库
5. 测试和优化

---

**最后更新**: 2026年2月7日  
**下一个检查点**: Phase 2 第一个功能完成
