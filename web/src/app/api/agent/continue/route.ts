// /api/agent/continue - 用户完成输入后继续执行任务

import { NextRequest, NextResponse } from 'next/server';
import { getTask, updateTask } from '@/lib/agent-engine/task-storage';
import { TaskExecutor } from '@/lib/agent-engine/task-executor';
import { ProgressUpdate } from '@/lib/agents/types';

// 从 start/route.ts 导入 WebSocket 管理函数
import { registerWSConnection, unregisterWSConnection } from '../start/route';

export async function POST(request: NextRequest) {
  try {
    const { taskId, stepId, userInput } = await request.json();

    if (!taskId || !stepId) {
      return NextResponse.json(
        { error: 'taskId and stepId are required' },
        { status: 400 }
      );
    }

    // 1. 获取任务
    const task = await getTask(taskId);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // 2. 将用户输入合并到 context
    Object.assign(task.context, userInput);
    await updateTask(taskId, { context: task.context });

    // 3. 继续执行任务
    continueTaskAsync(taskId, task.plan, task.context, stepId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API /agent/continue] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

async function continueTaskAsync(taskId: string, plan: any[], context: any, currentStepId: string) {
  const executor = new TaskExecutor(taskId, plan, (update) => {
    broadcastToTask(taskId, update);
  });

  try {
    const results = await executor.continueExecution(context, currentStepId);
    
    // 检查是否所有步骤都已完成
    const allCompleted = plan.every(s => s.status === 'completed');
    if (allCompleted) {
      await updateTask(taskId, { status: 'completed', results });
      broadcastToTask(taskId, { type: 'task_complete', results });
    }
  } catch (error: any) {
    console.error(`[Task ${taskId}] Continue execution failed:`, error);
    await updateTask(taskId, { status: 'failed', error: error.message });
    broadcastToTask(taskId, { type: 'task_error', error: error.message });
  }
}

function broadcastToTask(taskId: string, update: ProgressUpdate) {
  // 这里应该调用 WebSocket 广播函数
  // 由于我们使用的是简化的实现，这里暂时留空
  console.log(`[Broadcast] Task ${taskId}:`, update);
}
