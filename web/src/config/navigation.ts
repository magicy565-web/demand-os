import React from 'react';

// SVG Icons as React components
export const DemandOSIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IndustryOSIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LearnMoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface NavItem {
  title: string;
  href?: string;
  icon?: React.ComponentType;
  description?: string;
  items?: NavItem[];
}

export const navigationConfig = {
  mainNav: [
    {
      title: "数智产业园 OS",
      icon: DemandOSIcon,
      items: [
        {
          title: "Agent 市场",
          href: "/agents-v3",
          description: "浏览所有智能代理，自动化您的业务流程",
        },
        {
          title: "需求捕获 Agent",
          href: "/agent-list/demand-capture",
          description: "智能捕获全球电商平台的采购需求",
        },
        {
          title: "选品分析 Agent",
          href: "/agent-list/product-selection",
          description: "基于市场数据的智能选品分析",
        },
        {
          title: "供应商匹配 Agent",
          href: "/agent-list/supplier-matching",
          description: "精准匹配优质供应商资源",
        },
        {
          title: "内容创作 Agent",
          href: "/agent-list/content-creation",
          description: "AI 驱动的产品内容生成",
        },
        {
          title: "数据分析 Agent",
          href: "/agent-list/data-analysis",
          description: "深度数据分析与商业洞察",
        },
        {
          title: "聊天转工作流",
          href: "/chat-to-workflow",
          description: "快速创建自定义 Agent 工作流",
        },
        {
          title: "爆款追踪器",
          href: "/viral-tracker",
          description: "追踪热门产品趋势，发现市场机会",
        },
        {
          title: "Discord 工作区",
          href: "/discord",
          description: "Discord 集成功能与社区协作",
        },
        {
          title: "解决方案总览",
          href: "/solution",
          description: "探索所有解决方案",
        },
        {
          title: "30天出海路径",
          href: "/solution/30-day-pathway",
          description: "快速启动跨境电商业务",
        },
        {
          title: "数字资产全托管",
          href: "/solution/digital-asset-management",
          description: "一站式数字资产管理服务",
        },
        {
          title: "TikTok Shop 启动",
          href: "/solution/tiktok-shop-launch",
          description: "TikTok 电商快速启动方案",
        },
        {
          title: "供应链优化",
          href: "/solution/supply-chain-optimization",
          description: "端到端供应链优化服务",
        },
        {
          title: "战略咨询",
          href: "/strategy-consulting",
          description: "专业战略咨询服务",
        },
        {
          title: "TikTok 联盟",
          href: "/tiktok-alliance",
          description: "TikTok 生态合作",
        },
        {
          title: "成功案例",
          href: "/cases",
          description: "浏览所有成功案例",
        },
        {
          title: "消费电子案例",
          href: "/cases/consumer-electronics",
          description: "消费电子行业成功案例",
        },
        {
          title: "美妆个护案例",
          href: "/cases/beauty-personal-care",
          description: "美妆个护行业成功案例",
        },
        {
          title: "家居生活案例",
          href: "/cases/home-living",
          description: "家居生活行业成功案例",
        },
      ],
    },
    {
      title: "行业操作系统",
      icon: IndustryOSIcon,
      items: [
        {
          title: "行业总览",
          href: "/industry-os",
          description: "探索各行业的市场机会",
        },
        {
          title: "消费电子",
          href: "/industry-os/consumer-electronics",
          description: "智能手机、可穿戴设备、智能家居等消费电子产品",
        },
        {
          title: "美妆个护",
          href: "/industry-os/beauty-personal-care",
          description: "护肤品、彩妆、个人护理产品",
        },
        {
          title: "家居生活",
          href: "/industry-os/home-living",
          description: "家具、家纺、厨具、收纳用品",
        },
        {
          title: "运动户外",
          href: "/industry-os/sports-outdoor",
          description: "运动装备、户外用品、健身器材",
        },
        {
          title: "母婴",
          href: "/industry-os/baby-maternity",
          description: "婴儿用品、孕产妇用品、儿童玩具",
        },
        {
          title: "宠物经济",
          href: "/industry-os/pet-economy",
          description: "宠物食品、宠物用品、宠物服务",
        },
        {
          title: "工厂总览",
          href: "/factory-list",
          description: "浏览所有工厂",
        },
        {
          title: "认证工厂目录",
          href: "/factory-list/certified",
          description: "经过认证的优质工厂名录",
        },
        {
          title: "产能匹配系统",
          href: "/factory-list/capacity-matching",
          description: "智能匹配工厂产能与需求",
        },
        {
          title: "工厂入驻申请",
          href: "/factory-list/apply",
          description: "申请加入 Demand-OS 工厂网络",
        },
        {
          title: "展厅",
          href: "/showrooms",
          description: "工厂展示空间",
        },
        {
          title: "全球信任工厂",
          href: "/global-trust",
          description: "高信誉工厂推荐",
        },
      ],
    },
    {
      title: "了解更多",
      icon: LearnMoreIcon,
      items: [
        {
          title: "搜索",
          href: "/search",
          description: "全站搜索",
        },
        {
          title: "资源中心",
          href: "/resources",
          description: "学习资源与文档",
        },
      ],
    },
  ],
};
