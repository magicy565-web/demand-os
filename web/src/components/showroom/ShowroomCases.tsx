"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Package, Factory, ArrowRight } from "lucide-react";

// 根据产业带图片内容设计数据
const industrialBelts = [
  {
    id: "guangdong",
    title: "广东特色产业带",
    subtitle: "全球智造中心",
    location: "广东省",
    image: "/images/showroom case/广东特色产业带.jpg",
    gradient: "from-blue-600 to-cyan-500",
    stats: {
      volume: "50亿+",
      suppliers: "3,200+",
      categories: "12个",
      growth: "+120%"
    },
    industries: ["消费电子", "智能家电", "灯饰照明", "五金制品"],
    highlights: [
      "珠三角核心制造集群",
      "全球最大的3C电子供应链",
      "智能家居产业链完整"
    ]
  },
  {
    id: "henan",
    title: "河南特色产业带",
    subtitle: "中原制造枢纽",
    location: "河南省",
    image: "/images/showroom case/河南特色产业带.jpg",
    gradient: "from-emerald-600 to-teal-500",
    stats: {
      volume: "32亿+",
      suppliers: "1,800+",
      categories: "8个",
      growth: "+85%"
    },
    industries: ["发制品", "机械装备", "农业科技", "纺织服装"],
    highlights: [
      "全球最大假发生产基地",
      "中部地区交通物流枢纽",
      "农机装备出口领先"
    ]
  },
  {
    id: "hubei",
    title: "湖北特色产业带",
    subtitle: "科技创新高地",
    location: "湖北省",
    image: "/images/showroom case/湖北特色产业带.jpg",
    gradient: "from-violet-600 to-purple-500",
    stats: {
      volume: "45亿+",
      suppliers: "2,500+",
      categories: "10个",
      growth: "+105%"
    },
    industries: ["光电子", "汽车零部件", "生物医药", "新材料"],
    highlights: [
      "光谷核心科技集群",
      "汽车零部件完整产业链",
      "生物医药研发重镇"
    ]
  },
];

export function ShowroomCases() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {industrialBelts.map((belt, index) => (
          <motion.div
            key={belt.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="group relative"
          >
            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">
              {/* 图片区域 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={belt.image}
                  alt={belt.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* 渐变遮罩 */}
                <div className={`absolute inset-0 bg-gradient-to-t ${belt.gradient} opacity-40 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* 地理标签 */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{belt.location}</span>
                </div>

                {/* 增长标签 */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-green-500/20 backdrop-blur-md rounded-full border border-green-400/30">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-bold text-green-400">{belt.stats.growth}</span>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                    {belt.title}
                  </h3>
                  <p className="text-white/50 text-sm">{belt.subtitle}</p>
                </div>

                {/* 产业标签 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {belt.industries.map((industry) => (
                    <span 
                      key={industry}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10"
                    >
                      {industry}
                    </span>
                  ))}
                </div>

                {/* 数据统计 */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white font-mono">
                      ¥{belt.stats.volume}
                    </div>
                    <div className="text-xs text-white/40 mt-1">年交易额</div>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <div className="text-lg font-bold text-white font-mono">
                      {belt.stats.suppliers}
                    </div>
                    <div className="text-xs text-white/40 mt-1">入驻供应商</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white font-mono">
                      {belt.stats.categories}
                    </div>
                    <div className="text-xs text-white/40 mt-1">品类覆盖</div>
                  </div>
                </div>

                {/* 亮点列表 */}
                <div className="mt-4 space-y-2">
                  {belt.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${belt.gradient}`} />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* 查看详情按钮 */}
                <motion.button
                  whileHover={{ x: 4 }}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-all border border-white/10"
                >
                  查看产业带详情
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 底部统计汇总 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { icon: Factory, label: "覆盖产业带", value: "15+", suffix: "个省份" },
          { icon: Package, label: "展示产品", value: "50,000+", suffix: "SKU" },
          { icon: TrendingUp, label: "年增长率", value: "103%", suffix: "平均" },
          { icon: MapPin, label: "服务区域", value: "200+", suffix: "城市" },
        ].map((stat, i) => (
          <div key={i} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
            <stat.icon className="w-8 h-8 text-white/40 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
            <div className="text-xs text-white/40 mt-1">{stat.label} · {stat.suffix}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
