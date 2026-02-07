# Demand-OS UI/UX 设计指南

## 项目概述

**项目名称**: Demand-OS  
**定位**: 对标 Accio 的 AI Agent 平台，专注于中国产业园的海外寻源和工厂委托开发  
**设计理念**: 专业、高效、数据驱动、现代化  
**目标用户**: 产业园管理者、工厂老板、海外采购商、供应链专家

---

## 设计哲学

### 核心原则

1. **专业性优先** (Professionalism First)
   - 面向 B2B 企业用户，避免过度装饰
   - 使用克制的配色和简洁的布局
   - 强调数据和信息的清晰呈现

2. **效率至上** (Efficiency Driven)
   - 减少操作步骤，优化关键路径
   - 提供快捷操作和批量处理
   - 智能默认值和自动填充

3. **数据可视化** (Data Visualization)
   - 用图表代替文字描述
   - 实时更新和动态反馈
   - 多维度数据对比

4. **渐进式披露** (Progressive Disclosure)
   - 默认显示核心信息
   - 高级功能折叠或隐藏
   - 根据用户角色调整界面

---

## 视觉设计系统

### 配色方案

#### 主色调 (Primary Colors)
```css
/* 深蓝色 - 专业、信任、科技 */
--primary: 217 91% 60%;           /* #3B82F6 - 主要操作按钮 */
--primary-foreground: 0 0% 100%;  /* #FFFFFF - 按钮文字 */

/* 深色背景 - 沉稳、高端 */
--background: 222 47% 11%;        /* #0F1729 - 页面背景 */
--foreground: 213 31% 91%;        /* #E2E8F0 - 主要文字 */
```

#### 辅助色 (Secondary Colors)
```css
/* 灰色系 - 层次和分隔 */
--muted: 217 33% 17%;             /* #1E293B - 次要背景 */
--muted-foreground: 215 20% 65%;  /* #94A3B8 - 次要文字 */

--card: 222 47% 15%;              /* #1A2332 - 卡片背景 */
--border: 217 33% 20%;            /* #334155 - 边框 */
```

#### 功能色 (Functional Colors)
```css
/* 成功 - 绿色 */
--success: 142 76% 36%;           /* #10B981 */

/* 警告 - 黄色 */
--warning: 38 92% 50%;            /* #F59E0B */

/* 错误 - 红色 */
--destructive: 0 84% 60%;         /* #EF4444 */

/* 信息 - 蓝色 */
--info: 199 89% 48%;              /* #0EA5E9 */
```

#### 数据可视化色板
```css
/* 用于图表和数据展示 */
--chart-1: 217 91% 60%;  /* 蓝色 */
--chart-2: 142 76% 36%;  /* 绿色 */
--chart-3: 38 92% 50%;   /* 黄色 */
--chart-4: 280 89% 60%;  /* 紫色 */
--chart-5: 340 82% 52%;  /* 红色 */
```

### 配色使用规范

| 场景 | 颜色 | 示例 |
|------|------|------|
| 主要操作 | Primary | 执行 Agent、保存工作流 |
| 次要操作 | Muted | 取消、返回 |
| 危险操作 | Destructive | 删除、重置 |
| 成功状态 | Success | 执行成功、保存完成 |
| 警告提示 | Warning | 数据不完整、权限不足 |
| 错误提示 | Destructive | 执行失败、网络错误 |

---

## 字体系统

### 字体家族

#### 中文字体
```css
--font-noto-serif-sc: 'Noto Serif SC', serif;
```
- **用途**: 标题、重要信息
- **权重**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **特点**: 优雅、专业、易读

#### 英文字体
```css
--font-inter: 'Inter', sans-serif;
```
- **用途**: 正文、数据、代码
- **权重**: 400-700
- **特点**: 现代、清晰、等宽数字

#### 装饰字体
```css
--font-playfair: 'Playfair Display', serif;
```
- **用途**: Logo、特殊标题
- **权重**: 400, 500, 600
- **特点**: 优雅、高端

### 字体层级

