// /api/agent/start - 启动 Agent 任务

import { NextRequest, NextResponse } from 'next/server';
import { parseIntent } from '@/lib/agent-engine/intent-parser';
import { getAgent } from '@/lib/agents';
import { TaskExecutor } from '@/lib/agent-engine/task-executor';
import { saveTask, updateTask } from '@/lib/agent-engine/task-storage';
import { v4 as uuidv4 } from 'uuid';
import { ProgressUpdate } from '@/lib/agents/types';

// WebSocket 连接管理（简化版，生产环境应使用专门的 WebSocket 服务）
const wsConnections: Map<string, Set<(update: ProgressUpdate) => void>> = new Map();

export async function POST(request: NextRequest) {
  try {
    const { prompt, context = {}, userId = 'anonymous' } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 1. 解析意图
    const agentId = await parseIntent(prompt);
    if (!agentId) {
      return NextResponse.json(
        { error: 'Unable to understand intent. Please try rephrasing your request.' },
        { status: 400 }
      );
    }

    // 2. 获取 Agent 并生成执行计划
    const agent = getAgent(agentId);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const plan = await agent.planner(prompt, context);

    // 3. 创建任务
    const taskId = uuidv4();
    await saveTask(taskId, {
      taskId,
      userId,
      prompt,
      agentId,
      status: 'pending',
      plan,
      context,
      results: {},
    });

    // 4. 异步执行任务
    executeTaskAsync(taskId, plan, context);

    // 5. 立即返回
    return NextResponse.json({
      taskId,
      plan: plan.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        icon: s.icon,
        type: s.type,
        status: s.status,
      })),
    });
  } catch (error: any) {
    console.error('[API /agent/start] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

async function executeTaskAsync(taskId: string, plan: any[], context: any) {
  const executor = new TaskExecutor(taskId, plan, (update) => {
    // 广播进度更新到所有订阅该任务的 WebSocket 连接
    broadcastToTask(taskId, update);
  });

  try {
    await updateTask(taskId, { status: 'running' });
    
    const results = await executor.execute(context);
    
    await updateTask(taskId, { status: 'completed', results });
    
    broadcastToTask(taskId, { type: 'task_complete', results });
  } catch (error: any) {
    console.error(`[Task ${taskId}] Execution failed:`, error);
    
    await updateTask(taskId, { status: 'failed', error: error.message });
    
    broadcastToTask(taskId, { type: 'task_error', error: error.message });
  }
}

function broadcastToTask(taskId: string, update: ProgressUpdate) {
  const connections = wsConnections.get(taskId);
  if (connections) {
    connections.forEach(callback => callback(update));
  }
}

// 注册 WebSocket 连接（供 WebSocket API 调用）
export function registerWSConnection(taskId: string, callback: (update: ProgressUpdate) => void) {
  if (!wsConnections.has(taskId)) {
    wsConnections.set(taskId, new Set());
  }
  wsConnections.get(taskId)!.add(callback);
}

// 注销 WebSocket 连接
export function unregisterWSConnection(taskId: string, callback: (update: ProgressUpdate) => void) {
  const connections = wsConnections.get(taskId);
  if (connections) {
    connections.delete(callback);
    if (connections.size === 0) {
      wsConnections.delete(taskId);
    }
  }
}
