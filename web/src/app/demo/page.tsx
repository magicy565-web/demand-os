"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemandWaterfallEnhanced } from "@/components/features/DemandWaterfallEnhanced";
import { PublishDemandModal, DemandFormData } from "@/components/features/PublishDemandModal";
import { DemandDetailModal } from "@/components/features/DemandDetailModal";
import { ConnectSuccessModal } from "@/components/features/ConnectSuccessModal";
import { StatsModal } from "@/components/features/StatsModal";
import { AgentSourcingAnimation } from "@/components/features/AgentSourcingAnimation";
import { Demand } from "@/types/demand";
import { 
  Activity, 
  TrendingUp, 
  Globe, 
  Zap,
  Filter,
  Search,
  X,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Bell,
  BarChart3,
  Home
} from "lucide-react";
import Link from "next/link";

export default function DemandOSDemoPage() {
  // 基础状态
  const [demandCount, setDemandCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // 搜索和排序
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"time" | "value" | "urgency">("time");
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  // 价格筛选
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  
  // 弹窗状态
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  
  // 收藏
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // 通知
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  // 筛选选项
  const regions = ["北美", "欧洲", "亚太", "中国", "中东", "全球"];
  const categories = ["消费电子", "服装纺织", "工业制造", "家居生活", "新能源", "物流服务", "其他"];

  // 添加通知
  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  // 处理发布需求
  const handlePublishDemand = (data: DemandFormData) => {
    console.log("发布需求:", data);
    addNotification(`需求「${data.title}」发布成功！`);
  };

  // 处理需求点击
  const handleDemandClick = useCallback((demand: Demand) => {
    setSelectedDemand(demand);
    setShowDetailModal(true);
  }, []);

  // 处理收藏
  const handleFavorite = (demandId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(demandId)) {
        newFavorites.delete(demandId);
        addNotification("已取消收藏");
      } else {
        newFavorites.add(demandId);
        addNotification("已添加到收藏");
      }
      return newFavorites;
    });
  };

  // 清除所有筛选
  const clearFilters = () => {
    setSelectedRegion(null);
    setSelectedCategory(null);
    setPriceRange([0, 500000]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedRegion || selectedCategory || searchQuery;

  return (
    <div className="min-h-screen bg-gray-50 relative">

      {/* 顶部导航栏 */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo 和标题 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Demand-os Beta
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  全球需求实时监控中心
                </p>
              </div>
            </div>

            {/* 搜索栏 */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索需求关键词..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 ml-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-sm ${
                  showFilters || hasActiveFilters
                    ? "bg-cyan-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                高级筛选
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-pink-500 rounded-full" />
                )}
              </motion.button>
              
              {/* 排序下拉 */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="px-4 py-2.5 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 font-medium text-sm flex items-center gap-2 transition-all shadow-sm"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  排序
                </motion.button>
                
                <AnimatePresence>
                  {showSortMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 right-0 w-40 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      {[
                        { value: "time", label: "最新发布" },
                        { value: "value", label: "商业价值" },
                        { value: "urgency", label: "紧急程度" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value as typeof sortBy);
                            setShowSortMenu(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                            sortBy === option.value
                              ? "bg-cyan-50 text-cyan-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 高级筛选面板 */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-gray-200 mt-4">
                  <div className="grid grid-cols-4 gap-6">
                    {/* 区域筛选 */}
                    <div>
                      <label className="text-xs text-gray-600 font-medium mb-2 block">
                        目标区域
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((region) => (
                          <motion.button
                            key={region}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setSelectedRegion(
                                selectedRegion === region ? null : region
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedRegion === region
                                ? "bg-cyan-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                            }`}
                          >
                            {region}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* 品类筛选 */}
                    <div>
                      <label className="text-xs text-gray-600 font-medium mb-2 block">
                        需求品类
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === category ? null : category
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedCategory === category
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                            }`}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* 价格区间 */}
                    <div>
                      <label className="text-xs text-gray-600 font-medium mb-2 block">
                        预算范围 (USD)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          placeholder="最低"
                          className="w-24 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          placeholder="最高"
                          className="w-24 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 清除筛选 */}
                  {hasActiveFilters && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={clearFilters}
                        className="text-xs text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-1 font-medium"
                      >
                        <X className="w-3 h-3" />
                        清除所有筛选
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 瀑布流内容区 */}
      <div className={`pt-32 pb-24 ${showFilters ? 'pt-56' : ''}`}>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Agent 寻源动画组件 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <AgentSourcingAnimation />
          </motion.div>

          <DemandWaterfallEnhanced 
            mode="cyber" 
            onDemandCountChange={setDemandCount}
            onDemandClick={handleDemandClick}
          />
        </div>
      </div>

      {/* 浮动操作按钮 */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* 统计按钮 */}
        <motion.button
          onClick={() => setShowStatsModal(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:border-cyan-500 transition-colors shadow-lg"
        >
          <BarChart3 className="w-6 h-6" />
        </motion.button>

        {/* 发布需求按钮 */}
        <motion.button
          onClick={() => setShowPublishModal(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
        >
          <Plus className="w-7 h-7 text-white" />
        </motion.button>
      </div>

      {/* 返回首页按钮 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-cyan-600 hover:border-cyan-500 transition-colors shadow-lg"
          >
            <Home className="w-6 h-6" />
          </motion.div>
        </Link>
      </motion.div>

      {/* 实时通知 */}
      <AnimatePresence>
        {showNotification && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-lg flex items-center gap-3"
          >
            <Bell className="w-5 h-5 text-cyan-600" />
            <span className="text-gray-900 font-medium">{notifications[0]}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 发布需求弹窗 */}
      <PublishDemandModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onSubmit={handlePublishDemand}
      />

      {/* 需求详情弹窗 */}
      <DemandDetailModal
        demand={selectedDemand}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onConnect={() => {
          setShowDetailModal(false);
          setShowConnectModal(true);
        }}
        onFavorite={handleFavorite}
        isFavorited={selectedDemand ? favorites.has(selectedDemand.id) : false}
      />

      {/* 统计数据弹窗 */}
      <StatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
      />

      {/* 对接成功弹窗 */}
      <ConnectSuccessModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        demand={selectedDemand}
      />
    </div>
  );
}