| 级别 | 大小 | 权重 | 行高 | 用途 |
|------|------|------|------|------|
| H1 | 2.25rem (36px) | 700 | 1.2 | 页面主标题 |
| H2 | 1.875rem (30px) | 600 | 1.3 | 区块标题 |
| H3 | 1.5rem (24px) | 600 | 1.4 | 卡片标题 |
| H4 | 1.25rem (20px) | 500 | 1.5 | 小节标题 |
| Body | 1rem (16px) | 400 | 1.6 | 正文 |
| Small | 0.875rem (14px) | 400 | 1.5 | 辅助文字 |
| Tiny | 0.75rem (12px) | 400 | 1.4 | 标签、时间戳 |

### 字体使用规范

```tsx
// 标题
<h1 className="text-3xl font-bold font-noto-serif-sc">海外寻源 Agent</h1>

// 正文
<p className="text-base font-inter">分析 TikTok 爆款产品...</p>

// 数据
<span className="text-2xl font-bold font-mono">¥12,345</span>

// 辅助信息
<span className="text-sm text-muted-foreground">2 小时前</span>
```

---

## 间距系统

### Tailwind 间距标准

```css
/* 基础单位: 0.25rem (4px) */
spacing: {
  0: '0px',
  1: '0.25rem',   /* 4px */
  2: '0.5rem',    /* 8px */
  3: '0.75rem',   /* 12px */
  4: '1rem',      /* 16px */
  6: '1.5rem',    /* 24px */
  8: '2rem',      /* 32px */
  12: '3rem',     /* 48px */
  16: '4rem',     /* 64px */
}
```

### 间距使用规范

| 场景 | 间距 | 示例 |
|------|------|------|
| 组件内元素 | 2-4 (8-16px) | 按钮图标和文字 |
| 卡片内边距 | 4-6 (16-24px) | Card padding |
| 区块间距 | 6-8 (24-32px) | 卡片之间 |
| 页面边距 | 8-12 (32-48px) | Container padding |
| 大区块间距 | 12-16 (48-64px) | 页面区块 |

---

## 组件设计规范

### 1. 按钮 (Button)

#### 尺寸规范
```tsx
// 默认 (default)
<Button>执行 Agent</Button>
// height: 40px, padding: 16px 24px, text: 16px

// 小号 (sm)
<Button size="sm">预览</Button>
// height: 32px, padding: 12px 16px, text: 14px

// 大号 (lg)
<Button size="lg">开始执行</Button>
// height: 48px, padding: 20px 32px, text: 18px

// 图标按钮
<Button size="icon"><Settings /></Button>
// width: 40px, height: 40px
```

#### 变体规范
```tsx
// 主要按钮 (default)
<Button variant="default">执行</Button>
// bg: primary, text: white, hover: darker

// 次要按钮 (outline)
<Button variant="outline">取消</Button>
// bg: transparent, border: border, hover: muted

// 危险按钮 (destructive)
<Button variant="destructive">删除</Button>
// bg: destructive, text: white

// 幽灵按钮 (ghost)
<Button variant="ghost">返回</Button>
// bg: transparent, hover: muted

// 链接按钮 (link)
<Button variant="link">了解更多</Button>
// bg: transparent, text: primary, underline
```

#### 状态规范
```tsx
// 加载中
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  执行中...
</Button>

// 禁用
<Button disabled>已禁用</Button>
// opacity: 0.5, cursor: not-allowed
```

---

### 2. 卡片 (Card)

#### 基础结构
```tsx
<Card>
  <CardHeader>
    <CardTitle>海外寻源 Agent</CardTitle>
    <CardDescription>分析 TikTok 爆款产品</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 内容 */}
  </CardContent>
  <CardFooter>
    {/* 操作按钮 */}
  </CardFooter>
</Card>
```

#### 样式规范
```css
/* 卡片背景 */
background: var(--card);

/* 边框 */
border: 1px solid var(--border);
border-radius: 0.5rem; /* 8px */

/* 阴影 */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Hover 效果 */
transition: box-shadow 0.2s;
&:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 内边距 */
padding: 1.5rem; /* 24px */
```

---

### 3. 输入框 (Input)

