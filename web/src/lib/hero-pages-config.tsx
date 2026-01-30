import { ReactNode } from "react";
import {
  Zap,
  Brain,
  Database,
  Globe,
  Shield,
  Users,
  Compass,
  TrendingUp,
  Target,
  BarChart3,
  Sparkles,
  PlayCircle,
  Award,
  Rocket,
  Building2,
  Package,
  MessageSquare,
  Eye,
  Truck,
  Ship,
  Plane,
  Warehouse,
  MapPin,
  Crown,
  Star,
  Gift,
  Calendar,
  Clock,
  ExternalLink,
  Newspaper,
  Tag,
  Code,
  Palette,
  DollarSign,
} from "lucide-react";

export interface HeroPageConfig {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  blurDataURL?: string;
  icon: ReactNode;
  variant: "light" | "dark";
  accentColor: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  features: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  hideBackButton?: boolean; // 隐藏返回按钮
}

// 生成简单的模糊占位数据 URL（单色）
const generateBlurDataURL = (color: string) => {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="${color}"/></svg>`
  )}`;
};

export const heroPageConfigs: Record<string, HeroPageConfig> = {
  "demand-os": {
    title: "全球贸易的操作系统",
    subtitle: "Global Demand Intelligence Platform",
    description: "通过AI驱动的需求匹配、实时数据分析和全球物流网络，连接采购商与工厂。",
    backgroundImage: "/images/demand-os.jpg",
    blurDataURL: generateBlurDataURL("#2d5a8c"),
    icon: <Zap className="w-16 h-16" />,
    variant: "dark",
    accentColor: "#00509d",
    hideBackButton: true, // 隐藏返回按钮
    stats: [
      { value: "50K+", label: "日均需求" },
      { value: "2,500+", label: "工厂网络" },
      { value: "98%", label: "匹配准确率" },
    ],
    features: [
      {
        icon: <Zap className="w-8 h-8" />,
        title: "需求捕捉",
        description: "实时监测全球贸易需求，智能分类与标签化",
      },
      {
        icon: <Brain className="w-8 h-8" />,
        title: "AI撮合",
        description: "机器学习算法精准匹配采购需求与工厂产能",
      },
      {
        icon: <Database className="w-8 h-8" />,
        title: "数据分析",
        description: "深度市场洞察、价格趋势、竞争分析",
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "金融安全",
        description: "支付担保、合同管理、风险评估",
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "协作工具",
        description: "在线洽谈、文件共享、交易管理",
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: "物流集成",
        description: "一站式物流方案、实时追踪、全球配送",
      },
    ],
    ctaText: "申请演示",
    ctaLink: "/demo",
    secondaryCtaText: "了解更多",
    secondaryCtaLink: "/pricing",
  },

  "strategy-consulting": {
    title: "战略咨询服务",
    subtitle: "Enterprise Strategy",
    description: "为企业提供海外市场进入策略、供应链优化方案、数字化转型咨询，助力全球化业务增长。",
    backgroundImage: "/images/strategy-consulting-bg.jpg",
    blurDataURL: generateBlurDataURL("#1e3a5f"),
    icon: <Compass className="w-16 h-16" />,
    variant: "dark",
    accentColor: "#1e3a5f",
    stats: [
      { value: "300+", label: "服务企业" },
      { value: "50+", label: "国家覆盖" },
      { value: "85%", label: "客户续约率" },
    ],
    features: [
      {
        icon: <Globe className="w-8 h-8" />,
        title: "市场进入策略",
        description: "深度分析目标市场，制定本地化策略，帮助企业快速建立海外业务据点。",
      },
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "增长战略规划",
        description: "识别增长机会，优化产品组合，制定可执行的三年增长路线图。",
      },
      {
        icon: <Target className="w-8 h-8" />,
        title: "供应链优化",
        description: "端到端供应链诊断，降低成本20-30%，提升运营效率。",
      },
      {
        icon: <BarChart3 className="w-8 h-8" />,
        title: "数据驱动洞察",
        description: "利用大数据分析市场趋势，为战略决策提供量化支持。",
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "风险管理",
        description: "识别政策、法律、财务风险，建立完善的风险防控体系。",
      },
      {
        icon: <Sparkles className="w-8 h-8" />,
        title: "数字化转型",
        description: "评估数字化成熟度，制定转型路线图，实施关键技术项目。",
      },
    ],
    ctaText: "预约咨询",
    ctaLink: "/contact",
    secondaryCtaText: "下载案例",
    secondaryCtaLink: "/resources",
  },

  "tiktok-alliance": {
    title: "孕育下一个畅销书",
    subtitle: "TikTok 产业联盟",
    description: "连接全球创作者、品牌与供应链，通过短视频电商赋能新品牌孵化，打造爆款产品。",
    backgroundImage: "/images/tiktok-alliance-bg.jpg",
    blurDataURL: generateBlurDataURL("#2d1b3d"),
    icon: <PlayCircle className="w-16 h-16" />,
    variant: "dark",
    accentColor: "#ff0050",
    stats: [
      { value: "500+", label: "孵化品牌" },
      { value: "50M+", label: "粉丝触达" },
      { value: "$20M+", label: "GMV增长" },
    ],
    features: [
      {
        icon: <Sparkles className="w-8 h-8" />,
        title: "爆款孵化器",
        description: "数据驱动选品，创作者内容共创，供应链快速响应，从0到1打造爆款。",
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "创作者网络",
        description: "连接5000+优质创作者，覆盖美妆、服饰、家居等10+垂直领域。",
      },
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "增长方法论",
        description: "短视频内容策略、投放优化、转化率提升的完整增长体系。",
      },
      {
        icon: <Target className="w-8 h-8" />,
        title: "精准投放",
        description: "基于TikTok算法优化，精准触达目标用户，降低获客成本。",
      },
      {
        icon: <Award className="w-8 h-8" />,
        title: "品牌建设",
        description: "从视觉设计到品牌故事，打造有辨识度的DTC品牌。",
      },
      {
        icon: <Rocket className="w-8 h-8" />,
        title: "供应链直连",
        description: "对接优质工厂，小单快反，支持快速迭代验证市场需求。",
      },
    ],
    ctaText: "申请孵化",
    ctaLink: "/contact",
    secondaryCtaText: "查看案例",
    secondaryCtaLink: "/news",
  },

  showrooms: {
    title: "海外展厅网络",
    subtitle: "Global Showrooms",
    description: "在美国洛杉矶、英国伦敦设立实体展厅，为品牌提供产品展示、市场测试、客户洽谈的专业空间。",
    backgroundImage: "/images/showrooms-bg.jpg",
    blurDataURL: generateBlurDataURL("#e8f4f8"),
    icon: <Building2 className="w-16 h-16" />,
    variant: "light",
    accentColor: "#00509d",
    stats: [
      { value: "2", label: "全球展厅" },
      { value: "500+", label: "展示品类" },
      { value: "200+", label: "月均接待" },
    ],
    features: [
      {
        icon: <Building2 className="w-8 h-8" />,
        title: "洛杉矶展厅",
        description: "美国西部主要贸易枢纽，面积2000平方米，展示电子产品、家居、纺织品等",
      },
      {
        icon: <Building2 className="w-8 h-8" />,
        title: "伦敦展厅",
        description: "欧洲时尚中心，面积1800平方米，专注服装、包箱、饰品等品类",
      },
      {
        icon: <Package className="w-8 h-8" />,
        title: "产品展示",
        description: "实物样品展示，所见即所得，支持小批量采购",
      },
      {
        icon: <MessageSquare className="w-8 h-8" />,
        title: "商务空间",
        description: "配备洽谈室、会议室，支持商务接待和现场交易",
      },
      {
        icon: <Eye className="w-8 h-8" />,
        title: "市场测试",
        description: "直接观察消费者反馈，快速验证产品市场适应度",
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "快速响应",
        description: "本地团队7x24小时服务，当日预约当日看样",
      },
    ],
    ctaText: "预约展厅参观",
    ctaLink: "/contact",
    secondaryCtaText: "了解更多",
    secondaryCtaLink: "/news",
  },

  logistics: {
    title: "全球智能物流",
    subtitle: "Global Logistics Network",
    description: "覆盖美国、英国、欧洲的智能仓储网络，提供海运、空运、陆运一站式物流解决方案，实时追踪每一个包裹。",
    backgroundImage: "/images/logistics-bg.jpg",
    blurDataURL: generateBlurDataURL("#1a3a52"),
    icon: <Truck className="w-16 h-16" />,
    variant: "dark",
    accentColor: "#0077b6",
    stats: [
      { value: "15+", label: "仓储中心" },
      { value: "50K+", label: "月均订单" },
      { value: "99.5%", label: "准时送达" },
    ],
    features: [
      {
        icon: <Ship className="w-8 h-8" />,
        title: "海运整柜",
        description: "成本最优，适合大批量运输，覆盖全球主要港口",
      },
      {
        icon: <Plane className="w-8 h-8" />,
        title: "空运快递",
        description: "时效保障，3-7天全球递送，急单首选方案",
      },
      {
        icon: <Warehouse className="w-8 h-8" />,
        title: "海外仓储",
        description: "美国、英国、欧洲本地仓储，本地2-5天妥投",
      },
      {
        icon: <MapPin className="w-8 h-8" />,
        title: "智能追踪",
        description: "全程可视化追踪系统，异常自动预警提醒",
      },
      {
        icon: <Truck className="w-8 h-8" />,
        title: "清关服务",
        description: "专业清关团队，妥投率高达99.5%",
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "保险保障",
        description: "全程货物保险，损失100%赔付",
      },
    ],
    ctaText: "获取物流方案",
    ctaLink: "/contact",
    secondaryCtaText: "查看价格",
    secondaryCtaLink: "/pricing",
  },

  membership: {
    title: "精英企业俱乐部",
    subtitle: "Elite Membership",
    description: "汇聚全球优质企业，提供专属资源、优先服务、高端社交网络，助力企业加速增长。",
    backgroundImage: "/images/membership-bg.jpg",
    blurDataURL: generateBlurDataURL("#2d2416"),
    icon: <Crown className="w-16 h-16" />,
    variant: "dark",
    accentColor: "#b8860b",
    stats: [
      { value: "500+", label: "会员企业" },
      { value: "$2B+", label: "年度GMV" },
      { value: "95%", label: "续费率" },
    ],
    features: [
      {
        icon: <Star className="w-8 h-8" />,
        title: "专属客户经理",
        description: "1对1客户经理，7x24小时响应，定制化解决方案。",
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "优先匹配权",
        description: "新需求优先推送，优质供应商优先对接，抢占市场先机。",
      },
      {
        icon: <Gift className="w-8 h-8" />,
        title: "增值服务包",
        description: "免费品牌咨询、市场调研报告、行业白皮书等增值服务。",
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "高端社交网络",
        description: "定期线下沙龙、年度峰会，与行业领袖深度交流。",
      },
      {
        icon: <Award className="w-8 h-8" />,
        title: "优惠政策",
        description: "交易佣金8折，物流费用9折，展厅使用免费。",
      },
      {
        icon: <Sparkles className="w-8 h-8" />,
        title: "专属勋章",
        description: "平台专属标识，提升企业信誉度，增加合作机会。",
      },
    ],
    ctaText: "申请会员",
    ctaLink: "/contact",
    secondaryCtaText: "查看权益",
    secondaryCtaLink: "/pricing",
  },

  events: {
    title: "全球活动与峰会",
    subtitle: "Events & Conferences",
    description: "参加行业峰会、产品发布会、线下沙龙，与全球企业家、投资人、行业专家面对面交流。",
    backgroundImage: "/images/events-bg.jpg",
    blurDataURL: generateBlurDataURL("#f8f0f0"),
    icon: <Calendar className="w-16 h-16" />,
    variant: "light",
    accentColor: "#e63946",
    stats: [
      { value: "50+", label: "年度活动" },
      { value: "5,000+", label: "参会人次" },
      { value: "30+", label: "城市覆盖" },
    ],
    features: [
      {
        icon: <Globe className="w-8 h-8" />,
        title: "全球巡回峰会",
        description: "每年在纽约、伦敦、上海、深圳10城市举办大型峰会。",
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "行业领袖分享",
        description: "邀请500强企业CEO、投资机构合伙人、趋势专家分享见解。",
      },
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "产品发布会",
        description: "平台新功能、新服务首发，第一时间了解行业动态。",
      },
      {
        icon: <MapPin className="w-8 h-8" />,
        title: "线下沙龙",
        description: "每月在各城市举办主题沙龙，小范围深度交流。",
      },
      {
        icon: <Clock className="w-8 h-8" />,
        title: "在线直播",
        description: "每周线上直播课，分享供应链、跨境电商干货知识。",
      },
      {
        icon: <ExternalLink className="w-8 h-8" />,
        title: "合作伙伴联办",
        description: "与行业协会、媒体联办活动，扩大影响力。",
      },
    ],
    ctaText: "查看活动日程",
    ctaLink: "#",
    secondaryCtaText: "报名参会",
    secondaryCtaLink: "/contact",
  },

  news: {
    title: "新闻与观点",
    subtitle: "News & Insights",
    description: "最新的跨境贸易资讯、行业报告、数据分析、专家观点，帮助您掌握市场脉动，做出明智决策。",
    backgroundImage: "/images/news-bg.jpg",
    blurDataURL: generateBlurDataURL("#f5f5f5"),
    icon: <Newspaper className="w-16 h-16" />,
    variant: "light",
    accentColor: "#2d3748",
    stats: [
      { value: "200+", label: "月均文章" },
      { value: "50K+", label: "读者群" },
      { value: "30+", label: "行业专家" },
    ],
    features: [
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "市场趋势分析",
        description: "每周发布全球贸易趋势报告，数据驱动的深度解读。",
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: "国际贸易政策",
        description: "实时跟踪关税政策、进出口法规变化，解读影响。",
      },
      {
        icon: <Award className="w-8 h-8" />,
        title: "成功案例",
        description: "分享企业出海成功案例，提供可借鉴的实战经验。",
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "专家观点",
        description: "邀请行业专家、企业家分享他们的洞见与经验。",
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "平台动态",
        description: "新功能发布、产品更新、合作伙伴公告等平台消息。",
      },
      {
        icon: <Tag className="w-8 h-8" />,
        title: "主题分类",
        description: "按行业、地区、主题分类，快速找到感兴趣的内容。",
      },
    ],
    ctaText: "订阅新闻",
    ctaLink: "#",
    secondaryCtaText: "查看全部",
    secondaryCtaLink: "#",
  },

  careers: {
    title: "加入我们",
    subtitle: "Careers at Demand OS",
    description: "我们正在构建全球贸易的未来。加入我们，与顶尖人才一起，解决复杂问题，创造全球影响力。",
    backgroundImage: "/images/careers-bg.jpg",
    blurDataURL: generateBlurDataURL("#2d1b3d"),
    icon: <Users className="w-16 h-16" />,
    variant: "dark",
    accentColor: "#4c1d95",
    stats: [
      { value: "120+", label: "团队成员" },
      { value: "15+", label: "国家分布" },
      { value: "30+", label: "开放职位" },
    ],
    features: [
      {
        icon: <Code className="w-8 h-8" />,
        title: "技术岗位",
        description: "前端、后端、算法、数据工程等核心岗位",
      },
      {
        icon: <Palette className="w-8 h-8" />,
        title: "产品设计",
        description: "UI/UX、交互设计、产品经理等创意岗位",
      },
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "业务运营",
        description: "销售、市场、客户成功等增长相关岗位",
      },
      {
        icon: <DollarSign className="w-8 h-8" />,
        title: "竞争力薪资",
        description: "业界领先的薪资待遇，加上期权激励",
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: "全球机会",
        description: "在美国、英国、中国等15个国家建立分支机构",
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "成长平台",
        description: "快速成长的创业公司，充分的学习和发展空间",
      },
    ],
    ctaText: "查看职位",
    ctaLink: "/careers",
    secondaryCtaText: "了解公司文化",
    secondaryCtaLink: "/about",
  },
};
