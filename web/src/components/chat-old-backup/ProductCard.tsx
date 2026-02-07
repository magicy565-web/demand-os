'use client';

/**
 * ProductCard - 产品分析结果卡片
 * 显示产品信息、工厂匹配、报价、ROI 预测
 */

import { MessageData } from '@/types/chat';
import { Package, TrendingUp, Factory, DollarSign, Target, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  formatPrice,
  formatNumber,
  getLifecycleLabel,
  getRiskLevelInfo,
} from '@/lib/chat/chat-api';

interface ProductCardProps {
  data: MessageData;
}

export function ProductCard({ data }: ProductCardProps) {
  const { product, factories, pricing, roi } = data;

  if (!product) return null;

  const riskInfo = roi ? getRiskLevelInfo(roi.riskLevel) : null;

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-slate-900 mb-2">
              {product.name}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="gap-1">
                <Package className="w-3 h-3" />
                {product.category}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="w-3 h-3" />
                趋势分数: {product.trendScore}/100
              </Badge>
              <Badge className="gap-1 bg-gradient-to-r from-blue-500 to-purple-600">
                {getLifecycleLabel(product.lifecycle)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* 工厂匹配 */}
        {factories && factories.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Factory className="w-4 h-4 text-slate-600" />
              <h3 className="font-semibold text-slate-900">匹配工厂</h3>
              <Badge variant="secondary">{factories.length} 家</Badge>
            </div>
            <div className="space-y-3">
              {factories.slice(0, 3).map((factory, index) => (
                <div
                  key={factory.id}
                  className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{factory.name}</h4>
                      {factory.location && (
                        <p className="text-xs text-slate-500 mt-1">{factory.location}</p>
                      )}
                    </div>
                    <Badge className="bg-green-500">
                      {factory.matchScore}% 匹配
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {factory.matchReasons.map((reason, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-600"
                      >
                        ✓ {reason}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* 报价信息 */}
        {pricing && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-slate-600" />
              <h3 className="font-semibold text-slate-900">报价方案</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-blue-600 font-medium mb-1">Dropshipping</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatPrice(pricing.dropshipping.price)}
                </p>
                <p className="text-xs text-blue-600 mt-1">MOQ: {pricing.dropshipping.moq}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-xs text-purple-600 font-medium mb-1">Wholesale</p>
                <p className="text-2xl font-bold text-purple-900">
                  {formatPrice(pricing.wholesale.price)}
                </p>
                <p className="text-xs text-purple-600 mt-1">MOQ: {pricing.wholesale.moq}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-xs text-green-600 font-medium mb-1">Exclusive</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatPrice(pricing.exclusive.price)}
                </p>
                <p className="text-xs text-green-600 mt-1">MOQ: {pricing.exclusive.moq}</p>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* ROI 预测 */}
        {roi && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-slate-600" />
              <h3 className="font-semibold text-slate-900">ROI 预测</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">预估收入</p>
                <p className="text-lg font-bold text-slate-900">
                  {formatPrice(roi.estimatedRevenue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">预估利润</p>
                <p className="text-lg font-bold text-green-600">
                  {formatPrice(roi.estimatedProfit)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">利润率</p>
                <p className="text-lg font-bold text-blue-600">{roi.profitMargin.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">回本周期</p>
                <p className="text-lg font-bold text-purple-600">{roi.paybackDays} 天</p>
              </div>
            </div>
            {riskInfo && (
              <div className={`mt-4 flex items-center gap-2 p-3 rounded-lg ${riskInfo.bgColor}`}>
                <AlertCircle className={`w-4 h-4 ${riskInfo.color}`} />
                <span className={`text-sm font-medium ${riskInfo.color}`}>
                  {riskInfo.label}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