#### 基础样式
```tsx
<Input 
  type="text" 
  placeholder="请输入 TikTok URL"
/>
```

#### 样式规范
```css
/* 基础样式 */
height: 40px;
padding: 0 12px;
border: 1px solid var(--border);
border-radius: 0.375rem; /* 6px */
background: var(--background);

/* Focus 状态 */
&:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Error 状态 */
&.error {
  border-color: var(--destructive);
}

/* Disabled 状态 */
&:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### 配合 Label 使用
```tsx
<div className="space-y-2">
  <Label htmlFor="url">TikTok URL</Label>
  <Input id="url" placeholder="https://..." />
</div>
```

---

### 4. 标签 (Badge)

#### 变体规范
```tsx
// 默认
<Badge>海外寻源</Badge>

// Outline
<Badge variant="outline">委托开发</Badge>

// 次要
<Badge variant="secondary">运行中</Badge>

// 危险
<Badge variant="destructive">失败</Badge>

// 成功 (自定义)
<Badge className="bg-green-500">成功</Badge>
```

#### 样式规范
```css
/* 基础样式 */
display: inline-flex;
align-items: center;
padding: 0.25rem 0.75rem; /* 4px 12px */
font-size: 0.75rem; /* 12px */
font-weight: 500;
border-radius: 9999px; /* 完全圆角 */

/* 带图标 */
<Badge>
  <CheckCircle2 className="w-3 h-3 mr-1" />
  成功
</Badge>
```

---

### 5. 进度条 (Progress)

#### 基础用法
```tsx
<Progress value={75} />
```

#### 样式规范
```css
/* 容器 */
height: 8px;
background: var(--muted);
border-radius: 9999px;
overflow: hidden;

/* 进度指示器 */
background: var(--primary);
transition: width 0.3s ease;

/* 带百分比 */
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>执行进度</span>
    <span>75%</span>
  </div>
  <Progress value={75} />
</div>
```

---

### 6. 标签页 (Tabs)

#### 基础结构
```tsx
<Tabs defaultValue="visual">
  <TabsList>
    <TabsTrigger value="visual">可视化</TabsTrigger>
    <TabsTrigger value="code">代码</TabsTrigger>
    <TabsTrigger value="nodes">节点详情</TabsTrigger>
  </TabsList>
  <TabsContent value="visual">
    {/* 内容 */}
  </TabsContent>
</Tabs>
```

#### 样式规范
```css
/* TabsList */
background: var(--muted);
padding: 0.25rem;
border-radius: 0.5rem;

/* TabsTrigger */
padding: 0.5rem 1rem;
border-radius: 0.375rem;
transition: all 0.2s;

/* Active 状态 */
&[data-state="active"] {
  background: var(--background);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

---

## 布局规范

### 1. 容器 (Container)

#### 响应式宽度
```css
/* 自定义 container */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem; /* 16px */
}

/* 断点 */
@media (min-width: 640px) {  /* sm */
  .container { max-width: 640px; }
}
@media (min-width: 768px) {  /* md */
  .container { max-width: 768px; }
}
@media (min-width: 1024px) { /* lg */
  .container { max-width: 1024px; }
}
@media (min-width: 1280px) { /* xl */
  .container { max-width: 1280px; }
}
@media (min-width: 1536px) { /* 2xl */
  .container { max-width: 1536px; }
}
```

---

### 2. 网格布局 (Grid)

#### Agent 市场网格
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Agent 卡片 */}
</div>
```

#### 两栏布局
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div>{/* 左侧 */}</div>
  <div>{/* 右侧 */}</div>
</div>
```

---

### 3. 导航栏 (Header)

#### 结构
```tsx
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
  <div className="container flex h-16 items-center justify-between">
    <Logo />
    <Nav />
    <Actions />
  </div>
</header>
```

#### 样式规范
```css
/* 固定在顶部 */
position: sticky;
top: 0;
z-index: 50;

/* 毛玻璃效果 */
background: rgba(15, 23, 41, 0.95);
backdrop-filter: blur(8px);

/* 边框 */
border-bottom: 1px solid var(--border);

/* 高度 */
height: 4rem; /* 64px */
```

