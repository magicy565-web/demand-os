'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  DollarSign,
  Award,
  Bell,
  Settings,
  ChevronRight,
  Zap,
  Factory,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  CURRENT_INFLUENCER, 
  ACTIVE_PROJECTS, 
  COLLABORATION_REQUESTS,
  NOTIFICATIONS 
} from '@/data/influencer-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface InfluencerDashboardProps {
  onNavigateToRequests: () => void;
  onNavigateToProjects: () => void;
  onNavigateToFactories: () => void;
}

export const InfluencerDashboard: React.FC<InfluencerDashboardProps> = ({
  onNavigateToRequests,
  onNavigateToProjects,
  onNavigateToFactories
}) => {
  const influencer = CURRENT_INFLUENCER;
  const unreadNotifications = NOTIFICATIONS.filter(n => !n.read).length;
  
  const statusConfig = {
    production: { label: '生产中', color: 'bg-blue-100 text-blue-700', icon: Factory },
    'quality-check': { label: '质检中', color: 'bg-purple-100 text-purple-700', icon: CheckCircle2 },
    shipping: { label: '运输中', color: 'bg-amber-100 text-amber-700', icon: Package },
    delivered: { label: '已送达', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
    completed: { label: '已完成', color: 'bg-slate-100 text-slate-700', icon: Award }
  };

  const requestStatusConfig = {
    pending: { label: '待处理', color: 'bg-slate-100 text-slate-700', icon: Clock },
    accepted: { label: '已接受', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
    rejected: { label: '已拒绝', color: 'bg-rose-100 text-rose-700', icon: AlertCircle },
    negotiating: { label: '协商中', color: 'bg-amber-100 text-amber-700', icon: Clock },
    confirmed: { label: '已确认', color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <img 
                src={influencer.avatar} 
                className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-2xl"
              />
              <div>
                <h1 className="text-3xl font-black text-white mb-1">{influencer.name}</h1>
                <p className="text-white/70 text-lg">{influencer.handle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none">
                    <Award className="w-3 h-3 mr-1" />
                    {influencer.membershipTier.toUpperCase()} 会员
                  </Badge>
                  {influencer.niche.slice(0, 2).map(n => (
                    <Badge key={n} variant="outline" className="border-white/30 text-white">
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-white" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* 核心指标 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '累计 GMV', value: `$${(influencer.metrics.totalGMV / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-emerald-400' },
              { label: '完成项目', value: influencer.metrics.totalProjects, icon: Package, color: 'text-blue-400' },
              { label: '平均利润率', value: `${influencer.metrics.avgProfitMargin}%`, icon: TrendingUp, color: 'text-amber-400' },
              { label: '成功率', value: `${influencer.metrics.successRate}%`, icon: Award, color: 'text-purple-400' }
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                    <span className="text-xs text-white/70 uppercase font-mono">{metric.label}</span>
                  </div>
                  <div className={`text-2xl font-black ${metric.color}`}>{metric.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-7xl mx-auto px-6 -mt-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 左侧：进行中的项目 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 进行中的项目 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-slate-900">进行中的项目</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onNavigateToProjects}
                  className="gap-1 text-blue-600 hover:text-blue-700"
                >
                  查看全部
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {ACTIVE_PROJECTS.slice(0, 3).map(project => {
                  const statusInfo = statusConfig[project.status];
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <div key={project.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-start gap-4">
                        <img 
                          src={project.product.image} 
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-slate-900 mb-1">{project.product.name}</h3>
                              <p className="text-xs text-slate-500">{project.factory.name}</p>
                            </div>
                            <Badge className={`${statusInfo.color} border-none`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                            <span>数量: {project.orderQuantity}</span>
                            <span>•</span>
                            <span>总价: ${project.totalValue.toLocaleString()}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">进度</span>
                              <span className="font-bold text-slate-900">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 合作邀约 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-slate-900">合作邀约</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onNavigateToRequests}
                  className="gap-1 text-blue-600 hover:text-blue-700"
                >
                  查看全部
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {COLLABORATION_REQUESTS.slice(0, 3).map(request => {
                  const statusInfo = requestStatusConfig[request.status];
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <div key={request.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm mb-1">{request.productName}</h3>
                          <p className="text-xs text-slate-500">{request.productCategory}</p>
                        </div>
                        <Badge className={`${statusInfo.color} border-none text-xs`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span>数量: {request.quantity}</span>
                        <span>•</span>
                        <span>目标价: ${request.targetPrice}</span>
                        {request.factoryResponse && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600 font-bold">报价: ${request.factoryResponse.quotedPrice}</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右侧：通知和快捷操作 */}
          <div className="space-y-6">
            {/* 通知 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-lg font-black text-slate-900 mb-4">最新通知</h2>
              <div className="space-y-3">
                {NOTIFICATIONS.slice(0, 4).map(notif => (
                  <div 
                    key={notif.id} 
                    className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                      notif.read 
                        ? 'bg-slate-50 border-slate-200' 
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Bell className={`w-4 h-4 flex-shrink-0 mt-0.5 ${notif.read ? 'text-slate-400' : 'text-blue-600'}`} />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900 mb-1">{notif.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {new Date(notif.createdAt).toLocaleString('zh-CN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 快捷操作 */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-lg text-white">
              <h2 className="text-lg font-black mb-4">快捷操作</h2>
              <div className="space-y-2">
                <button 
                  onClick={onNavigateToFactories}
                  className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left flex items-center gap-3"
                >
                  <Factory className="w-5 h-5" />
                  <span className="font-bold">浏览认证工厂</span>
                </button>
                <button className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold">查看爆款商机</span>
                </button>
                <button className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  <span className="font-bold">发起新合作</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
