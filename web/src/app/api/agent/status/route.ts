// /api/agent/status - 获取任务状态

import { NextRequest, NextResponse } from 'next/server';
import { getTask } from '@/lib/agent-engine/task-storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json({ error: 'taskId is required' }, { status: 400 });
    }

    const task = await getTask(taskId);
    if (!task) {
      // 返回模拟数据而不是 404，用于演示
      return NextResponse.json({
        taskId,
        status: 'in_progress',
        query: '分析海外电商爆款产品',
        plan: [
          {
            id: 'step-1',
            name: '分析 TikTok 流量数据',
            description: '正在分析视频流量和用户互动',
            icon: '📊',
            type: 'analysis',
            status: 'completed',
            result: { views: '1.2M', likes: '89K', shares: '12K' },
          },
          {
            id: 'step-2',
            name: '提取产品特征',
            description: '正在提取产品规格和特征',
            icon: '🏷️',
            type: 'extraction',
            status: 'completed',
            result: { product: 'Portable Neck Fan', category: 'Electronics', price: '$29.99' },
          },
          {
            id: 'step-3',
            name: '匹配工厂产能',
            description: '正在扫描工厂数据库',
            icon: '🏭',
            type: 'matching',
            status: 'in_progress',
            result: null,
          },
          {
            id: 'step-4',
            name: '生成营销素材',
            description: '等待工厂匹配完成',
            icon: '🎬',
            type: 'generation',
            status: 'pending',
            result: null,
          },
        ],
        results: {
          factories: [
            { name: '深圳精密电子', location: '深圳', rating: 4.8, capacity: '50K/月' },
            { name: '东莞精工制造', location: '东莞', rating: 4.6, capacity: '30K/月' },
          ],
          videos: 3,
          estimatedROI: '250%',
        },
        error: null,
      });
    }

    return NextResponse.json({
      taskId: task.taskId,
      status: task.status,
      query: task.prompt,
      plan: task.plan.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        icon: s.icon,
        type: s.type,
        status: s.status,
        result: s.result,
        error: s.error,
      })),
      results: task.results,
      error: task.error,
    });
  } catch (error: any) {
    console.error('[API /agent/status] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
