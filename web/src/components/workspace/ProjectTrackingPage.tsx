'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Factory as FactoryIcon,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  Award,
  DollarSign,
  Calendar
} from 'lucide-react';
import { ACTIVE_PROJECTS } from '@/data/influencer-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectTrackingPageProps {
  onBack: () => void;
  onViewFactory: (factoryId: string) => void;
}

export const ProjectTrackingPage: React.FC<ProjectTrackingPageProps> = ({
  onBack,
  onViewFactory
}) => {
  const statusConfig = {
    production: { label: '生产中', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: FactoryIcon },
    'quality-check': { label: '质检中', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: CheckCircle2 },
    shipping: { label: '运输中', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Truck },
    delivered: { label: '已送达', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Package },
    completed: { label: '已完成', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: Award }
  };

  const modeConfig = {
    dropshipping: { label: '一件代发', color: 'text-blue-600' },
    wholesale: { label: '批量批发', color: 'text-emerald-600' },
    exclusive: { label: '独家供应', color: 'text-amber-600' }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            返回工作台
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">项目追踪</h1>
          <p className="text-slate-600">实时查看所有进行中的订单和生产进度</p>
        </div>

        {/* 项目列表 */}
        <div className="space-y-6">
          {ACTIVE_PROJECTS.map(project => {
            const statusInfo = statusConfig[project.status];
            const StatusIcon = statusInfo.icon;
            const modeInfo = modeConfig[project.cooperationMode];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
              >
                {/* 项目头部 */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-start gap-6">
                    <img 
                      src={project.product.image} 
                      className="w-24 h-24 rounded-xl object-cover shadow-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-1">{project.product.name}</h3>
                          <p className="text-sm text-slate-500">{project.product.category}</p>
                        </div>
                        <Badge className={`${statusInfo.color} border font-bold`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">合作模式</div>
                          <div className={`text-sm font-bold ${modeInfo.color}`}>{modeInfo.label}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">订购数量</div>
                          <div className="text-sm font-bold text-slate-900">{project.orderQuantity} 件</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">单价</div>
                          <div className="text-sm font-bold text-slate-900">${project.unitPrice}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">总价值</div>
                          <div className="text-lg font-black text-emerald-600">${project.totalValue.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 进度条 */}
                <div className="px-6 py-4 bg-slate-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-700">整体进度</span>
                    <span className="text-lg font-black text-blue-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* 时间线 */}
                <div className="p-6">
                  <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    项目时间线
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: '订单下达', date: project.timeline.orderPlaced, completed: true, icon: Package },
                      { label: '生产启动', date: project.timeline.productionStarted, completed: !!project.timeline.productionStarted, icon: FactoryIcon },
                      { label: '质检完成', date: project.timeline.qualityCheckCompleted, completed: !!project.timeline.qualityCheckCompleted, icon: CheckCircle2 },
                      { label: '已发货', date: project.timeline.shipped, completed: !!project.timeline.shipped, icon: Truck },
                      { label: '已送达', date: project.timeline.delivered, completed: !!project.timeline.delivered, icon: Award }
                    ].map((milestone, idx) => {
                      const Icon = milestone.icon;
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            milestone.completed 
                              ? 'bg-emerald-100 text-emerald-600' 
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold ${milestone.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                              {milestone.label}
                            </div>
                            {milestone.date && (
                              <div className="text-xs text-slate-500">
                                {new Date(milestone.date).toLocaleDateString('zh-CN')}
                              </div>
                            )}
                          </div>
                          {milestone.completed && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 物流信息 */}
                {project.shipping && (
                  <div className="px-6 pb-6">
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Truck className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-bold text-amber-900">物流信息</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-amber-700 mb-1">快递公司</div>
                          <div className="font-bold text-amber-900">{project.shipping.carrier}</div>
                        </div>
                        <div>
                          <div className="text-xs text-amber-700 mb-1">运单号</div>
                          <div className="font-bold text-amber-900 font-mono">{project.shipping.trackingNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-amber-700 mb-1">预计送达</div>
                          <div className="font-bold text-amber-900">
                            {new Date(project.shipping.estimatedDelivery).toLocaleDateString('zh-CN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="px-6 pb-6 flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => onViewFactory(project.factoryId)}
                    className="flex-1 border-slate-300 hover:bg-slate-50 font-bold"
                  >
                    <FactoryIcon className="w-4 h-4 mr-2" />
                    查看工厂
                  </Button>
                  <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold">
                    联系工厂
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