---

## 交互设计规范

### 1. 动画和过渡

#### 过渡时长
```css
/* 快速 - 按钮、链接 */
transition-duration: 150ms;

/* 标准 - 卡片、弹窗 */
transition-duration: 200ms;

/* 慢速 - 页面切换 */
transition-duration: 300ms;
```

#### 缓动函数
```css
/* 标准 */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* 进入 */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* 退出 */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
```

#### 常用动画
```tsx
// Hover 效果
<Button className="hover:scale-105 transition-transform">
  执行
</Button>

// 淡入
<div className="animate-in fade-in duration-200">
  内容
</div>

// 滑入
<div className="animate-in slide-in-from-bottom duration-300">
  内容
</div>

// 加载动画
<Loader2 className="animate-spin" />
```

---

### 2. 反馈机制

#### 加载状态
```tsx
// 按钮加载
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  执行中...
</Button>

// 页面加载
<div className="flex items-center justify-center h-64">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</div>

// 骨架屏
<div className="space-y-2">
  <div className="h-4 bg-muted rounded animate-pulse" />
  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
</div>
```

#### 成功/错误提示
```tsx
// Toast 通知
import { toast } from 'sonner';

toast.success('执行成功！');
toast.error('执行失败，请重试');
toast.warning('数据不完整');
toast.info('正在处理...');
```

#### 空状态
```tsx
<Card>
  <CardContent className="py-12 text-center text-muted-foreground">
    <p>没有找到匹配的 Agent 模板</p>
    <p className="text-sm mt-2">尝试调整搜索条件或筛选类别</p>
  </CardContent>
</Card>
```

---

### 3. 响应式设计

#### 断点规范
```css
/* Mobile First */
/* xs: < 640px - 默认 */

/* sm: ≥ 640px - 大手机 */
@media (min-width: 640px) { }

/* md: ≥ 768px - 平板 */
@media (min-width: 768px) { }

/* lg: ≥ 1024px - 小笔记本 */
@media (min-width: 1024px) { }

/* xl: ≥ 1280px - 桌面 */
@media (min-width: 1280px) { }

/* 2xl: ≥ 1536px - 大屏 */
@media (min-width: 1536px) { }
```

#### 响应式示例
```tsx
// 网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// 文字大小
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// 间距
<div className="p-4 md:p-6 lg:p-8">

// 显示/隐藏
<div className="hidden md:block">桌面显示</div>
<div className="block md:hidden">移动显示</div>
```

---

## 数据可视化规范

### 1. 工作流可视化 (React Flow)

#### 节点样式
```tsx
// 输入节点
{
  type: 'input',
  style: {
    background: 'var(--primary)',
    color: 'white',
    borderRadius: '8px',
    padding: '12px 16px',
  }
}

// 数据源节点
{
  type: 'default',
  style: {
    background: 'var(--card)',
    border: '2px solid var(--border)',
    borderRadius: '8px',
  }
}

// 输出节点
{
  type: 'output',
  style: {
    background: 'var(--success)',
    color: 'white',
    borderRadius: '8px',
  }
}
```

#### 连接线样式
```tsx
{
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: 'var(--primary)',
    strokeWidth: 2,
  }
}
```

---

### 2. 图表 (Charts)

#### 推荐库
- **Recharts**: 简单、声明式
- **Chart.js**: 功能丰富
- **D3.js**: 高度自定义

#### 配色方案
```tsx
const chartColors = [
  'hsl(217, 91%, 60%)',  // 蓝色
  'hsl(142, 76%, 36%)',  // 绿色
  'hsl(38, 92%, 50%)',   // 黄色
  'hsl(280, 89%, 60%)',  // 紫色
  'hsl(340, 82%, 52%)',  // 红色
];
```

---

## 可访问性 (Accessibility)

### 1. 键盘导航
```tsx
// 所有交互元素必须支持键盘操作
<Button onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
}}>
  执行
</Button>
```

### 2. ARIA 标签
```tsx
// 按钮
<Button aria-label="执行 Agent">
  <Play />
</Button>

// 输入框
<Input 
  aria-label="TikTok URL"
  aria-describedby="url-help"
/>
<span id="url-help" className="text-sm text-muted-foreground">
  请输入完整的 TikTok 视频链接
</span>
```

