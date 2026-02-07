'use client';

/**
 * ChatInterface - 聊天界面主容器
 */

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/chat/chat-store';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { HistorySidebar } from './HistorySidebar';
import { analyzeProduct, isTikTokUrl, extractTikTokUrl } from '@/lib/chat/chat-api';

export function ChatInterface() {
  const {
    currentSessionId,
    createSession,
    addMessage,
    setProcessing,
    setError,
    isProcessing,
  } = useChatStore();

  const [showHistory, setShowHistory] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始化：创建第一个会话
  useEffect(() => {
    if (!currentSessionId) {
      createSession();
    }
  }, [currentSessionId, createSession]);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSessionId]);

  // 处理用户发送消息
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    // 添加用户消息
    addMessage({
      role: 'user',
      type: 'text',
      content: content.trim(),
    });

    // 检测是否为 TikTok 链接
    const tiktokUrl = extractTikTokUrl(content);

    if (tiktokUrl) {
      // 处理 TikTok 链接
      await handleTikTokAnalysis(tiktokUrl);
    } else {
      // 处理普通文本消息
      handleTextMessage(content);
    }
  };

  // 处理 TikTok 分析
  const handleTikTokAnalysis = async (tiktokUrl: string) => {
    setProcessing(true);
    setError(null);

    // 添加处理中消息
    const processingMessageId = `msg-processing-${Date.now()}`;
    addMessage({
      role: 'agent',
      type: 'processing',
      content: '收到！正在分析这个视频... 🔍',
      data: {
        steps: [
          { id: 'step-1', agent: 'Traffic', action: '视频下载', status: 'running', log: [] },
          { id: 'step-2', agent: 'Capacity', action: 'AI 分析', status: 'pending', log: [] },
          { id: 'step-3', agent: 'Financial', action: '工厂匹配', status: 'pending', log: [] },
          { id: 'step-4', agent: 'Execution', action: 'ROI 计算', status: 'pending', log: [] },
        ],
      },
    });

    try {
      // 使用 Mock 数据进行演示（避免 API 调用失败）
      const useMockData = true;

      if (useMockData) {
        // 模拟处理延迟
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 添加产品分析结果（Mock 数据）
        addMessage({
          role: 'agent',
          type: 'product',
          content: `✅ 分析完成！找到了一个很棒的产品：**反重力水滴加湿器**`,
          data: {
            product: {
              name: '反重力水滴加湿器',
              category: '家居电器',
              trendScore: 95,
              lifecycle: 'explosive' as const,
              views: 2400000,
              likes: 450000,
            },
            factories: [
              {
                id: 'factory-1',
                name: '深圳精密电子有限公司',
                matchScore: 98,
                matchReasons: ['专注便携电子产品', '拥有 CE 和 FCC 认证', '月产能 50,000 件'],
                location: '深圳市宝安区',
                certifications: ['ISO9001', 'CE', 'FCC', 'RoHS'],
              },
              {
                id: 'factory-2',
                name: '宁波智能科技制造厂',
                matchScore: 85,
                matchReasons: ['消费电子经验丰富', '生产能力强', '质量稳定'],
                location: '宁波市鄞州区',
                certifications: ['ISO9001', 'CE'],
              },
              {
                id: 'factory-3',
                name: '中山小家电制造基地',
                matchScore: 78,
                matchReasons: ['小家电专业制造', '价格竞争力强'],
                location: '中山市东凤镇',
                certifications: ['ISO9001'],
              },
            ],
            pricing: {
              dropshipping: { price: 8.5, moq: 1 },
              wholesale: { price: 3.2, moq: 500 },
              exclusive: { price: 2.85, moq: 5000 },
            },
            roi: {
              estimatedRevenue: 125000,
              estimatedProfit: 73000,
              profitMargin: 58.4,
              paybackDays: 14,
              riskLevel: 'low' as const,
            },
            quickActions: [
              { id: 'action-1', label: '查看工厂详情', action: 'view_factories' },
              { id: 'action-2', label: '获取样品报价', action: 'get_sample' },
              { id: 'action-3', label: '计算不同数量价格', action: 'calculate_bulk' },
              { id: 'action-4', label: '了解物流方案', action: 'logistics' },
            ],
          },
        });
      } else {
        // 调用真实 Agent API
        const response = await analyzeProduct(tiktokUrl);

        if (response.success && response.result) {
          // 添加产品分析结果
          addMessage({
            role: 'agent',
            type: 'product',
            content: `✅ 分析完成！找到了一个很棒的产品：**${response.result.productName}**`,
            data: {
              product: {
                name: response.result.productName,
                category: response.result.category,
                trendScore: response.result.trendScore,
                lifecycle: response.result.lifecycle,
              },
              factories: response.result.matchedFactories.map((f) => ({
                id: f.factoryId,
                name: f.factoryName,
                matchScore: f.matchScore,
                matchReasons: f.matchReasons,
              })),
              pricing: response.result.pricingTiers,
              roi: response.result.roiPrediction,
              quickActions: [
                { id: 'action-1', label: '查看工厂详情', action: 'view_factories' },
                { id: 'action-2', label: '获取样品报价', action: 'get_sample' },
                { id: 'action-3', label: '计算不同数量价格', action: 'calculate_bulk' },
                { id: 'action-4', label: '了解物流方案', action: 'logistics' },
              ],
            },
          });
        } else {
          throw new Error(response.error || '分析失败');
        }
      }
    } catch (error) {
      console.error('Analysis error:', error);
      addMessage({
        role: 'agent',
        type: 'error',
        content: `❌ 抱歉，分析过程中出现了错误：${error instanceof Error ? error.message : '未知错误'}`,
      });
      setError(error instanceof Error ? error.message : '未知错误');
    } finally {
      setProcessing(false);
    }
  };

  // 处理普通文本消息
  const handleTextMessage = (content: string) => {
    // 简单的关键词匹配回复
    let reply = '';

    if (content.includes('工厂') || content.includes('供应商')) {
      reply = '我可以帮你匹配认证工厂！请发送一个 TikTok 产品链接，或者告诉我你想找什么类型的产品。';
    } else if (content.includes('报价') || content.includes('价格')) {
      reply = '我可以生成实时报价！支持三种模式：\n\n1️⃣ **Dropshipping**（一件代发）\n2️⃣ **Wholesale**（批发）\n3️⃣ **Exclusive**（独家供应）\n\n请发送产品链接，我会为你计算详细报价。';
    } else if (content.includes('帮助') || content.includes('help')) {
      reply = '我可以帮你：\n\n📹 **分析 TikTok 爆款产品**\n🏭 **匹配认证工厂**\n💰 **生成实时报价**\n📊 **预测 ROI 和回本周期**\n\n直接发送 TikTok 链接开始吧！';
    } else {
      reply = '我理解你的需求了。请发送一个 TikTok 产品链接，我会帮你分析并匹配工厂。\n\n或者你可以：\n• 输入"帮助"查看功能介绍\n• 输入"工厂"了解工厂匹配\n• 输入"报价"了解报价模式';
    }

    addMessage({
      role: 'agent',
      type: 'text',
      content: reply,
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 历史记录侧边栏 */}
      <HistorySidebar isOpen={showHistory} onClose={() => setShowHistory(false)} />

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        <ChatHeader onToggleHistory={() => setShowHistory(!showHistory)} />
        
        <MessageList messagesEndRef={messagesEndRef} />
        
        <ChatInput onSendMessage={handleSendMessage} disabled={isProcessing} />
      </div>
    </div>
  );
}

// 需要在文件顶部添加 React import
import React from 'react';
