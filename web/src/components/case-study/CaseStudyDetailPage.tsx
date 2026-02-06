'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Package,
  Shield,
  CheckCircle2,
  Calendar,
  Award,
  Factory,
  User
} from 'lucide-react';
import { CaseStudy } from '@/types/case-study';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudy;
  onBack: () => void;
  onViewFactory: (factoryId: string) => void;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({ 
  caseStudy, 
  onBack,
  onViewFactory 
}) => {
  const modeConfig = {
    dropshipping: { label: '一件代发', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Package },
    wholesale: { label: '批量批发', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: TrendingUp },
    exclusive: { label: '独家供应', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Shield }
  };

  const mode = modeConfig[caseStudy.cooperationMode];
  const ModeIcon = mode.icon;

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
            返回案例库
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={caseStudy.product.image} 
          alt={caseStudy.product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={`${mode.color} border px-3 py-1 font-bold`}>
                    <ModeIcon className="w-3 h-3 mr-1" />
                    {mode.label}
                  </Badge>
                  {caseStudy.featured && (
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1 font-bold">
                      <Award className="w-3 h-3 mr-1" />
                      精选案例
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl font-black text-white mb-3">{caseStudy.title}</h1>
                <p className="text-white/90 text-lg max-w-3xl">{caseStudy.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧：详细信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 业绩数据 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                业绩数据
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <DollarSign className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-900 mb-1">${caseStudy.metrics.gmv.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">总 GMV</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <Package className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-900 mb-1">{caseStudy.metrics.orderQuantity}</div>
                  <div className="text-xs text-slate-500">订单量</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-900 mb-1">{caseStudy.metrics.profitMargin}%</div>
                  <div className="text-xs text-slate-500">利润率</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-900 mb-1">{caseStudy.metrics.duration}</div>
                  <div className="text-xs text-slate-500">完成周期</div>
                </div>
              </div>
            </div>

            {/* 时间线 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                项目时间线
              </h3>
              <div className="space-y-4">
                {[
                  { label: '发起合作', date: caseStudy.timeline.initiatedAt, icon: CheckCircle2, color: 'text-blue-500' },
                  { label: '生产启动', date: caseStudy.timeline.productionStarted, icon: Factory, color: 'text-emerald-500' },
                  { label: '首批发货', date: caseStudy.timeline.firstShipment, icon: Package, color: 'text-amber-500' },
                  { label: '项目完成', date: caseStudy.timeline.completedAt, icon: Award, color: 'text-purple-500' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">{item.label}</div>
                        <div className="text-sm text-slate-500">{new Date(item.date).toLocaleDateString('zh-CN')}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 成功要素 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">成功要素</h3>
              <div className="space-y-3">
                {caseStudy.successFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 评价 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">参与方评价</h3>
              <div className="space-y-4">
                {caseStudy.testimonial.map((test, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {test.author === 'influencer' ? (
                          <>
                            <User className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-bold text-slate-900">红人评价</span>
                          </>
                        ) : (
                          <>
                            <Factory className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-bold text-slate-900">工厂评价</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold">{test.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed">"{test.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：参与方信息 */}
          <div className="space-y-6">
            {/* 红人信息 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">红人信息</h3>
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={caseStudy.influencer.avatar} 
                  className="w-16 h-16 rounded-full border-2 border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900">{caseStudy.influencer.name}</div>
                  <div className="text-sm text-slate-500">{caseStudy.influencer.handle}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">粉丝数</span>
                  <span className="font-bold text-slate-900">{caseStudy.influencer.followers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">垂直领域</span>
                  <span className="font-bold text-slate-900">{caseStudy.influencer.niche}</span>
                </div>
              </div>
            </div>

            {/* 工厂信息 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">合作工厂</h3>
              <div className="mb-4">
                <div className="font-bold text-slate-900 mb-2">{caseStudy.factory.name}</div>
                <div className="text-sm text-slate-500">{caseStudy.factory.location}</div>
              </div>
              <Button 
                onClick={() => onViewFactory(caseStudy.factory.id)}
                variant="outline"
                className="w-full border-slate-300 hover:bg-slate-50 font-bold"
              >
                查看工厂详情
              </Button>
            </div>

            {/* 产品信息 */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">产品信息</h3>
              <div className="mb-4">
                <div className="font-bold text-lg mb-2">{caseStudy.product.name}</div>
                <Badge className="bg-white/10 hover:bg-white/20 text-white border-none mb-3">
                  {caseStudy.product.category}
                </Badge>
                <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
