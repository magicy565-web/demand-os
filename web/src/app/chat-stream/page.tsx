'use client';

import { useState } from 'react';
import { Send, Sparkles, Loader2, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { useStreamingAgent } from '@/hooks/useStreamingAgent';

export default function ChatStreamPage() {
  const [input, setInput] = useState('');
  const { steps, result, isStreaming, error, startStream, cancelStream } = useStreamingAgent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isStreaming) return;

    const tiktokUrl = input.trim();
    setInput('');
    
    await startStream(tiktokUrl);
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">智能采购助手 (流式版)</h1>
              <p className="text-xs text-slate-500">Real-time Streaming Agent Flow</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Streaming Enabled
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="粘贴 TikTok 视频链接..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              disabled={isStreaming}
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {isStreaming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  分析
                </>
              )}
            </button>
            {isStreaming && (
              <button
                type="button"
                onClick={cancelStream}
                className="px-4 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition-all"
              >
                取消
              </button>
            )}
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">错误：{error}</span>
            </div>
          </div>
        )}

        {/* Agent Steps */}
        {steps.length > 0 && (
          <div className="mb-8 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Agent 工作流程</h2>
            
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-5 rounded-xl border transition-all duration-300 ${
                  step.status === 'completed'
                    ? 'bg-green-50 border-green-200'
                    : step.status === 'running'
                    ? 'bg-blue-50 border-blue-200 shadow-lg'
                    : step.status === 'failed'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStepIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {step.agent} Agent
                      </h3>
                      <span className="text-xs text-slate-500 uppercase tracking-wide">
                        {step.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{step.action}</p>
                    
                    {step.log.length > 0 && (
                      <div className="space-y-1 mt-3 pt-3 border-t border-slate-200">
                        {step.log.map((log, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-600 font-mono animate-fade-in"
                          >
                            {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-slate-900">分析结果</h2>
            </div>

            <div className="space-y-6">
              {/* Product Info */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">产品信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-50">
                    <div className="text-xs text-slate-500 mb-1">产品名称</div>
                    <div className="font-medium text-slate-900">{result.productName}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <div className="text-xs text-slate-500 mb-1">类别</div>
                    <div className="font-medium text-slate-900">{result.category}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <div className="text-xs text-slate-500 mb-1">趋势分数</div>
                    <div className="font-medium text-slate-900">{result.trendScore}/100</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <div className="text-xs text-slate-500 mb-1">生命周期</div>
                    <div className="font-medium text-slate-900 capitalize">{result.lifecycle}</div>
                  </div>
                </div>
              </div>

              {/* Matched Factories */}
              {result.matchedFactories.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">匹配工厂</h3>
                  <div className="space-y-3">
                    {result.matchedFactories.map((factory, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-900">{factory.factoryName}</h4>
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {factory.matchScore}% 匹配
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {factory.matchReasons.map((reason, ridx) => (
                            <li key={ridx} className="text-sm text-slate-600 flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Tiers */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">定价方案</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-500 mb-2">代发货</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      ${result.pricingTiers.dropshipping.price}
                    </div>
                    <div className="text-xs text-slate-500">MOQ: {result.pricingTiers.dropshipping.moq}</div>
                  </div>
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="text-sm text-blue-600 mb-2">批发</div>
                    <div className="text-2xl font-bold text-blue-900 mb-1">
                      ${result.pricingTiers.wholesale.price}
                    </div>
                    <div className="text-xs text-blue-600">MOQ: {result.pricingTiers.wholesale.moq}</div>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-500 mb-2">独家</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      ${result.pricingTiers.exclusive.price}
                    </div>
                    <div className="text-xs text-slate-500">MOQ: {result.pricingTiers.exclusive.moq}</div>
                  </div>
                </div>
              </div>

              {/* ROI Prediction */}
              <div className="p-5 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">ROI 预测</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">预计收入</div>
                    <div className="text-xl font-bold text-green-700">
                      ${result.roiPrediction.estimatedRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">预计利润</div>
                    <div className="text-xl font-bold text-green-700">
                      ${result.roiPrediction.estimatedProfit.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">利润率</div>
                    <div className="text-xl font-bold text-green-700">
                      {result.roiPrediction.profitMargin}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">回本周期</div>
                    <div className="text-xl font-bold text-green-700">
                      {result.roiPrediction.paybackDays} 天
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
