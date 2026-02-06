'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageCircle,
  DollarSign,
  Package,
  Calendar,
  Factory as FactoryIcon
} from 'lucide-react';
import { COLLABORATION_REQUESTS } from '@/data/influencer-data';
import { CollaborationRequest } from '@/types/influencer-workspace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CollaborationRequestsPageProps {
  onBack: () => void;
  onViewFactory: (factoryId: string) => void;
}

export const CollaborationRequestsPage: React.FC<CollaborationRequestsPageProps> = ({
  onBack,
  onViewFactory
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | CollaborationRequest['status']>('all');
  const [selectedRequest, setSelectedRequest] = useState<CollaborationRequest | null>(null);

  const statusConfig = {
    pending: { label: '待处理', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: Clock },
    accepted: { label: '已接受', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    rejected: { label: '已拒绝', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: AlertCircle },
    negotiating: { label: '协商中', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: MessageCircle },
    confirmed: { label: '已确认', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2 }
  };

  const modeConfig = {
    dropshipping: { label: '一件代发', color: 'text-blue-600' },
    wholesale: { label: '批量批发', color: 'text-emerald-600' },
    exclusive: { label: '独家供应', color: 'text-amber-600' }
  };

  const filteredRequests = COLLABORATION_REQUESTS.filter(req => 
    filterStatus === 'all' || req.status === filterStatus
  );

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
          <h1 className="text-3xl font-black text-slate-900 mb-2">合作邀约</h1>
          <p className="text-slate-600">管理您发起的所有合作邀约</p>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: '全部' },
              { value: 'pending', label: '待处理' },
              { value: 'accepted', label: '已接受' },
              { value: 'negotiating', label: '协商中' },
              { value: 'confirmed', label: '已确认' },
              { value: 'rejected', label: '已拒绝' }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value as any)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  filterStatus === filter.value 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 邀约列表 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredRequests.map(request => {
              const statusInfo = statusConfig[request.status];
              const StatusIcon = statusInfo.icon;
              const modeInfo = modeConfig[request.cooperationMode];

              return (
                <motion.div
                  key={request.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-1">{request.productName}</h3>
                      <p className="text-sm text-slate-500">{request.productCategory}</p>
                    </div>
                    <Badge className={`${statusInfo.color} border font-bold`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">合作模式</div>
                      <div className={`text-sm font-bold ${modeInfo.color}`}>{modeInfo.label}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">订购数量</div>
                      <div className="text-sm font-bold text-slate-900">{request.quantity} 件</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">目标价格</div>
                      <div className="text-sm font-bold text-slate-900">${request.targetPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">目标市场</div>
                      <div className="text-sm font-bold text-slate-900">{request.targetMarket}</div>
                    </div>
                  </div>

                  {request.factoryResponse && (
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-900">工厂已报价</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-emerald-700 mb-1">报价</div>
                          <div className="text-lg font-black text-emerald-900">${request.factoryResponse.quotedPrice}</div>
                        </div>
                        <div>
                          <div className="text-xs text-emerald-700 mb-1">MOQ</div>
                          <div className="text-lg font-black text-emerald-900">{request.factoryResponse.moq}</div>
                        </div>
                        <div>
                          <div className="text-xs text-emerald-700 mb-1">交期</div>
                          <div className="text-sm font-bold text-emerald-900">{request.factoryResponse.leadTime}</div>
                        </div>
                      </div>
                      <p className="text-xs text-emerald-800 leading-relaxed italic">
                        "{request.factoryResponse.message}"
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => onViewFactory(request.factoryId)}
                      className="flex-1 border-slate-300 hover:bg-slate-50 font-bold"
                    >
                      <FactoryIcon className="w-4 h-4 mr-2" />
                      查看工厂
                    </Button>
                    <Button 
                      onClick={() => setSelectedRequest(request)}
                      size="sm"
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold"
                    >
                      查看详情
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-400">
                    发起于 {new Date(request.createdAt).toLocaleDateString('zh-CN')}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 空状态 */}
        {filteredRequests.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex p-4 bg-slate-100 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">暂无合作邀约</h3>
            <p className="text-slate-500 text-sm">尝试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};
