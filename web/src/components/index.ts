// ===== Demand-OS 组件统一导出 =====
// 按功能分类，便于维护和查找

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Layout 布局组件
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { Header } from "./layout/header";
export { Footer } from "./layout/Footer";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Pages 页面级组件 (Hero, Landing)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { Hero } from "./pages/hero";
export { default as HeroPage } from "./pages/HeroPage";
export { default as McKinseyHero } from "./pages/McKinseyHero";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Features 功能区块组件
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { default as FAQSection } from "./features/FAQSection";
export { default as CTASection } from "./features/CTASection";
export { default as PricingSection } from "./features/PricingSection";

// Demand 需求展示
export { DemandWaterfallEnhanced } from "./features/DemandWaterfallEnhanced";
export { DemandCardEnhanced } from "./features/DemandCardEnhanced";

// Business 业务组件
export { Leadership } from "./features/leadership";
export { KnowledgeSection } from "./features/knowledge-section";
export { DashboardPreview } from "./features/dashboard-preview";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Utility 工具组件
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { LoadingSpinner } from "./LoadingSpinner";
export { ThemeProvider } from "./theme-provider";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UI 基础组件 (shadcn/ui)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 请直接从 "./ui/xxx" 导入