### 3. 对比度
```css
/* 确保文字和背景对比度 ≥ 4.5:1 */
/* 使用工具检查: https://webaim.org/resources/contrastchecker/ */
```

---

## 图标系统

### 推荐图标库
- **Lucide React**: 现代、一致、轻量
- 已安装: `lucide-react`

### 常用图标
```tsx
import {
  Home,           // 首页
  MessageSquare,  // 对话
  Sparkles,       // Agent
  Database,       // 数据
  Settings,       // 设置
  Play,           // 执行
  Pause,          // 暂停
  CheckCircle2,   // 成功
  AlertCircle,    // 错误
  Loader2,        // 加载
  ArrowLeft,      // 返回
  Search,         // 搜索
  Filter,         // 筛选
  Download,       // 下载
  Upload,         // 上传
} from 'lucide-react';
```

### 图标使用规范
```tsx
// 尺寸
<Icon className="w-4 h-4" />  // 16px - 按钮、标签
<Icon className="w-5 h-5" />  // 20px - 导航
<Icon className="w-6 h-6" />  // 24px - 标题
<Icon className="w-8 h-8" />  // 32px - 大图标

// 颜色
<Icon className="text-primary" />
<Icon className="text-muted-foreground" />
<Icon className="text-destructive" />
```

---

## 暗色模式 (Dark Mode)

### 主题切换
```tsx
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();

<Button onClick={() => setTheme('dark')}>深色</Button>
<Button onClick={() => setTheme('light')}>浅色</Button>
<Button onClick={() => setTheme('system')}>跟随系统</Button>
```

### CSS 变量
```css
/* 浅色模式 */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
}

/* 深色模式 */
.dark {
  --background: 222 47% 11%;
  --foreground: 213 31% 91%;
}
```

---

## 性能优化

### 1. 图片优化
```tsx
// 使用 Next.js Image
import Image from 'next/image';

<Image
  src="/factory.jpg"
  alt="工厂"
  width={800}
  height={600}
  loading="lazy"
/>
```

### 2. 代码分割
```tsx
// 动态导入
import dynamic from 'next/dynamic';

const WorkflowEditor = dynamic(
  () => import('@/components/workflow-editor'),
  { ssr: false }
);
```

### 3. 虚拟滚动
```tsx
// 大列表使用虚拟滚动
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## 设计检查清单

### 视觉设计
- [ ] 使用统一的配色方案
- [ ] 遵循字体层级规范
- [ ] 保持一致的间距
- [ ] 圆角统一（4px/6px/8px）
- [ ] 阴影层级清晰

### 交互设计
- [ ] 所有按钮有 hover 状态
- [ ] 加载状态明确
- [ ] 错误提示清晰
- [ ] 空状态友好
- [ ] 支持键盘导航

### 响应式设计
- [ ] 移动端适配
- [ ] 平板端适配
- [ ] 桌面端优化
- [ ] 触摸友好（按钮 ≥ 44px）

### 可访问性
- [ ] 颜色对比度 ≥ 4.5:1
- [ ] ARIA 标签完整
- [ ] 键盘可操作
- [ ] 屏幕阅读器友好

### 性能
- [ ] 图片懒加载
- [ ] 代码分割
- [ ] 避免不必要的重渲染
- [ ] 优化动画性能

---

## 参考资源

### 设计系统
- **Shadcn/ui**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Radix UI**: https://www.radix-ui.com/

### 配色工具
- **Coolors**: https://coolors.co/
- **Adobe Color**: https://color.adobe.com/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/

### 图标资源
- **Lucide Icons**: https://lucide.dev/
- **Heroicons**: https://heroicons.com/

### 字体资源
- **Google Fonts**: https://fonts.google.com/
- **Noto Serif SC**: https://fonts.google.com/noto/specimen/Noto+Serif+SC

---

**文档版本**: v1.0.0  
**最后更新**: 2026-02-07  
**维护者**: Demand-OS Design Team
