/**
 * Discord频道欢迎卡片配置
 * 每个AI Tool频道的详细介绍内容
 */

import { 
  Video, 
  FileText, 
  TrendingUp, 
  Factory, 
  Sparkles 
} from "lucide-react";

export const channelWelcomeConfigs = {
  "tiktok-hunter": {
    channelName: "TikTok Hunter",
    channelIcon: Video,
    tagline: "🎯 Viral Product to Factory Pipeline",
    description: "Instantly convert viral TikTok products into actionable sourcing opportunities. Paste any TikTok link and get factory quotes in seconds!",
    accentColor: "#00F2FE",
    howItWorks: [
      {
        step: 1,
        title: "Find Trending Products",
        description: "Browse TikTok for viral products with hashtags like #TikTokMadeMeBuyIt, gadget reviews, or unboxing videos."
      },
      {
        step: 2,
        title: "Paste the Link",
        description: "Simply paste any TikTok video URL (e.g., https://www.tiktok.com/@shop/video/1234567890) into this channel."
      },
      {
        step: 3,
        title: "AI Analysis",
        description: "Our AI extracts product details via computer vision, analyzes specs from video & description, and identifies similar products in our database."
      },
      {
        step: 4,
        title: "Instant Factory Match",
        description: "Get comprehensive sourcing info: FOB pricing, MOQ, lead times, factory matches with certifications, and market insights."
      }
    ],
    features: [
      {
        icon: "🔍",
        title: "Computer Vision Analysis",
        description: "AI identifies products from video frames with 96% accuracy"
      },
      {
        icon: "💰",
        title: "Price Breakdown",
        description: "Unit pricing, shipping estimates, customization fees, sample costs"
      },
      {
        icon: "🏭",
        title: "Verified Suppliers",
        description: "5-12 matched factories per product with quality certifications"
      },
      {
        icon: "📈",
        title: "Trend Intelligence",
        description: "Market demand signals, competition analysis, profit margins"
      },
      {
        icon: "⚡",
        title: "Lightning Fast",
        description: "Average analysis time: 8 seconds from paste to quote"
      },
      {
        icon: "🌍",
        title: "Multi-Platform",
        description: "TikTok, Instagram Reels, YouTube Shorts, direct images"
      }
    ],
    metrics: [
      { icon: "⚡", label: "Avg Analysis Time", value: "8s" },
      { icon: "🎯", label: "Match Accuracy", value: "96%" },
      { icon: "🏭", label: "Avg Suppliers", value: "5-12" },
      { icon: "💰", label: "Price Advantage", value: "40-60%" }
    ],
    tips: [
      "Paste videos with 500K+ views for best supplier selection",
      "Check multiple suppliers and compare pricing before ordering",
      "Request samples first to verify quality before bulk orders",
      "Act fast on trends - viral products have short windows",
      "Use the RFQ button for custom volume quotes"
    ],
    callToAction: "📎 Paste a TikTok link below to get started!"
  },

  "quick-rfq": {
    channelName: "Quick RFQ",
    channelIcon: FileText,
    tagline: "📋 Fast-Track Sourcing Solution",
    description: "Submit your requirements and get AI-matched supplier quotations within minutes. No forms, no hassle - just describe what you need!",
    accentColor: "#5865F2",
    howItWorks: [
      {
        step: 1,
        title: "Submit Requirements",
        description: "Describe your product needs: category, specs, quantity, target price range, delivery timeline, and required certifications."
      },
      {
        step: 2,
        title: "AI Processing",
        description: "Our AI matches qualified suppliers from our verified database, evaluates capabilities & certifications, and ranks by relevance."
      },
      {
        step: 3,
        title: "Receive Quotations",
        description: "Get instant supplier cards with company profiles, pricing, MOQ, production capacity, certifications, and lead times."
      },
      {
        step: 4,
        title: "Connect Directly",
        description: "Click to connect with suppliers via direct messaging, WhatsApp/WeChat, or email for negotiations."
      }
    ],
    features: [
      {
        icon: "🤖",
        title: "AI Supplier Matching",
        description: "Intelligent algorithm matches your needs with 50,000+ verified factories"
      },
      {
        icon: "✅",
        title: "Verified Database",
        description: "All suppliers pre-screened with certifications verified"
      },
      {
        icon: "📊",
        title: "Capability Analysis",
        description: "Production capacity, quality scores, delivery reliability"
      },
      {
        icon: "💬",
        title: "Direct Communication",
        description: "Built-in messaging, WhatsApp, WeChat, email connections"
      },
      {
        icon: "⏱️",
        title: "Speed",
        description: "Average response time under 8 minutes"
      },
      {
        icon: "🌐",
        title: "Global Coverage",
        description: "Suppliers across 50+ countries worldwide"
      }
    ],
    metrics: [
      { icon: "⚡", label: "Response Time", value: "8min" },
      { icon: "🏭", label: "Match Rate", value: "94%" },
      { icon: "✅", label: "Quote Accuracy", value: "98%" },
      { icon: "🌍", label: "Countries", value: "50+" }
    ],
    tips: [
      "Be specific about quantities for better MOQ matches",
      "Mention target timeline - affects supplier selection",
      "Include certification requirements upfront",
      "Specify destination country for accurate shipping quotes",
      "Use detailed product specs for precise matches"
    ],
    callToAction: "📝 Type your RFQ requirements below!"
  },

  "market-trends": {
    channelName: "Market Trends",
    channelIcon: TrendingUp,
    tagline: "📈 Real-Time Market Intelligence",
    description: "Stay ahead with AI-powered market analytics, pricing trends, and demand forecasting. Make data-driven sourcing decisions!",
    accentColor: "#57F287",
    howItWorks: [
      {
        step: 1,
        title: "Access Live Data",
        description: "Real-time product category performance, growth rates (YoY, MoM), regional demand patterns, and emerging categories."
      },
      {
        step: 2,
        title: "Use Commands",
        description: "Type @trend [category], @hotproducts, @pricing [product], @forecast [category], or @region [location] for instant insights."
      },
      {
        step: 3,
        title: "Analyze Intelligence",
        description: "Get historical price trends, competitive benchmarks, cost breakdowns, seasonal patterns, and saturation indicators."
      },
      {
        step: 4,
        title: "Make Decisions",
        description: "Use forecasts for planning, monitor competitors, time purchases optimally, and avoid saturated markets."
      }
    ],
    features: [
      {
        icon: "📊",
        title: "Trend Analysis",
        description: "Category performance tracking with YoY/MoM growth rates"
      },
      {
        icon: "💰",
        title: "Price Intelligence",
        description: "Historical trends, elasticity, competitive benchmarks"
      },
      {
        icon: "🔥",
        title: "Hot Products",
        description: "Trending items with breakout detection (7/30/90 day windows)"
      },
      {
        icon: "🔮",
        title: "Demand Forecasting",
        description: "AI predictions for next 30/60/90 days with confidence scores"
      },
      {
        icon: "🌍",
        title: "Regional Insights",
        description: "Market performance by geography with local demand signals"
      },
      {
        icon: "📈",
        title: "Lifecycle Tracking",
        description: "Product stage identification (growth, maturity, decline)"
      }
    ],
    metrics: [
      { icon: "🔄", label: "Update Frequency", value: "15min" },
      { icon: "🌐", label: "Data Sources", value: "500+" },
      { icon: "🎯", label: "Forecast Accuracy", value: "87%" },
      { icon: "📊", label: "Products Tracked", value: "2M+" }
    ],
    tips: [
      "Check trends before sourcing to avoid saturated markets",
      "Monitor price movements to time purchases optimally",
      "Use forecasts for inventory planning and demand alignment",
      "Track competitor pricing to stay competitive",
      "Set up price alerts for your watched products"
    ],
    callToAction: "💹 Type a command (e.g., @trend electronics) to explore!"
  },

  "factory-discover": {
    channelName: "Factory Discover",
    channelIcon: Factory,
    tagline: "🏭 Global Manufacturing Network",
    description: "Access 50,000+ verified manufacturers across 80+ countries with intelligent AI matching. Find your perfect production partner!",
    accentColor: "#FEE75C",
    howItWorks: [
      {
        step: 1,
        title: "Search or Filter",
        description: "Use natural language (\"LED manufacturers in Vietnam with ISO9001\"), quick filter reactions (🇨🇳🇻🇳🇮🇳), or commands (@discover, @region, @verified)."
      },
      {
        step: 2,
        title: "Review Profiles",
        description: "Each factory shows company overview, capabilities, certifications, performance metrics, buyer reviews, location, pricing, and lead times."
      },
      {
        step: 3,
        title: "Compare Options",
        description: "Filter by industry, region, capacity, rating, or price range. Sort by quality score, delivery reliability, or communication."
      },
      {
        step: 4,
        title: "Connect & Quote",
        description: "Request quotes, message factories directly, save favorites, or use RFQ templates for bulk orders."
      }
    ],
    features: [
      {
        icon: "✅",
        title: "Verified Suppliers",
        description: "Gold (on-site audit), Verified (remote), Basic (pending audit)"
      },
      {
        icon: "🔍",
        title: "Smart Filters",
        description: "By industry, region, capacity, rating, certifications, price"
      },
      {
        icon: "📊",
        title: "Performance Metrics",
        description: "Quality score, on-time %, defect rate, response rate"
      },
      {
        icon: "💬",
        title: "Verified Reviews",
        description: "Real buyer feedback with detailed ratings and experiences"
      },
      {
        icon: "🌍",
        title: "Global Coverage",
        description: "80+ countries including China, Vietnam, India, Bangladesh, Thailand"
      },
      {
        icon: "📍",
        title: "Location Details",
        description: "Factory address, Google Maps, proximity to ports/airports"
      }
    ],
    metrics: [
      { icon: "🏭", label: "Total Factories", value: "50K+" },
      { icon: "🌍", label: "Countries", value: "80+" },
      { icon: "✅", label: "Verified Rate", value: "78%" },
      { icon: "⭐", label: "Avg Rating", value: "4.6/5" }
    ],
    tips: [
      "Start with Gold Verified factories for quality assurance",
      "Check production capacity before placing large orders",
      "Read buyer reviews for real-world experiences",
      "Request samples before committing to bulk orders",
      "Use multiple suppliers to reduce supply chain risk"
    ],
    callToAction: "🔍 Type @discover [product] or use quick filters below!"
  },

  "ai-auto-request": {
    channelName: "AI Auto-Request",
    channelIcon: Sparkles,
    tagline: "⚡ Conversational Sourcing [BETA]",
    description: "Next-gen AI that understands natural language and automatically takes action. No forms, no templates - just talk naturally!",
    accentColor: "#EB459E",
    howItWorks: [
      {
        step: 1,
        title: "Describe Naturally",
        description: "Talk to AI like a sourcing agent. No rigid formats - use everyday language, be as detailed or brief as you like."
      },
      {
        step: 2,
        title: "AI Understanding",
        description: "AI extracts product type, specs, quantity, budget, timeline, destination, shipping preferences, and quality standards."
      },
      {
        step: 3,
        title: "Smart Decision",
        description: "AI decides: Auto-Source (instant, <2min) for clear requests OR Manual Ticket (expert review, 4h) for complex needs."
      },
      {
        step: 4,
        title: "Get Results",
        description: "Auto-sourced: Instant supplier matches. Manual: Expert sourcing team handles negotiations and compliance."
      }
    ],
    features: [
      {
        icon: "🤖",
        title: "NLP Processing",
        description: "Advanced natural language understanding - just type freely"
      },
      {
        icon: "🎯",
        title: "Smart Routing",
        description: "AI knows when to auto-process vs. escalate to experts"
      },
      {
        icon: "⚡",
        title: "Instant Response",
        description: "67% of requests auto-sourced in under 2 minutes"
      },
      {
        icon: "🧑‍💼",
        title: "Expert Backup",
        description: "Complex orders routed to senior sourcing managers"
      },
      {
        icon: "🌐",
        title: "Multi-Language",
        description: "English, Chinese, Spanish, and more languages supported"
      },
      {
        icon: "🧠",
        title: "Context Aware",
        description: "Remembers your previous requests and preferences"
      }
    ],
    metrics: [
      { icon: "⚡", label: "Auto-Source Rate", value: "67%" },
      { icon: "🎯", label: "Match Accuracy", value: "91%" },
      { icon: "⏱️", label: "Avg Response", value: "1.8min" },
      { icon: "⭐", label: "Satisfaction", value: "4.6/5" }
    ],
    tips: [
      "Be specific about product descriptions for best results",
      "Include approximate quantities even if flexible",
      "Mention budget range to help filter suppliers",
      "State timeline urgency (urgent vs. flexible)",
      "Add destination for accurate shipping calculations"
    ],
    callToAction: "💬 Just type your sourcing need below - no special format required!"
  }
};

export type ChannelId = keyof typeof channelWelcomeConfigs;
