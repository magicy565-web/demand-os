'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Users,
  Package,
  Clock,
  Star,
  Shield,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Play
} from 'lucide-react';
import { Factory, CooperationMode } from '@/types/factory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FactoryDetailPageProps {
  factory: Factory;
  onBack: () => void;
}

export const FactoryDetailPage: React.FC<FactoryDetailPageProps> = ({ factory, onBack }) => {
  const [selectedMode, setSelectedMode] = useState<CooperationMode>('wholesale');

  const modeConfig = {
    dropshipping: { icon: Package, color: 'blue', label: '一件代发' },
    wholesale: { icon: TrendingUp, color: 'emerald', label: '批量批发' },
    exclusive: { icon: Shield, color: 'amber', label: '独家供应' }
  };

  const selectedPricing = factory.pricingTiers.find(p => p.mode === selectedMode);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 返回按钮 */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            返回工厂名录
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={factory.coverImage} 
          alt={factory.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-3 py-1">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    平台认证
                  </Badge>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-lg px-3 py-1 border border-white/20">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-bold">{factory.trustScore}</span>
                    <span className="text-white/60 text-xs">/100</span>
                  </div>
                </div>
                <h1 className="text-4xl font-black text-white mb-3">{factory.name}</h1>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{factory.location.city}, {factory.location.province}</span>
                  </div>
                  <span>•</span>
                  <span>成立于 {factory.establishedYear} 年</span>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{factory.employeeCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧：核心信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 认证信息 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                认证资质
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {factory.certifications.map(cert => (
                  <div key={cert.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-[10px] text-slate-500 font-mono">{cert.type.toUpperCase()}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mb-1">{cert.name}</div>
                    <div className="text-xs text-slate-500">颁发机构: {cert.issuedBy}</div>
                    {cert.validUntil && (
                      <div className="text-xs text-slate-500 mt-1">有效期至: {cert.validUntil}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 灵活报价系统 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">灵活报价方案</h3>
              
              {/* 模式选择 */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {factory.pricingTiers.map(tier => {
                  const config = modeConfig[tier.mode];
                  const Icon = config.icon;
                  const isSelected = selectedMode === tier.mode;
                  
                  return (
                    <button
                      key={tier.mode}
                      onClick={() => setSelectedMode(tier.mode)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? `border-${config.color}-500 bg-${config.color}-50` 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-2 ${isSelected ? `text-${config.color}-600` : 'text-slate-400'}`} />
                      <div className={`text-xs font-bold ${isSelected ? `text-${config.color}-900` : 'text-slate-600'}`}>
                        {config.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 选中方案详情 */}
              {selectedPricing && (
                <motion.div
                  key={selectedMode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">单价</div>
                      <div className="text-3xl font-black text-slate-900">${selectedPricing.unitPrice.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 mb-1">起订量</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedPricing.moq} 件</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{selectedPricing.leadTime}</span>
                  </div>

                  <div className="text-sm text-slate-700 mb-4">{selectedPricing.description}</div>

                  <div className="space-y-2">
                    {selectedPricing.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-bold">
                    发起合作邀约
                  </Button>
                </motion.div>
              )}
            </div>

            {/* 历史案例 */}
            {factory.historicalCases.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">成功案例</h3>
                <div className="space-y-4">
                  {factory.historicalCases.map(caseItem => (
                    <div key={caseItem.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-start gap-4">
                        {caseItem.influencerAvatar && (
                          <img 
                            src={caseItem.influencerAvatar} 
                            className="w-12 h-12 rounded-full border-2 border-white shadow"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-bold text-slate-900">{caseItem.influencerName}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-bold">{caseItem.rating}</span>
                            </div>
                          </div>
                          <div className="text-sm text-slate-600 mb-2">{caseItem.productName}</div>
                          <div className="flex gap-4 text-xs text-slate-500 mb-2">
                            <span>订单量: <span className="font-bold text-slate-700">{caseItem.orderQuantity}</span> 件</span>
                            <span>GMV: <span className="font-bold text-emerald-600">${caseItem.gmv.toLocaleString()}</span></span>
                          </div>
                          {caseItem.testimonial && (
                            <div className="text-xs text-slate-600 italic bg-white p-3 rounded-lg border border-slate-100">
                              "{caseItem.testimonial}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右侧：统计与联系 */}
          <div className="space-y-6">
            {/* 核心统计 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">核心数据</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-black text-slate-900 mb-1">{factory.stats.totalOrders}+</div>
                  <div className="text-xs text-slate-500">历史订单总数</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600 mb-1">{factory.stats.onTimeDeliveryRate}%</div>
                  <div className="text-xs text-slate-500">准时交付率</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600 mb-1">{factory.stats.qualityPassRate}%</div>
                  <div className="text-xs text-slate-500">质量合格率</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-2xl font-black text-slate-900">{factory.stats.averageRating}</span>
                  </div>
                  <div className="text-xs text-slate-500">平均评分</div>
                </div>
              </div>
            </div>

            {/* 产能状态 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">产能状态</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>当前利用率</span>
                    <span className="font-bold text-slate-900">{factory.productionCapacity.currentUtilization}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                      style={{ width: `${factory.productionCapacity.currentUtilization}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-lg font-black text-slate-900">{factory.productionCapacity.dailyOutput.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">日产能</div>
                  </div>
                  <div>
                    <div className="text-lg font-black text-emerald-600">{factory.productionCapacity.availableCapacity.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">可用产能</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 联系方式 */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">联系工厂</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{factory.contact.manager}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-mono">{factory.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{factory.contact.email}</span>
                </div>
                {factory.contact.wechat && (
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-mono">{factory.contact.wechat}</span>
                  </div>
                )}
              </div>
              <Button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white h-11 font-bold">
                立即联系
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
